<script setup>
import Navbar from '@/components/Navbar.vue';
import MainFooter from '@/components/MainFooter.vue';
import ReportItem from '@/components/ReportItem.vue';
import { ref } from 'vue';
import { API } from '@/main';
const reps = ref([]);

const unames = ref([])
fetch(API+'/api/reports').then(res => res.json())
    .then(data => {
        for (let index = 0; index < data.length; index++) {
            if(data[index].status != "Chiusa"){

                reps.value[index] = data[index]
                fetch(API+'/api/parks/'+data[index].park_id).then(res => res.json())
                .then(data => unames.value[index] = data) 
            }
        }
    }
)
</script>

<template>
    <Navbar/>
    <div class=" text-3xl font-bold text-center p-4">Report</div>
    <div class=" flex items-center gap-5 p-4 flex-wrap">
        <ReportItem v-for="(item,index) in reps" :id="item._id" :user="unames[index].name" :text="item.description" />
    </div>
    <MainFooter/>
</template>