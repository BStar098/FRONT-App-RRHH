import { config } from "../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";
import { urlBaseAsistencia } from "./asistencias";

const estadoInicial = {
  cargando: true,
  infoDeUsuario: {},
  datosLaborales: {},
  ingresoDeUsuario: {},
  ultimoFichaje: {},
};

export const urlBaseUsuario = axios.create({

  baseURL: `http://${config.localhost}:8080/api/usuarios`, //192.168.0.92

});

export const urlBaseDatosLaborales = axios.create({
  baseURL: `http://${config.localhost}:8080/api/datosLaborales`, //192.168.0.92//192.168.1.36
});

export const resetearIngreso = createAction("RESETEAR_INGRESO");

export const setearUltimoFichaje = createAction("SETEAR_ULTIMO_FICHAJE");

export const ficharIngreso = createAsyncThunk(
  "FICHAR_INGRESO",
  async (fechaHoraIdUsuario) => {
    const { fecha } = fechaHoraIdUsuario;
    const { idUsuario } = fechaHoraIdUsuario;
    const limiteAsistencias = config.limiteAsistencias;
    const validacionIngreso = await urlBaseAsistencia.post(
      `/validaringreso/${idUsuario}`,
      {
        fecha: fecha,
        usuarioId: idUsuario,
        limite: limiteAsistencias,
      }
    );
    if (validacionIngreso) {
      return fechaHoraIdUsuario;
    } else throw `La cantidad máxima de fichajes diarios es de ${config.limiteAsistencias}`;
  }
);

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

export const registro = createAsyncThunk("REGISTRO", async (datosUsuario) => {
  try {
    const usuarioRegistrado = await urlBaseUsuario.post(
      "/registro",
      datosUsuario
    );
    return usuarioRegistrado.data;
  } catch (error) {
    throw new Error(error);
  }
});

export const cerrarSesion = createAsyncThunk("CERRAR_SESION", async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    throw "Ha habido un error al cerrar sesión";
  }
});

export const traerDatosUsuario = createAsyncThunk(
  "TRAER_INFO_DE_USUARIO",
  async (idUsuario) => {
    try {
      const datos = await urlBaseUsuario.get(`/uno/${idUsuario}`);
      return datos.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);
/* export const traerUsuarios = createAsyncThunk(
  "TRAER_TODOS_USUARIOS",
  async () => {
    try {
      const datos = await urlBaseUsuario.get(`/`);
      return datos.data;
    } catch (error) {
      throw new Error(error);
    }
  }
); */

export const traerUsuarioXEmail = createAsyncThunk(
  "TRAER_USUARIO_EMAIL",
  async (eMail) => {
    try {
      const datos = await urlBaseUsuario.get(`/${eMail}`);
      return datos.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const editarDatosUsuario = createAsyncThunk(
  "EDITAR_INFO_DE_USUARIO",
  async (usuario) => {
    try {
      const datosPersonales = await urlBaseUsuario.put(
        `/${usuario.id}`,
        usuario.Usuario
      );
      return datosPersonales.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);
export const editarDatosLaborales = createAsyncThunk(
  "EDITAR_DATOS_LABORALES",
  async (usuario) => {
    try {
      const datosLaborales = await urlBaseDatosLaborales.put(
        `/${usuario.id}`,
        usuario.Usuario
      );
      return datosLaborales.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const modificarDatosUsuario = createAsyncThunk(
  "MODIFICAR_INFO_DE_USUARIO",
  async (idUsuario, infoAModificar) => {
    try {
      await urlBaseUsuario.put(`/${idUsuario}`, infoAModificar);
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const modificarEstadoUsuario = createAsyncThunk(
  "MODIFICAR_ESTADO_DE_USUARIO",
  async (usuarioIdYEstadoDeUsuario) => {
    const { usuarioId } = usuarioIdYEstadoDeUsuario;
    const { activo } = usuarioIdYEstadoDeUsuario;
    try {
      await urlBaseUsuario.post(`/activo/${usuarioId}`, { activo });
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const crearDatosLaborales = createAsyncThunk(
  "CREEAR_DATOS_LABORALES",
  async (datosLaborales) => {
    try {
      await urlBaseDatosLaborales.post("/", datosLaborales);
    } catch (error) {
      throw new Error(error);
    }
  }
);

const usuarioReducer = createReducer(estadoInicial, {
  [iniciarSesion.pending]: (estado) => {
    estado.cargando = true;
  },
  [iniciarSesion.fulfilled]: (estado, accion) => {
    estado.cargando = false;
    estado.infoDeUsuario = accion.payload;
  },
  [iniciarSesion.rejected]: () => {
    throw new Error("Credenciales incorrectas");
  },
  [cerrarSesion.fulfilled]: (estado) => {
    estado.infoDeUsuario = {};
    estado.datosLaborales = {};
    Alert.alert("Cerrar Sesión", "Su sesión ha sido cerrada con éxito!");
  },
  [ficharIngreso.fulfilled]: (estado, accion) => {
    estado.ingresoDeUsuario = accion.payload;
  },
  [ficharIngreso.rejected]: (estado, accion) => {
    throw `La cantidad máxima de fichajes diarios es de ${config.limiteAsistencias} ingresos y ${config.limiteAsistencias} salidas.`;
  },
  [resetearIngreso]: (estado) => {
    estado.ingresoDeUsuario = {};
  },
  [setearUltimoFichaje]: (estado, accion) => {
    estado.ultimoFichaje = accion.payload;
  },
  [cerrarSesion.rejected]: (estado) => {
    Alert.alert(
      "Cerrar Sesión",
      "Ha habido un error al intentar cerrar sesión"
    );
  },
  [traerDatosUsuario.pending]: (estado) => {
    estado.cargando = true;
  },
  [traerDatosUsuario.fulfilled]: (estado, accion) => {
    estado.cargando = false;
    estado.datos = accion.payload;
  },
  [traerDatosUsuario.rejected]: (estado) => {
    throw new Error("Error de validación!");
  },
  
  [editarDatosUsuario.pending]: (estado) => {
    estado.cargando = true;
  },
  [editarDatosUsuario.fulfilled]: (estado, accion) => {
    estado.cargando = false;
    estado.datosPersonales = accion.payload;
  },
  [editarDatosUsuario.rejected]: (estado) => {
    throw new Error("Error de validación!");
  },
  [editarDatosLaborales.pending]: (estado) => {
    estado.cargando = true;
  },
  [editarDatosLaborales.fulfilled]: (estado, accion) => {
    estado.cargando = false;
    estado.datosLaborales = accion.payload;
  },
  [editarDatosLaborales.rejected]: (estado) => {
    throw new Error("Error de validación!");
  },
  [traerUsuarioXEmail.pending]: (estado) => {
    estado.cargando = true;
  },
  [traerUsuarioXEmail.fulfilled]: (estado, accion) => {
    estado.cargando = false;
    estado.datos = accion.payload;
  },
  [traerUsuarioXEmail.rejected]: (estado) => {
    throw new Error("Error de validación!");
  },
  [modificarDatosUsuario.pending]: (estado) => {
    estado.cargando = true;
  },
  [modificarDatosUsuario.fulfilled]: (estado, accion) => {
    estado.cargando = false;
  },
  [modificarDatosUsuario.rejected]: (estado) => {
    Alert.alert("Datos de Usuario", "No se han podido modificar los datos");
  },
  [modificarEstadoUsuario.pending]: (estado) => {
    estado.cargando = true;
  },
  [modificarEstadoUsuario.fulfilled]: (estado, accion) => {
    estado.cargando = false;
  },
  [modificarEstadoUsuario.rejected]: (estado) => {
    Alert.alert("Fichaje", "No se ha podido realizar su fichaje");
  },
  [registro.pending]: (estado) => {
    estado.cargando = true;
  },
  [registro.fulfilled]: (estado) => {
    estado.cargando = false;
  },
  [registro.rejected]: () => {
    throw new Error("Credenciales incorrectas");
  },
  [crearDatosLaborales.pending]: (estado) => {
    estado.cargando = true;
  },
  [crearDatosLaborales.fulfilled]: (estado) => {
    estado.cargando = false;
  },
  [crearDatosLaborales.rejected]: () => {
    throw new Error("Credenciales incorrectas");

  },
});

export default usuarioReducer;
