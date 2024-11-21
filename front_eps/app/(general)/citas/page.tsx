import { fetchCitas } from '@/app/redux/slice/citasslice';
import type { AppDispatch, RootState } from '@/app/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CitasList = () => {
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
    </div>
  );
};

export default CitasList;
