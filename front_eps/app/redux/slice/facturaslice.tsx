import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface Factura {
  id: number;
  paciente: string;
  medico: string;
  fecha_factura: string;
  Total_factura: number;
  forma_pago: string;
  descuento?: number;
  Eps_cubre: boolean;
}

interface FacturaState {
  facturas: Factura[];
  loading: boolean;
  error: string | null;
}

const initialState: FacturaState = {
  facturas: [],
  loading: false,
  error: null,
};

const API_BASE_URL = 'http://localhost:3300/api/factura';

// Thunks
export const fetchFacturas = createAsyncThunk('facturas/fetchFacturas', async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data.factura;
});

export const crearFactura = createAsyncThunk(
  'facturas/crearFactura',
  async (facturaData: Omit<Factura, 'id'>) => {
    const response = await axios.post(`${API_BASE_URL}/add`, facturaData);
    return response.data.result;
  }
);

export const editarFactura = createAsyncThunk(
  'facturas/editarFactura',
  async ({ id, ...facturaData }: Factura) => {
    const response = await axios.put(`${API_BASE_URL}/edit/${id}`, facturaData);
    return response.data.result;
  }
);

export const eliminarFactura = createAsyncThunk(
  'facturas/eliminarFactura', 
  async (id: number) => {
    const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
    return response.data.result;
  }
);

// Slice
const facturaSlice = createSlice({
  name: 'facturas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Facturas
      .addCase(fetchFacturas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFacturas.fulfilled, (state, action) => {
        state.loading = false;
        state.facturas = action.payload;
      })
      .addCase(fetchFacturas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar las facturas';
      })
      // Crear Factura
      .addCase(crearFactura.fulfilled, (state, action) => {
        state.facturas.push(action.payload);
      })
      // Editar Factura
      .addCase(editarFactura.fulfilled, (state, action) => {
        state.facturas = state.facturas.map((factura) =>
          factura.id === action.payload.id ? action.payload : factura
        );
      })
      // Eliminar Factura
      .addCase(eliminarFactura.fulfilled, (state, action) => {
        state.facturas = state.facturas.filter(
          (factura) => factura.id !== action.payload.id
        );
      });
  },
});

export default facturaSlice.reducer;
