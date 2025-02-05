<script setup>
import Navbar from '@/components/Navbar.vue';
import MainFooter from '@/components/MainFooter.vue';
import EventItem from '@/components/EventItem.vue';
import Review from '@/components/Review.vue';
import { ref } from 'vue';
import { loggedUser } from '@/login';

import { router } from '@/main';



const props = defineProps(['id']);

const rnumber = ref()
const rdescription = ref("")
const rreport = ref("")


const parkInfo = ref({ name : "" })

fetch('http://localhost:3030/api/parks/'+props.id).then(res => res.json())
    .then(data => parkInfo.value = data)

const revs = ref("null");
const unames = ref([])
fetch('http://localhost:3030/api/reviews/?park_id='+props.id).then(res => res.json())
    .then(data => {
        console.log(data)
        revs.value = data
        for (let index = 0; index < revs.value.length; index++) {
            fetch('http://localhost:3030/api/users/'+revs.value[index].user_id).then(res => res.json())
                    .then(data => unames.value[index] = data) 
        }
    }
)


const eves = ref(null)
fetch('http://localhost:3030/api/events/?park_id='+props.id).then(res => res.json())
    .then(data => eves.value = data)

function submit() {
    console.log(loggedUser.id)
        const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" , "token" : loggedUser.token },
    body: JSON.stringify({ user_id: loggedUser.id, park_id: props.id, Rating: rnumber.value, Description: rdescription.value})
            };
    try{
            fetch("http://localhost:3030/api/reviews", requestOptions)
                .then(response => response.json())
                .then(data => alert(data.message));
    }catch(error){
        alert(error.message)
    }
    rnumber.value = ""
    rdescription.value = ""
}

function rep(){
    console.log(loggedUser.id)

    const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", "token" : loggedUser.token },
    body: JSON.stringify({ user_id: loggedUser.id, park_id: props.id, status: true, description: rreport.value})
            };
            fetch("http://localhost:3030/api/reports", requestOptions)
                .then(response => response.json())
                .then(data =>  data );
    rreport.value = ""
}
</script>

<template>
    <Navbar/>
    <div>
        <div class=" flex justify-between p-10 bg-orange-200 rounded-b-3xl">
            <div>
                <div class=" text-6xl font-bold mb-10">{{parkInfo.name}}</div>
                <div>
                    <span > Position : </span>
                    <div class=" font-semibold" > {{parkInfo.x_coord}} , {{ parkInfo.y_coord }}</div>
                </div>
                <div>
                    <span > Categories : </span>
                    <div class=" flex gap-5 font-semibold" >
                        <div v-for="item in parkInfo.services">{{item}}</div>
                    </div>
                </div>
                <div>
                    <span > <b>Rating</b> : {{ parkInfo.rating }} </span>
                  
                </div>
            </div>
            <div class=" flex flex-col gap-6 justify-center self-end">
                <div class=" text-xl font-bold p-4 rounded-md bg-lime-200">Eventi :</div>
                <EventItem v-for="(item, index) in eves" :title="item.title" :date="item.date" :description="item.description" />
            </div>
        </div>
        <div class=" flex items-center flex-col gap-5 p-4">
            <div class=" max-w-lg text-2xl font-bold text-center ">Info</div>
            <div class=" max-w-5xl text-center">  {{ parkInfo.description }}</div>
        </div>
    </div>
    <div class=" flex flex-col gap-6 justify-center self-end p-10">
        <div class=" text-xl max-w-fit font-bold p-4 rounded-md bg-lime-200">Recensioni :</div>
           <div class=" flex justify-between items-center">
            <div>
                <label>Rating</label>
                <input type="number" name="" v-model="rnumber" id="" class=" block text-lg p-1 w-full rounded border-gray-200 border-2">
            </div>
            <div>
                <label>Description</label>
                <textarea v-model="rdescription" class=" block text-lg p-1 w-96 rounded border-gray-200 border-2" />
            </div>
            <button @click="submit" class=" block text-xl font-semibold px-8 p-3 rounded-full bg-slate-500 text-white" >Submit</button>
        </div>
        <Review v-for="(item,index) in revs" :name="unames[index].name" :text="item.Description" :rating="item.Rating"/> 
        <div class=" text-xl max-w-fit font-bold p-4 rounded-md bg-red-200">Add a Report :</div>
        <div class=" flex justify-between items-center">
                <div>
                    <label>Description</label>
                    <textarea v-model="rreport" class=" block text-lg p-1 w-96 rounded border-gray-200 border-2" />
                </div>
                <button @click="rep" class=" block text-xl font-semibold px-8 p-3 rounded-full bg-slate-500 text-white" >Submit</button>
        </div>
    </div>
    <MainFooter/>
</template>
