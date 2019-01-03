 /*
 * 代码创建人：何丹丹
 *创建时间：2018-10-19
 * 创建内容描述：入库管理模块
 */
//! function() {
//	laydate.skin('molv'); //切换皮肤，请查看skins下面皮肤库
//	laydate({
//		elem: '#startTime1',
//		// istime: true,
//		// format: 'YYYY-MM-DD hh:mm:ss',
//		max: laydate.now() //-1代表昨天，-2代表前天，以此类推
//	});
//	laydate({
//		elem: '#startTime2',
//		max: laydate.now() //-1代表昨天，-2代表前天，以此类推
//	});
//	laydate({
//		elem: '#startTime3',
//		max: laydate.now() //-1代表昨天，-2代表前天，以此类推
//	});
//	laydate({
//		elem: '#startTime4',
//		max: laydate.now() //-1代表昨天，-2代表前天，以此类推
//	});
//	laydate({
//		elem: '#startTime5',
//		max: laydate.now() //-1代表昨天，-2代表前天，以此类推
//	});
//	laydate({
//		elem: '#startTime6',
//		max: laydate.now() //-1代表昨天，-2代表前天，以此类推
//	});
//	laydate({
//		elem: '#endTime1',
//		max: laydate.now() //-1代表昨天，-2代表前天，以此类推
//	});
//}();

var loadQueryInStore, loadWaitInbound, loadExamine, loadInboundSearch, loadInboundOperate;
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
		loadUserDepartment()
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
		data5.criteria.checkStatus = 0;
		load5()
		$('.M-box5').show();
		$('.M-box5').siblings().hide();
	})

	/*
	 * 生产入库单显示查询
	 */
	var data1 = {
		"pageIndex": 1,
		"recordCount": 10,
		"criteria": {
			//"status": "0",		
		}
	}

	function load1() { //点击生产入库单页面加载表格数据	
		$.ajax({
			type: "post",
			url: ipAddress + '/InStore/queryInStore.do',
			async: true,
			data: JSON.stringify(data1),
			contentType: 'application/json;charset=UTF-8',
			success: function(result) {
				//console.log(result)

				if(result.data.length == 0) {
					data1.pageIndex -= 1;
					if(data1.pageIndex != 0) {
						load1()
					}
				}

				$('#myTable1 tbody tr').remove();
				data1.pageIndex = result.currentPage; //记录页数为当前页
				for(var i = 0; i < result.data.length; i++) {
					var html1 = '<tr>' +
						'<td>' + '<input type="hidden" value="' + result.data[i].inStoreNo + '"  />' + (data1.pageIndex * 10 - 9 + i) +
						'</td>' +
						'<td>' + result.data[i].inStoreNo +
						'</td>' +
						'<td>' + result.data[i].inStoreTime +
						'</td>' +
						/*'<td>' + result.data[i].inStoreAuthor +
						'</td>' +*/
						'<td>' + result.data[i].inStoreRemark +
						'</td>' +
						'<td>' + '<a class="btn btn-primary" data-toggle="modal" data-target="#check" style="outline: none;    margin-right: 7px;" onclick="editorQueryInStore(this,' + result.data[i].inStoreNo + ')">编辑</a>' +
						' <a class="btn btn-primary" data-toggle="modal" data-target="#submitInsertInStore" style="outline: none;"onclick="myDelete(this)">提交</a>' +
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
							url: ipAddress + '/InStore/queryInStore.do',
							async: true,
							data: JSON.stringify(data1),
							contentType: 'application/json;charset=UTF-8',
							success: function(result) {
								//console.log(result)
								if(result.data.length == 0) {
									data1.pageIndex -= 1;
									if(data1.pageIndex != 0) {
										load1()
									}
								}
								$('#myTable1 tbody tr').remove();
								data1.pageIndex = result.currentPage; //记录页数为当前页
								$('#myTable1 tbody').html('');
								for(var i = 0; i < result.data.length; i++) {
									var html1 = '<tr>' +
										'<td>' + '<input type="hidden" value="' + result.data[i].inStoreNo + '"  />' + (data1.pageIndex * 10 - 9 + i) +
										'</td>' +
										'<td>' + result.data[i].inStoreNo +
										'</td>' +
										'<td>' + result.data[i].inStoreTime +
										'</td>' +
										/*'<td>' + result.data[i].inStoreAuthor +
										'</td>' +*/
										'<td>' + result.data[i].inStoreRemark +
										'</td>' +
										'<td>' + '<a class="btn btn-primary" data-toggle="modal" data-target="#check" style="outline: none;    margin-right: 7px;" onclick="editorQueryInStore(this,' + result.data[i].inStoreNo + ')">编辑</a>' +
										' <a class="btn btn-primary" data-toggle="modal" data-target="#submitInsertInStore" style="outline: none;" onclick="myDelete(this)">提交</a>' +
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
	loadQueryInStore = load1;
	load1()

	//创建入库单新增商品，动态添加入库明细

	$('#tableAddIn3').off("click").on("click", function() {
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
//			'<input type="text"  class=" trayId outLINE"  style="    text-align: center;" >' +
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
		//		loadWarehouse(inboundTbody);
		//点击删除按钮删除对应的商品
		$('.remove').off('click').click(function() {
			$(this).parent().parent().remove()
		})
		//托盘判断
//		$(".trayId").on("change", function() {
//			$.ajax({
//				type: "post",
//				url: ipAddress + '/InStore/getTray.do',
//				async: true,
//				data: {
//					"trayNo": $(".trayId").val()
//				},
//				success: function(result) {
//					//console.log(result)
//					if(result.code == 6011) {
//						alert(result.message)
//					} else if(result.code == 6012) {
//						alert(result.message)
//					} else if(result.code == 6010) {
//						alert(result.message)
//					} else {
//						$('#saveInbound').removeAttr("disabled")
//					}
//				}
//			});
//		})
//			if($(".selectgood option:selected").val() != 0 && $(".selectYu").val() != 0 && $(".trayId").val() != '') {
	$('.selectgood').on('change',function(){
		if($(".selectgood option:selected").val() != 0&&$(".selectYu option:selected").val() != 05){
			
			$('#saveInbound').removeAttr("disabled")
			
		}else{
			$('#saveInbound').attr('disabled', 'disabled')
		}
			})
		$('.selectYu').on('change',function(){
		if($(".selectgood option:selected").val() != 0&&$(".selectYu option:selected").val() != 05){
			
			$('#saveInbound').removeAttr("disabled")
			
		}else{
			$('#saveInbound').attr('disabled', 'disabled')
		}
		
	})

	})


	//入库单交互
	var userInfo = JSON.parse($.cookie('userInfo')); //根据登录获取用户信息
	//console.log(userInfo)
	$('#inStoreAuthor').val(userInfo.username) //操作员根据用户登录自动获取
	$('#saveInbound').on('click', function() {
		var inStoreDetailModelsArr = [];
		var inStoreTime = new Date().Format("yyyy-MM-dd HH:mm:ss");
		var $trs = $('#inboundTbody').find("tr");
		$trs.each(function() {
			var $trTemp = $(this);
			inStoreDetailModelsArr.push({
				"goodsName": $trTemp.find('.selectgood').val(),
				"warehouse": $trTemp.find('.selectWarehouse').val(),
				"area": $trTemp.find('.selectArea').val(),
				"productPosition": $trTemp.find('.selectYu').val(),
				"trayId": $trTemp.find('.trayId').val(),
				"number": $trTemp.find(".number11").val(),
				"unit": $trTemp.find(".unit11").val(),

			})
		})
		var data = {
			"inStoreTime": inStoreTime,
			"inStoreAuthor": userInfo.username,
			"inStoreRemark": $('#inStoreRemark').val(),
			"inStoreStatus": "",
			"inStoreDetailModels": inStoreDetailModelsArr
		}
		$.ajax({
			type: "post",
			url: ipAddress + '/InStore/insertInStore.do',
			async: true,
			data: JSON.stringify(data),
			contentType: 'application/json;charset=UTF-8',
			success: function(res) {
				if(res.code == 2010) {
					alert(res.message);
					loadQueryInStore()
				}
				clearInsertInStore() //创建入库单--点击关闭清空数据

			}
		});
	})

	/*
	 * 待审核入库单显示查询
	 */
	var data2={};
	function load2() {
	data2 = {
		"pageIndex": 1,
		"recordCount": 10,
		"criteria": {
			"storeStatus": "1",
			"checkStatus": '0',
			"inStoreAuthor": '',
			"storeTime": ''
		}
	}

	 //点击生产入库单页面加载表格数据	
		//console.log(data2)
		$.ajax({
			type: "post",
			url: ipAddress + '/examine/queryCheckInStore.do',
			async: true,
			data: JSON.stringify(data2),
			contentType: 'application/json;charset=UTF-8',
			success: function(result) {
				console.log(result)
				if(result.data.length == 0) {
					data2.pageIndex -= 1;
					if(data2.pageIndex != 0) {
						load2()
					}
				}

				$('#myTable2 tbody tr').remove();
				data2.pageIndex = result.currentPage; //记录页数为当前页
				for(var i = 0; i < result.data.length; i++) {

					var html2 = '<tr>' +
						'<td>' + '<input type="hidden" value="' + result.data[i].checkId + '"  />' + (data2.pageIndex * 10 - 9 + i) +
						'</td>' +
						'<td>' + result.data[i].checkStoreNo +
						'</td>' +
						'<td>' + formatDateStr(result.data[i].storeTime) +
						'</td>' +
						'<td>' + result.data[i].inStoreAuthor +
						'</td>' +

						'<td>' + '<a class="btn btn-primary" data-toggle="modal" data-target="#look" style="outline: none;    margin-right: 7px;" onclick="lookInsertInStore(this,' + result.data[i].checkStoreNo + ')" >查看</a>' +
						' <a class="btn btn-primary" data-toggle="modal"  style="outline: none;"onclick="passInsertInStore(this,' + result.data[i].checkId + ')">通过</a>' +
						'<a class="btn btn-danger"  data-toggle="modal" data-target="#rejuct" style="outline: none;     margin-left: 10px;" onclick="auditsStatus(' + result.data[i].checkId + ')" >拒绝</a>' +
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
							url: ipAddress + '/examine/queryCheckInStore.do',
							async: true,
							data: JSON.stringify(data2),
							contentType: 'application/json;charset=UTF-8',
							success: function(result) {
								console.log(result)
								if(result.data.length == 0) {
									data2.pageIndex -= 1;
									if(data2.pageIndex != 0) {
										load2()
									}
								}
								$('#myTable2 tbody tr').remove();
								data2.pageIndex = result.currentPage; //记录页数为当前页
								$('#myTable2 tbody').html('');
								for(var i = 0; i < result.data.length; i++) {
									var html2 = '<tr>' +
										'<td>' + '<input type="hidden" value="' + result.data[i].checkId + '"  />' + (data2.pageIndex * 10 - 9 + i) +
										'</td>' +
										'<td>' + result.data[i].checkStoreNo +
										'</td>' +
										'<td>' + formatDateStr(result.data[i].storeTime) +
										'</td>' +
										'<td>' + result.data[i].inStoreAuthor +
										'</td>' +

										'<td>' + '<a class="btn btn-primary" data-toggle="modal" data-target="#look" style="outline: none;    margin-right: 7px;"  onclick="lookInsertInStore(this,' + result.data[i].checkStoreNo + ')" >查看</a>' +
										' <a class="btn btn-primary" data-toggle="modal" data-target="#submit2" style="outline: none;"onclick="passInsertInStore(this,' + result.data[i].checkId + ')">通过</a>' +
										'<a class="btn btn-danger" data-toggle="modal" data-target="#rejuct"  style="outline: none;     margin-left: 10px;"onclick="auditsStatus(' + result.data[i].checkId + ')"  >拒绝</a>' +
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
	loadWaitInbound = load2;
	//待审核入库单--动态加载业务员select下拉列表
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
				//console.log(result)
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
		//alert(inboundQueryId)
	})

	// 待审核入库单--根据业务员日期进行入库查询

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
	/*
	 审核查询
	 * */
	//审核查询搜索--根据状态查询(通过、拒绝)

	var checkVal=0;
	$('#auditEnquiries').click(function() {
		checkVal = $('input:radio[name="optionsRadiosinline"]:checked').val();
		if(checkVal == 0) {
//			checkVal = '';
		}
		data5.criteria.checkStatus =checkVal;
		data5.pageIndex = 1;
		load5()
	})
	var data5 = {
		"pageIndex": 1,
		"recordCount": 10,
		"criteria": {
			"storeStatus": "1",
			"checkStatus":" checkVal" //(0,所有，1、成功  2、失败)
		}
	}

	function load5() { //点击生产入库单页面加载表格数据	
				//alert(data5.criteria.checkStatus)
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
					if(data5.pageIndex != 0) {
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
						'<td>' + '<input type="hidden" value="' + result.data[i].checkId + '"  />' + (data5.pageIndex * 10 - 9 + i) +
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
								console.log(result)
								if(result.data.length == 0) {
									data5.pageIndex -= 1;
									if(data5.pageIndex != 0) {
										load5()
									}
								}

								$('#myTable4 tbody tr').remove();
								data5.pageIndex = result.currentPage; //记录页数为当前页
								$('#myTable4 tbody').html('');
								//alert(data5.pageIndex)
								for(var i = 0; i < result.data.length; i++) {
									if(result.data[i].checkStatus == 1) {
										result.data[i].checkStatus = "通过"
									}
									if(result.data[i].checkStatus == 2) {
										result.data[i].checkStatus = "拒绝"
									}
									var html = '<tr>' +
										'<td>' + '<input type="hidden" value="' + result.data[i].checkId + '"  />' + (data5.pageIndex * 10 - 9 + i) +
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

	/*入库查询部分*/
	//入库状态选中获取选中的value
	var instoreVal;
	$('#instoreStatus').change(function() {
		instoreVal = $('#instoreStatus option:selected').val();
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
			//"storeStatus": "1",			
		}
	}

	function load3() { //点击入库查询页面加载表格数据			
		$.ajax({
			type: "post",
			url: ipAddress + '/InStore/queryInStore.do',
			async: true,
			data: JSON.stringify(data3),
			contentType: 'application/json;charset=UTF-8',
			success: function(result) {
				console.log(result)
				if(result.data.length == 0) {
					data3.pageIndex -= 1;
					if(data3.pageIndex != 0) {
						load3()
					}
				}

				$('#myTable6 tbody tr').remove();
				data3.pageIndex = result.currentPage; //记录页数为当前页
				for(var i = 0; i < result.data.length; i++) {
					var html = '<tr>' +
						'<td>' + '<input type="hidden" value="' + result.data[i].inStoreNo + '"  />' + (data3.pageIndex * 10 - 9 + i) +
						'</td>' +
						'<td>' + result.data[i].inStoreNo +
						'</td>' +
						'<td>' + result.data[i].inStoreTime +
						'</td>' +
						'<td>' + result.data[i].inStoreAuthor +
						'</td>' +

						'<td>' + result.data[i].inStoreStatus +
						'</td>' +
						//						'<td>' + '<a class="btn btn-primary" data-toggle="modal" data-target="#look" style="outline: none;    margin-right: 7px;" onclick="lookInStoreSearch(this,' + result.data[i].inStoreNo + ')" >查看</a>' +
						//						'</td>' +
						'</tr>'
					$('#myTable6 tbody').append(html)
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
							url: ipAddress + '/InStore/queryInStore.do',
							async: true,
							data: JSON.stringify(data3),
							contentType: 'application/json;charset=UTF-8',
							success: function(result) {
								console.log(result)
								if(result.data.length == 0) {
									data3.pageIndex -= 1;
									if(data3.pageIndex != 0) {
										load3()
									}
								}

								$('#myTable6 tbody tr').remove();
								data3.pageIndex = result.currentPage; //记录页数为当前页
								$('#myTable6 tbody').html('');
								//alert(data5.pageIndex)
								for(var i = 0; i < result.data.length; i++) {
									//									if(result.data[i].checkStatus == 1) {
									//										result.data[i].checkStatus = "通过"
									//									}
									//									if(result.data[i].checkStatus == 2) {
									//										result.data[i].checkStatus = "拒绝"
									//									}
									var html = '<tr>' +
										'<td>' + '<input type="hidden" value="' + result.data[i].inStoreNo + '"  />' + (data3.pageIndex * 10 - 9 + i) +
										'</td>' +
										'<td>' + result.data[i].inStoreNo +
										'</td>' +
										'<td>' + result.data[i].inStoreTime +
										'</td>' +
										'<td>' + result.data[i].inStoreAuthor +
										'</td>' +

										'<td>' + result.data[i].inStoreStatus +
										'</td>' +
										//										'<td>' + '<a class="btn btn-primary" data-toggle="modal" data-target="#look" style="outline: none;    margin-right: 7px;" onclick="lookInStoreSearch(this,' + result.data[i].inStoreNo + ')" >查看</a>' +
										//										'</td>' +
										'</tr>'
									$('#myTable6 tbody').append(html)
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
	loadInboundSearch = load3;

	/*入库操作部分*/
	//	var data4 = {
	//		"pageIndex": 1,
	//		"recordCount": 10,
	//		"criteria": {
	//			"status": "1",			
	//		}
	//	}
	//
	//	function load4() { //点击入库查询页面加载表格数据			
	//		$.ajax({
	//			type: "post",
	//			url: ipAddress + '/InStore/queryInStore.do',
	//			async: true,
	//			data: JSON.stringify(data4),
	//			contentType: 'application/json;charset=UTF-8',
	//			success: function(result) {
	//				console.log(result)
	//				if(result.data.length == 0) {
	//					data4.pageIndex -= 1;
	//					if(data4.pageIndex != 0) {
	//						load4()
	//					}
	//				}
	//
	//				$('#myTable7 tbody tr').remove();
	//				data4.pageIndex = result.currentPage; //记录页数为当前页
	//				for(var i = 0; i < result.data.length; i++) {
	//					var html = '<tr>' +
	//						'<td>' + '<input type="hidden" value="' + result.data[i].inStoreTopstatus + '"  />' + (data4.pageIndex * 10 - 9 + i) +
	//						'</td>' +
	//						'<td>' + result.data[i].inStoreNo +
	//						'</td>' +
	//						'<td>' + result.data[i].inStoreTime +
	//						'</td>' +
	//
	//						'<td>' + result.data[i].inStoreStatus +
	//						'</td>' +
	//						'<td>' + '<a class="btn btn-primary "  data-toggle="modal"  style="outline: none;    margin-right: 7px;"  onclick="toTop(this,' + result.data[i].inStoreNo + ')">置顶</a>' +
	//						' <a class="btn btn-primary" data-toggle="modal"  style="outline: none;" onclick="endToStart(this)">开始</a>' +
	//						'<a class="btn btn-danger"  data-toggle="modal" style="outline: none;     margin-left: 10px;" onclick="cancel(this)">取消</a>' +
	//						'</td>' +
	//						'</tr>'
	//					$('#myTable7 tbody').append(html)
	//				}
	//				//分页
	//				$('.M-box4').pagination({
	//					pageCount: result.totalPage, //总页码
	//					jump: true, //是否开启跳转，true是开启
	//					coping: true, //是否开启首页和末页，此处开启
	//					homePage: '首页',
	//					endPage: '末页',
	//					prevContent: '上页',
	//					nextContent: '下页',
	//					current: data4.pageIndex, //当前页码
	//					callback: function(api) { //这是一个回调函数					
	//						data4.pageIndex = api.getCurrent();
	//						$.ajax({
	//							type: "post",
	//							url: ipAddress + '/InStore/queryInStore.do',
	//							async: true,
	//							data: JSON.stringify(data4),
	//							contentType: 'application/json;charset=UTF-8',
	//							success: function(result) {
	//								console.log(result)
	//								if(result.data.length == 0) {
	//									data4.pageIndex -= 1;
	//									if(data4.pageIndex != 0) {
	//										load4()
	//									}
	//								}
	//
	//								$('#myTable7 tbody tr').remove();
	//								data4.pageIndex = result.currentPage; //记录页数为当前页
	//								$('#myTable7 tbody').html('');
	//								//alert(data5.pageIndex)
	//								for(var i = 0; i < result.data.length; i++) {
	//									//									if(result.data[i].checkStatus == 1) {
	//									//										result.data[i].checkStatus = "通过"
	//									//									}
	//									//									if(result.data[i].checkStatus == 2) {
	//									//										result.data[i].checkStatus = "拒绝"
	//									//									}
	//									var html = '<tr>' +
	//										'<td>' + '<input type="hidden" value="' +  result.data[i].inStoreTopstatus + '"  />' + (data4.pageIndex * 10 - 9 + i) +
	//										'</td>' +
	//										'<td>' + result.data[i].inStoreNo +
	//										'</td>' +
	//										'<td>' + result.data[i].inStoreTime +
	//										'</td>' +
	//
	//										'<td>' + result.data[i].inStoreStatus +
	//										'</td>' +
	//										'<td>' + '<a class="btn btn-primary " data-toggle="modal"  style="outline: none;    margin-right: 7px;" onclick="toTop(this,' + result.data[i].inStoreNo + ')" >置顶</a>' +
	//										' <a class="btn btn-primary" data-toggle="modal"  style="outline: none;" onclick="endToStart(this)">开始</a>' +
	//										'<a class="btn btn-danger"  data-toggle="modal" style="outline: none;     margin-left: 10px;"onclick="cancel(this)" >取消</a>' +
	//										'</td>' +
	//										'</tr>'
	//									$('#myTable7 tbody').append(html)
	//								}
	//							},
	//							error: function() {
	//								alert('没有找到对应的结果！')
	//							}
	//						})
	//					}
	//				});
	//			}
	//		});
	//	}
	//	loadInboundOperate = load4;


})

//创建入库单--点击关闭清空数据
function clearInsertInStore() {
	$('#inStoreRemark').val(""); //点击保存备注清空
	$('#myTable3 tbody tr').remove() //点击保存后入库明细清空
	$("#saveInbound").attr("disabled", "disabled")
}
//生产入库单--编辑部分
var inStoreNo2;
var editID;

function editorQueryInStore(obj, inStoreNo) {
	inStoreNo2 = inStoreNo;
	$.ajax({
		type: "post",
		url: ipAddress + '/InStore/queryInStoreById.do',
		async: true,
		data: {
			"inStoreNo": inStoreNo
		},
		success: function(result) {
			console.log(result[0])
			$('#editInStoreNo').val(result[0].inStoreNo);
			$('#editInStoreAuthor').val(result[0].inStoreAuthor);
			$('#editInStoreRemark').val(result[0].inStoreRemark);
			$('#inboundTbody2').html("")
			for(var i = 0; i < result[0].inStoreDetailModels.length; i++) {
				var tr = '<tr>' + '<input type="hidden" class="editID" value="' + result[0].inStoreDetailModels[i].id + '"  />' +
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
					//					'<td>' +
					//					'<select class="selectWarehouse">' +
					//					'</select>' +
					//					'</td>' +
					//					'<td>' +
					//					'<select class="selectArea">' +
					//					'</select>' +
					//					'</td>' +
//					'<td>' +
//					'<input type="text"  class=" trayId outLINE"  style="    text-align: center;" value="' + result[0].inStoreDetailModels[i].trayId + '">' +
//					'</td>' +
					'<td>' +
					'<input type="text"  class="number11 outLINE" style="    text-align: center;" value="' + result[0].inStoreDetailModels[i].number + '">' +
					'</td>' +
					'<td>' +
					'<input type="text"   class="unit11 outLINE" style="    text-align: center; "value="' + result[0].inStoreDetailModels[i].unit + '">' +
					'</td>' +
					'<td> ' +
					'<a id="removeBtn" class="btn btn-danger btn-sm remove"  style="outline: none;">删除</a>' +
					'</td>' +
					'</tr>';
				$('#inboundTbody2').append(tr);
				//alert(result[0].inStoreDetailModels[i].productPosition)
				$(".selectYu").eq(i).val(result[0].inStoreDetailModels[i].productPosition);
				loadGoods(inboundTbody2);

				//loadWarehouse(inboundTbody2);

			}

			for(var j = 0; j < result[0].inStoreDetailModels.length; j++) {

				var name = result[0].inStoreDetailModels[j].goodsName;
				var warehouse = result[0].inStoreDetailModels[j].warehouse;
				var area1 = result[0].inStoreDetailModels[j].area;

				var datas = {
					"criteria": {
						"warehouseNo": warehouse
					}
				}

				$.ajax({
					type: "post",
					url: ipAddress + '/area/queryArea.do',
					async: false,
					contentType: 'application/json;charset=UTF-8',
					data: JSON.stringify(datas),
					success: function(result) {
						console.log(result);
						for(var i = 0; i < result.data.length; i++) {
							$('.selectArea').append("<option value=" + result.data[i].areaId + ">" + result.data[i].areaName + "</option>")
						}
						//						loadAllocation(0, $parent); //当仓库为请选择后，库区变成请选择，传参value=0给货位，让货位也变成请选择
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
//		'<td>' +
//		'<input type="text"  class=" trayId outLINE"  style="    text-align: center;">' +
//		'</td>' +
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
	$('#inboundTbody2').append(tr);
	loadGoods(inboundTbody2);
	//loadWarehouse(inboundTbody2);
	//点击删除按钮删除对应的商品
	$('.remove').off('click').click(function() {
		$(this).parent().parent().remove()
	})
})
//创建入库单编辑商品，编辑修改

$('#saveInbound2').click(function() {
	var inStoreDetailModelsArr2 = [];
	var inStoreTime = new Date().Format("yyyy-MM-dd HH:mm:ss");
	var $trs = $('#inboundTbody2').find("tr");
	$trs.each(function() {
		var $trTemp = $(this);
		inStoreDetailModelsArr2.push({
			"goodsName": $trTemp.find('.selectgood').val(),
			"warehouse": $trTemp.find('.selectWarehouse').val(),
			"area": $trTemp.find('.selectArea').val(),
			"productPosition": $trTemp.find('.selectYu').val(),
			"trayId": $trTemp.find('.trayId').val(),
			"number": $trTemp.find(".number11").val(),
			"unit": $trTemp.find(".unit11").val(),
			"remark": "",
			"id": $trTemp.find('.editID').val()
		})
		console.log(inStoreDetailModelsArr2)
	})
	var data = {
		//"inStoreTime": inStoreTime,
		"inStoreAuthor": userInfo.username,
		"inStoreRemark": $('#editInStoreRemark').val(),
		"inStoreStatus": "",
		"inStoreDetailModels": inStoreDetailModelsArr2,
		"inStoreNo": inStoreNo2
	}
	console.log(data)
	$.ajax({
		type: "post",
		url: ipAddress + '/InStore/updateInStore.do',
		async: true,
		data: JSON.stringify(data),
		contentType: 'application/json;charset=UTF-8',
		success: function(res) {
			//console.log(res)
			if(res.code == 2010) {
				alert(res.message);
				loadQueryInStore()
			}

		}
	});
})

//生产入库单--删除部分
var deleteData;

function myDelete(obj) {
	var $tds = $(obj).parent().parent().children(); // 获取到所有列
	var delete_id = $($tds[0]).eq(0).children("input").val(); // 获取隐藏的ID
	deleteData = delete_id; // 将模态框中需要删除的大修的ID设为需要删除的ID

}

function deleteInsertInStore() {
	//console.log(deleteData)
	$.ajax({
		type: "post",
		url: ipAddress + '/InStore/deleteInStore.do',
		data: {
			"inStoreNo": deleteData
		},
		async: false,
		success: function(result) {
			loadQueryInStore(); //删除成功刷新页面
		}
	});
}
//生产入库单--提交部分
function submitInsertInStore() {
	var data = {
		"storeCheckStatus": "1",
		"inStoreNo": deleteData
	}
	$.ajax({
		type: "post",
		url: ipAddress + '/InStore/updateInStore.do',
		data: JSON.stringify(data),
		contentType: 'application/json;charset=UTF-8',
		success: function(result) {
			console.log(result)

			loadQueryInStore(); //删除成功刷新页面
		}
	});
}
//待审核入库单--查看部分
function lookInsertInStore(obj, checkStoreNo) {
	$.ajax({
		type: "post",
		url: ipAddress + '/InStore/queryInStoreById.do',
		async: true,
		data: {
			"inStoreNo": checkStoreNo
		},
		success: function(result) {
			console.log(result)
			var tr = ""
			$('#lookInStoreNo').val(result[0].inStoreNo);
			$("#lookInStoreNoT").val(result[0].inStoreTime)
			$('#lookInStoreAuthor').val(result[0].inStoreAuthor);
			$('#lookInStoreRemark').val(result[0].inStoreRemark);
			$('#inboundTbody3').html("");
			for(var i = 0; i < result[0].inStoreDetailModels.length; i++) {
				var productPosition = result[0].inStoreDetailModels[i].productPosition;
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
					'<input type="text" class=' + 'outLINE' + ' value="' + result[0].inStoreDetailModels[i].productName + '">' +
					'</td>' +
					'<td>' +
					'<input type="text" class=' + 'outLINE' + ' value="' + productPosition + '">' +
					'</td>' +
//					'<td>' +
//					'<input type="text" class=' + 'outLINE' + ' value="' + result[0].inStoreDetailModels[i].trayId + '">' +
//					'</td>' +

					'<td>' +
					'<input type="text" class=' + 'outLINE' + ' value="' + result[0].inStoreDetailModels[i].number + '">' +
					'</td>' +
					'<td>' +
					'<input type="text" class=' + 'outLINE' + ' value="' + result[0].inStoreDetailModels[i].unit + '">' +
					'</td>' +
					'</tr>';

			}
			$('#inboundTbody3').append(tr);
		}
	})
}
//待审核入库单--通过

function passInsertInStore(obj, checkId) {
	var data = {
		"checkId": checkId,
		"checkStatus": 1, //(1、成功,2、失败)
		"checkPeople": JSON.parse($.cookie('userInfo')).username,
		"storeStatus": 1
	}
	$.ajax({
		type: "post",
		url: ipAddress + '/examine/examineStore.do',
		data: JSON.stringify(data),
		contentType: 'application/json;charset=UTF-8',
		success: function(result) {
			console.log(result)
			if(result.code == 6010) {
				alert(result.message)
			}
			if(result.code == 6012) {
				alert(result.message)
			}
			loadWaitInbound(); //删除成功刷新页面
		}
	});
}
//待审核入库单--拒绝
// 获取公用的checkId
var checkId;

function auditsStatus(id) {
	checkId = id;
}

function rejectInsertInStore() {

	var data = {
		"storeStatus":1,
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

			loadWaitInbound(); //删除成功刷新页面
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
			"storeStatus": '1'
		},
		success: function(result) {
			console.log(result)
			if(result.checkStatus == 1) {
				result.checkStatus = "通过"
			}
			if(result.checkStatus == 2) {
				result.checkStatus = "拒绝"
			}
			console.log(result)
			var tr = ""
			$('#lookInStoreNo1').val(result.checkStoreNo);
			$('#lookInStoreAuthor1').val(result.inStoreAuthor);
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
//入库查询--查看
function lookInStoreSearch(obj, inStoreNo) {
	$.ajax({
		type: "post",
		url: ipAddress + '/InStore/queryInStoreById.do',
		async: true,
		data: {
			"inStoreNo": inStoreNo
		},
		success: function(result) {
			console.log(result)
			var tr = ""
			$('#lookInStoreNo').val(result[0].inStoreNo);
			$("#lookInStoreNoT").val(result[0].inStoreTime);
			$('#lookInStoreAuthor').val(result[0].inStoreAuthor);
			$('#lookInStoreRemark').val(result[0].inStoreRemark);
			$('#inboundTbody3').html("");
			for(var i = 0; i < result[0].inStoreDetailModels.length; i++) {
				tr += '<tr>' +
					'<td>' +
					'<input type="text" class=' + 'outLINE' + ' value="' + result[0].inStoreDetailModels[i].productName + '">' +
					'</td>' +
					'<td>' +
					'<input type="text" class=' + 'outLINE' + ' value="' + result[0].inStoreDetailModels[i].warehouse + '">' +
					'</td>' +
					'<td>' +
					'<input type="text" class=' + 'outLINE' + ' value="' + result[0].inStoreDetailModels[i].area + '">' +
					'</td>' +
					//					'<td>' +
					//					'<input type="text" class=' + 'outLINE' + ' value="' + result[0].inStoreDetailModels[i].allocation + '">' +
					//					'</td>' +
					'<td>' +
					'<input type="text" class=' + 'outLINE' + ' value="' + result[0].inStoreDetailModels[i].number + '">' +
					'</td>' +
					'<td>' +
					'<input type="text" class=' + 'outLINE' + ' value="' + result[0].inStoreDetailModels[i].unit + '">' +
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

//待审核入库单--重置
function resetting1() {
	document.getElementById('form1').reset();
	data2.criteria.inStoreAuthor = '';
	data2.pageIndex = 1
	loadWaitInbound();
}

//创建入库单--动态加载商品名称下拉列表
var goodsName;

function loadGoods(id) {
	//alert("111")
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
			//console.log(result)
			for(var i = 0; i < result.data.length; i++) {
				$tr.find('.selectgood').append("<option value=" + result.data[i].productNo + ">" + result.data[i].productName + "</option>")
			}
		}
	});

	//创建入库单--商品入库单改变时取值
	$('.selectgood').on('change', function() {
		goodsName = $(this).val();
		//alert(goodsName)
	})
}

/*创建入库单--动态加载仓库名称下拉列表*/
var warehouse;
var $parent;

function loadWarehouse(id) {
	var data = {}
	var $tr2 = $(id).find("tr").last();
	$tr2.find('.selectWarehouse').html(""); //清空select列表数据
	$tr2.find('.selectWarehouse').prepend("<option value='0' >请选择</option>") //添加第一个option值
	$.ajax({
		type: "post",
		url: ipAddress + '/warehouse/queryWarehouse.do',
		async: false,
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(data),
		success: function(result) {
			//console.log(result)
			for(var i = 0; i < result.data.length; i++) {
				$tr2.find('.selectWarehouse').append("<option value=" + result.data[i].warehouseNo + ">" + result.data[i].warehouseName + "</option>")
			}
		}
	});

	//创建入库单--仓库改变时取值
	$('.selectWarehouse').on('change', function() {
		warehouse = $(this).val();
		$parent = $(this).parent().parent(); //该仓库所在的tr
		//			alert($parent)
		loadArea($parent); //当选中某仓库，二级联动加载库区
	})
}

/*当选择仓库后二级联动加载库区*/
var area2;

function loadArea($parent) {
	var data = {
		"criteria": {
			"warehouseNo": warehouse
		}
	}
	$parent.find('.selectArea').empty(); //清空库区名称select列表数据
	$parent.find('.selectArea').prepend("<option value='0' >请选择</option>") //添加第一个option值
	$.ajax({
		type: "post",
		url: ipAddress + '/area/queryArea.do',
		async: false,
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(data),
		success: function(result) {
			//console.log(result);
			for(var i = 0; i < result.data.length; i++) {
				$parent.find('.selectArea').append("<option value=" + result.data[i].areaId + ">" + result.data[i].areaName + "</option>")
			}
			//loadAllocation(0, $parent); //当仓库为请选择后，库区变成请选择，传参value=0给货位，让货位也变成请选择
		}
	});
	//当库区名称改变时候取值
	$('.selectArea').on("change", function() {
		area2 = $(this).val();
		//		$parent = $(this).parent().parent();
		//		if(area2 == "0") {
		//			loadAllocation(0, $parent);
		//		} else {
		//			loadAllocation(area2, $parent)
		//		}

	})
}

/*选择库区后三级联动加载货位*/
//var allocation2;
//
//function loadAllocation(area2, $parent) {
//	var data = {
//		"criteria": {
//			"warehouseNo": warehouse,
//			"areaNo": area2
//		}
//	}
//	$parent.find('.selectAllocation').empty(); //清空库区名称select列表数据
//	$parent.find('.selectAllocation').prepend("<option value='0' >请选择</option>") //添加第一个option值
//	if(area2 != 0) {
//		$.ajax({
//			type: "post",
//			url: ipAddress + '/position/queryPositions.do',
//			async: false,
//			contentType: 'application/json;charset=UTF-8',
//			data: JSON.stringify(data),
//			success: function(result) {
//				//console.log(result);
//				for(var i = 0; i < result.data.length; i++) {
//					$parent.find('.selectAllocation').append("<option value=" + result.data[i].allocationNo + ">" + result.data[i].allocationName + "</option>")
//				}
//			}
//		});
//	}
//
//	//当货位名称改变时候取值
//	$('.selectAllocation').on("change", function() {
//		allocation2 = $(this).val();
//
//	})
//
//}
//入库操作--置顶
//var topData;
//var inStoreTopstatus=1
//function toTop(obj,inStoreNo){
//	var $tr=$(obj).parent().parent();
//	
//	 topData={
//		"inStoreNo":inStoreNo,
//		"inStoreTopstatus":inStoreTopstatus
//	}
//	$.ajax({
//		type:"post",
//		url:ipAddress + '/InStore/updateInStore.do',
//		async:true,
//		data: JSON.stringify(topData),
//		contentType: 'application/json;charset=UTF-8',
//		success:function(result){
//			if(result.code==3010){
//				alert("置顶成功")
//			}
////			$(obj).addClass("disabled");//置顶成功该按钮不可点击
////			//$(obj).sibling().removeClass("disabled ");
////			inStoreTopstatus=0;
//			//$tr.children("input").attr("value",'0')
//			$('#myTable7 tbody').prepend($tr);//置顶成功该行转至首行
//			//$(obj).
//			loadInboundOperate()//置顶结束局部刷新该入库操作页面
//		}
//	});	
//}
////入库操作--暂停开始切换
//var flag=true;
//function endToStart(obj){
//	if($(obj).text()=="暂停"){
//		$(obj).text("开始");
//		flag=false;
//	}else{
//		$(obj).text("暂停");
//	flag=true;
//	}
//}
////入库操作--取消
//function cancel(obj){
//	$(obj).parent().parent().remove();
//	//loadInboundOperate()
//}

