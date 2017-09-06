/*
* @Author: Administrator
* @Date:   2017-09-01 14:31:25
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-03 11:54:23
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/util.js');
var _order          = require('service/order-service.js');
var Pagination      = require('util/pagination/index.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    data:{
        listParam :{
            pageNum     : 1,
            pageSize    : 3
        }
    },
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        this.loadOrderList();
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
    },
    loadOrderList:function() {
        var _this=this;
        var orderListHtml = '';
        var $listCon=$('.order-list-con');
        $listCon.html('<div class="loading"><div>')
        _order.getOrderList(this.data.Param,function(res) {
            orderListHtml=_mm.renderHtml(templateIndex,res);
            $listCon.html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        },function(errMsg) {
            $listCon.html('<p class="err-tips">加载订单失败</p>')
        });
    },
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
};
$(function(){
    page.init();
});