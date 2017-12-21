/**
 * Created by Administrator on 2017/12/18 0018.
 */
window.onload = function () {
    /* 搜索的显示 */
    search();
    /* 轮播图 */
    banner();
    /* 倒计时 */
    downTime();
}
var search = function () {
    var searchBox = document.querySelector(".jd_search_box");
    var banner = document.querySelector(".jd_banner");
    var bannerH = banner.offsetHeight;
    /* 滚动事件 */
    window.onscroll = function (e) {
        var opacity = 0;
        var top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (top < bannerH) {
            opacity = top / bannerH * 0.85;
        } else {
            opacity = 0.85;
        }
        searchBox.style.background = "rgba(201,21,35," + opacity + ")";
    };
};
var banner = function () {
    var banner = document.querySelector(".jd_banner");
    var width = banner.offsetWidth;
    var imgBox = banner.querySelector("ul:first-child");
    var imgLis = imgBox.querySelectorAll("li").length - 1;
    var pointBox = banner.querySelector("ul:last-child");
    var lis = pointBox.querySelectorAll("li");

    var addTransition = function () {
        /* 过渡 */
        imgBox.style.transition = "all 0.3s";
        imgBox.style.webkitTransition = "all 0.3s";
    }
    var removeTransition = function () {
        /* 过渡 */
        imgBox.style.transition = "none";
        imgBox.style.webkitTransition = "none";
    }
    var setTransfrom = function (translateX) {

        imgBox.style.transform = "translateX(" + translateX + "px)";
        imgBox.style.webkitTransform = "translateX(" + translateX + "px)";
    }


    /* 自动轮播 */
    var index = 1;
    /*var timer = setInterval(function () {
        index++;
        addTransition();
        /!* 定位 *!/
        var translateX = -index * width;

        setTransfrom(translateX);
    }, 3000);*/
    setTimer();


    imgBox.addEventListener("transitionend", function () {
        if (index >= imgLis) {
            index = 1;
            removeTransition();
            setTransfrom(-index * width);
        } else if (index <= 0) {
            index = lis.length;
            removeTransition();
            var translateX = -index * width;
            setTransfrom(translateX);
        }
        setPoint();
    });
    /* 点 */
    var setPoint = function () {
        pointBox.querySelector("li.now").classList.remove("now");
        lis[index - 1].classList.add("now");
    }
    var startX = 0,
        distanceX = 0,
        startTime = 0;
    var isMove = false;
    imgBox.addEventListener("touchstart", function (e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
        startTime = Date.now();
    });
    imgBox.addEventListener("touchmove", function (e) {
        var moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        var translateX = -index * width + distanceX;
        removeTransition();
        setTransfrom(translateX);


        isMove = true;

    });
    imgBox.addEventListener("touchend", function (e) {
        if (isMove) {

            var totalTime = Date.now() - startTime;
            var spped = Math.abs(distanceX) / totalTime;
            if (spped > 0.2) {
                if (distanceX < 0) {
                    index++
                } else {
                    index--;
                }
                addTransition();
                setTransfrom(-index * width);
                setTimer();
                return false;
            }


            if (Math.abs(distanceX) < width / 3) {
                addTransition();
                setTransfrom(-index * width);
            } else {
                if (distanceX < 0) {
                    index++
                } else {
                    index--;
                }
                addTransition();
                setTransfrom(-index * width);
            }
        }
        clearInterval(timer);
       setTimer();
        startX = 0;
        distanceX = 0;
        isMove = false;
    });
    function setTimer() {
        timer = setInterval(function () {
            index++;
            addTransition();
            /* 定位 */
            var translateX = -index * width;

            setTransfrom(translateX);
        }, 1000);
    }

};
/* 倒计时 */
var downTime = function () {
    var time = 5 * 60 * 60;
    var spans = document.querySelectorAll(".sk_time span");
    var timer = setInterval(function () {
        time--;
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = Math.floor(time % 60);
        spans[0].innerHTML = Math.floor(h / 10);
        spans[1].innerHTML = h % 10;

        spans[3].innerHTML = Math.floor(m / 10);
        spans[4].innerHTML = m % 10;

        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = s % 10;
        if (time <= 0) {
            clearInterval(timer);
        }
    }, 3000);
};