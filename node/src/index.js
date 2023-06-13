const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");
const bodyParser = require('body-parser');
const config = require("./config/config");
const UserRouter = require('./routes/user.route');
const UrlRouter = require('./routes/url.route');
const cors = require('cors');
// Create the express app
const app = express();
const port = config.PORT;

// Swagger options
const options = {
  swaggerDefinition: {
    info: {
      title: "User API",
      version: "1.0.0",
      description: "API para administrar usuarios y enlaces recortados",
    },
    host: "api.fmesasc.com",
    basePath: "/v1",
    schemes: ["https"],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsdoc(options);

app.use(cors());
// Create the server
const server = require('http').createServer(app);
//socket(server);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Access-Control-Allow-Origin'],
    credentials: false
    },
    });

    io.on('connection', (socket) => {
      console.log('Nuevo usuario conectado');
  
      socket.on('chat message', (message) => {
        console.log('Mensaje recibido:', message);
        io.emit('chat message', message);
      });
  
      socket.on('disconnect', () => {
        console.log('Usuario desconectado');
      });
    });


// Use body parser middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Use the user router
app.use('/api/users', UserRouter);

// Use the URL router
app.use('/api/urls', UrlRouter);

// Use swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// Start the server
app.listen(port, () => {
  console.log(`API server is listening on port ${port}`);
});
server.listen(4000, () => {
  console.log('El chat en sockets está escuchando en el puerto 4000');
});

 