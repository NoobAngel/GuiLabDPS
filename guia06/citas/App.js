import React, {useState, useEffect} from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, keyboard,Platform } from 'react-native';
import Cita from './src/components/Cita';
import Formulario from './src/components/Formulario';
import AsyncStore from '@react-native-async-storage/async-storage';
import Colors from "./src/utils/colors";

const App =() =>{
  //definir el state de citas
  const[citas,setCitas] = useState([]);
  const [mostarForm, guardarMostarForm] = useState(false);

useEffect(() => {
  const obtenerCitasStorage =async () => {
    try{
      const CitasStorage = await AsyncStorage.getItem('citas');
  if(citasStorage){
        setCitas(JSON.parse(CitasStorage));
  }
    }catch(error){
      console.log(error);
    }
  }
obtenerCitasStorage();
},[]);

//Elimina los pacientes del state
const eliminarPaciente = id =>{
  const citasFiltradas = citas.filter(cita=> cita.id !== id);
  setCitas(citasFiltradas);
  guardarCitasStorage(JSON.stringify(citasFitradas));
}

//Muestra u oculta el formulario
const mostrarFormulario = () => {
  guardarMostarForm(!mostarForm);
}

//Ocultar el teclado
const cerrarTeclado =() =>{
  keyboard.dismiss();
}

//AAlmacenar las citas en storage
const guardarCitasStorage =async (citasJSON) =>{
try{
  await AsyncStore.setItem('citas',citasJSON);
}catch(error){
  console.log(error);
}

}

return (
    <>
      <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
        <View>
          <View style={styles.contenedor}>
            <Text style={styles.titulo}>Administrador de Citas</Text>
            <View>
              <TouchableHighlight
                onPress={() => mostrarFormulario()}
                style={styles.btnMostrarForm}
              >
                <View>
                  <Text style={styles.textoMostrarForm}>
                    {mostrarForm ? "Cancelar Crear Cita" : "Crear Nueva Cita"}
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>

          <View style={styles.contenido}>
            {mostrarForm ? (
              <>
                <Text style={styles.titulo}>Crear Nueva Cita</Text>
                <Formulario
                  citas={citas}
                  setCitas={setCitas}
                  guardarMostrarForm={guardarMostrarForm}
                  guardarCitasStorage={guardarCitasStorage}
                />
              </>
            ) : (
              <>
                <Text style={styles.titulo}>
                  {citas.length > 0
                    ? "Administra tus citas"
                    : "No hay citas, agrege una"}
                </Text>
                <FlatList
                  style={styles.listado}
                  data={citas}
                  renderItem={({ item }) => (
                    <Cita item={item} eliminarPaciente={eliminarPaciente} />
                  )}
                  keyExtractor={(cita) => cita.id}
                />
              </>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: Colors.PRIMARY_COLOR,
    flex: 1,
  },
  titulo: {
    color: "#FFF",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  contenido: {
    flex: 1,
    marginHorizontal: "2.5%",
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: Colors.BUTTON_COLOR,
    marginVertical: 10,
  },
  textoMostrarForm: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },


})
