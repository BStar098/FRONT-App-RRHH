import { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Box, ListItem, Text, Button } from "@react-native-material/core";
import { useSelector, useDispatch } from "react-redux";
import { traerDatosUsuario } from "../estados/usuarios";
import Loader from "../componentes/Loader";

const User = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((estado) => estado.usuarios.datos.perfil);
  const datosLaborales = useSelector(
    (estado) => estado.usuarios.datos.datosLaborales
  );
  const usuarioId = useSelector((estado) => estado.usuarios.infoDeUsuario.id)
  useEffect(() => {
    dispatch(traerDatosUsuario(usuarioId));
  }, []);
console.log(datosLaborales)
console.log(usuarioId)
  return datosLaborales && usuario.nombre ? (
    <SafeAreaView>
      <ScrollView>
        <Button
          style={{
            textAlign: "center",
            fontSize: 30,
          }}
          title="TU INFORMACION"
          color="#0072b7"
          tintColor="#f89c1c"
        />

        <Box>
          <ListItem
            title="Nombre y Apellido"
            meta={`${usuario.nombre} ${usuario.apellido}`}
          />
          <ListItem
            title="Domicilio"
            meta={`${usuario.domicilio}`}
          />
          <ListItem
            title="Documento"
            meta={`${usuario.documento}`}
          />
          <ListItem
            title="Telefono"
            meta={`${usuario.telefono}`}
          />
          <ListItem
            title="Fecha de nacimiento"
            meta={`${usuario.fechaDeNacimiento}`}
          />
          <ListItem title="Email" meta={`${usuario.eMail}`} />
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              backgroundColor: "#0072b7",
              color: "#f89c1c",
            }}
          >
            DATOS LABORALES
          </Text>
          <ListItem
            title="Fecha Ingreso"
            meta={`${datosLaborales.fechaDeIngreso}`}
          />

          <ListItem
            title="Puesto"
            meta={`${datosLaborales.puesto}`}
          />
          <ListItem
            title="Equipo"
            meta={`${datosLaborales.equipo}`}
          />
          <ListItem
            title="Turno"
            meta={`${datosLaborales.turno}`}
          />
          <ListItem
            title="Oficina"
            meta={`${datosLaborales.oficina}`}
          />
          <ListItem
            title="Dias Laborales"
            meta={`${datosLaborales.diasLaborales}`}
          />

          <ListItem
            title="Horarios Laborales"
            meta={`${datosLaborales.horarioLaboral}`}
          />

          <ListItem
            title="Observaciones"
            meta={`${datosLaborales.observaciones}`}
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  ) : (
    <Loader />
  );
};

export default User;
