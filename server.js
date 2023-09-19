const http = require('http')
const {saveToFile, getDataFromServer, deleteDataFromServer} = require('./utilities');


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

  // get data from server 
  if(req.url === "/api/send-data" && req.method === "GET"){
    const foundData = getDataFromServer()
    res.writeHead(200, {"Content-Type" : "application/json"})
    res.end(JSON.stringify(foundData))
  }


  // delete data from server 
  if(req.url === "/api/send-data" && req.method === "DELETE"){
    let id = ""
    req.on("data", chunk => {
      id += chunk.toString()
    })


    
    req.on("end", () => {
      try{
        const parsedId = Number(JSON.parse(id).id)
        deleteDataFromServer(parsedId)
        const newData = getDataFromServer()
        res.writeHead(200, {"Content-Type" : "application/json"})
        res.end(JSON.stringify(newData))
      }
      catch{
        res.writeHead(404, {"Content-Type" : "text/plain"})
        res.end("Data not deleted, something is wrong")
      }
    })
  }
  

})

const port = 3000, host = "localhost";
server.listen(port, host, () => {
  console.log("server is runnign on port", port);
})