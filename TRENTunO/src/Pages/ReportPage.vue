<script setup>
import Navbar from '@/components/Navbar.vue';
import MainFooter from '@/components/MainFooter.vue';
import ReportItem from '@/components/ReportItem.vue';
import { ref } from 'vue';
const items = ref([{ name: 'Breganze', text: 'Un gruppo di castori ha bloccato il fiume. SI sono fatti una casa sti immigrati'}, { name: 'Venezia', text: ' Ho trovato una bomba atomica russa sotto il canal Grande' }])
</script>

<template>
    <Navbar/>
    <div class=" text-3xl font-bold text-center p-4">Report</div>
    <div class=" flex items-center gap-5 p-4">
        <ReportItem v-for="item in items" :user="item.name" :text="item.text" />
    </div>
    <MainFooter/>
</template>