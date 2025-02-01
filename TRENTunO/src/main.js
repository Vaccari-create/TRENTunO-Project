import { createApp } from 'vue'
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
        {path: '/eventRequest', component: EventRequestPage}
    ]
});

export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
 
const app = createApp(App)

app.use(router);

app.mount('#app');
app.config.globalProperties.axios = axios