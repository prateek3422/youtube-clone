import { useEffect, useState } from "react";
import "./App.css";
import { Header, SideBar } from "./components";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "./services/auth";
import { login as authLogin, logout } from "./store/authSlice";

function App() {
  const [loaing, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(authLogin(userData.data));
        } else {
          dispatch(logout());
          navigate("/login");
        }
      })
      .catch((error) => error)
      .finally(() => setLoading(false));
  }, []);

  return !loaing ? (
    <>
      <div className=" flex flex-wrap content-between  dark:bg-gray-900 ">
        <div className="w-full block">
          <Header  />
          
          <main>
          
              <div div className="flex flex-auto p-4">
              <Outlet />
              </div>
          </main>
        </div>
      </div>
    </>
  ) : null;
}

export default App;
