<script setup>
import { defineProps } from 'vue';
import { ref } from 'vue';
import { router,API } from '@/main';
import { loggedUser } from '@/login';
const props = defineProps(['id','user','text'])

const read = ref('')

function letto(){
    read.value = 'hidden'
}

function carico(){
    const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", "token": loggedUser.token },
    body: JSON.stringify({ status: "Presa in Carico" })
            };
    fetch(API+"/api/reports/changeStatus/"+props.id+"?user_level="+loggedUser.level, requestOptions)
                .then(response => response.json())
                .then(data =>  {
                    alert(data.message)
                    router.push('/') });
}

function close(){
    const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", "token": loggedUser.token },
    body: JSON.stringify({ status: "Chiusa" })
            };
    fetch(API+"/api/reports/changeStatus/"+props.id+"?user_level="+loggedUser.level, requestOptions)
                .then(response => response.json())
                .then(data =>  {
                    alert(data.message)
                    router.push('/') });
}
</script>

<template>
     <div :class="read" class=" p-3 rounded-md bg-slate-300 shadow-lg max-w-screen-md" >
        <div>
            {{ props.user }} 
        </div>
        <div class=" p-3">
            <p>{{ props.text }}</p>
        </div>
        <div class=" flex gap-2 items-center">
            <button @click="carico" class=" font-semibold p-3 px-8  rounded-full bg-green-300 text-black">Prendere in carico</button>
            <button @click="close"  class=" text-xl font-semibold p-3 px-8  rounded-full bg-red-300 text-black">Chiudere</button>
        </div>
        
    </div>
</template>