<script setup>
const props = defineProps(['title','date','description'])
</script>

<template>
    <div class=" bg-white shadow-md rounded-md p-4  max-h-32 overflow-scroll">
        <div class=" flex justify-between mb-4 ">
            <div class=" font-semibold">{{ props.title }}</div>
            <div class=" self-end">{{ props.date }}</div>
        </div>
        <div>{{ props.description }}</div>
    </div>
</template>