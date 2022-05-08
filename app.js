const formularioUI = document.querySelector('#formulario');
const listaProductosUI = document.getElementById('listaProductos');
let arrayProductos = [];


//---------------------------

const CrearItem = (producto, unidades, cantidad) =>{

    let item = {
        producto: producto,
        unidad: unidades,
        cantidad: cantidad,
        estado: 'En carrito'
    }
    arrayProductos.push(item);
    return item;
}

const GuardarDB = (producto, unidades, cantidad) =>{
    localStorage.setItem('compra',JSON.stringify(arrayProductos))
    PintarDB();
}

const PintarDB =()=>{

    listaProductosUI.innerHTML='';

    arrayProductos = JSON.parse(localStorage.getItem('compra'));

    if(arrayProductos === null){
        arrayProductos=[];
    }else{
        arrayProductos.forEach(element => {
            if(element.estado == 'Comprado'){
                listaProductosUI.innerHTML += `<div class="alert alert-primary" role="alert"><i class="material-icons float-left mr-4">add_shopping_cart</i><b> ${element.producto} </b> <b> ${element.cantidad} </b> <b> ${element.unidad} </b>- ${element.estado}<span class="float-right"><i class="material-icons">expand_less</i><i class="material-icons">expand_more</i><i class="material-icons">done</i><i class="material-icons">delete_outline</i></span></div>`
            }else{
                listaProductosUI.innerHTML += `<div class="alert alert-danger" role="alert"><i class="material-icons float-left mr-4">add_shopping_cart</i><b> ${element.producto} </b><b> ${element.cantidad} </b><b> ${element.unidad} </b> - ${element.estado}<span class="float-right"><i class="material-icons">expand_less</i><i class="material-icons">expand_more</i><i class="material-icons">done</i><i class="material-icons">delete_outline</i></span></div>`
            }
        });
    }
}

const EliminarDB = (producto) =>{
    producto = producto.trim();
    let indexArray;
    arrayProductos.forEach((elemento, index) => {
        if(elemento.producto === producto){
            indexArray = index;
        }
    });

    arrayProductos.splice(indexArray,1);
    GuardarDB();
}

const EditarDB = (producto) => {
    producto = producto.trim();
    let indexArray = arrayProductos.findIndex((elemento)=>{
     return  elemento.producto===producto
    });
    arrayProductos[indexArray].estado = 'Comprado';
    GuardarDB();
}

//------------------------------

formularioUI.addEventListener('submit', (e)=>{
    e.preventDefault();
    let productoUI = document.querySelector('#producto').value;
    let unidadesUI = document.querySelector('#unidades').value;
    let cantidadUI = document.querySelector('#cantidad').value;
    CrearItem(productoUI,unidadesUI,cantidadUI);
    GuardarDB();
    formularioUI.reset();
});

document.addEventListener('DOMContentLoaded', PintarDB);

listaProductosUI.addEventListener('click', (e)=>{
    e.preventDefault();
    if((e.target.innerHTML === 'done' || e.target.innerHTML === 'delete_outline')){
            let texto = e.path[2].childNodes[1].innerHTML;
            if(e.target.innerHTML === 'delete_outline'){
                EliminarDB(texto);
            }
            if(e.target.innerHTML === 'done'){
                EditarDB(texto);
            }
    }
});


