const ResponseCode = {
  BAD_REQUEST: {
    code: 400,
    message: "Parametros enviados son incorrectos.",
  },
  CONNECTION_ERROR: {
    code: 600,
    message: "Error en la conexión. Intentar más tarde",
  },
  NETWORK_ERROR: {
    code: 503,
    message:
      "No se pudo comunicar con el recurso solicitado. Intentar más tarde ",
  },
  TIMEOUT_ERROR: {
    code: 504,
    message: "Tiempo de respuesta excedido.  Intentar más tarde",
  },
  SERVER_ERROR: {
    code: 500,
    message:
      "Problemas en el servidor procesando los datos. Intentar más tarde.",
  },
  NOT_FOUND_RECORDS: {
    code: 2001,
    message: "No se ha encontrado el registro buscado.",
  },
  UNAUTHORIZED: {
    code: 401,
    message: "Acceso denegado",
  },
};
export default ResponseCode;
