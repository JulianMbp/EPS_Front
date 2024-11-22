import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Encuesta } from '../../(general)/encuesta/types';



interface EncuestasState {
  encuestas: Encuesta[];
  loading: boolean;
  error: string | null;
}
const initialState: EncuestasState = {
  encuestas: [],
  loading: false,
  error: null,
};
// Base URL de tu API
const API_BASE_URL = 'http://localhost:3200/api/encuesta';

// Thunks
export const enviarEncuesta = createAsyncThunk(
  'encuestas/enviarEncuesta',
  async (encuestaData: Omit<Encuesta, 'id'>) => {
    const response = await axios.post(`${API_BASE_URL}/enviar`, encuestaData);
    return response.data.data;
  }
);

export const registrarRespuesta = createAsyncThunk(
  'encuestas/registrarRespuesta',
  async (respuestaData: { encuestaId: number; preguntaId: number; respuesta: string }) => {
    const response = await axios.post(`${API_BASE_URL}/respuesta`, respuestaData);
    return response.data.data;
  }
);

export const obtenerEstadisticas = createAsyncThunk(
  'encuestas/obtenerEstadisticas',
  async (encuestaId: number) => {
    const response = await axios.get(`${API_BASE_URL}/estadisticas/${encuestaId}`);
    return response.data.data;
  }
);

export const obtenerEncuestasPendientes = createAsyncThunk(
  'encuestas/obtenerEncuestasPendientes',
  async () => {
    const response = await axios.get(`${API_BASE_URL}/pendientes`);
    return response.data.data;
  }
);

export const eliminarEncuesta = createAsyncThunk(
  'encuestas/eliminarEncuesta',
  async (id: number) => {
    const response = await axios.delete(`${API_BASE_URL}/eliminar/${id}`);
    return id; // Retornamos el id para eliminarlo del estado
  }
);

// Slice
const encuestasSlice = createSlice({
  name: 'encuestas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Enviar Encuesta
      .addCase(enviarEncuesta.fulfilled, (state, action) => {
        state.encuestas.push(action.payload);
      })
      // Registrar Respuesta
      .addCase(registrarRespuesta.fulfilled, (state, action) => {
        // Manejar la lógica para agregar la respuesta
      })
      // Obtener Estadísticas
      .addCase(obtenerEstadisticas.fulfilled, (state, action) => {
        // Manejar las estadísticas
      })
      // Obtener Encuestas Pendientes
      .addCase(obtenerEncuestasPendientes.fulfilled, (state, action) => {
        state.encuestas = action.payload;
      })
      // Eliminar Encuesta
      .addCase(eliminarEncuesta.fulfilled, (state, action) => {
        state.encuestas = state.encuestas.filter(encuesta => encuesta.id !== action.payload);
      });
  },
});

export default encuestasSlice.reducer;