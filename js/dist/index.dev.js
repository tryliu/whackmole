"use strict";

var content = document.querySelector(".cont-cent"); //游戏整体界面

var starte = document.querySelector(".start"); //游戏开始接口

var img = document.createElement("img"); //游戏地鼠元素

var imgsd = document.createElement("img"); //打中后的地鼠元素

var times = document.querySelector(".regulus"); //游戏总时间

var score = document.querySelector(".score"); //游戏得分

var numtimes = 10; //游戏总时间

var isfinish = false; //游戏是否结束

img.src = "./img/mouse.png";
imgsd.src = "./img/mouse2.png";
img.style.width = "100%";
imgsd.style.height = "100px";
imgsd.style.width = "100px";
img.style.height = "100%";
var dom = document.createElement("div"); //地鼠的元素

dom.style.width = "100px";
dom.style.height = "100px";
dom.appendChild(img);
dom.style.position = "absolute";
dom.style.opacity = "0";
content.appendChild(dom);
var isClick = false; // 产生随机数的函数

function randomkop(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var timesdf; //游戏时间滚动效果

function roll() {
  timesdf = setInterval(function () {
    numtimes--;

    if (numtimes === 0) {
      numtimes = 10;
    }

    times.textContent = "".concat(numtimes);
  }, 1000);
}

var objcd = {
  top: "",
  left: ""
}; // 产生随机距离的函数

function randomnum() {
  var coordinate = [[255, 260], [390, 260], [390, 55], [255, 55], [120, 55], [120, 260], [120, 460], [260, 460], [400, 460]];
  var numhd = randomkop(0, 8);
  var datasd = coordinate[numhd];
  objcd.top = datasd[0];
  objcd.left = datasd[1];
  dom.style.top = objcd.top + "px";
  dom.style.left = objcd.left + "px";
  dom.style.opacity = "1";
  setTimeout(function () {
    dom.style.opacity = "0";
  }, 1000); // console.log(objcd);
} // 每隔段时间进行调用


var timesd;

function testop() {
  timesd = setInterval(function () {
    if (isClick) {
      dom.removeChild(imgsd);
      dom.appendChild(img);
      isClick = false;
    }

    randomnum();
  }, 1500);
} //游戏结束事件


function dfgh() {
  setTimeout(function () {
    clearInterval(timesd);
    clearInterval(timesdf);
    timesd = null;
    timesdf = null;
    console.log("游戏结束2");
    isfinish = false;
  }, 10000);
} // let contenter = document.querySelector("#contenter");
// 地鼠点击后的事件


var newscore = 0;
content.addEventListener("click", function (e) {
  if (isfinish) {
    var x = e.x - content.offsetLeft;
    var newleft = objcd.left; // console.log(x, newleft);

    if (newleft - 30 < x && x < newleft + 40) {
      newscore++;
      score.textContent = "".concat(newscore);
      dom.removeChild(img);
      dom.appendChild(imgsd);
      isClick = true;
    }
  }
}); // 开始游戏

starte.addEventListener("click", function () {
  if (timesd) {
    return;
  }

  console.log("开始");
  testop();
  roll();
  dfgh();
  score.innerHTML = 0;
  newscore = 0;
  isfinish = true;
});