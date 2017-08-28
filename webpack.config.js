/*
* @Author: Administrator
* @Date:   2017-08-03 17:56:02
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-28 08:46:44
*/

/*导入基础模块*/
var webpack				= require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var htmlWebpackPlugin 	= require('html-webpack-plugin');

/*配置环境变量*/
var path 				= require('path');
var WEBPACK_ENV 		= process.env.WEBPACK_ENV || 'dev';

/*获取html-webpack-plugin参数*/
var getHtmlConfig 		= function (name,title) {
	return {
		filename : 		"view/" + name + ".html",
		template : 		"./src/view/" + name + ".html",
		inject : 		"true",
		hash : 			"true",
		title : 		title,
		chunks : 		["common",name]
	};
}

/*webpack config信息*/
var config = {

	entry : {
		'index' 			: 	"./src/page/index/index.js",
		'list' 				: 	"./src/page/list/index.js",
		'detail' 			: 	"./src/page/detail/index.js",
		'user-login' 		: 	"./src/page/user-login/index.js",
		'user-register' 	: 	"./src/page/user-register/index.js",
		'user-center' 		: 	"./src/page/user-center/index.js",
		'user-center-update': 	"./src/page/user-center-update/index.js",
		'user-pass-reset' 	: 	"./src/page/user-pass-reset/index.js",
        'user-pass-update'  : 	"./src/page/user-pass-update/index.js",
		'result' 			: 	"./src/page/result/index.js",
		'common' 			: 	["./src/page/common/index.js"]
	},
	output : {
		path : 			path.resolve(__dirname,"dist"),/*必须是绝对路径*/
		publicPath : 	"/dist/",
		filename : 		"js/[name].bundle.js"
	},

	externals : {
		jquery : 		'jQuery'
	},

	plugins : [
		new ExtractTextPlugin({
			filename : 	"css/[name].css"
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name : 		"common",
			filename : 	"js/common.js"
		}),
		new htmlWebpackPlugin(getHtmlConfig('index','首页')),
		new htmlWebpackPlugin(getHtmlConfig('list','商品列表页')),
		new htmlWebpackPlugin(getHtmlConfig('detail','商品详情页')),
		new htmlWebpackPlugin(getHtmlConfig('result','操作结果')),
		new htmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
		new htmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
		new htmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
		new htmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
		new htmlWebpackPlugin(getHtmlConfig('user-center','用户中心')),
		new htmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息'))
	],

	resolve : {
		alias: {
			node_modules : 	path.resolve(__dirname, 'node_modules/'),
			util : 			path.resolve(__dirname, 'src/util/'),
			page : 			path.resolve(__dirname, 'src/page/'),
			image : 		path.resolve(__dirname, 'src/image/'),
			service : 		path.resolve(__dirname, 'src/service/')
		}
	},

	module: {
		rules: [
		{	/*css规则，postcss兼容处理，然后css，最后style*/
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
		{	/*普通文件处理:小于100时转化为base64编码*/
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
		},
		{	
			test : /\.string$/,
			use : [{loader: 'html-loader'}]
		}]
	}

}

if(WEBPACK_ENV === 'dev' ) {
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports=config;