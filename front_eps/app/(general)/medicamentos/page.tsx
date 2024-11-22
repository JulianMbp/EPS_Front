'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchMedicamentos, 
  agregarMedicamento, 
  editarMedicamento, 
  eliminarMedicamento,
} from '@/app/redux/slice/farmaciaslice';
import type { Medicamento } from '@/app/redux/slice/farmaciaslice';
import { AppDispatch, RootState } from '@/app/redux/store';

const Farmacia: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { medicamentos, loading, error } = useSelector((state: RootState) => state.farmacia);
  const [showModal, setShowModal] = useState(false);
  const [medicamentoEdit, setMedicamentoEdit] = useState<Medicamento | null>(null);
  const [formData, setFormData] = useState({
    nombre_medicamento: '',
    descripcion: '',
    cantidad_disponible: 0,
    laboratorio: '',
    fecha_vencimiento: '',
    precio: 0,
    proveedor: ''
  });

  useEffect(() => {
    dispatch(fetchMedicamentos());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (medicamentoEdit) {
      dispatch(editarMedicamento({ ...formData, id: medicamentoEdit.id }));
    } else {
      dispatch(agregarMedicamento(formData));
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nombre_medicamento: '',
      descripcion: '',
      cantidad_disponible: 0,
      laboratorio: '',
      fecha_vencimiento: '',
      precio: 0,
      proveedor: ''
    });
    setMedicamentoEdit(null);
    setShowModal(false);
  };

  const openEditModal = (medicamento: Medicamento) => {
    setMedicamentoEdit(medicamento);
    setFormData(medicamento);
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
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Medicamentos</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Medicamento
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Tabla de Medicamentos */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Laboratorio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vencimiento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Proveedor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {medicamentos.map((medicamento) => (
              <tr key={medicamento.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{medicamento.nombre_medicamento}</td>
                <td className="px-6 py-4">{medicamento.descripcion}</td>
                <td className="px-6 py-4 whitespace-nowrap">{medicamento.cantidad_disponible}</td>
                <td className="px-6 py-4 whitespace-nowrap">{medicamento.laboratorio}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(medicamento.fecha_vencimiento).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">${medicamento.precio.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{medicamento.proveedor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => openEditModal(medicamento)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('¿Estás seguro de eliminar este medicamento?')) {
                        dispatch(eliminarMedicamento(medicamento.id));
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
              {medicamentoEdit ? 'Editar Medicamento' : 'Agregar Medicamento'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.nombre_medicamento}
                  onChange={(e) => setFormData({...formData, nombre_medicamento: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Descripción
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Cantidad
                </label>
                <input
                  type="number"
                  value={formData.cantidad_disponible}
                  onChange={(e) => setFormData({...formData, cantidad_disponible: Number(e.target.value)})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Laboratorio
                </label>
                <input
                  type="text"
                  value={formData.laboratorio}
                  onChange={(e) => setFormData({...formData, laboratorio: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Fecha de Vencimiento
                </label>
                <input
                  type="date"
                  value={formData.fecha_vencimiento.split('T')[0]}
                  onChange={(e) => setFormData({...formData, fecha_vencimiento: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Precio
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.precio}
                  onChange={(e) => setFormData({...formData, precio: Number(e.target.value)})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Proveedor
                </label>
                <input
                  type="text"
                  value={formData.proveedor}
                  onChange={(e) => setFormData({...formData, proveedor: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  required
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
                  {medicamentoEdit ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Farmacia;