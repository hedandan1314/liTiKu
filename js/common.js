// function my$(id) {
//     return document.getElementById(id)
// }
//console.log('userInfo', JSON.parse($.cookie('userInfo')));
// 退出登录
function exitLogon() {
    sessionStorage.clear();
    $.cookie('userInfo', null);
    location.href = './login.html';
}

var editor = document.getElementById('informationEditor');
var count = 0;
var userInfo = JSON.parse($.cookie('userInfo'));

$('#userId').val(userInfo.userNo);
$('#userName').val($.cookie('userName'));
$('#phone').val($.cookie('userPhone'));
$('#email').html(userInfo.email);

if ($.cookie('remark') != 'null') {
    $('#remark').val($.cookie('remark'));
} else {
    $('#remark').val('');
}


$('h4:first').html($.cookie('userName')); // 页面左上角图片下方的文本

// 修改密码
function changePwd() {
    var val1 = $('form:last input:eq(0)').val();
    var val2 = $('form:last input:eq(1)').val();
    var val3 = $('form:last input:eq(2)').val();
    var userNo = JSON.parse($.cookie('userInfo')).userNo;
    var parameter = {
        "oldPwd": val1,
        "newPwd": val2,
        "userNo": userNo

    }
    if (val1 != '' && val2 != '' && val3 != '') {
        if (val2 == val3) {
            $.ajax({
                type: 'POST',
                url: ipAddress + '/user/modifyUserPwd.do',
                data: parameter,
                success: function(result) {
                    console.log('result=', result);
                    if (result.code == 1003) {
                        alert('原密码不正确，请重新输入');
                        formReset();
                    } else {
                        sessionStorage.clear();
                        $.cookie('userInfo', null);
                        location.href = './login.html';
                    }
                },
                error: function() {
                    alert('失败！')
                }
            })
        } else {
            alert('两次密码不一致,请重新输入');
            formReset();
        }
    } else {
        alert('密码不能为空!')
    }
}

// 个人中心编辑
function myEditor() {
    document.getElementById('information').getElementsByTagName("input")[1].removeAttribute("disabled");
    document.getElementById('information').getElementsByTagName("input")[2].removeAttribute("disabled");
    document.getElementById('information').getElementsByTagName("input")[3].removeAttribute("disabled");
    document.getElementById('information').getElementsByTagName("input")[4].removeAttribute("disabled");
    editor.innerHTML = '保存';
    count++;
    if (count == 2) {
        document.getElementById('information').getElementsByTagName("input")[1].setAttribute('disabled', 'disabled');
        document.getElementById('information').getElementsByTagName("input")[2].setAttribute('disabled', 'disabled');
        document.getElementById('information').getElementsByTagName("input")[3].setAttribute('disabled', 'disabled');
        document.getElementById('information').getElementsByTagName("input")[4].setAttribute('disabled', 'disabled');
        editor.innerHTML = '编辑';
        editor.setAttribute('data-dismiss', 'modal');
        count = 0;
        var parameter = {
            "userNo": userInfo.userNo,
            "username": $('#userName').val(),
            "roleId": userInfo.roleId,
            "phone": $('#phone').val(),
            "email": $('#email').val(),
            "remark": $('#remark').val()
        }
        console.log('parameter=', parameter);
        var userPhone = $('#phone').val();
        var reg = /^1[3|4|5|7|8][0-9]{9}$/; // 手机号正则验证
        // 判断手机号是否为空
        if (userPhone != '') {
            if (!reg.test(userPhone)) {
                alert('手机号不正确!');
                $('#userName').val($.cookie('userName'));
                $('#phone').val($.cookie('userPhone'));
                $('#email').html(userInfo.email);
                $('#remark').val($.cookie('remark'));
                return false;
            } else {
                $.ajax({
                    type: 'POST',
                    url: ipAddress + '/user/modifyUser.do',
                    data: JSON.stringify(parameter),
                    contentType: 'application/json;charset=UTF-8',
                    success: function(result) {
                        console.log('result=', result);
                        if (result.code == 3010) {
                            $('h4:first').html($('#userName').val());
                            $.cookie("userName", $('#userName').val());
                            $.cookie("userPhone", userPhone);
                            $.cookie("remark", $('#remark').val());
                        } else {
                            alert('修改失败')
                        }
                    },
                    error: function() {
                        alert('失败')
                    }
                })
            }
        } else {
            $.ajax({
                type: 'POST',
                url: ipAddress + '/user/modifyUser.do',
                data: JSON.stringify(parameter),
                contentType: 'application/json;charset=UTF-8',
                success: function(result) {
                    console.log('result=', result);
                    if (result.code == 3030) {
                        // alert('修改成功')
                    } else {
                        alert('修改失败')
                    }
                },
                error: function() {
                    alert('失败')
                }
            })
        }
    } else {
        editor.removeAttribute('data-dismiss')
    }
}

// 个人信息中关闭按钮
function restoreSettings() {
    document.getElementById('information').getElementsByTagName("input")[1].setAttribute('disabled', 'disabled');
    document.getElementById('information').getElementsByTagName("input")[2].setAttribute('disabled', 'disabled');
    document.getElementById('information').getElementsByTagName("input")[3].setAttribute('disabled', 'disabled');
    document.getElementById('information').getElementsByTagName("input")[4].setAttribute('disabled', 'disabled');
    editor.innerHTML = '编辑';
    count = 0;
}

// 个人信息中关闭窗口(×)
function closeWindow() {
    document.getElementById('information').getElementsByTagName("input")[1].setAttribute('disabled', 'disabled');
    document.getElementById('information').getElementsByTagName("input")[2].setAttribute('disabled', 'disabled');
    document.getElementById('information').getElementsByTagName("input")[3].setAttribute('disabled', 'disabled');
    document.getElementById('information').getElementsByTagName("input")[4].setAttribute('disabled', 'disabled');
    editor.innerHTML = '编辑';
    count = 0;
}

// 保存用户
function saveUser() {
    var account = document.getElementById('account').innerHTML;
    var pwd = document.getElementById('pwd');
    setTimeout(function() {
        if (account == '' && pwd == '') {
            alert('账号和密码不能为空')
        } else if (account == '' || account == null) {
            alert('账号不能为空')
        } else if (pwd == '' || pwd == null) {
            alert('密码不能为空')
        }
    }, 500)
}

// 关闭密码
$('.modal-footer:last').click(function() {
    formReset();
})

// 重置密码
function formReset() {
    document.getElementById("editorPwd").reset()
}

// 时间格式化
function formatDateStr(str) {
    //	alert(str)
    if (str != null) {
        if (str.length < 14) {
            alert("时间格式不对!");
        }
        var year = str.substr(0, 4);
        var month = str.substr(4, 2);
        var day = str.substr(6, 2);
        var hh = str.substr(8, 2);
        var mm = str.substr(10, 2);
        var ss = str.substr(12, 2);

        var comp = year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
    }
    return comp;
}