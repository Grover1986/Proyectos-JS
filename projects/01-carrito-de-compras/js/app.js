//💊 Variables
const d = document
   , cart = d.querySelector('#carrito')
   , cartList = d.querySelector('#lista-carrito tbody')
   , courseList = d.querySelector('#lista-cursos')
   , emptyCartBtn = d.querySelector('#vaciar-carrito')

let  cartArticles = []

// Notemos que vamos agregar dos listener ya q tenemos boton 'Agregar al Carrito' y 'Vaciar Carrito'
// Entonces crearemos una funcion donde registremos todos nuestros  eventListeners
loadEventListeners()
function loadEventListeners() {
   // cuando agregas un curso presionando 'Agregar al Carrito'
   courseList.addEventListener('click', addCourse)

   // elimina cursos del carrito
   d.addEventListener('click', deleteCourse)
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

function deleteCourse(e) {
   if(e.target.matches('.delete-course')){
      const courseId = e.target.dataset.id
      // elimina del arreglo de cartArticles por el data-id
      cartArticles = cartArticles.filter(course => course.id !== courseId)
      cartHTML() // aqui volvemos a iterar sobre el carrito y mostrar su HTML
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
   // Revisa si un elemento ya existe en el carrito
   const exist = cartArticles.some(el => el.id === infoCourse.id)
   if(exist) {
      /*🗒️ Actualizamos la cantidad */
      /**
       * Este código realiza lo siguiente:
       * 👇👉 Utiliza el método map() para iterar sobre cada artículo en el carrito (cartArticles).
       * 👇👉 Para cada artículo (course) en el carrito, comprueba si el id del curso coincide con el id del curso que se está intentando agregar (infoCourse.id).
       * 👇👉 Si hay coincidencia, incrementa la cantidad (quantity) del curso en el carrito y devuelve el mismo objeto curso.
       * 👇👉 Si no hay coincidencia, simplemente devuelve el curso sin cambios.
       * 👇👉 Finalmente, actualiza cartArticles con un nuevo arreglo creado a partir de courses, que contiene los cambios realizados.
       * 👇👉 En resumen, este código actualiza la cantidad de un curso en el carrito si ya existe allí. Si el curso no está en el carrito, simplemente agrega el nuevo curso al carrito.
       */
      const courses = cartArticles.map(course => {
         if(course.id === infoCourse.id) {
            course.quantity++
            return course  // retorna el objeto actualizado
         }else return course  // retorna los objetos q no son duplicados
      })
      cartArticles = [...courses]

   }else {
   // Agrega elementos al arreglo del cartArticles
      cartArticles = [...cartArticles, infoCourse]
   }
   cartHTML()

   console.log(cartArticles)
}

// Muestra el carrito de compras en el HTML
function cartHTML() {
   // Limpiar el HTML
   cleanHTML()

   // Recorre el carrito y genera el HTML
   cartArticles.forEach(course => {
      // destructurando nuestro objeto curso
      const { image, name, price, quantity, id } = course
      const row = d.createElement('tr')
      row.innerHTML = `
         <td><img src='${image}' width=100 /></td>
         <td>${name}</td>
         <td>${price}</td>
         <td>${quantity}</td>
         <td>
            <a href='#' class='delete-course' data-id=${id}> X </a>
         </td>
      ` /* le agregamos atributo data-id 👆 de boton 'Agregar al Carrito' para identificar el curso q estamos eliminando */
      cartList.insertAdjacentElement('beforeend', row)
   })
}

// Elimina los cursos del tbody
function cleanHTML() {
   // forma lenta
   // cartList.innerHTML = ''

   // forma rápida
   while(cartList.firstChild) {
      cartList.removeChild(cartList.firstChild)
   }
}