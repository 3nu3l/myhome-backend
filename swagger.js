const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'myhome-backend',
    description: 'Aplicación para Desarrollo de Aplicaciones 1 - Only in vercel',
  },
  host: 'localhost:3000/api/v1',
  schemes: ['http', 'https'],
};

swaggerAutogen('./swagger.json', ['routes/*.js'], doc);