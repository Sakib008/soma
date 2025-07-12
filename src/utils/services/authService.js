import axios from "axios";

const login = async ({username,password})=>{
    const res = await axios.post('/api/auth/login',{username,password})
    return res
}

const signup = async (userdata)=>{
   const res = await axios.post('/api/auth/signup',userdata)
   return res
}


export {login,signup}