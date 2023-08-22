const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'myhome-backend',
    description: 'Aplicación para Desarrollo de Aplicaciones 1 - Only in vercel',
  },
  host: 'https://myhome-backend-enuelx.vercel.app',
  schemes: ['https'],
};

swaggerAutogen('./swagger.json', ['routes/*.js'], doc);