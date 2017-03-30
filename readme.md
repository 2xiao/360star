实现原理：利用HTML5的canvas，画出手势密码的初始界面和圆圈，利用touch事件记录手势的路径，并根据不同的情况对输入的密码进行处理和判断，将结果返回。

demo演示地址：http://xxwu.tech/360star/index.html


************控制台设计************

在这个文件中定义了一些事件监听函数，用来监测用户在canvas中的`touchstart`,`touchmove`,`touchend`事件，以及点击`设置密码`，`验证密码`按钮事件。

触发`touchstart`事件时，调用`getPosition(e)`函数获取触摸点的坐标，并判断此触摸点是否属于`arr`数组中圆圈的范围，如果是则将对应的圆圈push到`lastPoint`数组中，同时将此点从`restPoint`中移除。

触发`touchmove`事件时，要实时的更新canvas界面，调用`update()`函数，详见应用界面设计版块。

触发`touchend`事件时，说明一次手势密码的输入已经结束，将canvas界面初始化，并进行后续的逻辑判断，调用`touchEnd()`函数，详见数据库设计版块。

触发`setPassword`的`onclick`事件时，重置界面，并清空本地的密码存储。

触发`checkPassword`的`onclick`事件时,调用`checkPassword`函数验证此次的密码输入是否正确。


************应用界面设计**********

在这个文件中，定义了canvas界面的初始化以及画实心圆，画连线的函数。

`initCanvas()` 函数是初始化canvas界面的函数，在`window.onload`中被调用，画出9个空心圆的初始界面。
其中圆的半径是根据canvas的宽度计算出来保存在变量`r`中，数组`arr`是所有的圆圈对象`obj`，圆圈对象`obj`有坐标属性`x,y`和所代表的密码数字`index`属性。`restPoint`是没有被选中的圆圈的集合，`lastPoint`是被选中的圆圈按顺序push进去的集合。

`drawCle(x, y) `函数是用来画初始界面中的圆的。

`drawPoint(lastPoint)`函数是用来画被选中的圆的，参数是被选中点数组，在函数中遍历数组，将所有被选中的点画成实心有颜色（'#FFA726'）的圆。

`drawStatusPoint(type)`函数用来画圆圈的边框，已提醒用户输入密码是否正确，出错时边框为红色。

`drawLine(po, lastPoint) `函数用来画被选中点之间的连线。

`getPosition(e)`函数用来获取touch点相对于canvas的坐标。

`update(po)`函数是检测到`touchmove`事件时被触发，用来实时地画手势轨迹的。每次触发都会先清空canvas界面，然后初始化canvas界面，再根据此时`lastPoint`数组的情况画出实心圆和连线。这里要注意一点，那就是如果touch点绕过A.C两点之间的B点将A.C两点选中时，连线还是会经过B点，所以此时要将B点也push进`lastPoint`数组，具体是方法就是判断实时点`po`和上一个被选中点`lastPoint[lastPoint.length-1]`的中点是否经过了点阵中的任意一点，若经过则将那个点先push进去，然后再处理实时点`po`.


************数据库设计************

在这个文件中定义了存储密码、设置密码和验证密码的逻辑。

首先定义了存储在`localStorage`中的密码`localStoragePW`,并定义了一个实时的密码对象`pwObj`

```
var pwObj = {
    step: 2,
    firstPW: undefined,
    secondPW: undefined
    }
    
```
其中`pwObj.step`是用户设置密码时输入密码的次数，`pwObj.firstPW`和`pwObj.secondPW`分别是用户第一次输入和第二次输入的密码。

当`touchend`事件触发`touchEnd()`函数的时候，先判断`设置密码键`是否被选中,如果`设置密码键`被选中的话，则运行`setPassword`函数;如果没有，说明此时是`验证密码键`被选中，运行`checkPassword`函数。

运行`setPassword`函数时，先判断输入手势密码的次数。如果`pwObj.step`为1，则说明此次是第二次输入密码，判断前后两次密码是否相等；相等的话则返回密码保存成功，将`pwObj.step`置为2；不相等的话则返回朗次输入不一致，并且运行重置函数，则将`pwObj.step`置为0。 如果`pwObj.step`为2，则将`checkPassword`设置为`checked`，此时界面上的验证密码键自动被选中。如果是其他情况，则将`pwObj.step`置为1，把此手势密码存储到`pwObj.firstPW`。

运行`checkPassword`函数时，先判断`pwObj.step`是否为2，如果不为2则说明用户还没有设置密码，将`setPassword`设置为`checked`,提示用户输入密码。如果为2，则将此次输入的密码与`pwObj.SecondPW`传入`checkPass`函数做对比，如果相同则返回“密码正确！”，否则返回“输入的密码不正确”

另外，每次刷新页面和点击`setPassword`按钮时都会清空`localStorage`中存储的密码，让用户可以重置密码。

