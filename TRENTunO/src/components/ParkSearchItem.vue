<script setup>
import { onBeforeMount, ref } from 'vue';

const props = defineProps(['name','id']);


const tagClass = ref("");

onBeforeMount(async () => {
    tagClass.value = "/park/"+props.id;
});






</script>
<template>
     <div class=" p-3 rounded-md shadow-lg w-15 bg-white" >
        <span class=" text-xl font-semibold "><router-link :to="tagClass" >{{props.name}}</router-link></span>
    </div>
</template>