import axios from "axios";
import Cookies from "js-cookie";

export class AuthService {
  async createAccount({ name, email, password }) {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
        withCredentials: true
      }
        const userAccount = await axios.post("http://localhost:8080/api/v1/users/register", {
            username: name,
            email: email,
            password: password,
          },config)
          if(userAccount){
          return  this.Login({email ,password})
          }else{
            return userAccount
          }
    } catch (error) {
        throw error
    }

  }


  async Login ({email, password}){
  try {
    const config = {
      headers: {
        "content-type": "application/json"
      },
      withCredentials: true
    }
  const res = await axios.post('http://localhost:8080/api/v1/users/login',{
      email:email,
      password:password,
    }, config)

    console.log(res)

    return res
  } catch (error) {
    console.log('login', error)
  }
  }


  async getCurrentUser(){
   try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true
    }
  const res = await axios.get('http://localhost:8080/api/v1/users/current-user',config)
  return res

   } catch (error) {
    console.log('getCurrentUsser', error)
   }

  //  return null

  }

  async logout (){
    try {
      return await axios.post('http://localhost:8080/api/v1/users/logout')
    } catch (error) {
      console.log('logout', error)
    }
  }
}

const authService = new AuthService();
export default authService;
