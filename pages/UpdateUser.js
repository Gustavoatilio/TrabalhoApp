import React, { useState } from 'react';
import { View, SafeAreaView,Text, Alert, ScrollView, KeyboardAvoidingView} from 'react-native';
import MyTextInput  from "../components/MyTextInput";
import MyButton from '../components/MyButton';
import * as SQLite from 'expo-sqlite';
var db = SQLite.openDatabase("UserDatabase.db");
const UpdateUser = ({ navigation }) => {
    let [userId, setUserId] = useState('');
    let [userName, setUserName] = useState('');
    let [userEmail, setUserEmail] = useState('');
    let [userNumber, setUserNumber] = useState('');

    function Atualizar_estados(name, email, number){
        setUserName(name)
        setUserEmail(email)
        setUserNumber(number.toString())
        
    }

    function Procurar_usuario(){
        console.log(userId);
        db.transaction(function (txn) {
            txn.executeSql("SELECT * from table_user WHERE user_id = ?", [userId],

                (tx, results) => {
                  var len = results.rows.length;
               
                  if(len > 0){
                      let res = results.rows.item(0)
                      Atualizar_estados(res.user_name, res.user_email, res.user_number);
                  }else{ Atualizar_estados('','','') }
                }
            )
        });
    }

    

    function Atualizar_usuario(){
        if(!userId){
            alert("Procure um ID")
        }
        if(!userName){
            alert("Preencha o Nome")
        }
        if(!userEmail){
            alert("Preencha o Email")
        }
        if(!userNumber){
            alert("Preencha o Numero")
        }
        db.transaction(function (txn) {
            txn.executeSql("UPDATE table_user SET user_name=?, user_email=?, user_number=? where user_id=?",
             [userName,userEmail,userNumber,userId],

                (tx, results) => {
                 if(results.rowsAffected){
                    Alert.alert('Sucesso!',
                    'Atualizado registrado com sucesso',
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
                        title="Procurar"
                        onClick={Procurar_usuario}
                        />

                        <MyTextInput 
                        placeholder="Nome"
                        onChangeText={ (userName) => setUserName(userName) }
                        value={userName}
                        style={{ padding: 10 }}
                        />
                        <MyTextInput 
                        placeholder="Email"
                        onChangeText={ (userEmail) => setUserEmail(userEmail) }
                        value={userEmail}
                        style={{ padding: 10 }}
                        />
                        <MyTextInput 
                        placeholder="Numero"
                        onChangeText={ (userNumber) => setUserNumber(userNumber) }
                        value={userNumber}
                        keyboardType="numeric"
                        maxLength={12}
                        style={{ padding: 10 }}
                        />
                        <MyButton 
                        title="Atualizar"
                        onClick={Atualizar_usuario}
                        />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
        )
    

}




export default UpdateUser;