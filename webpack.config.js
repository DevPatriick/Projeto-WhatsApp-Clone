const path = require('path')

// modulo do webpack
module.exports =  {
    // arquivo de entrada do codigo
    entry: {
        app: './src/app.js',
        'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry.js'
    },
    // quando fizer o build para qual arquivo ele vai o build
    output: {
        filename: '[name].bundle.js',
        // vai para a pasta build
        path: path.join(__dirname, 'dist'),
        publicPath: 'dist'
    }
}