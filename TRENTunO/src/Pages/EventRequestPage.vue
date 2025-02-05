<script setup>
import Navbar from '@/components/Navbar.vue';
import MainFooter from '@/components/MainFooter.vue';
import EventRequestItem from '@/components/EventRequestItem.vue';
import { ref } from 'vue';
const items = ref([{ title: 'Calcetto',place:'Albere',date:'11/11/2025', text: 'Voglio fare una partiata a calcio'}, { title: 'Calistenia',place:'Piazza Venezia',date:'12/01/2025', text: 'Cerco persone con cui allenarmi e fare nuove amicizie' }])
</script>

<template>
    <Navbar/>
    <div class=" text-3xl font-bold text-center p-4">Event Request</div>
    <div class=" flex items-center gap-5 p-4">
        <EventRequestItem v-for="item in items" :title="item.title" :place="item.place" :date="item.date" :text="item.text" />
    </div>
    <MainFooter/>


</template>