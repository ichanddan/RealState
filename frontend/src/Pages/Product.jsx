import React, { useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/checkbox";

export default function Product() {
  const [isOfferChecked, setIsOfferChecked] = useState(false);

  const handleOfferChange = (e) => {
    setIsOfferChecked(e.target.checked);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-10 text-center">Create a Listing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <Input type="text" label="Name" labelPlacement={"outside"} />
          <Textarea
            label="Description"
            placeholder="Enter your description"
            className="py-3"
          />{" "}
          <Input type="text" label="Address" labelPlacement={"outside"} />
          <div className="flex items-center gap-1 space-x-4">
            <Checkbox>Sell</Checkbox>
            <Checkbox defaultSelected>Rent</Checkbox>
            <Checkbox>Parking spot</Checkbox>
            <Checkbox>Furnished</Checkbox>
          </div>
          <Checkbox checked={isOfferChecked} onChange={handleOfferChange}>
            Offer
          </Checkbox>
          <div className="flex items-center space-x-4">
            <Input type="number" label="Beds" labelPlacement={"outside"} />
            <Input type="number" label="baths" labelPlacement={"outside"} />
          </div>
          <div className="flex items-center space-x-4">
            <Input
              type="number"
              label="Regular price ($ / Month)"
              labelPlacement={"outside"}
              className="w-1/2"
            />
            {isOfferChecked && (
              <Input
                type="number"
                label="Offer price ($ / Month)"
                labelPlacement={"outside"}
                className="w-1/2"
              />
            )}
          </div>
        </div>
        <div>
          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                label="Enter Image Url"
                labelPlacement={"outside"}
              />
            </div>
          </div>
        </div>
      </div>
      <Button className="w-full justify-center bg-green-600 text-white">
        CREATE LISTING
      </Button>
    </div>
  );
}
