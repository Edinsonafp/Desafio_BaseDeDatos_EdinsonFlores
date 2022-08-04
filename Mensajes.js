import knexLib from 'knex'

class Mensajes{
    constructor(config, table){
        //this.archivo = archivo
        //this.productos = JSON.parse(fs.readFileSync(this.archivo,'utf-8'))
        this.knex = knexLib(config)
        this.table = table
    }

    insertarMensaje(mensaje){
        const msg = mensaje
        //console.log(producto)
        return this.knex.insert(msg).into(this.table).then()
    }

    listarMensajes(){
        return this.knex.select('*').table(this.table)  
    }

}

export default Mensajes