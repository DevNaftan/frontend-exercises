import Header from '../templates/Header' /* No es necesario poner la extensión .js ya que se sobreentiende que se está importanto un archivo .js */
import Home from '../pages/Home'
import Character from '../pages/Character'
import Error404 from '../pages/Error404'
import getHash from '../utils/getHash'
import resolveRoutes from '../utils/resolveRoutes'

const routes = { /* Se establecen las rutas de las diferentes secciones */
    '/': Home,
    '/:id': Character
}

async function router() {
    const header = null || document.getElementById('header')
    const content = null || document.getElementById('content')

    header.innerHTML = await Header()
    let hash = getHash()
    let route = await resolveRoutes(hash)
    let render = routes[route] ? routes[route] : Error404
    content.innerHTML = await render()
}

export default router
