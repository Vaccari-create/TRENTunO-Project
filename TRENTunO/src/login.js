import { createApp, reactive, ref } from 'vue'

const loggedUser = reactive({
    token: undefined, id:undefined, auth: undefined, level: undefined
  })
  
  function setLoggedUser(data) {
      loggedUser.token = data.token
      loggedUser.id =data.userId
      loggedUser.auth = data.auth
      loggedUser.level = data.user_level
  }
  
  function clearLoggedUser(){
    loggedUser.auth = undefined
    loggedUser.token = undefined
    loggedUser.id = undefined
    loggedUser.level = undefined
  }
  
  export {loggedUser , setLoggedUser, clearLoggedUser}