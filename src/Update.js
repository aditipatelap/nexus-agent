import React, { useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DataContext from './context/DataContext';
import Header from './Header';

const Update = () => {
  const URL = process.env.REACT_APP_BACKEND_URL;
  const { orderDetails, setOrderDetails } = useContext(DataContext);
  const headerLine = "🛵 COMPLETE YOUR DELIVERY 📦";
  
  const formatIndianNumber = (num) => {
    // Convert the string to a number
    const number = parseFloat(num);
    // Check if the conversion was successful
    if (!isNaN(number)) {
      // Format the number to Indian currency style
      return number.toLocaleString('en-IN');
    } else {
      // Return the original input if it's not a valid number
      return num;
    }
  };

  const handleProductAction = async (orderId, productId, action) => {
    try {
      const response = await axios.put(`${URL}/order/update`, { orderId, productId, action });
      if(response.data.status === "updated"){
        const updatedOrderDetails = { ...orderDetails }; // Create a copy of orderDetails
        const productIndex = updatedOrderDetails.productIdList.indexOf(productId);
        if (productIndex !== -1) {
          updatedOrderDetails.stageList[productIndex] = action;
          setOrderDetails(updatedOrderDetails); // Update the state with the updatedOrderDetails
        }
      }
      else{
        alert("something went wrong");
      }
    }
    catch (error) {
       console.error(error);    
    }
  }

  return (
    <div className="font-poppins">
      <Header headerLine={headerLine}/>
      <div className="flex flex-col m-6">
        <Link to="/">
          <div className="flex">
            <p className="text-lg">&larr; &nbsp;</p>
            <p className="underline">Back</p>
          </div>
        </Link>

        <div className="flex flex-col space-y-2 border-b border-dashed border-gray-500 pb-3 my-5">
          <h1 className="font-semibold text-2xl">Order ID: {orderDetails.id}</h1>
          <p> 
            <span className='font-medium'>Customer Name: </span>
            {orderDetails.billName}
          </p>
          <p>
            <span className='font-medium'> Contact No.: </span>
            {orderDetails.billPhone}
          </p>
          <p> 
            <span className='font-medium'>Address: </span>
            {orderDetails.shipAddress}
          </p>
        </div>

        <ol className="flex flex-col">
          {orderDetails.productNameList.map((product, index) => (
            <div key={index} className="border-2 border-gray-600 rounded-md p-3 mb-5">
              <li className="grid grid-cols-4 mb-3">
                  <div className="col-span-3 list-decimal content-center">
                    <p>{product}</p>
                  </div>
                  <div className="col-span-1 text-end p-2 font-semibold content-center">
                    <p>₹ {formatIndianNumber(orderDetails.amountList[index])}</p>
                  </div>
              </li> 
              {/* buttons */}
              {orderDetails.stageList[index] === "approved" &&
                <div className="text-lg">
                  <button onClick={() => handleProductAction(orderDetails.id, orderDetails.productIdList[index], 'delivered')} className="bg-green-500 drop-shadow hover:bg-green-600 text-white font-semibold py-1 px-4 rounded mr-2">
                    DELIVERED
                  </button>
                </div>
              }
              {orderDetails.stageList[index] === "delivered" &&
                <div className="my-4 flex">
                  <button className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-semibold text-white py-1 px-4 rounded mr-2 cursor-default">
                    ALREADY DELIVERED
                  </button>
                  <p className="text-3xl">🎉</p>
                </div>
              }
            </div>
          ))}

        </ol>

      </div>
    </div>
  )
}

export default Update
