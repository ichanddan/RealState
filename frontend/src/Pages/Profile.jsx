import { Avatar, Button, Card, CardHeader, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { profileUpdateFailure, profileUpdateStart, profileUpdateSuccess, userDeleteFailure, userDeleteStart, userDeleteSuccess, userLogOutFailure, userLogOutStart, userLogOutSuccess } from "../Redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const { isOpen: isUpdateModalOpen, onOpen: onOpenUpdateModal, onOpenChange: onOpenChangeUpdateModal } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onOpenDeleteModal, onOpenChange: onOpenChangeDeleteModal } = useDisclosure();
  const { isOpen: isLogOutModalOpen, onOpen: onOpenLogOutModal, onOpenChange: onOpenChangeLogOutModal } = useDisclosure();
  const [formData, setFromData] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const Navigate = useNavigate()

  const handleChange = (e) => {
    setFromData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(profileUpdateStart());
      const res = await fetch(`/api/v1/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === true) {
        dispatch(profileUpdateSuccess(data.user));
        toast.success("User updated successfully", {
          position: "top-right",
        });
      }
    } catch (error) {
      dispatch(profileUpdateFailure(error.message));
      toast.error("User update failed", {
        position: "top-right",
      });
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(userDeleteStart());
      const res = await fetch(`/api/v1/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success === true) {
        toast.success("User deleted successfully", {
          position: "top-right",
        });
        setTimeout(()=>{
          dispatch(userDeleteSuccess(data));
        },2000)
      }
    } catch (error) {
      dispatch(userDeleteFailure(error.message));
      toast.error("User delete failed", {
        position: "top-right",
      });
    }
  };
  const handleLogOut = async () => {
    try {
      dispatch(userLogOutStart());
      const cook = await fetch("/api/v1/logout");
      const res = await cook.json()
      if (res.success === true) {
        toast.success("Logout successfully", {
          position: "top-right",
        });
        setTimeout(() => {
          dispatch(userLogOutSuccess(res));
        }, 2000);
      }
    } catch (error) {
      toast.error("Logout faild", {
        position: "top-right",
      });
      setTimeout(() => {
        dispatch(userLogOutFailure(error.message));
      }, 2000);
    }
  };
  useEffect(()=>{
    const getData = async ()=>{
      const res = await fetch(`/api/v1/listproduct/${currentUser._id}`)
      const data = await res.json()
      if(data.success===true){
        setListUser(data.data)
      }
    }
    getData()
  },[listUser])
const handleDeleteProduct = async () => {
  try {
      const res = await fetch(`/api/v1/listproduct/delete/${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        }
      });
      const data = await res.json();
      if(data.success===true){
        toast.success("Product deleted successfully", {
          position: "top-right",
        });
      }
      else{
        toast.error("Product not delete", {
          position: "top-right",
        })
      }
  } catch (error) {
    toast.error("Product not delete", {
      position: "top-right",
    })
  }

};

console.log(id)
  return (
    <div className="flex flex-col items-center justify-center my-10">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center gap-4 p-6">
          <Avatar
            className="h-24 w-24"
            isBordered
            src={currentUser.avatar || "/placeholder.svg"}
            alt="@shadcn"
          />
          <div className="text-center">
            <h2 className="text-2xl font-bold">{currentUser.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">{currentUser.email}</p>
          </div>
        </CardHeader>
        <div className="grid gap-4 p-6">
          <Button variant="outline" className="border-[1px]" onPress={onOpenUpdateModal}>Update Profile</Button>
          <Button variant="outline" className="border-[1px] bg-green-600 text-white" onClick={()=>{Navigate("/list-product")}} >Create Listing</Button>
          <div className="flex items-center justify-between">
            <Button variant="destructive" className="text-red-500" onPress={onOpenDeleteModal}>Delete Account</Button>
            <Button variant="outline" onClick={onOpenLogOutModal} >Log Out</Button>
          </div>
          
            {
              listUser.map((e, i) => {
                return (
                  <div key={i} className="flex items-center text-left justify-between w-[94%]">
                    <Avatar
                      className="h-12 w-12"
                      isBordered
                      src={e?.imageUrls}
                      alt="@shadcn"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-gray-500 dark:text-gray-400">{e.name.substring(0,20)}</p>
                    </div>
                    <div>
                      <button onClick={ ()=>{setId(e?._id); handleDeleteProduct()} } className="text-red-500">Delete</button>
                    </div>
                  </div>
                )
              })
            }
        </div>
      </Card>

      <Modal isOpen={isUpdateModalOpen} onOpenChange={onOpenChangeUpdateModal}>
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
                <Button color="primary" onPress={onClose} onClick={handleSubmit}>
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onOpenChange={onOpenChangeDeleteModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Confirm Deletion</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete your account?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={() => { onClose(); handleDeleteUser(); }}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isLogOutModalOpen} onOpenChange={onOpenChangeLogOutModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Confirm Logout</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to logout your account?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={() => { onClose(); handleLogOut(); }}>
                  Confirm
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
