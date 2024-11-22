'use client';

import {
  obtenerEncuestasPendientes,
  registrarRespuesta,
} from '@/app/redux/slice/encuestaslice';
import { AppDispatch, RootState } from '@/app/redux/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Encuesta, Pregunta } from '../encuesta/types';

const EncuestasPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { encuestas, loading, error } = useSelector((state: RootState) => state.encuestas);

  const [respuestas, setRespuestas] = useState<Record<number, string>>({});

  // Cargar encuestas pendientes al montar el componente
  useEffect(() => {
    dispatch(obtenerEncuestasPendientes());
  }, [dispatch]);

  const handleRegistrarRespuesta = async (encuestaId: number) => {
    const respuestasArray = Object.entries(respuestas).map(([preguntaId, respuesta]) => ({
      encuestaId,
      preguntaId: Number(preguntaId),
      respuesta,
    }));

    for (const respuestaData of respuestasArray) {
      await dispatch(registrarRespuesta(respuestaData));
    }

    alert('Respuestas registradas con éxito');
    setRespuestas({});
    dispatch(obtenerEncuestasPendientes());
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Gestión de Encuestas</h1>

      {loading && <p>Cargando encuestas...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {encuestas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {encuestas.map((encuesta: Encuesta) => (
            <div
              key={encuesta.id}
              className="bg-white rounded-lg shadow-md p-5 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold mb-2 text-blue-600">{encuesta.titulo}</h2>
              <p className="text-gray-700 mb-4">{encuesta.descripcion}</p>

              <div className="space-y-4">
                {encuesta.preguntas.map((pregunta: Pregunta) => (
                  <div key={pregunta.id}>
                    <p className="font-medium">{pregunta.texto}</p>
                    {Array.isArray(pregunta.opciones) && pregunta.opciones.length > 0 ? (
                      <div className="flex flex-col space-y-2">
                        {pregunta.opciones.map((opcion) => (
                          <label key={opcion.id} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`pregunta-${pregunta.id}`}
                              value={opcion.texto}
                              onChange={() =>
                                setRespuestas((prev) => ({
                                  ...prev,
                                  [pregunta.id]: opcion.texto,
                                }))
                              }
                              className="form-radio"
                            />
                            {opcion.texto}
                          </label>
                        ))}
                      </div>
                    ) : (
                      <input
                        type="text"
                        className="border rounded-md p-2 w-full"
                        placeholder="Escribe tu respuesta"
                        onChange={(e) =>
                          setRespuestas((prev) => ({ ...prev, [pregunta.id]: e.target.value }))
                        }
                      />
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleRegistrarRespuesta(encuesta.id)}
                className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Enviar Respuestas
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay encuestas pendientes.</p>
      )}
    </div>
  );
};

export default EncuestasPage;
