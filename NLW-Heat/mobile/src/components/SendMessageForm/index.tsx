import React, { useState } from 'react';
import { Alert, Keyboard, TextInput, View } from 'react-native';
import { api } from '../../services/api';

import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export function SendMessageForm() {
    const [message, setMessage] = useState('');
    const [sendingMessage, setSendingMessage] = useState(false);

    async function handleMessageSubmit(){
        const messageFormatted = message.trim();


        if(messageFormatted. length > 0) {
            setSendingMessage(true);
            await api.post('/messages', {message: messageFormatted});
            setMessage('');
            Keyboard.dismiss();
            setSendingMessage(false);
            Alert.alert('Mensagem enviada com sucesso');
        }
        else{
            Alert.alert('Escreva sua mensagem ')
        }
    }

    return(
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Qual sua expectativa para este evento?"
                placeholderTextColor={COLORS.YELLOW}
                keyboardAppearance="dark"
                multiline
                maxLength={140}
                editable={!sendingMessage}
                onChangeText={setMessage}
                value={message}
            />

            <Button 
                title="Enviar Mensagem"
                backgroundColor={COLORS.PINK}
                color={COLORS.WHITE}
                isLoading={sendingMessage}
                onPress={handleMessageSubmit}
            />
        </View>
    );

}