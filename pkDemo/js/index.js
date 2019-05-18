(function () {
    $(document).ready(function () {
        getData();
        $(".agree").on("click", function () {
            sendData(0);
        });
        $(".oppose").on("click", function () {
            sendData(1);
        })
    });


    function getData() {
        $.ajax({
            url: "http://www.laiyangde.top/Home/Index/getVote",
            type: "get",
            dataType: "json",
            data: {},
            success: function (data) {
                let dataList = data.data,
                    w = (Number(dataList.agree) / (Number(dataList.agree) + Number(dataList.oppose)) * 100).toFixed();
                if (data.rescode === 1) {
                    console.log(w + "  " + (100 - w));
                    animateNubmer(parseInt($("#left-text").html()), w, 600, $("#left-text"));
                    animateNubmer(parseInt($("#right-text").html()), 100 - w, 600, $("#right-text"));
                    $(".position").css({
                            left: w + "%"
                        }
                    );
                    $(".left").css({
                        width: w + "%"
                    });
                    $(".right").css({
                        width: (100 - w) + "%"
                    })
                }
            }
        })

    }

    function sendData($camp) {
        $.ajax({
            url: "http://www.laiyangde.top/Home/Index/vote",
            type: "get",
            dataType: "json",
            data: {
                "camp": $camp
            },
            success: function () {
                getData();
            }

        })
    }

    /**
     * {rescode: 1, message: "获取数据成功!", data: {…}}
     data
     :
     agree
     :
     "896"
     oppose
     :
     "190"
     __proto__
     :
     Object
     message
     :
     "获取数据成功!"
     rescode
     :
     1
     __proto__
     :
     Object
     */

    function animateNubmer(init, end, time, $obj) {
        time = time / Math.abs(end - init);
        let temp = init, flag = setInterval(function () {
            $obj.html(temp + "%").fadeIn();
            if (init > end) {
                if (temp <= end)
                    clearInterval(flag);
                temp--;
            } else {
                if (temp >= end)
                    clearInterval(flag);
                temp++;
            }
        }, time);
    }

})();
