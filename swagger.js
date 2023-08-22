const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'myhome-backend',
    description: 'Aplicación para Desarrollo de Aplicaciones 1 - Only in vercel',
  },
  host: 'myhome-backend.vercel.app',
  basePath: '/api/v1/',
  schemes: ['https', 'http'],
};

swaggerAutogen('./swagger.json', ['routes/*/*.js'], doc);