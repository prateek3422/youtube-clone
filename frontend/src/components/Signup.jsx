import React from "react";
import { useForm } from "react-hook-form";
import {Button,} from './index'
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth";
import { useDispatch } from "react-redux";
import {login as authLogin} from '../store/authSlice'
import Input from "./Inputs";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate()


  // todo: create avatar

  const signup = async(data) => {

    const newData = {
      avatar: data.avatar[0],
      coverImage: data.coverImage[0],
      fullname:data?.fullname,
      userName:data?.userName,
      email: data?.email,
      password: data.password,
    };  
    try {
      const createSession = await authService.createAccount(newData);
      console.log(createSession)
      if(createSession){
        const userData  = await authService.getCurrentUser()
        if(userData)dispatch(authLogin(userData.data))
        navigate('/')
      }

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="auth  mt-24  flex justify-center items-center">
        <div className="card  grid lg:grid-cols-2  p-4">
          <div className="auth-img flex justify-center items-center">
            <img src="/images/signup.svg" alt="signup-image" />
          </div>
          <div className="auth-details flex justify-center flex-col items-center">
            <div className="auth-title">
              <h1 className="mb-4">Welcome</h1>
            </div>
            <form onSubmit={handleSubmit(signup)}>
            <div className="space-y-5">
            <Input
                  lable="avatar"
                  type="file"
                  {...register("avatar", { required: true })}
                />
            
            <Input
                  lable="cover"
                  type="file"
                  {...register("coverImage", { required: true })}
                />
              <Input
                lable="Full Name"
                type="text"
                className="mb-2"
                placeholder="Enter your name"
                {...register("fullname", {
                  required: true,
                })}
              />
              <Input
                lable="Username"
                type="text"
                className="mb-2"
                placeholder="Enter your name"
                {...register("userName", {
                  required: true,
                })}
              />
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


              <Button type="submit" className="w-full">
                create Account
              </Button>
              <div className=" mt-2 flex justify-center items-center gap-2 ">
                <h1>Already have a account</h1>
                <Link to="/login" className="text-red-500">
                  Login
                </Link>
              </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
