(function () {
    let pageSize = 6, pageIndex = 0, Max = 0;


    $(document).ready(function () {
        getList($(".more"));
        $(".more").on("click", function () {
            getList($(this));
        })
    });


    function getList($this) {
        var html = "";
        $.ajax({
            url: "http://www.laiyangde.top/Home/Index/fmList",
            type: "get",
            dataType: "jsonp",
            data: {
                "pagesize": pageSize,
                "pageindex": pageIndex
            },
            beforeSend: function () {
                $this.html("加载中……");
            },
            success: function (data) {
                console.log(data);
                $this.html("加载更多");
                Max = Math.ceil(data.Data.recordCount / pageSize);
                if (data.ResultCode === "0") {
                    $.each(data.Data.FmList, function () {
                        html += '<li class="div-shadow clearFix">' +
                            '<a href="' + this.TargetUrl + '" class="list-left" target="_blank" style="background:url(' + this.MinPic + ');"></a>' +
                            '<a href="" class="list-right">' +
                            '<p class="list-title">' + this.InfoTitle + '</p>' +
                            '<p class="list-content">' + this.InfoData + '</p>' +
                            '</a></li>'
                    });
                    $(".list").append(html);
                    pageIndex++;
                }

            },
            complete: function () {
                if (pageIndex >= Max) {
                    $this.css({"cursor": "default"}).html("已经没有了");
                    $this.off("click");
                }
            }
        })
    }

})();