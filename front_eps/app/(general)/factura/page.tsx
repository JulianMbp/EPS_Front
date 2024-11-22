'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchFacturas, 
  crearFactura, 
  editarFactura, 
  eliminarFactura,
} from '@/app/redux/slice/facturaslice';
import type { Factura } from '@/app/redux/slice/facturaslice';
import type { AppDispatch, RootState } from '@/app/redux/store';

const FacturasComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { facturas, loading, error } = useSelector((state: RootState) => state.facturas);
  const [showModal, setShowModal] = useState(false);
  const [facturaEdit, setFacturaEdit] = useState<Factura | null>(null);
  const [formData, setFormData] = useState({
    paciente: '',
    medico: '',
    fecha_factura: '',
    Total_factura: 0,
    forma_pago: '',
    descuento: 0,
    Eps_cubre: false
  });

  useEffect(() => {
    dispatch(fetchFacturas());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (facturaEdit) {
      dispatch(editarFactura({ ...formData, id: facturaEdit.id }));
    } else {
      dispatch(crearFactura(formData));
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      paciente: '',
      medico: '',
      fecha_factura: '',
      Total_factura: 0,
      forma_pago: '',
      descuento: 0,
      Eps_cubre: false
    });
    setFacturaEdit(null);
    setShowModal(false);
  };

  const openEditModal = (factura: Factura) => {
    setFacturaEdit(factura);
    setFormData({
      paciente: factura.paciente,
      medico: factura.medico,
      fecha_factura: factura.fecha_factura.split('T')[0],
      Total_factura: factura.Total_factura,
      forma_pago: factura.forma_pago,
      descuento: factura.descuento || 0,
      Eps_cubre: factura.Eps_cubre
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
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Facturas</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Nueva Factura
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Tabla de Facturas */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paciente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Médico</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Forma de Pago</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descuento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">EPS Cubre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {facturas.map((factura) => (
              <tr key={factura.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{factura.paciente}</td>
                <td className="px-6 py-4 whitespace-nowrap">{factura.medico}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(factura.fecha_factura).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${factura.Total_factura ? factura.Total_factura.toFixed(2) : '0.00'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{factura.forma_pago}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {factura.descuento ? `${factura.descuento}%` : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    factura.Eps_cubre ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {factura.Eps_cubre ? 'Sí' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => openEditModal(factura)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('¿Estás seguro de eliminar esta factura?')) {
                        dispatch(eliminarFactura(factura.id));
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
              {facturaEdit ? 'Editar Factura' : 'Nueva Factura'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Paciente
                </label>
                <input
                  type="text"
                  value={formData.paciente}
                  onChange={(e) => setFormData({...formData, paciente: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Médico
                </label>
                <input
                  type="text"
                  value={formData.medico}
                  onChange={(e) => setFormData({...formData, medico: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Fecha
                </label>
                <input
                  type="date"
                  value={formData.fecha_factura}
                  onChange={(e) => setFormData({...formData, fecha_factura: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Total
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.Total_factura}
                  onChange={(e) => setFormData({...formData, Total_factura: Number(e.target.value)})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Forma de Pago
                </label>
                <select
                  value={formData.forma_pago}
                  onChange={(e) => setFormData({...formData, forma_pago: e.target.value})}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700"
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Tarjeta">Tarjeta</option>
                  <option value="Transferencia">Transferencia</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Descuento (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.descuento}
                  onChange={(e) => setFormData({...formData, descuento: Number(e.target.value)})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.Eps_cubre}
                    onChange={(e) => setFormData({...formData, Eps_cubre: e.target.checked})}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">EPS Cubre</span>
                </label>
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
                  {facturaEdit ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacturasComponent;
