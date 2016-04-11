var recentData={
    cpu:[],
    disk:[],
    pv:[],
    timeStamp:[]
};
//元素选择器
function $(name) {
    return document.querySelector(name);
}
/*
函数名称：渲染函数
传入参数：即时数据
传出参数：无
*/
function render(data) {
    recentData.cpu.push(data.cpu);
    recentData.disk.push(data.disk);
    recentData.pv.push(data.pv);
    recentData.timeStamp.push(data.timeStamp);
}
//初始化函数
function init() {
    var data = {
        nowTime: "2016-4-12 23:00",
        cpu: 23.43,
        disk: 32.33,
        pv:123,
        process: {
            content: {
                "sdfd": {
                    name: "haha",
                    percent: 23.32,
                    status: true
                },
                "s21dfd": {
                    name: "h1aha",
                    percent: 23.32,
                    status: true
                },
                "s2dfd": {
                    name: "h2aha",
                    percent: 23.32,
                    status: true
                }
            },
            count: 3
        }
    };
    setInterval(function () {
        render(data);
    },1000);
    debugger;
}