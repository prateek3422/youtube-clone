import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import Videos from "./pages/Videos.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import LikedVideos from "./pages/likedVideos.jsx";
import History from "./pages/history.jsx";
import Collection from "./pages/Collection.jsx";
import Subscribers from "./pages/Subscribers.jsx";
import MyContent from "./pages/MyContent.jsx";
import AuthLayOut from "./components/authLayOut.jsx";
import Customise from "./pages/Customise.jsx";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {queryClient} from "./utils/query-client.js"


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayOut authentication>
            <Home />
          </AuthLayOut>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayOut authentication={false}>
            <Login />
          </AuthLayOut>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayOut authentication={false}>
            <Signup />
          </AuthLayOut>
        ),
      },
      {
        path: "/video/:slug",
        element: (
          <AuthLayOut authentication>
            <Videos />
          </AuthLayOut>
        ),
      },
      {
        path: "/liked-videos",
        element: (
          <AuthLayOut authentication>
            <LikedVideos />
          </AuthLayOut>
        ),
      },
      {
        path: "/history",
        element: (
          <AuthLayOut authentication>
            <History />
          </AuthLayOut>
        ),
      },
      // {
      //   path: "/collection",
      //   element: (
      //     <AuthLayOut authentication>
      //       <Collection />
      //     </AuthLayOut>
      //   ),
      // },
      {
        path: "/subscribers",
        element: (
          <AuthLayOut authentication>
            <Subscribers />
          </AuthLayOut>
        ),
      },
      {
        path: "/content",
        element: (
          <AuthLayOut authentication>
            <MyContent />
          </AuthLayOut>
        ),
      },
      {
        path: "/customise",
        element: (
          <AuthLayOut authentication>
            <Customise />
          </AuthLayOut>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      // transition="Bounce"
    />

    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false}/>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
