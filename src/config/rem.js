$("html").css("font-size",document.documentElement.clientHeight/document.documentElement.clientWidth<1.5 ? (document.documentElement.clientHeight/603*312.5+"%") : (document.documentElement.clientWidth/375*312.5+"%"));
// 单屏全屏布局时使用,短屏下自动缩放
$("html").css("font-size",document.documentElement.clientWidth/375*312.5+"%");//长页面时使用,不缩放
