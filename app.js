const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/frase') {
    fs.readFile(path.join(__dirname, 'frases.json'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error del server' }));
        return;
      }
      const frases = JSON.parse(data);
      const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ frase: fraseAleatoria }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Funciona chevere en el puerto: ${PORT}`);
});
