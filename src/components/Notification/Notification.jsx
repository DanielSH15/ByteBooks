import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = ({message}) => {
    const notify = () => toast.info(message);

    return (
      <div>
        <ToastContainer />
        {notify()}
      </div>
    );
}

export default Notification