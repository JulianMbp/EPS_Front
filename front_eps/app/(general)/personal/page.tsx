'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchPersonalMedico, 
  crearPersonal, 
  editarPersonal, 
  eliminarPersonal,
  PersonalMedico 
} from '../store/slices/personalMedicoSlice';
import { AppDispatch, RootState } from '../store/store';

const PersonalMedicoComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { personal, loading, error } = useSelector((state: RootState) => state.personalMedico);
  const [showModal, setShowModal] = useState(false);
  const [personalEdit, setPersonalEdit] = useState<PersonalMedico | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    especialidad: '',
    telefono: '',
    direccion: '',
    email: ''
  });

  useEffect(() => {
    dispatch(fetchPersonalMedico());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (personalEdit) {
      dispatch(editarPersonal({ ...formData, id: personalEdit.id }));
    } else {
      dispatch(crearPersonal(formData));
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      apellido: '',
      especialidad: '',
      telefono: '',
      direccion: '',
      email: ''
    });
    setPersonalEdit(null);
    setShowModal(false);
  };

  const openEditModal = (personal: PersonalMedico) => {
    setPersonalEdit(personal);
    setFormData({
      nombre: personal.nombre,
      apellido: personal.apellido,
      especialidad: personal.especialidad,
      telefono: personal.telefono || '',
      direccion: personal.direccion || '',
      email: personal.email || ''
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
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Personal Médico</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Personal Médico
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Tabla de Personal Médico */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Apellido</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Especialidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha Ingreso</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {personal.map((medico) => (
              <tr key={medico.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{medico.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap">{medico.apellido}</td>
                <td className="px-6 py-4 whitespace-nowrap">{medico.especialidad}</td>
                <td className="px-6 py-4 whitespace-nowrap">{medico.telefono}</td>
                <td className="px-6 py-4 whitespace-nowrap">{medico.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(medico.fechaIngreso).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => openEditModal(medico)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('¿Estás seguro de eliminar este personal médico?')) {
                        dispatch(eliminarPersonal(medico.id));
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
              {personalEdit ? 'Editar Personal Médico' : 'Agregar Personal Médico'}
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
                  Especialidad
                </label>
                <input
                  type="text"
                  value={formData.especialidad}
                  onChange={(e) => setFormData({...formData, especialidad: e.target.value})}
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
                  {personalEdit ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalMedicoComponent;