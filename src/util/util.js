/*
* @Author: Administrator
* @Date:   2017-08-04 15:36:21
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-23 21:10:14
*/

'use strict';

var Hogan = require('hogan.js');

var conf = {
	serverHost : ''
};

var _mm = {
	//网络请求接口
	request : function(param) {
		var _this = this;
		$.ajax({
			type 		: param.method 		|| 		'get',
			url 		: param.url 		|| 		'',
			dataType 	: param.type 		||		'json',
			data 		: param.data 		||		'',

			success		: function (res) {
				//请求成功，返回数据与提示信息
				if( res.status === 0 ){
					typeof param.success === 'function' && param.success(res.data,res.msg);
				}
				//请求错误，返回提示信息
				else if( res.status === 1 ){
					typeof param.error === 'function' && param.error(res.msg);
				}
				//没有登陆状态，强制登录
				else if( res.status === 10 ){
					_this.doLogin();
				}
			},

			error 		: function(err) {
				typeof param.error === 'function' && param.error(err.statusText);
			}
		})
	},

	//渲染html模板
	renderHtml : function (htmlTemplate,data) {
		var temp 	= Hogan.compile(htmlTemplate);
		var result 	= temp.render(data);
		return result;
	},

	//获取服务器地址
	getServerUrl : function (path) {
		return conf.serverHost + path;
	},

	//获取URL参数
	getUrlParam : function (name) {
		var reg 	= new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result	= window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null ;
	},

	//跳转登录接口
	doLogin : function () {
		window.location.href = './user-login.html?redirect='+ encodeURIComponent(window.location.href);
	},

	//跳转主页接口
	goHome : function () {
		window.location.href = './index.html';
	},

	//成功提示
	successTips : function (msg) {
		alert( msg || '操作成功！' );
	},

	//错误提示
	errorTips : function (msg) {
		alert( msg || '额哦，出错了！' );
	},

	//字段验证
	valiData : function (value,type) {
		var value = $.trim(value);

		if(type === 'require'){
			return !!value;
		}

		if('phone' === type){
			return /^1\d{10}$/.test(value);
		}

		if('email' === type){
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	}
}

module.exports=_mm;