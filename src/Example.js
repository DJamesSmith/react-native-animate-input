import React, { useState } from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import TextInputAnim from './main';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: 'center',
                marginTop: 60
            }}>

            <TextInputAnim
                marginVertical={10}
                placeholder={'Normal'}
                activeColor={'green'}
                fontSize={15}
                height={48}
                width={'90%'}
                color={'black'}
                borderColor={'green'}
                borderWidth={1}
            />

            <TextInputAnim
                marginVertical={10}
                placeholder={'For PetCare'}
                activeColor={'blue'}
                fontSize={15}
                height={48}
                width={'90%'}
                color={'black'}
                borderBottomColor={'blue'}
                borderBottomWidth={4}
            />

            <TextInputAnim
                backgroundColor={'transparent'}
                marginVertical={10}
                placeholder={'For PetCare'}
                activeColor={'blue'}
                fontSize={15}
                height={48}
                width={'90%'}
                color={'black'}
                placeholderTextColor={'white'}
                borderBottomColor={'blue'}
                borderBottomWidth={1.5}
                placeholderBackgroundColor={'red'}
            />

            <View style={{
                backgroundColor: 'lightgrey',
                width: '90%',
                height: 80,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
            }}>
                <TextInputAnim
                    backgroundColor={'transparent'}
                    marginVertical={10}
                    placeholder={'Email'}
                    activeColor={'blue'}
                    fontSize={15}
                    height={48}
                    width={'90%'}
                    color={'black'}
                    placeholderTextColor={'grey'}
                    borderBottomColor={'blue'}
                    borderBottomWidth={1.5}
                />
            </View>


        </SafeAreaView>
    );
};

export default Login