import { useEffect, useState } from "react";
import "./App.css";
import { Header, SideBar } from "./components";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "./services/auth";
import { login as authLogin, logout } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);

  const [slide, setSlide] = useState(false);

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

  const handleSlide = () => {
    setSlide(!slide);
  };

  return !loading ? (
    <>
      <div className="min-h-screen flex flex-wrap content-between  w-full">
        <div className="w-full block">
          <Header setSlide={handleSlide} slide={slide} />
          <main>
            <div className="flex flex-col">
              {slide && (
                <div
                  className={`w-40 z-[999] fixed  h-[100vh] bg-slate-600 left-0 overflow-hidden animate-slide-in`}
                >
                  <div className="w-full">
                    <div className="group inset-l-0 z-40n w-full p-2">
                      <div>
                        <SideBar />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className={`absolute flex flex-col  ${slide ? " w-full items-end": "w-full"} `} onClick={() => setSlide(false)}>
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  ) : null;
}

export default App;
