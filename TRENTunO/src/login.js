import { createApp, reactive, ref } from 'vue'

const loggedUser = reactive({
    token: undefined, id:undefined, auth: undefined
  })
  
  function setLoggedUser(data) {
    console.log("Sono dentro ")
    console.log(data)
      loggedUser.token = data.token
      loggedUser.id =data.userId
      loggedUser.auth = data.auth
    console.log("Log --- "+ loggedUser)
  }
  
  function clearLoggedUser(){
    loggedUser.auth = undefined
    loggedUser.token = undefined
    loggedUser.id = undefined
  }
  
  export {loggedUser , setLoggedUser, clearLoggedUser}