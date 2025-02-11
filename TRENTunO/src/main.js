import { createApp, reactive, ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './index.css'
import App from './App.vue'
import axios from 'axios'
import LoginPage from './Pages/LoginPage.vue'
import HomePage from './Pages/HomePage.vue'
import RegisterPage from './Pages/RegisterPage.vue'
import SearchPage from './Pages/SearchPage.vue'
import ParkPage from './Pages/ParkPage.vue'
import ProfilePage from './Pages/ProfilePage.vue'
import EventPage from './Pages/EventPage.vue'
import PermissionPage from './Pages/PermissionPage.vue'
import ReportPage from './Pages/ReportPage.vue'
import EventRequestPage from './Pages/EventRequestPage.vue'
import PermissionRequestPage from './Pages/PermissionRequestPage.vue'

export const API = "https://trentuno.onrender.com"

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/' , component: HomePage},
        {path: '/login' , component: LoginPage},
        {path: '/register', component: RegisterPage},
        {path: '/search', component: SearchPage},
        {path: '/park/:id', component: ParkPage, props:true},
        {path: '/event', component: EventPage},
        {path: '/permission', component: PermissionPage},
        {path: '/profile', component: ProfilePage},
        {path: '/report', component: ReportPage},
        {path: '/eventRequest', component: EventRequestPage},
        {path: '/pubRequest', component: PermissionRequestPage}
    ]
});


 


const app = createApp(App)

app.use(router);

app.mount('#app');
app.config.globalProperties.axios = axios