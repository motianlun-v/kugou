/**
 * Created by sky on 2017/2/6.
 */
var swiper = new Swiper('.wrappic', {
    pagination: '.cir',
    paginationClickable: true,
    spaceBetween: 10,
    centeredSlides: true,
    autoplay: 1500,
    autoplayDisableOnInteraction: false
});


var myScroll = new IScroll('.content');
var mySwiper = new Swiper('.tapswiper', {
    onSlideChangeEnd: function (swiper) {
        var index = swiper.activeIndex;
        $(".navs li").eq(index).addClass("bg").siblings().removeClass("bg");
    }
});
$('.navs li').on("click", function () {
    $(this).addClass("bg").siblings().removeClass("bg");
    mySwiper.slideTo($(this).index(), 1000, false);
});

window.onload = function () {
    var str = '';
    $.ajax({
        url: 'music_list.json',
        dataType: 'json',
        success: function (datas) {
            console.log(datas)
            $.each(datas.data, function (i, arr) {
                var str = '<li><p>' +
                    '<span>' + arr.singers + '</span>-' +
                    '<b>' + arr.song_name + '</b></p>' +
                    '<img src="images/download_icon_2.png"/>' +
                    '</li>';
                $(".tapswiper .content ul").append($(str));
                myScroll.refresh();
            });
        },
        error: function () {
            alert('error');
        }
    });
};


$("body").on("click", "a", function (e) {
    e.preventDefault()
})

$(document).on("touchmove", function (e) {
    e.preventDefault()
});


function loaded() {
    myScroll = new IScroll('#wrapper', {
        scrollbars: true,
        mouseWheel: true,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true
    });
}

document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, isPassive() ? {
    capture: false,
    passive: false
} : false);