<script setup>
defineProps({
    name: String,
    text:String
})
</script>

<template>
    <div class=" p-3 rounded-md shadow-lg max-w-screen-md" >
        <div>
            <span class=" font-semibold " > {{ name }} </span>
            <div class=" flex items-center gap-2">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                <span class="fa fa-star "></span>
                <span class="fa fa-star "></span>
                <span class="fa fa-star "></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
            </div>
        </div>
        <div class=" p-3">
            <p>{{ text }}</p>
        </div>
    </div>
</template>