import { Avatar, Button, Card, CardHeader } from "@nextui-org/react";
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { useSelector } from "react-redux";


export default function Profile() {
  const {currentUser} = useSelector((state)=>state.user)
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
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
          </div>
        </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Update</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </div>
  );
}
