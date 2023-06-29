import './assets/main.css'
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3000'; // temp
import { createStore } from 'vuex'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import i18n from "./i18n";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';



const app = createApp(App)


const store = createStore({
  state(){
    return {
      userToken: null,
      user: null,
      locale: "en"
    }
  },
  getters: {
    user (state){
      return state.user;
    },
    userToken (state){
      return state.userToken;
    },
    hasAccount(state){
      return state.userToken != null;
    }
  },
  mutations: {
    clearUserInfo(state){
      state.user = state.userToken = null
      router.go(); // refresh the page
    },
    setToken(state,token){
      state.userToken = token;
    },
    setUser(state,user){
      state.user = user;
      
    },
    changeLanguage(state,locale){
      state.locale = locale;
      i18n.global.locale = locale
      dayjs.locale(locale)
      localStorage.setItem("language",locale)
      // $i18n.locale = locale;
   
    }
  },
  actions: {
    async loadStore(state) {
      if(localStorage.getItem("language")){
     
        this.commit("changeLanguage",localStorage.getItem("language"));
      }
      if(localStorage.getItem("userToken")){
        this.commit("setToken",window.localStorage.getItem("userToken"));

        return await store.dispatch("loadUser");
      } else {
        return true;
      }
    },
    async setToken(state,token){
      this.commit("setToken",token)
      return await state.dispatch("loadUser");
      
    },
    async loadUser(state){
   
      return new Promise(async function(resolve, reject){
   
        if(state.getters.userToken != null){
          try{
            let user = await axios.get("/api/user",{headers:{"Authorization":state.getters.userToken}}).catch(err => {
              if(err.response.status == 403){
                this.commit("clearUserInfo")
                return resolve(false);
              }

            })
            let data = user.data;
         
            if(!data.success) {
              this.commit("clearUserInfo")
              return resolve(false);
            }
            this.commit("setUser",data.result);
            
        
            resolve(true);
          } catch(e){
            this.commit("clearUserInfo")
            resolve(false);
          }
        } else
          resolve(false);
      }.bind(this))
    }
  }
});
store.subscribe((mutation, state) => {

  if(mutation.type == "setToken" || mutation.type == "clearUserInfo"){
    if(state.userToken != null)
      window.localStorage.setItem("userToken", state.userToken);
    else
      window.localStorage.removeItem("userToken")
  }
})

/*
StackOverflow https://stackoverflow.com/questions/52653337/vuejs-redirect-from-login-register-to-home-if-already-loggedin-redirect-from
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    
    if (!store.getters.hasAccount) {
      next({ name: 'register' })
    } else {
    
      next() // go to wherever I'm going
    }
    return;
  } 

  if(to.meta.disableIfLoggedIn && store.getters.hasAccount){
    

    return next({name:"main"})
  }
  next();
})

const clickOutside = {
  beforeMount: (el, binding) => {
    el.clickOutsideEvent = event => {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        binding.value(event);
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: el => {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};

app.directive("click-outside", clickOutside)

app.use(i18n);
app.use(router)
app.use(store)
console.log(i18n)
dayjs.locale(i18n.locale);
dayjs.extend(relativeTime)

app.mount('#app')


