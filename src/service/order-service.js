/*
* @Author: Administrator
* @Date:   2017-08-30 21:39:24
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-04 12:32:33
*/
'use strict';
var _mm = require('util/util.js');
var _order = {
    getProductList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/get_order_cart_product.do'),
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
    creatOrder : function(orderInfo,resolve, reject) {
    	_mm.request({
            url     : _mm.getServerUrl('/order/create.do'),
            data 	: orderInfo,
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
    getOrderList :function (listParam,resolve, reject) {
        _mm.request({
            url     : _mm.getServerUrl('/order/list.do'),
            data    : listParam,
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
    getOrderDetail :function (orderNumber,resolve, reject) {
        _mm.request({
            url     : _mm.getServerUrl('/order/detail.do'),
            data    : {
                orderNo : orderNumber
            },
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
    cancelOrder:function (orderNumber,resolve, reject) {
        _mm.request({
            url     : _mm.getServerUrl('/order/cancel.do'),
            data    : {
                orderNo : orderNumber
            },
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _order;