<script setup>
import Navbar from '@/components/Navbar.vue';
import MainFooter from '@/components/MainFooter.vue';
import EventItem from '@/components/EventItem.vue';
import Review from '@/components/Review.vue';
import { ref } from 'vue';
const props = defineProps(['id']);
const desc = ref("hackshaikhjfaifl khjaakjfb iljoajdoah ahflsjhofh akshdfdaoiw akhdkauhddjoajdoah ahflsjhofh akshdfdaoiw akhdkauhddjoajdoah ahflsjhofh akshdfdaoiw akhdkauhddjoajdoah ahflsjhofh akshdfdaoiw akhdkauhdd")
const items = ref([{ name: 'Pino', text: ' I hate this Park'}, { name: 'Zanatta', text: ' Good job guys' }])
</script>

<template>
    <Navbar/>
    <div>
        <div class=" flex justify-between p-10 bg-orange-200 rounded-b-3xl">
            <div>
                <div class=" text-6xl font-bold mb-10">Albere</div>
                <div>
                    <span > Position : </span>
                    <div class=" font-semibold" > Via di Marostica </div>
                </div>
                <div>
                    <span > Categories : </span>
                    <div class=" flex gap-5 font-semibold" >
                        <div>Fotanella</div>
                        <div>Parco Giochi</div>
                        <div>Lancio del Nano</div>
                    </div>
                </div>
            </div>
            <div class=" flex flex-col gap-6 justify-center self-end">
                <div class=" text-xl font-bold p-4 rounded-md bg-lime-200">Eventi :</div>
                <EventItem title="01" date="01/04/2025" :description="desc" />
                <EventItem title="02" date="20/07/2025" :description="desc" />
            </div>
        </div>
        <div class=" flex items-center flex-col gap-5 p-4">
            <div class=" max-w-lg text-2xl font-bold text-center ">Info</div>
            <div class=" max-w-5xl text-center">  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem provident molestiae quidem velit adipisci inventore fugit consequuntur maxime qui rem repellat minus veritatis in saepe, facilis quas non dolorem ipsa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore repellat quibusdam culpa quam officia ex rerum ullam vel suscipit magnam dolor repudiandae ea modi sed delectus corrupti nostrum, id reiciendis!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia perferendis quam eos odit enim deserunt cumque incidunt, eius ab necessitatibus maxime quidem ipsam consequatur impedit ratione ut dolor excepturi deleniti!</div>
        </div>
    </div>
    <div class=" flex flex-col gap-6 justify-center self-end p-10">
        <div class=" text-xl max-w-fit font-bold p-4 rounded-md bg-lime-200">Recensioni :</div>
        <Review v-for="item in items" :name="item.name" :text="item.text"/>
    </div>
    <MainFooter/>
</template>