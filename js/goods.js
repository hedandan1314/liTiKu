$(function() {
    /** 
     * 货位实体类
     */
    function Good(goodStatus, fcStatus, paiIndex, lieIndex) {
        this.goodStatus = goodStatus; //货位状态，0没有；1有
        this.fcStatus = fcStatus; //封存状态：0未封存；1已封存；2：已解封
        this.paiIndex = paiIndex; //货位所在的排索引
        this.lieIndex = lieIndex; //货位所在的列索引
    }
    var goodData = [{
            pIndex: 0,
            data: [{
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 0,
                    lieIndex: 0
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 0,
                    lieIndex: 1
                },
                {
                    goodStatus: 1,
                    fcStatus: 0,
                    paiIndex: 0,
                    lieIndex: 2
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 0,
                    lieIndex: 3
                }, {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 0,
                    lieIndex: 4
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 0,
                    lieIndex: 5
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 0,
                    lieIndex: 6
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 0,
                    lieIndex: 7
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 0,
                    lieIndex: 8
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 0,
                    lieIndex: 9
                }, {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 0,
                    lieIndex: 10
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 0,
                    lieIndex: 11
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 0,
                    lieIndex: 12
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 0,
                    lieIndex: 13
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 0,
                    lieIndex: 14
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 0,
                    lieIndex: 15
                }, {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 0,
                    lieIndex: 16
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 0,
                    lieIndex: 17
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 0,
                    lieIndex: 18
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 0,
                    lieIndex: 19
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 0,
                    lieIndex: 20
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 0,
                    lieIndex: 21
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 0,
                    lieIndex: 22
                },
                {
                    goodStatus: 1,
                    fcStatus: 0,
                    paiIndex: 0,
                    lieIndex: 23
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 0,
                    lieIndex: 24
                }, {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 0,
                    lieIndex: 25
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 0,
                    lieIndex: 26
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 0,
                    lieIndex: 27
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 0,
                    lieIndex: 28
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 0,
                    lieIndex: 29
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 0,
                    lieIndex: 30
                }, {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 0,
                    lieIndex: 31
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 0,
                    lieIndex: 32
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 0,
                    lieIndex: 33
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 0,
                    lieIndex: 34
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 0,
                    lieIndex: 35
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 0,
                    lieIndex: 36
                }, {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 0,
                    lieIndex: 37
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 0,
                    lieIndex: 38
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 0,
                    lieIndex: 39
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 0,
                    lieIndex: 40
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 0,
                    lieIndex: 41
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 0,
                    lieIndex: 42
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 0,
                    lieIndex: 43
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 0,
                    lieIndex: 44
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 0,
                    lieIndex: 45
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 0,
                    lieIndex: 46
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 0,
                    lieIndex: 47
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 0,
                    lieIndex: 48
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 0,
                    lieIndex: 49
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 0,
                    lieIndex: 50
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 0,
                    lieIndex: 51
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 0,
                    lieIndex: 52
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 0,
                    lieIndex: 53
                },

            ]

        },
        {
            pIndex: 1,
            data: [{
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 1,
                    lieIndex: 0
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 1,
                    lieIndex: 1
                },
                {
                    goodStatus: 1,
                    fcStatus: 0,
                    paiIndex: 1,
                    lieIndex: 2
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 1,
                    lieIndex: 3
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 1,
                    lieIndex: 4
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 1,
                    lieIndex: 5
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 1,
                    lieIndex: 6
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 1,
                    lieIndex: 7
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 1,
                    lieIndex: 8
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 1,
                    lieIndex: 9
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 1,
                    lieIndex: 10
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 1,
                    lieIndex: 11
                },
                {
                    goodStatus: 1,
                    fcStatus: 0,
                    paiIndex: 1,
                    lieIndex: 12
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 1,
                    lieIndex: 13
                }, {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 1,
                    lieIndex: 14
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 1,
                    lieIndex: 15
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 1,
                    lieIndex: 16
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 1,
                    lieIndex: 17
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 1,
                    lieIndex: 18
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 1,
                    lieIndex: 19
                }, {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 1,
                    lieIndex: 20
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 1,
                    lieIndex: 21
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 1,
                    lieIndex: 22
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 1,
                    lieIndex: 23
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 1,
                    lieIndex: 24
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 1,
                    lieIndex: 25
                }, {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 1,
                    lieIndex: 26
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 1,
                    lieIndex: 27
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 1,
                    lieIndex: 28
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 1,
                    lieIndex: 29
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 1,
                    lieIndex: 30
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 1,
                    lieIndex: 31
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 1,
                    lieIndex: 32
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 1,
                    lieIndex: 33
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 1,
                    lieIndex: 34
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 1,
                    lieIndex: 35
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 1,
                    lieIndex: 36
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 1,
                    lieIndex: 37
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 1,
                    lieIndex: 38
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 1,
                    lieIndex: 39
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 1,
                    lieIndex: 40
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 1,
                    lieIndex: 41
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 1,
                    lieIndex: 42
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 1,
                    lieIndex: 43
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 1,
                    lieIndex: 44
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 1,
                    lieIndex: 45
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 1,
                    lieIndex: 46
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 1,
                    lieIndex: 47
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 1,
                    lieIndex: 48
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 1,
                    lieIndex: 49
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 1,
                    lieIndex: 50
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 1,
                    lieIndex: 51
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 1,
                    lieIndex: 52
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 1,
                    lieIndex: 53
                },
            ]

        }, {
            pIndex: 2,
            data: [{
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 2,
                    lieIndex: 0
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 2,
                    lieIndex: 1
                },
                {
                    goodStatus: 1,
                    fcStatus: 0,
                    paiIndex: 2,
                    lieIndex: 2
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 2,
                    lieIndex: 3
                }, {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 2,
                    lieIndex: 4
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 2,
                    lieIndex: 5
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 2,
                    lieIndex: 6
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 2,
                    lieIndex: 7
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 2,
                    lieIndex: 8
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 2,
                    lieIndex: 9
                }, {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 2,
                    lieIndex: 10
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 2,
                    lieIndex: 11
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 2,
                    lieIndex: 12
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 2,
                    lieIndex: 13
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 2,
                    lieIndex: 14
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 2,
                    lieIndex: 15
                }, {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 2,
                    lieIndex: 16
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 2,
                    lieIndex: 17
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 2,
                    lieIndex: 18
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 2,
                    lieIndex: 19
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 2,
                    lieIndex: 20
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 2,
                    lieIndex: 21
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 2,
                    lieIndex: 22
                },
                {
                    goodStatus: 1,
                    fcStatus: 0,
                    paiIndex: 2,
                    lieIndex: 23
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 2,
                    lieIndex: 24
                }, {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 2,
                    lieIndex: 25
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 2,
                    lieIndex: 26
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 2,
                    lieIndex: 27
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 2,
                    lieIndex: 28
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 2,
                    lieIndex: 29
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 2,
                    lieIndex: 30
                }, {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 2,
                    lieIndex: 31
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 2,
                    lieIndex: 32
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 2,
                    lieIndex: 33
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 2,
                    lieIndex: 34
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 2,
                    lieIndex: 35
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 2,
                    lieIndex: 36
                }, {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 2,
                    lieIndex: 37
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 2,
                    lieIndex: 38
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 2,
                    lieIndex: 39
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 2,
                    lieIndex: 40
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 2,
                    lieIndex: 41
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 2,
                    lieIndex: 42
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 2,
                    lieIndex: 43
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 2,
                    lieIndex: 44
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 2,
                    lieIndex: 45
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 2,
                    lieIndex: 46
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 2,
                    lieIndex: 47
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 2,
                    lieIndex: 48
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 2,
                    lieIndex: 49
                },
                {
                    goodStatus: 0,
                    fcStatus: 0,
                    paiIndex: 2,
                    lieIndex: 50
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 2,
                    lieIndex: 51
                },
                {
                    goodStatus: 1,
                    fcStatus: 1,
                    paiIndex: 2,
                    lieIndex: 52
                },
                {
                    goodStatus: 1,
                    fcStatus: 2,
                    paiIndex: 2,
                    lieIndex: 53
                },

            ]

        },

    ];
    //拖放选择
    $("#checkbox-id").click(function() {
        if ($(this).is(':checked')) {
            $(".easyui-slider").slider({
                disabled: false
            });
            $('.panel-body #load,.slider-rulelabel span').css({ 'color': '#000' });
            $('.slider-inner').css({
                'border-color': '#95B8E7',
                'background': '#337AB7'
            });
            $('.slider-rule span').css('border-color', '#95B8E7');

        } else {
            $(".easyui-slider").slider({
                disabled: true
            });
            $('.panel-body #load,.slider-rulelabel span').css(
                'color', '#a9b0c2'
            );
            $('.slider-inner').css({
                'border-color': '#a9b0c2',
                'background': '#a9b0c2'
            });
            $('.slider-rule span').css('border-color', '##a9b0c2');

        }

    });

    // /*    点击货位显示具体信息 */
    // var img;
    // var imgLength;
    // var temp;
    // var isClose;
    // //点击每个货位
    // $('.son').off("click").on("click", function() {
    //     //所有货位里的图片
    //     img = $(this).find('img')
    //         //图片地址是否为空
    //     imgLength = $(this).find('img').attr('src').length;
    //     //货位下边的所有兄弟元素
    //     temp = $('#place').parent().nextAll();
    //     //入库操作选择是否为空
    //     $('#isClose').change(function() {
    //             isClose = $('#isClose option:selected').val()
    //         })
    //         //如果货位是空，显示快速信息和手工入库
    //     if (imgLength == 0) {
    //         $('.formThree').css('display', 'block');
    //         $('.formTwo').css('display', 'none');
    //         $('.formOne').css('display', 'block');
    //         $('.formFour').css('display', 'none');
    //         $('#store').attr('placeholder', '仓库A');
    //         $('#stock').attr('placeholder', '库区a');
    //         $('#ceng').attr('placeholder', '13');
    //         $('#place').attr('placeholder', '23-051-001');
    //         temp.hide();
    //         var inboundBtn = $('.formOne input[type=button]');
    //         //点击入库，是否封存，选择是则图片变红，选择否则默认图片
    //         inboundBtn.click(function() {
    //             if (isClose == '是') {
    //                 $('#isClose').css('border-color', '')
    //                 img.attr('src', './images/goods 02.png');
    //                 $('.formThree').css('display', 'none');
    //                 $('.formOne').css('display', 'none');

    //             } else if (isClose == '否') {
    //                 $('#isClose').css('border-color', '')
    //                 img.attr('src', './images/goods.png');
    //                 $('.formThree').css('display', 'none');
    //                 $('.formOne').css('display', 'none');

    //             } else {
    //                 $('#isClose').css('border-color', 'red')
    //                     // alert('请选择封存状态')
    //             }
    //         })

    //     } else { //货位不为空，显示快速信息，封存操作和手工出库
    //         $('.formOne').css('display', 'none');
    //         $('.formThree').css('display', 'block');
    //         $('.formTwo').css('display', 'block');
    //         $('.formFour').css('display', 'block');
    //         $('#store').attr('placeholder', '仓库A');
    //         $('#stock').attr('placeholder', '库区a');
    //         $('#ceng').attr('placeholder', '13');
    //         $('#place').attr('placeholder', '23-051-001');
    //         temp.show()
    //         $('#pruduct').attr('placeholder', '保健酒');
    //         $('#num').attr('placeholder', '12');
    //         //如果该货位已经封存，点击解封，图片变绿同时手工出库高亮可操作
    //         if (img.attr('src') == './images/goods 02.png') {
    //             $('.formTwo').find('legend').css('color', '#ccc');
    //             $('.formTwo').find('label').css('color', '#ccc');
    //             $('.formTwo').find('input').attr('disabled', true);
    //             $('#feng').attr('disabled', true);
    //             //点击解封，图片变绿同时手工出库高亮可操作
    //             $('#jie').click(function() {
    //                     $('.formTwo').find('legend').css('color', '#000');
    //                     $('.formTwo').find('label').css('color', '#000');
    //                     $('.formTwo').find('input').removeAttr("disabled");
    //                     $('#feng').removeAttr("disabled");
    //                     img.attr('src', './images/goods 01.png')
    //                 })
    //                 //点击封存，图片变红，手工出库不可操作
    //             $('#feng').click(function() {
    //                 $('.formTwo').find('legend').css('color', '#ccc');
    //                 $('.formTwo').find('label').css('color', '#ccc');
    //                 $('.formTwo').find('input').attr('disabled', true);
    //                 $('#feng').attr('disabled', true);
    //                 img.attr('src', './images/goods 02.png')
    //             })
    //             var inboundBtn1 = $('.formTwo input[type=button]');
    //             inboundBtn1.click(function() {
    //                 img.attr('src', '');
    //                 $('.formThree').css('display', 'none');
    //                 $('.formTwo').css('display', 'none');
    //                 $('.formFour').css('display', 'none');
    //             })
    //         } else if (img.attr('src') == './images/goods 01.png' || img.attr('src') == './images/goods.png') {
    //             $('#jie').attr('disabled', true);
    //             $('#feng').click(function() {
    //                 $('.formTwo').find('legend').css('color', '#ccc');
    //                 $('.formTwo').find('label').css('color', '#ccc');
    //                 $('.formTwo').find('input').attr('disabled', true);
    //                 $('#feng').attr('disabled', true);
    //                 img.attr('src', './images/goods 02.png');
    //                 $('#jie').removeAttr("disabled");
    //             });
    //             $('#jie').click(function() {
    //                 $('.formTwo').find('legend').css('color', '#000');
    //                 $('.formTwo').find('label').css('color', '#000');
    //                 $('.formTwo').find('input').removeAttr("disabled");
    //                 $('#feng').removeAttr("disabled");
    //                 img.attr('src', './images/goods 01.png')
    //             })
    //             var inboundBtn1 = $('.formTwo input[type=button]');
    //             inboundBtn1.click(function() {
    //                 img.attr('src', '')
    //             })
    //         }
    //     }

    // })
    $('#isClose').change(function() {
        var isClose = $(this).val();
        if (isClose != -1) {
            $('#isClose').css('border-color', '');
        }
    })

    function showGoodViews(goodData) {
        $(".father").empty();
        var goodHtml = "";
        for (var i = 0; i < goodData.length; i++) {
            var dataTemp = goodData[i].data;
            var gooRowHtml = '<div class="goodRow">';
            for (var j = 0; j < dataTemp.length; j++) {
                if (dataTemp[j].goodStatus == 0) { //货位状态0没有；1有
                    gooRowHtml += '<div class="son fr">' +
                        '<div class="good"></div>' +
                        '</div>';

                } else if (dataTemp[j].goodStatus == 1) {
                    //封存状态：0未封存；1已封存；2：已解封
                    if (dataTemp[j].fcStatus == 0) {
                        gooRowHtml += '<div class="son fr">' +
                            '<div class="good"><img src="./images/goods.png"></div>' +
                            '</div>';
                    } else if (dataTemp[j].fcStatus == 1) {
                        gooRowHtml += '<div class="son fr">' +
                            '<div class="good"><img src="./images/goods02.png"></div>' +
                            '</div>';
                    } else if (dataTemp[j].fcStatus == 2) {
                        gooRowHtml += '<div class="son fr">' +
                            '<div class="good"><img src="./images/goods01.png"></div>' +
                            '</div>';
                    }
                }


            }
            gooRowHtml += "</div>";
            goodHtml += gooRowHtml;
        }
        $(".father").append(goodHtml);

        // var layerTips = 0;
        // $(".son").hover(
        //     function() {
        //         var $this = $(this);
        //         $('.son').removeClass("sonActive");
        //         $this.addClass("sonActive");
        //         //排索引
        //         var pIndex = $this.parent().index();
        //         //列索引
        //         var lIndex = $this.index();
        //         layerTips = layer.tips('第' + pIndex + 1 + '排，' +
        //             '第' + lIndex + 1 + '列', {
        //                 tips: [3, '#3595CC'],
        //                 time: 3000
        //             });
        //     },
        //     function() {
        //         layer.close(layerTips);
        //     }
        // );
        $('.son').off("click").on("click", function() {
            var $this = $(this);
            $('.son').removeClass("sonActive");
            $this.addClass("sonActive");
            //排索引
            var pIndex = $this.parent().index();
            //列索引
            var lIndex = $this.index();
            var goodTemp = goodData[pIndex].data[lIndex];
            //var goodTempP = goodTempP.data[lIndex];
            //货位下边的所有兄弟元素
            var temp = $('#place').parent().nextAll();
            if (goodTemp.goodStatus == 0) { //货位状态0没有；1有
                $('.formThree').show();
                $('.formTwo').hide()
                $('.formOne').show();
                $('.formFour').hide();
                $('#store').attr('placeholder', '仓库A');
                $('#stock').attr('placeholder', '库区a');
                $('#ceng').attr('placeholder', '13');
                $('#place').attr('placeholder', '23-051-001');
                temp.hide();
                var $inboundBtn = $('.formOne input[type=button]');
                //点击入库，是否封存，选择是则图片变红，选择否则默认图片
                $inboundBtn.off("click").on("click", function() {
                    //入库操作选择是否为空
                    var isClose = $("#isClose").val();
                    if (isClose != -1) {
                        var layerIndex = layer.open({
                            title: "提示信息",
                            content: "你确定入库吗？",
                            btn: ['确定', '取消'],
                            yes: function(index, layero) {
                                layer.close(layerIndex);
                                if (isClose == '1') {
                                    $this.find(".good").append('<img src="./images/goods02.png">');
                                    $('.formThree').hide();
                                    $('.formOne').hide();
                                    $("#isClose").val(-1);
                                    goodData[pIndex].data[lIndex].goodStatus = 1;
                                } else if (isClose == '0') {
                                    $this.find(".good").append('<img src="./images/goods.png">');
                                    $('.formThree').hide();
                                    $('.formOne').hide();
                                    $("#isClose").val(-1);
                                    goodData[pIndex].data[lIndex].goodStatus = 1;
                                }
                            }
                        });
                    } else {
                        $('#isClose').css('border-color', 'red')
                            // alert('请选择封存状态')
                    }

                })

            } else if (goodTemp.goodStatus == 1) {
                $('.formOne').hide();
                $('.formThree').show();
                $('.formTwo').show();
                $('.formFour').show();
                $('#store').attr('placeholder', '仓库A');
                $('#stock').attr('placeholder', '库区a');
                $('#ceng').attr('placeholder', '13');
                $('#place').attr('placeholder', '23-051-001');
                temp.show()
                $('#pruduct').attr('placeholder', '保健酒');
                $('#num').attr('placeholder', '12');
                //封存状态：0未封存；1已封存；2：已解封
                if (goodTemp.fcStatus == 0) {
                    $('#jie').attr('disabled', true);
                    $('#feng').removeAttr("disabled");

                } else if (goodTemp.fcStatus == 1) {
                    //如果该货位已经封存，点击解封，图片变绿同时手工出库高亮可操作
                    $('.formTwo').find('legend').css('color', '#ccc');
                    $('.formTwo').find('label').css('color', '#ccc');
                    $('.formTwo').find('input').attr('disabled', true);
                    $('#feng').attr('disabled', true);
                    $('#jie').removeAttr("disabled");

                } else if (goodTemp.fcStatus == 2) {
                    $('#jie').attr('disabled', true);
                    $('#feng').removeAttr("disabled");
                }
            }
        })
    }
    showGoodViews(goodData);
    $('#feng').click(function() {
        var $good = $(".sonActive");
        var pIndex = $good.parent().index(); //行索引
        var lIndex = $good.index(); //列索引
        var layerIndex = layer.open({
            title: "提示信息",
            content: "你确定封存吗？",
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                layer.close(layerIndex);
                $('.formTwo').find('legend').css('color', '#ccc');
                $('.formTwo').find('label').css('color', '#ccc');
                $('.formTwo').find('input').attr('disabled', true);
                $('#feng').attr('disabled', true);
                var img = $good.find("img");
                img.attr('src', './images/goods02.png');
                $('#jie').removeAttr("disabled");
                goodData[pIndex].data[lIndex].fcStatus = 1;
            }
        });

    });
    $('#jie').click(function() {
        var $good = $(".sonActive");
        var pIndex = $good.parent().index(); //行索引
        var lIndex = $good.index(); //列索引
        var layerIndex = layer.open({
            title: "提示信息",
            content: "你确定解封吗？",
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                layer.close(layerIndex);
                $('.formTwo').find('legend').css('color', '#000');
                $('.formTwo').find('label').css('color', '#000');
                $('.formTwo').find('input').removeAttr("disabled");
                $('#feng').removeAttr("disabled");
                $('#jie').attr('disabled', true);
                var img = $good.find("img");
                img.attr('src', './images/goods01.png');
                goodData[pIndex].data[lIndex].fcStatus = 2;
            }
        });

    })
    var inboundBtn1 = $('.formTwo input[type=button]');
    inboundBtn1.click(function() {
        var $good = $(".sonActive");
        var pIndex = $good.parent().index(); //行索引
        var lIndex = $good.index(); //列索引
        var layerIndex = layer.open({
            title: "提示信息",
            content: "你确定出库吗？",
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                layer.close(layerIndex);
                var img = $good.find("img");
                img.remove();
                $('.formThree').css('display', 'none');
                $('.formTwo').css('display', 'none');
                $('.formFour').css('display', 'none');
                goodData[pIndex].data[lIndex].goodStatus = 0;
                goodData[pIndex].data[lIndex].fcStatus = 0;

            }
        });

    })
})