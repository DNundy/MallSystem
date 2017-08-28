/*
* @Author: Administrator
* @Date:   2017-08-05 13:44:23
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-05 13:58:53
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/util.js');

$(function(){
    var type        = _mm.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    $element.show();
})