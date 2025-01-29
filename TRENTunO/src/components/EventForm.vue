<template>
    <div class="flex justify-center items-center h-full">
        <div class=" bg-lime-200 p-9 rounded-md shadow-lg w-1/3">
            <h2 class=" text-3xl font-semibold"> Event Form </h2>
            <div class=" text-sm"><span>Don't have permission ? </span><router-link class=" underline text-indigo-500" to="/permission" >Get permission</router-link></div>
          <div class=" my-4">
            <span class=" font-semibold" >Name</span>
            <input type="email" name="Email" id="" class=" block text-lg p-1 w-full rounded border-gray-200 border-2">
          </div>
          
           <div class="my-4">
            <span class=" font-semibold">Description</span>
            <textarea  name="Description" id="" class=" block text-lg p-1 w-full rounded border-gray-200 h-24 border-2"></textarea>
            </div>
            <div class=" my-4">
                <label for="park" class=" font-semibold">Place</label>
                <select id="park" name="park" class=" block text-lg p-1 w-full rounded border-gray-200 border-2" >
                    <option value="Albere">Albere</option>
                    <option value="Venezia">Venezia</option>
                    <option value="BMW">BMW</option>
                    <option value="Norska">Norska</option>
                </select> 
            </div>
            <button class=" text-xl font-semibold p-3 px-8  rounded-full bg-slate-500 text-white">Public</button>
          </div>
            </div>
   
</template>