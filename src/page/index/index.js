/*
* @Author: Administrator
* @Date:   2017-08-03 17:54:30
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-05 19:49:10
*/

'use strict';
require('./index.css');
require('page/common/header/index.js');
require('util/slider/index.js');
require('page/common/nav/index.js');
var _cart           = require('service/cart-service.js');
var _user           = require('service/user-service.js');
var navSide         = require('page/common/nav-side/index.js');
var templateBanner  = require('./banner.string');
var _mm             = require('util/util.js');

$(function() {
    // 渲染banner的html
    var bannerHtml  = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 初始化banner
    var $slider     = $('.banner').unslider({
        dots: true
    });
});