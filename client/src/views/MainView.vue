<script setup>
import axios from "axios";
import Sidebar from "../components/Sidebar.vue"
import Alert from "../components/Alert.vue"
import FlashcardDisplay from "../components/FlashcardDisplay.vue"
</script>
<template>
    <div v-if="!training.isTraining">
        <Sidebar />
        <Alert v-bind:title="alert.title" v-bind:content="alert.content" v-if="alert.showAlert" @close-alert="closeAlert"/>
        <div class="p-4 sm:ml-64">
            <div class="p-4 text-5xl text-center border-2 border-gray-300 border-dashed rounded-lg">
                {{ $t("main.greeting") }} {{ this.$store.getters.user != null ? this.$store.getters.user.username : "User"}}. 
                <div>
                    {{ $t("main.greeting2") }} <!-- опять всё грязно но времени мало)) -->
                </div>
                <button type="button" class="px-10 py-5 mt-5 mr-5 text-5xl text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none " @click="train">{{ $t("main.train") }}</button>
            </div>
        </div>
    </div>
    <div v-else> 
        <div v-if="training.intro" class="text-center">
            <div class="p-4 text-5xl text-center border-2 border-gray-300 border-dashed rounded-lg">
                {{  $t("main.intro1") }} {{ training.data.length }} {{ $t("main.intro2") }}
            </div>
            <div>
                {{  $t("main.intro3") }}
            </div>
            
            <button type="button" class="px-10 py-5 mt-5 mr-5 text-5xl text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none " @click="startTrain">{{ $t("main.intro4") }}</button>
        </div>
        <div v-else-if="!training.finish" class="p-4 text-5xl text-center border-2 border-gray-300 border-dashed rounded-lg">
            <FlashcardDisplay :id="this.training.currentCard._id" :question="this.training.currentCard.question" :answer="this.training.currentCard.answer" @next-card="nextCard"/>
        </div>
        <div v-else class="text-center">
            <div>
                {{ $t("main.finish") }}
            </div>
            <button type="button" class="px-10 py-5 mt-5 mr-5 text-5xl text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none " @click="finishTrain">{{ $t("main.finishCard") }}</button>
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
                training:{
                    isTraining: false,
                    intro: true,
                    data: [],
                    index: 0,
                    finish: false,
                    currentCard: null
                    
                }
                
            }
        },
        methods: {
            async train(){
                let amount = await axios.get("/api/flashcard_amount",{headers:{"Authorization":this.$store.getters.userToken}})
                if(!amount.data.success){
                    this.alert.showAlert = true;
                    this.alert.title = "Error!";
                    this.alert.content = amount.data.result;
                    return;
                }
                if(amount.data.result <= 0){
                    this.alert.showAlert = true;
                    this.alert.title = "Error!";
                    this.alert.content = "main.empty_flashcards"
                    return;
                } 

                let trainingData = await axios.get("/api/flashcard_training",{headers:{"Authorization":this.$store.getters.userToken}});

                if(!trainingData.data.success){
                    this.alert.showAlert = true;
                    this.alert.title = "Error!";
                    this.alert.content = trainingData.data.result;
                    return;
                }
                this.training.isTraining = true
                this.training.intro = true;
                this.training.index = 0;
                this.training.data = trainingData.data.result;
                this.training.finish = false;
                

                
            },
            startTrain(){
                this.training.currentCard = this.training.data[this.training.index];
                this.training.intro = false;
            },
            finishTrain(){
                this.training.finish = true;
                this.training.isTraining = false;
            },
            nextCard(){
                this.training.index++;
                if(this.training.data.length <= this.training.index){
                    
                    this.training.finish = true;
                
                } else {
                    this.training.currentCard = this.training.data[this.training.index];
                }
            },
            closeAlert(){
                this.alert.showAlert = false;
            }
        }
    }
</script>

