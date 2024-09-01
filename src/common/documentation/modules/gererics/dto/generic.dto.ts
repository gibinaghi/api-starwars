export default {
  // Auth
  loginCredentialsDto: {
    email: {
      type: String,
      description: 'email',
      required: true,
    },
    password: {
      type: String,
      description: 'password',
      required: true,
    },
  },

  // User
  createUserDto: {
    name: {
      type: String,
      description: 'name',
      required: true,
    },
    email: {
      type: String,
      description: 'email',
      required: true,
    },
    password: {
      type: String,
      description: 'password',
      required: true,
    },
    rol_id: {
      type: Number,
      description: 'rol_id',
      required: true,
    },
  },

  // Movie
  createMovieDto: {
    title: {
      type: String,
      description: 'title',
      required: true,
    },
    episode_id: {
      type: Number,
      description: 'episode_id',
      required: false,
    },
    opening_crawl: {
      type: String,
      description: 'opening_crawl',
      required: false,
    },
    director: {
      type: String,
      description: 'director',
      required: false,
    },
    producer: {
      type: String,
      description: 'producer',
      required: false,
    },
  },

  updateMovieDto: {
    title: {
      type: String,
      description: 'title',
      required: false,
    },
    episode_id: {
      type: Number,
      description: 'episode_id',
      required: false,
    },
    opening_crawl: {
      type: String,
      description: 'opening_crawl',
      required: false,
    },
    director: {
      type: String,
      description: 'director',
      required: false,
    },
    producer: {
      type: String,
      description: 'producer',
      required: false,
    },
  },
};
