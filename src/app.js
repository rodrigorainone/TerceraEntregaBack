import  express  from "express";
import ProductManager from "./ProductManager/ProductManager.js";

const app = express()
const prod = new ProductManager();

app.get('/products',async (req,res)=>{    
    if (req.query.limit === undefined){
        return res.send(await prod.getProducts())
    }
    else {    
        if (!isNaN(req.query.limit)){ 
            const productos = await prod.getProducts()        
            if (productos.length >= parseInt(req.query.limit)){
                console.log(req.query.limit)
                const productosLimit = productos.slice(0,parseInt(req.query.limit))
                return res.send(productosLimit)
            }else{
                res.send("la cantidad de productos solicitada supera a los productos contenidos")
            }     
        }
        else {
            res.send("el argumento de limit no es un numero")
        }
    }    
})

app.get('/products/:pid',async (req,res)=>{        
        res.send(await prod.getProductById(parseInt(req.params.pid)))
   
})
app.listen(8081,()=>console.log("escuchando puerto 8081"))