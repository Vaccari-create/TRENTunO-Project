<script setup>
import { ref } from 'vue';
const props = defineProps(['user','text'])

const read = ref('')

function letto(){
    read.value = 'hidden'
}
</script>

<template>
     <div :class="read" class=" p-3 rounded-md bg-slate-300 shadow-lg max-w-screen-md" >
        <div>
            {{ props.user }} 
        </div>
        <div class=" p-3">
            <p>{{ props.text }}</p>
        </div>
        <div class=" flex gap-2 items-center">
            <button  class=" font-semibold p-3 px-8  rounded-full bg-green-300 text-black">Prendere in carico</button>
            <button @click="letto"  class=" text-xl font-semibold p-3 px-8  rounded-full bg-red-300 text-black">Chiudere</button>
        </div>
        
    </div>
</template>