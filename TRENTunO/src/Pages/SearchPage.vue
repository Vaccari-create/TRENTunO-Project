<script setup>
import Navbar from '@/components/Navbar.vue';
import ParkSearchItem from '@/components/ParkSearchItem.vue';
import MainFooter from '@/components/MainFooter.vue';
import { ref } from 'vue';

const parks = ref(null);

fetch('http://localhost:3030/api/parks/').then(res => res.json())
    .then(data => parks.value = data)


</script>

<template>
    <Navbar/>
    <div class=" bg-[url(https://external-preview.redd.it/QqAlTmY6VydeStvYDocXNkPamjKPe8zZUwVzjN689L4.jpg?auto=webp&s=789909d1e867095ae7ad0afa3f30026b7e7b7a8a)] h-svh">
        <div class=" flex justify-end">
            <div class=" flex flex-col gap-10 mt-10 mr-10">
            <div class=" bg-lime-200 p-3 rounded-sm ">
                <span class=" font-semibold">
                    Cerca:
                </span>
                <input type="text" name="serch" class=" block text-lg p-1 w-40 rounded border-gray-200 border-2">
            </div>
            <ParkSearchItem v-for="item in parks" :name="item.name" :id="item._id"/>
           
        </div>
     </div>
    </div>
    <MainFooter/>
</template>