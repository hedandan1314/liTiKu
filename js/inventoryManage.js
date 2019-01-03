var loadInventorySheet,
    loadInventoryManage,
    loadOnlineAudit,
    loadAuditQuery;
// 新建盘点单获取基本数据信息
function addInventory() {
    $('#traders').val(JSON.parse($.cookie('userInfo')).username);
    var parameter = {
        "pageIndex": 1
    }

    // 获取商品数据
    $.ajax({
        type: 'POST',
        url: ipAddress + '/product/queryGoods.do',
        data: JSON.stringify(parameter),
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            console.log('shangpin=', result);
            $('#tradeNameDetail').siblings().remove(); // 清除商品列表中的值
            $('#tradeNameDetail2').siblings().remove();
            var html = '';
            for (var i = 0; i < result.data.length; i++) {
                html += '<option value="' + result.data[i].productNo + '">' + result.data[i].productName + '</option>'
            }
            $('#tradeName').append(html); // 追加商品列表
            $('#tradeName2').append(html);
        },
        error: function() {
            alert('失败')
        }
    })


    // 获取仓库数据
    $.ajax({
        type: 'POST',
        url: ipAddress + '/warehouse/queryWarehouse.do',
        data: JSON.stringify(parameter),
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            console.log('result=', result);
            $('#warehouseDetail').siblings().remove();
            $('#warehouseDetail2').siblings().remove();
            var html = '';
            for (var i = 0; i < result.data.length; i++) {
                html += '<option value="' + result.data[i].warehouseNo + '">' + result.data[i].warehouseName + '</option>'
            }
            $('#warehouse').append(html);
            $('#warehouse2').append(html);
        },
        error: function() {
            alert('失败')
        }
    })

    // 获取盘点范围(商品或存储)
    var checkVal = $('input:radio[name="inventoryScope"]:checked').val();
    if (checkVal == 0) {
        $('#warehouse').prop('disabled', 'true');
        $('#reservoirArea').prop('disabled', 'true');
        $('#tradeName').val('');
    } else {
        $('#tradeName').prop('disabled', 'true');
        $('#warehouse').val('');
        $('#reservoirArea').val('');
    }
}
// 选择商品(新建)
function commodity() {
    $('#tradeName').prop('disabled', '');
    $('#warehouse').prop('disabled', 'true');
    $('#warehouse').val('');
    $('#reservoirArea').prop('disabled', 'true');
    $('#reservoirArea').val('');
}
// 选择存储(新建)
function storage() {
    $('#tradeName').prop('disabled', 'true');
    $('#tradeName').val('');
    $('#warehouse').prop('disabled', '');
    $('#reservoirArea').prop('disabled', '');
}

$(function() {
    // 点击盘点开单，对应的类名为.M-box的分页显示，其他隐藏，其他业务类似
    $('#M-box').click(function() {
        parameter.pageIndex = 1;
        initAjax();
        $('.M-box').show();
        $('.M-box').siblings().hide();
    })
    $('#M-box1').click(function() {
        parameter2.pageIndex = 1;
        getInformation();
        inventoryEnquiryId = '';
        state = '';
        $('#inputBox').val('');
        $('#inventoryStatus').val('');
        initAjax2();
        $('.M-box1').show();
        $('.M-box1').siblings().hide();
    })
    $('#M-box2').click(function() {
        parameter3.pageIndex = 1;
        getInformation();
        examineQueryId = '';
        $('#inputBox2').val('');
        initAjax3();
        $('.M-box2').show();
        $('.M-box2').siblings().hide();
    })
    $('#M-box3').click(function() {
        parameter4.pageIndex = 1;
        checkVal = '';
        $('#optionsRadios0').prop('checked', 'true');
        initAjax4();
        $('.M-box3').show();
        $('.M-box3').siblings().hide();
    })

    // 初始化盘点开单数据
    var parameter = {}

    function initAjax() {
        parameter = {
            "pageIndex": 1,
            "recordCount": 10,
            "criteria": {}
        }
        $.ajax({
            type: 'POST',
            url: ipAddress + '/inventory/queryVerify.do',
            data: JSON.stringify(parameter),
            contentType: 'application/json;charset=UTF-8',
            success: function(result) {
                console.log('result=', result);
                if (result) {
                    if (result.data.length == 0) {
                        parameter.pageIndex -= 1;
                        console.log('parameter.pageIndex=', parameter.pageIndex);
                        if (parameter.pageIndex != 0) {
                            initAjax();
                        }
                    }
                    $("#myTable tbody tr").remove();
                    pageIndex = result.currentPage;
                    for (var i = 0; i < result.data.length; i++) {
                        var html = '<tr>' +
                            '<td>' + (pageIndex * 10 - 9 + i) +
                            '</td>' +
                            '<td>' + result.data[i].verifyId +
                            '</td>' +
                            '<td>' + (result.data[i].username == null ? '' : result.data[i].username) +
                            '</td>' +
                            '<td>' + (formatDateStr(result.data[i].modifyTime) == null ? '' : formatDateStr(result.data[i].modifyTime)) +
                            '</td>' +
                            '<td>' + (result.data[i].remark == null ? '' : result.data[i].remark) +
                            '</td>' +
                            '<td>' +
                            '<a class="btn btn-primary" data-toggle="modal" data-target="#editor" style="outline: none;" onclick="editorOrder(\'' + result.data[i].verifyId + '\',\'' + result.data[i].scopeWarehouse + '\')">编辑</a>' +
                            '<a class="btn btn-primary" data-toggle="modal" data-target="#refer" style="outline: none; margin-left: 10px;" onclick="myDelete(this,\'' + result.data[i].verifyId + '\')">提交</a>' +
                            '<a class="btn btn-danger" onclick="myDelete(this,\'' + result.data[i].verifyId + '\')" data-toggle="modal" data-target="#delete" style="outline: none; margin-left: 10px;">删除</a>' +
                            '</td>' +
                            '</tr>'
                        $('#myTable tbody').append(html)
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
                        current: parameter.pageIndex, //当前页码
                        callback: function(api) { //这是一个回调函数					
                            parameter.pageIndex = api.getCurrent();
                            $.ajax({
                                type: 'POST',
                                url: ipAddress + '/inventory/queryVerify.do',
                                data: JSON.stringify(parameter),
                                contentType: 'application/json;charset=UTF-8',
                                success: function(result) {
                                    if (result.data.length == 0) {
                                        parameter.pageIndex -= 1
                                        if (parameter.pageIndex != 0) {
                                            initAjax();
                                        }
                                    }
                                    pageIndex = result.currentPage;
                                    $("#myTable tbody tr").remove();
                                    for (var i = 0; i < result.data.length; i++) {
                                        var html = '<tr>' +
                                            '<td>' + (pageIndex * 10 - 9 + i) +
                                            '</td>' +
                                            '<td>' + result.data[i].verifyId +
                                            '</td>' +
                                            '<td>' + (result.data[i].username == null ? '' : result.data[i].username) +
                                            '</td>' +
                                            '<td>' + (formatDateStr(result.data[i].modifyTime) == null ? '' : formatDateStr(result.data[i].modifyTime)) +
                                            '</td>' +
                                            '<td>' + (result.data[i].remark == null ? '' : result.data[i].remark) +
                                            '</td>' +
                                            '<td>' +
                                            '<a class="btn btn-primary" data-toggle="modal" data-target="#editor" style="outline: none;" onclick="editorOrder(\'' + result.data[i].verifyId + '\',\'' + result.data[i].scopeWarehouse + '\')">编辑</a>' +
                                            '<a class="btn btn-primary" data-toggle="modal" data-target="#refer" onclick="myDelete(this,\'' + result.data[i].verifyId + '\')" style="outline: none; margin-left: 10px;">提交</a>' +
                                            '<a class="btn btn-danger" onclick="myDelete(this,\'' + result.data[i].verifyId + '\')" data-toggle="modal" data-target="#delete" style="outline: none; margin-left: 10px;">删除</a>' +
                                            '</td>' +
                                            '</tr>'
                                        $('#myTable tbody').append(html)
                                    }
                                },
                                error: function() {
                                    alert('失败')
                                }
                            })
                        }
                    });
                } else {
                    alert('数据异常！')
                }

            },
            error: function() {
                alert('失败')
            }
        })
    }
    loadInventorySheet = initAjax;
    initAjax();
})

$(function() {
    var productNo, // 商品编号
        warehouseNo, // 仓库编号
        areaNo; // 库区编号
    // 获取商品选中的值
    $('#tradeName').change(function() {
        productNo = $('#tradeName option:selected').val();
    })

    // 获取仓库选中的值
    $('#warehouse').change(function() {
        warehouseNo = $('#warehouse option:selected').val();
        var parameter = {
            "pageIndex": 1,
            "criteria": {
                "warehouseNo": warehouseNo
            }
        }

        // 选中仓库之后再根据仓库获取库区的列表
        if (warehouseNo != '' && warehouseNo != undefined) {
            console.log('parameter=', parameter);
            $.ajax({
                type: 'POST',
                url: ipAddress + '/area/queryArea.do',
                data: JSON.stringify(parameter),
                async: false,
                contentType: 'application/json;charset=UTF-8',
                success: function(result) {
                    console.log('result=', result);
                    $('#reservoirAreaDetail').siblings().remove();
                    var html = '';
                    for (var i = 0; i < result.data.length; i++) {
                        html += '<option value="' + result.data[i].areaNo + '">' + result.data[i].areaName + '</option>'
                    }
                    $('#reservoirArea').append(html);
                },
                error: function() {
                    alert('失败')
                }
            })
        }
    })

    // 获取库区选中的值
    $('#reservoirArea').change(function() {
        areaNo = $('#reservoirArea option:selected').val();
    })

    // 保存新建盘点订单
    $('#saveNewOrder').click(function() {
        var parameter = {
            'modifyPerson': JSON.parse($.cookie('userInfo')).userNo,
            'scopeProduct': $('#tradeName option:selected').val(),
            'scopeWarehouse': $('#warehouse option:selected').val(),
            'scopeArea': $('#reservoirArea option:selected').val(),
            'remark': $('#inventoryRemark').val()
        }

        $.ajax({
            type: 'POST',
            url: ipAddress + '/inventory/addVerify.do',
            data: JSON.stringify(parameter),
            contentType: 'application/json;charset=UTF-8',
            success: function(result) {
                console.log('result add=', result);
                if (result.code) {
                    if (result.code == 2010) {
                        document.getElementById('addForm').reset();
                        loadInventorySheet();
                    } else {
                        alert(result.message);
                    }
                }
            },
            error: function() {
                alert('失败')
            }
        })
    })
})


// 选择商品(编辑)
function commodity2() {
    $('#tradeName2').prop('disabled', '');
    $('#warehouse2').prop('disabled', 'true');
    $('#warehouse2').val('');
    $('#reservoirArea2').prop('disabled', 'true');
    $('#reservoirArea2').val('');
}
// 选择存储(编辑)
function storage2() {
    $('#tradeName2').prop('disabled', 'true');
    $('#tradeName2').val('');
    $('#warehouse2').prop('disabled', '');
    $('#reservoirArea2').prop('disabled', '');
}

// 关闭编辑盘点单
function closeEditInventory() {
    document.getElementById('editInventory').reset();
}


// 编辑盘点单
var editorOrderId;

function editorOrder(id, number) {
    editorOrderId = id;

    var parameter = {
        "pageIndex": 1
    }
    if (number != null) {
        if (number != '') {
            $('input:radio[name="editorInventoryScope"]:eq(1)').attr('checked', 'true');
            $('#tradeName2').prop('disabled', 'true');
            $('#warehouse2').prop('disabled', '');
            $('#reservoirArea2').prop('disabled', '');
        } else {
            $('input:radio[name="editorInventoryScope"]:eq(0)').attr('checked', 'true');
            $('#tradeName2').prop('disabled', '');
            $('#warehouse2').prop('disabled', 'true');
            $('#reservoirArea2').prop('disabled', 'true');
        }
    }

    // 获取商品数据(编辑)
    $.ajax({
        type: 'POST',
        url: ipAddress + '/product/queryGoods.do',
        data: JSON.stringify(parameter),
        async: false,
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            console.log('shangpin=', result);
            $('#tradeNameDetail2').siblings().remove();
            var html = '';
            for (var i = 0; i < result.data.length; i++) {
                html += '<option value="' + result.data[i].productNo + '">' + result.data[i].productName + '</option>'
            }
            $('#tradeName2').append(html);
        },
        error: function() {
            alert('失败')
        }
    })

    // 获取仓库数据(编辑)
    $.ajax({
        type: 'POST',
        url: ipAddress + '/warehouse/queryWarehouse.do',
        data: JSON.stringify(parameter),
        async: false,
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            console.log('result=', result);
            $('#warehouseDetail2').siblings().remove();
            var html = '';
            for (var i = 0; i < result.data.length; i++) {
                html += '<option value="' + result.data[i].warehouseNo + '">' + result.data[i].warehouseName + '</option>'
            }
            $('#warehouse2').append(html);
        },
        error: function() {
            alert('失败')
        }
    })

    var parameters = {
        "pageIndex": 1,
        "criteria": {
            "warehouseNo": number
        }
    }
    console.log('parameters=', parameters);
    // 获取库区数据
    $.ajax({
        type: 'POST',
        url: ipAddress + '/area/queryArea.do',
        data: JSON.stringify(parameters),
        async: false,
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            console.log('kuqusss=', result);
            $('#reservoirAreaDetail2').siblings().remove();
            var html = '';
            for (var i = 0; i < result.data.length; i++) {
                html += '<option value="' + result.data[i].areaNo + '">' + result.data[i].areaName + '</option>'
            }
            $('#reservoirArea2').append(html);
        },
        error: function() {
            alert('失败')
        }
    })

    var parameter1 = {
        "verifyId": id
    }

    // 点击编辑时获取数据
    $.ajax({
        type: 'POST',
        url: ipAddress + '/inventory/detailVerify.do',
        data: parameter1,
        success: function(result) {
            console.log('resultbbb=', result);
            $('#inventoryNumber').val(result.verifyId);
            $('#traders2').val(result.username);
            $('#tradeName2').val(result.scopeProduct);
            $('#warehouse2').val(result.scopeWarehouse);
            $('#reservoirArea2').val(result.scopeArea);
            $('#inventoryRemark2').val(result.remark);
        },
        error: function() {
            alert('失败')
        }
    })
}

// 编辑保存新建盘点单
$('#editorNewOrder').click(function() {
    var parameter = {
        'verifyId': editorOrderId,
        'modifyPerson': JSON.parse($.cookie('userInfo')).userNo,
        'scopeProduct': $('#tradeName2 option:selected').val(),
        'scopeWarehouse': $('#warehouse2 option:selected').val(),
        'scopeArea': $('#reservoirArea2 option:selected').val(),
        'remark': $('#inventoryRemark2').val()
    }

    $.ajax({
        type: 'POST',
        url: ipAddress + '/inventory/modifyVerify.do',
        data: JSON.stringify(parameter),
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            console.log('result modify=', result);
            if (result.code) {
                if (result.code != 3010) {
                    alert(result.message);
                } else {
                    loadInventorySheet();
                    document.getElementById('editInventory').reset();
                }
            }
        },
        error: function() {
            alert('失败')
        }
    })
})


var trId,
    trObj,
    removeId;

// 删除和提交
function myDelete(obj, id) {
    removeId = id;
    trId = obj.parentNode.parentNode;
    trObj = trId.parentNode;
}

// 确认删除
function sureDelete() {
    var parameter = {
        "verifyId": removeId
    }

    console.log('myDelete parameter=', parameter);
    $.ajax({
        type: 'POST',
        url: ipAddress + '/inventory/deleteVerify.do',
        data: parameter,
        success: function(result) {
            console.log('shanchu result=', result);
            if (result.code) {
                if (result.code != 4010) {
                    alert(result.message);
                } else {
                    trObj.removeChild(trId);
                    loadInventorySheet();
                }
            }
        },
        error: function() {
            alert('失败')
        }
    })
}

// 确认提交
function sureSubmitTo() {
    var parameter = {
        'verifyId': removeId
    }
    console.log('parameter submit=', parameter);
    $.ajax({
        type: 'POST',
        url: ipAddress + '/inventory/commitVerify.do',
        data: parameter,
        success: function(result) {
            console.log('result submit=', result);
            if (result.code) {
                if (result.code != 3010) {
                    alert('提交失败！')
                } else {
                    loadInventorySheet();
                }
            }
        },
        error: function() {
            alert('失败')
        }
    })
}

$(function() {
    var productNo, // 商品编号
        warehouseNo, // 仓库编号
        areaNo; // 库区编号
    // 获取商品选中的值(编辑)
    $('#tradeName2').change(function() {
        productNo = $('#tradeName2 option:selected').val();
    })

    // 获取仓库选中的值(编辑)
    $('#warehouse2').change(function() {
        warehouseNo = $('#warehouse2 option:selected').val();
        var parameter = {
            "pageIndex": 1,
            "criteria": {
                "warehouseNo": warehouseNo
            }
        }

        // 选中仓库之后再根据仓库获取库区的列表
        if (warehouseNo != '' && warehouseNo != undefined) {
            $.ajax({
                type: 'POST',
                url: ipAddress + '/area/queryArea.do',
                data: JSON.stringify(parameter),
                async: false,
                contentType: 'application/json;charset=UTF-8',
                success: function(result) {
                    console.log('resultaaa=', result);
                    $('#reservoirAreaDetail2').siblings().remove();
                    var html = '';
                    for (var i = 0; i < result.data.length; i++) {
                        html += '<option value="' + result.data[i].areaNo + '">' + result.data[i].areaName + '</option>'
                    }
                    $('#reservoirArea2').append(html);
                },
                error: function() {
                    alert('失败')
                }
            })
        }
    })
})

/* --------------------------------------------------------盘点单管理-------------------------------------------------------------------------------- */
var parameter2 = {}

// 初始化数据(盘点单管理)
function initAjax2() {
    parameter2 = {
        "pageIndex": 1,
        "recordCount": 10,
        "criteria": {
            "verifyId": inventoryEnquiryId,
            "status": state
        }
    }
    console.log('parameter2=', parameter2);
    $.ajax({
        type: 'POST',
        url: ipAddress + '/inventory/allVerify.do',
        data: JSON.stringify(parameter2),
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            console.log('result=', result);
            if (result) {
                if (result.data.length == 0) {
                    parameter2.pageIndex -= 1;
                    if (parameter2.pageIndex != 0) {
                        initAjax2();
                    }
                }
                $("#myTable2 tbody tr").remove();
                pageIndex = result.currentPage;
                var html = '';
                for (var i = 0; i < result.data.length; i++) {
                    if (result.data[i].status != 3) {
                        html += '<tr>' +
                            '<td>' + (pageIndex * 10 - 9 + i) +
                            '</td>' +
                            '<td>' + result.data[i].verifyId +
                            '</td>' +
                            '<td>' + (result.data[i].status == 1 ? '编辑中' : result.data[i].status == 2 ? '待审核' : result.data[i].status == 3 ? '已通过' : result.data[i].status == 4 ? '未通过' : '状态异常') +
                            '</td>' +
                            '<td>' + (result.data[i].username == null ? '' : result.data[i].username) +
                            '</td>' +
                            '<td>' + (formatDateStr(result.data[i].modifyTime) == null ? '' : formatDateStr(result.data[i].modifyTime)) +
                            '</td>' +
                            '<td>' + (result.data[i].remark == null ? '' : result.data[i].remark) +
                            '</td>' +
                            '<td>' +
                            '<a class="btn btn-primary" data-toggle="modal" data-target="#check" style="outline: none;" onclick="inventoryView(\'' + result.data[i].verifyId + '\')">查看</a>' +
                            '</td>' +
                            '</tr>'
                    } else {
                        html += '<tr>' +
                            '<td>' + (pageIndex * 10 - 9 + i) +
                            '</td>' +
                            '<td>' + result.data[i].verifyId +
                            '</td>' +
                            '<td>已完成' +
                            '</td>' +
                            '<td>' + (result.data[i].username == null ? '' : result.data[i].username) +
                            '</td>' +
                            '<td>' + (formatDateStr(result.data[i].modifyTime) == null ? '' : formatDateStr(result.data[i].modifyTime)) +
                            '</td>' +
                            '<td>' + (result.data[i].remark == null ? '' : result.data[i].remark) +
                            '</td>' +
                            '<td>' +
                            '<a class="btn btn-primary" data-toggle="modal" data-target="#check" style="outline: none;" onclick="inventoryView(\'' + result.data[i].verifyId + '\')">查看</a>' +
                            '<a href="./inventoryEntry.html?verifyId=' + result.data[i].verifyId + '" class="btn btn-primary" style="outline: none; margin-left: 10px;">盘点录入</a>' +
                            '</td>' +
                            '</tr>'
                    }

                }
                $("#myTable2 tbody").append(html);
                //分页
                $('.M-box1').pagination({
                    pageCount: result.totalPage, //总页码
                    jump: true, //是否开启跳转，true是开启
                    coping: true, //是否开启首页和末页，此处开启
                    homePage: '首页',
                    endPage: '末页',
                    prevContent: '上页',
                    nextContent: '下页',
                    current: parameter2.pageIndex, //当前页码
                    callback: function(api) { //这是一个回调函数					
                        parameter2.pageIndex = api.getCurrent();
                        console.log('parameter2.pageIndex=', parameter2.pageIndex);
                        $.ajax({
                            type: 'POST',
                            url: ipAddress + '/inventory/allVerify.do',
                            data: JSON.stringify(parameter2),
                            contentType: 'application/json;charset=UTF-8',
                            success: function(result) {
                                if (result) {
                                    if (result.data.length == 0) {
                                        parameter2.pageIndex -= 1;
                                        if (parameter2.pageIndex != 0) {
                                            initAjax2();
                                        }
                                    }
                                    $("#myTable2 tbody tr").remove();
                                    pageIndex = result.currentPage;
                                    var html = '';
                                    for (var i = 0; i < result.data.length; i++) {
                                        if (result.data[i].status != 3) {
                                            html += '<tr>' +
                                                '<td>' + (pageIndex * 10 - 9 + i) +
                                                '</td>' +
                                                '<td>' + result.data[i].verifyId +
                                                '</td>' +
                                                '<td>' + (result.data[i].status == 1 ? '编辑中' : result.data[i].status == 2 ? '待审核' : result.data[i].status == 3 ? '已通过' : result.data[i].status == 4 ? '未通过' : '状态异常') +
                                                '</td>' +
                                                '<td>' + (result.data[i].username == null ? '' : result.data[i].username) +
                                                '</td>' +
                                                '<td>' + (formatDateStr(result.data[i].modifyTime) == null ? '' : formatDateStr(result.data[i].modifyTime)) +
                                                '</td>' +
                                                '<td>' + (result.data[i].remark == null ? '' : result.data[i].remark) +
                                                '</td>' +
                                                '<td>' +
                                                '<a class="btn btn-primary" data-toggle="modal" data-target="#check" style="outline: none;" onclick="inventoryView(\'' + result.data[i].verifyId + '\')">查看</a>' +
                                                '</td>' +
                                                '</tr>'
                                        } else {
                                            html += '<tr>' +
                                                '<td>' + (pageIndex * 10 - 9 + i) +
                                                '</td>' +
                                                '<td>' + result.data[i].verifyId +
                                                '</td>' +
                                                '<td>已完成' +
                                                '</td>' +
                                                '<td>' + (result.data[i].username == null ? '' : result.data[i].username) +
                                                '</td>' +
                                                '<td>' + (formatDateStr(result.data[i].modifyTime) == null ? '' : formatDateStr(result.data[i].modifyTime)) +
                                                '</td>' +
                                                '<td>' + (result.data[i].remark == null ? '' : result.data[i].remark) +
                                                '</td>' +
                                                '<td>' +
                                                '<a class="btn btn-primary" data-toggle="modal" data-target="#check" style="outline: none;" onclick="inventoryView(\'' + result.data[i].verifyId + '\')">查看</a>' +
                                                '<a href="./inventoryEntry.html?verifyId=' + result.data[i].verifyId + '" class="btn btn-primary" style="outline: none; margin-left: 10px;">盘点录入</a>' +
                                                '</td>' +
                                                '</tr>'
                                        }

                                    }
                                    $("#myTable2 tbody").append(html);
                                }
                            },
                            error: function() {
                                alert('失败')
                            }
                        })
                    }
                });
            }

        },
        error: function() {
            alert('失败')
        }
    })
}

// 盘点单管理查看
function inventoryView(id) {
    var parameter = {
        "verifyId": id
    }
    console.log('parameter=', parameter);
    $.ajax({
        type: 'POST',
        url: ipAddress + '/inventory/detailVerify.do',
        data: parameter,
        success: function(result) {
            console.log('result view=', result);
            $('#managementNumbers').val(result.verifyId);
            $('#managementTraders').val(result.username);
            $('#orderTime').val(formatDateStr(result.modifyTime));
            $('#tradeName3').val(result.scopeProduct);
            $('#warehouse3').val(result.scopeWarehouse);
            $('#reservoirArea3').val(result.scopeArea);
            $('#inventoryRemark3').val(result.remark);
            // 判断仓库是否为空，如果为空盘点范围则是按商品，反之盘点范围是存储
            if (result.scopeWarehouse != null) {
                if (result.scopeWarehouse != '') {
                    $('input:radio[name="viewInventoryScope"]:eq(1)').attr('checked', 'true');
                } else {
                    $('input:radio[name="viewInventoryScope"]:eq(0)').attr('checked', 'true');
                }
            }
        },
        error: function() {
            alert('失败')
        }
    })
}

// 获取基本数据信息(仓库、库区、商品)
function getInformation() {
    var parameter = {
        "pageIndex": 1
    }

    // 获取商品数据(盘点单管理)
    $.ajax({
        type: 'POST',
        url: ipAddress + '/product/queryGoods.do',
        data: JSON.stringify(parameter),
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            console.log('shangpin manage=', result);
            $('#tradeNameDetail3').siblings().remove();
            $('#tradeNameDetail4').siblings().remove();
            var html = '';
            for (var i = 0; i < result.data.length; i++) {
                html += '<option value="' + result.data[i].productNo + '">' + result.data[i].productName + '</option>'
            }
            $('#tradeName3').append(html);
            $('#tradeName4').append(html);
        },
        error: function() {
            alert('失败')
        }
    })

    // 获取仓库数据
    $.ajax({
        type: 'POST',
        url: ipAddress + '/warehouse/queryWarehouse.do',
        data: JSON.stringify(parameter),
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            console.log('result=', result);
            $('#warehouseDetail3').siblings().remove();
            $('#warehouseDetail4').siblings().remove();
            var html = '';
            for (var i = 0; i < result.data.length; i++) {
                html += '<option value="' + result.data[i].warehouseNo + '">' + result.data[i].warehouseName + '</option>'
            }
            $('#warehouse3').append(html);
            $('#warehouse4').append(html);
        },
        error: function() {
            alert('失败')
        }
    })

    console.log('parameters=', parameter);
    // 获取库区数据
    $.ajax({
        type: 'POST',
        url: ipAddress + '/area/queryArea.do',
        data: JSON.stringify(parameter),
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            console.log('kuqu=', result);
            $('#reservoirAreaDetail3').siblings().remove();
            $('#reservoirAreaDetail4').siblings().remove();
            var html = '';
            for (var i = 0; i < result.data.length; i++) {
                html += '<option value="' + result.data[i].areaNo + '">' + result.data[i].areaName + '</option>'
            }
            $('#reservoirArea3').append(html);
            $('#reservoirArea4').append(html);
        },
        error: function() {
            alert('失败')
        }
    })
}

// 盘点单管理查询(盘点单号或盘点单状态)
var inventoryEnquiryId,
    state;
$('#inventoryEnquiry').click(function() {
    inventoryEnquiryId = $('#inputBox').val();
    state = $('#inventoryStatus option:checked').val();
    initAjax2();
})

/* --------------------------------------------------------在线审核-------------------------------------------------------------------------------- */
var parameter3 = {}

// 初始化在线审核数据
function initAjax3() {
    parameter3 = {
        "pageIndex": 1,
        "recordCount": 10,
        "criteria": {
            'storeStatus': '3',
            'checkStatus': '0',
            'checkStoreNo': examineQueryId
        }
    }
    console.log('parameter3=', parameter3);
    $.ajax({
        type: 'POST',
        url: ipAddress + '/examine/queryExamines1.do',
        data: JSON.stringify(parameter3),
        async: false,
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            console.log('result initAjax3=', result);
            if (result) {
                if (result.data.length == 0) {
                    parameter3.pageIndex -= 1
                    if (parameter3.pageIndex != 0) {
                        initAjax3();
                    }
                }
                $("#myTable3 tbody tr").remove();
                pageIndex = result.currentPage;
                var html = '';
                for (var i = 0; i < result.data.length; i++) {
                    html += '<tr>' +
                        '<td>' + (pageIndex * 10 - 9 + i) +
                        '</td>' +
                        '<td>' + result.data[i].checkStoreNo +
                        '</td>' +
                        '<td>' + (formatDateStr(result.data[i].storeTime) == null ? '' : formatDateStr(result.data[i].storeTime)) +
                        '</td>' +
                        '<td>' +
                        '<a class="btn btn-primary" data-toggle="modal" data-target="#checkDetails" onclick="onlineView(\'' + result.data[i].checkStoreNo + '\')" style="outline: none;">查看</a>' +
                        '<a class="btn btn-primary" data-toggle="modal" data-target="#through" onclick="auditsStatus(' + result.data[i].checkId + ',' + result.data[i].storeStatus + ',\'' + result.data[i].checkStoreNo + '\')" style="outline: none; margin-left: 10px;">通过</a>' +
                        '<a class="btn btn-danger" data-toggle="modal" data-target="#refuse" onclick="auditsStatus(' + result.data[i].checkId + ',' + result.data[i].storeStatus + ',\'' + result.data[i].checkStoreNo + '\')" style="outline: none; margin-left: 10px;">拒绝</a>' +
                        '</td>' +
                        '</tr>'

                }
                $('#myTable3 tbody').append(html)

                // 分页
                $('.M-box2').pagination({
                    pageCount: result.totalPage, //总页码
                    jump: true, //是否开启跳转，true是开启
                    coping: true, //是否开启首页和末页，此处开启
                    homePage: '首页',
                    endPage: '末页',
                    prevContent: '上页',
                    nextContent: '下页',
                    current: parameter3.pageIndex, //当前页码
                    callback: function(api) { //这是一个回调函数					
                        parameter3.pageIndex = api.getCurrent();
                        $.ajax({
                            type: 'POST',
                            url: ipAddress + '/examine/queryExamines.do',
                            data: JSON.stringify(parameter3),
                            contentType: 'application/json;charset=UTF-8',
                            success: function(result) {
                                if (result.data.length == 0) {
                                    parameter3.pageIndex -= 1
                                    if (parameter3.pageIndex != 0) {
                                        initAjax3();
                                    }
                                }
                                pageIndex = result.currentPage;
                                $("#myTable3 tbody tr").remove();
                                var html = '';
                                for (var i = 0; i < result.data.length; i++) {
                                    html += '<tr>' +
                                        '<td>' + (pageIndex * 10 - 9 + i) +
                                        '</td>' +
                                        '<td>' + result.data[i].checkStoreNo +
                                        '</td>' +
                                        '<td>' + (formatDateStr(result.data[i].storeTime) == null ? '' : formatDateStr(result.data[i].storeTime)) +
                                        '</td>' +
                                        '<td>' +
                                        '<a class="btn btn-primary" data-toggle="modal" data-target="#checkDetails" onclick="onlineView(\'' + result.data[i].checkStoreNo + '\')" style="outline: none;">查看</a>' +
                                        '<a class="btn btn-primary" data-toggle="modal" data-target="#through" onclick="auditsStatus(' + result.data[i].checkId + ',' + result.data[i].storeStatus + ',\'' + result.data[i].checkStoreNo + '\')" style="outline: none; margin-left: 10px;">通过</a>' +
                                        '<a class="btn btn-danger" data-toggle="modal" data-target="#refuse" onclick="auditsStatus(' + result.data[i].checkId + ',' + result.data[i].storeStatus + ',\'' + result.data[i].checkStoreNo + '\')" style="outline: none; margin-left: 10px;">拒绝</a>' +
                                        '</td>' +
                                        '</tr>'
                                }
                                $('#myTable3 tbody').append(html)
                            },
                            error: function() {
                                alert('失败')
                            }
                        })
                    }
                });
            } else {
                alert('数据异常！')
            }
        },
        error: function() {
            alert('失败！')
        }
    })
}

// 在线审核查看
function onlineView(id) {
    var parameter = {
        'verifyId': id
    }

    $.ajax({
        type: 'POST',
        url: ipAddress + '/inventory/detailVerify.do',
        data: parameter,
        success: function(result) {
            console.log('result=', result);
            if (result) {
                if (result.code) {
                    alert(result.message);
                } else {
                    $('#viewNumber').val(result.verifyId);
                    $('#orderTimes').val(formatDateStr(result.modifyTime));
                    $('#tradeName4').val(result.scopeProduct);
                    $('#warehouse4').val(result.scopeWarehouse);
                    $('#reservoirArea4').val(result.scopeArea);
                    $('#viewRemark').val(result.remark);

                    // 判断仓库是否为空，如果为空盘点范围则是按商品，反之盘点范围是存储
                    if (result.scopeWarehouse != null) {
                        if (result.scopeWarehouse != '') {
                            $('input:radio[name="checkInventoryScope"]:eq(1)').attr('checked', 'true');
                        } else {
                            $('input:radio[name="checkInventoryScope"]:eq(0)').attr('checked', 'true');
                        }
                    }
                }

            } else {
                alert('数据异常！')
            }
        },
        error: function() {
            alert('失败！')
        }
    })
}

// 获取公用的checkId
var checkId,
    storeStatus,
    checkStoreNo;

function auditsStatus(id, status, number) {
    checkId = id;
    storeStatus = status;
    checkStoreNo = number;
}

// 审核通过
function surePass() {
    var parameter = {
        "checkId": checkId,
        "checkStatus": 1,
        "checkPeople": JSON.parse($.cookie('userInfo')).username,
        "storeStatus": storeStatus, // 1、入库单；2、出库单；3、盘点单
        "checkStoreNo": checkStoreNo // 单号
    }
    console.log('parameter pass=', parameter);
    $.ajax({
        type: 'POST',
        url: ipAddress + '/examine/examineStore.do',
        data: JSON.stringify(parameter),
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            console.log('result pass=', result);
            initAjax3();
        },
        error: function() {
            alert('失败！')
        }
    })
}

// 审核拒绝
function confirmRejection() {
    var parameter = {
        "checkId": checkId,
        "checkStatus": 2,
        "checkPeople": JSON.parse($.cookie('userInfo')).username,
        "checkRemark": $('#refuseState').val(),
        "storeStatus": storeStatus,
        "checkStoreNo": checkStoreNo
    }
    console.log('parameter confirmRejection=', parameter);
    $.ajax({
        type: 'POST',
        url: ipAddress + '/examine/examineStore.do',
        data: JSON.stringify(parameter),
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            console.log('result confirmRejection=', result);
            if (result) {
                if (result.code == 3010) {
                    $('#refuseState').val('');
                    $('#titleSpan').html('');
                    document.getElementById('saveRefuse').setAttribute('disabled', 'disabled');
                }
            }
            initAjax3();
        },
        error: function() {
            alert('失败！')
        }
    })
}

// 盘点单管理查询
var examineQueryId;
$('#examineQuery').click(function() {
    examineQueryId = $('#inputBox2').val();
    initAjax3();
})

/* --------------------------------------------------------审核查询-------------------------------------------------------------------------------- */
var parameter4 = {};

// 初始化审核查询的数据
function initAjax4() {
    parameter4 = {
        "pageIndex": 1,
        "recordCount": 10,
        "criteria": {
            "status": checkVal // 审核通过3,审核拒绝4
        }
    }

    $.ajax({
        type: 'POST',
        url: ipAddress + '/inventory/queryVerifyAudited.do',
        data: JSON.stringify(parameter4),
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            console.log('result=', result);
            // initAjax4();
            if (result) {
                if (result.data.length == 0) {
                    parameter4.pageIndex -= 1;
                    if (parameter4.pageIndex != 0) {
                        initAjax4();
                    }
                }
                $("#myTable4 tbody tr").remove();
                pageIndex = result.currentPage;
                var html = '';
                for (var i = 0; i < result.data.length; i++) {
                    html += '<tr>' +
                        '<td>' + (pageIndex * 10 - 9 + i) +
                        '</td>' +
                        '<td>' + result.data[i].verifyId +
                        '</td>' +
                        '<td>' + (result.data[i].username == null ? '' : result.data[i].username) +
                        '</td>' +
                        '<td>' + (formatDateStr(result.data[i].modifyTime) == null ? '' : formatDateStr(result.data[i].modifyTime)) +
                        '</td>' +
                        '<td>' + (result.data[i].status == null ? '' : result.data[i].status == 3 ? '通过' : result.data[i].status == 4 ? '拒绝' : result.data[i].status) +
                        '</td>' +
                        '<td>' + (result.data[i].checkRemark == null ? '' : result.data[i].checkRemark) +
                        '</td>' +
                        '</tr>'
                }
            }
            $("#myTable4 tbody").append(html);
            //分页
            $('.M-box3').pagination({
                pageCount: result.totalPage, //总页码
                jump: true, //是否开启跳转，true是开启
                coping: true, //是否开启首页和末页，此处开启
                homePage: '首页',
                endPage: '末页',
                prevContent: '上页',
                nextContent: '下页',
                current: parameter4.pageIndex, //当前页码
                callback: function(api) { //这是一个回调函数					
                    parameter4.pageIndex = api.getCurrent();
                    $.ajax({
                        type: 'POST',
                        url: ipAddress + '/inventory/queryVerifyAudited.do',
                        data: JSON.stringify(parameter4),
                        contentType: 'application/json;charset=UTF-8',
                        success: function(result) {
                            if (result) {
                                if (result.data.length == 0) {
                                    parameter4.pageIndex -= 1;
                                    if (parameter4.pageIndex != 0) {
                                        initAjax4();
                                    }
                                }
                                $("#myTable4 tbody tr").remove();
                                pageIndex = result.currentPage;
                                var html = '';
                                for (var i = 0; i < result.data.length; i++) {
                                    html += '<tr>' +
                                        '<td>' + (pageIndex * 10 - 9 + i) +
                                        '</td>' +
                                        '<td>' + result.data[i].verifyId +
                                        '</td>' +
                                        '<td>' + (result.data[i].username == null ? '' : result.data[i].username) +
                                        '</td>' +
                                        '<td>' + (formatDateStr(result.data[i].checkTime) == null ? '' : formatDateStr(result.data[i].checkTime)) +
                                        '</td>' +
                                        '<td>' + (result.data[i].status == null ? '' : result.data[i].status == 3 ? '通过' : result.data[i].status == 4 ? '拒绝' : result.data[i].status) +
                                        '</td>' +
                                        '<td>' + (result.data[i].checkRemark == null ? '' : result.data[i].checkRemark) +
                                        '</td>' +
                                        '</tr>'
                                }
                                $("#myTable4 tbody").append(html);
                            }
                        },
                        error: function() {
                            alert('失败')
                        }
                    })
                }
            });
        },
        error: function() {
            alert('失败！')
        }
    })
}

// 根据状态查询(通过、拒绝)
var checkVal;
$('#auditEnquiries').click(function() {
    checkVal = $('input:radio[name="optionsRadiosinline"]:checked').val();
    initAjax4();
})

/* --------------------------------------------------------样式验证-------------------------------------------------------------------------------- */


function check(name, spanId, okInfo, errorInfo) {
    var flag;
    var val = document.getElementsByName(name)[0].value;
    var oSpanNode = document.getElementById(spanId);
    if (val != '') {
        oSpanNode.innerHTML = okInfo.fontcolor("green");
        document.getElementById('saveRefuse').removeAttribute('disabled');
        flag = true;
    } else {
        oSpanNode.innerHTML = errorInfo.fontcolor("red");
        document.getElementById('saveRefuse').setAttribute('disabled', 'disabled');
        flag = false;
    }
    return flag;
}

// 拒绝说明(必填)
function checkRefuseState() {
    check("refuseState", "titleSpan", "正确", "不能为空");
}

// 拒绝关闭
$('#closeRefuse').click(function() {
    $('#refuseState').val('');
    $('#titleSpan').html('');
    document.getElementById('saveRefuse').setAttribute('disabled', 'disabled');
})


// 盘点管理不同角色的功能显示
var userInfo = JSON.parse($.cookie('userInfo'));
var roleId = userInfo.roleId; // 1 管理员,2操作员,3审核员
if (roleId == 2) {
    $('#M-box2').css('display', 'none');
} else if (roleId == 3) { // 标签页和内容的显示与隐藏
    $('#M-box').css('display', 'none');
    $('#M-box1').css('display', 'none');
    $('#M-box2').parent().attr('class', 'active');

    $('#inventorySheet').css('display', 'none');
    $('#onlineAudit').css('display', 'block');

    $('.M-box2').show();
    $('.M-box2').siblings().hide();
    initAjax3();
    $('#M-box3').click(function() {
        $('#onlineAudit').css('display', 'none');
    })

    $('#M-box2').click(function() {
        $('#onlineAudit').css('display', 'block');
    })
}