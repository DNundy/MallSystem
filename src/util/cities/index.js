/*
* @Author: Administrator
* @Date:   2017-09-01 08:56:47
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-01 09:11:17
*/
var _cities = {
	cityInfo : {
		'北京':['北京'],
		'上海':['北京'],
		'陕西':['北京'],
		'山西':['北京'],
		'杭州':['杭州1','杭州2']
	},
	getProvinces : function () {
		var provinces = [];
		for(var item in this.cityInfo){
			provinces.push(item);
		}
		return provinces;
	},
	getCities : function (provinceName) {
		return this.cityInfo[provinceName] || [];
	}
}
module.exports = _cities;