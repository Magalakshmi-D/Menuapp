import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, SafeAreaView, Keyboard, ImageBackground, LogBox } from 'react-native';
import { Loader, CustomButton, Input, ImageSlider, CustomModal } from '../../components';
import { useLogin } from '../../Main/LoginProvider';
import { COLORS, assets } from '../../constants';
import axios from 'axios';
LogBox.ignoreAllLogs(true);
export function SignUp({ navigation }) {
    const BASE_URL = 'http://192.168.1.220:5000/api';
    const [showModal, setShowModal] = useState(false)

    //  confirm Password icons
    const { setIsLoggedIn, SubMenu, setSubMenu } = useLogin();
    const [input, setInput] = React.useState({
        username: '',
        recoverQuestion: '',
        answer: '',
        password: '',
        confirmPassword: '',
    })
    const [errors, setError] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState();
    const useFetch = () => {
        const head = {
            headers: { 'Content-Type': 'application/json' }
        };
        axios.get(`${BASE_URL}/get`, head)
            .then((response) => {
                console.log("Datas Showing", response.data)
                setData(response.data)
                // setTasks(response.data)
            })
    }
    useEffect(() => {
        useFetch()
    }, [])
    const validate = () => {
        console.log("Enter to validate...")
        // console.log(input.username)
        let isValid = true;
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        Keyboard.dismiss();
        if (input.username) {
            data.map(async (item) => {
                console.log(item.userName)
                if (item.userName === input.username) {
                    isValid = false;
                    handleError("Username already exist", 'username')
                    // Alert.alert("User Already Exist", "Please Enter New Username")
                }
                else {
                    isValid = true;
                    // console.log("new user")
                }
            })
        }
        if (!input.username) {
            handleError("please enter a valid username", 'username')
            isValid = false;
        }
        // console.log(input.username.match(/\S+@\S+\.\S+/))
        else if (input.username.length < 3) {
            handleError('username atleast 3 characters', 'username');
            isValid = false;
        }
        // if (!input.recoverQuestion) {
        //     handleError('please enter a recoveryQuestion', 'recoverQuestion');
        //     isValid = false;

        // }
        // if (!input.answer) {
        //     handleError('please enter a answer', 'answer');
        //     isValid = false;

        // }
        if (!input.password) {
            handleError('please enter a password', 'password');
            isValid = false;
        } else if (input.password.length < 5) {
            handleError('Mininimum Password must be at least 5 characters', 'password');
            isValid = false;

        }
        if (!input.confirmPassword) {
            handleError('please enter a confirm password', 'confirmPassword');
            isValid = false;
        }
        else if (input.confirmPassword.length < 5) {
            // console.log('Mininimum Password must be at least 5 characters')
            handleError('Mininimum Password must be at least 5 characters', 'confirmPassword');
            isValid = false;
        }
        if (input.password === input.confirmPassword) {

        } else {
            handleError('password not match', 'confirmPassword');
        }
        if (isValid) {
            console.log('isValid: ', isValid);
            // register();
        }
    }
    const image = { uri: 'https://www.planstudyabroad.uniagents.com/images/login.png' };
    const register = async () => {


        try {
            axios.post(`${BASE_URL}/save`, { userName: input.username, password: input.password, confirmPassword: input.password })
                .then(response => {
                    console.log('Response:', response.data);
                    setShowModal(true)
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } catch (error) {
            console.error(error);
        }
        setInput({
            username: '',
            password: '',
            confirmpassword: ''
            // hint: '',
            // answer: '',
        })
    };
    const handleOnChange = (text, input) => {
        setInput(prevState => ({ ...prevState, [input]: text }))
    }
    const handleError = (error, input) => {
        setError((prevState) => ({ ...prevState, [input]: error }))
    }
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }} >
            <Loader visible={loading} />
            <CustomModal
                showModal={showModal}
                setShowModal={setShowModal}
                message={"Your Registered Successfully."}
                route={'Login'}
                routeMsg={"go to Login"}
            />
            <View style={{ height: '40%', width: '100%', }} >
                <ImageBackground source={assets.login} resizeMode="cover" style={styles.image}>
                </ImageBackground>
            </View>
            <View style={styles.outsideContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{}}
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
                            Register
                        </Text>
                        <Input label="Username" iconName='account-outline'
                            placeHolder="Enter Your Username"
                            Value={input.username}
                            onChangeText={text => handleOnChange(text, 'username')}
                            error={errors.username}
                            onFocus={() => {
                                handleError(null, 'username')
                            }}
                            margin={0}
                        />
                        {/* <Input label="RecoveryQuestion" iconName='comment-question'
                            placeHolder="Enter Your Recovery Question"
                            onChangeText={text => handleOnChange(text, 'recoverQuestion')}
                            error={errors.recoverQuestion}
                            Value={input.recoverQuestion}
                            onFocus={() => {
                                handleError(null, 'recoverQuestion')
                            }}
                            margin={0}
                        /> */}
                        {/* <Input label="Answer"
                            iconName='pencil'
                            // keyBoardType='numeric'
                            placeHolder="Enter Your Answer"
                            onChangeText={text => handleOnChange(text, 'answer')}
                            error={errors.answer}
                            Value={input.answer}
                            onFocus={() => {
                                handleError(null, 'answer')
                            }}
                            margin={0}
                        /> */}
                        <Input label="Password" iconName='lock-outline'
                            placeHolder="Enter Your Password"
                            password
                            onChangeText={text => handleOnChange(text, 'password')}
                            Value={input.password}
                            error={errors.password}
                            onFocus={() => {
                                handleError(null, 'password')
                            }}
                            margin={0}
                        />
                        <Input label="Confirm Password" iconName='lock-outline'
                            placeHolder="Enter Your Confirm Password"
                            confirmPassword
                            onChangeText={text => handleOnChange(text, 'confirmPassword')}
                            Value={input.confirmPassword}
                            error={errors.confirmPassword}
                            onFocus={() => {
                                handleError(null, 'confirmPassword')
                            }}
                            margin={0}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 8 }} >
                            {/* <CustomButton title="SignUp" onPress={validate} Styles={{ backgroundColor: '#2986CC' }} /> */}
                            <CustomButton title="SignUp" onPress={''} Styles={{ backgroundColor: '#2986CC' }} />

                            <CustomButton title="Login" onPress={onPress = () => navigation.navigate("Login")} Styles={{ backgroundColor: '#FF5A5F' }} />
                        </View>
                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', margin: 2 }} >
                    <Text
                        onPress={() => navigation.navigate("Login")}
                        style={styles.text}>
                        Already have account ?
                    </Text>
                    <Text
                        onPress={() => navigation.navigate("Login")}
                        style={[styles.text, { color: COLORS.blue, marginLeft: 5 }]}>Login</Text>
                </View> */}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    text: {
        color: COLORS.black,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        // marginBottom: 15
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
        // backgroundColor: ''

    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
});