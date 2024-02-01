import axios from "axios";

export class AuthService {
  async createAccount({ name, email, password }) {
    try {
        const userAccount = await axios.post("http://localhost:8080/api/v1/users/register", {
            username: name,
            email: email,
            password: password,
          })
          if(userAccount){
          return  this.Login(email ,password)
          }else{
            return userAccount
          }
    } catch (error) {
        throw error
    }

  }


  async Login (email, password){
  try {
  const res = await axios.post('http://localhost:8080/api/v1/users/login',{
      email,password
    })
    // console.log(res)
    return res
  } catch (error) {
    console.log('login', error)
  }
  }


  async getCurrentUser(){
   try {
    return await axios.get('http://localhost:8080/api/v1/users/current-user')
   } catch (error) {
    console.log('getCurrentUsser', error)
   }

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
