<script setup>
import { ref } from 'vue';
import { router } from '@/main';
const rname = ref(null);
const rsurname = ref(null);
const rpassword = ref(null);
const remail = ref(null)
const rconf = ref(null)

function submit() {
        // console.log("--------")
    if(rpassword.value != rconf.value)
        alert("Le password non corrispondono")
    else{

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: rname.value, surname: rsurname.value, email: remail.value, password: rpassword.value })
        };
        fetch("http://localhost:3030/api/users", requestOptions)
        .then(response => response.json())
        .then(data =>  data );
        router.push("/login")
    }
}
</script>

<template>
    <div class="flex justify-center items-center h-full">
        <div class=" bg-lime-200 p-9 rounded-md shadow-lg ">
            <h2 class=" text-3xl font-bold"> Register Form </h2>
            <div class=" text-sm"><span>Already have an account ? </span><router-link class=" underline text-indigo-500" to="/login" >Log in</router-link></div>
            <div class=" my-4 flex justify-center gap-2">
                <div >
                    <span class=" font-semibold"> Name </span>
                    <input type="text" v-model="rname" name="Name" class=" block text-lg p-1 rounded border-gray-200 border-2">
                </div>
                <div>
                    <span class=" font-semibold"> Surname </span>
                    <input type="text" v-model="rsurname" name="Surname" class=" block text-lg p-1 rounded border-gray-200 border-2">
                </div>
            </div>
            <div class=" my-4">
            <span class=" font-semibold" >Email</span>
            <input type="email" name="Email" v-model="remail"id="email" class=" block text-lg p-1 w-full rounded border-gray-200 border-2">
          </div>
           <div class="my-4">
            <span class=" font-semibold">Password</span>
            <input type="password" v-model="rpassword" name="Password" id="password" class=" block text-lg p-1 w-full rounded border-gray-200 border-2">
            </div>
            <div class="my-4">
            <span class=" font-semibold">Conferma Password</span>
            <input type="password" v-model="rconf" name="ConfermaPassword" id="confpassword" class=" block text-lg p-1 w-full rounded border-gray-200 border-2">
            </div> 
            <button @click="submit" class=" text-xl font-semibold p-3 px-8 rounded-full bg-slate-500 text-white">Register</button>
        
        </div>
    </div>
</template>