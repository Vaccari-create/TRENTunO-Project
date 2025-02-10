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
        <div class=" flex items-center">
            <button @click="letto"  class=" text-xl font-semibold p-3 px-8  rounded-full bg-red-300 text-black">Letto</button>
        </div>
    </div>
</template>