import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface PersonalMedico {
  id: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  telefono?: string;
  direccion?: string;
  email?: string;
  fechaIngreso: string;
}

interface PersonalMedicoState {
  personal: PersonalMedico[];
  personalSeleccionado: PersonalMedico | null;
  loading: boolean;
  error: string | null;
}

const initialState: PersonalMedicoState = {
  personal: [],
  personalSeleccionado: null,
  loading: false,
  error: null,
};

const API_BASE_URL = 'http://localhost:3600/api/personal';

// Thunks
export const fetchPersonalMedico = createAsyncThunk(
  'personalMedico/fetchPersonal',
  async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data.personalMedico;
  }
);

export const fetchPersonalById = createAsyncThunk(
  'personalMedico/fetchPersonalById',
  async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data.personal;
  }
);

export const crearPersonal = createAsyncThunk(
  'personalMedico/crearPersonal',
  async (personalData: Omit<PersonalMedico, 'id' | 'fechaIngreso'>) => {
    const response = await axios.post(API_BASE_URL, personalData);
    return response.data.personal;
  }
);

export const editarPersonal = createAsyncThunk(
  'personalMedico/editarPersonal',
  async ({ id, ...personalData }: Partial<PersonalMedico> & { id: number }) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, personalData);
    return response.data.personal;
  }
);

export const eliminarPersonal = createAsyncThunk(
  'personalMedico/eliminarPersonal',
  async (id: number) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data.personal;
  }
);

const personalMedicoSlice = createSlice({
  name: 'personalMedico',
  initialState,
  reducers: {
    limpiarPersonalSeleccionado: (state) => {
      state.personalSeleccionado = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Personal Médico
      .addCase(fetchPersonalMedico.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonalMedico.fulfilled, (state, action) => {
        state.loading = false;
        state.personal = action.payload;
      })
      .addCase(fetchPersonalMedico.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar el personal médico';
      })
      // Fetch Personal by ID
      .addCase(fetchPersonalById.fulfilled, (state, action) => {
        state.personalSeleccionado = action.payload;
      })
      // Crear Personal
      .addCase(crearPersonal.fulfilled, (state, action) => {
        state.personal.push(action.payload);
      })
      // Editar Personal
      .addCase(editarPersonal.fulfilled, (state, action) => {
        state.personal = state.personal.map((personal) =>
          personal.id === action.payload.id ? action.payload : personal
        );
        if (state.personalSeleccionado?.id === action.payload.id) {
          state.personalSeleccionado = action.payload;
        }
      })
      // Eliminar Personal
      .addCase(eliminarPersonal.fulfilled, (state, action) => {
        state.personal = state.personal.filter(
          (personal) => personal.id !== action.payload.id
        );
        if (state.personalSeleccionado?.id === action.payload.id) {
          state.personalSeleccionado = null;
        }
      });
  },
});

export const { limpiarPersonalSeleccionado } = personalMedicoSlice.actions;
export default personalMedicoSlice.reducer;