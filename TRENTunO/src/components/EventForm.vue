<script setup>
import { ref } from 'vue';
import { loggedUser } from '@/login';
import { router } from '@/main';

if(loggedUser.id == undefined){
    alert("Login non effettuato " )
    router.push('/login')
}



const parks = ref(null);
const rid = ref(null);
const rdescription = ref(null);
const rtitle = ref(null);
const rdate = ref(null)
fetch('http://localhost:3030/api/parks/').then(res => res.json())
    .then(data => parks.value = data)

function submit() {
    if(loggedUser.auth == false){
        alert("Non hai il permesso")
        router.push('/permission')
    }
    const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", "token" : loggedUser.token },
    body: JSON.stringify({ user_id: loggedUser.id, park_id: rid.value, title: rtitle.value, date: rdate.value, description: rdescription.value})
            };
            fetch("http://localhost:3030/api/events?auth="+loggedUser.auth, requestOptions)
                .then(response => response.json())
                .then(data =>  data );
    rid.value = null
    rdescription.value = null
    rdate.value = null
    rtitle.value = null
}
</script>

<template>
    <div class="flex justify-center items-center h-full">
        <div class=" bg-lime-200 p-9 rounded-md shadow-lg w-1/3">
            <h2 class=" text-3xl font-semibold"> Event Form </h2>
            <div class=" text-sm"><span>Don't have permission ? </span><router-link class=" underline text-indigo-500" to="/permission" >Get permission</router-link></div>
          <div class=" my-4">
            <span class=" font-semibold" >Title</span>
            <input type="text" name="Name" v-model="rtitle" id="" class=" block text-lg p-1 w-full rounded border-gray-200 border-2">
          </div>
          
           <div class="my-4">
            <span class=" font-semibold">Description</span>
            <textarea  name="Description" v-model="rdescription" id="" class=" block text-lg p-1 w-full rounded border-gray-200 h-24 border-2"></textarea>
            </div>
            <div class="my-4">
            <span class=" font-semibold">Date</span>
            <input type="date" v-model="rdate" name="Email" id="" class=" block text-lg p-1 w-full rounded border-gray-200 border-2">
            </div>
            <div class=" my-4">
                <label for="park" class=" font-semibold">Place</label>
                <select id="park" v-model="rid" name="park" class=" block text-lg p-1 w-full rounded border-gray-200 border-2" >
                    <option v-for="item in parks"  :value="item._id"> {{ item.name }}</option>
                </select> 
            </div>
            <button @click="submit" class=" text-xl font-semibold p-3 px-8  rounded-full bg-slate-500 text-white">Public</button>
          </div>
            </div>
   
</template>