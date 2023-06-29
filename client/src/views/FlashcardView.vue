<script setup>
import axios from "axios";
import Sidebar from "../components/Sidebar.vue"
import Alert from "../components/Alert.vue"
import FlashcardList from "../components/FlashcardList.vue";
</script>
<template>
    <Sidebar />
    <Alert v-bind:title="alert.title" v-bind:content="alert.content" v-if="alert.showAlert" @close-alert="closeAlert"/>
    <div class="flex flex-col h-full p-4 sm:ml-64">
        <div class="flex justify-between p-4 text-5xl border-2 border-gray-300 border-dashed rounded-lg grow-0">
            <button type="button" class="px-5 py-2.5 mr-5 text-2xl text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none " @click="changeToCreate">{{ $t("main.create") }}</button>
            <button type="button" class="px-5 py-2.5 mr-5 text-2xl text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none " @click="changeToList">{{ $t("main.list_cards") }}</button>
        
        </div>
        <div class="mt-4 rounded grow bg-gray-50" v-if="cards.showCreate">
            <form class="p-5 mb-6 border-2 border-gray-200 rounded-lg">
                <div class="mb-6">
                  <label for="question" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t("main.question") }}</label>
                  <input type="text" id="question" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('main.sample_question')" required v-model="create_card.question" @input="removeSuccessText">
                </div>
                <div class="mb-6">
                  <label for="answer" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t("main.answer") }}</label>
                  <input type="text" id="answer" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('main.sample_answer')" required v-model="create_card.answer" @input="removeSuccessText">
                </div>
    
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"  @click="onFormSubmit">{{$t("main.create_new_flashcard")}}</button>
                <div class="text-green-500" v-if="showSuccessText">
                    {{ $t("main.created") }}
                </div>
            </form>
         </div>
         <div class="mt-4 rounded grow bg-gray-50" v-else>
            <FlashcardList />
         </div>
   
    </div>
</template>
<script>
    export default {
        data(){
            return {
                alert: {
                    title: '',
                    content: '',
                    showAlert: false
                },
                cards: {
                    showCreate: true,
                },
                create_card: {
                    question: '',
                    answer: ''
                },
                showSuccessText: false
            }
        },
        methods: {
            changeToCreate(){
                this.cards.showCreate = true;
            },
            changeToList(){
                this.cards.showCreate = false;
            },
            async onFormSubmit(evt){
                evt.preventDefault(); // запрос идёт через axios
                this.showSuccessText = false;
                let result = await axios.post("/api/flashcard",{question:this.create_card.question,answer:this.create_card.answer},{headers:{"Authorization":this.$store.getters.userToken}})
          
                let data = result.data;

                if(!data.success){
                    this.alert.showAlert = true;
                    this.alert.title = "Error!";
                    this.alert.content = data.result;
                   
                    return;
                }
                
                this.showSuccessText = true;
                this.create_card.question = "";
                this.create_card.answer = "";
            },
            removeSuccessText(){
                this.showSuccessText = false;
            },
            closeAlert(){
                this.alert.showAlert = false;
            }
        }
    }
</script>

