
<template>
    
    <section class="bg-gray-50 ">
        
        <Alert v-bind:title="alert.title" v-bind:content="alert.content" v-if="alert.showAlert" @close-alert="closeAlert"/>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                <img class="w-8 h-8 mr-2" src="../assets/logo.svg" alt="logo">
                Flacd
            </a>
            <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        {{ $t("register.login") }}
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 ">  {{ $t("register.username") }}</label>
                            <input type="text" maxlength="15" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="informatics" required="" v-model="account.username">
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">  {{ $t("register.password") }}</label>
                            <input type="password"  maxlength="90" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " required="" v-model="account.password">
                        </div>
                    
                  
                        <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" @click="onFormSubmit">{{$t("register.login_button")}}</button>
                        <p class="text-sm font-light text-gray-500 ">
                            {{ $t("register.dont_have1") }} <router-link to="/login" class="font-medium text-primary-600 hover:underline "> {{ $t("register.dont_have2") }}</router-link>
                        </p>    
                    </form>
                </div>
            </div>
        </div>
      </section>
      
  </template>
  <script setup>
    import { RouterLink } from "vue-router";
    import Alert from "../components/Alert.vue"
  </script>

  <script>
 
  import axios from 'axios'
  export default {
    data() {
      return {
        account: {
            username: '',
            password: ''
        },
        alert: {
            title: '',
            content: '',
            showAlert: false
        }
      }
    },
    methods: {
        async onFormSubmit(evt){
            evt.preventDefault(); // запрос идёт через axios
            let result = await axios.post("/api/login",{
                username:this.account.username,
                password:this.account.password
            })

            let data = result.data;

            if(!data.success){
                this.alert.showAlert = true;
                this.alert.title = "Error!";
                this.alert.content = data.result;
                return;
            }

            // success ! return token
            let success = await this.$store.dispatch("setToken",data.result);

            if(!success){
                this.alert.showAlert = true;
                this.alert.title = "Error!";
                this.alert.content = "register.unexpected_error_login"
                return;
            }

            this.$router.push("/")
        },
        closeAlert(){
            this.alert.showAlert = false;
        }
    }
  }
  </script>