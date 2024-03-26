import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { io } from "socket.io-client";
import { useEffect, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';



export default function Sidebar() {
    const socket = useMemo(() => io("http://localhost:3000"), []);
    const [message, setMessage] = useState("");
    const [text, setText] = useState([]);
    console.log(text);

    useEffect(() => {
        socket.on("connect", () => {
            console.log(socket.id);
            console.log("connetcted");
        });
        socket.on("recive-message", (data) => {
            console.log(data);
            setText((text) => [...text, data])
        })


    }, []);

    function handleChange(event) {
        setMessage(event.target.value);
    }
    function handleSubmit(event) {
        event.preventDefault();
        socket.emit("message", message);
        setMessage("");
    }



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
                <div className='flex flex-col h-screen max-w-full'>
                    <div className="overflow-scroll h-[100%] max-w-full">
                        <ul className='p-7 flex flex-col flex-wrap'>
                            {text.map((d, i) => (
                                <li key={i} className='bg-slate-500 p-4 rounded-md max-w-fit my-4'>
                                    {d}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    name="message"
                                    onChange={handleChange}
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    endAdornment={<InputAdornment position="end">
                                        <Button onClick={handleSubmit} variant="contained" endIcon={<SendIcon />}>
                                            Send
                                        </Button>
                                    </InputAdornment>}
                                />

                            </FormControl>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
}