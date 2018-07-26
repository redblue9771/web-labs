(function () {
    let flag = true;

    $(document).ready(function () {
        let startIndex = 0,
            stopIndex = 0;

        $("#start").on("click", function () {
            if (flag)
                $.ajax({
                    url: "http://www.laiyangde.top/Home/Index/drawLottery",
                    type: "get",
                    dataType: "json",
                    data: "",
                    success: function (data) {
                        console.log(data);
                        if (data.rescode === 1) {
                            flag = false;
                            stopIndex = data.data;
                            flag = targetIndex(startIndex, stopIndex + 47);
                            startIndex = stopIndex;
                        } else {
                            flag = true;
                        }

                    },
                    fail: function () {
                        alert("抽奖失败，请重新抽奖！");
                        flag = true;
                    }
                });

        });
    });


    function targetIndex(start, stop) {
        let time = 70;
        if (stop / start > 6) time = 50;
        if (stop / start <= 1.2) time = 250;
        if (start <= stop) {
            setTimeout(function () {
                $(".active").removeClass();
                $("#clock-" + start % 8).toggleClass("active");
                targetIndex(++start, stop);
            }, time);
        } else {
            $("#start a").html("点击继续抽奖");
            flag = true;
        }
    }

// {rescode: 1, message: "更新成功!", data: 7}
// data
//     :
//     7
// message
//     :
//     "更新成功!"
// rescode
//     :
//     1
})();