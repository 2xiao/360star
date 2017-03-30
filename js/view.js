//************应用界面设计************

var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext('2d');
var r = ctx.canvas.width / (2 + 4 * 3);// 圆的半径
var arr = [];
var restPoint = [];
var lastPoint = [];
var touchFlag = false;

// 初始化界面
// 创建解锁点的坐标和半径
function initCanvas() {
    arr = [];
    restPoint = [];
    lastPoint = [];
    var count = 0;
    for (var i = 0 ; i < 3 ; i++) {
        for (var j = 0 ; j < 3 ; j++) {
            count++;
            var obj = {
                x: j * 4 * r + 3 * r,
                y: i * 4 * r + 3 * r,
                index: count
            };
            arr.push(obj);
            restPoint.push(obj);
        }
    }
    ctx.clearRect(0, 0, ctx.canvas.width, this.ctx.canvas.height);
    for (var i = 0 ; i < arr.length ; i++) {
        drawCle(arr[i].x, arr[i].y);
    }

}
// 画空心圆
function drawCle(x, y) { 
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#C2C2C2';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}
// 画实心圆
function drawPoint(lastPoint) { 
    for (var i = 0 ; i < lastPoint.length ; i++) {
        ctx.fillStyle = '#FFA726';
        ctx.beginPath();
        ctx.arc(lastPoint[i].x, lastPoint[i].y, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
}

// 初始化状态线条
function drawStatusPoint(type) { 
    for (var i = 0 ; i < lastPoint.length ; i++) {
        ctx.strokeStyle = type;
        ctx.beginPath();
        ctx.arc(lastPoint[i].x, lastPoint[i].y, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.stroke();
    }
}

// 画解锁轨迹线条
function drawLine(po, lastPoint) {
	ctx.strokeStyle = '#DC271F';
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(lastPoint[0].x, lastPoint[0].y);
    for (var i = 1 ; i < lastPoint.length ; i++) {
        ctx.lineTo(lastPoint[i].x, lastPoint[i].y);
    }
    if(po.x==lastPoint[lastPoint.length-1].x && po.y==lastPoint[lastPoint.length-1].y){
        ctx.lineTo(po.x, po.y);
    }
    ctx.stroke();
    ctx.closePath();

}

// 获取touch点相对于canvas的坐标
function getPosition(e) {
    var rect = e.currentTarget.getBoundingClientRect();
    var po = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    return po;

}

// touchmove触发实时画轨迹
function update(po) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (var i = 0 ; i < arr.length ; i++) { // 每帧先把面板画出来
        drawCle(arr[i].x, arr[i].y);
    }
    drawPoint(lastPoint);// 每帧画圆心
    drawLine(po , lastPoint);// 每帧画轨迹

    for (var i = 0 ; i < restPoint.length ; i++) {
        var middleX=(po.x + lastPoint[lastPoint.length-1].x)/2;
        var middleY=(po.y + lastPoint[lastPoint.length-1].y)/2;
        if (Math.abs(middleX - restPoint[i].x) < r  && Math.abs(middleY - restPoint[i].y) < r) {
            drawPoint(restPoint[i].x, restPoint[i].y);
            lastPoint.push(restPoint[i]);
            restPoint.splice(i, 1);
        }
        if (Math.abs(po.x - restPoint[i].x) < r && Math.abs(po.y - restPoint[i].y) < r) {
            drawPoint(restPoint[i].x, restPoint[i].y);
            lastPoint.push(restPoint[i]);
            restPoint.splice(i, 1);
            break;
        }
    }

}

    