<script setup>
const props = defineProps(['user','text'])
</script>

<template>
     <div class=" p-3 rounded-md bg-slate-300 shadow-lg max-w-screen-md" >
        <div>
            {{ props.user }} 
        </div>
        <div class=" p-3">
            <p>{{ props.text }}</p>
        </div>
        <div class=" flex items-center">
            <button class=" text-xl font-semibold p-3 px-8  rounded-full bg-red-300 text-black">Rimuovi</button>
        </div>
    </div>
</template>