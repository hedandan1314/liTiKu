$(function() {
    $('#addCommodity').click(function() {
        var index = $('#removeOne tr').length;
        var tr = '<tr>' +
            '<td>' + (++index) + '</td>' +
            '<td>' +
            '<select name="" id="" onchange="show_sub(this.options[this.options.selectedIndex].value)">' +
            '<option>请选择商品名称</option>' +
            '<option value="汾酒保健酒">汾酒保健酒</option>' +
            '<option value="白酒">白酒</option>' +
            '</select>' +
            '</td>' +
            '<td>' +
            '<select name="" id="">' +
            '<option>请选择库区</option>' +
            '<option>a</option>' +
            '<option>b</option>' +
            '</select>' +
            '</td>' +
            '<td><input type="text" style="border: none; outline: none; width: 80px;"></td>' +
            '<td><input type="text" style="border: none; outline: none; width: 50px;"></td>' +
            '<td><input type="text" style="border: none; outline: none; width: 25px;"></td>' +
            '<td><a id="trDelete" onclick="trDelete(this)" class="btn btn-danger" style="outline: none;">删除</a></td>' +
            '</tr>';
        $(this).siblings('table').append(tr);

    });
    $('#addCommodity2').click(function() {
        var index = $('#removeOne2 tr').length;
        var tr = '<tr>' +
            '<td>' + (++index) + '</td>' +
            '<td>' +
            '<select name="" id="" onchange="show_sub(this.options[this.options.selectedIndex].value)">' +
            '<option>请选择商品名称</option>' +
            '<option value="汾酒保健酒">汾酒保健酒</option>' +
            '<option value="白酒">白酒</option>' +
            '</select>' +
            '</td>' +
            '<td>' +
            '<select name="" id="">' +
            '<option>请选择库区</option>' +
            '<option>a</option>' +
            '<option>b</option>' +
            '</select>' +
            '</td>' +
            '<td><input type="text" style="border: none; outline: none; width: 80px;"></td>' +
            '<td><input type="text" style="border: none; outline: none; width: 50px;"></td>' +
            '<td><input type="text" style="border: none; outline: none; width: 25px;"></td>' +
            '<td><a id="trDelete" onclick="trDelete(this)" class="btn btn-danger" style="outline: none;">删除</a></td>' +
            '</tr>';
        $(this).siblings('table').append(tr);
    });
})
var trId,
    trObj;

function myDelete(obj) {
    trId = obj.parentNode.parentNode;
    trObj = trId.parentNode;
}

function sureDelete() {
    trObj.removeChild(trId);
}

function show_sub(v) {
    if (v == '汾酒保健酒') {
        alert('汾酒保健酒');
    } else if (v == '白酒') {
        alert('白酒');
    } else {
        alert('请选择商品名称')
    }
}

function trDelete(obj) {
    var trId,
        trObj;
    trId = obj.parentNode.parentNode;
    trObj = trId.parentNode;
    trObj.removeChild(trId);
}