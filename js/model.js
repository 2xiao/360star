//************数据库设计************

var pwObj = window.localStorage.getItem('localStoragePW') 
    ? {
        step: 2,
        secondPW: JSON.parse(window.localStorage.getItem('localStoragePW'))
    } 
    : {};
// touchEnd触发，根据radio按钮的状态判断触发哪个函数
function touchEnd(e){
    if(document.getElementById('setPassword').checked){
        setPassword(e);
    } else{
        checkPassword(e);
    } 
}
//*********设置密码*********
function setPassword(key) {
    if(pwObj.step == 1) {
    if (checkPass(pwObj.firstPW, key)) {
        pwObj.step = 2;
        pwObj.SecondPW = key;
        document.getElementById('title').innerHTML = '密码保存成功';
        drawStatusPoint('#FFA726');
        document.getElementById('checkPassword').checked = "checked";
        window.localStorage.setItem('localStoragePW', JSON.stringify(pwObj.SecondPW));
    } else {
        document.getElementById('title').innerHTML = '两次输入的不一致';
        drawStatusPoint('red');
        delete pwObj.step;
    }       
    }else if(pwObj.step == 2){
            document.getElementById('checkPassword').checked = "checked";
    }else {
        if(key.length>4){
            pwObj.step = 1;
            pwObj.firstPW = key;
            document.getElementById('title').innerHTML = '请再次输入手势密码';
        } else if(key.length == 0){
            document.getElementById('title').innerHTML = '请输入手势密码';
        } else{
            document.getElementById('title').innerHTML = '密码太短，至少需要5个点';
            drawStatusPoint('red');
            delete pwObj.step;
        }
    }   
}

//*********验证密码*********
function checkPassword(key) {
    if (pwObj.step == 2) {
        if (checkPass(pwObj.SecondPW, key)) {
            document.getElementById('title').innerHTML = '密码正确！';
            drawStatusPoint('#FFA726');
        } else {
            drawStatusPoint('red');
            document.getElementById('title').innerHTML = '输入的密码不正确';
        }
    } else {
        delete pwObj.step;
        document.getElementById('title').innerHTML = '您还没有设置密码';
        document.getElementById('setPassword').checked = "checked";

    }
}
// 检测两个密码是否相同
function checkPass(psw1, psw2) {
    var p1 = '',
    p2 = '';
    for (var i = 0 ; i < psw1.length ; i++) {
        p1 += psw1[i].index + psw1[i].index;
    }
    for (var i = 0 ; i < psw2.length ; i++) {
        p2 += psw2[i].index + psw2[i].index;
    }
    return p1 === p2;
}
// 清空localStorage，重置界面
function resetPassword(){
    window.localStorage.removeItem('localStoragePW');
    pwObj = {};
    document.getElementById('title').innerHTML = '请输入手势密码';
    initCanvas();
    document.getElementById('setPassword').checked = "checked";
}
