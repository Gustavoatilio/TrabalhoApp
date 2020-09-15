import React, { useState } from 'react';
import { View, SafeAreaView,Text} from 'react-native';
import MyButton from '../components/MyButton';
import MyTextInput from '../components/MyTextInput';

import * as SQLite from 'expo-sqlite';
var db = SQLite.openDatabase("UserDatabase.db");

const ViewUser = ({ navigation }) => {
    let [usuarioProcurado, setusuarioProcurado] = useState('');
    let [usuarioDados, setUsuarioDados] = useState('');

    function procurar_usuario(){
        console.log(usuarioProcurado)
        setUsuarioDados({})
        db.transaction(function (txn) {
            txn.executeSql("SELECT * FROM table_user WHERE user_id = ?", [usuarioProcurado],

                function(tx, res){
                    console.log('Resultados:', res.rowsAffected);
                    if (res.rows.length > 0 ) {
                        setUsuarioDados(res.rows.item(0))
                    }else{
                        alert("Contato não encontrado.")
                    }
                }
            )
        });
    }

    return(
    <SafeAreaView style={{flex: 1}}>
        <View style={{flex:1, backgroundColor: 'white'}} >
            <View style={{ flex: 1 }}>
                <MyTextInput
                placehold="Digite um id"
                onChangeText={setusuarioProcurado}
                style={{ padding: 10 }}
                />
                <MyButton
                 title="Procurar contato" 
                 onClick={procurar_usuario}
                />
            </View>
            <View style={{ marginHorizontal: 35, marginTop: 10 }}>
            <Text >ID: {usuarioDados.user_id} </Text>
            <Text >Nome: {usuarioDados.user_name} </Text>
            <Text >Email: {usuarioDados.user_email} </Text>
            <Text >Numero: {usuarioDados.user_number} </Text>

            </View>
        </View>
    </SafeAreaView>
    )
}



export default ViewUser;