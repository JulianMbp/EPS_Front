'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchPacientes, 
  crearPaciente, 
  editarPaciente, 
  eliminarPaciente,
  Paciente
} from '../../redux/slice/pacienteslice';
import { AppDispatch, RootState } from '../../redux/store';

const Pacientes: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pacientes, loading, error } = useSelector((state: RootState) => state.pacientes);
  const [showModal, setShowModal] = useState(false);
  const [pacienteEdit, setPacienteEdit] = useState<Paciente | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fecha_nac: '',
    telefono: '',
    direccion: '',
    email: ''
  });

  useEffect(() => {
    dispatch(fetchPacientes());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pacienteEdit) {
      dispatch(editarPaciente({ ...formData, id: pacienteEdit.id }));
    } else {
      dispatch(crearPaciente(formData));
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      apellido: '',
      fecha_nac: '',
      telefono: '',
      direccion: '',
      email: ''
    });
    setPacienteEdit(null);
    setShowModal(false);
  };

  const openEditModal = (paciente: Paciente) => {
    setPacienteEdit(paciente);
    setFormData({
      ...paciente,
      fecha_nac: new Date(paciente.fecha_nac).toISOString().split('T')[0]
    });
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-slate-200 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Pacientes</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Paciente
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Tabla de Pacientes */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Apellido</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha Nacimiento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dirección</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pacientes.map((paciente) => (
              <tr key={paciente.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{paciente.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap">{paciente.apellido}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(paciente.fecha_nac).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{paciente.telefono}</td>
                <td className="px-6 py-4">{paciente.direccion}</td>
                <td className="px-6 py-4 whitespace-nowrap">{paciente.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => openEditModal(paciente)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('¿Estás seguro de eliminar este paciente?')) {
                        dispatch(eliminarPaciente(paciente.id));
                      }
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para Crear/Editar */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              {pacienteEdit ? 'Editar Paciente' : 'Agregar Paciente'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Apellido
                </label>
                <input
                  type="text"
                  value={formData.apellido}
                  onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  value={formData.fecha_nac}
                  onChange={(e) => setFormData({...formData, fecha_nac: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Dirección
                </label>
                <input
                  type="text"
                  value={formData.direccion}
                  onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {pacienteEdit ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pacientes;