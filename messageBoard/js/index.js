(function () {


    let personIndex = 0;

    $(document).ready(function () {
        let limitWidth = $(".limit").width(),
            limitHeight = $(".limit").height(),
            x, y, $wall = $("#wall"),
            flag = true;
        $(".paste").on("click", function () {
            if ($(".user-text").val().length >= 30) {
                randerPaper($wall);
            } else {
                alert("输入不少于30字，不多于80字的内容，请重新输入");
            }
        });
        $wall.on('click', '.paper .close', function () {
            $(this).parent().fadeOut(function () {
                $(this).remove();
            });
        }).on('mouseenter', '.paper', function () {
            $(this).css({
                zIndex: 1000
            });
        }).on('mouseleave', '.paper', function () {
            $(this).css({
                zIndex: 'auto'
            });
            $(this).fadeTo("fast", 1);
            flag = false;
        }).on('mousedown', '.paper', function (e) {
            flag = true;
            x = e.pageX - parseInt($(this).css("left"));
            y = e.pageY - parseInt($(this).css("top"));
            $(this).fadeTo("fast", 0.8);
        }).on('mousemove', '.paper', function (e) {
            if (flag) {
                let calX = e.pageX - x,
                    calY = e.pageY - y,
                    objWidth = $(this).width(),
                    objHeight = $(this).height();
                if (calX < 0) {
                    calX = 0;
                }
                if (calY < 0) {
                    calY = 0;
                }
                if (calX > limitWidth - objWidth - 20) {
                    calX = limitWidth - objWidth - 20;
                }
                if (calY > limitHeight - objHeight) {
                    calY = limitHeight - objHeight;
                }

                $(this).css({
                    left: calX,
                    top: calY
                });
            }
        }).on('mouseup', '.paper', function () {
            flag = false;
            $(this).fadeTo("fast", 1);
        });
    });

    function randerPaper($wall) {
        $wall.append("<li class='paper'>" + "<div class='paper-content'>" + "<p class='message-content'></p>" + "<p class='message-text'></p>" + "<p class='message-date'></p>" + "</div><i class='close'></i></li>");
        let $paper = $wall.find(".paper:last"),
            limitWidth = $(".limit").width(),
            limitHeight = $(".limit").height(),
            paperWidth = $paper.width(),
            paperHeight = $paper.height(),
            deg = getRandom(20, -20),
            x = getRandom(parseInt(limitWidth - paperWidth), 20),
            y = getRandom(parseInt(limitHeight - paperHeight), 20),
            imgIndex = getRandom(3, 1);

        $paper.find(".message-content").text($(".user-text").val());

        $paper.find(".message-text").text("留言人" + (++personIndex));

        $paper.find(".message-date").text(getNow());

        $(".user-text").val("");
        $paper.css({
            '-webkit-transform': 'rotate(' + deg + 'deg) translateZ(0)',
            '-moz-transform': 'rotate(' + deg + 'deg) translateZ(0)',
            '-ms-transform': 'rotate(' + deg + 'deg)',
            /*IE9不支持GPU渲染*/
            '-o-transform': 'rotate(' + deg + 'deg) translateZ(0)',
            'transform': 'rotate(' + deg + 'deg) translateZ(0)',
            background: "url(images/comment-board-bg" + imgIndex + ".png) no-repeat",
            top: "50px",
            left: '700px'
        }).fadeIn().animate({
            left: x,
            top: y
        });
    }


    function getRandom(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


    function getNow(now, value) {
        now = now || Date.now();
        value = value || "yyyy/mm/dd hh:MM";
        let date = new Date(now),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            days = date.getDate(),
            hours = date.getHours(),
            mins = date.getMinutes();

        function transFormat(val) {
            return ('0' + val).slice(-2);
        }

        return value.replace(/(yy)+/i, year).replace(/mm/, transFormat(month)).replace(/dd/i, transFormat(days)).replace(/hh/i, transFormat(hours)).replace(/MM/, transFormat(mins));
    }

})();