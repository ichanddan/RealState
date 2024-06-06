import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [errors, setErrors] = useState([]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const Submit = async (e) => {
    e.preventDefault();
      try {
        const res = await fetch("/api/v1/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if(data.success===false){
          toast.error("Login faild invalid user or password", {
            position: "top-right",
        });
      }else{
        toast.success("Login successfully", {
          position: "top-right",
        });
        setTimeout(()=>{
          navigate("/")
        },2000)
      }
    } catch (error) {
      console.log(error)
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
          <Button onClick={Submit} className="w-full">
            Log In
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
      </div>
      <ToastContainer />
    </div>
  );
}
