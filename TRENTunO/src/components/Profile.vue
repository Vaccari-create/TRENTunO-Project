<script setup>
import Review from './Review.vue';
import { ref } from 'vue';
import { loggedUser, clearLoggedUser } from '@/login';

import { router, API } from '@/main';

console.log(loggedUser)
if(loggedUser.id == undefined){
    alert("Login non effettuato " )
    router.push('/login')
}

const n = ref('')
const s = ref('')

fetch(API + '/api/users/67a4bf10c4bc572b7976126e').then(res => res.json())
    .then(data => {
        n.value = data.name
        s.value = data.surname
    })

const revs = ref(null);
const unames = ref([])
fetch(API+'/api/reviews/?user_id='+loggedUser.id).then(res => res.json())
    .then(data => {
        revs.value = data
        for (let index = 0; index < revs.value.length; index++) {
            fetch(API+'/api/parks/'+revs.value[index].park_id).then(res => res.json())
                    .then(data => unames.value[index] = data) 
        }
    }
)

function logout(){
    clearLoggedUser()
    router.push('/')
}
</script>

<template>
    <div class=" flex flex-col ml-24 max-w-screen-sm gap-5 mt-10">
        <div class=" flex gap-5 items-center">
            <img class=" block rounded-full w-20 h-20 object-center" src="https://arcticroadtrips.com/wp-content/uploads/2024/07/Aurora-Tour-Rovaniemi-finland-768x512.jpg" alt="">  
            <button class=" text-xl font-semibold p-3 px-8  rounded-full bg-lime-200 text-black">Imposta </button>
            <input type="file" class=" hidden" name="my_file" id="my-file">
            <button class=" text-xl font-semibold p-3 px-8  rounded-full bg-red-300 text-black">Rimuovi</button>
        </div>
        <div >
            <span class=" font-semibold"> Name </span>
            <input type="text" v-model="n" name="Name" class=" block text-lg p-1 w-full rounded border-gray-200 border-2">
        </div>
        <div>
            <span class=" font-semibold"> Surname </span>
            <input type="text" v-model="s" name="Surname" class=" block text-lg p-1 w-full rounded border-gray-200 border-2">
        </div>
        <button class=" text-xl font-semibold p-3 px-8 self-end rounded-full bg-slate-500 text-white">Salva</button>
        <button @click="logout" class=" text-xl font-semibold p-3 px-8 self-end rounded-full bg-red-300 text-white">LogOut</button>
        <Review v-for="(item,index) in revs" :name="unames[index].name" :text="item.Description" :rating="item.Rating"/> 
        
    </div>
</template>
