<script setup>
import Review from './Review.vue';
import { ref } from 'vue';
import { loggedUser, clearLoggedUser } from '@/login';
import EventItem from './EventItem.vue';
import DeleteEvent from './DeleteEvent.vue';
import { router, API } from '@/main';

console.log(loggedUser)
if(loggedUser.id == undefined){
    alert("Login non effettuato " )
    router.push('/login')
}

const n = ref('')
const s = ref('')
const p = ref('')
const em = ref('')

fetch(API + '/api/users/'+loggedUser.id).then(res => res.json())
    .then(data => {
        n.value = data.name
        s.value = data.surname
        em.value = data.email
        p.value = data.password
    })

const revs = ref(null);
const unames = ref([])
fetch(API+'/api/reviews/?user_id='+loggedUser.id).then(res => res.json())
    .then(data => {
        revs.value = data
        for (let index = 0; index < revs.value.length; index++) {
            fetch(API+'/api/parks/'+revs.value[index].park_id).then(res => res.json())
                    .then(data => unames.value[index] = data) 
        }
    }
)
const eves = ref(null)
fetch(API+'/api/events/?user_id='+loggedUser.id).then(res => res.json())
    .then(data => eves.value = data)

function logout(){
    clearLoggedUser()
    router.push('/')
}

function salva(){
    const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", "token": loggedUser.token },
    body: JSON.stringify({ updateFields: { name: n.value, surname: s.value, email: em.value}})
            };
    fetch(API+"/api/users/"+loggedUser.id, requestOptions)
                .then(response => response.json())
                .then(data =>  {
                    alert(data.message)
                    router.push('/') });

}

function cpass(){
    const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", "token": loggedUser.token },
    body: JSON.stringify({  password: p.value})
            };
    fetch(API+"/api/users/changePassword/"+loggedUser.id, requestOptions)
                .then(response => response.json())
                .then(data =>  {
                    alert(data.message)
                    router.push('/')} );

}
</script>

<template>
    <div class=" flex gap-10">
    <div class=" flex flex-col ml-24 p-4 w-1/2 gap-5 mt-10">
        <div class=" flex gap-5 items-center">
            <img class=" block rounded-full w-20 h-20 object-center" src="https://arcticroadtrips.com/wp-content/uploads/2024/07/Aurora-Tour-Rovaniemi-finland-768x512.jpg" alt="">  
            <button class=" text-xl font-semibold p-3 px-8  rounded-full bg-lime-200 text-black">Imposta </button>
            <input type="file" class=" hidden" name="my_file" id="my-file">
            <button class=" text-xl font-semibold p-3 px-8  rounded-full bg-red-300 text-black">Rimuovi</button>
        </div>
        <div >
            <span class=" font-semibold"> Name </span>
            <input type="text" v-model="n" name="Name" class=" block text-lg p-1 w-full rounded border-gray-200 border-2">
        </div>
        <div>
            <span class=" font-semibold"> Surname </span>
            <input type="text" v-model="s" name="Surname" class=" block text-lg p-1 w-full rounded border-gray-200 border-2">
        </div>
        <div>
            <span class=" font-semibold"> Email </span>
            <input type="text" v-model="em" name="Email" class=" block text-lg p-1 w-full rounded border-gray-200 border-2">
        </div>
        <button @click="salva" class=" text-xl font-semibold p-3 px-8 self-end rounded-full bg-slate-500 text-white">Salva Modifiche</button>
        <div>
            <span class=" font-semibold"> Password </span>
            <input type="text" v-model="p" name="Surname" class=" block text-lg p-1 w-full rounded border-gray-200 border-2">
        </div>
        <button @click="cpass" class=" self-end text-xl mt-3 font-semibold p-3 px-8 self-end rounded-full bg-slate-500 text-white">Cambia Password</button>
        <button @click="logout" class=" text-xl font-semibold p-3 px-8 self-end rounded-full bg-red-300 text-white">LogOut</button>
        
    </div>
    <div class=" flex flex-col gap-5 w-1/2 p-4 ">
        <div class=" text-3xl font-bold text-center p-4">Le tue Recensioni</div>
        
        <Review v-for="(item,index) in revs" :name="unames[index].name" :text="item.Description" :rating="item.Rating"/> 
        
    </div>
    </div>
    <div class="flex justify-center">
        <div class=" flex flex-col gap-5 w-1/2 p-4 items-center ">
            <div class=" text-3xl font-bold text-center p-4">I tuoi Eventi</div>
            <div v-for="(item, index) in eves" class=" flex gap-2 items-center">
                <EventItem  :title="item.title" :date="item.date" :description="item.description" />
                <DeleteEvent :id="item._id" />
            </div>
            
        </div>
    </div>
</template>
