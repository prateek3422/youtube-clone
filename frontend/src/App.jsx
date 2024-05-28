import { useEffect, useState } from "react";
import "./App.css";
import { Header, Loader} from "./components";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "./services/auth";
import { login as authLogin, logout } from "./store/authSlice";
import MiniDrawer from "./components/Drawer";

function App() {
  const [loading, setLoading] = useState(true);
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


  return !loading ? (
    <>
      <div className="min-h-screen flex flex-wrap content-between bgDark w-full">
        <div className="w-full relative  bg-grey-dark">
          <Header />
          <main >
            <MiniDrawer>
              <Outlet />
            </MiniDrawer>
          </main>
        </div>
      </div>
    </>
  ) : <> <Loader/></>;
}

export default App;
