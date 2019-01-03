/*
 * 代码创建人：何丹丹
 *创建时间：2018-10-22
 * 创建内容描述：出库管理模块
 */
var loadQueryOutStore, loadWaitOutnbound, loadExamine, loadOutboundSearch, loadOutboundOperate;

$(function() {
				// 权限划分
var userInfo = JSON.parse($.cookie('userInfo'));

var roleId = userInfo.roleId; // 1 管理员,2操作员,3审核员
if (roleId == 2) {
	  $('#M-box2').css('display', 'none');
    
} else if (roleId == 3) {
	  $('#M-box1').css('display', 'none');
      $('#M-box2').parent().addClass("active");
      $("#produce").css('display', 'none');
    $("#audite").css('display', 'block');
    	$('.M-box2').show();
		$('.M-box2').siblings().hide();
		load2();
		loadUserDepartment()
		$("#M-box5").click(function(){
			    $("#audite").css('display', 'none');
		})
		$("#M-box2").click(function(){
			    $("#audite").css('display', 'block');
		}) 
}
	//点击生产入库单，对应的类名为.M-box1的分页显示，其他隐藏，其他管理类似
	$('#M-box1').click(function() {
		data1.pageIndex = 1;
		load1()
		$('.M-box1').show();
		$('.M-box1').siblings().hide();
	})
	$('#M-box2').click(function() {
		data2.pageIndex = 1;
		load2();
		loadUserDepartment();
		storageTime = '';
		$('.M-box2').show();
		$('.M-box2').siblings().hide();
	})
	$('#M-box3').click(function() {
		data3.pageIndex = 1;
		load3()
		$('.M-box3').show();
		$('.M-box3').siblings().hide();
	})
	$('#M-box4').click(function() {
		data4.pageIndex = 1;
		load4()
		$('.M-box4').show();
		$('.M-box4').siblings().hide();
	})
	$('#M-box5').click(function() {
		data5.pageIndex = 1;
		$('input:radio[name="optionsRadiosinline"]').get(0).checked = true;
		data5.criteria.checkStatus = '';
		load5()
		$('.M-box5').show();
		$('.M-box5').siblings().hide();
	})
	var userInfo = JSON.parse($.cookie('userInfo'));

	var roleId = userInfo.roleId; // 1 管理员,2操作员,3审核员
	if(roleId == 2) {
		$('#M-box1').trigger("click")
	} else if(roleId == 3) {
		$('#M-box2').trigger("click")
	}

})
/*
 * 生产出库单显示查询
 */
var data1 = {
	"pageIndex": 1,
	"recordCount": 10,
	"criteria": {
		"status": "0",
	}
}

function load1() { //点击生产入库单页面加载表格数据	
	$.ajax({
		type: "post",
		url: ipAddress + '/out/queryStores.do',
		async: true,
		data: JSON.stringify(data1),
		contentType: 'application/json;charset=UTF-8',
		success: function(result) {
			console.log(result)
			if(result.data.length == 0) {
				data1.pageIndex -= 1;
				if(result.data.length != 0) {
					load1()
				}
			}

			$('#myTable1 tbody tr').remove();
			data1.pageIndex = result.currentPage; //记录页数为当前页
			for(var i = 0; i < result.data.length; i++) {
				var html1 = '<tr>' +
					'<td>' + '<input type="hidden" value="' + result.data[i].outStoreNumber + '"  />' + (data1.pageIndex * 10 - 9 + i) +
					'</td>' +
					'<td>' + result.data[i].outStoreNumber +
					'</td>' +
					'<td>' + result.data[i].outStoreTime +
					'</td>' +
					'<td>' + result.data[i].outStoreAuthor +
					'</td>' +
					'<td>' + (result.data[i].outStoreRemark == null ? '' : result.data[i].outStoreRemark) +
					'</td>' +
					'<td>' + '<a class="btn btn-primary" data-toggle="modal" data-target="#check" style="outline: none;    margin-right: 7px;" onclick="editorQueryInStore(this,' + result.data[i].outStoreNumber + ')">编辑</a>' +
					' <a class="btn btn-primary" data-toggle="modal" data-target="#submitInsertInStore" style="outline: none;" onclick="myDelete(this)">提交</a>' +
					'<a class="btn btn-danger" onclick="myDelete(this)" data-toggle="modal" data-target="#delete1" style="outline: none;     margin-left: 10px;"  >删除</a>' +
					'</td>' +
					'</tr>'
				$('#myTable1 tbody').append(html1)
			}
			//分页
			$('.M-box1').pagination({
				pageCount: result.totalPage, //总页码
				jump: true, //是否开启跳转，true是开启
				coping: true, //是否开启首页和末页，此处开启
				homePage: '首页',
				endPage: '末页',
				prevContent: '上页',
				nextContent: '下页',
				current: data1.pageIndex, //当前页码
				callback: function(api) { //这是一个回调函数					
					data1.pageIndex = api.getCurrent();
					$.ajax({
						type: "post",
						url: ipAddress + '/out/queryStores.do',
						async: true,
						data: JSON.stringify(data1),
						contentType: 'application/json;charset=UTF-8',
						success: function(result) {
							//console.log(result)
							if(result.data.length == 0) {
								data1.pageIndex -= 1;
								if(result.data.length != 0) {
									load1()
								}
							}
							$('#myTable1 tbody tr').remove();
							data1.pageIndex = result.currentPage; //记录页数为当前页
							$('#myTable1 tbody').html('');
							for(var i = 0; i < result.data.length; i++) {
								var html1 = '<tr>' +
									'<td>' + '<input type="hidden" value="' + result.data[i].outStoreNumber + '"  />' + (data1.pageIndex * 10 - 9 + i) +
									'</td>' +
									'<td>' + result.data[i].outStoreNumber +
									'</td>' +
									'<td>' + result.data[i].outStoreTime +
									'</td>' +
									'<td>' + result.data[i].outStoreAuthor +
									'</td>' +
									'<td>' + (result.data[i].outStoreRemark == null ? '' : result.data[i].outStoreRemark) +
									'</td>' +
									'<td>' + '<a class="btn btn-primary" data-toggle="modal" data-target="#check" style="outline: none;    margin-right: 7px;" onclick="editorQueryInStore(this,' + result.data[i].outStoreNumber + ')">编辑</a>' +
									' <a class="btn btn-primary" data-toggle="modal" data-target="#submitInsertInStore" style="outline: none;" onclick="myDelete(this)" >提交</a>' +
									'<a class="btn btn-danger" onclick="myDelete(this)" data-toggle="modal" data-target="#delete1" style="outline: none;     margin-left: 10px;"  >删除</a>' +
									'</td>' +
									'</tr>'
								$('#myTable1 tbody').append(html1)
							}
						},
						error: function() {
							alert('没有找到对应的结果！')
						}
					})
				}
			});
		}
	});
}
loadQueryOutStore = load1;
load1()

//创建出库单新增商品，动态添加入库明细
$('#tableAddIn3').off("click").on("click", function() {
	//var index = $('#removeOne tr').length;
	var tr = '<tr>' +
			'<td>' +
			'<select class="selectgood">' +
			'<option value="0">请选择</option>' +
			'</select>' +
			'</td>' +
			'<td>' +
			'<select class="selectYu">' +
			'<option value="05">请选择</option>' +
			'<option value="00">工位0</option>' +
			'<option value="02">工位1</option>' +
			'<option value="03">工位2</option>' +
			'<option value="04">工位3</option>' +
			'</select>' +
			'</td>' +
		//			'<td>' +
		//			'<select class="selectWarehouse">' +
		//			'<option >请选择</option>' +
		//			'</select>' +
		//			'</td>' +
		//			'<td>' +
		//			'<select class="selectArea">' +
		//			'<option >请选择</option>' +
		//			'</select>' +
		//			'</td>' +
		//			'<td>' +
		//			'<input type="text"  class=" trayId outLINE"  style="    text-align: center;">' +
		//			'</td>' +
		'<td>' +
		'<input type="text"  class="number11 outLINE"  value="1"style="    text-align: center;">' +
		'</td>' +
		'<td>' +
		'<input type="text"  class="unit11 outLINE" value="托" style="    text-align: center;">' +
		'</td>' +
		'<td> ' +
		'<a id="removeBtn" class="btn btn-danger btn-sm remove"  style="outline: none;">删除</a>' +
		'</td>' +
		'</tr>';
	$('#inboundTbody').append(tr);

	loadGoods(inboundTbody);
	//点击删除按钮删除对应的商品
	$('.remove').off('click').click(function() {
		$(this).parent().parent().remove()
	})
		$('.selectgood').on('change',function(){
		if($(".selectgood option:selected").val() != 0&&$(".selectYu option:selected").val() != 05){
			
			$('#saveOunbound').removeAttr("disabled")
			
		}else{
			$('#saveOunbound').attr('disabled', 'disabled')
		}
			})
		$('.selectYu').on('change',function(){
		if($(".selectgood option:selected").val() != 0&&$(".selectYu option:selected").val() != 05){
			
			$('#saveOunbound').removeAttr("disabled")
			
		}else{
			$('#saveOunbound').attr('disabled', 'disabled')
		}
		
	})
})

//出库单交互
var userInfo = JSON.parse($.cookie('userInfo')); //根据登录获取用户信息
$('#outStoreAuthor').val(userInfo.username) //操作员根据用户登录自动获取
$('#saveOunbound').on('click', function() {
	//alert($('.selectWarehouse').val())
	var outStoreTime = new Date().Format("yyyy-MM-dd HH:mm:ss");
	var $trs = $('#inboundTbody').find("tr");
	var outStoreDetailModelsArr = [];
	$trs.each(function() {
		var $trTemp = $(this);
		outStoreDetailModelsArr.push({
			"goodsName": $trTemp.find('.selectgood').val(),
			"warehouse": $trTemp.find('.selectWarehouse').val(),
			"area": $trTemp.find('.selectArea').val(),
			"productPosition": $trTemp.find('.selectYu').val(),
			"number": $trTemp.find(".number11").val(),
			"unit": $trTemp.find(".unit11").val(),
		})
	})
	var data = {
		"outStoreTime": outStoreTime,
		"outStoreAuthor": userInfo.username,
		"outStoreRemark": $('#outStoreRemark').val(),
		"outStoreDetailModels": outStoreDetailModelsArr
	}
	$.ajax({
		type: "post",
		url: ipAddress + '/out/insertStore.do',
		async: true,
		data: JSON.stringify(data),
		contentType: 'application/json;charset=UTF-8',
		success: function(res) {
			console.log(res)
			if(res.code == 2010) {
				alert(res.message);
				loadQueryOutStore()
			}
			clearInsertOutStore() //创建出库单--点击保存清空数据
		}
	});
})

/*
 * 待审核出库单显示查询
 */
var data2={}
function load2() { //点击生产入库单页面加载表格数据	
data2 = {
	"pageIndex": 1,
	"recordCount": 10,
	"criteria": {
		"storeStatus": "2",
		"checkStatus": '0',
		"inStoreAuthor": '',
		"storeTime": ''
	}
}


	$.ajax({
		type: "post",
		url: ipAddress + '/examine/queryExamines1.do',
		async: true,
		data: JSON.stringify(data2),
		contentType: 'application/json;charset=UTF-8',
		success: function(result) {
			console.log(result)
			if(result.data.length == 0) {
				data2.pageIndex -= 1;
				if(result.data.length != 0) {
					load2()
				}
			}

			$('#myTable2 tbody tr').remove();
			data2.pageIndex = result.currentPage; //记录页数为当前页
			for(var i = 0; i < result.data.length; i++) {
				var html2 = '<tr>' +
					'<td>' + '<input type="hidden" value="' + result.data[i].storeStatus + '"  />' + (data2.pageIndex * 10 - 9 + i) +
					'</td>' +
					'<td>' + result.data[i].checkStoreNo +
					'</td>' +
					'<td>' + formatDateStr(result.data[i].storeTime) +
					'</td>' +
					'<td>' + result.data[i].outStoreAuthor +
					'</td>' +

					'<td>' + '<a class="btn btn-primary" data-toggle="modal" data-target="#look" style="outline: none;    margin-right: 7px;" onclick="lookInsertOutStore(this,' + result.data[i].checkStoreNo + ')" >查看</a>' +
					' <a class="btn btn-primary" data-toggle="modal" data-target="#submit2" style="outline: none;" onclick="passInsertOutStore(this,' + result.data[i].checkId + ')">通过</a>' +
					'<a class="btn btn-danger"  data-toggle="modal" data-target="#rejuct" style="outline: none;     margin-left: 10px;"onclick="auditsStatus(' + result.data[i].checkId + ')"  >拒绝</a>' +
					'</td>' +
					'</tr>'
				$('#myTable2 tbody').append(html2)
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
				current: data2.pageIndex, //当前页码
				callback: function(api) { //这是一个回调函数					
					data2.pageIndex = api.getCurrent();
					$.ajax({
						type: "post",
						url: ipAddress + '/examine/queryExamines.do',
						async: true,
						data: JSON.stringify(data2),
						contentType: 'application/json;charset=UTF-8',
						success: function(result) {
							if(result.data.length == 0) {
								data2.pageIndex -= 1;
								if(result.data.length != 0) {
									load2()
								}
							}
							$('#myTable2 tbody tr').remove();
							data2.pageIndex = result.currentPage; //记录页数为当前页
							$('#myTable2 tbody').html('');
							for(var i = 0; i < result.data.length; i++) {
								var html2 = '<tr>' +
									'<td>' + '<input type="hidden" value="' + result.data[i].storeStatus + '"  />' + (data2.pageIndex * 10 - 9 + i) +
									'</td>' +
									'<td>' + result.data[i].checkStoreNo +
									'</td>' +
									'<td>' + formatDateStr(result.data[i].storeTime) +
									'</td>' +
									'<td>' + result.data[i].outStoreAuthor +
									'</td>' +

									'<td>' + '<a class="btn btn-primary" data-toggle="modal" data-target="#look" style="outline: none;    margin-right: 7px;"  onclick="lookInsertOutStore(this,' + result.data[i].checkStoreNo + ')"  >查看</a>' +
									' <a class="btn btn-primary" data-toggle="modal" data-target="#submit2" style="outline: none;"onclick="passInsertOutStore(this,' + result.data[i].checkId + ')">通过</a>' +
									'<a class="btn btn-danger"  data-toggle="modal" data-target="#rejuct" style="outline: none;     margin-left: 10px;"onclick="auditsStatus(' + result.data[i].checkId + ')" >拒绝</a>' +
									'</td>' +
									'</tr>'
								$('#myTable2 tbody').append(html2)
							}
						},
						error: function() {
							alert('没有找到对应的结果！')
						}
					})
				}
			});
		}
	});
}
loadWaitOutnbound = load2;
//待审核入库单--动态加载select下拉列表
function loadUserDepartment() {
	var data = {
		"pageIndex": 1,
		"criteria": {}
	}
	$('#traders').html(""); //清空select列表数据
	$.ajax({
		type: "post",
		url: ipAddress + '/user/queryUsers.do',
		async: false,
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(data),
		success: function(result) {
			console.log(result)
			$('#traders').prepend("<option value='0' >全部</option>") //添加第一个option值
			for(var i = 0; i < result.data.length; i++) {
				$('#traders').append("<option value=" + result.data[i].username + ">" + result.data[i].username + "</option>")
			}
		}
	});
}

// 获取业务员
var inboundQueryId;
$('#traders').change(function() {
	inboundQueryId = $('#traders option:selected').val();
})
// 待审核入库单--根据业务员进行入库查询

$('#inboundQuery').off("click").on("click", function() {

	if(inboundQueryId == 0) {
		//storageTime = '';
		inboundQueryId = ''
	}
	data2.criteria.inStoreAuthor = inboundQueryId;
	//data2.criteria.storeTime = storageTime;
	data2.pageIndex = 1
	load2();
})

/*出库查询显示*/
//出库状态选中获取选中的value
var instoreVal;
$('#traders2').change(function() {
	instoreVal = $('#traders2 option:selected').val();
	//alert(instoreVal)
})
//选中的入库状态查询
$('#inboundQuery2').off("click").on("click", function() {

	if(instoreVal == 0) {
		//storageTime = '';
		instoreVal = ''
	}
	data3.criteria.storeStatus = instoreVal;
	//data2.criteria.storeTime = storageTime;
	data3.pageIndex = 1
	load3();
})
var data3 = {
	"pageIndex": 1,
	"recordCount": 10,
	"criteria": {
		//"storeStatus": "2",

	}
}

function load3() { //点击生产入库单页面加载表格数据	
	$.ajax({
		type: "post",
		url: ipAddress + '/out/queryStores.do',
		async: true,
		data: JSON.stringify(data3),
		contentType: 'application/json;charset=UTF-8',
		success: function(result) {
			console.log(result)
			if(result.data.length == 0) {
				data3.pageIndex -= 1;
				if(result.data.length != 0) {
					load3()
				}
			}

			$('#myTable5 tbody tr').remove();
			data3.pageIndex = result.currentPage; //记录页数为当前页
			for(var i = 0; i < result.data.length; i++) {
				var html = '<tr>' +
					'<td>' + '<input type="hidden" value="' + result.data[i].outStoreNumber + '"  />' + (data3.pageIndex * 10 - 9 + i) +
					'</td>' +
					'<td>' + result.data[i].outStoreNumber +
					'</td>' +
					'<td>' + result.data[i].outStoreTime +
					'</td>' +
					'<td>' + result.data[i].outStoreAuthor +
					'</td>' +
					'<td>' + result.data[i].outStoreStatus +
					'</td>' +

					'<td>' + '<a class="btn btn-primary" data-toggle="modal" data-target="#look" style="outline: none;"onclick="lookInStoreSearch(this,' + result.data[i].outStoreNumber + ')">查看</a> ' +
					'</td>' +
					'</tr>'
				$('#myTable5 tbody').append(html)
			}
			//分页
			$('.M-box3').pagination({
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
						type: "post",
						url: ipAddress + '/out/queryStores.do',
						async: true,
						data: JSON.stringify(data3),
						contentType: 'application/json;charset=UTF-8',
						success: function(result) {
							if(result.data.length == 0) {
								data3.pageIndex -= 1;
								if(result.data.length != 0) {
									load3()
								}
							}
							$('#myTable5 tbody tr').remove();
							data3.pageIndex = result.currentPage; //记录页数为当前页
							$('#myTable5 tbody').html('');
							for(var i = 0; i < result.data.length; i++) {
								var html = '<tr>' +
									'<td>' + '<input type="hidden" value="' + result.data[i].outStoreNumber + '"  />' + (data3.pageIndex * 10 - 9 + i) +
									'</td>' +
									'<td>' + result.data[i].outStoreNumber +
									'</td>' +
									'<td>' + result.data[i].outStoreTime +
									'</td>' +
									'<td>' + result.data[i].outStoreAuthor +
									'</td>' +
									'<td>' + result.data[i].outStoreStatus +
									'</td>' +

									'<td>' + '<a class="btn btn-primary" data-toggle="modal" data-target="#look" style="outline: none;"onclick="lookInStoreSearch(this,' + result.data[i].outStoreNumber + ')">查看</a> ' +
									'</td>' +
									'</tr>'
								$('#myTable5 tbody').append(html)
							}
						},
						error: function() {
							alert('没有找到对应的结果！')
						}
					})
				}
			});
		}
	});
}
loadExamine = load5;

/*出库操作部分*/
var data4 = {
	"pageIndex": 1,
	"recordCount": 10,
	"criteria": {
		//"storeStatus": "1",			
	}
}

function load4() { //点击入库查询页面加载表格数据			
	$.ajax({
		type: "post",
		url: ipAddress + '/out/queryStores.do',
		async: true,
		data: JSON.stringify(data4),
		contentType: 'application/json;charset=UTF-8',
		success: function(result) {
			console.log(result)
			if(result.data.length == 0) {
				data4.pageIndex -= 1;
				if(data4.pageIndex != 0) {
					load4()
				}
			}

			$('#myTable7 tbody tr').remove();
			data4.pageIndex = result.currentPage; //记录页数为当前页
			for(var i = 0; i < result.data.length; i++) {
				var html = '<tr>' +
					'<td>' + '<input type="hidden" value="' + result.data[i].inStoreNo + '"  />' + (data4.pageIndex * 10 - 9 + i) +
					'</td>' +
					'<td>' + result.data[i].outStoreNumber +
					'</td>' +
					'<td>' + result.data[i].outStoreTime +
					'</td>' +

					'<td>' + result.data[i].outStoreStatus +
					'</td>' +
					'<td>' + '<a class="btn btn-primary" data-toggle="modal"  style="outline: none;margin-right: 7px;"onclick="toTop(this,' + result.data[i].inStoreNo + ')">置顶</a>' +
					' <a class="btn btn-primary" data-toggle="modal"  style="outline: none;" onclick="endToStart(this)">暂停</a>' +
					'<a class="btn btn-danger"  data-toggle="modal" style="outline: none;     margin-left: 10px;" onclick="cancel(this)">取消</a>' +
					'</td>' +
					'</tr>';
				if(result.data[i].outStoreTopstatus == 1) {
					$('#myTable7 tbody').prepend(html);
				} else {
					$('#myTable7 tbody').append(html);
				}

			}
			//分页
			$('.M-box4').pagination({
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
						type: "post",
						url: ipAddress + '/InStore/queryInStore.do',
						async: true,
						data: JSON.stringify(data4),
						contentType: 'application/json;charset=UTF-8',
						success: function(result) {
							console.log(result)
							if(result.data.length == 0) {
								data4.pageIndex -= 1;
								if(data4.pageIndex != 0) {
									load4()
								}
							}

							$('#myTable7 tbody tr').remove();
							data4.pageIndex = result.currentPage; //记录页数为当前页
							$('#myTable7 tbody').html('');
							//alert(data5.pageIndex)
							for(var i = 0; i < result.data.length; i++) {
								var html = '<tr>' +
									'<td>' + '<input type="hidden" value="' + result.data[i].inStoreNo + '"  />' + (data4.pageIndex * 10 - 9 + i) +
									'</td>' +
									'<td>' + result.data[i].outStoreNumber +
									'</td>' +
									'<td>' + result.data[i].outStoreTime +
									'</td>' +

									'<td>' + result.data[i].outStoreStatus +
									'</td>' +
									'<td>' + '<a class="btn btn-primary" data-toggle="modal"  style="outline: none;    margin-right: 7px;" onclick="toTop(this,' + result.data[i].inStoreNo + ')" >置顶</a>' +
									' <a class="btn btn-primary" data-toggle="modal"  style="outline: none;" onclick="endToStart(this)">暂停</a>' +
									'<a class="btn btn-danger"  data-toggle="modal" style="outline: none;     margin-left: 10px;" onclick="cancel(this)" >取消</a>' +
									'</td>' +
									'</tr>'
								$('#myTable7 tbody').append(html)
							}
						},
						error: function() {
							alert('没有找到对应的结果！')
						}
					})
				}
			});
		}
	});
}
loadOutboundOperate = load4;
/*审核查询显示*/
//审核查询搜索--根据状态查询(通过、拒绝)

var checkVal;
$('#auditEnquiries').click(function() {
	checkVal = $('input:radio[name="optionsRadiosinline"]:checked').val();
	//alert(checkVal)
	if(checkVal == 0) {
		checkVal = '';
	}
	data5.criteria.checkStatus = checkVal;
	data5.pageIndex = 1;
	load5()
})
var data5 = {
	"pageIndex": 1,
	"recordCount": 10,
	"criteria": {
		"storeStatus": "2",
		"checkStatus": checkVal //(0,所有，1、成功  2、失败)
	}
}

function load5() { //点击生产入库单页面加载表格数据	
	$.ajax({
		type: "post",
		url: ipAddress + '/examine/queryExamines.do',
		async: true,
		data: JSON.stringify(data5),
		contentType: 'application/json;charset=UTF-8',
		success: function(result) {
			console.log(result)
			if(result.data.length == 0) {
				data5.pageIndex -= 1;
				if(result.data.length != 0) {
					load5()
				}
			}

			$('#myTable4 tbody tr').remove();
			data5.pageIndex = result.currentPage; //记录页数为当前页
			for(var i = 0; i < result.data.length; i++) {
				if(result.data[i].checkStatus == 1) {
					result.data[i].checkStatus = "通过"
				}
				if(result.data[i].checkStatus == 2) {
					result.data[i].checkStatus = "拒绝"
				}
				var html = '<tr>' +
					'<td>' + '<input type="hidden" value="' + result.data[i].checkStoreNo + '"  />' + (data5.pageIndex * 10 - 9 + i) +
					'</td>' +
					'<td>' + result.data[i].checkStoreNo +
					'</td>' +
					'<td>' + result.data[i].checkPeople +
					'</td>' +
					'<td>' + formatDateStr(result.data[i].checkTime) +
					'</td>' +
					'<td>' + result.data[i].checkStatus +
					'</td>' +
					'<td>' + (result.data[i].checkRemark == null ? '' : result.data[i].checkRemark) +
					'</td>' +
					'<td>' + '<a class="btn btn-primary" data-toggle="modal" data-target="#look1" style="outline: none;    margin-right: 7px;" onclick="lookInStoreSearch2(this,' + result.data[i].checkId + ')" >查看</a>' +
					'</td>' +
					'</tr>'
				$('#myTable4 tbody').append(html)
			}
			//分页
			$('.M-box5').pagination({
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
						type: "post",
						url: ipAddress + '/examine/queryExamines.do',
						async: true,
						data: JSON.stringify(data5),
						contentType: 'application/json;charset=UTF-8',
						success: function(result) {
							if(result.data.length == 0) {
								data5.pageIndex -= 1;
								if(result.data.length != 0) {
									load5()
								}
							}
							$('#myTable4 tbody tr').remove();
							data5.pageIndex = result.currentPage; //记录页数为当前页
							$('#myTable4 tbody').html('');
							for(var i = 0; i < result.data.length; i++) {
								if(result.data[i].checkStatus == 1) {
									result.data[i].checkStatus = "通过"
								}
								if(result.data[i].checkStatus == 2) {
									result.data[i].checkStatus = "拒绝"
								}
								var html = '<tr>' +
									'<td>' + '<input type="hidden" value="' + result.data[i].checkStoreNo + '"  />' + (data5.pageIndex * 10 - 9 + i) +
									'</td>' +
									'<td>' + result.data[i].checkStoreNo +
									'</td>' +
									'<td>' + result.data[i].checkPeople +
									'</td>' +
									'<td>' + formatDateStr(result.data[i].checkTime) +
									'</td>' +
									'<td>' + result.data[i].checkStatus +
									'</td>' +
									'<td>' + (result.data[i].checkRemark == null ? '' : result.data[i].checkRemark) +
									'</td>' +
									'<td>' + '<a class="btn btn-primary" data-toggle="modal" data-target="#look1" style="outline: none;    margin-right: 7px;" onclick="lookInStoreSearch2(this,' + result.data[i].checkId + ')" >查看</a>' +
									'</td>' +
									'</tr>'
								$('#myTable4 tbody').append(html)
							}
						},
					})
				}
			});
		}
	});

	//loadExamine = load5;
}


//创建出库单--点击关闭清空数据
function clearInsertOutStore() {
	$('#outStoreRemark').val(""), //点击保存备注清空
		$('#myTable3 tbody tr').remove() //点击保存后入库明细清空
}

//生产出库单--编辑部分
var inStoreNo2;
var editID;

function editorQueryInStore(obj, outStoreNumber) {
	inStoreNo2 = outStoreNumber;
	$.ajax({
		type: "post",
		url: ipAddress + '/out/queryStore.do',
		async: true,
		data: {
			"outStoreNumber": outStoreNumber
		},
		success: function(result) {
			console.log(result)
			$('#editOutStoreNo').val(result.outStoreNumber);
			$('#editOutStoreAuthor').val(result.outStoreAuthor);
			$('#editOutStoreRemark').val(result.outStoreRemark);
			$('#inboundTbody2').html("")
			for(var i = 0; i < result.outStoreDetailModels.length; i++) {
				var tr = '<tr>' + '<input type="hidden" class="editID" value="' + result.outStoreDetailModels[i].id + '"  />' +
					'<td>' +
					'<select class="selectgood">' +
					'</select>' +
					'</td>' +
					'<td>' +
					'<select class="selectYu">' +
					'<option value="05">请选择</option>' +
					'<option value="00">工位0</option>' +
					'<option value="02">工位1</option>' +
					'<option value="03">工位2</option>' +
					'<option value="04">工位3</option>' +
					'</select>' +
					'</td>' +
					'<td>' +
					'<input type="text"  class="number11 outLINE" style="    text-align: center;" value="' + result.outStoreDetailModels[i].number + '">' +
					'</td>' +
					'<td>' +
					'<input type="text"  class="unit11 outLINE" style="    text-align: center; " value="' + result.outStoreDetailModels[i].unit + '">' +
					'</td>' +
					'<td> ' +
					'<a id="removeBtn" class="btn btn-danger btn-sm remove"  style="outline: none;">删除</a>' +
					'</td>' +
					'</tr>';
				$('#inboundTbody2').append(tr);
				$(".selectYu").eq(i).val(result.outStoreDetailModels[i].productPosition);

				loadGoods(inboundTbody2);
			}
			$('.selectWarehouse').empty();
			for(var j = 0; j < result.outStoreDetailModels.length; j++) {
				var name = result.outStoreDetailModels[j].goodsName;
				//				alert(name)
				var warehouse = result.outStoreDetailModels[j].warehouse;
				//				alert(warehouse)
				var area1 = result.outStoreDetailModels[j].area;

				$.ajax({
					type: "post",
					url: ipAddress + '/out/queryWarehouse.do',
					async: false,
					data: {
						"productNo": name
					},
					success: function(result) {
						//console.log(result + "aaaaaaa")
						for(var i = 0; i < result.length; i++) {
							$('.selectWarehouse').append("<option value=" + result[i].warehouseNo + ">" + result[i].warehouseName + "</option>")
						}
						//loadArea(0, $parent);
					}
				});
				$('.selectArea').empty();
				$.ajax({
					type: "post",
					url: ipAddress + '/out/queryArea.do',
					async: false,
					data: {
						"productNo": name,
						"warehouseNo": warehouse
					},
					success: function(result) {
						console.log(result);
						for(var i = 0; i < result.length; i++) {
							//alert( result[0].areaId)
							$('.selectArea').append("<option value=" + result[i].areaId + ">" + result[i].areaName + "</option>")
						}
					}
				});
				$('#inboundTbody2').find("tr").eq(j).find(".selectgood").find("option[value='" + name + "']").attr("selected", "selected");
				$('#inboundTbody2').find("tr").eq(j).find(".selectWarehouse").find("option[value='" + warehouse + "']").attr("selected", "selected");
				$('#inboundTbody2').find("tr").eq(j).find(".selectArea").find("option[value='" + area1 + "']").attr("selected", "selected");
			}
			//点击删除按钮删除对应的商品
			$('.remove').off('click').click(function() {
				$(this).parent().parent().remove()
			})
		}
	});
}
//创建入库单编辑商品，动态添加入库明细
$('#tableAddIn4').off("click").on("click", function() {
	//var index = $('#removeOne tr').length;
	var tr = '<tr>' +
			'<td>' +
			'<select class="selectgood">' +
			'<option value="0">请选择</option>' +
			'</select>' +
			'</td>' +
			'<td>' +
			'<select class="selectYu">' +
			'<option value="05">请选择</option>' +
			'<option value="00">工位0</option>' +
			'<option value="02">工位1</option>' +
			'<option value="03">工位2</option>' +
			'<option value="04">工位3</option>' +
			'</select>' +
			'</td>' +
		'<td>' +
		'<input type="text" class="number11 outLINE" style="    text-align: center;">' +
		'</td>' +
		'<td>' +
		'<input type="text" class="unit11 outLINE" style="    text-align: center;" value="托">' +
		'</td>' +
		'<td> ' +
		'<a id="removeBtn" class="btn btn-danger btn-sm remove"  style="outline: none;">删除</a>' +
		'</td>' +
		'</tr>';
	$('#inboundTbody2').append(tr);
	loadGoods(inboundTbody2);
	//loadWarehouse(inboundTbody2);
	//点击删除按钮删除对应的商品
	$('.remove').off('click').click(function() {
		$(this).parent().parent().remove()
	})
})
//创建出库单编辑商品，编辑修改

$('#saveInbound2').click(function() {
	var inStoreDetailModelsArr2 = [];
	var inStoreTime = new Date().Format("yyyy-MM-dd HH:mm:ss");
	var $trs = $('#inboundTbody2').find("tr");
	console.log($('.selectArea').val())
	$trs.each(function() {
		var $trTemp = $(this);
		inStoreDetailModelsArr2.push({
			"goodsName": $trTemp.find('.selectgood').val(),
			"warehouse": $trTemp.find('.selectWarehouse').val(),
			"area": $trTemp.find('.selectArea').val(),
			"productPosition": $trTemp.find('.selectYu').val(),
			//"allocation": $trTemp.find('.selectAllocation').val(),
			"number": $trTemp.find(".number11").val(),
			"unit": $trTemp.find(".unit11").val(),
			"remark": "",
			"id": $trTemp.find('.editID').val()
		})
	})
	var data = {
		//"inStoreTime": inStoreTime,
		"outStoreAuthor": userInfo.username,
		"outStoreRemark": $('#editInStoreRemark').val(),
		"outStoreStatus": "",
		"outStoreDetailModels": inStoreDetailModelsArr2,
		"outStoreNumber": inStoreNo2
	}
	console.log(data)
	$.ajax({
		type: "post",
		url: ipAddress + '/out/modifyStore.do',
		async: true,
		data: JSON.stringify(data),
		contentType: 'application/json;charset=UTF-8',
		success: function(res) {
			console.log(res)
			if(res.code == 2010) {
				alert(res.message);
				loadQueryInStore()
			}

		}
	});
})

//生产出库单--删除部分
var deleteData;

function myDelete(obj) {
	var $tds = $(obj).parent().parent().children(); // 获取到所有列
	var delete_id = $($tds[0]).eq(0).children("input").val(); // 获取隐藏的ID
	deleteData = delete_id; // 将模态框中需要删除的大修的ID设为需要删除的ID
	//console.log(deleteData)
}

function deleteInsertOutStore() {

	$.ajax({
		type: "post",
		url: ipAddress + '/out/deleteStore.do',
		data: {
			"outStoreNumber": deleteData
		},
		async: false,
		success: function(result) {
			//console.log(result)
			//			if(result.code==4010){
			//				alert(result.message)
			//			}
			loadQueryOutStore(); //删除成功刷新页面
		}
	});
}

//生产出库单--提交部分
function submitInsertInStore() {
	//alert( deleteData)
	var data = {
		"storeCheckStatus": "1",
		"outStoreNumber": deleteData
	}
	$.ajax({
		type: "post",
		url: ipAddress + '/out/modifyStore.do',
		data: JSON.stringify(data),
		contentType: 'application/json;charset=UTF-8',
		success: function(result) {
			console.log(result)
			loadQueryOutStore(); //删除成功刷新页面
		}
	});
}
//待审核出库--查看
function lookInsertOutStore(obj, checkStoreNo) {
	$.ajax({
		type: "post",
		url: ipAddress + '/out/queryStore.do',
		async: true,
		data: {
			"outStoreNumber": checkStoreNo
		},
		success: function(result) {
			console.log(result)
			var tr = ''
			$('#lookInStoreNo').val(result.outStoreNumber);
			$("#lookInStoreNoT").val(result.outStoreTime)
			$('#lookInStoreAuthor').val(result.outStoreAuthor);
			$('#lookInStoreRemark').val(result.outStoreRemark);
			$('#inboundTbody3').html("");
			for(var i = 0; i < result.outStoreDetailModels.length; i++) {
				var productPosition = result.outStoreDetailModels[i].productPosition;
				if(productPosition == 00) {
					productPosition = "工位0";
				}
				if(productPosition == 02) {
					productPosition = "工位1";
				}
				if(productPosition == 03) {
					productPosition = "工位2";
				}
				if(productPosition == 04) {
					productPosition = "工位3";
				}
				tr += '<tr>' +
					'<td>' +
					'<input type="text" class=' + 'outLINE' + ' value="' + result.outStoreDetailModels[i].productName + '">' +
					'</td>' +
					//					'<td>' +
					//					'<input type="text" class=' + 'outLINE' + ' value="' + result.outStoreDetailModels[i].warehouse + '">' +
					//					'</td>' +
					//					'<td>' +
					//					'<input type="text" class=' + 'outLINE' + ' value="' + result.outStoreDetailModels[i].area + '">' +
					//					'</td>' +
					'<td>' +
					'<input type="text" class=' + 'outLINE' + ' value="' + productPosition + '">' +
					'</td>' +
					'<td>' +
					'<input type="text" class=' + 'outLINE' + ' value="' + result.outStoreDetailModels[i].number + '">' +
					'</td>' +
					'<td>' +
					'<input type="text" class=' + 'outLINE' + ' value="' + result.outStoreDetailModels[i].unit + '">' +
					'</td>' +
					'</tr>';

			}
			$('#inboundTbody3').append(tr);
		}
	})
}
//待审核入库单--通过

function passInsertOutStore(obj, checkId) {
	var data = {
		"checkId": checkId,
		"checkStatus": 1, //(1、成功,2、失败)
		"checkPeople": JSON.parse($.cookie('userInfo')).username,
		"storeStatus": 2
	}
	$.ajax({
		type: "post",
		url: ipAddress + '/examine/examineStore.do',
		data: JSON.stringify(data),
		contentType: 'application/json;charset=UTF-8',
		success: function(result) {
			if(result.code == 6010) {
				alert(result.message)
			}
			console.log(result)

			loadWaitOutnbound(); //删除成功刷新页面
		}
	});
}
//待审核入库单--拒绝
// 获取公用的checkId
var checkId;

function auditsStatus(id) {
	checkId = id;
}

function rejectInsertOutStore() {

	var data = {
		"storeStatus":2,
		"checkId": checkId,
		"checkStatus": 2, //(1、成功,2、失败)
		"checkPeople": JSON.parse($.cookie('userInfo')).username,
		"checkRemark": $('#refuseState').val()
	}
	$.ajax({
		type: "post",
		url: ipAddress + '/examine/examineStore.do',
		data: JSON.stringify(data),
		contentType: 'application/json;charset=UTF-8',
		success: function(result) {
			console.log(result)
			loadWaitOutnbound(); //删除成功刷新页面
			clearReject()
		}
	});
}
////待审核入库单--拒绝--关闭按钮清空
function clearReject() {
	$('#refuseState').val("")
}

//审核查询--查看
function lookInStoreSearch2(obj, checkId) {
	$.ajax({
		type: "post",
		url: ipAddress + '/examine/queryExamine.do',
		async: true,
		data: {
			"checkId": checkId,
			"storeStatus": '2'
		},
		success: function(result) {
			if(result.checkStatus == 1) {
				result.checkStatus = "通过"
			}
			if(result.checkStatus == 2) {
				result.checkStatus = "拒绝"
			}
			console.log(result)
			var tr = ""
			$('#lookInStoreNo1').val(result.checkStoreNo);
			$('#lookInStoreAuthor1').val(result.outStoreAuthor);
			$('#lookInStoreAuthor2').val(result.checkPeople);
			$('#lookInStoreTime').val(formatDateStr(result.checkTime));
			$('#lookResult').val(result.checkStatus);
			$('#lookReason').val(result.checkRemark);
			$('#inboundTbody4 tr').remove();
			for(var i = 0; i < result.instoreDetailVos.length; i++) {
				var productPosition = result.instoreDetailVos[i].productPosition;
				if(productPosition == 00) {
					productPosition = "工位0";
				}
				if(productPosition == 02) {
					productPosition = "工位1";
				}
				if(productPosition == 03) {
					productPosition = "工位2";
				}
				if(productPosition == 04) {
					productPosition = "工位3";
				}
				tr += '<tr>' +
					'<td>' +
					'<input type="text" class=' + 'outLINE' + ' value="' + result.instoreDetailVos[i].productName + '">' +
					'</td>' +
					'<td>' +
					'<input type="text" class=' + 'outLINE' + ' value="' + productPosition + '">' +
					'</td>' +
					//					'<td>' +
					//					'<input type="text" class=' + 'outLINE' + ' value="' + result.instoreDetailVos[i].trayId + '">' +
					//					'</td>' +

					'<td>' +
					'<input type="text" class=' + 'outLINE' + ' value="' + result.instoreDetailVos[i].number + '">' +
					'</td>' +
					'<td>' +
					'<input type="text" class=' + 'outLINE' + ' value="' + result.instoreDetailVos[i].unit + '">' +
					'</td>' +
					'</tr>';
			}
			$('#inboundTbody4').append(tr);
		}
	})
}

//出库查询--查看
function lookInStoreSearch(obj, outStoreNumber) {
	//alert(checkStoreNo)
	$.ajax({
		type: "post",
		url: ipAddress + '/out/queryStore.do',
		async: true,
		data: {
			"outStoreNumber": outStoreNumber
		},
		success: function(result) {
			console.log(result)
			var tr = ''
			$('#lookInStoreNo').val(result.outStoreNumber);
			$("#lookInStoreNoT").val(result.outStoreTime)
			$('#lookInStoreAuthor').val(result.outStoreAuthor);
			$('#lookInStoreRemark').val(result.outStoreRemark);
			$('#inboundTbody3').html("");
			for(var i = 0; i < result.outStoreDetailModels.length; i++) {
				tr += '<tr>' +
					'<td>' +
					'<input type="text" class=' + 'outLINE' + ' value="' + result.outStoreDetailModels[i].goodsName + '">' +
					'</td>' +
					'<td>' +
					'<input type="text" class=' + 'outLINE' + ' value="' + result.outStoreDetailModels[i].warehouse + '">' +
					'</td>' +
					'<td>' +
					'<input type="text" class=' + 'outLINE' + ' value="' + result.outStoreDetailModels[i].area + '">' +
					'</td>' +
					'<td>' +
					'<input type="text" class=' + 'outLINE' + ' value="' + result.outStoreDetailModels[i].number + '">' +
					'</td>' +
					'<td>' +
					'<input type="text" class=' + 'outLINE' + ' value="' + result.outStoreDetailModels[i].unit + '">' +
					'</td>' +
					'</tr>';

			}
			$('#inboundTbody3').append(tr);
		}
	})
}
//日期格式化
Date.prototype.Format = function(fmt) {

	var o = {

		"M+": this.getMonth() + 1, //月份 

		"d+": this.getDate(), //日 

		"H+": this.getHours(), //小时 

		"m+": this.getMinutes(), //分 

		"s+": this.getSeconds(), //秒 

		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 

		"S": this.getMilliseconds() //毫秒 

	};

	if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));

	for(var k in o)

		if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

	return fmt;

}

//待审核出库单--重置
function resetting1() {
	document.getElementById('form1').reset();
	data2.criteria.inStoreAuthor = '';
	data2.pageIndex = 1
	loadWaitOutnbound();
}
/*创建入库单--动态加载商品名称*/
var goodsName;
var $parent;

function loadGoods(id) {
	var data = {};
	var $tr = $(id).find("tr").last();
	$tr.find('.selectgood').empty() //清空商品名称select列表数据
	$tr.find('.selectgood').prepend("<option value='0' >请选择</option>") //添加第一个option值
	$.ajax({
		type: "post",
		url: ipAddress + '/product/queryGoods.do',
		async: false,
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(data),
		success: function(result) {
			console.log(result)
			for(var i = 0; i < result.data.length; i++) {
				$tr.find('.selectgood').append("<option value=" + result.data[i].productNo + ">" + result.data[i].productName + "</option>")
			}
		}
	});
	//创建入库单--商品入库单改变时取值
	$('.selectgood').on('change', function() {
		goodsName = $(this).val();
		//alert(goodsName)
		$parent = $(this).parent().parent();
		loadWarehouse($parent)
	})
}

/*创建入库单--二级联动加载仓库名称下拉列表*/
var warehouse;

function loadWarehouse($parent) {
	$parent.find('.selectWarehouse').html(""); //清空select列表数据
	$parent.find('.selectWarehouse').prepend("<option value='0' >请选择</option>") //添加第一个option值
	$.ajax({
		type: "post",
		url: ipAddress + '/out/queryWarehouse.do',
		async: false,
		data: {
			"productNo": goodsName
		},
		success: function(result) {
			console.log(result)
			for(var i = 0; i < result.length; i++) {
				$parent.find('.selectWarehouse').append("<option value=" + result[i].warehouseNo + ">" + result[i].warehouseName + "</option>")
			}
			loadArea(0, $parent);
		}
	});

	//创建入库单--仓库改变时取值
	$('.selectWarehouse').on('change', function() {
		warehouse = $(this).val();
		$parent = $(this).parent().parent(); //该仓库所在的tr
		//alert(warehouse)
		if(warehouse == "0") {
			loadArea(0, $parent);
		} else {
			loadArea(warehouse, $parent)
		}
	})
}

/*当选择仓库后三级联动加载库区*/
var area2;

function loadArea(warehouse, $parent) {
	//alert(goodsName)
	$parent.find('.selectArea').empty(); //清空库区名称select列表数据
	$parent.find('.selectArea').prepend("<option value='0' >请选择</option>") //添加第一个option值
	if(warehouse != 0) {
		$.ajax({
			type: "post",
			url: ipAddress + '/out/queryArea.do',
			async: false,
			data: {
				"productNo": goodsName,
				"warehouseNo": warehouse
			},
			success: function(result) {
				console.log(result);
				for(var i = 0; i < result.length; i++) {
					$parent.find('.selectArea').append("<option value=" + result[i].areaId + ">" + result[i].areaName + "</option>")
				}
			}
		});
	}
	//当库区名称改变时候取值
	$('.selectArea').on("change", function() {
		area2 = $(this).val();
		//			alert(area2)
		//			$parent = $(this).parent().parent();
		//			if(area2 == "0") {
		//				loadAllocation(0, $parent);
		//			} else {
		//				loadAllocation(warehouse, $parent)
		//			}

	})
}
//出库操作--置顶
var inStoreTopstatus;

function toTop(obj, inStoreNo) {
	$(obj).attr('class', "disabled") //置顶成功该按钮不可点击
	var $tr = $(obj).parent().parent();
	//	var inStoreTopstatus=$($tr).eq(0).children("input").val();
	//	alert(inStoreTopstatus)
	inStoreTopstatus = 1
	data = {
		"inStoreNo": inStoreNo,
		"inStoreTopstatus": inStoreTopstatus
	}
	//	$.ajax({
	//		type:"post",
	//		url:ipAddress + '/InStore/updateInStore.do',
	//		async:true,
	//		data: JSON.stringify(data),
	//		contentType: 'application/json;charset=UTF-8',
	//		success:function(result){
	//			if(result.code==3010){
	//				alert("置顶成功")
	//			}
	//			
	//			inStoreTopstatus=0;
	//			//$tr.children("input").attr("value",'0')
	//			$('#myTable7 tbody').prepend($tr);//置顶成功该行转至首行
	//			//$(obj).
	//			loadInboundOperate()//置顶结束局部刷新该入库操作页面
	//		}
	//	});	
}
//出库操作--暂停开始切换
var flag = true;

function endToStart(obj) {
	if($(obj).text() == "暂停") {
		$(obj).text("开始");
		flag = false;
	} else {
		$(obj).text("暂停");
		flag = true;
	}
}
//出库操作--取消
function cancel(obj) {
	$(obj).parent().parent().remove()
}
// 权限划分
var userInfo = JSON.parse($.cookie('userInfo'));
console.log('userInfo=', userInfo);
var roleId = userInfo.roleId; // 1 管理员,2操作员,3审核员
if(roleId == 2) {
	$('.menu ul li:eq(0)').css('display', 'none');
	$('.menu ul li:eq(5)').css('display', 'none');
	$('.menu ul li:eq(6)').css('display', 'none');
	$('.menu ul li:eq(7)').css('display', 'none');
	$('#navRu li:eq(1)').css('display', 'none');
	$('#navRu li:eq(0)').removeClass("active");
	$("#navChu li:eq(1)").css('display', 'none');
	$('#navChu li:eq(0)').removeClass("active");
} else if(roleId == 3) {
	$('.menu ul li:eq(0)').css('display', 'none');
	$('.menu ul li:eq(5)').css('display', 'none');
	$('.menu ul li:eq(6)').css('display', 'none');
	$('.menu ul li:eq(7)').css('display', 'none');
	$('#navRu li:eq(0)').css('display', 'none');
	$('#navRu li:eq(1)').addClass("active");
	$("#navChu li:eq(0)").css('display', 'none');
	$('#navChu li:eq(1)').addClass("active");
}