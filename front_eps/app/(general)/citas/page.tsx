'use client';
<<<<<<< HEAD

import {
  asignarMedico,
  cancelarCita,
  programarCita,
  reprogramarCita,
  verCitas,
} from '@/app/redux/slice/citasslice';
=======
import { fetchCitas } from '@/app/redux/slice/citasslice';
>>>>>>> 0f9aecc1cbd71a76f008a1b11c2348b6ef670f37
import type { AppDispatch, RootState } from '@/app/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const CitasList = () => {
<<<<<<< HEAD
  const dispatch = useDispatch<AppDispatch>();
  const { citas, loading, error } = useSelector((state: RootState) => state.citas);

  // Estados locales para las acciones
  const [nuevaCita, setNuevaCita] = useState({
    paciente: '',
    fecha: '',
    hora: '',
    motivo: '',
    medico: '',
  });

  const [reprogramacion, setReprogramacion] = useState({
    id: 0,
    nuevaFecha: '',
    nuevaHora: '',
  });

  const [medicoAsignacion, setMedicoAsignacion] = useState({
    id: 0,
    medico: '',
  });

  useEffect(() => {
    dispatch(verCitas());
  }, [dispatch]);

  // Manejo de acciones
  const handleProgramarCita = async () => {
    if (!nuevaCita.paciente || !nuevaCita.fecha || !nuevaCita.hora || !nuevaCita.motivo) return;
    await dispatch(programarCita(nuevaCita));
    setNuevaCita({ paciente: '', fecha: '', hora: '', motivo: '', medico: '' });
  };

  const handleCancelarCita = async (id: number) => {
    await dispatch(cancelarCita(id));
  };

  const handleReprogramarCita = async () => {
    if (!reprogramacion.nuevaFecha || !reprogramacion.nuevaHora) return;
    await dispatch(reprogramarCita(reprogramacion));
    setReprogramacion({ id: 0, nuevaFecha: '', nuevaHora: '' });
  };

  const handleAsignarMedico = async () => {
    if (!medicoAsignacion.medico) return;
    await dispatch(asignarMedico(medicoAsignacion));
    setMedicoAsignacion({ id: 0, medico: '' });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Listado de Citas</h1>

      {/* Formulario para programar nueva cita */}
      <div className="mb-6 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Programar Nueva Cita</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre del Paciente"
            className="p-2 border rounded"
            value={nuevaCita.paciente}
            onChange={(e) => setNuevaCita({ ...nuevaCita, paciente: e.target.value })}
          />
          <input
            type="date"
            className="p-2 border rounded"
            value={nuevaCita.fecha}
            onChange={(e) => setNuevaCita({ ...nuevaCita, fecha: e.target.value })}
          />
          <input
            type="time"
            className="p-2 border rounded"
            value={nuevaCita.hora}
            onChange={(e) => setNuevaCita({ ...nuevaCita, hora: e.target.value })}
          />
          <input
            type="text"
            placeholder="Motivo de la Cita"
            className="p-2 border rounded"
            value={nuevaCita.motivo}
            onChange={(e) => setNuevaCita({ ...nuevaCita, motivo: e.target.value })}
          />
        </div>
        <button
          onClick={handleProgramarCita}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Programar Cita
        </button>
      </div>

      {/* Listado de citas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {citas.map((cita) => (
          <div
            key={cita.id}
            className="bg-white rounded-lg shadow-md p-5 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-lg font-semibold mb-2 text-blue-600">
              Paciente: {cita.paciente}
            </h2>
            <p className="text-gray-700">
              <strong>Fecha:</strong> {new Date(cita.fecha).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              <strong>Hora:</strong> {cita.hora}
            </p>
            <p className="text-gray-700">
              <strong>Motivo:</strong> {cita.motivo}
            </p>
            <p className="text-gray-700">
              <strong>Estado:</strong>{' '}
              <span
                className={`px-2 py-1 rounded ${
                  cita.estado === 'Pendiente'
                    ? 'bg-yellow-200 text-yellow-800'
                    : cita.estado === 'Completada'
                    ? 'bg-green-200 text-green-800'
                    : 'bg-red-200 text-red-800'
                }`}
              >
                {cita.estado}
              </span>
            </p>
            <p className="text-gray-700">
              <strong>Médico:</strong> {cita.medico || 'No asignado'}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => handleCancelarCita(cita.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancelar
              </button>
              <button
                onClick={() => setReprogramacion({ id: cita.id, nuevaFecha: '', nuevaHora: '' })}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Reprogramar
              </button>
              <button
                onClick={() => setMedicoAsignacion({ id: cita.id, medico: '' })}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Asignar Médico
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Formularios emergentes para reprogramar o asignar médico */}
      {reprogramacion.id !== 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl mb-4">Reprogramar Cita</h3>
            <input
              type="date"
              className="p-2 border rounded w-full mb-2"
              value={reprogramacion.nuevaFecha}
              onChange={(e) => setReprogramacion({ ...reprogramacion, nuevaFecha: e.target.value })}
            />
            <input
              type="time"
              className="p-2 border rounded w-full"
              value={reprogramacion.nuevaHora}
              onChange={(e) => setReprogramacion({ ...reprogramacion, nuevaHora: e.target.value })}
            />
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleReprogramarCita}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Guardar
              </button>
              <button
                onClick={() => setReprogramacion({ id: 0, nuevaFecha: '', nuevaHora: '' })}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {medicoAsignacion.id !== 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl mb-4">Asignar Médico</h3>
            <input
              type="text"
              placeholder="Nombre del Médico"
              className="p-2 border rounded w-full"
              value={medicoAsignacion.medico}
              onChange={(e) => setMedicoAsignacion({ ...medicoAsignacion, medico: e.target.value })}
            />
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleAsignarMedico}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Guardar
              </button>
              <button
                onClick={() => setMedicoAsignacion({ id: 0, medico: '' })}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
=======
const dispatch = useDispatch<AppDispatch>();
const { citas, loading, error } = useSelector((state: RootState) => state.citas);
useEffect(() => {
    dispatch(fetchCitas());
}, [dispatch]);
if (loading) return <p>Cargando...</p>;
if (error) return <p>Error: {error}</p>;
return (
    <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Listado de Citas</h1>
    <ul className="space-y-2">
        {citas.map((cita) => (
        <li key={cita.id} className="border p-4 rounded shadow">
            <p>Paciente: {cita.paciente}</p>
            <p>Fecha: {new Date(cita.fecha).toLocaleDateString()}</p>
            <p>Hora: {cita.hora}</p>
            <p>Motivo: {cita.motivo}</p>
            <p>Estado: {cita.estado}</p>
            <p>Médico: {cita.medico || 'No asignado'}</p>
        </li>
        ))}
    </ul>
>>>>>>> 0f9aecc1cbd71a76f008a1b11c2348b6ef670f37
    </div>
);
};
<<<<<<< HEAD

export default CitasList;
=======
export default CitasList;
>>>>>>> 0f9aecc1cbd71a76f008a1b11c2348b6ef670f37
