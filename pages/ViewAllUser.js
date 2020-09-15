import React, { useState, useEffect } from 'react';
import { View, SafeAreaView,Text} from 'react-native';
import MyButton from '../components/MyButton';
import MyTextInput from '../components/MyTextInput';

import * as SQLite from 'expo-sqlite';
import { FlatList } from 'react-native-gesture-handler';
var db = SQLite.openDatabase("UserDatabase.db");


const ViewAllUser = ({ navigation }) => {
    let [listaUsuario, setListaUsuario] = useState([]);

    useEffect(() =>{

        db.transaction(function (txn) {
            txn.executeSql("SELECT * FROM table_user ", [],

                function(tx, res){
                    console.log('Resultados:', res.rows.length);
                    let novaLista = []
                    for (let index = 0; index < res.rows.length; index++) {
                        novaLista.push(res.rows.item(index))
                        
                    }
                    setListaUsuario(novaLista)
                    
                }
            )
        });

    },[])

    function listSeparator(){
        return(
            <View style={ { height: 0.2,  width: '100%', backgroundColor: '#808080'} } >

            </View>
        )
    }

    function listItemRender(item){
        return(
            <View 
            key={item.user_id}
            style={{ backgroundColor: 'white', padding: 20 }}>
            <Text >ID: {item.user_id} </Text>
            <Text >Nome: {item.user_name} </Text>
            <Text >Email: {item.user_email} </Text>
            <Text >Numero: {item.user_number} </Text>
            </View>
        )
    }

    

    return(
    <SafeAreaView style={{flex: 1}}>
        <View style={{flex:1, backgroundColor: 'white'}} >
            <View style={{ flex: 1 }}>
                <FlatList
                data={listaUsuario}
                ItemSeparatorComponent={listSeparator}
                keyExtractor={(item,index) => index.toString() }
                renderItem={({ item }) => listItemRender(item)}
                />
            </View>
        </View>
    </SafeAreaView>
    )
}



export default ViewAllUser;