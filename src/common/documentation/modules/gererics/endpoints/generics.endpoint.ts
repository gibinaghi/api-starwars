export default {
  // Generic
  version: {
    operation: {
      summary: 'Version',
      description: 'Version API',
    },
    response: {
      '200': 'Ok',
    },
  },

  // Auth
  signin: {
    operation: {
      summary: 'Signin',
      description: 'Endpoint para realizar el login',
    },
    response: {
      '200': 'Ok',
      '403': JSON.stringify([
        'Ya está activa una sesión del usuario',
        'Por favor, compruebe sus credenciales de inicio de sesión',
      ]),
      '404': 'Usuario no encontrado',
      '409': 'Error interno Auth',
    },
  },

  signout: {
    operation: {
      summary: 'Signout',
      description: 'Endpoint para cerrar la sesión',
    },
    response: {
      '200': 'Ok',
      '404': 'Usuario no encontrado',
      '409': 'Error interno Auth',
    },
  },

  // User
  createUser: {
    operation: {
      summary: 'Create User',
      description: 'Endpoint para registrar un nuevo usuario',
    },
    response: {
      '201': 'Usuario creado correctamente',
      '403': 'El email de usuario ya existe',
      '404': 'No se encontro el rol',
      '409': 'Error interno User',
    },
  },

  // Movie
  sync: {
    operation: {
      summary: 'Sync',
      description: 'Endpoint para sincronizar con la API de StarWars',
    },
    response: {
      '201': 'Peliculas creadas correctamente',
      '409': 'Error interno Movie',
    },
  },

  getAllMovies: {
    operation: {
      summary: 'Get All Movies',
      description: 'Endpoint para obtener todas las peliculas',
    },
    response: {
      '200': 'Ok',
      '409': 'Error interno Movie',
    },
  },

  getMovieById: {
    operation: {
      summary: 'Get Movie By Id',
      description: 'Endpoint para obtener una pelicula por id',
    },
    response: {
      '200': 'Ok',
      '404': 'Pelicula no encontrada',
      '409': 'Error interno Movie',
    },
  },

  createMovie: {
    operation: {
      summary: 'Create Movie',
      description: 'Endpoint para registrar una nueva pelicula',
    },
    response: {
      '201': 'Pelicula creada correctamente',
      '404': 'Pelicula ya existente',
      '409': 'Error interno Movie',
    },
  },

  updateMovie: {
    operation: {
      summary: 'Update Movie',
      description: 'Endpoint para actualizar una pelicula',
    },
    response: {
      '200': 'Pelicula actualizada correctamente',
      '403': 'Pelicula ya existente',
      '404': JSON.stringify([
        'Pelicula no encontrada',
        'Se debe indicar algún campo a actualizar',
      ]),
      '409': 'Error interno Movie',
    },
  },

  deleteMovie: {
    operation: {
      summary: 'Delete Movie',
      description: 'Endpoint para eliminar una pelicula',
    },
    response: {
      '200': 'Pelicula eliminada correctamente',
      '404': 'Pelicula no encontrada',
      '409': 'Error interno Movie',
    },
  },
};
