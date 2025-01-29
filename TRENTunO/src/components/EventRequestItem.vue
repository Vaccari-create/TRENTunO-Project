<script setup>
const props = defineProps(['title','place','date','text'])
</script>

<template>
     <div class=" p-3 rounded-md bg-lime-300 shadow-lg max-w-md " >
        <div class=" font-semibold">
            {{ props.title }} 
        </div>
        <div> <b>Place</b> : Fronte</div>
        <div><b>Date</b> : {{ props.date }}</div>
        <div class=" p-3 max-h-28 overflow-scroll">
            <p>{{ props.text }}</p>
        </div>
        <div class=" flex items-center gap-5 justify-around">
            <button class="  font-semibold p-3 px-8 w-30 rounded-full bg-sky-300 text-black">Accetta</button>
            <button class="  font-semibold p-3 px-8 w-30 rounded-full bg-red-300 text-black">Rifiuta</button>
        </div>
    </div>
</template>