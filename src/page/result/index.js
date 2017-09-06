/*
* @Author: Administrator
* @Date:   2017-08-05 13:44:23
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-03 14:05:19
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/util.js');

$(function(){
    var type        = _mm.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    if(type === 'payment'){
    	var orderNumber = _mm.getUrlParam('orderNumber');
    	var $orderNumber = $element.find('order-number');
    	$orderNumber.attr('href',$orderNumber.attr('href')+orderNumber);
    }
    $element.show();
})