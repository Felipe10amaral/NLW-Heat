import React, { useState, useEffect } from 'react';
import {ScrollView, Text} from 'react-native';
import { api } from '../../services/api';
import { Message, MessageProps } from '../Message';
import {io} from 'socket.io-client';

import {styles} from './styles';

let messagesQueue: MessageProps[] = [];

const socket = io(String(api.defaults.baseURL));
socket.on('new_message', (newMessage) => {
    messagesQueue.push(newMessage);
})

export function MessageList() {

    const [currentMessage, setCurrentMessage] = useState<MessageProps[]>([]);

    useEffect(() => {
        async function fecthMessage() {
            const messageResponse = await api.get<MessageProps[]>('/messages/last3');
            setCurrentMessage(messageResponse.data);
        }
        
        fecthMessage();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            if(messagesQueue.length > 0){
                setCurrentMessage(prevState => [messagesQueue[0], prevState[0], prevState[1]]);
                messagesQueue.shift();

            }
        }, 3000);
        
        
        return () => clearInterval(timer);

    }, [])

    return(
        <ScrollView 
            style={styles.container} 
            contentContainerStyle={styles.content} 
            keyboardShouldPersistTaps="never"
        >
          {currentMessage.map((message) => <Message key={message.id} data={message} /> )}
          
        </ScrollView>
    );
}