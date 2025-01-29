<script setup>
import Review from './Review.vue';
</script>

<template>
    <div class=" flex flex-col ml-24 max-w-screen-sm gap-5 mt-10">
        <div class=" flex gap-5 items-center">
            <img class=" block rounded-full w-20 h-20 object-center" src="https://www.afnews.info/wordpress/wp-content/uploads/2013/12/100x140_EARL1-705x1024.jpg" alt="">  
            <button class=" text-xl font-semibold p-3 px-8  rounded-full bg-lime-200 text-black">Imposta </button>
            <input type="file" class=" hidden" name="my_file" id="my-file">
            <button class=" text-xl font-semibold p-3 px-8  rounded-full bg-red-300 text-black">Rimuovi</button>
        </div>
        <div >
            <span class=" font-semibold"> Name </span>
            <input type="text" name="Name" class=" block text-lg p-1 w-full rounded border-gray-200 border-2">
        </div>
        <div>
            <span class=" font-semibold"> Surname </span>
            <input type="text" name="Surname" class=" block text-lg p-1 w-full rounded border-gray-200 border-2">
        </div>
        <div>
            <span class=" font-semibold"> Description </span>
            <textarea name="description" class=" block text-lg p-1 w-full rounded border-gray-200 border-2 h-24"></textarea>
        </div>
        <button class=" text-xl font-semibold p-3 px-8 self-end rounded-full bg-slate-500 text-white">Salva</button>
        <Review name="Alan Turing" text="loabiahdkakb fakbfkabk ilhiahbc baifbaksbcibwkj bjabfkbwkjaj"/>
    </div>
</template>