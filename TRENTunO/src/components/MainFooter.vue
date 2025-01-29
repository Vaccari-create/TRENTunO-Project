<script setup>
import IconEcosystem from './icons/IconEcosystem.vue';
</script>

<template>
    <nav class=" bg-black flex items-center justify-evenly p-10 lg:px-8" aria-label="Global">
        <div class="flex flex-col gap-2 text-gray-400 text-2xl" >
            <div>
                Making the world a worst place.
            </div>
            <div>
                Reminding that obesity is a choice  
            </div>
        </div>
        <div class="flex flex-col gap-2 text-gray-400">
            <span class=" text-xl font-bold text-white border-b border-lime-300">
                Company
            </span>
            <span>About US</span><span>Privacy Policy</span><span>Our Service</span><span>Affiliate</span>
        </div>
        <div class="flex flex-col gap-2 text-gray-400">
            <span class=" text-xl font-bold text-white border-b border-lime-300">
                Get Help
            </span>
            <span>FAQ</span><span>Contact Us</span><span>News</span><span>Documentation</span>
        </div>
        <div class="flex flex-col gap-2 text-gray-400">
            <span class=" text-xl font-bold text-white border-b border-lime-300">
                Social
            </span>
            <span>Facebook</span><span>Instagram</span><span>X ( Twitter )</span><span>Youtube</span>
        </div>
    </nav>
</template>