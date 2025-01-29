<template>
    <div class="flex justify-center items-center h-full">
        <div class=" bg-lime-200 p-9 rounded-md shadow-lg">
            <h2 class=" text-3xl font-semibold"> Login Form </h2>
            <div class=" text-sm"><span>Don't have an account ? </span><router-link class=" underline text-indigo-500" to="/register" >Create an account</router-link></div>
          <div class=" my-4">
            <span class=" font-semibold" >Email</span>
            <input type="email" name="Email" id="" class=" block text-lg p-1 w-full rounded border-gray-200 border-2">
          </div>
          <div class=" my-4">
            <span class=" font-semibold"> Password </span>
            <input type="text" name="passwrod" class=" block text-lg p-1 w-full rounded border-gray-200 border-2 ">
        </div>            
            <button class=" text-xl font-semibold p-3 px-8  rounded-full bg-slate-500 text-white">Login</button>
        
        </div>
    </div>
</template>