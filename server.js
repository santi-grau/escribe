const path = require("path");
const stylus = require('stylus');
const fs = require('node:fs');

const fastify = require("fastify")({ logger: false});
fastify.register(require("@fastify/static"), { root: path.join(__dirname, "public"),prefix: "/" });
fastify.register(require("@fastify/formbody"));
fastify.register(require("@fastify/view"), { engine: { handlebars: require("handlebars")}});

// Load and parse SEO data
const seo = require("./src/seo.json");
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

fastify.get("/", function (request, reply) {
  let params = { seo: seo };
  return reply.view("/src/pages/index.hbs", params);
});

fastify.get("/admin", function (request, reply) {
  // params is an object we'll pass to our handlebars template
  let params = { };
  return reply.view("/src/pages/admin.hbs", params);
});

fastify.post("/", function (request, reply) {
  let bdy = request.body;
  console.log('heyhey '+ bdy);
  const data = fs.readFileSync('./store.json', 'utf8');
  let d = JSON.parse( data )
  d.push( bdy )
  console.log( d )
  fs.writeFileSync('./store.json', JSON.stringify( d ) ); 
  
});


fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if ( err) process.exit(1);
    console.log(`Your app is listening on ${address}`);
  }
);
