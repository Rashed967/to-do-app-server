const { log } = require('console')
const fs = require('fs')
const path = require('path')

// funciton to save data to the file 
let toDoArray = [];

function saveDataToTheFile(item){
    // data dir path 
    const dataDirPath = path.join(__dirname, 'data')

    // fileName 
    const filename = 'data.json'

    // join path 
    const filePath = path.join(dataDirPath, filename)
    
    // push to array 
    toDoArray.push(item)

    // convert to json data 
   const jsonData = JSON.stringify(toDoArray, null, 2)


   try{
    fs.writeFileSync(filePath, jsonData)
    // console.log();
   }

   catch{
        console.log("someThing is wrong");
   }
   
    
    
}


module.exports = {saveDataToTheFile} 
