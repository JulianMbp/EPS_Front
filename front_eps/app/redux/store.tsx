'use client'

import { configureStore } from '@reduxjs/toolkit';

import citasReducer from './slice/citasslice';
import encuestasReducer from './slice/encuestaslice';
import facturaReducer from './slice/facturaslice';
import farmaciaReducer from './slice/farmaciaslice';
import pacienteReducer from './slice/pacienteslice';
import personalMedicoReducer from './slice/personalslice';


const store = configureStore({
  reducer: {
    citas: citasReducer,
    encuestas: encuestasReducer,
    facturas: facturaReducer,
    farmacia: farmaciaReducer,
    pacientes: pacienteReducer,
    personalMedico: personalMedicoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
