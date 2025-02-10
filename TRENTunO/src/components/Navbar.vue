<script setup>
import { ref } from 'vue';
import { loggedUser } from '@/login';

const vis = ref('hidden')

if(loggedUser.level == 'Admin'){
  vis.value = ''
}
</script>

<template>
      <nav class=" bg-lime-300 flex items-center justify-between p-6 lg:px-8 text-white" aria-label="Global">
      <div class="">
        <router-link to="/" class="block text-2xl font-bold">TRENTunO</router-link>
      </div>
      <div class="flex gap-7 items-center">
        <router-link :class="vis" to="/report" class="block text-lg font-semibold">Report</router-link>
          <router-link to="/search" class="block text-lg font-semibold">Search Park</router-link>
          <router-link to="/event" class="block text-lg font-semibold">Event</router-link>
          <router-link to="/permission" class="block text-lg font-semibold">Permission</router-link>
          <router-link :class="vis" to="/eventRequest" class="block text-lg font-semibold">Events Request</router-link>
      </div>
      <div class="flex items-center gap-4">
          <router-link to="/login" class="block text-lg font-semibold">Login</router-link>
          <router-link to="/profile" class="block">
          <img class=" rounded-full w-12 h-12 object-center" src="https://arcticroadtrips.com/wp-content/uploads/2024/07/Aurora-Tour-Rovaniemi-finland-768x512.jpg" alt="">  
          </router-link>
      </div>
    </nav>
</template>

