/*
* @Author: Administrator
* @Date:   2017-09-03 13:34:50
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-03 13:57:41
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/util.js');
var _payment        = require('service/payment-service.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    data:{
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        this.loadPaymentInfo();
    },
    loadPaymentInfo:function() {
        var _this=this;
        var paymentHtml = '';
        var $pageWrap=$('.page-wrap');
        $pageWrap.html('<div class="loading"><div>');
        _payment.getPaymentInfo(this.data.orderNumber,function(res) {
            paymentHtml=_mm.renderHtml(templateIndex,res);
            $pageWrap.html(paymentHtml);
            _this.listenOrderStatus();
        },function(errMsg) {
            $pageWrap.html('<p class="err-tips">'+errMsg+'</p>')
        });
    },
    listenOrderStatus:function () {
    	var _this=this;
    	this.paymentTimet = window.setInterval(function() {
    		_payment.getPaymentStatus(_this.data.orderNumber,function(res) {
    			if(res == true){
    				window.location.href = './result.html?type=payment&orderNumber='+_this.data.orderNumber;
    			}
    		})
    	},5e3)
    }
};
$(function(){
    page.init();
});