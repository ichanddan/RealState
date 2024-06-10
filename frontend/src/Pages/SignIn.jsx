import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../Redux/user/userSlice";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState([]);
  const { loading, error } = useSelector((state) => state.user)
   const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const Submit = async (e) => {
    e.preventDefault();
      try {
        dispatch(signInStart())
        const res = await fetch("/api/v1/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if(data.success===false){
          dispatch(signInFailure(data.message));
          toast.error("Login faild invalid user or password", {
            position: "top-right",
        });
      }else{
        dispatch(signInSuccess(data));
        toast.success("Login successfully", {
          position: "top-right",
        });
        setTimeout(()=>{
          navigate("/")
        },2000)
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  console.log(formData)
  return (
    <div className="flex items-center justify-center p-6 md:p-10">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Log In</h1>
        </div>
        <form className="space-y-4">
          <div>
            <label>Email</label>
            <Input
            onChange={handleChange}
            id="email"
            type="email"
            placeholder="example@email.com"
            required
            />
          </div>
          <div>
            <label>Password</label>
            <Input
            onChange={handleChange}
              id="password"
              type="password"
              required
              placeholder="Enter Your Password"
            />
          </div>
          <Button disabled={loading} onClick={Submit} className="w-full">
            
            {loading ? 'Loading...' : 'Log In'}
          </Button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium hover:underline"
            prefetch={false}
          >
            Sign up
          </Link>
        </p>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
      <ToastContainer />
    </div>
  );
}
