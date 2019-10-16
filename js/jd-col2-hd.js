//获取最外面的div
var box = my$("jd-col2-hd");
//获取相框
// var screen = box.children[0];
//获取相框的宽度
var imgHeight = box.offsetHeight;
//获取ul
var ulObj = box.children[1];
//获取ul中的所有的li
var list = ulObj.children;
//获取ol
var olObj = box.children[2];
//获取按钮的div
var arr = my$("arr");
//获取两个按钮
var arrL = my$("arr-l");
var arrR = my$("arr-r");

var pic = 0;//全局变量

for (var i = 0; i < list.length; i++) {
    //创建li标签,加入到ol中
    var liObj = document.createElement("li");
    olObj.appendChild(liObj);
    // liObj.innerHTML = (i + 1);
    //在每个ol中的li标签上添加一个自定义属性,存储索引值
    liObj.setAttribute("index", i);
    //注册鼠标进入事件
    liObj.onmouseover = function () {
        //除掉所有的ol中的li的背景颜色
        for (var j = 0; j < olObj.children.length; j++) {
            olObj.children[j].removeAttribute("class");
        }
        //设置当前鼠标进来的li的背景颜色
        this.className = "current";
        //获取鼠标进入的li的当前索引值
        pic = this.getAttribute("index");
        //移动ul
        animate(ulObj, -pic * imgHeight);
    };
}

//设置ol中第一个li有背景颜色
olObj.children[0].className = "current";

//鼠标进入到box的div显示左右焦点的div
box.onmouseover = function () {
    arr.style.display = "block";
    //鼠标进入废掉之前的定时器
    clearInterval(timeId);
};

//鼠标离开到box的div隐藏左右焦点的div
box.onmouseout = function () {
    arr.style.display = "none";
    //鼠标离开自动播放
    timeId = setInterval(clickHandle, 1500);
};

//克隆一个ul中第一个li,加入到ul中的最后=====克隆
ulObj.appendChild(ulObj.children[0].cloneNode(true));

//自动播放
var timeId = setInterval(clickHandle, 1500);

//设置按钮的样式
arrL.onmouseover = arrMouseover;
arrL.onmouseout = arrMouseout;

arrR.onmouseover = arrMouseover;
arrR.onmouseout = arrMouseout;

//右边按钮
arrR.onclick = clickHandle;

//左边按钮
arrL.onclick = function () {
    if (pic == 0) {
        pic = list.length - 1;
        ulObj.style.top = -pic * imgHeight + "px";
    }
    pic--;
    animate(ulObj, -pic * imgHeight);
    //设置小按钮的颜色---所有的小按钮干掉颜色
    for (var i = 0; i < olObj.children.length; i++) {
        olObj.children[i].removeAttribute("class");
    }
    //当前的pic索引对应的按钮设置颜色
    olObj.children[pic].className = "current";
};

function clickHandle() {
    //如果pic的值是8,恰巧是ul中li的个数-1的值,此时页面显示第9个图片,而用户会认为这是第一个图,
    //所以,如果用户再次点击按钮,看到第二个图片
    if (pic == list.length - 1) {
        //从第9个图,跳转到第一个图
        pic = 0;//先设置pic=0
        ulObj.style.top = 0 + "px";//把ul的位置还原成开始的默认位置
    }
    pic++;//立刻设置pic加1,那么此时用户就会看到第二个图片了
    animate(ulObj, -pic * imgHeight);//pic从0的值加1之后,pic的值是1,然后ul移动出去一个图片
    //如果pic==8说明,此时显示第9个图(内容是第一张图片),第一个小按钮有颜色,
    if (pic == list.length - 1) {
        //第五个按钮颜色干掉
        olObj.children[olObj.children.length - 1].className = "";
        //第一个按钮颜色设置上
        olObj.children[0].className = "current";
    } else {
        //干掉所有的小按钮的背景颜色
        for (var i = 0; i < olObj.children.length; i++) {
            olObj.children[i].removeAttribute("class");
        }
        olObj.children[pic].className = "current";
    }
};

//设置任意的一个元素,移动到指定的目标位置
function animate(element, target) {
    clearInterval(element.timeId);
    //定时器的id值存储到对象的一个属性中
    element.timeId = setInterval(function () {
        //获取元素的当前的位置,数字类型
        var current = element.offsetTop;
        //每次移动的距离
        var step = 10;
        step = current < target ? step : -step;
        //当前移动到位置
        current += step;
        if (Math.abs(current - target) > Math.abs(step)) {
            element.style.top = current + "px";
        } else {
            //清理定时器
            clearInterval(element.timeId);
            //直接到达目标
            element.style.top = target + "px";
        }
    }, 10);
}

function arrMouseover() {
    this.style.background = "rgba(0, 0, 0, .5)";
}

function arrMouseout() {
    this.style.background = "rgba(0, 0, 0, .3)";
}