const path = require("path");
const stylus = require('stylus');
const fs = require('node:fs');

const fastify = require("fastify")({ logger: false});
fastify.register(require("@fastify/static"), { root: path.join(__dirname, "public"),prefix: "/" });
fastify.register(require("@fastify/formbody"));
fastify.register(require("@fastify/view"), { engine: { handlebars: require("handlebars")}});

fastify.get("/", function (request, reply) {
  return reply.view("/src/pages/index.hbs", {});
});

fastify.get("/admin", function (request, reply) {
  const data = fs.readFileSync('./public/store.json', 'utf8');
  return reply.view("/src/pages/admin.hbs", { store : JSON.parse( data ) } );
});

fastify.post("/", function (request, reply) {
  let bdy = request.body;
  console.log('heyhey '+ bdy);
  const data = fs.readFileSync('./public/store.json', 'utf8');
  let d = JSON.parse( data )
  d.push( bdy )
  console.log( d )
  fs.writeFileSync('./public/store.json', JSON.stringify( d ) );   
});


fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if ( err) process.exit(1);
    console.log(`Your app is listening on ${address}`);
  }
);
