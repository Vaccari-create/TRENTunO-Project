<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import { API,router } from '@/main';
import { loggedUser } from '@/login';

const props = defineProps(['id','title','place','date','text'])
const rifiutato = ref('')

function fakerifiuta(){
    rifiutato.value = 'hidden'
}

function del(){
    const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "token": loggedUser.token },
    body: JSON.stringify({ })
            };
    fetch(API+"/api/events/"+props.id, requestOptions)
                .then(response => response.json())
                .then(data =>  {
                    alert(data.message)
                    router.push('/')} );
}

function accept(){
    const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", "token": loggedUser.token },
    body: JSON.stringify({ })
            };
    fetch(API+"/api/events/changeStatus/"+props.id+"?user_level="+loggedUser.level, requestOptions)
                .then(response => response.json())
                .then(data =>  {
                    alert(data.message)
                    router.push('/')} );
}
</script>

<template>
     <div :class="rifiutato" class=" p-3 rounded-md bg-lime-300 shadow-lg max-w-md " >
        <div class=" font-semibold">
            {{ props.title }} 
        </div>
        <div> <b>Place</b> : {{props.place}}</div>
        <div><b>Date</b> : {{ props.date }}</div>
        <div class=" p-3 max-h-28 overflow-scroll">
            <p>{{ props.text }}</p>
        </div>
        <div class=" flex items-center gap-5 justify-around">
            <button @click="accept" class="  font-semibold p-3 px-8 w-30 rounded-full bg-sky-300 text-black">Accetta</button>
            <button @click="fakerifiuta" class="  font-semibold p-3 px-8 w-30 rounded-full bg-red-300 text-black">Rifiuta</button>
        </div>
    </div>
</template>