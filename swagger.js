const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'myhome-api',
    description: 'Aplicación para Desarrollo de Aplicaciones 1 - Only in localhost mode',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

swaggerAutogen('./swagger.json', ['routes/*.js'], doc);