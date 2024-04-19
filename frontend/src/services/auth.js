import axios from "axios";

import { toast } from "react-toastify";

export class AuthService {
  async createAccount({ name, email, password }) {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
        withCredentials: true,
      };
      const userAccount = await axios.post(
        "http://localhost:3000/api/v1/users/register",
        {
          username: name,
          email: email,
          password: password,
        },
        config
      );
      if (userAccount) {
        return this.Login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw new error();
    }
  }

  async Login({ email, password }) {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
        withCredentials: true,
      };
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        {
          email: email,
          password: password,
        },
        config
      );

      // console.log(res)
      toast.success(res?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Bounce,
      });
      return res;
    } catch (error) {
      // console.log('login', error)
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Bounce,
      });
    }
  }

  async getCurrentUser() {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      };
      const res = await axios.get(
        " http://localhost:3000/api/v1/users/current-user",
        config
      );
      return res;
    } catch (error) {
      console.log("getCurrentUsser", error.message);
    }

    return null;
  }
  async getWatchHistory() {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      };
      const history = await axios.get(
        "http://localhost:3000/api/v1/users/history",
        config
      );
      return history.data;
    } catch (error) {
      console.log("getWatchHistory", error);
    }

    return null;
  }

  async logout() {
    try {
      const config = {
        withCredentials: true,
      };
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/logout",
        {},
        config
      );
      // console.log(res);
      toast.success(res?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Bounce,
      });
      return res;
    } catch (error) {
      console.log("logout", error);
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Bounce,
      });
    }
  }

  async getChannelDetails(userName) {
  
try {
      const config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      };
      const channel = axios.get(` http://localhost:3000/api/v1/users/c/${userName}`, config);
      return channel
} catch (error) {
  console.log(error)
}
  }
}

const authService = new AuthService();
export default authService;
