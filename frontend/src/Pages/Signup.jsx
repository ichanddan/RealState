import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
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
      const res = await fetch("/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success===false){
        toast.error("Signup faild", {
            position: "top-right",
        });
      }else{
        toast.success("Signup successfully", {
            position: "top-right",
        });
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="flex items-center justify-center dark:bg-gray-800 p-6 md:p-10">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
        </div>
        <form className="space-y-4">
          <div>
            <label>Name</label>
            <Input
              onChange={handleChange}
              id="name"
              type="text"
              placeholder="John Doe"
              required
            />
          </div>
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
              placeholder="Enter Your Password"
              required
            />
          </div>
          <Button onClick={Submit} type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <p>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary-500 hover:underline"
            prefetch={false}
          >
            Log in
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
