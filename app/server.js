const hapi = require('hapi');
const HapiReactViews = require('hapi-react-views');

require('babel-core/register')({
    presets: ['react', 'es2015']
});

const server = new hapi.Server(0);
server.connection({
  host: 'localhost',
  port: 8000
});

server.register(require('vision'), (err) => {
  if (err) {
    console.log("Failed to load vision");
    throw err;
  }

  server.views({
    defaultExtension: 'jsx',
    engines: {
      jsx: HapiReactViews, // support for .jsx files
      js: HapiReactViews// support for .js
    },
    relativeTo: __dirname,
    path: 'assets/js'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply.view('pages/home');
    }
  });
});

// Add the route
server.route({
  method: 'GET',
  path:'/hello',
  handler: function (request, reply) {
    return reply('hello world');
  }
});

// Start the server
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
