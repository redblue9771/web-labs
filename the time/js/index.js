var positions = [];

$(document).ready(function () {
    $(".format1").each(function (index, moudle) {
        positions.push($(moudle).offset().top);
        $(".bar ul").append("<li>" + index + "</li>");
    });
    positions.push(0);
    $(".bar ul").append("<li>" + "TOP" + "</li>");
    barToggle();
    $(window).scroll(function () {
        barToggle();
    });
    $(".bar ul li").on("click",function (event) {
       event.preventDefault();
       // var goTo = $(this).attr("href");
       // var goTop = $(goTo).offset().top;
        $("html,body").animate({scrollTop: positions[$(this).index()]}, 500);
    });
});

function barToggle() {
    var scrollY = $(window).scrollTop();
    if (scrollY > 280) {
        $(".bar").fadeIn();
    } else {
        $(".bar").fadeOut();
    }
    for (var i = 0; i < positions.length; ++i) {
        if (scrollY <= positions[i]) {
            $(".bar ul").find("li").eq(i).addClass("barHint").siblings().removeClass("barHint");
            break;
        }
    }
}