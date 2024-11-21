import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface Cita {
  id: number;
  paciente: string;
  fecha: string;
  hora: string;
  motivo: string;
  estado: string;
  medico?: string | null;
}

interface CitasState {
  citas: Cita[];
  loading: boolean;
  error: string | null;
}

const initialState: CitasState = {
  citas: [],
  loading: false,
  error: null,
};

// Base URL de tu API
const API_BASE_URL = 'http://localhost:3100/api/citas';

// Thunks
export const fetchCitas = createAsyncThunk('citas/fetchCitas', async () => {
  const response = await axios.get(`${API_BASE_URL}/ver`);
  return response.data.data;
});

export const programarCita = createAsyncThunk(
  'citas/programarCita',
  async (citaData: Omit<Cita, 'id' | 'estado'>) => {
    const response = await axios.post(`${API_BASE_URL}/programar`, citaData);
    return response.data.data;
  }
);

export const cancelarCita = createAsyncThunk('citas/cancelarCita', async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/cancelar/${id}`);
  return response.data.data;
});

export const reprogramarCita = createAsyncThunk(
  'citas/reprogramarCita',
  async ({ id, nuevaFecha, nuevaHora }: { id: number; nuevaFecha: string; nuevaHora: string }) => {
    const response = await axios.put(`${API_BASE_URL}/reprogramar/${id}`, { nuevaFecha, nuevaHora });
    return response.data.data;
  }
);

export const asignarMedico = createAsyncThunk(
  'citas/asignarMedico',
  async ({ id, medico }: { id: number; medico: string }) => {
    const response = await axios.put(`${API_BASE_URL}/asignar-medico/${id}`, { medico });
    return response.data.data;
  }
);

// Slice
const citasSlice = createSlice({
  name: 'citas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Citas
      .addCase(fetchCitas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCitas.fulfilled, (state, action) => {
        state.loading = false;
        state.citas = action.payload;
      })
      .addCase(fetchCitas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar las citas';
      })
      // Programar Cita
      .addCase(programarCita.fulfilled, (state, action) => {
        state.citas.push(action.payload);
      })
      // Cancelar Cita
      .addCase(cancelarCita.fulfilled, (state, action) => {
        state.citas = state.citas.map((cita) =>
          cita.id === action.payload.id ? action.payload : cita
        );
      })
      // Reprogramar Cita
      .addCase(reprogramarCita.fulfilled, (state, action) => {
        state.citas = state.citas.map((cita) =>
          cita.id === action.payload.id ? action.payload : cita
        );
      })
      // Asignar Médico
      .addCase(asignarMedico.fulfilled, (state, action) => {
        state.citas = state.citas.map((cita) =>
          cita.id === action.payload.id ? action.payload : cita
        );
      });
  },
});

export default citasSlice.reducer;
