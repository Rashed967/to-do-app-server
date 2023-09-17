const http = require("http")
const {saveDataToTheFile} = require('./utilities')

// create server 
const server = http.createServer((req, res) => {

  // stop cors 
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")


  // stop cors origin 
  if(req.method === "OPTIONS"){
    res.writeHead(200)
    res.end()
    return
  }


  // check req url 
  if(req.url === '/api/send-data' && req.method === "POST"){
    let body = ""

    // chunks 
    req.on("data", (chunk) => {
      body +=  chunk.toString()
    })

    
    
    req.on("end", () => {
      try{
        const parsedObject = JSON.parse(body)
        // console.log(parsedObject)
        res.writeHead(200, {"Content-Type" : "application/json"})
        res.end(JSON.stringify({message : "Successfully data recived"}))
        saveDataToTheFile(parsedObject)
      }
      
      catch(error){
        res.writeHead(400, {"Content-Type" : "text/plain"})
        res.end("Error from server is",  error)
      }
    })
  }


})

const port = 3000;
const host = "localhost";

// listen the server 
server.listen(port, host, () => {
  console.log("Server is running on port", port)
})