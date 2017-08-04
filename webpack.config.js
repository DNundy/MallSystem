/*
* @Author: Administrator
* @Date:   2017-08-03 17:56:02
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-04 14:22:03
*/

//导入基础模块
var webpack				= require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var htmlWebpackPlugin 	= require('html-webpack-plugin');

//配置环境变量
var path 				= require('path');
var WEBPACK_ENV 		= process.env.WEBPACK_ENV || 'dev';

//获取html-webpack-plugin参数
var getHtmlConfig 		= function (name) {
	return {
		filename : 	"view/" + name + ".html",
		template : 	"./src/view/" + name + ".html",
		inject : 	"true",
		hash : 		"true",
		chunks : 	["common",name]
	};
}

//webpack config信息
var config = {

	entry : {
		index : 		"./src/page/index/index.js",
		login : 		"./src/page/login/login.js",
		common : 		["./src/page/common/index.js"]
	},

	output : {
		path : 			path.resolve(__dirname,"dist"),//必须是绝对路径
		publicPath : 	"/dist/",
		filename : 		"js/[name].bundle.js"
	},

	externals: {
		jquery : 		'jQuery'
	},

	plugins:[
		new ExtractTextPlugin({
			filename : 	"css/[name].css"
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name : 		"common",
			filename : 	"js/common.js"
		}),
		new htmlWebpackPlugin(getHtmlConfig('index')),
		new htmlWebpackPlugin(getHtmlConfig('login'))
	],

	module: {
		rules: [
		{	//css规则，postcss兼容处理，然后css，最后style
			test : /\.css$/,
	        use : ExtractTextPlugin.extract({
				fallback : "style-loader",
				use : [
					{loader:"css-loader"},
					{
						loader:"postcss-loader",
						options: {
				          	plugins: [
				          		require('postcss-import')(),
				          		require('autoprefixer')({broswers:['last 5 versions']})
				          	]
				        }
					}
				],
			})
		},
		{	//普通文件处理:小于100时转化为base64编码
			test : /\.(jpg|jpeg|png|gif|svg|woff|eot|ttf)\??.*$/i,
			use : [
				{
					loader: 'url-loader',
					options: {
						limit: 100,
						name: 'resource/[name].[ext]'
					}
				}
			]
		}]
	}

}

if(WEBPACK_ENV === 'dev' ) {
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports=config;