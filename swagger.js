const Autogen = require("swagger-autogen")()
const swaggerFile ='./swagger.json'
const endPoints = ['./routes/user']

Autogen(swaggerFile,endPoints).then(()=>{
    require("./index.js")
})