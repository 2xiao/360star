//************控制台设计************

var EventUtil = {
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    }
};

window.onload = function() {
    initCanvas();
    resetPassword();
    EventUtil.addHandler(document.querySelector("#canvas"),"touchstart", function (e) {
        e.preventDefault();// 某些android 的 touchmove不宜触发 所以增加此行代码
        var po = getPosition(e);
        for (var i = 0 ; i < arr.length ; i++) {
            if (Math.abs(po.x - arr[i].x) < r && Math.abs(po.y - arr[i].y) < r) {
                touchFlag = true;
                drawPoint(arr[i].x,arr[i].y);
                lastPoint.push(arr[i]);
                restPoint.splice(i,1);
                break;
            }
        }
    });

    EventUtil.addHandler(document.querySelector("#canvas"),"touchmove", function (e) {
        if (touchFlag) {
            update(getPosition(e));
        }
    });

    EventUtil.addHandler(document.querySelector("#canvas"),"touchend", function (e) {
     if (touchFlag) {
        touchFlag = false;
        touchEnd(lastPoint);
        setTimeout(function(){
            initCanvas();
        }, 300);
     }
    });

    EventUtil.addHandler(document.querySelector(".setPassword"),'click', function(){        
        resetPassword();
        setPassword(lastPoint);
    });

    EventUtil.addHandler(document.querySelector(".checkPassword"),'click', function(){
        checkPassword(lastPoint);
    });
}

