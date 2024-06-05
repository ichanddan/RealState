import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="flex items-center justify-center dark:bg-gray-800 p-6 md:p-10">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
        </div>
        <form className="space-y-4">
          <div>
            <label>Name</label>
            <Input id="name" type="text" placeholder="John Doe" required />
          </div>
          <div>
            <label>Email</label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              required
            />
          </div>
          <div>
            <label>Password</label>
            <Input
              id="password"
              type="password"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <Button type="submit" className="w-full">
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
    </div>
  );
}
