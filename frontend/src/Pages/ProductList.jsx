import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Button, Textarea } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




export default function ProductList() {
  const Navigate = useNavigate()
  const [listUser, setListUser] = useState([]);
  const {currentUser} = useSelector((state)=>state.user)
  const { id } = useParams();
  const { isOpen: isUpdateModalOpen, onOpen: onOpenUpdateModal, onClose: onCloseUpdateModal } = useDisclosure();
  const [data, setData] = useState(
    {
      name:currentUser?.name,
      email:currentUser?.email,
      price: '',
      sellOrRent: '',
      title: ''
    }
  )

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/v1//productlist/${id}`);
      const data = await res.json();
      if (data.success === true) {
        setListUser(data.data);
        setData((prev)=>({
          ...prev ,price:data.data.regularPrice,
          sellOrRent:data.data.type,
          title:data.data.name
        }))
      }
    };
    getData();
  }, []);
  const handleChange=(e)=>{
    setData({
     ...data,
      [e.target.id]:e.target.value
    })
  }
  const handleSubmit= async ()=>{
    const submitData = await fetch('/api/v1/contect',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    }) 
    if (submitData.status==200) {
      toast.success("Your meassage send seller",{
        position:"top-right"
      })
    }else{
      toast.error("Plase login",{
        position:"top-right"
      })
      setTimeout(()=>{
        Navigate("/login")
      },2000)
    }
  }
  return (
    <div>
      <div>
        <img
          className="w-full h-96 object-cover"
          src={listUser?.imageUrls}
          alt=""
        />
      </div>
      <div className="p-2 md:max-w-3xl mx-auto my-4 dark:prose-invert">
        <div className="space-y-2 not-prose">
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
            {listUser?.name}
          </h1>
        </div>
        <div className="py-2">
          <h3>{listUser?.address}</h3>
        </div>
        <div className="flex items-center mt-2 gap-5">
          <Button className="px-20 py-1.5 rounded bg-red-600 text-white">
            {listUser?.type == "sale" ? "Sale" : "Rent"}
          </Button>
          <Button className="px-20 py-1.5 rounded text-white" color="success">
          ₹ {listUser?.regularPrice}
          </Button>
        </div>
        <p className="mt-4">
          <b>Description:</b> {listUser?.description}
        </p>
        <div className="flex items-center gap-5 mt-2">
          <div>Beds: {listUser?.bedrooms}</div>
          <div>Bathroom: {listUser?.bathrooms}</div>
          <div>
            Parking:{" "}
            {listUser?.parking == true
              ? "Parking is available"
              : "No Parking available"}
          </div>
          <div>
            {listUser?.furnished == true ? "Furnished" : "Not Furnished"}
          </div>
        </div>
        <Button
          onPress={onOpenUpdateModal}
          className="w-full mt-5"
          color="success"
        >
          Enquire Now
        </Button>
      </div>
      <Modal isOpen={isUpdateModalOpen} onOpenChange={onCloseUpdateModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Send meassage</ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  id="phone"
                  label="Number"
                  type="number"
                  labelPlacement="outside"
                  placeholder="Enter your number"
                  className="full"
                  onChange={handleChange}
                />
                <Textarea
                  isRequired
                  id="message"
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Enter your description"
                  className="full"
                  onChange={handleChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={handleSubmit}
                >
                  Send
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

 