/*
* @Author: Administrator
* @Date:   2017-08-30 21:34:42
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-01 14:28:49
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm             	= require('util/util.js');
var _order          	= require('service/order-service.js');
var _address            = require('service/adress-service.js');
var addressModal        = require('./address-modal.js');
var templateProduct   	= require('./product-list.string');
var templateAddress   	= require('./address-list.string');

var page = {
    data : {
    	selectedAddressId : null
    },
    init : function() {
    	this.onload();
    	this.bindEvent();
    },
    onload : function() {
    	this.loadAddressList();
    	this.loadProductList();
    },
    bindEvent : function() {
    	var _this = this;
    	$(document).on('click', '.address-item', function(){
    		$(this).addClass('active').siblings('.address-item').removeClass('active');
    		_this.data.selectedAddressId = $(this).data('id');
    	});
    	$(document).on('click', '.order-submit', function(){
    		var shippingId = _this.data.selectedAddressId;
    		if(shippingId){
    			_order.creatOrder({
    				shippingId : shippingId
    			},function(res) {
    				window.location.href='./payment.html?orderNumber='+res.orderNo;
    			},function(errMsg) {
    				_mm.errorTips(errMsg);
    			});
    		}
    		else{
    			_mm.errorTips('请选择地址后提交');
    		}
    	});
        $(document).on('click', '.address-add', function(){
            addressModal.show({
                isUpdate : false,
                onSuccess : function () {
                    _this.loadAddressList();
                }
            });
        });
        $(document).on('click', '.address-update', function(e){
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId,function(res) {
                addressModal.show({
                    isUpdate : true,
                    data: res,
                    onSuccess : function () {
                        _this.loadAddressList();
                    }
                });
            },function(errMsg) {
                _mm.errorTips(errMsg);
            })
        });
        $(document).on('click', '.address-delete', function(e){
            e.stopPropagation();
            var id = $(this).parents('.address-item').data('id');
            if(window.confirm('确认删除？')){
                _address.deleteAddress(id,function () {
                    _this.loadAddressList();
                },function (errMsg) {
                    _mm.errorTips(errMsg);
                })
            }
        });
    },
    loadAddressList : function() {
    	var _this = this;
        $('.address-con').html('<div class="loading"></div>');
    	_address.getAddressList(function(res) {
            _this.addressFilter(res);
    		var addressListHtml = _mm.renderHtml(templateAddress,res);
    		$('.address-con').html(addressListHtml);
    	},function(errMsg) {
			$('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试！</p>');
    	})
    },
    addressFilter : function (data) {
        if(this.data.selectedAddressId){
            var selectedAddressIdFlag=false;
            for(var i=0,length=data.list.length;i<length;i++){
                if(data.list[i].id === this.data.selectedAddressId){
                    data.list[i].isActive = true;
                    selectedAddressIdFlag = true;
                }
            }
            if(!selectedAddressIdFlag){
                this.data.selectedAddressId = null;
            }
        }
    },
    loadProductList : function() {
    	var _this = this;
        $('.product-con').html('<div class="loading"></div>');
    	_order.getProductList(function(res) {
    		var productListHtml = _mm.renderHtml(templateProduct,res);
    		$('.product-con').html(productListHtml);
    	},function(errMsg) {
			$('.product-con').html('<p class="err-tip">商品信息加载失败，请刷新后重试！</p>');
    	})
    }
}
$(function(){
    page.init();
})