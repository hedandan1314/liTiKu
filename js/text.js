	function load1() {
		$.ajax({
			type: 'post',
			url: ipAddress + '/user/queryUsers.do',
			data: JSON.stringify(data),
			contentType: 'application/json;charset=UTF-8',
			success: function(result) {
				$("#mytable1 tbody tr").remove();
				pageIndex = result.currentPage;
				for(var i = 0; i < result.data.length; i++) {
					var html1 = '<tr>' +
						'<td>' + '<input type="hidden" value="' + result.data[i].userNo + '"  />' + (pageIndex * 5 - 4 + i) +
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
						'<td>' + '<a class="btn btn-primary" data-toggle="modal" data-target="#editor" style="outline: none;">编辑</a>' +
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
								data.pageIndex = result.currentPage;
								$("#mytable1 tbody tr").remove();
								$('#mytable1 tbody').html('');
								for(var i = 0; i < result.data.length; i++) {
									var html = '<tr>' +
										'<td>' + '<input type="hidden" value="' + result.data[i].userNo + '"  />' + (data.pageIndex * 5 - 4 + i) +
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
										'<td>' + '<a class="btn btn-primary" data-toggle="modal" data-target="#editor" style="outline: none;">编辑</a>' +
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
		//用户管理--删除用户
var deleteDate = '';

function myDelete(obj) {
	var $tds = $(obj).parent().parent().children(); // 获取到所有列
	var delete_id = $($tds[0]).children("input").val(); // 获取隐藏的ID
	deleteDate = delete_id; // 将模态框中需要删除的大修的ID设为需要删除的ID

}

function deleteQueryUsers() {
	$.ajax({
		type: "post",
		url: ipAddress + '/user/deleteUser.do',
		data: {
			"userNo": deleteDate
		},
		async: false,
		success: function(result) {

			loadQueryUsers();
		}
	});
}
