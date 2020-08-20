const path = require('path')  /* Nos permite acceder a directorios del proyecto */
const HtmlWebpackPlugin = require('html-webpack-plugin') /* Nos permite trabajar con HTML */
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/index.js', /* La dirección del archivo que inicia el proyecto */
    output: { /* Configuración del resultado de la compilación del proyecto */
        path: path.resolve(__dirname, 'dist'), /* Crea la carpeta final del proyecto que irá a producción */
        filename: 'main.js' /* Nombre del archivo final generado en dist */
    },
    resolve: {
        extensions: ['.js'] /* Extensiones de los archivos con los que se trabajará */
    },
    module: {
        rules: [
            {
                test: /\.js?$/, /* Regex para filtrar los archivos a usar, en este caso, solo se usarán archivos .js */
                exclude: /node_modules/, /* Se excluye la carpeta node_modules para enviarse a producción */
                use: {  /* Herramientas a utilizar en el proyecto */
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [  /* Plugins a utilizar en el proyecto */
        new HtmlWebpackPlugin({  /* Plugins para renderizar HTML */
            inject: true, /* Habilita la opción para renderizar sobre un archivo HTML */
            template: './public/index.html', /* Template base a utilizar */
            filename: './index.html' /* Archivo HTML resultado que se compilará en dist */
        }),
        new CopyWebpackPlugin({ /* Plugin para copiar los estilos CSS al proyecto final */
            patterns: [
                {
                    from: './src/styles/styles.css',  /* Origen */
                    to: '' /* Destino --> dist */
                }
            ]
        })
    ]
}
