import React from 'react';
import {View,Text} from 'react-native';
import data from './android/app/src/main/assets/proconfig.json';


const Menu=()=>{
    const head=Object.keys(data);
    // console.log(head);
    for(var i in head){
        const menu=head[i];
        // console.log(data[menu]);
        const submenu=data[menu];
        const submenudata=Object.keys(submenu);
        console.log(submenudata);
    }
    return(
        <View>
            <Text>Hello Menu</Text>
        </View>
    )
}

export default Menu;