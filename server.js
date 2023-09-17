const http = require('http')
const {saveToFile} = require('./utilities')

// create server 
const server = http.createServer((req, res) => {

  // fix cors policy error 
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Other-Allowed-Headers");

  // check method for cors 
  if(req.method === "OPTIONS"){
    res.writeHead(200)
    res.end()
    return
  }

  // check conditions
  if(req.url === "/api/send-data" && req.method === "POST"){
      // global variable 
   let body = "";

  //  convert to string 
   req.on("data", chunk => {
    body += chunk.toString()
   })

   req.on("end", () => {
    try{
      const parsedObject = JSON.parse(body)
      console.log(parsedObject);
      saveToFile(parsedObject)
      res.writeHead(200, {"Content-Type" : "application/json"})
      res.end(JSON.stringify({message : "Data recived successfully"}))
     }
     catch(error){
        res.writeHead(400, {"Content-Type" : "text/plain"})
        res.end("Something is wrong")
     }
   })

  }

  else{
    res.writeHead(404, {"Content-Type" : "text/plain"})
    res.end("Data not found")
  }
  

})

const port = 3000, host = "localhost";
server.listen(port, host, () => {
  console.log("server is runnign on port", port);
})