if ($.cookie('userInfo') != null) {
    // alert('aa');
} else {
    window.top.location = './login.html';
}
var expiresDate = new Date();
expiresDate.setTime(expiresDate.getTime() + (30 * 60 * 1000));
$.cookie('userInfo', $.cookie('userInfo'), {
    expires: expiresDate
});

// 权限划分
var userInfo = JSON.parse($.cookie('userInfo'));
console.log('userInfo=', userInfo);
var roleId = userInfo.roleId; // 1 管理员,2操作员,3审核员
if (roleId == 2) {
    $('.menu ul li:eq(0)').css('display', 'none');
    $('.menu ul li:eq(5)').css('display', 'none');
    $('.menu ul li:eq(6)').css('display', 'none');
    $('.menu ul li:eq(7)').css('display', 'none');    
} else if (roleId == 3) {
    $('.menu ul li:eq(0)').css('display', 'none');
    $('.menu ul li:eq(5)').css('display', 'none');
    $('.menu ul li:eq(6)').css('display', 'none');
    $('.menu ul li:eq(7)').css('display', 'none');
}

// 库存预警
function loadAjaxWarning() {
    var parameter = {};
    $.ajax({
        type: 'POST',
        url: ipAddress + '/warning/queryStockWarningTips.do',
        data: parameter,
        async: false,
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            console.log('result=', result);
            if (result) {
                $('#marquee2').css('visibility', 'visible');
                if (result.code == 6011) {
                    $('#marquee2 ul li a').html(result.message + '<span style="margin-left: 200px;"></span>');
                } else {
                    $('#marquee2 ul li a').html(result.message + '<span style="margin-left: 200px;"></span>');
                }
            } else {
                $('#marquee2').css('visibility', 'hidden');
            }
        },
        error: function() {
            alert('失败！')
        }
    })
}

loadAjaxWarning();


setInterval(function() {
    loadAjaxWarning()
}, 5000)