/*
* @Author: Administrator
* @Date:   2017-09-01 17:55:15
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-03 13:13:29
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/util.js');
var _order          = require('service/order-service.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    data:{
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        navSide.init({
            name: 'order-detail'
        });
        this.loadDetail();
    },
    bindEvent :function (){
        var _this=this;
        $(document).on('click','.order-cancel',function() {
            if(window.confirm('确认取消？')){
                _order.cancelOrder(_this.data.orderNumber,function(res) {
                    _mm.successTips('取消成功');
                    _this.loadDetail();
                },function(errMsg) {
                    _mm.errorTips(errMsg);
                });
            }
            else{
                return;
            }
        })
    },
    loadDetail:function() {
        var _this=this;
        var orderDetailHtml = '';
        var $content=$('.content');
        $content.html('<div class="loading"><div>');
        _order.getOrderDetail(this.data.orderNumber,function(res) {
            _this.dataFilter(res);
            orderDetailHtml=_mm.renderHtml(templateIndex,res);
            $content.html(orderDetailHtml);
        },function(errMsg) {
            $listCon.html('<p class="err-tips">加载订单失败</p>')
        });
    },
    dataFilter : function (data) {
        data.needPay        = data.status == 10;
        data.isCancelable   = data.status == 10;
    }
};
$(function(){
    page.init();
});