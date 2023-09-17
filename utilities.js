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


function getDataFromServer(){
     const dirPath = path.join(__dirname, 'data')
     const filePath = path.join(dirPath, 'data.json')
     const data = fs.readFileSync(filePath, 'utf8')
     return JSON.parse(data)
}



module.exports = {saveToFile, getDataFromServer}