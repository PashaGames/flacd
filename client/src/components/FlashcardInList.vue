<script setup>
import axios from "axios";
import dayjs from "dayjs";
</script>

<template>
    <li class="w-full px-4 py-2 border-b border-gray-20">
        <div class="flex justify-between">
            <span class="grow">{{question}}</span>
            <span class="grow-0">
                {{ $t("main.available_in") }} {{dayjs().to(nextDate)}}
            </span>
            <div class="ml-10"> <!-- options block -->
                <button class="text-red-500" @click="remove">
                    {{$t("main.remove")}}
                </button>
            </div>
        </div>
    </li>
</template>

<script>
export default {
 props: ['id','question',"nextDate"],
 methods: {
    async remove(){
        let data = await axios.delete("/api/flashcard/" + this.id,{headers:{"Authorization":this.$store.getters.userToken}})
        if(!data.data.success){
            alert("Error happened during deletion of this card: " + this.id)
            return;
        }
        this.$emit("cardDelete")
    }
 }
}
</script>