//获取最外面的div
var box = my$("jd-col1");
//获取ul
var ulObj = box.children[0];
//获取ul中的li
var list = ulObj.children;
//获取box中的div
var dv = box.children[1];
//获取dv中的小div
var dvObjs = dv.getElementsByTagName("div");

/*dv.onmouseover = function () {
    dv.style.display = "block";
};
dv.onmouseout = function () {
    dv.style.display = "none";
};*/

for (var i = 0; i < list.length; i++) {
    //给每一个dvObjs的标签上添加一个自定义属性,存储索引值
    // dvObjs.setAttribute("index", i);
    list[i].onmouseover = function () {
        dv.style.display = "block";
        dvObjs[i].style.display = "block";
    };
    list[i].onmouseout = function () {
        dv.style.display = "none";
        dvObjs[i].style.display = "none";
    };

    // console.log(list.length);
    // console.log(i);
    // list[i].onmouseover = function () {
    //     console.log(i);
    // };
}


