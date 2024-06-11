import { Avatar, Button, Card, CardHeader, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { profileUpdateFailure, profileUpdateStart, profileUpdateSuccess } from "../Redux/user/userSlice";


export default function Profile() {
  const { currentUser, error } = useSelector((state) => state.user);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFromData] = useState([]);
  const Dispatch = useDispatch();
  const handleChange = (e) => {
    setFromData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      Dispatch(profileUpdateStart());
      const res = await fetch(`/api/v1/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === true) {
        Dispatch(profileUpdateSuccess(data.user));
        toast.success("User update successfully", {
          position: "top-right",
        });
      }
    } catch (error) {
      Dispatch(profileUpdateFailure(error.message));
      toast.error("User update faild", {
        position: "top-right",
      });
    }
  };
  return (
      <div className="flex flex-col items-center justify-center my-10">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col items-center gap-4 p-6">
            <Avatar className="h-24 w-24"
              isBordered
              src={currentUser.avatar || "/placeholder.svg"} 
              alt="@shadcn" />
            <div className="text-center">
              <h2 className="text-2xl font-bold">{currentUser.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">{currentUser.email}</p>
            </div>
          </CardHeader>
          <div className="grid gap-4 p-6">
            <Button variant="outline" className="border-[1px]" onPress={onOpen}>Update Profile</Button>
            <div className="flex items-center justify-between">
            <Button variant="destructive" className="text-red-500" >Delete Account</Button>
            <Button variant="outline">Log Out</Button>
            </div>
            <div className="flex items-center justify-center">
            <p>{error ? error :''}</p>

            </div>
          </div>
        </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Update</ModalHeader>
              <ModalBody>
              <Input
                isRequired
                type="text"
                label="Name"
                defaultValue={currentUser.name}
                className="w-full"
                onChange={handleChange}
                id="name"
              />
              <Input
                isRequired
                type="email"
                label="Email"
                defaultValue={currentUser.email}
                className="w-full"
                onChange={handleChange}
                id="email"
              />
              <Input
                isRequired
                type="password"
                label="Password"
                defaultValue={currentUser.password}
                className="w-full"
                onChange={handleChange}
                id="password"
              />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose} onClick={handleSubmit} >
                  update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <ToastContainer />
      </div>
  );
}
