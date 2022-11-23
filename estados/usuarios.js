import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { traerInfoDeUsuario } from "../servicios/usuario";

const usuarioLogueado = traerInfoDeUsuario(); //ESTO ES UNA PROMESA NO RESUELTA, SE RESUELVE EN EL FRONT SI SE NECESITA.
const estadoInicial = usuarioLogueado
  ? {
      cargando: false,
      infoDeUsuario: usuarioLogueado,
    }
  : {
      cargando: true,
      infoDeUsuario: {},
    };

export const urlBaseUsuario = axios.create({
  baseURL: `http://10.10.10.103:8080/api/usuarios`,
});

export const iniciarSesion = createAsyncThunk(
  "INICIO_SESION",
  async (infoUsuario) => {
    try {
      const usuarioEncontrado = await urlBaseUsuario.post(
        "/iniciosesion",
        infoUsuario
      );
      return usuarioEncontrado.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const usuarioReducer = createReducer(estadoInicial, {
  [iniciarSesion.pending]: (estado) => {
    estado.cargando = true;
  },
  [iniciarSesion.fulfilled]: async (estado, accion) => {
    estado.cargando = false;
    await AsyncStorage.setItem("usuario", JSON.stringify(accion.payload));
    estado.infoDeUsuario = await traerInfoDeUsuario();
  },
  [iniciarSesion.rejected]: (estado) => {
    estado.cargando = true;
    throw new Error("Credenciales incorrectas");
  },
});

export default usuarioReducer;
