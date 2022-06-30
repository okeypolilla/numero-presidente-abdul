var http=require('http');
var url=require('url');
var fs=require('fs');
var querystring = require('querystring');

const mime = {
  'html': 'text/html',
  'css': 'text/css',
  'jpg': 'image/jpg',
  'ico': 'image/x-icon',
  'mp3': 'audio/mpeg3',
  'mp4': 'video/mp4'
}
 let img = "";
const servidor = http.createServer((pedido, respuesta) => {
  const url = new URL('http://localhost:8888' + pedido.url)
  let camino = 'public' + url.pathname
  if (camino == 'public/')
    camino = 'public/index.html'
  encaminar(pedido, respuesta, camino)
})

servidor.listen(4444)


function encaminar(pedido, respuesta, camino) {
  console.log(camino)
  switch (camino) {
    case 'public/recuperardatos': {
      recuperar(pedido, respuesta)
      break
    }
    default: {
      fs.stat(camino, error => {
        if (!error) {
          fs.readFile(camino, (error, contenido) => {
            if (error) {
              respuesta.writeHead(500, { 'Content-Type': 'text/plain' })
              respuesta.write('Error interno')
              respuesta.end()
            } else {
              const vec = camino.split('.')
              const extension = vec[vec.length - 1]
              const mimearchivo = mime[extension]
              respuesta.writeHead(200, { 'Content-Type': mimearchivo })
              respuesta.write(contenido)
              respuesta.end()
            }
          })
        } else {
          respuesta.writeHead(404, { 'Content-Type': 'text/html' })
          respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>')
          respuesta.end()
        }
      })
    }
  }
}

function recuperar(pedido, respuesta) {
  let info = ''
  pedido.on('data', datosparciales => {
    info += datosparciales
  })
  pedido.on('end', () => {
    const formulario = new URLSearchParams(info)
    console.log(formulario)
    respuesta.writeHead(200, { 'Content-Type': 'text/html' })
    const pagina =
      `<!doctype html>
      <html>
      <head>
      <link rel="stylesheet" type="text/css" href="styles/css/style.css">
      </head>
      <body>
      <div class="box">
      <div>
      <img src="${primos(formulario.get('max'),formulario.get('min'))}" id="im" width="120" height="95"  >
      </div
      <div>
      <img src=${formulario.get('op')}  id="im" width="120" height="95" >
      <h1>usuario</h1>
      </div>
      <div>
        <img src=${img}  id="im" width="120" height="95" > 
        <h1>maquina</h1>
    </div>
    <div aling="center">
    <a href="index.html">JUGAR DE NUEVO</a>
    </div>
    </div>
     </div>
     
     </body></html>`
    respuesta.end(pagina)
  })
}


console.log('Servidor web iniciado')


function primos(max,min){
 let k=0;
 let t=[];
 let primos=[];
 let i=0;
  for(let p=min ; p<=max ; p++){
    if(p%2!=0 | p==2 && p!=0){
  t.push(p);
  k++
    }
  }
  console.log('los numeros impares son: ', t)
  for(h=0; h<=t.length ; h++){
  
    if(t[h]%3!=0 & t[h]%5!=0 & t[h]%7!=0){
      primos.push(t[h])
      
    }
  }
  
    console.log('los numeros primos son ', primos)
  }
  