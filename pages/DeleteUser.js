import React, { useState } from 'react';
import { View, SafeAreaView,Text, Alert, ScrollView, KeyboardAvoidingView} from 'react-native';
import MyTextInput  from "../components/MyTextInput";
import MyButton from '../components/MyButton';
import * as SQLite from 'expo-sqlite';
var db = SQLite.openDatabase("UserDatabase.db");

const DeleteUser = ({ navigation }) => {
    let [userId, setUserId] = useState('');
    let [userName, setUserName] = useState('');
    let [userEmail, setUserEmail] = useState('');
    let [userNumber, setUserNumber] = useState('');

    function Deletar_usuario(){
        console.log(userId);
        db.transaction(function (txn) {
            txn.executeSql("DELETE FROM table_user  WHERE user_id = ?", [userId],

                (tx, results) => {
                    if(results.rowsAffected){
                        Alert.alert('Sucesso!',
                        'Deletado registrado com sucesso',
                        [
                            {
                                text: "ok",
                                onPress: () => navigation.navigate('HomeScreen')
                            }
                        ]
                        
                        )
                     }
                }
            )
        });
    }

    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex:1, backgroundColor: 'white'}} >
    
                <View style={{ flex: 1 }}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <KeyboardAvoidingView behavior="padding" style={{ flex: 1, justifyContent: 'space-between' }}>
                        
                        <MyTextInput 
                        placeholder="Procure um Id"
                        keyboardType="numeric"
                        onChangeText={ (userId) => setUserId(userId) }
                        style={{ padding: 10 }}
                        />
                        <MyButton 
                        title="Deletar Usuario"
                        onClick={Deletar_usuario}
                        />

                        
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}



export default DeleteUser;