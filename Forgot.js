import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, SafeAreaView, Keyboard, ImageBackground, Modal, TouchableOpacity, StatusBar } from 'react-native';
import { Loader, CustomButton, Input, ImageSlider, CustomModal } from '../../components';
import { useLogin } from '../../Main/LoginProvider';
import { COLORS, PORT, assets } from '../../constants';
import axios from 'axios';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export function Forgot({ navigation }) {
    const BASE_URL = 'http://192.168.1.220:5000/api'
    const [showModal, setShowModal] = useState(false)
    //  confirm Password icons
    const { setIsLoggedIn, SubMenu, setSubMenu } = useLogin();
    const [input, setInput] = React.useState({
        username: '',
        hint: '',
        answer: '',
        password: '',
        confirmPassword: '',
        datas: '',
        validuser: '',
        validanswer: ''
    })
    const [errors, setError] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const useFetch = () => {
        const head = {
            headers: { 'Content-Type': 'application/json' }
        };
        axios.get(`${BASE_URL}/get`, head)
            .then((response) => {
                console.log("Datas Showing in Forgot Page", response.data)
                // setData(response.data)
                handleOnChange(response.data, 'datas')
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
        Keyboard.dismiss();
        if (!input.password) {
            handleError('please enter a password', 'password');
            isValid = false;
        }
        else if (input.password.length < 5) {
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
            // console.log('isValid: ', isValid);
            register();
        }
    }
    const register = async () => {
        if (input.password === input.confirmPassword) {
            console.log("password and confirm Password same...")
            input.datas.map(async (item) => {
                console.log(item.userName)
                if (item.userName === input.username.trim()) {
                    try {
                        axios.put(`${BASE_URL}/update/${item._id}`, { userName: input.username.trim(), password: input.password.trim(), confirmPassword: input.password.trim() }).then((res) => {
                            console.log(res.data);
                            handleOnChange('', 'username')
                            handleOnChange('', 'password')
                            handleOnChange('', 'confirmPassword')
                        });
                        // navigation.navigate("Login")
                        setShowModal(true)
                    } catch (error) {
                        console.error(error);
                    }
                    // console.log("Enter User is New User...")
                }
                else {
                    // setValid(true)
                    // console.log("new user")
                }
            })
        }
        else {
            handleError("password not match", 'confirmpassword')
        }
    };
    const handleOnChange = (text, input) => {
        setInput(prevState => ({ ...prevState, [input]: text }))
    }
    const handleError = (error, input) => {
        setError((prevState) => ({ ...prevState, [input]: error }))
    }

    const check1 = () => {
        let isValid = true;
        if (!input.username) {
            handleError("please enter a valid username", 'username')
            isValid = false;
        }
        // console.log(input.username.match(/\S+@\S+\.\S+/))
        else if (input.username.length < 3) {
            handleError('username atleast 3 characters', 'username');
            isValid = false;
        }
        // const temp = input?.datas?.some(checkUser) this changed in else if area up
        function checkUser(item) {
            console.log('checkUSer', item['userName'])
            return item['userName'] === input.username.trim();
        }

        if (isValid) {
            // console.log('isValid person ')
            temp = input.datas?.some(checkUser)
            console.log('temp in username', temp);
            if (temp) {
                handleOnChange(temp, 'validuser')
                validate()
            }
            else {
                handleError('User Not Valid', 'username');
            }
        }
        else {
            // input.datas.map(async (item) => {
            //     console.log(item.username, item.password)
            //     if (item.userName === input.username.trim()) {
            //         isValid = true;
            //         // handleOnChange(item.hint, 'hint')
            //         console.log("user valid")
            //     }
            //     else {
            //         // isValid = true;
            //         // console.log("new user")
            //     }
            // })
            // handleError('User Not Valid', 'username');

        }


    }
    // const check2 = () => {
    //     if (!input.answer) {
    //         handleError('please enter a answer', 'answer');
    //         isValid = false;
    //     } else if (input.answer.length < 3) {
    //         handleError('answer atleast 3 characters', 'answer');
    //     }
    //     const temp = input.datas.some(checkUser)
    //     console.log(temp);
    //     function checkUser(item) {
    //         return item.answer === input.answer.trim();
    //     }
    //     if (temp) {
    //         handleOnChange(temp, 'validanswer')

    //     } else {
    //         handleError('answer not correct', 'answer');

    //     }

    // }
    console.log('showModal', showModal);
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }} >
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={'white'}
            />
            <CustomModal
                showModal={showModal}
                setShowModal={setShowModal}
                message={"Your Password Changed Successfully."}
                route={'Login'}
                routeMsg={"go to Login"}
            />
            <Loader visible={loading} />
            <View style={{ height: '40%', width: '100%', }} >
                <ImageBackground source={assets.login} resizeMode="cover" style={styles.image}>
                </ImageBackground>
            </View>
            <View style={styles.outsideContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{}}
                >
                    <Text style={{
                        color: COLORS.black,
                        fontSize: 25,
                        fontWeight: '600',
                        textAlign: 'center',
                        textShadowColor: 'rgba(0, 0, 0, 0.55)',
                        textShadowOffset: { width: 5, height: 5 },
                        textShadowRadius: 40,
                    }} >
                        Forgot Password
                    </Text>
                    <View style={{ marginVertical: 20 }} ></View>
                    <Input label="Username"
                        iconName='account-outline'
                        placeHolder="Enter Your Username"
                        onChangeText={text => handleOnChange(text, 'username')}
                        Value={input.username}
                        error={errors.username}
                        onFocus={() => {
                            handleError(null, 'username')
                        }}
                        margin={1}
                    />


                    {/* {input.validuser ?  // '!'
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 8 }} >
                            <CustomButton title="Next1" onPress={check1} Styles={{ backgroundColor: '#2986CC' }} />
                            <CustomButton title="Login" onPress={onPress = () => navigation.navigate("Login")} Styles={{ backgroundColor: '#FF5A5F' }} />
                        </View>
                        : ''} */}
                    {/* <Text >hello: {input.username}</Text> */}

                    {/* {input.validuser ?
                    <View style={{}} >
                        <Text style={{ fontSize: 14, marginBottom: 10, fontWeight: '500' }} >{input.hint}</Text>
                        <Input label="Answer"
                            iconName='pencil'
                            // keyBoardType='numeric'
                            placeHolder="Enter Your Answer"
                            onChangeText={text => handleOnChange(text, 'answer')}
                            error={errors.answer}
                            onFocus={() => {
                                handleError(null, 'answer')
                            }}
                        />
                        {!input.validanswer ?
                            <CustomButton
                                title={'Next2'}
                                onPress={check2}
                            /> : ''}
                    </View>
                    : ''
                } */}
                    {true
                        // input.validuser
                        ? <View>
                            <Input label="Password" iconName='lock-outline'
                                placeHolder="Enter Your Password"
                                password
                                onChangeText={text => handleOnChange(text, 'password')}
                                Value={input.password}
                                error={errors.password}
                                onFocus={() => {
                                    handleError(null, 'password')
                                }}
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
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 8 }} >
                                {/* <CustomButton title="Reset" onPress={check1} Styles={{ backgroundColor: '#2986CC' }} /> */}
                                <CustomButton title="Reset" onPress={''} Styles={{ backgroundColor: '#2986CC' }} />
                                <CustomButton title="Login" onPress={onPress = () => navigation.navigate("Login")} Styles={{ backgroundColor: '#FF5A5F' }} />
                            </View>
                        </View> : ''}
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