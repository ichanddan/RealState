import React from "react";
import { Input } from "@nextui-org/input";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";

export default function SignIn() {
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
              required
              placeholder="Enter Your Password"
            />
          </div>
          <Button type="submit" className="w-full">
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
    </div>
  );
}
