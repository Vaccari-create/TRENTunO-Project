<script setup>
import { router, API } from '@/main';
import { loggedUser } from '@/login';
const props = defineProps(['id'])

function del(){
    const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "token": loggedUser.token },
            };
    fetch(API+"/api/events/"+props.id, requestOptions)
                .then(response => response.json())
                .then(data =>  {
                    alert(data.message)
                    router.push('/')} );
}


</script>

<template>
    <button @click="del"  class=" text-xl font-semibold p-3 px-8  rounded-full bg-red-300 text-black">Delete</button>
</template>