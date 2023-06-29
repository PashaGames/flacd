<script setup>
import { RouterLink } from "vue-router";
</script>
<template >

    <button type="button" id="sidebar-button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" @click="sidebarButtonClick">
        <span class="sr-only">Open sidebar</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
           <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
     </button>
     
     <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar" :class="{'transform-none':this.sidebarOpen}" v-click-outside="bodyClick">
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-100 ">
           <ul class="space-y-2 font-medium">
              <li class="py-2 text-xl text-center border-b-2 border-gray-300 border-dashed rounded-lg" >
                <img src="../assets/logo.svg" alt="logo" class="inline-block w-6 h-6">
                <div>Flacd</div>
              </li>
              <li>
                 <router-link to="/" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200">
                    <svg class="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"/>
                      </svg>
                    <span class="ml-3">{{$t("main.home")}}</span>
                 </router-link>
              </li>
              <li>
                <router-link to="/flashcards" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200">
                    <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.656 12.115a3 3 0 0 1 5.682-.015M13 5h3m-3 3h3m-3 3h3M2 1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm6.5 4.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
                      </svg>
                   <span class="ml-3">{{$t("main.flashcards")}}</span>
                </router-link>
             </li>
 
              <!-- <li>
                <router-link to="/stats" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200">
                    <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                        <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                          <path d="M9 4.025A7.5 7.5 0 1 0 16.975 12H9V4.025Z"/>
                          <path d="M12.5 1c-.169 0-.334.014-.5.025V9h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 12.5 1Z"/>
                        </g>
                      </svg>
                   <span class="ml-3">{{$t("main.stats")}}</span>
                </router-link>
             </li> -->
       
           <li>
            <div class="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer hover:bg-gray-200" @click="logout">
                <svg class="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"/>
                  </svg>
               <span class="ml-3">{{$t("main.logout")}}</span>
                </div>
            </li>
            <li @mouseover="showLangDropdown = true" @mouseleave="showLangDropdown = false">
                <div class="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer hover:bg-gray-200" >
                    <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19ZM8.374 17.4a7.6 7.6 0 0 1-5.9-7.4c0-.83.137-1.655.406-2.441l.239.019a3.887 3.887 0 0 1 2.082 2.5 4.1 4.1 0 0 0 2.441 2.8c1.148.522 1.389 2.007.732 4.522Zm3.6-8.829a.997.997 0 0 0-.027-.225 5.456 5.456 0 0 0-2.811-3.662c-.832-.527-1.347-.854-1.486-1.89a7.584 7.584 0 0 1 8.364 2.47c-1.387.208-2.14 2.237-2.14 3.307a1.187 1.187 0 0 1-1.9 0Zm1.626 8.053-.671-2.013a1.9 1.9 0 0 1 1.771-1.757l2.032.619a7.553 7.553 0 0 1-3.132 3.151Z"/>
                      </svg>
                   <span class="ml-3">{{$t("main.change_lang")}}</span>
          
                </div>
                <div class="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44" v-if="showLangDropdown" >
                    <ul class="py-2 text-sm text-gray-700 ">
                      <li v-for="(item,index) in $i18n.availableLocales" class="cursor-pointer">
                        <div class="block px-4 py-2 hover:bg-gray-100" @click="$store.commit('changeLanguage',item)">{{$t('languages.'+item)}}</div>
                      </li>
             
                    </ul>
                </div>
             </li>
        </ul>
        </div>
     </aside>

     <div class="fixed inset-0 z-30 bg-gray-900 bg-opacity-50" v-if="sidebarOpen">
         <!-- если открыт сайдбар то это затемняет фон-->
     </div>
     
  
</template>

<script>
export default {
    data(){
        return {
            sidebarOpen: false,
            showLangDropdown: false
        } 
    },
    methods: {
        sidebarButtonClick(){
            this.sidebarOpen = true;
        },
        bodyClick(e) {
          
            if(e.srcElement.id != "sidebar-button" && e.srcElement.parentNode.id != "sidebar-button"){
                this.sidebarOpen = false;
          
            }
        },
        logout(){
            this.$store.commit("clearUserInfo")
        }
    }
}
</script>