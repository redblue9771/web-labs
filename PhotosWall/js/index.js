var min = [];

$(document).ready(function () {
    var temp = 1, img = null;
    // var photos = "";
    // for (var i = 0; i < 10; ++i) {
    //     $(".wall").append("<img class='photo' src='image/" + i + ".jpg'/>");
    //     img = $(".photo");
    //     img.on("load", function () {
    //         $(this).css("width", $(this).width() * 0.5 + "px");
    //     })
    // }
    for (var i = 0; i < 10; ++i) {
        $(".wall").append("<img class='photo' src='image/" + i + ".jpg'/>");
        var temp = $(".photo:last");
        if (temp.innerHeight() > temp.innerWidth()) {
            cal = $(window).height() > $(window).width() ? "45%" : "20%";
            temp.css({
                "max-height": $(window).height() / 2 + "px",
                "height": "40%",
                "width": "auto"
            });
        } else {
            cal = $(window).height() > $(window).width() ? "20%" : "45%";
            temp.css({
                "max-width": $(window).width() / 2 + "px",
                "height": "30%",
                "width": "auto"
            });
        }

    }
    // $(".wall").append(photos)
    setTimeout(function () {
        $(".photo").each(function (index) {
            min[index] = Math.sqrt($(this).outerWidth() * $(this).outerWidth() + $(this).outerHeight() * $(this).outerHeight());
            positionRadom(index);
        })
    }, 1000);

    $(".wall").on("click", ".photo", function () {
        img = $(this);
        $("#over").fadeToggle();
        if (temp) {
            img.css({
                "top": "50%",
                "left": "50%",
                "transform": "translate3D(-50%, -50%, 0) scale(2)",
                "z-index": "2",
                "box-shadow": "0 0 0"
            });
            temp = 0;
        }
        else {
            img.remove().appendTo(".wall");
            positionRadom(img.index() - 1);
            temp = 1;
        }
    });

    $("#over").on("click", function () {
        img.remove().appendTo(".wall");
        positionRadom(img.index() - 1);
        $(this).fadeToggle();
        temp = 1;
    });
});

function positionRadom(i) {
    var x = getRandom($(window).width() - min[i], 0) + "px",
        y = getRandom($(window).height() - min[i], 0) + "px";
    $(".photo").eq(i).css({
        "left": x,
        "top": y,
        "transform": "rotate(" + getRandom(-90, 90) + "deg)",
        "z-index": "0",
        "box-shadow": "rgba(0, 0, 0, 0.3) 0 0 30px"
    });
}

function getRandom(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}