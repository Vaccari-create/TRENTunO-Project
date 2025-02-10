<script setup>
import Navbar from '@/components/Navbar.vue';
import MainFooter from '@/components/MainFooter.vue';
import EventRequestItem from '@/components/EventRequestItem.vue';
import { ref } from 'vue';
import { API } from '@/main';
const eves = ref(null)
const unames = ref([])
fetch(API+'/api/events/?status='+false).then(res => res.json())
    .then(data => {
        eves.value = data
        for (let index = 0; index < eves.value.length; index++) {
            fetch(API+'/api/parks/'+eves.value[index].park_id).then(res => res.json())
                    .then(data => unames.value[index] = data) 
        }
    }

    )
</script>

<template>
    <Navbar/>
    <div class=" text-3xl font-bold text-center p-4">Event Request</div>
    <div class=" flex items-center flex-wrap gap-5 p-4">
        <EventRequestItem v-for="(item,index) in eves" :id="item._id" :title="item.title" :place="unames[index].name" :date="item.date" :text="item.description" />
    </div>
    <MainFooter/>


</template>