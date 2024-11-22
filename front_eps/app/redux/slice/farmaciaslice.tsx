import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface Medicamento {
  id: number;
  nombre_medicamento: string;
  descripcion: string;
  cantidad_disponible: number;
  laboratorio: string;
  fecha_vencimiento: string;
  precio: number;
  proveedor: string;
}

interface FarmaciaState {
  medicamentos: Medicamento[];
  loading: boolean;
  error: string | null;
}

const initialState: FarmaciaState = {
  medicamentos: [],
  loading: false,
  error: null,
};

const API_BASE_URL = 'http://localhost:3400/api/farmacia';

// Thunks
export const fetchMedicamentos = createAsyncThunk(
  'farmacia/fetchMedicamentos',
  async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data.medicamento;
  }
);

export const agregarMedicamento = createAsyncThunk(
  'farmacia/agregarMedicamento',
  async (medicamentoData: Omit<Medicamento, 'id'>) => {
    const response = await axios.post(`${API_BASE_URL}/add`, medicamentoData);
    return response.data.result;
  }
);

export const editarMedicamento = createAsyncThunk(
  'farmacia/editarMedicamento',
  async ({ id, ...medicamentoData }: Medicamento) => {
    const response = await axios.put(`${API_BASE_URL}/edit/${id}`, medicamentoData);
    return response.data.result;
  }
);

export const eliminarMedicamento = createAsyncThunk(
  'farmacia/eliminarMedicamento',
  async (id: number) => {
    const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
    return response.data.result;
  }
);

const farmaciaSlice = createSlice({
  name: 'farmacia',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Medicamentos
      .addCase(fetchMedicamentos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicamentos.fulfilled, (state, action) => {
        state.loading = false;
        state.medicamentos = action.payload;
      })
      .addCase(fetchMedicamentos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar los medicamentos';
      })
      // Agregar Medicamento
      .addCase(agregarMedicamento.fulfilled, (state, action) => {
        state.medicamentos.push(action.payload);
      })
      // Editar Medicamento
      .addCase(editarMedicamento.fulfilled, (state, action) => {
        state.medicamentos = state.medicamentos.map((medicamento) =>
          medicamento.id === action.payload.id ? action.payload : medicamento
        );
      })
      // Eliminar Medicamento
      .addCase(eliminarMedicamento.fulfilled, (state, action) => {
        state.medicamentos = state.medicamentos.filter(
          (medicamento) => medicamento.id !== action.payload.id
        );
      });
  },
});

export default farmaciaSlice.reducer;