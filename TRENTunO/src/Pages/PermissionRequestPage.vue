<script setup>
import Navbar from '@/components/Navbar.vue';
import MainFooter from '@/components/MainFooter.vue';
import EventRequestItem from '@/components/EventRequestItem.vue';
import { ref } from 'vue';
import { API } from '@/main';
import { loggedUser } from '@/login';
import PubRequestItem from '@/components/PubRequestItem.vue';

const eves = ref(null)
const unames = ref([])
fetch(API+'/api/pubPermissions/?user_level='+loggedUser.level).then(res => res.json())
    .then(data => {
        eves.value = data
        for (let index = 0; index < eves.value.length; index++) {
            fetch(API+'/api/users/'+eves.value[index].user_id).then(res => res.json())
                    .then(data => unames.value[index] = data) 
        }
    }

    )
</script>

<template>
    <Navbar/>
    <div class=" text-3xl font-bold text-center p-4">Permission Requests</div>
    <div class=" flex items-center flex-wrap gap-5 p-4">
        <PubRequestItem v-for="(item,index) in eves" :id="item._id" :userId="unames[index]._id" :name="unames[index].name"  :text="item.Description" />
    </div>
    <MainFooter/>
</template>