import React, { useContext } from 'react';
import axios from 'axios';
import DataContext from './context/DataContext';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const { orderId, setOrderId, setOrderDetails } = useContext(DataContext);
    const URL = process.env.REACT_APP_BACKEND_URL;
    const navigate = useNavigate();
    const logoPath = process.env.PUBLIC_URL + "/images/logo/logo_3x.png";

    const handleOrderID = async () => {
        try {
            const response = await axios.post(`${URL}/order/get/agent`, { orderId } );
            if(response.data.status === "success"){
                setOrderDetails(response.data.orderDetails);
                setOrderId('');
                navigate("/update");
            }
            else{
                alert("This order not found. Please Check ORDER ID and try again.");
                setOrderId('');
            }
        } 
        catch (error) {
            console.log(error);    
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h--screen">
            <div className="border-2 border-black rounded-lg pt-5 pb-14 px-10 sm:px-7 xs:px-5 mx-5 bg-[#98CDEA]">
                {/* logo */}
                <div className="w-full flex justify-center">
                    <div className="h-28 w-28 md:h-24 md:w-24 sm:h-24 sm:w-24 xs:h-20 xs:w-20">
                        <img src={logoPath} alt="Nexus" className="h-full w-full object-contain" />
                    </div>
                </div>
                {/* pickup line */}
                <p className="font-balsamiq-sans font-semibold text-2xl md:text-xl sm:text-xl xs:text-lg mt-5 mb-10 text-center">Update the order when delivery completed...</p>
                {/* form  */}
                <form id="loginPage" action="POST" onSubmit={(e) => e.preventDefault()}>
                    <div className='w-full border-black shadow-md mb-8'>
                        <label className="text-nowrap mr-5 hidden">Order Id:</label>
                        <input
                            id="orderId"
                            required
                            autoFocus
                            type="id"
                            className='w-full rounded-md font-poly placeholder-slate-300 text-white p-3 text-lg bg-[#285F88]'
                            placeholder="Order ID"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                        />
                    </div>
                    <div className='flex w-full justify-center'>
                        <button
                            type="submit"
                            className="font-podkova bg-[#285F88] rounded-md p-4 px-10 sm:px-6 xs:px-6 hover:shadow-lg hover:shadow-slate-400 text-center text-white text-2xl sm:text-xl xs:text-xl font-semibold"
                            onClick={() => handleOrderID()}
                        >
                            SEARCH
                        </button>
                    </div>
                </form>
               
            </div>
        </div>
    )
}

export default Main
