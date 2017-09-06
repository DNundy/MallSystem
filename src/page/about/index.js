/*
* @Author: Administrator
* @Date:   2017-09-03 14:41:08
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-04 21:48:43
*/
'use strict';
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide         = require('page/common/nav-side/index.js');
var page = {
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        navSide.init({
            name: 'about'
        });
    }
};
$(function(){
    page.init();
});