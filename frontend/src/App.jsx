import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "./services/auth";
import { login as authLogin, logout } from "./store/authSlice";

function App() {
  const [loaing, setLoading] = useState(true);

  
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if(userData){
          dispatch(authLogin(userData.data))
        }else{
          dispatch(logout())
          navigate('/login')
        }
      })
      .catch((error) => error)
      .finally(() => setLoading(false))
  }, []);

  return !loaing ? (
    <>
      <div className="min-h-screen flex flex-wrap content-between ">
        <div className="w-full block">
          <Header />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  ):null
}

export default App;
