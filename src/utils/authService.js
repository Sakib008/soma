import { data } from "autoprefixer";
import axios from "axios";


const login = async ({username,password})=>{
    const res = await axios.post('/api/auth/login',{username,password})
    return res
}

const signup = async (req)=>{
   const res = await axios.post('/api/auth/signup',req)
   return res
}

const loginHandler = async (username,password)=>{
    try {
        const res = await login({username,password})
        const {data: {foundUser,encodedToken}} = res;
        localStorage.setItem("User" ,JSON.stringify(foundUser))
        localStorage.setItem("token",JSON.stringify(encodedToken))
        return res
    } catch (error) {
        console.error(error)
        throw error
    }
}

export {login,loginHandler,signup}