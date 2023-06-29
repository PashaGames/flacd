<script setup>
import { RouterView } from 'vue-router'
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/en';
</script>

<script>
export default {
  async beforeCreate(){
      await this.$store.dispatch("loadStore");
  }
}
</script>
<template @locale-change="changeLocale">
  <RouterView />
</template>