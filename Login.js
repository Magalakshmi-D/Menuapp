import React, { useState, useEffect, useRef } from "react";
import { View, Text, SafeAreaView, Keyboard, Alert, StyleSheet, ScrollView, ImageBackground, StatusBar } from 'react-native';
import { useLogin } from '../../Main/LoginProvider';
import { Input, Loader, CustomButton } from "../../components";
import { COLORS } from '../../constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import axios from 'axios';

export function Login({ navigation }) {
    const emailInput = useRef(null);
    const { isLoggedIn, setIsLoggedIn, SubMenu, setSubMenu } = useLogin();
    const [inputs, setInputs] = React.useState({ email: '', password: '', datas: '', noUser: '' });
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState();

    const useFetch = () => {
        const BASE_URL = 'http://192.168.1.220:5000/api'
        const head = {
            headers: { 'Content-Type': 'application/json' }
        };
        axios.get(`${BASE_URL}/get`, head)
            .then((response) => {
                // console.log("Datas Showing in Login Page", response.data)
                setData(response.data)
                handleOnchange(response.data, 'datas')
                // setTasks(response.data)
            })
    }
    useEffect(() => {
        useFetch()
    }, [isLoggedIn])
    const validate = async () => {
        Keyboard.dismiss();
        let isValid = true;
        if (!inputs.email) {
            handleError('Please input email', 'email');
            isValid = false;
        }
        if (!inputs.password) {
            handleError('Please input password', 'password');
            isValid = false;
        }
        if (isValid) {
            // login();
            setIsLoggedIn(true)
        }
    };

    const login = () => {
        useFetch()
        // console.log(username, password)
        inputs.datas.map((item) => {
            console.log(item.userName, item.password)
            if (item.userName == inputs.email && item.password == inputs.password) {
                console.log("user Entered the App...")
                // setNoUser(false)
                setIsLoggedIn(true)
            }
            else {
                // Alert.alert("No User", "There is  no user")
                // noUser(true)
                handleOnchange(true, 'noUser')
                handleError('User Not Valid', 'email');
            }
        })
    }
    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };
    const check = () => {
        if ("Kamal" == username && "123456" == password) {
            console.log("user Entered the App...")
            setIsLoggedIn(true)
        }
        // setIsLoggedIn(true)
    }
    const image = { uri: 'https://www.planstudyabroad.uniagents.com/images/login.png' };
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>

            {/* <ImageBackground source={image} resizeMode="cover" style={styles.image}> */}
            <Loader visible={loading} />
            <View style={{ height: '40%', width: '100%', }} >
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                </ImageBackground>
            </View>
            <View style={styles.outsideContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ marginVertical: 20, width: '100%', paddingHorizontal: 20, }}>
                        <Text style={{
                            color: COLORS.black,
                            fontSize: 30,
                            fontWeight: '600',
                            textAlign: 'center',
                            textShadowColor: 'rgba(0, 0, 0, 0.55)',
                            textShadowOffset: { width: 5, height: 5 },
                            textShadowRadius: 40,
                        }} >
                            Login
                        </Text>
                        <Input
                            onChangeText={text => handleOnchange(text, 'email')}
                            onFocus={() => handleError(null, 'email')}
                            iconName="email-outline"
                            label="Email"
                            placeHolder="Enter your email address"
                            error={errors.email}
                        />
                        <Input
                            onChangeText={text => handleOnchange(text, 'password')}
                            onFocus={() => handleError(null, 'password')}
                            iconName="lock-outline"
                            label="Password"
                            placeHolder="Enter your password"
                            error={errors.password}
                            password
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }} >
                            <CustomButton title="Log In" onPress={validate} Styles={{ backgroundColor: '#2986CC' }} />
                            {/* <CustomButton title="Log In" onPress={() => setIsLoggedIn(true)} Styles={{ backgroundColor: '#2986CC' }} /> */}
                            <CustomButton title="SignUp" onPress={onPress = () => navigation.navigate("SignUp")} Styles={{ backgroundColor: '#FF5A5F' }} />
                        </View>
                        {/* <Text style={{ color: 'red', fontSize: 14, textAlign: 'center', marginTop: 10 }} >{inputs.noUser ? 'User Not Valid' : ''}</Text> */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '8%', }} >
                            <Text
                                onPress={() => { navigation.navigate("Forgot"); }}
                                style={styles.text}>
                                Forgot Passsword
                            </Text>
                            <Text
                                onPress={() => { navigation.navigate("Forgot"); }}
                                style={[styles.text, { color: COLORS.blue, marginLeft: 5 }]}>Click
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            {/* </ImageBackground> */}

        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    text: {
        color: COLORS.black,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
        paddingTop: 10,
        borderBottomWidth: 1, borderColor: 'black',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    outsideContainer: {
        height: '65%',
        width: '100%',
        paddingHorizontal: 10,
        // borderWidth: 1,
        // borderColor: 'blue',
        // borderRadius: 25,
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        // backgroundColor: 'red'
    }

});

// import React, { useState } from 'react';
// import { View, TextInput, Animated, StyleSheet } from 'react-native';

// export const SignIn = () => {
//     const [isFocused, setIsFocused] = useState(false);
//     const animatedIsFocused = React.useRef(new Animated.Value(0)).current;

//     const handleFocus = () => setIsFocused(true);
//     const handleBlur = () => setIsFocused(false);
// let value=''
//     React.useEffect(() => {
//         Animated.timing(animatedIsFocused, {
//             toValue: isFocused || value !== '' ? 1 : 0,
//             duration: 200,
//             useNativeDriver: false,
//         }).start();
//     }, [animatedIsFocused, isFocused, value]);

//     const labelStyle = {
//         position: 'absolute',
//         left: 0,
//         top: animatedIsFocused.interpolate({
//             inputRange: [0, 1],
//             outputRange: [18, 0],
//         }),
//         fontSize: animatedIsFocused.interpolate({
//             inputRange: [0, 1],
//             outputRange: [20, 14],
//         }),
//         color: animatedIsFocused.interpolate({
//             inputRange: [0, 1],
//             outputRange: ['#aaa', '#000'],
//         }),
//     };

//     return (
//         <View style={styles.container}>
//             <Animated.Text style={labelStyle}>Username</Animated.Text>
//             <TextInput
//                 style={styles.input}
//                 onFocus={handleFocus}
//                 onBlur={handleBlur}
//                 underlineColorAndroid="transparent"
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         marginTop: 20,
//         width: '100%',
//         height: 60,
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
//     input: {
//         fontSize: 18,
//         marginTop: 10,
//         paddingLeft: 6,
//         paddingBottom: 10,
//     },
// });

// // export default StylishTextInput;

// import { View, Text } from 'react-native'
// import React, { useState } from 'react'
// import { CustomInput } from '../components/CustomInput';
// export const Login = () => {
//     const [borderName, SetBorderName] = useState(false)
//     const [SecondBorderName, setSecondBorderName] = useState(false)
//     return (
//         <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//             <Text>Login</Text>
//             <CustomInput placeHolder={'User'}
//                 setState1={SetBorderName}
//                 setState2={setSecondBorderName}
//                 placeName={borderName}


//             />
//             <CustomInput placeHolder={'Password'}
//                 setState1={setSecondBorderName}
//                 setState2={SetBorderName}
//                 placeName={SecondBorderName}

//             />

//         </View>
//     )
// }
