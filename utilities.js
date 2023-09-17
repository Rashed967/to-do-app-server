const fs = require('fs')
const path = require('path')

let arraysOfObject = []

// save data function 
function saveToFile(item){
    const dirPath =  path.join(__dirname, 'data')

    const fileName = 'data.json'

    const filePath = path.join(dirPath, fileName)
    
    arraysOfObject.push(item)
    
    const josnData =  JSON.stringify(arraysOfObject, null, 2)
    try{
        fs.writeFileSync(filePath, josnData)
    }

    catch(error){
        console.log("Someting is wrong")
    }

}


module.exports = {saveToFile}