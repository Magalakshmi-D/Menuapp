import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable, Dimensions, LayoutAnimation, TouchableNativeFeedback } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';


import { StackNavigator } from './StackNavigator'
import {
    Home,
    PreConfiguration,
    Forgot,
    Extraction,
    Details,
    Common,
    Groups
} from '../screens';
import { assets, COLORS, ROUTES, DRAWERMENU } from '../constants';
import { useLogin } from './LoginProvider';
// import { loadPartialConfigAsync } from "@babel/core";
const Drawer = createDrawerNavigator();


const CustomDrawerContent = ({ navigation }) => {
    const { setIsLoggedIn, SubMenu, setSubMenu } = useLogin();
    const [menuIndex, setMenuIndex] = useState(-1)
    const [subMenuIndex, setSubMenuIndex] = useState(-1)

    return (
        <DrawerContentScrollView
            scrollEnabled={true}
        // contentContainerStyle={{ flex: 1 }}
        >
            {/* Header Details */}
            <View style={{ backgroundColor: 'white' }} >
                <TouchableOpacity style={styles.profile}>
                    <View style={{ marginLeft: 10, }} >
                        <Text style={styles.ProfileHeader}>
                            Bluetooth App
                        </Text>
                        <Text style={styles.ProfileExplanation} >
                            View your Slots
                        </Text>
                    </View>
                    <Image source={assets.bluetoothimage}
                        style={styles.blutoothImage}
                    />
                </TouchableOpacity>
            </View>
            {/* Drawer Menu List */}
            {/* <DrawerItemList {...props} /> */}
            {/* <DrawerItem
                label="Home"
                style={[styles.drawerItem, { marginTop: 10 }]}
                icon={({ color, size, focused }) => (
                    <FontAwesome5 name={'house-user'} size={18} color={'black'} />
                )}
                labelStyle={styles.labelStyle}
                onPress={() => {
                    navigation.navigate("Home");
                }}

            />
            <DrawerItem
                label="PreConfiguration"
                icon={({ color, size, focused }) => (
                    <FontAwesome5 name={'wrench'} size={18} color={'black'} />
                )}
                style={styles.drawerItem}
                labelStyle={styles.labelStyle}
                onPress={() => {
                    navigation.navigate("PreConfiguration");
                }}
            /> */}


            {/* <DrawerItem
                label="Extraction"
                style={styles.drawerItem}
                icon={({ color, size, focused }) => (
                    <FontAwesome5 name={'file'} size={18} color={'black'} />
                )}
                labelStyle={styles.labelStyle}
                onPress={() => {
                    navigation.navigate("Extraction");
                }}
            /> */}
            {/* Menu */}
            {DRAWERMENU.map((item, index) => {
                return (
                    <View key={index}
                    >
                        {/* <DrawerItem
                            label={item.title}
                            // focused={focus ? true : false}
                            icon={({ color, size, focused }) => (
                                <View>
                                    <MaterialIcons name={item.type} size={18} color={'black'} />
                                </View>
                            )}
                            style={styles.drawerItem}
                            labelStyle={styles.labelStyle}
                            onPress={() => {
                                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                                setMenuIndex(menuIndex === index ? -1 : index)
                                setSubMenuIndex(subMenuIndex === index ? -1 : index)
                            }}
                        /> */}
                        <TouchableNativeFeedback
                            activeOpacity={0}
                            // background={{background: 'grey'}}
                            onPress={() => {
                                setMenuIndex(menuIndex === index ? -1 : index)
                                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                                item.route == 'System' || item.route == 'PreConfiguration' || item.route == 'Home' ?
                                navigation.navigate(item.route): null
                            }}
                            background={TouchableNativeFeedback.SelectableBackground(
                                200,
                            )}
                            style={{ marginHorizontal: 10, borderRadius: 20, }}
                        >
                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 12, marginVertical: 10 }} >
                                <item.Icon name={item.type} size={18} color={'black'} />
                                <Text style={[{ fontSize: 16, paddingHorizontal: 26, fontWeight: '500' }, {
                                    color: menuIndex === index ? 'black' : 'black'
                                }]} >{item.title}</Text>
                                {item.title === "Common" || item.title === "Devices" ?
                                    <item.Icon name={"chevron-right"} size={25} color={'black'}
                                        style={{ position: 'absolute', right: 20, top: 14 }}
                                    />
                                    : null
                                }
                            </View>
                        </TouchableNativeFeedback>
                        {menuIndex === index
                            ? <View>
                                {item.menuList.map((subMenu, index) => {
                                    // console.log(subMenu.menu)
                                    return (
                                        <View key={index}>
                                            <TouchableNativeFeedback onPress={() => {
                                                setSubMenuIndex(subMenuIndex === index ? -1 : index)
                                                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                                                if (subMenu.route == "Tracks") {
                                                }
                                                else {
                                                    navigation.navigate(subMenu?.route, { data: subMenu.msg });
                                                }
                                            }}
                                                style={{ backgroundColor: 'white' }}  >
                                                <View style={{ flexDirection: 'row', paddingLeft: 70, paddingVertical: 12 }} >
                                                    <subMenu.Icon name={subMenu.iconName} size={18} color={'black'} />
                                                    <Text style={{ fontSize: 14, paddingHorizontal: 26, color: 'black' }} >{subMenu.title}</Text>
                                                    {subMenu.title === "Tracks" ?
                                                        <subMenu.Icon name={"chevron-right"} size={18} color={'black'}
                                                            style={{ position: 'absolute', right: 20, top: 14 }}
                                                        />
                                                        : null}
                                                </View>
                                            </TouchableNativeFeedback>
                                            {subMenuIndex === index ?
                                                subMenu?.menu.map((item, index) => {
                                                    // console.log(item)
                                                    return (
                                                        <TouchableNativeFeedback key={index} onPress={() => {
                                                            navigation.navigate(item?.route, {
                                                                data: item.data,
                                                                name: item.title
                                                            });
                                                        }}
                                                            style={{ backgroundColor: 'white' }}  >
                                                            <View style={{ flexDirection: 'row', paddingLeft: 100, paddingVertical: 12 }} >
                                                                <item.Icon name={item.iconName} size={18} color={'black'} />
                                                                <Text style={{ fontSize: 14, paddingHorizontal: 26, color: 'black' }} >{item.title}</Text>
                                                                {/* <item.Icon name={item.iconName} size={18} color={'black'} /> */}
                                                            </View>
                                                        </TouchableNativeFeedback>
                                                    )
                                                })
                                                : null}
                                        </View>
                                    )
                                })}
                            </View>
                            :
                            null
                        }
                    </View>
                )
            })}
        </DrawerContentScrollView>
    )
}

export function MainDrawerScreen() {
    const { setIsLoggedIn, SubMenu, setSubMenu } = useLogin();
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerType="slide"
                overlayColor="transparent"
                initialRouteName="Normal"
                drawerStyle={styles.drawer}
                sceneContainerStyle={{ backgroundColor: 'transparent' }}
                drawerContent={props => {
                    return (
                        <CustomDrawerContent navigation={props.navigation} />
                    )
                }}
                style={{ width: 200 }}
                screenOptions={{
                    // drawerActiveBackgroundColor: 'blue',
                    headerShown: true,
                    swipeEnabled: false,
                    gestureEnabled: false,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#0366b1', //'COLORS.darkblue'
                    },
                    headerTintColor: 'white', //'#0A2647',
                    drawerActiveTintColor: 'black',
                    drawerActiveBackgroundColor: 'white',
                    headerTitleStyle: {
                        fontSize: 21,
                        fontWeight: 'bold',
                    },
                    drawerStyle: {
                        width: 280,
                    },
                    drawerItemStyle: {
                        borderRadius: 20,
                        // width: '100%'
                        marginLeft: 10
                    },
                    drawerLabelStyle: {
                        fontSize: 16
                    }
                }}
            >
                <Drawer.Screen
                    name="Home"
                    component={Home}
                    options={{
                        title: 'Bluetooth App',
                        // headerTitle: () => <Text style={{ color: 'black' }}>Hello</Text>,
                        headerRight: () =>
                            <View style={{ marginRight: 10 }} >
                                <AntDesign name={'logout'} size={20} color={'black'} onPress={() => { setIsLoggedIn(false) }} />
                            </View>,
                        drawerIcon: ({ color, size, focused }) => {
                            return <FontAwesome5 name={'home'} size={20} color={'black'} />
                        }
                    }}
                />
                {
                    ROUTES.map((item, index) => {
                        return (
                            <Drawer.Screen
                                key={index}
                                name={item.label}
                                component={item.component}
                                options={{
                                    title: item.label,
                                    headerShown: true,
                                    drawerIcon: ({ color, size, focused }) => {
                                        return <FontAwesome5 name={item.icon} size={20} color={'black'} />
                                    }
                                }}
                            />
                        )
                    })
                }

                {/* <Drawer.Screen
                    name="Extraction"
                    component={Extraction}
                    options={{
                        title: 'Extraction',
                        headerShown: false

                    }}
                />
                <Drawer.Screen
                    name="Forgot"
                    component={Forgot}
                    options={{
                        title: 'Forgot',
                        headerShown: false

                    }}
                />
                <Drawer.Screen
                    name="Details"
                    component={Details}
                    options={{
                        title: 'Details',
                        headerShown: false
                    }}
                />

                <Drawer.Screen
                    name="Home"
                    component={Home}
                    options={{
                        title: 'Bluetooth App',
                        // headerTitle: () => <Text style={{ color: 'black' }}>Hello</Text>,
                        headerRight: () =>
                            <View style={{ marginRight: 10 }} >
                                <AntDesign name={'logout'} size={20} color={'black'} onPress={() => { setIsLoggedIn(false) }} />
                            </View>
                    }}
                />
                <Drawer.Screen
                    name="PreConfiguration"
                    component={PreConfiguration}
                    options={{
                        title: 'Bluetooth App',
                        // headerTitle: () => <Text style={{ color: 'black' }}>Hello</Text>,
                        headerRight: () =>
                            <View style={{ marginRight: 10 }} >
                                <AntDesign name={'logout'} size={20} color={'black'} onPress={() => { setIsLoggedIn(false) }} />
                            </View>
                    }}
                />

                <Drawer.Screen
                    name="Common"
                    component={Common}
                    options={{
                        title: 'common',
                        headerShown: false
                    }}
                />
                <Drawer.Screen
                    name="Groups"
                    component={Groups}
                    options={{
                        title: 'Groups',
                        headerShown: false
                    }}
                /> */}

            </Drawer.Navigator>
        </NavigationContainer>
    )
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange'

    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        margin: 10,
    },
    image: {
        width: 20,
        height: 20,
        margin: 5,
    },
    profile: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        padding: 10,
        marginBottom: 30,
        borderBottomWidth: 2,
        borderBottomColor: 'black'

    },
    CustomDrawerItemsStyle: {
        flexDirection: 'row',
        height: 40,
        marginBottom: 10,
        alignItems: 'center',
        paddingLeft: 10,
        borderRadius: 10,

    },
    customItemsName: {
        marginLeft: 15,
        color: 'black',
        fontSize: 45,

    },
    drawer: {
        flex: 1,
        width: 100,
        height: 200,
        paddingRight: 20,
        backgroundColor: 'green',
    },
    drawerItem: {
        // backgroundColor: 'skyblue',
        width: 300,
        margin: 0,
    },
    ProfileHeader: {
        color: 'black',
        fontSize: 23,
        marginLeft: 10
    },
    ProfileExplanation: {
        color: 'black',
        fontSize: 13,
        marginLeft: 10
    },
    labelStyle: {
        color: "black",
        fontSize: 15
    },
    blutoothImage: {
        width: 50,
        height: 50,
        borderRadius: 30,
        marginLeft: 30,
    }
})

