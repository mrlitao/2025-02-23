import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from '@/routers'
// pinia store
import pinia from "@/stores";
createApp(App).use(ElementPlus).use(router).use(pinia).mount('#app')
