<script setup>
defineProps({
    name: String,
    text:String,
    rating:Number,
})
</script>

<template>
    <div class=" p-3 rounded-md shadow-lg max-w-screen-md" >
        <div>
            <span class=" font-semibold " > {{ name }} </span>
            <div class=" flex items-center gap-2">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                <span v-for="n in rating" class="fa fa-star text-yellow-300"></span>
                <span v-for="n in (5 - rating)" class="fa fa-star"></span>
            </div>
        </div>
        <div class=" p-3">
            <p>{{ text }}</p>
        </div>
    </div>
</template>