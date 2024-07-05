import React from 'react';
import {View,Text} from 'react-native';
import example from './android/app/src/main/assets/proconfig.json';

const App=()=>{
  const subheading=false;
  const menu=[];
  const dicsub={};
  const data=example;
  // console.log(data);
  const datahead=Object.keys(data);
  // console.log(datahead);
  for(var i in data){
    const datahead1=data[i];
    // console.log(datahead1,i);
    if (Array.isArray(datahead1)){
      // console.log(datahead1);
      const mergedata=Object.assign({},...datahead1);
      // console.log(mergedata);
      const head3=Object.keys(mergedata);
      // console.log(head3,'head3');
      for(var k in head3){
        // console.log(head3,'sub-menu',i);
        // console.log(typeof mergedata[head3[k]]);
        if(typeof mergedata[head3[k]] === 'object'){
          console.log(head3[k],'sub-menu',i,typeof mergedata[head3[k]]);
          dicsub[i] = head3;
        }
        else{
          console.log(head3[k],'s');
        }
      }
    }
    else{
      const head2=Object.keys(datahead1);
      for(var j in head2){
        if(typeof datahead1[head2[j]] === 'object'){
          console.log(head2[j],'sub-menu',i);
          dicsub[i] = head2;
        }
        else{
          console.log(head2,'h32',i);
          menu.push(i);
        }
      }
    }
  }
  console.log(dicsub);
  // console.log(menu);
  menu.push(dicsub);
  //menu.push(...Object.entries(dicsub)); //---------------------this important ---------------------
  // menu.push(...Object.entries(dicsub).flatMap(([key,value]) => [key, value]));
  const uniqueSet = new Set(menu);
  const uniqueArray = Array.from(uniqueSet)
  console.log(uniqueArray);
  return(
    <View>
      <Text>Hello</Text>
    </View>
  )
}
export default App;