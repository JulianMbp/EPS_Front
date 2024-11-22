export interface Opcion {
    id: number;
    texto: string;
  }
  
  export interface Pregunta {
    id: number;
    texto: string;
    opciones: Opcion[];
  }
  
  export interface Encuesta {
    id: number;
    titulo: string;
    descripcion: string;
    preguntas: Pregunta[];
  }
  