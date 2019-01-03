//var ipAddress = 'http://192.168.100.201:7070/fenjiuWMS';
var ipAddress = 'http://192.168.100.228:8080/fenjiuWMS';
// var ipAddress = 'http://192.168.100.207:8080/fenjiuWMS';
// var ipAddress = 'http://192.168.100.84:8520/fenjiuWMS';

//页面失效时间
var maxTime = 1500; // seconds
function jianTingYM() {
    var time = maxTime;
    $('body').on('keydown mousemove mousedown', function(e) {
        time = maxTime; // reset
    });
    var intervalId = setInterval(function() {
        time--;
        // console.log(time);
        if (time <= 0) {
            ShowInvalidLoginMessage();
            clearInterval(intervalId);
        }
    }, 1000)

    function ShowInvalidLoginMessage() {
        alert("您已经长时间没操作了，即将退出系统");
        location.href = './login.html';
    }
}
var URLTEMP = location.pathname;
if (URLTEMP.indexOf("login.html") < 0) {
    jianTingYM()
}