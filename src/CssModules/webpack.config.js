module.exports = {
    entry: './src',
    output: {
      path: '/build',
      filename: 'bundle.js',
    },
    module: {
        rules: [
          {
            test: /\.js/,
            use: 'babel-loader',
            include: __dirname + '/src',
           },
           {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
            include: __dirname + '/src'
           }
        ],
      }
  };