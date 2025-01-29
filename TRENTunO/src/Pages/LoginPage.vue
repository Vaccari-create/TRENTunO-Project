<script setup>
import Login from '@/components/Login.vue';
import Navbar from '@/components/Navbar.vue';
import MainFooter from '@/components/MainFooter.vue';
import { ref } from 'vue';

function getCookie(cname) {
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
let userId = getCookie("userId");
const u = ref(userId);
</script>

<template>
    <Navbar/>
    <Login/>
    <div>{{ u }}</div>
    <MainFooter/>

</template>