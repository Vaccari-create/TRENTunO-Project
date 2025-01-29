<script setup>
import Navbar from '@/components/Navbar.vue';
import MainFooter from '@/components/MainFooter.vue';
import EventRequestItem from '@/components/EventRequestItem.vue';
import { ref } from 'vue';
const items = ref([{ title: 'Breganze',place:'',date:'11/11/1111', text: 'Un gruppo di castori ha bloccato il fiume. SI sono fatti una casa sti immigrati'}, { name: 'Venezia',place:'',date:'0/13/0', text: ' Ho trovato una bomba atomica russa sotto il canal Grande' }])
</script>

<template>
    <Navbar/>
    <div class=" text-3xl font-bold text-center p-4">Report</div>
    <div class=" flex items-center gap-5 p-4">
        <EventRequestItem v-for="item in items" :user="item.name" :place="item.place" :date="item.date" :text="item.text" />
    </div>
    <MainFooter/>


</template>