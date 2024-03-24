import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { io } from "socket.io-client";
import { useEffect } from 'react';

export default function Sidebar() {

    const socket = io("http://localhost:3000");

    useEffect(() => {
        socket.on("connect", () => {
            console.log(socket.id);
            console.log("connetcted");
        });
    }, []);



    return (
        <div className="flex h-screen">
            <div className="w-1/4 bg-gray-200">
                <div>
                    <h2 className="p-4">Contacts</h2>
                    <Divider />
                    <ul>
                        <li className="cursor-pointer p-4 hover:bg-gray-300">
                            <div className='flex flex-row justify-start items-center'>
                                <div>
                                    <Avatar alt="Tejasvi Bihari" src="/static/images/avatar/1.jpg" />
                                </div>
                                <div className='ml-6 hidden md:flex'>
                                    Tejasvi Bihari
                                </div>
                            </div>
                            <div className='mt-3'>
                                <Divider />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-3/4 bg-gray-100">
                <div>
                    <h2 className="p-4">Chat with</h2>
                    {/* Chat messages go here */}
                </div>
            </div>
        </div >
    );
}