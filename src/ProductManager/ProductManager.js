import fs from 'fs'
class ProductManager {
    constructor (){        
        this.path='./src/ProductManager/archivoProducto.txt';
        this.products=[]
    }

    // metodos
    addProduct = async (title,description ,price,thumbnail,code,stock) =>{

        this.products = await this.getProducts();          

        const product ={ 
            title,
            description,
            price, 
            thumbnail,
            code,
            stock
        }
        // si no hay ningun progducto pone el id en 1 , si no se fija cual es el ultimo el id del ultimo progroducto y le suma 1 
        if(this.products.length===0){
            product.id = 1;
        }else{
            product.id = this.products[this.products.length-1].id+1;
        }

        // validacion de que esten todos los datos por parametros
        if (title && description && price && thumbnail && code && stock ){
            const result = this.products.find(producto => producto.code===code);
            // valido que el codigo ingresado no sea el mismo qu otro existente
            if (result===undefined){
                this.products.push(product)
                await fs.promises.writeFile(this.path,JSON.stringify(this.products,null,'\t'))
            } 
            else{
                return console.log("el codigo ya del producto ya existe")
            }                       
        }
        else{
            return console.log("alguno de los campos no fue completado")
        }
       
    }

    getProducts = async () =>{
        
         if (fs.existsSync(this.path)){
            const content = await fs.promises.readFile(this.path,'utf-8');
            this.products = JSON.parse(content)
            return this.products;
         }
         return [] 
    }
    getProductById = async (id)=>{

        this.products = await this.getProducts();  
        const productoPorId = this.products.find(element => element.id===id);
        if (productoPorId===undefined){
            return 'Not found'
        }
        else
            {
                return productoPorId
            }        
    }

    updateProduct = async (id,atributo,valor) =>{
        this.products = await this.getProducts();        
        const indice = this.products.findIndex(producto=>producto.id===id)
        if (indice===-1){
            return console.log("el producto a modificar no existe")        
        }        

        const produtoAux = this.products[indice]
        produtoAux[atributo] = valor; 
        this.products[indice] = produtoAux;

        await fs.promises.writeFile(this.path,JSON.stringify(this.products,null,'\t'))        
    }

    deleteProduct = async (id) =>{
        this.products = await this.getProducts();  
        if(this.products.some(producto=> producto.id===id)){
            this.products = this.products.filter(producto => producto.id !==id) 
            if (this.products.length===0){
                if (fs.existsSync(this.path)){
                    await fs.promises.unlink(this.path) 
                }            
            }
            else{
                await fs.promises.writeFile(this.path,JSON.stringify(this.products,null,'\t'))    
            } 
        }
        else{
            console.log("el producto a eliminar no existe")
        }          
    }
}

export default ProductManager;

// prueba del script 

/* const rodrigo = new ProductManager();

await rodrigo.addProduct("title","description" ,"price","thumbnail",51,"stock")

await rodrigo.addProduct("title","description" ,"price","thumbnail",56,"stock")

await rodrigo.addProduct("title","description" ,"price","thumbnail",20,"stock")

await rodrigo.addProduct("title","description" ,"price","thumbnail",54,"stock") 

await rodrigo.addProduct("title","description" ,"price","thumbnail",5412,"stock") 

await rodrigo.getProductById(3);

await rodrigo.deleteProduct(5);

await rodrigo.updateProduct(4,"price","pili1")

console.log(await rodrigo.getProducts());
 */

