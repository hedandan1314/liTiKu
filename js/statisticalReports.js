$(function() {
    $('#M-box').click(function() {
        parameter.pageIndex = 1;
        resetting1();
        inboundQueryId = '';
        storageTime = '';
        initAjax();
        $('.M-box').show();
        $('.M-box').siblings().hide();
    })
    $('#M-box1').click(function() {
        parameter2.pageIndex = 1;
        resetting2();
        inboundQueryId2 = '';
        exitTime = '';
        initAjax2();
        $('.M-box1').show();
        $('.M-box1').siblings().hide();
    })
    $('#M-box2').click(function() {
        parameter3.pageIndex = 1;
        resetting3();
        inboundQueryId3 = '';
        inventoryTime = '';
        initAjax3();
        $('.M-box2').show();
        $('.M-box2').siblings().hide();
    })
    $('#M-box3').click(function() {
        parameter4.pageIndex = 1;
        initAjax4();
        $('.M-box3').show();
        $('.M-box3').siblings().hide();
    })
    $('#M-box4').click(function() {
        parameter4.pageIndex = 1;
        initAjax5();
        $('.M-box4').show();
        $('.M-box4').siblings().hide();
    })
})
loadAjax();
// 初始化用户数据
function loadAjax() {
    var parameter = {
        "pageIndex": 1,
        "recordCount": 50,
        "criteria": {}
    }
    $.ajax({
        type: 'POST',
        url: ipAddress + '/user/queryUsers.do',
        data: JSON.stringify(parameter),
        async: false,
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            console.log('result user=', result);
            $('#tradersDetail').siblings().remove();
            $('#tradersDetail2').siblings().remove();
            $('#tradersDetail3').siblings().remove();
            $('#tradersDetail4').siblings().remove();
            $('#tradersDetail5').siblings().remove();
            var html = '';
            if (result) {
                if (result.data.length != 0) { // 当用户数据不为空时
                    for (var i = 0; i < result.data.length; i++) {
                        html += '<option value="' + result.data[i].userNo + '">' + result.data[i].username + '</option>'
                    }
                    $('#traders').append(html);
                    $('#traders2').append(html);
                    $('#traders3').append(html);
                    $('#traders4').append(html);
                    $('#traders5').append(html);
                }
            }
        },
        error: function() {
            alert('失败！')
        }
    })
}

/*-----------------------------------------------------------------生产入库-----------------------------------------------------------------------------------*/

var parameter = {}

// 初始化生产入库信息
function initAjax() {
    parameter = {
        "pageIndex": 1,
        "recordCount": 10,
        "criteria": {
            "userNo": inboundQueryId,
            "inStoreTime": storageTime
        }
    }
    console.log('parameter=', parameter);
    $.ajax({
        type: 'POST',
        url: ipAddress + '/InStore/selectInStoreTable.do',
        data: JSON.stringify(parameter),
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            console.log('result', result);
            if (result) {
                if (result.data.length == 0) {
                    parameter.pageIndex -= 1
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
                        '<td>' + result.data[i].productName +
                        '</td>' +
                        '<td>' + (result.data[i].inStoreAuthor == null ? '' : result.data[i].inStoreAuthor) +
                        '</td>' +
                        '<td>' + (result.data[i].inStoreTime == null ? '' : result.data[i].inStoreTime) +
                        '</td>' +
                        '<td>' + (result.data[i].number == null ? '' : result.data[i].number) +
                        '</td>' +
                        '<td>' + (result.data[i].unit == null ? '' : result.data[i].unit) +
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
                            url: ipAddress + '/InStore/selectInStoreTable.do',
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
                                        '<td>' + result.data[i].productName +
                                        '</td>' +
                                        '<td>' + (result.data[i].inStoreAuthor == null ? '' : result.data[i].inStoreAuthor) +
                                        '</td>' +
                                        '<td>' + (result.data[i].inStoreTime == null ? '' : result.data[i].inStoreTime) +
                                        '</td>' +
                                        '<td>' + (result.data[i].number == null ? '' : result.data[i].number) +
                                        '</td>' +
                                        '<td>' + (result.data[i].unit == null ? '' : result.data[i].unit) +
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
            alert('失败！')
        }
    })
}

initAjax();

// 获取业务员
var inboundQueryId;
$('#traders').change(function() {
    inboundQueryId = $('#traders option:selected').val();
})

// 入库查询
var storageTime;
$('#inboundQuery').click(function() {
    storageTime = $('#startTime1').val();
    initAjax();
})




/*-----------------------------------------------------------------销售出库-----------------------------------------------------------------------------------*/
var parameter2 = {}

function initAjax2() {
    parameter2 = {
        "pageIndex": 1,
        "recordCount": 10,
        "criteria": {
            "userNo": inboundQueryId2,
            "outStoreTime": exitTime
        }
    }
    $.ajax({
        type: 'POST',
        url: ipAddress + '/report/queryOutStoreDetail.do',
        data: JSON.stringify(parameter2),
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            console.log('result', result);
            if (result) {
                if (result.data.length == 0) {
                    parameter2.pageIndex -= 1
                    if (parameter2.pageIndex != 0) {
                        initAjax2();
                    }
                }
                $("#myTable2 tbody tr").remove();
                pageIndex = result.currentPage;
                for (var i = 0; i < result.data.length; i++) {
                    var html = '<tr>' +
                        '<td>' + (pageIndex * 10 - 9 + i) +
                        '</td>' +
                        '<td>' + result.data[i].productName +
                        '</td>' +
                        '<td>' + (result.data[i].outStoreAuthor == null ? '' : result.data[i].outStoreAuthor) +
                        '</td>' +
                        '<td>' + (result.data[i].outStoreTime == null ? '' : result.data[i].outStoreTime) +
                        '</td>' +
                        '<td>' + (result.data[i].number == null ? '' : result.data[i].number) +
                        '</td>' +
                        '<td>' + (result.data[i].unit == null ? '' : result.data[i].unit) +
                        '</td>' +
                        '</tr>'
                    $('#myTable2 tbody').append(html)
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
                    current: parameter2.pageIndex, //当前页码
                    callback: function(api) { //这是一个回调函数
                        parameter2.pageIndex = api.getCurrent();
                        $.ajax({
                            type: 'POST',
                            url: ipAddress + '/report/queryOutStoreDetail.do',
                            data: JSON.stringify(parameter2),
                            contentType: 'application/json;charset=UTF-8',
                            success: function(result) {
                                if (result.data.length == 0) {
                                    parameter2.pageIndex -= 1
                                    if (parameter2.pageIndex != 0) {
                                        initAjax2();
                                    }
                                }
                                pageIndex = result.currentPage;
                                $("#myTable2 tbody tr").remove();
                                for (var i = 0; i < result.data.length; i++) {
                                    var html = '<tr>' +
                                        '<td>' + (pageIndex * 10 - 9 + i) +
                                        '</td>' +
                                        '<td>' + result.data[i].productName +
                                        '</td>' +
                                        '<td>' + (result.data[i].outStoreAuthor == null ? '' : result.data[i].outStoreAuthor) +
                                        '</td>' +
                                        '<td>' + (result.data[i].outStoreTime == null ? '' : result.data[i].outStoreTime) +
                                        '</td>' +
                                        '<td>' + (result.data[i].number == null ? '' : result.data[i].number) +
                                        '</td>' +
                                        '<td>' + (result.data[i].unit == null ? '' : result.data[i].unit) +
                                        '</td>' +
                                        '</tr>'
                                    $('#myTable2 tbody').append(html)
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
            alert('失败！')
        }
    })
}

// 获取业务员
var inboundQueryId2;
$('#traders2').change(function() {
    inboundQueryId2 = $('#traders2 option:selected').val();
})

// 入库查询
var exitTime;
$('#outboundQuery').click(function() {
    exitTime = $('#startTime2').val();
    initAjax2();
})


/*-----------------------------------------------------------------盘点报表-----------------------------------------------------------------------------------*/
var parameter3 = {}

function initAjax3() {
    parameter3 = {
        "pageIndex": 1,
        "recordCount": 10,
        "criteria": {
            "modifyPerson": inboundQueryId3,
            "modifyTime": inventoryTime
        }
    }
    console.log('parameter3=', parameter3);
    $.ajax({
        type: 'POST',
        url: ipAddress + '/report/queryVerifyTotal.do',
        data: JSON.stringify(parameter3),
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            console.log('result', result);
            if (result) {
                if (result.data.length == 0) {
                    parameter3.pageIndex -= 1
                    if (parameter3.pageIndex != 0) {
                        initAjax3();
                    }
                }
                $("#myTable3 tbody tr").remove();
                pageIndex = result.currentPage;
                for (var i = 0; i < result.data.length; i++) {
                    if (result.data[i].curInventory != null && result.data[i].chkInventory != null) {
                        if (result.data[i].curInventory > result.data[i].chkInventory) {
                            var html = '<tr>' +
                                '<td>' + (pageIndex * 10 - 9 + i) +
                                '</td>' +
                                '<td>' + result.data[i].productName +
                                '</td>' +
                                '<td>' + (result.data[i].username == null ? '' : result.data[i].username) +
                                '</td>' +
                                '<td>' + (formatDateStr(result.data[i].modifyTime) == null ? '' : formatDateStr(result.data[i].modifyTime)) +
                                '</td>' +
                                '<td>' + (result.data[i].curInventory == null ? '' : result.data[i].curInventory) +
                                '</td>' +
                                '<td>' + (result.data[i].chkInventory == null ? '' : result.data[i].chkInventory) +
                                '</td>' +
                                '<td>-' + (result.data[i].curInventory - result.data[i].chkInventory) +
                                '</td>' +
                                '<td>' + (result.data[i].productUnit == null ? '' : result.data[i].productUnit) +
                                '</td>' +
                                '</tr>'
                            $('#myTable3 tbody').append(html);
                        } else if (result.data[i].curInventory < result.data[i].chkInventory) {
                            var html = '<tr>' +
                                '<td>' + (pageIndex * 10 - 9 + i) +
                                '</td>' +
                                '<td>' + result.data[i].productName +
                                '</td>' +
                                '<td>' + (result.data[i].username == null ? '' : result.data[i].username) +
                                '</td>' +
                                '<td>' + (formatDateStr(result.data[i].modifyTime) == null ? '' : formatDateStr(result.data[i].modifyTime)) +
                                '</td>' +
                                '<td>' + (result.data[i].curInventory == null ? '' : result.data[i].curInventory) +
                                '</td>' +
                                '<td>' + (result.data[i].chkInventory == null ? '' : result.data[i].chkInventory) +
                                '</td>' +
                                '<td>+' + (Math.abs(result.data[i].curInventory - result.data[i].chkInventory)) +
                                '</td>' +
                                '<td>' + (result.data[i].productUnit == null ? '' : result.data[i].productUnit) +
                                '</td>' +
                                '</tr>'
                            $('#myTable3 tbody').append(html);
                        } else {
                            var html = '<tr>' +
                                '<td>' + (pageIndex * 10 - 9 + i) +
                                '</td>' +
                                '<td>' + result.data[i].productName +
                                '</td>' +
                                '<td>' + (result.data[i].username == null ? '' : result.data[i].username) +
                                '</td>' +
                                '<td>' + (formatDateStr(result.data[i].modifyTime) == null ? '' : formatDateStr(result.data[i].modifyTime)) +
                                '</td>' +
                                '<td>' + (result.data[i].curInventory == null ? '' : result.data[i].curInventory) +
                                '</td>' +
                                '<td>' + (result.data[i].chkInventory == null ? '' : result.data[i].chkInventory) +
                                '</td>' +
                                '<td>' + (Math.abs(result.data[i].curInventory - result.data[i].chkInventory)) +
                                '</td>' +
                                '<td>' + (result.data[i].productUnit == null ? '' : result.data[i].productUnit) +
                                '</td>' +
                                '</tr>'
                            $('#myTable3 tbody').append(html);
                        }

                    }

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
                    current: parameter3.pageIndex, //当前页码
                    callback: function(api) { //这是一个回调函数
                        parameter3.pageIndex = api.getCurrent();
                        $.ajax({
                            type: 'POST',
                            url: ipAddress + '/report/queryVerifyTotal.do',
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
                                for (var i = 0; i < result.data.length; i++) {
                                    if (result.data[i].curInventory != null && result.data[i].chkInventory != null) {
                                        if (result.data[i].curInventory > result.data[i].chkInventory) {
                                            var html = '<tr>' +
                                                '<td>' + (pageIndex * 10 - 9 + i) +
                                                '</td>' +
                                                '<td>' + result.data[i].productName +
                                                '</td>' +
                                                '<td>' + (result.data[i].username == null ? '' : result.data[i].username) +
                                                '</td>' +
                                                '<td>' + (formatDateStr(result.data[i].modifyTime) == null ? '' : formatDateStr(result.data[i].modifyTime)) +
                                                '</td>' +
                                                '<td>' + (result.data[i].curInventory == null ? '' : result.data[i].curInventory) +
                                                '</td>' +
                                                '<td>' + (result.data[i].chkInventory == null ? '' : result.data[i].chkInventory) +
                                                '</td>' +
                                                '<td>-' + (result.data[i].curInventory - result.data[i].chkInventory) +
                                                '</td>' +
                                                '<td>' + (result.data[i].productUnit == null ? '' : result.data[i].productUnit) +
                                                '</td>' +
                                                '</tr>'
                                            $('#myTable3 tbody').append(html);
                                        } else if (result.data[i].curInventory < result.data[i].chkInventory) {
                                            var html = '<tr>' +
                                                '<td>' + (pageIndex * 10 - 9 + i) +
                                                '</td>' +
                                                '<td>' + result.data[i].productName +
                                                '</td>' +
                                                '<td>' + (result.data[i].username == null ? '' : result.data[i].username) +
                                                '</td>' +
                                                '<td>' + (formatDateStr(result.data[i].modifyTime) == null ? '' : formatDateStr(result.data[i].modifyTime)) +
                                                '</td>' +
                                                '<td>' + (result.data[i].curInventory == null ? '' : result.data[i].curInventory) +
                                                '</td>' +
                                                '<td>' + (result.data[i].chkInventory == null ? '' : result.data[i].chkInventory) +
                                                '</td>' +
                                                '<td>+' + (Math.abs(result.data[i].curInventory - result.data[i].chkInventory)) +
                                                '</td>' +
                                                '<td>' + (result.data[i].productUnit == null ? '' : result.data[i].productUnit) +
                                                '</td>' +
                                                '</tr>'
                                            $('#myTable3 tbody').append(html);
                                        } else {
                                            var html = '<tr>' +
                                                '<td>' + (pageIndex * 10 - 9 + i) +
                                                '</td>' +
                                                '<td>' + result.data[i].productName +
                                                '</td>' +
                                                '<td>' + (result.data[i].username == null ? '' : result.data[i].username) +
                                                '</td>' +
                                                '<td>' + (formatDateStr(result.data[i].modifyTime) == null ? '' : formatDateStr(result.data[i].modifyTime)) +
                                                '</td>' +
                                                '<td>' + (result.data[i].curInventory == null ? '' : result.data[i].curInventory) +
                                                '</td>' +
                                                '<td>' + (result.data[i].chkInventory == null ? '' : result.data[i].chkInventory) +
                                                '</td>' +
                                                '<td>' + (Math.abs(result.data[i].curInventory - result.data[i].chkInventory)) +
                                                '</td>' +
                                                '<td>' + (result.data[i].productUnit == null ? '' : result.data[i].productUnit) +
                                                '</td>' +
                                                '</tr>'
                                            $('#myTable3 tbody').append(html);
                                        }

                                    }

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
            alert('失败！')
        }
    })
}

// 获取业务员
var inboundQueryId3;
$('#traders3').change(function() {
    inboundQueryId3 = $('#traders3 option:selected').val();
})

// 入库查询
var inventoryTime;
$('#inventoryQuery').click(function() {
    inventoryTime = $('#startTime3').val();
    initAjax3();
})


/*-----------------------------------------------------------------报溢报表-----------------------------------------------------------------------------------*/
var parameter4 = {}

function initAjax4() {
    parameter4 = {
        "pageIndex": 1,
        "recordCount": 5,
        "criteria": {
            "modifyPerson": inboundQueryId4,
            "modifyTime": inventoryTime
        }
    }
    console.log('parameter4=', parameter4);
    $.ajax({
        type: 'POST',
        url: ipAddress + '/report/queryVerifyTotal.do',
        data: JSON.stringify(parameter4),
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            console.log('result', result);
            if (result) {
                if (result.data.length == 0) {
                    parameter4.pageIndex -= 1
                    if (parameter4.pageIndex != 0) {
                        initAjax4();
                    }
                }
                $("#myTable5 tbody tr").remove();
                pageIndex = result.currentPage;
                for (var i = 0; i < result.data.length; i++) {
                    if (result.data[i].curInventory != null && result.data[i].chkInventory != null) {
                        if (result.data[i].curInventory < result.data[i].chkInventory) {
                            var html = '<tr>' +
                                '<td>' + (pageIndex * 5 - 4 + i) +
                                '</td>' +
                                '<td>' + result.data[i].productName +
                                '</td>' +
                                '<td>' + (result.data[i].username == null ? '' : result.data[i].username) +
                                '</td>' +
                                '<td>' + (formatDateStr(result.data[i].modifyTime) == null ? '' : formatDateStr(result.data[i].modifyTime)) +
                                '</td>' +
                                '<td>' + (result.data[i].curInventory == null ? '' : result.data[i].curInventory) +
                                '</td>' +
                                '<td>' + (Math.abs(result.data[i].curInventory - result.data[i].chkInventory)) +
                                '</td>' +
                                '<td>' + (result.data[i].productUnit == null ? '' : result.data[i].productUnit) +
                                '</td>' +
                                '</tr>'
                            $('#myTable5 tbody').append(html);
                        }
                    }

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
                    current: parameter4.pageIndex, //当前页码
                    callback: function(api) { //这是一个回调函数
                        parameter4.pageIndex = api.getCurrent();
                        $.ajax({
                            type: 'POST',
                            url: ipAddress + '/report/queryVerifyTotal.do',
                            data: JSON.stringify(parameter4),
                            contentType: 'application/json;charset=UTF-8',
                            success: function(result) {
                                if (result.data.length == 0) {
                                    parameter4.pageIndex -= 1
                                    if (parameter4.pageIndex != 0) {
                                        initAjax4();
                                    }
                                }
                                pageIndex = result.currentPage;
                                $("#myTable5 tbody tr").remove();
                                for (var i = 0; i < result.data.length; i++) {
                                    if (result.data[i].curInventory != null && result.data[i].chkInventory != null) {
                                        if (result.data[i].curInventory < result.data[i].chkInventory) {
                                            var html = '<tr>' +
                                                '<td>' + (pageIndex * 5 - 4 + i) +
                                                '</td>' +
                                                '<td>' + result.data[i].productName +
                                                '</td>' +
                                                '<td>' + (result.data[i].username == null ? '' : result.data[i].username) +
                                                '</td>' +
                                                '<td>' + (formatDateStr(result.data[i].modifyTime) == null ? '' : formatDateStr(result.data[i].modifyTime)) +
                                                '</td>' +
                                                '<td>' + (result.data[i].curInventory == null ? '' : result.data[i].curInventory) +
                                                '</td>' +
                                                '<td>' + (Math.abs(result.data[i].curInventory - result.data[i].chkInventory)) +
                                                '</td>' +
                                                '<td>' + (result.data[i].productUnit == null ? '' : result.data[i].productUnit) +
                                                '</td>' +
                                                '</tr>'
                                            $('#myTable5 tbody').append(html);
                                        }
                                    }

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
            alert('失败！')
        }
    })
}

// 获取业务员
var inboundQueryId4;
$('#traders4').change(function() {
    inboundQueryId4 = $('#traders4 option:selected').val();
})

// 入库查询
var inventoryTime;
$('#inventoryQuery').click(function() {
    inventoryTime = $('#startTime3').val();
    initAjax4();
})