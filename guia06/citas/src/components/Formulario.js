import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'react-id-generator';
import colors from '../utils/colors';

const Formulario = ({ citas, setCitas, guardarMostarForm, guardarCitasStorage }) => {
    //variables para el formulario
    const [paciente, guardarPaciente] = useState('');
    const [propietario, guardarPropietario] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('');
    const [sintomas, guardaSintomas] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState('');
    const [isTimePickerVisible, setTimePickerVisibility] = useState('');

    const showDatePciker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmarFecha = date => {
        const opciones = { year: 'numeric', month: 'long', day: '2-digit' };
        guardarFecha(date.toLocaleDateString('es-SV', opciones));
    };

    //Muestra u oculta el time picker
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const confirmarHora = hora => {
        const opciones = { hour: 'numeric', minute: '2-digit', hour12: false };
        guardarHora(hora.toLocaleString('es-SV', opciones));
        hideTimePicker();

    };

    //Crear nueva cita
    const crearNuevaCita = () => {
        //validar
        if (paciente.trim() === '' ||
            propietario.trim() === '' ||
            telefono.trim() === '' ||
            fecha.trim() === '' ||
            hora.trim() === '' ||
            sintomas.trim() === '')
        {
            //Falla de validación
            mostrarAlerta();
            return;
        }

        //Crear una nueva cita
        const cita = { paciente, propietario, telefono, fecha, hora, sintomas };
        cita.id = shortid();
        //console.log(cita);

        //Agregar al state
        const citasNuevo = [...citas, cita];
        setCitas(citasNuevo);

        //pASAR LAS NUEVAS CITAS A STORAGE
        guardarCitasStorage(JSON.stringify(citasNuevo));

        //oculatar el formulario
        guardarMostrarForm(false);

        //Resetear el formulario
        guardarSintomas('');
        guardarPropietario('');
        guardarPaciente('');
        guardarHora('');
        guardarFecha('');
        guardarTelefono('');

    }
    //Muestra la alerta sifalla la validacion
    const mostrarAlerta = () => {
        Alert.alert(
            'Error', //titulo
            'Todos los campos son obligatorios', //Mensaje
            [{
                text: 'OK' //Arreglo de botones
            }]
        )
    }

    return (
        <>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Paciente:</Text>
                    <TextInput style={styles.input}
                        onChangeText={texto => guardarPaciente(texto)}
                    />
                </View>


                <View>
                    <Text style={styles.label}>Dueño:</Text>
                    <TextInput style={styles.input}
                        onChangeText={texto => guardarPropietario(texto)}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Telefono contacto:</Text>
                    <TextInput style={styles.input}
                        onChangeText={texto => guardarTelefono(texto)}
                        keyboardType='numeric'
                    />
                </View>


                <View>
                    <Text style={styles.lable}>Fecha:</Text>
                    <Button title={showDatePicker}
                    />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmarFecha}
                        onCancel={hideDatePicker}
                        local='es_SV'
                        headerTextIOS="Elige la fecha"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                    />

                    <Text>{fecha}</Text>
                </View>

                <View>
                    <Text style={stules.lable}>Hora:</Text>
                    <Button title="Seleccionar Hora"
                        onPress={showTimePicker}
                    />

                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={confirmarHora}
                        onCancel={hideTimePicker}
                        local='es_SV'
                        headerTextIOS="Elige una hora"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                    />

                    <Text>{hora}</Text>
                </View>

                <View>
                    <Text style={stules.lable}>Sintomas:</Text>
                    <TextInput
                        multiline
                        style={stules.input}
                        onChangeText={textp => guardarSintomas(texto)}
                    />
                </View>

                <View>
                    <TouchableHighlight onPress={() => crearNuevaCita()} style={styles.btnSubmit}>
                        <Text style={styles.textoSubmit}>Crear Nueva Cita </Text>
                    </TouchableHighlight>
                </View>

            </ScrollView>
        </>


    );

}


const styles = StyleSheet.create({
    formulario: {
        backgroundColor: "#FFF",
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#E1E1E1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: colors.BUTTON_COLOR,
        marginVertical: 10
    },
    textoSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})


export default Formulario;