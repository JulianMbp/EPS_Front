import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  fecha_nac: string;
  telefono?: string;
  direccion?: string;
  email?: string;
}

interface PacienteState {
  pacientes: Paciente[];
  pacienteSeleccionado: Paciente | null;
  loading: boolean;
  error: string | null;
}

const initialState: PacienteState = {
  pacientes: [],
  pacienteSeleccionado: null,
  loading: false,
  error: null,
};

const API_BASE_URL = 'http://localhost:3500/api/paciente';

// Thunks
export const fetchPacientes = createAsyncThunk(
  'pacientes/fetchPacientes',
  async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data.pacientes;
  }
);

export const fetchPacienteById = createAsyncThunk(
  'pacientes/fetchPacienteById',
  async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data.paciente;
  }
);

export const crearPaciente = createAsyncThunk(
  'pacientes/crearPaciente',
  async (pacienteData: Omit<Paciente, 'id'>) => {
    const response = await axios.post(API_BASE_URL, pacienteData);
    return response.data.paciente;
  }
);

export const editarPaciente = createAsyncThunk(
  'pacientes/editarPaciente',
  async ({ id, ...pacienteData }: Paciente) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, pacienteData);
    return response.data.paciente;
  }
);

export const eliminarPaciente = createAsyncThunk(
  'pacientes/eliminarPaciente',
  async (id: number) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data.paciente;
  }
);

const pacienteSlice = createSlice({
  name: 'pacientes',
  initialState,
  reducers: {
    limpiarPacienteSeleccionado: (state) => {
      state.pacienteSeleccionado = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Pacientes
      .addCase(fetchPacientes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPacientes.fulfilled, (state, action) => {
        state.loading = false;
        state.pacientes = action.payload;
      })
      .addCase(fetchPacientes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar los pacientes';
      })
      // Fetch Paciente by ID
      .addCase(fetchPacienteById.fulfilled, (state, action) => {
        state.pacienteSeleccionado = action.payload;
      })
      // Crear Paciente
      .addCase(crearPaciente.fulfilled, (state, action) => {
        state.pacientes.push(action.payload);
      })
      // Editar Paciente
      .addCase(editarPaciente.fulfilled, (state, action) => {
        state.pacientes = state.pacientes.map((paciente) =>
          paciente.id === action.payload.id ? action.payload : paciente
        );
        if (state.pacienteSeleccionado?.id === action.payload.id) {
          state.pacienteSeleccionado = action.payload;
        }
      })
      // Eliminar Paciente
      .addCase(eliminarPaciente.fulfilled, (state, action) => {
        state.pacientes = state.pacientes.filter(
          (paciente) => paciente.id !== action.payload.id
        );
        if (state.pacienteSeleccionado?.id === action.payload.id) {
          state.pacienteSeleccionado = null;
        }
      });
  },
});

export const { limpiarPacienteSeleccionado } = pacienteSlice.actions;
export default pacienteSlice.reducer;