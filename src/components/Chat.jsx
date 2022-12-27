import "./Chat.css"
import { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import Messages from "./Messages";
import Input from "./Input";
import TextContainer from "./TextContainer";
import InfoBar from "./InfoBar";




const Chat = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState('');
    // const { search } = useLocation();
    // let [n, r] = search.split("&")
    // let na = n.split("=")[1]
    // let ro = r.split("=")[1]

    //const ENDPOINT = 'http://localhost:2345';
    var socket;


    useEffect(() => {
        const { name, room } = queryString.parse(window.location.search);
        socket = io("https://chatapp-l4gk.onrender.com/");
        //console.log(name,room)
        setName(name);
        setRoom(room)
        
        socket.emit('join', { name, room }, (error) => {
            if(error) {
              alert("Welcome to the chat room");
            }
          });

    }, [])

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            const { name } = queryString.parse(window.location.search);
            socket = io("https://chatapp-l4gk.onrender.com/");
            console.log(socket)
            socket.emit('sendMessage', {message, name}, () => setMessage(''));
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    )
}

export { Chat }