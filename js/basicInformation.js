/*
 * 代码创建人：何丹丹
 *创建时间：2018-10-10
 * 创建内容描述：基本信息模块
 */

var loadQueryUsers, loadQueryRoles, loadQueryGoods, loadWarehouse, loadArea, loadQueryPosition;
$(function() {
	//点击用户管理，对应的类名为.M-box的分页显示，其他隐藏，其他管理类似
	$('#M-box').click(function() {
		data.pageIndex = 1;
		load1()
		$('.M-box').show();
		$('.M-box').siblings().hide();
	})
	/*$('#M-box1').click(function() {
		data2.pageIndex = 1;
		load2()
		$('.M-box1').show();
		$('.M-box1').siblings().hide();
	})*/
	$('#M-box2').click(function() {
		data3.pageIndex = 1;
		load3()
		$('.M-box2').show();
		$('.M-box2').siblings().hide();
	})
	$('#M-box3').click(function() {
		data4.pageIndex = 1;
		load4()
		$('.M-box3').show();
		$('.M-box3').siblings().hide();
	})
	$('#M-box4').click(function() {
		data5.pageIndex = 1;
		load5()
		$('.M-box4').show();
		$('.M-box4').siblings().hide();
		clearArea()
	})
	$('#M-box5').click(function() {
		data6.pageIndex = 1;
		load6()
		loadareaNo()
		$('.M-box5').show();
		$('.M-box5').siblings().hide();
	})
	/* 
	 * 分页查询部分
	 */
	//用户管理--分页查询
	var data = {
		"pageIndex": 1,
		"recordCount": 10,
		"criteria": {
			"username": searchUser
		}
	}

	function load1() { //点击用户管理页面加载表格数据		
		//alert(11)
		$.ajax({
			type: 'post',
			url: ipAddress + '/user/queryUsers.do',
			data: JSON.stringify(data),
			contentType: 'application/json;charset=UTF-8',
			success: function(result) {
				//console.log(result)
				if(result.data.length == 0) { //如果表格中用户全部删除完毕，自动跳转到前一页
					data.pageIndex -= 1
					$('#searchUser').val("");
//						$('#searchUserBtn').trigger("click");
					if(data.pageIndex != 0) { //如果是第一页的话，不要加载数据，如果是后面的页数，跳转到前一页后要重新加载渲染数据到页面
						$('#searchUser').val("");
						//$('#searchUserBtn').trigger("click");
						load1();
					}
				}
				$("#mytable1 tbody tr").remove();
				pageIndex = result.currentPage; //记录页数为当前页
				for(var i = 0; i < result.data.length; i++) {
					var html1 = '<tr>' +
						'<td>' + '<input type="hidden" value="' + result.data[i].userNo + '"  />' + (pageIndex * 10 - 9 + i) +
						'</td>' +
						'<td>' + result.data[i].userNo +
						'</td>' +
						'<td>' + result.data[i].username +
						'</td>' +
						'<td>' + result.data[i].roleName +
						'</td>' +
						'<td>' + result.data[i].phone +
						'</td>' +
						'<td>' + result.data[i].email +
						'</td>' +
						'<td>' + result.data[i].remark +
						'</td>' +
						'<td>' + '<a class="btn btn-primary" data-toggle="modal" data-target="#editor1" style="outline: none;" onclick="editorUser(this,' + result.data[i].userNo + ')">编辑</a>' +
						'<a class="btn btn-danger" onclick="myDelete(this)" data-toggle="modal" data-target="#delete1" style="outline: none;     margin-left: 10px;"  >删除</a>' +
						'</td>' +
						'</tr>'
					$('#mytable1 tbody').append(html1)
				}
				//分页
				$('.M-box').pagination({
					pageCount: result.totalPage, //总页码
					jump: true, //是否开启跳转，true是开启
					coping: true, //是否开启首页和末页，此处开启
					homePage: '首页',
					endPage: '末页',
					prevContent: '上页',
					nextContent: '下页',
					current: data.pageIndex, //当前页码
					callback: function(api) { //这是一个回调函数					
						data.pageIndex = api.getCurrent();
						$.ajax({
							type: 'post',
							url: ipAddress + '/user/queryUsers.do',
							data: JSON.stringify(data),
							contentType: 'application/json;charset=UTF-8',
							success: function(result) {
								//data.pageIndex=result.
								if(result.data.length == 0) {
									data.pageIndex -= 1
									if(data.pageIndex != 0) {
										//load1();
									}
								}
								data.pageIndex = result.currentPage;
								$("#mytable1 tbody tr").remove();
								$('#mytable1 tbody').html('');
								for(var i = 0; i < result.data.length; i++) {
									var html = '<tr>' +
										'<td>' + '<input type="hidden" value="' + result.data[i].userNo + '"  />' + (data.pageIndex * 10 - 9 + i) +
										'</td>' +
										'<td>' + result.data[i].userNo +
										'</td>' +
										'<td>' + result.data[i].username +
										'</td>' +
										'<td>' + result.data[i].roleName +
										'</td>' +
										'<td>' + result.data[i].phone +
										'</td>' +
										'<td>' + result.data[i].email +
										'</td>' +
										'<td>' + result.data[i].remark +
										'</td>' +
										'<td>' + '<a class="btn btn-primary" data-toggle="modal" data-target="#editor1" style="outline: none;" onclick="editorUser(this,' + result.data[i].userNo + ')">编辑</a>' +
										'<a class="btn btn-danger" onclick="myDelete(this)" data-toggle="modal" data-target="#delete1" style="outline: none;margin-left: 10px;" >删除</a>' +
										'</td>' +
										'</tr>'
									$('#mytable1 tbody').append(html)
								}
							},
							error: function() {
								alert('没有找到对应的结果！')
							}
						})
					}
				});
			},
			error: function() {
				alert('没有找到对应的结果！')
			}
		})

	}
	loadQueryUsers = load1;
	load1()
	//物品管理分页查询
	var data3 = {
		"pageIndex": 1,
		"recordCount": 10,
		"criteria": {
			"productName": searchGoods
		}
	}

	function load3() {
		$.ajax({
			type: 'post',
			url: ipAddress + '/product/queryGoods.do',
			data: JSON.stringify(data3),
			contentType: 'application/json;charset=UTF-8',
			success: function(result) {
				console.log(result)
				if(result.data.length == 0) {
					data3.pageIndex -= 1
$('#searchGoods').val("");
						//$('#searchGoodsBtn').trigger("click");
					if(data3.pageIndex != 0) {
						$('#searchGoods').val("");
						//$('#searchGoodsBtn').trigger("click");
						load3();
					}

				}
				$("#mytable3 tbody tr").remove();
				data3.pageIndex = result.currentPage;
				for(var i = 0; i < result.data.length; i++) {
					var html = '<tr>' +
						'<td>' + '<input type="hidden" value="' + result.data[i].productNo + '"  />' + (data3.pageIndex * 10 - 9 + i) +
						'</td>' +
						'<td>' + result.data[i].productNo +
						'</td>' +
//						'<td>' + result.data[i].productName +
//						'</td>' +
						'<td>' + result.data[i].productName +
						'</td>' +
					
						'<td>' + result.data[i].formatNo +
						'</td>' +
						'<td>' + result.data[i].unit +
						'</td>' +
						'<td>' + (result.data[i].remark==null?'':result.data[i].remark) +
						'</td>' +
						'<td>' +
						'<a class="btn btn-primary" data-toggle="modal" data-target="#editorGoods" style="outline: none;" onclick="editorGoods(this,' + result.data[i].productNo + ')">编辑</a>' +
						'<a class="btn btn-danger" onclick="myDelete(this)" data-toggle="modal" data-target="#delete3" style="outline: none;  margin-left: 10px;">删除</a>' +
						'</td>' +
						'</tr>'
					$('#mytable3 tbody').append(html)
				}
				//分页
				$('.M-box2').pagination({
					pageCount: result.totalPage, //总页码
					jump: true, //是否开启跳转，true是开启
					coping: true, //是否开启首页和末页，此处开启
					homePage: '首页',
					endPage: '末页',
					prevContent: '上页',
					nextContent: '下页',
					current: data3.pageIndex, //当前页码
					callback: function(api) { //这是一个回调函数
						data3.pageIndex = api.getCurrent();
						$.ajax({
							type: 'post',
							url: ipAddress + '/product/queryGoods.do',
							data: JSON.stringify(data3),
							contentType: 'application/json;charset=UTF-8',
							success: function(result) {
								console.log(result)
								if(result.data.length == 0) {
									data3.pageIndex -= 1

									if(data3.pageIndex != 0) {
										load3();
									}

								}
								data3.pageIndex = result.currentPage;
								$("#mytable3 tbody tr").remove();
								$('#mytable3 tbody').html('');
								for(var i = 0; i < result.data.length; i++) {
									var html = '<tr>' +
										'<td>' + '<input type="hidden" value="' + result.data[i].productNo + '"  />' + (data3.pageIndex * 10 - 9 + i) +
										'</td>' +
										'<td>' + result.data[i].productNo +
										'</td>' +
//										'<td>' + result.data[i].productName +
//										'</td>' +
										'<td>' + result.data[i].productName +
										'</td>' +
										
										'<td>' + result.data[i].formatNo +
										'</td>' +
										'<td>' + result.data[i].unit +
										'</td>' +
										'<td>' + (result.data[i].remark==null?'':result.data[i].remark) +
										'</td>' +
										'<td>' +
										'<a class="btn btn-primary" data-toggle="modal" data-target="#editorGoods" style="outline: none;" onclick="editorGoods(this,' + result.data[i].productNo + ')">编辑</a>' +
										'<a class="btn btn-danger" onclick="myDelete(this)" data-toggle="modal" data-target="#delete3" style="outline: none;  margin-left: 10px;">删除</a>' +
										'</td>' +
										'</tr>'
									$('#mytable3 tbody').append(html)
								}

							},
							error: function() {
								alert('没有找到对应的结果！')
							}

						})

					}

				});
			},
			error: function() {
				alert('没有找到对应的结果！')
			}

		})
	}
	loadQueryGoods = load3;
	//仓库管理分页查询
	var data4 = {
		"pageIndex": 1,
		"recordCount": 10,
		"criteria": {
			"warehouseName": searchWarehouse
		}
	}

	function load4() {
		$.ajax({
			type: 'post',
			url: ipAddress + '/warehouse/queryWarehouse.do',
			data: JSON.stringify(data4),
			contentType: 'application/json;charset=UTF-8',
			success: function(result) {
				//console.log(result)
				if(result.data.length == 0) {					
					data4.pageIndex -= 1
					$('#searchWarehouse').val("");
						//$('#searchWarehouseBtn').trigger("click");
					if(data4.pageIndex != 0) {
						$('#searchWarehouse').val("");
						//$('#searchWarehouseBtn').trigger("click");
						load4();
					}
				}
				$("#mytable5 tbody tr").remove();
				data4.pageIndex = result.currentPage;

				//			console.log(result.totalPage)
				for(var i = 0; i < result.data.length; i++) {
					var html = '<tr>' +
						'<td>' + '<input type="hidden" value="' + result.data[i].warehouseNo + '"  />' + (data4.pageIndex *10 - 9 + i) +
						'</td>' +
						'<td>' + result.data[i].warehouseNo +
						'</td>' +
						'<td>' + result.data[i].warehouseName +
						'</td>' +
						'<td>' + result.data[i].remark +
						'</td>' +
						'<td>' +
						'<a class="btn btn-primary" data-toggle="modal" data-target="#editorStore" style="outline: none;"onclick="editorWarehouse(this,' + result.data[i].warehouseNo + ')">编辑</a>' +
						'<a class="btn btn-danger" onclick="myDelete(this)" data-toggle="modal" data-target="#delete4" style="outline: none;margin-left: 10px;">删除</a>' +
						'</td>' +
						'</tr>'
					$('#mytable5 tbody').append(html)
				}
				//			//分页
				$('.M-box3').pagination({
					pageCount: result.totalPage, //总页码
					jump: true, //是否开启跳转，true是开启
					coping: true, //是否开启首页和末页，此处开启
					homePage: '首页',
					endPage: '末页',
					prevContent: '上页',
					nextContent: '下页',
					current: data4.pageIndex, //当前页码
					callback: function(api) { //这是一个回调函数
						data4.pageIndex = api.getCurrent();
						$.ajax({
							type: 'post',
							url: ipAddress + '/warehouse/queryWarehouse.do',
							data: JSON.stringify(data4),
							contentType: 'application/json;charset=UTF-8',
							success: function(result) {
								if(result.data.length == 0) {
									data4.pageIndex -= 1
									if(data4.pageIndex != 0) {
										load4();
									}
								}
								data4.pageIndex = result.currentPage;
								$("#mytable5 tbody tr").remove();
								$('#mytable5 tbody').html('');
								//console.log(result)
								//console.log(result.totalPage)						
								for(var i = 0; i < result.data.length; i++) {
									var html = '<tr>' +
										'<td>' + '<input type="hidden" value="' + result.data[i].warehouseNo + '"  />' + (data4.pageIndex * 10 - 9 + i) +
										'</td>' +
										'<td>' + result.data[i].warehouseNo +
										'</td>' +
										'<td>' + result.data[i].warehouseName +
										'</td>' +
										'<td>' + result.data[i].remark +
										'</td>' +
										'<td>' +
										'<a class="btn btn-primary" data-toggle="modal" data-target="#editorStore" style="outline: none;"onclick="editorWarehouse(this,' + result.data[i].warehouseNo + ')">编辑</a>' +
										'<a class="btn btn-danger" onclick="myDelete(this)" data-toggle="modal" data-target="#delete4" style="outline: none;margin-left: 10px;">删除</a>' +
										'</td>' +
										'</tr>'
									$('#mytable5 tbody').append(html)
								}

							},
							error: function() {
								alert('没有找到对应的结果！')
							}

						})

					}

				});
			},
			error: function() {
				alert('没有找到对应的结果！')
			}

		})
	}
	loadWarehouse = load4;
	//库区管理分页查询
	var data5 = {
		"pageIndex": 1,
		"recordCount": 10,
		"criteria": {
			"areaName": searchQueryarea
		}
	}

	function load5() {
		$.ajax({
			type: 'post',
			url: ipAddress + '/area/queryArea.do',
			data: JSON.stringify(data5),
			contentType: 'application/json;charset=UTF-8',
			success: function(result) {
				//console.log(result)
				if(result.data.length == 0) {
					
					data5.pageIndex -= 1
						$('#searchQueryarea').val("");
						//$('#searchQueryareaBtn').trigger("click");
					if(data5.pageIndex != 0) {
						$('#searchQueryarea').val("");
						//$('#searchQueryareaBtn').trigger("click");
						load5();
					}
				}
				$("#mytable6 tbody tr").remove();
				data5.pageIndex = result.currentPage;

				//			console.log(result.totalPage)
				for(var i = 0; i < result.data.length; i++) {
					var html = '<tr>' +
						'<td>' + '<input type="hidden" value="' + result.data[i].areaId + '"  />' + (data5.pageIndex * 10 - 9 + i) +
						'</td>' +
						'<td>' + result.data[i].areaNo +
						'</td>' +
						'<td>' + result.data[i].areaName +
						'</td>' +
						'<td>' + result.data[i].remark +
						'</td>' +
						'<td>' +
						'<a class="btn btn-primary" data-toggle="modal" data-target="#editorReservoir" style="outline: none;"onclick="editorArea(this,' + result.data[i].areaId + ')">编辑</a>' +
						'<a class="btn btn-danger" onclick="myDelete(this)" data-toggle="modal" data-target="#delete5" style="outline: none;margin-left: 10px;">删除</a>' +
						'</td>' +
						'</tr>'
					$('#mytable6 tbody').append(html)
				}
				//			//分页
				$('.M-box4').pagination({
					pageCount: result.totalPage, //总页码
					jump: true, //是否开启跳转，true是开启
					coping: true, //是否开启首页和末页，此处开启
					homePage: '首页',
					endPage: '末页',
					prevContent: '上页',
					nextContent: '下页',
					current: data5.pageIndex, //当前页码
					callback: function(api) { //这是一个回调函数
						data5.pageIndex = api.getCurrent();
						$.ajax({
							type: 'post',
							url: ipAddress + '/area/queryArea.do',
							data: JSON.stringify(data5),
							contentType: 'application/json;charset=UTF-8',
							success: function(result) {
								if(result.data.length == 0) {
									data5.pageIndex -= 1
									if(data5.pageIndex != 0) {
										load5();
									}
								}
								data5.pageIndex = result.currentPage;
								$("#mytable6 tbody tr").remove();
								$('#mytable6 tbody').html('');
								//console.log(result)						
								for(var i = 0; i < result.data.length; i++) {
									var html = '<tr>' +
										'<td>' + '<input type="hidden" value="' + result.data[i].areaId + '"  />' + (data5.pageIndex * 10 - 9 + i) +
										'</td>' +
										'<td>' + result.data[i].areaNo +
										'</td>' +
										'<td>' + result.data[i].areaName +
										'</td>' +
										'<td>' + result.data[i].remark +
										'</td>' +
										'<td>' +
										'<a class="btn btn-primary" data-toggle="modal" data-target="#editorReservoir" style="outline: none;"onclick="editorArea(this,' + result.data[i].areaId + ')">编辑</a>' +
										'<a class="btn btn-danger" onclick="myDelete(this)" data-toggle="modal" data-target="#delete5" style="outline: none;margin-left: 10px;">删除</a>' +
										'</td>' +
										'</tr>'
									$('#mytable6 tbody').append(html)
								}

							},
							error: function() {
								alert('没有找到对应的结果！')
							}

						})

					}

				});
			},
			error: function() {
				alert('没有找到对应的结果！')
			}

		})
	}
	loadArea = load5;
	//货位管理分页查询
	var data6 = {
		"pageIndex": 1,
		"recordCount": 10,
		"criteria": {
			"allocationName": searchQueryPosition
		}
	}

	function load6() {
		$.ajax({
			type: 'post',
			url: ipAddress + '/position/queryPositions.do',
			data: JSON.stringify(data6),
			contentType: 'application/json;charset=UTF-8',
			success: function(result) {
				console.log(result)
				if(result.data.length == 0) {
					data6.pageIndex -= 1
					$('#searchQueryPosition').val("");
						//$('#searchQueryPositionBtn').trigger("click");
					if(data6.pageIndex != 0) {
						$('#searchQueryPosition').val("");
						//$('#searchQueryPositionBtn').trigger("click");
						load6();
					}
				}
				$("#mytable7 tbody tr").remove();
				data6.pageIndex = result.currentPage;
				//console.log(result.totalPage)
				for(var i = 0; i < result.data.length; i++) {
					var html = '<tr>' +
						'<td>' + '<input type="hidden" value="' + result.data[i].allocationId + '"  />' + (data6.pageIndex * 10 - 9 + i) +
						'</td>' +
						'<td>' + result.data[i].allocationNo +
						'</td>' +
//						'<td>' + result.data[i].allocationFormat +
//						'</td>' +
						'<td>' + (result.data[i].allocationNumber==null?'0':result.data[i].allocationNumber) +
						'</td>' +
						'<td>' + result.data[i].remark +
						'</td>' +
						'<td>' +
						'<a class="btn btn-primary" data-toggle="modal" data-target="#editorLocation" style="outline: none;" onclick="editorPosition(this,' + result.data[i].allocationId + ')">编辑</a>' +
						'<a class="btn btn-danger" onclick="myDelete(this)" data-toggle="modal" data-target="#delete6" style="outline: none;margin-left: 10px;">删除</a>' +
						'</td>' +
						'</tr>'
					$('#mytable7 tbody').append(html)
				}
				//			//分页
				$('.M-box5').pagination({
					pageCount: result.totalPage, //总页码
					jump: true, //是否开启跳转，true是开启
					coping: true, //是否开启首页和末页，此处开启
					homePage: '首页',
					endPage: '末页',
					prevContent: '上页',
					nextContent: '下页',
					current: data6.pageIndex, //当前页码
					callback: function(api) { //这是一个回调函数
						data6.pageIndex = api.getCurrent();
						$.ajax({
							type: 'post',
							url: ipAddress + '/position/queryPositions.do',
							data: JSON.stringify(data6),
							contentType: 'application/json;charset=UTF-8',
							success: function(result) {
								if(result.data.length == 0) {
									data6.pageIndex -= 1
									if(data6.pageIndex != 0) {
										load6();
									}
								}
								data6.pageIndex = result.currentPage;
								$("#mytable7 tbody tr").remove();
								$('#mytable7 tbody').html('');
								//console.log(result)						
								for(var i = 0; i < result.data.length; i++) {
									var html = '<tr>' +
										'<td>' + '<input type="hidden" value="' + result.data[i].allocationId + '"  />' + (data6.pageIndex * 10 - 9 + i) +
										'</td>' +
										'<td>' + result.data[i].allocationNo +
										'</td>' +
//										'<td>' + result.data[i].allocationFormat +
//										'</td>' +
										'<td>' + (result.data[i].allocationNumber==null?'0':result.data[i].allocationNumber) +
										'</td>' +
										'<td>' + result.data[i].remark +
										'</td>' +
										'<td>' +
										'<a class="btn btn-primary" data-toggle="modal" data-target="#editorLocation" style="outline: none;"onclick="editorPosition(this,' + result.data[i].allocationId + ')">编辑</a>' +
										'<a class="btn btn-danger" onclick="myDelete(this)" data-toggle="modal" data-target="#delete6" style="outline: none;margin-left: 10px;">删除</a>' +
										'</td>' +
										'</tr>'
									$('#mytable7 tbody').append(html)
								}

							},
							error: function() {
								alert('没有找到对应的结果！')
							}

						})

					}

				});
			},
			error: function() {
				alert('没有找到对应的结果！')
			}

		})
	}
	loadQueryPosition = load6;
	/*
 模糊查询部分
 */
	//用户管理--用户名查询
	var searchUser ;
	$('#searchUserBtn').off("click").on("click",function() {
		searchUser =$('#searchUser').val();
			
			data.criteria.username = searchUser;
			data.pageIndex = 1
			loadQueryUsers();
	})
	//物品管理--物品查询
	var searchGoods = '';
	$('#searchGoodsBtn').click(function() {
		searchGoods = $('#searchGoods').val();
		data3.criteria.productName = searchGoods;
		data3.pageIndex = 1
		loadQueryGoods();
	})
	//仓库管理--仓库查询
	var searchWarehouse = '';
	$('#searchWarehouseBtn').click(function() {
		searchWarehouse = $('#searchWarehouse').val();
		data4.criteria.warehouseName = searchWarehouse;
		data4.pageIndex = 1
		loadWarehouse();
	})
	//库区管理--库区查询
	var searchQueryarea = '';
	$('#searchQueryareaBtn').click(function() {
		searchQueryarea = $('#searchQueryarea').val();
		data5.criteria.areaName = searchQueryarea;
		data5.pageIndex = 1
		loadArea();
	})
	//货位管理--货位查询
	var searchQueryPosition = '';
	$('#searchQueryPositionBtn').click(function() {
		searchQueryPosition = $('#searchQueryPosition').val();
		data6.criteria.allocationName = searchQueryPosition;
		data6.pageIndex = 1
		loadQueryPosition();
	})
})
/* 
 *删除部分 
 */
var deleteDate;

function myDelete(obj) {
	var $tds = $(obj).parent().parent().children(); // 获取到所有列
	var delete_id = $($tds[0]).children("input").val(); // 获取隐藏的ID
	deleteDate = delete_id; // 将模态框中需要删除的大修的ID设为需要删除的ID
 //console.log(deleteDate)
}
//用户管理--删除用户
function deleteQueryUsers() {
	$.ajax({
		type: "post",
		url: ipAddress + '/user/deleteUser.do',
		data: {
			"userNo": deleteDate
		},
		async: false,
		success: function(result) {
			//$("#searchUserBtn").click();
			loadQueryUsers();
		}
	});
}

//物品管理--删除物品
function deleteQueryGoods() {
	$.ajax({
		type: "post",
		url: ipAddress + '/product/deleteGood.do',
		data: {
			"productNo": deleteDate
		},
		async: false,
		success: function(result) {

			loadQueryGoods();
		}
	});
}
//仓库管理-删除仓库
function deleteWarehouse() {
	var warehouseNo = {
		"warehouseNo": deleteDate
	}
	$.ajax({
		type: "post",
		url: ipAddress + '/warehouse/deleteWarehouse.do',
		data: JSON.stringify(warehouseNo),
		async: false,
		contentType: 'application/json;charset=UTF-8',
		success: function(result) {
			//console.log(result)
			if(result.code == 5011) {
				alert(result.message)
			}
			loadWarehouse();
			loadwarehouseNo() //删除仓库后刷新库区中新增库区的下拉框
			loadwarehouseNo2()
		}
	});
}
//库区管理-删除库区
function deleteArea() {
	//alert(deleteDate)
	var areaId = {
		"areaId": deleteDate
	}
	$.ajax({
		type: "post",
		url: ipAddress + '/area/deleteArea.do',
		data: JSON.stringify(areaId),
		async: false,
		contentType: 'application/json;charset=UTF-8',
		success: function(result) {
			if(result.code == 5011) {
				alert(result.message)
			}
			//console.log(result)
			loadArea();
			loadareaNo() //刷新库区名称的下拉框
		}
	});
}
//货位管理-删除货位
function deletePosition() {
	$.ajax({
		type: "post",
		url: ipAddress + '/position/deletePosition.do',
		data: {
			"allocationId": deleteDate
		},
		async: false,
		success: function(result) {
			//console.log(result)		
				loadQueryPosition();						
		}
	});
}

/*
 * 新增部分
 */
//用户管理--新增用户
var userDepartment; //角色命名
loadUserDepartment()

function addUser() {
	var data = {
		"userNo": $('.userNo').val(),
		"username": $('.userName').val(),
		"password": $('.userPassword').val(),
		"roleId": userDepartment,
		"phone": $('.userPhone').val(),
		"email": $('.userEmail').val(),
		"remark": $('.userRemark').val(),
	}

	$.ajax({
		type: "post",
		url: ipAddress + '/user/register.do',
		data: JSON.stringify(data),
		async: true,
		contentType: 'application/json;charset=UTF-8',
		success: function(result) {
			//console.log(result)
			if(result.code == 1010) { //用户新增成功
				loadQueryUsers();
				//点击保存后数据清空
				clearUser()
			}
			if(result.code == 1002) { //用户已经存在
				alert(result.message)
				clearUser()
			}
		},
		error: function() {　　
			alert("用户保存失败");　　
		}
	});
};
//用户管理--新增用户--动态加载select下拉列表
function loadUserDepartment() {
	var data = {
		"pageIndex": 1,
		"criteria": {}
	}
	$('#userDepartment').html(""); //清空select列表数据
	$.ajax({
		type: "post",
		url: ipAddress + '/role/queryRoles.do',
		async: false,
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(data),
		success: function(result) {
			//console.log(result)
			$('#userDepartment').prepend("<option value='0' >请选择</option>") //添加第一个option值
			for(var i = 0; i < result.data.length; i++) {
				$('#userDepartment').append("<option value=" + result.data[i].id + ">" + result.data[i].roleName + "</option>")
			}
		}
	});
}
$('#userDepartment').on("change", function() {
 
	userDepartment = $(this).val()
})
//用户管理--新增用户--账号验证
function validateUserNo(userNo) {
	reg = /^[1-9][0-9]{4,10}$/; //5到11位数字
	if(userNo == '') {
		$('#spanUserNo').html("*账号不能为空");
		return false;
	}
	if(!reg.test(userNo)) {
		$('#spanUserNo').html("*账号输入格式有误,请重新输入");
		return false;
	}
	$('#spanUserNo').html("");
	return true;

}
//用户管理--新增用户--用户名验证
function validateUsername(username) {
	reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/; //姓名
	if(username == '') {
		$('#spanUsername').html('*用户名不能为空');
		return false;
	}
	if(!reg.test(username)) {
		$('#spanUsername').html("*用户名输入格式有误,请重新输入");
		return false;
	}
	$('#spanUsername').html("");
	//$("#saveUser").removeAttr('disabled')
	return true;
}
//用户管理--新增用户--账号或者用户名有一个为空保存不能点击
function unSaveUser() {
	var reg1 = /^[1-9][0-9]{4,10}$/; //5到11位数字
	var reg2 = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/; //姓名
	if($('.userNo').val() != '' && $('.userName').val() != '' && reg1.test($('.userNo').val()) && reg2.test($('.userName').val())) {
		$("#saveUser").removeAttr('disabled')
	} else {
		$("#saveUser").attr('disabled', 'disabled')
	}
}
//用户管理--新增用户--账号失去焦点
$('.userNo').blur(function() {
	var userNo = $('.userNo').val();
	validateUserNo(userNo)
	unSaveUser()
})
//用户管理--新增用户--用户名失去焦点
$('.userName').blur(function() {
	var username = $('.userName').val();
	validateUsername(username);
	unSaveUser()

})
//用户管理--新增用户--点击关闭按钮或者保存按钮清空数据
function clearUser() {
	$('.userNo').val("");
	$('.userName').val("");
	$('.userPhone').val("");
	$('.userEmail').val("");
	$('.userRemark').val("");
	loadUserDepartment() //下拉框重新刷新		
	$('#spanUserNo').html("*必填(5至11位 数字)");
	$('#spanUsername').html("*必填(用户姓名)");
	$("#saveUser").attr('disabled', 'disabled');
	//$("#newUser").modal('hide')
}

//物品管理--新增物品
function addGood() {
	var goods = {
		"productNo": $('.goodProductNo').val(), //物品编号
		"productName":  $('#goodDepartment').val(), //物品名称   
		"unit": $('.goodUnit').val(), //单位
		"remark": $('.goodRemark').val(), //备注
		
		"formatNo": $('.goodFormatNo').val(), //规格   
		
	}
	$.ajax({
		type: "post",
		url: ipAddress + '/product/insertGood.do',
		async: true,
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(goods),
		success: function(result) {
			console.log(result)
			if(result.code == 2010) { //新增成功
				loadQueryGoods() //新增成功刷新页面
				clearGood() //新增成功后再次点击新增原先数据清空
			}
		}
	});
}

//物品管理--新增物品--物品名称没有选择保存不能点击
function unSaveGood() {
	if($('#goodDepartment option:selected').val() != 0) {
		$("#saveGood").removeAttr('disabled');
		$('#spanProductName').html("")
	} else {
		$("#saveGood").attr('disabled', 'disabled');
		$('#spanProductName').html("*必选")
	}
}
//物品管理--新增物品--物品名称失去焦点
$('#goodDepartment').change(function() {
	//var productName = $('.productName').val();
	unSaveGood()
})

//物品管理--新增物品--点击关闭按钮或者保存按钮清空数据
function clearGood() {
	$('.goodProductName').val("");
	$('.goodUnit').val("");
	$('.goodRemark').val("");
	$('#goodDepartment').val("0");
	$('.goodFormatNo').val("");
	$('.goodResourceCategory').val("");
	$("#saveGood").attr('disabled', 'disabled');
	$('#spanProductName').html("*必选")
}
//仓库管理--新增仓库
function addWarehouse() {
	var warehouse = {
		"warehouseNo": $('.warehouseNo').val(),
		"warehouseName": $('.warehouseName').val(),
		"warehouseAddress": $('.warehouseAddress').val(),
		"remark": $('.warehouseRemark').val()
	}
	$.ajax({
		type: "post",
		url: ipAddress + '/warehouse/insertWarehouse.do',
		async: true,
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(warehouse),
		success: function(result) {
			console.log(result)
			if(result.code == 5010) {
				alert(result.message)
				clearWarehouse()
			}
			loadWarehouse() //新增成功刷新页面
			clearWarehouse() //新增成功后再次点击新增原先数据清空
			loadwarehouseNo() //新增仓库后刷新库区中新增库区的下拉框
			loadwarehouseNo2()
		}
	});
}
//仓库管理--新增仓库--点击关闭按钮或者保存按钮清空数据
function clearWarehouse() {
	$('.warehouseNo').val("");
	$('.warehouseName').val("");
	$('.warehouseAddress').val("")
	$('.warehouseRemark').val("")
	$('#spanWarehouseNo').html("*必填");
	$('#spanWarehouseName').html("*必填");
	$("#saveWarehouse").attr('disabled', 'disabled');
}
//仓库管理--新增仓库--仓库编号必填
function validatewarehouseNo(warehouseNo) {
	if(warehouseNo == '') {
		$('#spanWarehouseNo').html("*仓库编号不能为空");
		return false;
	}
	$('#spanWarehouseNo').html("");
	return true;
}
//仓库管理--新增仓库--仓库名称必填
function validatewarehouseName(warehouseName) {
	if(warehouseName == '') {
		$('#spanWarehouseName').html("*仓库名称不能为空");
		return false;
	}
	$('#spanWarehouseName').html("");
	//		$("#saveWarehouse").removeAttr('disabled')
	return true;
}
//仓库管理--新增仓库--仓库编号或者仓库名称有一个为空保存不能点击
function unSaveWarehouse() {
	if($('.warehouseNo').val() != '' && $('.warehouseName').val() != '') {
		$("#saveWarehouse").removeAttr('disabled')
	} else {
		$("#saveWarehouse").attr('disabled', 'disabled')
	}
}
//仓库管理--新增仓库--仓库编号失去焦点
$('.warehouseNo').blur(function() {
	var warehouseNo = $('.warehouseNo').val();
	unSaveWarehouse()
	validatewarehouseNo(warehouseNo)
})
//仓库管理--新增仓库--仓库名称失去焦点
$('.warehouseName').blur(function() {
	var warehouseName = $('.warehouseName').val();
	unSaveWarehouse()
	validatewarehouseName(warehouseName);
})
//库区管理--新增库区
var warehouseNo; //仓库编号命名,下拉框中需要使用
loadwarehouseNo() //点开库区管理就加载下拉框方法
function addArea() {
	var areas = {
		"areaNo": $('.areaNo').val(),
		"areaName": $('.areaName').val(),
		"remark": $('.areaRemark').val(),
		"warehouseNo": warehouseNo
	}
	$.ajax({
		type: "post",
		url: ipAddress + '/area/insertArea.do',
		async: true,
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(areas),
		success: function(result) {
			//console.log(result)
			if(result.code == 5010) {
				alert(result.message);
				clearArea()
			}
			loadArea() //新增成功刷新页面
			clearArea() //点击保存按钮清空数据
			loadareaNo() //刷新库区名称的下拉框
		}
	});
}
//库区管理--新增库区--点击关闭按钮或者保存按钮清空数据
function clearArea() {
	$('.areaNo').val("");
	$('.areaName').val("");
	$('.areaRemark').val("");
	$('#spanWarehouseNo1').html('*必选');
	$('#spanAreaNo').html("*必填");
	$('#spanAreaName').html("*必填");
	$("#saveArea").attr('disabled', 'disabled')
	//alert(1)
	loadwarehouseNo()
}
//库区管理--新增库区--动态加载仓库编号select下拉列表
function loadwarehouseNo() {
	var data = {
		"pageIndex": 1,
		"criteria": {}
	}
	$('.warehouseNo1').html(""); //清空select列表数据
	$.ajax({
		type: "post",
		url: ipAddress + '/warehouse/queryWarehouse.do',
		async: false,
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(data),
		success: function(result) {
			//console.log(result)
			$('.warehouseNo1').prepend("<option value='0' >请选择</option>") //添加第一个option值
			for(var i = 0; i < result.data.length; i++) {
				$('.warehouseNo1').append("<option value=" + result.data[i].warehouseNo + ">" + result.data[i].warehouseName + "</option>")
			}
		}
	});
}
//当仓库名称改变时候取值
$('.warehouseNo1').on("change", function() {
	warehouseNo = $(this).val();
	validatewarehouseNo1()
	loadareaNo()
	unSaveArea()
})
//库区管理--新增库区--仓库名称必选
function validatewarehouseNo1() {
	if($('.warehouseNo1 option:selected').val() == '0') {
		$("#spanWarehouseNo1").html("*请选择仓库");
		return false;
	}
	$("#spanWarehouseNo1").html("");
	return true;
}
//库区管理--新增库区--仓库编号必填
function validateareaNo(areaNo) {
	if(areaNo == '') {
		$('#spanAreaNo').html("*库区编号不能为空");
		return false;
	}
	$('#spanAreaNo').html("");
	return true;
}
//库区管理--新增库区--仓库名称必填
function validatareaName(areaName) {
	if(areaName == '') {
		$('#spanAreaName').html("*库区名称不能为空");
		return false;
	}
	$('#spanAreaName').html("");
	return true;
}
//库区管理--新增库区--库区名称,库区编号或者仓库名称有一个为空保存不能点击
function unSaveArea() {
	if($('.areaNo').val() != '' && $('.areaName').val() != '' && $('.warehouseNo1 option:selected').val() != 0) {
		$("#saveArea").removeAttr('disabled')
	} else {
		$("#saveArea").attr('disabled', 'disabled')
	}
}
//库区管理--新增库区--库区编号失去焦点
$('.areaNo').blur(function() {
	var areaNo = $('.areaNo').val();
	unSaveArea()
	validateareaNo(areaNo);
})
//库区管理--新增库区--库区失去焦点
$('.areaName').blur(function() {
	var areaName = $('.areaName').val();
	unSaveArea()
	validatareaName(areaName)
})
//货位管理--新增货位--根据仓库名称二级联动获取select下拉列表
$('#huowei').click(function() {
	$(".areaNo1 option:not(:first)").remove();
})

function loadareaNo() { 
	var data = {
		"pageIndex": 1,
		"criteria": {
			"warehouseNo": warehouseNo
		}
	}
	$('.areaNo1').empty(); //清空库区名称select列表数据
	$.ajax({
		type: "post",
		url: ipAddress + '/area/queryArea.do',
		async: false,
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(data),
		success: function(result) {
			//console.log(result);
			$('.areaNo1').prepend("<option value='0' >请选择</option>") //添加第一个option值
			for(var i = 0; i < result.data.length; i++) {
				$('.areaNo1').append("<option value=" + result.data[i].areaId + ">" + result.data[i].areaName + "</option>")
			}
		}
	});
}
//货位管理--新增货位--当库区名称改变时候取值
var areaId;
$('.areaNo1').on("change", function() {
	areaId = $(this).val();
	//validatewarehouseNo1(spanWarehouseNo2);
	if($('.areaNo1 option:selected').val() == '0') {
		//alert('2222')
		$("#spanAreaName3").html("*请选择库区");
		return false;
	}
	$('#spanAreaName3').html("");
	return true;
	unAllocation()
})
//货位管理--新增货位--当仓库名称改变时候取值
$('.warehouseNo1').eq(2).on("change", function() {
	warehouseNo = $(this).val();
	validatewarehouseNo2()
	loadareaNo()
	unAllocation()
})
//货位管理--新增货位
function addLocation() {
	var locations = {
		"warehouseNo": warehouseNo,
		"areaNo": areaId,
		"allocationNo": $('.allocationNo').val(),
		"allocationName": $('.allocationName').val(),
		"allocationFormat": $('.allocationFormat').val(),
		"allocationStatus": $('.allocationStatus').val(),
		"remark": $('.allocationRemark').val(),

	}
	$.ajax({
		type: "post",
		url: ipAddress + '/position/insertPosition.do',
		async: true,
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(locations),
		success: function(result) {
			console.log(result)
			if(result.code == 5012) {
				alert(result.message)
			}
			loadQueryPosition(); //新增成功刷新页面
			clearLocation() //新增成功后再次点击新增,原先数据清空
			/*loadwarehouseNo() //新增货位后刷新仓库名称的下拉框*/
			/*$('.areaNo1 option:not(:first)').remove() //刷新库区名称的下拉框*/
		}
	});
}
//货位管理--新增货位--仓库名称必选
function validatewarehouseNo2() {
	if($('.warehouseNo1 option:selected').eq(2).val() == '0') {
		$('#spanWarehouseNo2').html("*请选择仓库");
		return false;
	}
	$('#spanWarehouseNo2').html("");
	return true;
}
//货位管理--新增货位--货位编号必填
function validateallocationNo(allocationNo) {
	if(allocationNo == '') {
		$('#spanallocationNo').html("*货位编号不能为空");
		return false;
	}
	$('#spanallocationNo').html("");
	return true;
}
//货位管理--新增货位--货位名称必填
function validateallocationName(allocationName) {
	if(allocationName == '') {
		$('#spanallocationName').html("*货位名称不能为空");
		return false;
	}
	$('#spanallocationName').html("");
	return true;
}
//货位管理--新增货位--货位存量上限必填
function validateallocationFormat(allocationFormat) {
	if(allocationFormat == '') {
		$('#spanallocationFormat').html("*存量上限不能为空");
		return false;
	}
	$('#spanallocationFormat').html("");
	return true;
}
//货位管理--新增货位--仓库名称,库区名称,货位编号或者货位名称有一个为空保存不能点击
function unAllocation() {
//if($('.allocationNo').val() != '' && $('.allocationName').val() != '' && $('.allocationFormat').val() != '' && $('.warehouseNo1 option:selected').eq(2).val() != 0 && $('.areaNo1 option:selected').val() != 0) {
	if($('.allocationNo').val() != '') {
		$("#saveLocation").removeAttr('disabled')
	} else {
		$("#saveLocation").attr('disabled', 'disabled')
	}
}
//货位管理--新增货位--货位编号失去焦点
$('.allocationNo').blur(function() {
	var allocationNo = $('.allocationNo').val();
	unAllocation()
	validateallocationNo(allocationNo)
})
//货位管理--新增货位--货位名称失去焦点
$('.allocationName').blur(function() {
	var allocationName = $('.allocationName').val();
	unAllocation()
	validateallocationName(allocationName)
})
//货位管理--新增货位--存量上限失去焦点
$('.allocationFormat').blur(function() {
	var allocationFormat = $('.allocationFormat').val();
	unAllocation()
	validateallocationFormat(allocationFormat)
})
//货位管理--新增货位--点击关闭按钮或者保存按钮清空数据
function clearLocation() {
	$('.allocationNo').val("");
	$('.allocationName').val('');
	$('.allocationFormat').val("");
	$('.allocationStatus').val("");
	$('.allocationRemark').val("")

	loadwarehouseNo() //刷新仓库名称的下拉框
	$('.areaNo1 option:not(:first)').remove() //刷新库区名称的下拉框
	$('#spanWarehouseNo2').html('*必选');
	$('#spanAreaName3').html('*必选');
	$("#saveLocation").attr('disabled', 'disabled');
	$('#spanallocationNo').html("*必填");
	$('#spanallocationName').html("*必填");
	$('#spanallocationFormat').html("*必填");
}
/*
  编辑部分
 */
//用户管理--编辑用户
loadUserDepartment2()

function editorUser(obj, userNo) {
	$.ajax({
		type: "post",
		url: ipAddress + '/user/queryUserById.do',
		async: true,
		data: {
			"userNo": userNo
		},
		success: function(result) {
			//console.log(result)
			$('.editUserNO').val(result.userNo);
			$('.editUserName').val(result.username);
			$('.editUserPhone').val(result.phone);
			$('.editUserEmail').val(result.email);
			$('.editUserRemark').val(result.remark);
			$("#editUserRole").val(result.roleId);
			editUserRole = result.roleId;
		}
	});
}
//用户管理--编辑修改用户--用户名失去焦点
$('.editUserName').blur(function() {
	reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/; //姓名
	if($('.editUserName').val() == '') {
		$('#spanUsername2').show()
		$('#spanUsername2').html('*用户名不能为空');
		$('#editUser').attr('disabled', 'disabled')
		return false;
	}
	if(!reg.test($('.editUserName').val())) {
		$('#spanUsername2').show()
		$('#spanUsername2').html("*用户名输入格式有误,请重新输入");
		$('#editUser').attr('disabled', 'disabled')
		return false;
	}
	$('#spanUsername2').hide()
	$('#editUser').removeAttr('disabled')
})
//用户管理--新增用户--点击关闭按钮或者保存按钮清空数据
function clearEditUser() {
	$('#spanUsername2').hide();
	$('#editUser').removeAttr('disabled')
}
//用户管理--编辑修改用户
var editUserRole;
$('#editUser').off('click').on('click', function() {
	var data = {
		"userNo": $('.editUserNO').val(),
		"username": $('.editUserName').val(),
		"roleId": editUserRole,
		"phone": $('.editUserPhone').val(),
		"email": $('.editUserEmail').val(),
		"remark": $('.editUserRemark').val()
	}
	$.ajax({
		type: "post",
		url: ipAddress + '/user/modifyUser.do',
		async: true,
		data: JSON.stringify(data),
		contentType: 'application/json;charset=UTF-8',
		success: function(result) {
			//console.log(result)
			if(result.code == 3011) {
				alert(result.message);
				loadQueryUsers()
			}
			if(result.code == 3010) {
				alert(result.message);
				loadQueryUsers()
			}

		}
	});
})
//用户管理--编辑修改用户--动态加载select下拉列表
function loadUserDepartment2() {
	var data = {
		"pageIndex": 1,
		"criteria": {}
	}
	$('#editUserRole').html(""); //清空select列表数据
	$.ajax({
		type: "post",
		url: ipAddress + '/role/queryRoles.do',
		async: false,
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(data),
		success: function(result) {
			//console.log(result)
			$('#editUserRole').prepend("<option value='0' >请选择</option>") //添加第一个option值
			for(var i = 0; i < result.data.length; i++) {
				$('#editUserRole').append("<option value=" + result.data[i].id + ">" + result.data[i].roleName + "</option>")
			}
		}
	});
}
$('#editUserRole').on("change", function() {
	editUserRole = $(this).val()
})
//物品管理--编辑
function editorGoods(obj, productNo) {
	$.ajax({
		type: "post",
		url: ipAddress + '/product/queryGoodById.do',
		async: true,
		data: {
			"productNo": productNo
		},
		success: function(result) {
			console.log(result)
			$('#editproductNo').val(result.productNo);
			$('#editgoodDepartment').val(result.productName);
			$('#editresourceCategory').val(result.resourceCategory);
			$('#editgoodsCategory').val(result.goodsCategory);
			$('#editformatNo').val(result.formatNo);
			$("#editunit").val(result.unit);
			$('#editremark').val(result.remark);
		}
	});
}
//物品管理--编辑修改物品	

$('#editGoods').off('click').on('click', function() {
	var data = {
		"productNo": $('#editproductNo').val(),
		"productName": $('#editgoodDepartment').val(),
		"unit": $("#editunit").val(),
		"remark": $('#editremark').val(),
		"goodsCategory": $('#editgoodsCategory').val(),
		"formatNo": $('#editformatNo').val(),
		"resourceCategory": $('#editresourceCategory').val()
	}

	$.ajax({
		type: "post",
		url: ipAddress + '/product/modifyGood.do',
		async: true,
		data: JSON.stringify(data),
		contentType: 'application/json;charset=UTF-8',
		success: function(result) {
			console.log(result)
			if(result.code == 3011) {
				alert(result.message);
				loadQueryGoods()
			}
			if(result.code == 3010) {
				alert(result.message);
				loadQueryGoods()
			}
		}
	});
})
//仓库管理--编辑
function editorWarehouse(obj, warehouseNo) {
	var data = {
		"warehouseNo": warehouseNo
	}
	$.ajax({
		type: "post",
		url: ipAddress + '/warehouse/queryWarehouseById.do',
		async: true,
		data: JSON.stringify(data),
		contentType: 'application/json;charset=UTF-8',
		success: function(result) {
			console.log(result)
			$('#editwarehouseNo').val(result.warehouseNo);
			$('#editwarehouseName').val(result.warehouseName);
			$('#editwarehouseAddress').val(result.warehouseAddress);
			$('#editwarehouseRemark').val(result.remark);

		}
	});
}
//仓库管理--编辑修改
$('#editWarehouse').off('click').on('click', function() {
	var data = {
		"warehouseNo": $('#editwarehouseNo').val(),
		"warehouseName": $('#editwarehouseName').val(),
		"warehouseAddress": $('#editwarehouseAddress').val(),
		"remark": $('#editwarehouseRemark').val()
	}
	$.ajax({
		type: "post",
		url: ipAddress + '/warehouse/updateWarehouse.do',
		async: true,
		data: JSON.stringify(data),
		contentType: 'application/json;charset=UTF-8',
		success: function(result) {
			//console.log(result)
			if(result.code == 3011) {
				alert(result.message);
				loadWarehouse()
			}
			if(result.code == 3010) {
				alert(result.message);
				loadWarehouse()
			}

		}
	});
})
//仓库管理--编辑修改--仓库编号失去焦点
$('#editwarehouseNo').blur(function() {
	if($('#editwarehouseNo').val() == '') {
		$('#spanEditwarehouseNo').show()
		$('#spanEditwarehouseNo').html('*必填');
		unSaveWarehouse2()
		return false;
	}

	$('#spanEditwarehouseNo').hide()

})
//仓库管理--编辑修改--仓库名称失去焦点
$('#editwarehouseName').blur(function() {
	if($('#editwarehouseName').val() == '') {
		$('#spanEditwarehouseName').show()
		$('#spanEditwarehouseName').html('*必填');
		unSaveWarehouse2()
		return false;
	}

	$('#spanEditwarehouseName').hide()

})
//仓库管理--编辑修改--仓库编号或者仓库名称有一个为空保存不能点击
function unSaveWarehouse2() {
	if($('#editwarehouseNo').val() != '' && $('#spanEditwarehouseName').val() != '') {
		$("#editWarehouse").removeAttr('disabled')
	} else {
		$("#editWarehouse").attr('disabled', 'disabled')
	}
}
//仓库管理--编辑修改--点击关闭按钮清空数据
function clearEditWarehouse() {
	$('#spanEditwarehouseNo').hide();
	$('#spanEditwarehouseName').hide()
	$('#editWarehouse').removeAttr('disabled')
}
//库区管理--编辑
function editorArea(obj, areaId) {
	var data = {
		"areaId": areaId
	}
	$.ajax({
		type: "post",
		url: ipAddress + '/area/queryAreaById.do',
		async: true,
		data: JSON.stringify(data),
		contentType: 'application/json;charset=UTF-8',
		success: function(result) {
			console.log(result)
			$('#editwarehouseNo2').val(result.warehouseNo);
			$('#editAreaNo').val(result.areaNo);
			$('#editAreaName').val(result.areaName);
			$('#editAreaRemark').val(result.remark);
			editwarehouseNo2 = result.warehouseNo

		}
	});
}
//库区管理--编辑修改
var editwarehouseNo2;
loadwarehouseNo2();
$('#editArea').off('click').on('click', function() {
	var data = {
		"areaNo": $('#editAreaNo').val(),
		"areaName": $('#editAreaName').val(),
		"remark": $('#editAreaRemark').val(),
		"warehouseNo": editwarehouseNo2
	}
	$.ajax({
		type: "post",
		url: ipAddress + '/area/updateArea.do',
		async: true,
		data: JSON.stringify(data),
		contentType: 'application/json;charset=UTF-8',
		success: function(result) {
			console.log(result)
			if(result.code == 3011) {
				alert(result.message);
				loadArea()
			}
			if(result.code == 3010) {
				alert(result.message);
				loadArea()
			}
		}
	});
})

//库区管理--编辑修改--动态加载仓库名称select下拉列表
function loadwarehouseNo2() {
	var data = {
		"pageIndex": 1,
		"criteria": {}
	}
	$('#editwarehouseNo2').html(""); //清空select列表数据
	$.ajax({
		type: "post",
		url: ipAddress + '/warehouse/queryWarehouse.do',
		async: false,
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(data),
		success: function(result) {
			//console.log(result)
			$('#editwarehouseNo2').prepend("<option value='0' >请选择</option>") //添加第一个option值
			for(var i = 0; i < result.data.length; i++) {
				$('#editwarehouseNo2').append("<option value=" + result.data[i].warehouseNo + ">" + result.data[i].warehouseName + "</option>")
			}
		}
	});
}
$('#editwarehouseNo2').on("change", function() {
	editwarehouseNo2 = $(this).val();

	if($('#editAreaName').val() == 0) {
		$('#spaneditwarehouseNo2').show();
		$('#spaneditwarehouseNo2').html('*请选择库区');
		$("#editArea").attr('disabled', 'disabled')
		return false;
	}
	$('#spaneditwarehouseNo2').html("");
	$("#editArea").removeAttr('disabled')
	return true;

})

//库区管理--编辑修改--库区名称失去焦点
$('#editAreaName').blur(function() {
	if($('#editAreaName').val() == '') {
		$('#spanAreaName2').show()
		$('#spanAreaName2').html('*必填');
		$("#editArea").attr('disabled', 'disabled')

		return false;
	}

	$('#spanAreaName2').hide();
	$("#editArea").removeAttr('disabled')
	return true;

})
//仓库管理--编辑修改--点击关闭按钮清空数据
function clearEditArea() {
	$('#spaneditwarehouseNo2').hide();
	$('#spanAreaName2').hide()
	$("#editArea").removeAttr('disabled')
}
//货位管理--编辑
var allocationID;

function editorPosition(obj, allocationId) {
	//$("#locationArea option:not(:first)").remove();
	allocationID = allocationId;
	$.ajax({
		type: "post",
		url: ipAddress + '/position/queryPosition.do',
		async: true,
		data: {
			"allocationId": allocationId
		},
		success: function(result) {
			console.log(result)
			var allocationNumber=result.allocationNumber==null?"0":result.allocationNumber;
			$('#locationWarehouse').val(result.warehouseNo);
			$('#locationWarehouse').change();
			$('#locationArea').val(result.areaNo);
			$('#locationArea').change();
			$('#editallocationNo').val(result.allocationNo);
			$('#editallocationName').val(result.allocationName);
			$('#editallocationStatus').val(result.allocationStatus);
			$('#editallocationFormat').val(result.allocationFormat);
			$('#editallocationFormat2').val(allocationNumber);
			$('#editallocationRemark').val(result.remark);

		}
	});
}
//货位管理--编辑修改
$('#editAllocation').off('click').on('click', function() {
	var data = {
		"warehouseNo": warehouseNo,
		"areaNo": areaId,
		"allocationNo": $('#editallocationNo').val(),
		"allocationName": $('#editallocationName').val(),
		"allocationFormat": $('#editallocationFormat').val(),
		"allocationStatus": $('#editallocationStatus').val(),
		"remark": $('#editallocationRemark').val(),
		"allocationId": allocationID
	}
	$.ajax({
		type: "post",
		url: ipAddress + '/position/modifyPosition.do',
		async: true,
		data: JSON.stringify(data),
		contentType: 'application/json;charset=UTF-8',
		success: function(result) {
			//console.log(result)
			if(result.code == 3011) {
				alert(result.message);
				loadQueryPosition()
			}
			if(result.code == 3010) {
				alert(result.message);
				loadQueryPosition()
			}
		}
	});
})

//货位管理--编辑修改--根据仓库名称二级联动获取select下拉列表

function loadareaNo2() {
	var data = {
		"pageIndex": 1,
		"criteria": {
			"warehouseNo": warehouseNo
		}
	}
	$('#locationArea').empty(); //清空库区名称select列表数据
	$.ajax({
		type: "post",
		url: ipAddress + '/area/queryArea.do',
		async: false,
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(data),
		success: function(result) {
			//console.log(result);
			$('#locationArea').prepend("<option value='0' >请选择</option>") //添加第一个option值
			for(var i = 0; i < result.data.length; i++) {
				$('#locationArea').append("<option value=" + result.data[i].areaId + ">" + result.data[i].areaName + "</option>")
			}
		}
	});
}
//货位管理--编辑修改--当库区名称改变时候取值
$('#locationArea').on("change", function() {
	areaId = $(this).val();
	if($('#locationArea option:selected').val() == '0') {
		$("#spanAreaName4").show()
		$("#spanAreaName4").html("*请选择库区");
		$("#editAllocation").attr('disabled', 'disabled')
		return false;
	}
	$("#spanAreaName4").hide()
	$('#spanAreaName4').html("");
	$("#editAllocation").removeAttr('disabled')
	return true;

})
//货位管理--编辑修改--当仓库名称改变时候取值
$('#locationWarehouse').on("change", function() {
	warehouseNo = $(this).val();
	loadareaNo2()
	if($('#locationWarehouse option:selected').val() == '0' && $('#locationArea option:selected').val() == '0') {
		$('#locationArea').change();
		$("#spanlocationWarehouse").show()
		$("#spanlocationWarehouse").html("*请选择仓库");
		$("#editAllocation").attr('disabled', 'disabled')
		return false;
	}
	if($('#locationWarehouse option:selected').val() != '0' && $('#locationArea option:selected').val() == '0') {
		$("#spanlocationWarehouse").html("");
		$("#spanlocationWarehouse").hide()
		$("#editAllocation").attr('disabled', 'disabled')
		return false;
	}

	return true;
})
//货位管理--编辑修改--货位名称失去焦点
$('#editallocationName').blur(function() {
	if($('#editallocationName').val() == '') {
		$('#spaneditallocationName').show()
		$('#spaneditallocationName').html('*货位名称不能为空')
		$("#editAllocation").attr('disabled', 'disabled')
		return false;
	}
	$('#spaneditallocationName').hide()
	$('#spaneditallocationName').html('')
	$("#editAllocation").removeAttr('disabled')
	return true;

})
//货位管理--编辑修改--存量上限失去焦点
$('#editallocationFormat').blur(function() {

	if($('#editallocationFormat').val() == '') {
		$('#spaneditallocationFormat').show()
		$('#spaneditallocationFormat').html('*存量上限不能为空')
		$("#editAllocation").attr('disabled', 'disabled')
		return false;

	}
	$('#spaneditallocationFormat').hide()
	$('#spaneditallocationFormat').html('')
	$("#editAllocation").removeAttr('disabled')
	return true;

})
//点击关闭回复默认
function clearEditeditorLocation() {
	$("#spanlocationWarehouse").html("");
	$('#spanAreaName4').html("");
	$('#spaneditallocationName').html('');
	$('#spaneditallocationFormat').html('')
	$("#editAllocation").removeAttr('disabled')
}