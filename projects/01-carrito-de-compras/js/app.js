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
      const selectCourse = e.target.parentElement.parentElement
      readDataCourse(selectCourse)
   }
}

// lee el contenido Html al q le dimos click y extrae la info del curso
function readDataCourse(course) {
   // creamos objeto con el contenido del curso actual
   const infoCourse = {
      image: course.querySelector('.imagen-curso').src,
      name: course.querySelector('h4').textContent,
      price: course.querySelector('.precio span').textContent,
      id: course.querySelector('.info-card a').dataset.id,
      quantity: 1
   }
   console.log(infoCourse)
}