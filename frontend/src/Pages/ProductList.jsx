import { Button } from '@nextui-org/react';
import React from 'react'

export default function ProductList() {
  return (
    <div>
        <div>
            <img className='w-full h-96 object-cover' src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        </div>
      <div className="p-2 md:max-w-3xl mx-auto my-4 dark:prose-invert">
        <div className="space-y-2 not-prose">
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
            The Joke Tax Chronicles
          </h1>
        </div>
        <div className='py-2'>
            <h3>address</h3>
        </div>
        <div className='flex items-center gap-5'>
            <Button className='px-20 py-1.5 rounded bg-red-600 text-white'>for Sell</Button>
            <Button className='px-20 py-1.5 rounded' color="success">for Rent</Button>
        </div>
        <p><b>Description:</b> data </p>
        <div className='flex items-center gap-5 mt-2'>
            <div>
                bead
            </div>
            <div>
                bead
            </div>
            <div>
                bead
            </div>
            <div>
                bead
            </div>
        </div>
        <Button className='w-full mt-5' color="success">Contect Deller</Button>
      </div>
    </div>
  );
}
