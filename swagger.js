const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'myhome-api',
    description: 'Aplicación para Desarrollo de Aplicaciones 1 - Only in vercel mode',
  },
  host: 'localhost:3000/api/v1',
  schemes: ['http'],
};

swaggerAutogen('./swagger.json', ['pages/api/*.js'], doc);