import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Spinner from '../components/Spinner';
import { messagesURL } from '../consts/consts';

const Messages: React.FC = () => {

    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    
    const logoutHandler = () => { 
        localStorage.clear();
        navigate('/login');
    }

    const [messages, setMessages] = useState<[{
        created_at: string;
        type: string;
        message: string;
        is_not_client_message: Boolean;
    }]>();

    useEffect(() => {
        axios.create({                              
            baseURL: messagesURL,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_key')}`
            }
        })
            .get('/')                               
            .then(res => {
                setMessages(res.data.data);         
            })
            .catch((e) => {                         
                navigate('/login');
            })

    }, [navigate])

    if (!messages) {                            
        return <Spinner />
    }

    return (

        <div className='messages'>
            <div className='messages-header'>
                <span className='messages-title'>Messages</span>
                <span className='messages-pfp-username'>
                    <img alt='profile' src='img/profile.png'></img>
                    <span onClick={logoutHandler} className='messages-username'>{`Hi, ${username}`}</span>
                </span>
            </div>

            <div className='messages-table'>
                <div className='table-header'>
                    <span>Date</span>
                    <span>Type</span>
                    <span>Message</span>
                </div>
                <div className='messages-list'>

                    {messages.map((message, index) => (
                        <Message key={index}
                            date={message.created_at}
                            type={message.type}
                            msg={message.message}
                            isNotClientMsg={message.is_not_client_message} />
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Messages;
