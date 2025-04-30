import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const MyAppointments = () => {
  const { userData,backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState({}); // Track payment status for each appointment

  // const API_URL = 'http://localhost:4000/api/worker';

  const API_URL = `https://voguedeploy.vercel.app/api/worker`
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Function to format the date
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + ' ' + months[Number(dateArray[1]) - 1] + ' ' + dateArray[2];
  };

  // Fetch user appointments
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } });
      setAppointments(data.appointments.reverse());
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error(error.message);
    }
  };

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast.error(error.message);
    }
  };

  // Razorpay payment initialization
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(`${backendUrl}/api/user/verifyRazorpay`, response, { headers: { token } });
          if (data.success) {
            navigate('/my-appointments');
            getUserAppointments();
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Razorpay payment
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error(error.message);
    }
  };

  // Stripe payment
  const appointmentStripe = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-stripe`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        window.location.replace(data.session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error(error.message);
    }
  };

  // Fetch workers
  const fetchWorkers = async () => {
    try {
      const { data } = await axios.get(API_URL);
      return data;
    } catch (error) {
      console.error('Error fetching workers:', error);
      return [];
    }
  };

  // Delete worker
  const deleteWorker = async (workerId) => {
    try {
      await axios.delete(`${API_URL}/${workerId}`);
    //   toast.success('Worker deleted successfully!');
      const updatedWorkers = await fetchWorkers();
      setWorkers(updatedWorkers);
    } catch (error) {
      console.error('Error deleting worker:', error);
      toast.error('Failed to delete worker.');
    }
  };

  const handleDeleteWorker = async (docId, slotDate, slotTime, selectedWorker, delid) => {

    console.log(docId)
    console.log(slotDate)
    console.log(slotTime)
    
    try {


        
      const workerToDelete = workers.find(
        (worker) =>
          worker.shopname === docId &&
        //   worker.name === selectedWorker &&
          worker.date === slotDate && 
          worker.slot === slotTime
      );

      // console.log(workerToDelete)
  
      if (!workerToDelete) {
        // toast.error("Worker not found!");
        return;
      }
  

      // Delete worker
      await deleteWorker(workerToDelete._id);
  
      // Cancel the appointment
      await cancelAppointment(delid);
    } catch (error) {
      console.error('Error in worker deletion and appointment cancellation:', error);
      // toast.error("Failed to delete worker or cancel appointment.");
    }
  };

  // Combined effects
  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
    const getWorkersData = async () => {
      const workersData = await fetchWorkers();
      setWorkers(workersData);
    };
    getWorkersData();
  }, [token]);

  return (
    <div>
      <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>My appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b'>
            <div>
              <img className='w-36 bg-[#EAEFFF]' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-[#5E5E5E]'>
              <p className='text-[#262626] text-base font-semibold'>{item.docData.name}</p>

              <p className='text-[#464646] font-medium mt-1'>Address:</p>
              <p>{item.docData.address.line1}</p>
              <p className='mt-1'>
                <span className='text-sm text-[#3C3C3C] font-medium'>Date & Time & Worker:</span> {slotDateFormat(item.slotDate)}
              </p>
            </div>
            <div className='flex flex-col gap-2 justify-end text-sm text-center'>
              {!item.cancelled && !item.payment && !item.isCompleted && !paymentStatus[item._id] && (
                <button onClick={() => setPaymentStatus((prev) => ({ ...prev, [item._id]: true }))} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>
                  Pay Online
                </button>
              )}
              {!item.cancelled && !item.payment && !item.isCompleted && paymentStatus[item._id] && (
                <button onClick={() => appointmentStripe(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'>
                  <img className='max-w-20 max-h-5' src={assets.stripe_logo} alt="" />
                </button>
              )}
              {!item.cancelled && item.payment && !item.isCompleted && (
                <button className='sm:min-w-48 py-2 border rounded text-[#696969]  bg-[#EAEFFF]'>Paid</button>
              )}
              {item.isCompleted && (
                <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>
              )}
              {!item.cancelled && !item.isCompleted && (
                <button onClick={() => handleDeleteWorker(item.docId, item.slotDate, item.slotTime, item.u, item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>
                  Cancel appointment
                </button>
              )}
              {item.cancelled && !item.isCompleted && (
                <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
{/*         <ul>
          {workers.map((worker) => (
            <li key={worker._id}>
              {worker.shopname}-{worker.name} - {worker.slot} - {worker.date}
              <button onClick={() => deleteWorker(worker._id)}>Delete</button>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default MyAppointments;
