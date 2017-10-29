const path = require('path')

module.exports = {
    context: path.join(__dirname, ''),
    entry: {
        'test.js': './test.ts',
    },
    output: {
        filename: '[name]',
        path: path.join(__dirname, '../../dest/')
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            { test: /\.ts?$/, loader: 'ts-loader' }
        ]
   }
}
