
var tx = new Array(
    "您好呀，欢迎看我的博客^_^",
    "喜欢就关注下呗！",
    "我就闪啊闪的看着你",
    "嘿嘿，如果看到不对的",
    "记得给我留言哟");
var txcount = 5;
var i = 1;
var wo = 0;
var ud = 1;
//定义i、wo、ud三者的初值 
function animatetitle() {
    window.document.title = tx[wo].substr(0, i) + "_";
    if (ud == 0) i--;
    if (ud == 1) i++;
    if (i == -1) { ud = 1; i = 0; wo++; wo = wo % txcount; }
    if (i == tx[wo].length + 10) { ud = 0; i = tx[wo].length; }

    parent.window.document.title = tx[wo].substr(0, i) + "_";
    setTimeout("animatetitle()", 100);
}
animatetitle();
document.addEventListener("visibilitychange", function () { document.title = document.hidden ? "出BUG了，快看！" : "一点点白" })