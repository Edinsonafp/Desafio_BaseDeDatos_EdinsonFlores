//const fs = require('fs')
import knexLib from 'knex'
//let date = new Date()

class Productos {
    constructor(config, table){
        //this.archivo = archivo
        //this.productos = JSON.parse(fs.readFileSync(this.archivo,'utf-8'))
        this.knex = knexLib(config)
        this.table = table
    }

    /*let productos = [{                                                                                                                                                    
        title: "Escuadra",                                                                                                                                 
        price: 123.45,                                                                                                                                     
        foto_url: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",                                     
        id: 1                                                                                                                                              
      },                                                                                                                                                   
      {                                                                                                                                                    
        title: "Calculadora",                                                                                                                              
        price: 234.56,                                                                                                                                     
        foto_url: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",                                          
        id: 2                                                                                                                                              
      },                                                                                                                                                   
      {                                                                                                                                                    
        title: "Globo Terráqueo",                                                                                                                          
        price: 345.67,                                                                                                                                     
        foto_url: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",                                   
        id: 3                                                                                                                                              
    }];*/

    create(product){
        /*if(this.productos.length>0){
            id = this.productos.at(-1).id + 1 
        }else{
            id = 1
        }   
        let timestamp = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear()*/
        
        const producto = { id: 0, ...product}
        //console.log(producto)
        return this.knex.insert(producto).into(this.table).then()
    }

    update(id, producto){
        /*const index = this.productos.findIndex( prod => prod.id === parseInt(id))
        if(index===-1){
            res.send({ error : 'producto no encontrado' })
        }else{
            this.productos[index].nombre = producto.nombre
            this.productos[index].descripcionn = producto.descripcionn
            this.productos[index].codigo = producto.codigo
            this.productos[index].fotoURL = producto.fotoURL
            this.productos[index].precio = producto.precio
            this.productos[index].stock = producto.stock
            fs.writeFileSync(this.archivo, JSON.stringify(this.productos))
            return('Se actualizo el producto con id: '+id)
        }  */
        return this.knex.from(this.table).where('id', id).update(producto)
    }

    /*getById(id){
        return this.productos.find( object => object.id === id)
    }*/

    getAll(){
        /*let prodcs = []
        this.knex('productos').select('*').then(function(result) {
            result.forEach(function(value) {
                prodcs.push(value)
            });
            return prodcs;
        });*/
        /*return this.knex.select('*').table('productos').then((productos) => {
            return productos;
          })*/
        /*let prods = async () => {
            return this.knex.select('*').table('productos')          
        }
        console.log(prods.then())*/
        //return prods
        return this.knex.select('*').table(this.table)    
    }

    deleteById(id){
        /*const index = this.productos.findIndex( object => object.id === id)
        this.productos.splice(index, 1)
        fs.writeFileSync(this.archivo, JSON.stringify(this.productos))
        return('Se elimino el producto con id: '+id)*/
        return this.knex.from(this.table).where('id', id).del()
    }

    /*deleteAll(){
        this.productos = []
        fs.writeFileSync(this.archivo, JSON.stringify(this.productos))
    }*/

}

export default Productos