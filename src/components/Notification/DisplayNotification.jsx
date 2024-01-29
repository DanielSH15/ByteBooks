import React, { useEffect, useState } from 'react';
import { startConnection, addNotificationListener, hubConnection } from '../../SignalR/signalRService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DisplayNotification = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState({ user: '', message: '' });

    useEffect(() => {
        startConnection();
        const userId = localStorage.getItem("userId");
        hubConnection.invoke('NotifyUser', userId);
      }, []);

      useEffect(() => {
        addNotificationListener((notification) => {
          toast.info(notification);
          console.log(notification)
        });
      }, []);

    return (
        <div>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>
                        <strong>{msg.user}</strong>: {msg.message}
                    </li>
                ))}
            </ul>
            <ToastContainer />
        </div>
    );
};

export default DisplayNotification;