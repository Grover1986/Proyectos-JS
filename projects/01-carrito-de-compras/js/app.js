//💊 Variables
const d = document
   , cart = d.querySelector('#carrito')
   , cartList = d.querySelector('#lista-carrito tbody')
   , courseList = d.querySelector('#lista-cursos')
   , emptyCartBtn = d.querySelector('#vaciar-carrito')

// Notemos que vamos agregar dos listener ya q tenemos boton 'Agregar al Carrito' y 'Vaciar Carrito'
// Entonces crearemos una funcion donde registremos todos nuestros  eventListeners
loadEventListeners()
function loadEventListeners() {
   // cuando agregas un curso presionando 'Agregar al Carrito'
   courseList.addEventListener('click', addCourse)
}

//💊 Funciones
function addCourse(e) {
   // con preventDefault() prevenimos la acción x defecto ya q los href no tienen enlace sino solo el #
   e.preventDefault()

   if(e.target.matches('.agregar-carrito')) {
      console.log(e.target)
   }

}