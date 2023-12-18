const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	optimization: {
		usedExports: false
	},
	 plugins: [
    new HtmlWebpackPlugin({
      title: 'Twoja Nazwa Aplikacji', // Tutaj możesz ustawić tytuł
      template: './src/index.html' // Ścieżka do twojego szablonu HTML
    }),
		   new MiniCssExtractPlugin(),
    // Możesz dodać więcej pluginów tutaj
  ],
devServer: {
    liveReload: true,
  },
  entry: './src/main.mts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.m?tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
	    {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.mts'],
	extensionAlias:{
		".mjs": ['.mjs', '.mts']
	}
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

