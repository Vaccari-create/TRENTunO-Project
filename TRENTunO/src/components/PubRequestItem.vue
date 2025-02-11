<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import { API,router } from '@/main';
import { loggedUser } from '@/login';

const props = defineProps(['id','userId','name','text'])


function del(){
    const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "token": loggedUser.token },
    body: JSON.stringify({ })
            };
    fetch(API+"/api/pubPermissions/"+props.id+'?user_level='+loggedUser.level, requestOptions)
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
    fetch(API+"/api/users/changeAuth/"+props.userId+"?adminId="+loggedUser.id, requestOptions)
                .then(response => response.json())
                .then(data =>  {
                    alert(data.message)
                    del()
                    router.push('/')} );
}
</script>

<template>
     <div  class=" p-3 rounded-md bg-lime-300 shadow-lg max-w-md " >
        <div class=" font-semibold">
            {{ props.name }} 
        </div>
        <div class=" p-3 max-h-28 overflow-scroll">
            <p>{{ props.text }}</p>
        </div>
        <div class=" flex items-center gap-5 justify-around">
            <button @click="accept" class="  font-semibold p-3 px-8 w-30 rounded-full bg-sky-300 text-black">Accetta</button>
            <button @click="del" class="  font-semibold p-3 px-8 w-30 rounded-full bg-red-300 text-black">Rifiuta</button>
        </div>
    </div>
</template>