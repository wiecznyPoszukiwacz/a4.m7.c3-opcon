const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack')

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
		new webpack.DefinePlugin({
			'process.env.MACHINARIUM_URL': JSON.stringify(process.env.NODE_ENV === 'production' ? 'wss://a4m7c3.space/machinarium/' : 'ws://localhost:8090/')
		})
	],
devServer: {
    liveReload: true,
	static: {
		directory: path.resolve(__dirname, './assets'),
		publicPath: '/assets'
	}
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

