import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  
  const login = async (data) => {
    try {
      const LoginSession = await authService.Login(data)
      if(LoginSession){
        const userData  = await authService.getCurrentUser()
        // console.log(userData)
        if(userData)dispatch(authLogin(userData.data))
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }

  };
  return (
    <>
      <div className="auth h-[92vh] flex justify-center items-center">
        <div className="card  grid grid-cols-2 ">
          <div className="auth-img flex justify-center items-center">
            <img src="/images/login.svg" alt="signup-image" />
          </div>
          <div className="auth-details flex justify-center flex-col items-center">
            <div className="auth-title">
              <h1 className="mb-4">Welcome</h1>
            </div>
            <form onSubmit={handleSubmit(login)}>
              <Input
                lable="Email"
                type="email"
                className="mb-2"
                placeholder="Enter your email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              <Input
                lable="Password"
                type="password"
                className="mb-2"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />

              <Button className="w-full mt-4">Sign in</Button>
              <div className=" mt-2 flex justify-center items-center gap-2 ">
                <h1>Create new account</h1>
                <Link to="/signup" className="text-red-500">
                  Signup
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
