import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  View,
  StyleSheet,
} from "react-native";
import { Box, TextInput, Button } from "@react-native-material/core";
import { crearDatosLaborales, registro } from "../estados/usuarios";
import { SelectList } from "react-native-dropdown-select-list";
import {turnos, puestos, diasLaborales } from "../config/dataLaboral"
const Registro = ({ navigation }) => {
  const dispatch = useDispatch();
  const [equipo, setEquipo] = useState("");
  const [data, setData] = useState([]);
  const [oficina, setOficina] = useState("");
  const [dataDos, setDataDos] = useState([]);
  const equipos = useSelector((estado) => estado.equipos.equipos);
  const oficinas = useSelector((estado) => estado.oficinas.oficinas);

  const newArrayDos = equipos.map((item) => {
    return { key: item.id, value: item.nombre };
  });

  const newArrayUno = oficinas.map((item) => {
    return { key: item.id, value: item.pais };
  });

  const [Registro, setRegistro] = useState({
    nombre: "",
    apellido: "",
    domicilio: "",
    documento: "",
    telefono: "",
    fechaDeNacimiento: "",
    eMail: "",
    contrasena: "",
  });
  const [Datos, setDatos] = useState({
    fechaDeIngreso: "",
    puesto: "",
    turno: "",
    diasLaborales: "",
    horarioLaboral: "",
    observaciones: "",
    pais: "",
    eMail: "",
    nombre: "",
  });


  const SubmitHandler = () => {
    dispatch(registro(Registro))
      .then(() => {
        dispatch(crearDatosLaborales(Datos));
      })
      .then(() => {
        Alert.alert(
          "Registrar usuario",
          "Registro exitoso!",
          [{ text: "Entendido", onPress:() =>{ navigation.navigate('Inicio')}}],
          { cancelable: true }
        );
        
      })
    
      .catch((error) => {
        Alert.alert(
          "Registrar erroneo",
          error.message,
          [{ text: "Entendido" }],
          {
            cancelable: true,
          }
        );
      });
      
  };


  const registroNombreHandler = (e) => {
    setRegistro({ ...Registro, nombre: e });
  };

  const registroApellidoHandler = (e) => {
    setRegistro({ ...Registro, apellido: e });
  };

  const registroDomicilioHandler = (e) => {
    setRegistro({ ...Registro, domicilio: e });
  };

  const registroDocumentoHandler = (e) => {
    setRegistro({ ...Registro, documento: e });
  };

  const registroTelefonoHandler = (e) => {
    setRegistro({ ...Registro, telefono: e });
  };

  const registroFechaDeNacimientoHandler = (e) => {
    setRegistro({ ...Registro, fechaDeNacimiento: e });
  };

  const registroEmailHandler = (e) => {
    setRegistro({ ...Registro, eMail: e });
    setDatos({ ...Datos, eMail: e });
  };
  const registroContrasenalHandler = (e) => {
    setRegistro({ ...Registro, contrasena: e });
  };

  const datosFechaDeIngresoHandler = (e) => {
    setDatos({ ...Datos, fechaDeIngreso: e });
  };

  const datosPuestoHandler = (e) => {
    setDatos({ ...Datos, puesto: e });
  };

  const datosTurnoHandler = (e) => {
    setDatos({ ...Datos, turno: e });
  };

  const datosDiasLaboralesHandler = (e) => {
    setDatos({ ...Datos, diasLaborales: e });
  };

  const datosHorariosLaboralesHandler = (e) => {
    setDatos({ ...Datos, horarioLaboral: e });
  };

  const datosObservacionesHandler = (e) => {
    setDatos({ ...Datos, observaciones: e });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <Box
          style={{
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 30, marginBottom: 10 }}>
            DATOS DEL USUARIO
          </Text>
          <View style={style.view}>
            <TextInput
              placeholder="Nombre"
              style={style.textInput}
              onChangeText={registroNombreHandler}
            ></TextInput>
          </View>
          <View style={style.view}>
            <TextInput
              onChangeText={registroApellidoHandler}
              placeholder="Apellido"
              style={style.textInput}
            ></TextInput>
          </View>

          <View style={style.view}>
            <TextInput
              onChangeText={registroDomicilioHandler}
              placeholder="Domicilio"
              style={style.textInput}
            ></TextInput>
          </View>
          <View style={style.view}>
            <TextInput
              onChangeText={registroDocumentoHandler}
              placeholder="Documento"
              style={style.textInput}
            ></TextInput>
          </View>
          <View style={style.view}>
            <TextInput
              onChangeText={registroTelefonoHandler}
              placeholder="Telefono"
              style={style.textInput}
            ></TextInput>
          </View>
          <View style={style.view}>
            <TextInput
              onChangeText={registroFechaDeNacimientoHandler}
              placeholder="Fecha de nacimiento"
              style={style.textInput}
            ></TextInput>
          </View>
          <View style={style.view}>
            <TextInput
              onChangeText={registroEmailHandler}
              placeholder="Email"
              style={style.textInput}
            ></TextInput>
          </View>
          <View style={style.view}>
            <TextInput
              onChangeText={registroContrasenalHandler}
              placeholder="Contraseña"
              style={style.textInput}
            ></TextInput>
          </View>
          <Text style={{ fontSize: 30, marginBottom: 10 }}>
            Datos Laborales
          </Text>
          <View style={style.view}>
            <TextInput
              onChangeText={datosFechaDeIngresoHandler}
              placeholder="Fecha de ingreso"
              style={style.textInput}
            ></TextInput>
          </View>
          <View style={style.select}>
                    <SelectList
              style={{ marginBottom: 20 }}
              placeholder="Puesto"
              data={puestos}
              setSelected={datosPuestoHandler}
            />
          </View>
          <View style={style.select}>
            <SelectList
              placeholder="Equipo"
              setSelected={(e) => {
                setEquipo(e);
                setDatos({ ...Datos, nombre: e });
              }}
              data={newArrayDos}
              save="value"
            />
          </View>
          <View style={style.select}>
            <SelectList
              placeholder="Oficina"
              setSelected={(e) => {
                setOficina(e);
                setDatos({ ...Datos, pais: e });
              }}
              data={newArrayUno}
              save="value"
            />
          </View>
          <View style={style.select}>
                <SelectList
              style={{ marginBottom: 20 }}
              placeholder="Turno"
              data={turnos}
              setSelected={datosTurnoHandler}
            />
          </View>
          <View style={style.select}>
                  <SelectList
              style={{ marginBottom: 20 }}
              placeholder="Dias Laborales"
              data={diasLaborales}
              setSelected={datosDiasLaboralesHandler}
            />
          </View>
          <View style={style.view}>
            <TextInput
              onChangeText={datosHorariosLaboralesHandler}
              placeholder="Horarios laborales"
              style={style.textInput}
            ></TextInput>
          </View>
          <View style={style.view}>
            <TextInput
              onChangeText={datosObservacionesHandler}
              placeholder="Observaciones"
              style={style.textInput}
            ></TextInput>
          </View>

          <View>
            <Button
              title="Registrar"
              style={style.button}
              onPress={SubmitHandler}
            ></Button>
          </View>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  view: {
    flexDirection: "row",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 25,
  },
  select: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginBottom: 25,
    width: "70%",
  },
  textInput: { flex: 1, paddingVertical: 0 },
  button: { backgroundColor: "#0072b7", margin: 10, width: 130 },
});

export default Registro;
