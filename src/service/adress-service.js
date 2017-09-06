/*
* @Author: Administrator
* @Date:   2017-08-31 09:57:43
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-04 12:33:31
*/
'use strict';
var _mm = require('util/util.js');
var _address = {
    getAddressList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/list.do'),
            data 	: {
            	pageSize : 50
            },
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
    save :function(addressInfo,resolve, reject) {
        _mm.request({
            url     : _mm.getServerUrl('/shipping/add.do'),
            data    : addressInfo,
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
    update :function(addressInfo,resolve, reject) {
        _mm.request({
            url     : _mm.getServerUrl('/shipping/update.do'),
            data    : addressInfo,
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
    deleteAddress :function (shippingId,resolve,reject) {
        _mm.request({
            url     : _mm.getServerUrl('/shipping/del.do'),
            data    : {
                shippingId : shippingId
            },
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
    getAddress :function(shippingId,resolve, reject) {
        _mm.request({
            url     : _mm.getServerUrl('/shipping/select.do'),
            data    : {
                shippingId: shippingId
            },
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _address;