<template>
    <div class="flex justify-center items-center h-full">
        <div class=" bg-lime-200 p-9 rounded-md shadow-lg ">
            <h2 class=" text-3xl font-bold"> Register Form </h2>
            <div class=" text-sm"><span>Already have an account ? </span><router-link class=" underline text-indigo-500" to="/login" >Log in</router-link></div>
            <div class=" my-4 flex justify-center gap-2">
                <div >
                    <span class=" font-semibold"> Name </span>
                    <input type="text" name="Name" class=" block text-lg p-1 rounded border-gray-200 border-2">
                </div>
                <div>
                    <span class=" font-semibold"> Surname </span>
                    <input type="text" name="Surname" class=" block text-lg p-1 rounded border-gray-200 border-2">
                </div>
            </div>
            <div class=" my-4">
            <span class=" font-semibold" >Email</span>
            <input type="email" name="Email" id="" class=" block text-lg p-1 w-full rounded border-gray-200 border-2">
          </div>
           <div class="my-4">
            <span class=" font-semibold">Password</span>
            <input type="password" name="Password" id="" class=" block text-lg p-1 w-full rounded border-gray-200 border-2">
            </div>
            <div class="my-4">
            <span class=" font-semibold">Conferma Password</span>
            <input type="password" name="ConfermaPassword" id="" class=" block text-lg p-1 w-full rounded border-gray-200 border-2">
            </div> 
            <button class=" text-xl font-semibold p-3 px-8 rounded-full bg-slate-500 text-white">Register</button>
        
        </div>
    </div>
</template>