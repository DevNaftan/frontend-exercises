(async function load() {
  async function getUsers(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
  }

  async function getMovies(url) {
    const reponse = await fetch(url)
    const data = await reponse.json()
    if(data.data.movie_count > 0) {
      return data
    } else {
      throw new Error('No se encontró ningún resultado')
    }
  }

  const BASE_MOVIES_API = 'https://yts.mx/api/v2/'
  const BASE_USERS_API = 'https://randomuser.me/api/'


  $myPlaylist = document.querySelector('.myPlaylist')

  function moviesListTemplate(movieTitle) {
    return (
      `<li class="myPlaylist-item">
        <a href="#">
          <span>
            ${movieTitle}
          </span>
        </a>
      </li>`
    )
  }

  function moviesListHTML(movieString) {
    const HTML = document.implementation.createHTMLDocument()
    HTML.body.innerHTML = movieString
    return HTML.body.children[0]
  }

  function renderList(list, $selector) {
    list.forEach(({title}) => {
      const movieString = moviesListTemplate(title)
      const movieHTML = moviesListHTML(movieString)
      $selector.append(movieHTML)
    })
  }

  async function moviesListCache() {
    const movieList = window.localStorage.getItem('moviesList')
    if(movieList) {
      setTimeout(async () => {
        window.localStorage.removeItem('moviesList')
        const {data: {movies}} = await getMovies(`${BASE_MOVIES_API}list_movies.json?limit=10`)
        window.localStorage.setItem('moviesList', JSON.stringify(movies))
      }, 1000)
      return JSON.parse(movieList)
    } else {
      const {data: {movies}} = await getMovies(`${BASE_MOVIES_API}list_movies.json?limit=10`)
      window.localStorage.setItem('moviesList', JSON.stringify(movies))
      return movies
    }
  }

  const moviesList = await moviesListCache()
  renderList(moviesList, $myPlaylist)


  $playlistFriends = document.querySelector('.playlistFriends')

  function userTemplate(user) {
    return (
      `<li class="playlistFriends-item">
        <a href="#">
          <img src="${user.picture.thumbnail}" />
          <span>
            ${user.name.first} ${user.name.last}
          </span>
        </a>
      </li>`
    )
  }

  function userHTML(userString) {
    const HTML = document.implementation.createHTMLDocument()
    HTML.body.innerHTML = userString
    return HTML.body.children[0]
  }

  function renderUsers(userList, $selector) {
    userList.forEach((user) => {
      const userToString = userTemplate(user)
      const userToHTML = userHTML(userToString)
      $selector.append(userToHTML)
    })
  }

  async function userCache() {
    const users = window.localStorage.getItem('users')
    if(users) {
      setTimeout(async () => {
        window.localStorage.removeItem('users')
        const {results: users} = await getUsers(`${BASE_USERS_API}?results=10`)
        window.localStorage.setItem('users', JSON.stringify(users))
      }, 1000)
      return JSON.parse(users)
    } else {
      const {results: users} = await getUsers(`${BASE_USERS_API}?results=10`)
      window.localStorage.setItem('users', JSON.stringify(users))
      return users
    }
  }

  const users = await userCache()
  renderUsers(users, $playlistFriends)


  const $form = document.getElementById('form')
  const $home = document.getElementById('home')
  const $featuringContainer = document.getElementById('featuring')

  function setAttribute($element, attributes) {
    for(const attribute in attributes) {
      $element.setAttribute(attribute, attributes[attribute])
    }
  }  // Insetamos los atributos al elemento img

  $form.addEventListener('submit', async (event) => {
    event.preventDefault()  //Evita que la pagina se recargue por el submit por defecto del formulario, con esta función quitamos este efecto
    
    $home.classList.add('search-active')
    const $loader = document.createElement('img')
    setAttribute($loader, {
      src: '../images/loader.gif',
      height: 50,
      width: 50
      })  // Llamamos la función enviándole el elemento y los atributos en objeto que se le insertarán
      $featuringContainer.append($loader)  // Implementamos el elemento al DOM dentro de la etiqueta requerida

      const data = new FormData($form)
      try {
        const {data: { movies: peliculas }} = await getMovies(`${BASE_MOVIES_API}list_movies.json?limit=1&query_term=${data.get('search')}`)  // Consulta 1 elemento del API con el dato ingresado en el formulario
        const HTMLString = featuringTemplate(peliculas[0])
        $featuringContainer.innerHTML = HTMLString
      } catch (error) {
        alert(error.message)
        $loader.remove()
        $home.classList.remove('search-active')
      }

      function featuringTemplate(movie) {
        return (
          `<div class="featuring">
            <div class="featuring-image">
              <img src="${movie.medium_cover_image}" width="70" height="100" alt="">
            </div>
            <div class="featuring-content">
              <p class="featuring-title">Pelicula encontrada</p>
              <p class="featuring-album">${movie.title}</p>
            </div>
          </div>`
        )
      }
  })


  const $actionContainer = document.querySelector('#action')
  const $dramaContainer = document.getElementById('drama')
  const $animationContainer = document.getElementById('animation')

  function movieItemTemplate(movie, category) {  // Contiene el template HTML
    return(
      `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
        <div class="primaryPlaylistItem-image">
          <img src="${movie.medium_cover_image}">
        </div>
        <h4 class="primaryPlaylistItem-title">
          ${movie.title}
        </h4>
      </div>`
    )
  }

  function createTemplate(HTMLString) {  // LLena el template con la información de la película
    const HTML = document.implementation.createHTMLDocument()  // Crea un DOM que será utlizado para obtener las etiquetas HTML
    HTML.body.innerHTML = HTMLString  // Inserta la plantilla dentro del body del DOM creado
    return HTML.body.children[0]
  }

  function renderMovieList(list, $selector, category) {  //Obtiene las funciones del template y llenado del template par cada película del array de películas y las imprime en el DOM
    $selector.children[0].remove()  //Elimina el loader una vez esté listo para mostrar las películas
    list.forEach(movie => {
      const HTMLString = movieItemTemplate(movie, category)  // Llena el template con la información de la película
      const movieElement = createTemplate(HTMLString)
      $selector.append(movieElement)  //Optiene la plantilla previamente insertada en el DOM creado pero ya convertida a formato HTML y la inserta en la etiqueta de películas de nuestro DOM original, en este caso la etiqueta #action.
      const image = movieElement.querySelector('img')
      image.addEventListener('load', (event) => {
        event.target.classList.add('fadeIn')
      })  // Espera que la imagen carge completamente para mostrarla con una animación en CSS
      addEventClick(movieElement)
    })  // Obtiene cada elemento del array de películas consultado y utilizando la plantilla inserta la información para cada elemento del array para finalmente insertarlo en el DOM
  }

  async function cacheExist(genre) {
    const cacheList = window.localStorage.getItem(`${genre}List`)
    if(cacheList) {
      setTimeout(async () => {
        window.localStorage.removeItem(`${genre}List`);
        const {data: {movies}} = await getMovies(`${BASE_MOVIES_API}list_movies.json?genre=${genre}`)
        window.localStorage.setItem(`${genre}List`, JSON.stringify(movies))
      }, 1000)
      return JSON.parse(cacheList)
    } else {
      const {data: {movies}} = await getMovies(`${BASE_MOVIES_API}list_movies.json?genre=${genre}`)
      window.localStorage.setItem(`${genre}List`, JSON.stringify(movies))
      return movies
    }
  }

  const actionList = await cacheExist('action')
  renderMovieList(actionList, $actionContainer, 'action')
  
  const dramaList = await cacheExist('drama')
  renderMovieList(dramaList, $dramaContainer, 'drama')
  
  const animationList = await cacheExist('animation')
  renderMovieList(animationList, $animationContainer, 'animation')  // Hace la petición e invoca la función para generar la lista de películas


  const $modal = document.getElementById('modal')
  const $overlay = document.getElementById('overlay')
  const $hideModal = document.getElementById('hide-modal')
  const $modalTitle = $modal.querySelector('h1')
  const $modalImage = $modal.querySelector('img')
  const $modalDescription = $modal.querySelector('p')

  function findById(listMovie, idMovie) {
    return listMovie.find(({id}) => id === parseInt(idMovie, 10))
  }

  function findMovie(idMovie, categoryMovie) {
    switch(categoryMovie) {
      case 'action':
        return findById(actionList, idMovie)
      case 'drama':
        return findById(dramaList, idMovie)
      default:
        return findById(animationList, idMovie)
    }
  }

  function showModal($element) {
    $overlay.classList.add('active')
    $modal.style.animation = 'modalIn .8s forwards'
    const id = $element.dataset.id
    const category = $element.dataset.category
    const data = findMovie(id, category)
    $modalTitle.textContent = data.title
    $modalImage.setAttribute('src', data.medium_cover_image)
    $modalDescription.textContent = data.description_full
  }

  function hideModal() {
    $modal.style.animation = 'modalOut .8s forwards'
    $overlay.classList.remove('active')
  }

  $hideModal.addEventListener('click', hideModal)  //Igual

  function addEventClick($element) {
    $element.addEventListener('click', () => showModal($element))  //Igual
  }
})()