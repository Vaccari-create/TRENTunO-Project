<script setup>
import { ref } from 'vue';
import { router } from '@/main';
import { API } from '@/main';
import { loggedUser } from '@/login';
const rname = ref(null);
const rx = ref(null);
const ry = ref(null);
const rdes = ref(null)

function submit() {
   

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", "token": loggedUser.token
             },
            body: JSON.stringify({ name: rname.value, x_coord: rx.value, y_coord: ry.value, description: rdes.value, rating: 4.2, categories: ["Sport","Pet"]})
        };
        fetch(API+"/api/parks/?adminId="+loggedUser.id, requestOptions)
        .then(response => response.json())
        .then(data =>  
                    alert(data.message)
                     );
        router.push("/")
    
}
</script>

<template>
    <div class="flex justify-center items-center h-full">
        <div class=" bg-lime-200 p-9 rounded-md shadow-lg ">
            <h2 class=" text-3xl font-bold"> Add Park </h2>
            <div class=" my-4">
            <span class=" font-semibold" >Name</span>
            <input type="text" name="Email" v-model="rname"id="name" class=" block text-lg p-1 w-full bg-white rounded border-gray-200 border-2">
          </div>
            <div class=" my-4 flex justify-center gap-2">
                <div >
                    <span class=" font-semibold"> X </span>
                    <input type="number" v-model="rx" name="y" class=" block text-lg p-1 bg-white rounded border-gray-200 border-2">
                </div>
                <div>
                    <span class=" font-semibold"> Y </span>
                    <input type="number" v-model="ry" name="x" class=" block text-lg p-1 bg-white rounded border-gray-200 border-2">
                </div>
            </div>
            <div class="my-4">
            <span class=" font-semibold">Description</span>
            <textarea v-model="rdes" name="Description" id="" class=" bg-white block text-lg p-1 w-full rounded border-gray-200 h-24 border-2"></textarea>
            </div>
            <button @click="submit" class=" text-xl font-semibold p-3 px-8 rounded-full bg-slate-500 text-white">Create</button>
        
        </div>
    </div>
</template>