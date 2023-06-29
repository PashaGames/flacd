<script setup>
import axios from "axios";
</script>

<template>
<span>{{question}}</span>
<div v-if="this.answerShown" class="text-2xl">{{answer}}</div>
<div v-if="!this.answerShown">
    <button type="button" class="px-10 py-5 mt-5 mr-5 text-5xl text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none " @click="showAnswer">{{ $t("main.show_answer") }}</button>
</div>
<div v-else>
    <button type="button" class="px-10 py-5 mt-5 mr-5 text-5xl text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none " @click="correctAnswer">{{ $t("main.correct") }}</button>
    <button type="button" class="px-10 py-5 mt-5 mr-5 text-5xl text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-blue-300 focus:outline-none " @click="incorrectAnswer">{{ $t("main.incorrect") }}</button>

</div>
</template>

<script>
export default {
 props: ['id','question','answer'],
 data(){
    return {
        answerShown: false
    }
 },
 methods: {
    showAnswer(){
        this.answerShown = true;
    },
    correctAnswer(){
        this.submitAnswer(true);
    },
    incorrectAnswer(){
        this.submitAnswer(false);
    },
    async submitAnswer(result){
        let data = await axios.post("/api/flashcard/answer/" + this.id,{answer:result},{headers:{"Authorization":this.$store.getters.userToken}}).catch(e => {
                    alert("Error happened during card submission.")
                    return;
        })
        if(!data.data.success){
            alert("Error during flashcard submission.")
            return;
        }

        this.answerShown = false;
        this.$emit("nextCard");
    }
 }
}
</script>