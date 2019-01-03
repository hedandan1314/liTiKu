//解析url后面的参数
function getJsonFromUrl(hashBased, url) {
    var query;
    if (hashBased) {
        var pos = url.indexOf("?");
        if (pos == -1) return [];
        query = url.substr(pos + 1);
    } else {
        query = url.substr(1);
    }
    var result = {};
    query.split("&").forEach(function(part) {
        if (!part) return;
        part = part.split("+").join(" "); // replace every + with space, regexp-free version
        var eq = part.indexOf("=");
        var key = eq > -1 ? part.substr(0, eq) : part;
        var val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : "";
        var from = key.indexOf("[");
        if (from == -1) result[decodeURIComponent(key)] = val;
        else {
            var to = key.indexOf("]");
            var index = decodeURIComponent(key.substring(from + 1, to));
            key = decodeURIComponent(key.substring(0, from));
            if (!result[key]) result[key] = [];
            if (!index) result[key].push(val);
            else result[key][index] = val;
        }
    });
    return result;
}

var UrlParameter_obj = getJsonFromUrl(true, location.href);
var verifyId = UrlParameter_obj.verifyId;

console.log('verifyId=', verifyId);


// $('#M-box').click(function() {
//     parameter.pageIndex = 1;
//     initAjax();
//     $('.M-box').show();
//     $('.M-box').siblings().hide();
// })
// $('#M-box1').click(function() {
//     parameter2.pageIndex = 1;
//     getInformation();
//     initAjax2();
//     $('.M-box1').show();
//     $('.M-box1').siblings().hide();
// })
initAjax();
// 初始化在线录入列表
function initAjax() {
    var parameter = {
        'verifyId': verifyId
    }
    $.ajax({
        type: 'POST',
        url: ipAddress + '/inventory/queryVerifyDetail.do',
        data: parameter,
        success: function(result) {
            console.log('result=', result);
            if (result) {
                var scopeWarehouse = result.master.scopeWarehouse;
                var scopeArea = result.master.scopeArea;
                // 获取仓库数据
                var parameter = {
                    "pageIndex": 1
                }
                $.ajax({
                    type: 'POST',
                    url: ipAddress + '/warehouse/queryWarehouse.do',
                    data: JSON.stringify(parameter),
                    contentType: 'application/json;charset=UTF-8',
                    success: function(result) {
                        console.log('reusult2=', result);
                        if (result) {
                            var html = '';
                            for (var i = 0; i < result.data.length; i++) {
                                if (result.data[i].warehouseNo == scopeWarehouse) {
                                    $('#scopeWarehouse').html(result.data[i].warehouseName);

                                    var parameter = {
                                        "pageIndex": 1,
                                        "criteria": {
                                            "warehouseNo": scopeWarehouse
                                        }
                                    }

                                    // 根据仓库获取库区数据
                                    $.ajax({
                                        type: 'POST',
                                        url: ipAddress + '/area/queryArea.do',
                                        data: JSON.stringify(parameter),
                                        contentType: 'application/json;charset=UTF-8',
                                        success: function(result) {
                                            console.log('reusult3=', result);
                                            var html = '';
                                            for (var i = 0; i < result.data.length; i++) {
                                                if (result.data[i].areaNo == scopeArea) {
                                                    $('#scopeArea').html(result.data[i].areaName);
                                                }
                                            }
                                        },
                                        error: function() {
                                            alert('失败')
                                        }
                                    })
                                }
                            }

                        }

                    },
                    error: function() {
                        alert('失败')
                    }
                })



                $('#verifyId').html(result.master.verifyId);
                $('#modifyPerson').html(result.master.username);
                $('#modifyTime').html(formatDateStr(result.master.modifyTime));

                $("#myTable tbody tr").remove();
                for (var i = 0; i < result.detail.length; i++) {
                    var html = '<tr>' +
                        '<td>' + (i + 1) +
                        '</td>' +
                        '<td>' + result.detail[i].productName +
                        '</td>' +
                        '<td>' + result.detail[i].allocationNo +
                        '</td>' +
                        '<td>' + (result.detail[i].productUnit == null ? '' : result.detail[i].productUnit) +
                        '</td>' +
                        '<td>' + (result.detail[i].curInventory == null ? '' : result.detail[i].curInventory) +
                        '</td>' +
                        '<td>' + (result.detail[i].chkInventory == null ? '' : result.detail[i].chkInventory) +
                        '</td>' +
                        '<td>' +
                        '<a class="btn btn-primary" data-toggle="modal" data-target="#check" style="outline: none;" onclick="dataEntry(' + result.detail[i].id + ',' + result.detail[i].chkInventory + ',\'' + result.detail[i].description + '\')">录入</a>' +
                        '</td>' +
                        '</tr>'
                    $('#myTable tbody').append(html)
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

// 录入数据(获取明细的id)
var dataEntryId;

function dataEntry(id, actualInventory, description) {
    // 判断实际库存量
    if (actualInventory != null && actualInventory != undefined) {
        $('#actual').val(actualInventory);
    } else {
        $('#actual').val('');
    }
    // 判断说明
    if (description != 'null' && description != undefined) {
        $('#instructions').html(description);
    } else {
        $('#instructions').html('');
    }
    dataEntryId = id
}

// 录入保存
$('#enterSave').click(function() {
    var parameter = {
        'id': dataEntryId,
        'chkInventory': $('#actual').val(),
        'description': $('#instructions').val()
    }
    console.log('parameter=', parameter);
    $.ajax({
        type: 'POST',
        url: ipAddress + '/inventory/modifyVerifyDetail.do',
        data: JSON.stringify(parameter),
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            console.log('result=', result);
            if (result) {
                if (result.code == 2001) {
                    alert('盘点库存量不能为空！');
                } else {
                    document.getElementById('entryInformation').reset();
                    initAjax();
                }
            } else {
                alert('数据异常！')
            }
        },
        error: function() {
            alert('失败！')
        }
    })
})

// 初始化录入处理数据
function initAjax2() {
    var parameter = {
        'verifyId': verifyId
    }

    $.ajax({
        type: 'POST',
        url: ipAddress + '/inventory/queryVerifyDetail.do',
        data: parameter,
        success: function(result) {
            console.log('result=', result);
            if (result) {
                var scopeWarehouse = result.master.scopeWarehouse;
                var scopeArea = result.master.scopeArea;
                // 获取仓库数据
                var parameter = {
                    "pageIndex": 1
                }
                $.ajax({
                    type: 'POST',
                    url: ipAddress + '/warehouse/queryWarehouse.do',
                    data: JSON.stringify(parameter),
                    contentType: 'application/json;charset=UTF-8',
                    success: function(result) {
                        console.log('reusult2=', result);
                        if (result) {
                            var html = '';
                            for (var i = 0; i < result.data.length; i++) {
                                if (result.data[i].warehouseNo == scopeWarehouse) {
                                    $('#scopeWarehouse2').html(result.data[i].warehouseName);

                                    var parameter = {
                                        "pageIndex": 1,
                                        "criteria": {
                                            "warehouseNo": scopeWarehouse
                                        }
                                    }

                                    // 根据仓库获取库区数据
                                    $.ajax({
                                        type: 'POST',
                                        url: ipAddress + '/area/queryArea.do',
                                        data: JSON.stringify(parameter),
                                        contentType: 'application/json;charset=UTF-8',
                                        success: function(result) {
                                            console.log('reusult3=', result);
                                            var html = '';
                                            for (var i = 0; i < result.data.length; i++) {
                                                if (result.data[i].areaNo == scopeArea) {
                                                    $('#scopeArea2').html(result.data[i].areaName);
                                                }
                                            }
                                        },
                                        error: function() {
                                            alert('失败')
                                        }
                                    })
                                }
                            }

                        }

                    },
                    error: function() {
                        alert('失败')
                    }
                })


                $('#verifyId2').html(result.master.verifyId);
                $('#modifyPerson2').html(result.master.username);
                $('#modifyTime2').html(formatDateStr(result.master.modifyTime));

                $("#myTable2 tbody tr").remove();
                for (var i = 0; i < result.detail.length; i++) {
                    var html = '<tr>' +
                        '<td>' + (i + 1) +
                        '</td>' +
                        '<td>' + result.detail[i].productName +
                        '</td>' +
                        '<td>' + result.detail[i].allocationNo +
                        '</td>' +
                        '<td>' + (result.detail[i].productUnit == null ? '' : result.detail[i].productUnit) +
                        '</td>' +
                        '<td>' + (result.detail[i].curInventory == null ? '' : result.detail[i].curInventory) +
                        '</td>' +
                        '<td>' + (result.detail[i].chkInventory == null ? '' : result.detail[i].chkInventory) +
                        '</td>' +
                        '<td>' + (result.detail[i].description == null ? '' : result.detail[i].description) +
                        '</td>' +
                        '</tr>'
                    $('#myTable2 tbody').append(html)
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