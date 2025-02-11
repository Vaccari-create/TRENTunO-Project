<script setup>
import { ref } from 'vue';
import { router,API } from '@/main';
import { loggedUser } from '@/login';

const des = ref('')
if(loggedUser.id == undefined){
    alert("Login non effettuato " )
    router.push('/login')
}

function submit(){
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", "token": loggedUser.token },
            body: JSON.stringify({ user_id: loggedUser.id, Description: des.value})
        };
        fetch(API+"/api/pubPermissions", requestOptions)
        .then(response => response.json())
        .then(data =>  
                    alert(data.message)
                     );
        router.push("/")
    
}
</script>

<template>
    <div class="flex justify-center items-center h-full">
        <div class=" bg-lime-200 p-9 rounded-md shadow-lg w-1/3">
            <h2 class=" text-3xl font-semibold"> Permission Form </h2>
            <div class=" text-sm"><span>Already have permission ? </span><router-link class=" underline text-indigo-500" to="/event" >Public Event</router-link></div>
          <div class=" my-4">
            <label class=" font-semibold"  for="myfile">Document Select a file:</label>
            <input type="file" class=" block text-lg p-1 w-full rounded" id="myfile" name="myfile">   
            
          </div>
           <div class="my-4">
            <span class=" font-semibold">Why?</span>
            <textarea v-model="des" name="Description" id="" class=" block text-lg p-1 w-full rounded border-gray-200 h-24 border-2"></textarea>
            </div>
            
            <button @click="submit" class=" text-xl font-semibold p-3 px-8  rounded-full bg-slate-500 text-white">Send</button>
          </div>
            </div>
   
</template>