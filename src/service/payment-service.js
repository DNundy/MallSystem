/*
* @Author: Administrator
* @Date:   2017-09-03 13:51:10
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-04 12:32:14
*/
'use strict';
var _mm = require('util/util.js');
var _payment = {
    getPaymentInfo : function(orderNumber,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/pay.do'),
            data 	: {
            	orderNo : orderNumber
            },
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
    getPaymentStatus : function(orderNumber,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/query_order_pay_status.do'),
            data 	: {
            	orderNo : orderNumber
            },
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _payment;