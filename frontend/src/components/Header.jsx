import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Input,
  Avatar,
} from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";

export default function Header() {
  const{userLogin} =useSelector((state)=>state.user)
  return (
    <Navbar>
      <NavbarBrand>
        <Link to="/">
          <p className="font-bold  text-inherit">RealState</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Input
          placeholder="Serach here..."
          endContent={
            <FaSearch className="text-xl text-default-400 pointer-events-none" />
          }
          className="max-w-xs"
        />
      </NavbarContent>
      {userLogin === true ? (
        <NavbarContent justify="end">
          {" "}
          <Link to="/profile">
            <Avatar
              isBordered
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </Link>{" "}
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link to="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" to="/signup" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  );
}
