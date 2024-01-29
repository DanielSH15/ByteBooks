import * as signalR from '@microsoft/signalr'

const hubConnection = new signalR.HubConnectionBuilder()
.withUrl(import.meta.env.VITE_BACKEND_URI + '/chatHub', { withCredentials: true })
.build();

export const startConnection = () => {
    hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch((err) => console.log('Error starting connection: ', err))
    hubConnection
        .onclose((error) => console.log(`${error}`))
}

export const addNotificationListener = (callback) => {
    if (hubConnection) {
      hubConnection.on('ReceiveNotification', (notification) => {
        callback(notification);
      });
    }
};

export { hubConnection };