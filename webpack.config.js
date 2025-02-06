const path = require('path')

// modulo do webpack
module.exports =  {
    // arquivo de entrada do codigo
    entry: './src/app.js',
    // quando fizer o build para qual arquivo ele vai o build
    output: {
        filename: 'bundle.js',
        // vai para a pasta build
        path: path.resolve(__dirname, '/dist'),
        publicPath: 'dist'
    }
}