
<template>
    <ul class="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
           <div class="text-red-500" v-if="error">{{this.error}}</div>
           <FlashcardInList v-for="(item,index) in list" :question="item.question" :id="item._id" :nextDate="item.nextDate" @card-delete="getList"/>
          
    </ul>
</template>
<script setup>
import axios from "axios";
import FlashcardInList from './FlashcardInList.vue';
</script>
<script>
    export default {
        data(){
            return {
                list:[],
                current: 0,
                max: 20,
                error: null
            }
        },
        methods: {
            async getList(){
                let data = await axios.get("/api/flashcard",{headers:{"Authorization":this.$store.getters.userToken}}).catch(e => {
                    this.error = "Network Error"
                    return;
                })
                if(!data.data.success){
                    
                    this.error = data.data.result
                    return;
                }

                this.list = data.data.result;
            }
        },
        async mounted() {
           
            this.getList()
      
        }
    }
</script>