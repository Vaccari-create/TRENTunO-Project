<script setup>
import { ref } from 'vue';
import { router } from '@/main';
const rpass = ref(null)
const remail = ref(null)
function login(){
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "JoaoVictor31@admin.com", password: "Admin31"})
            };
            fetch("http://localhost:3030/api/users/authentications", requestOptions)
                .then(response => response.json())
                .then(data =>  {
                console.log(data) 
                  if(data.success){
                    document.cookie = "userId="+data.userId;
                    router.push("/")
                  }else{
                    alert("Wrong email or password")
                  }
                }
              );

}
</script>

<template>
    <div class="flex justify-center items-center h-full">
        <div class=" bg-lime-200 p-9 rounded-md shadow-lg">
            <h2 class=" text-3xl font-semibold"> Login Form </h2>
            <div class=" text-sm"><span>Don't have an account ? </span><router-link class=" underline text-indigo-500" to="/register" >Create an account</router-link></div>
          <div class=" my-4">
            <span class=" font-semibold" >Email</span>
            <input type="email" v-model="remail" name="Email" id="" class=" block text-lg p-1 w-full rounded border-gray-200 border-2">
          </div>
          <div class=" my-4">
            <span class=" font-semibold"> Password </span>
            <input type="text" v-model="rpass" name="passwrod" class=" block text-lg p-1 w-full rounded border-gray-200 border-2 ">
        </div>            
            <button @click="login" class=" text-xl font-semibold p-3 px-8  rounded-full bg-slate-500 text-white">Login</button>
        
        </div>
    </div>
</template>