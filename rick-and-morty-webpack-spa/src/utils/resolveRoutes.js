function resolveRoutes(route) {
    debugger
    if (route.length <= 3) {  /* Valida si la ruta recibida es de maximo 3 elementos ya que las ids a manejar no superan los 999 elementos */
        let validRoute = route === '/' ? route : '/:id'  /* Valida si se trata del / para el home o de una id */
        return validRoute
    }
    return `/${route}` /* Retorna error 404 si no cumple la condición  */
}

export default resolveRoutes
