var recentData = {
    cpu: [],
    disk: [],
    pv: [],
    timeStamp: []
};
//元素选择器
function $(name) {
    return document.querySelector(name);
}
/*
函数名称：极值函数
传入参数：一维数组，数组类型为数字
传出参数：最大/小值
*/
function min(data) {
    var validate = true;
    data.map(function(i) {
        if (typeof(i) != "number") {
            validate = false;
            throw new Error("Wrong input of min()!");
        }
    });
    if (validate) {
        var min = data[0];
        data.map(function(i) {
            if (i < min) min = i;
        })
        return min;
    } else return null;
}

function max(data) {
    var validate = true;
    data.map(function(i) {
        if (typeof(i) != "number") {
            validate = false;
            throw new Error("Wrong input of max()!");
        }
    });
    if (validate) {
        var max = data[0];
        data.map(function(i) {
            if (i > max) max = i;
        })
        return max;
    } else return null;
}
/*
函数名称：折线图处理函数
传入参数：数据集，显示颜色，传入值的类型
传出参数：无
*/
function drawLine(data, color, type) {
    var wrap = $("#status-chart");
    var ctx = wrap.getContext('2d');
    var reg = /\d+/;
    var maxWidth = window.getComputedStyle(wrap).width.match(reg);
    var maxHeight = window.getComputedStyle(wrap).height.match(reg);
    var scaleX = maxWidth / data.length;
    var scaleY;
    switch (type) {
        case "percent":
            scaleY = 100; //如果是百分比就以100为最大值
            break;
        case "number":
            scaleY = max(data) * 1.5; //否则就以数据最大值
            break;
        default:
            break;
    }
    ctx.beginPath();
    ctx.moveTo(0, parseInt((max(data) - data[i]) / scaleY * maxHeight));
    for (var i = 0; i < data.length; i++) {
        ctx.lineTo(parseInt(i * scaleX), parseInt((scaleY - data[i]) / scaleY * (maxHeight - 60)) + 30);
    }
    ctx.strokeStyle = color;
    ctx.stroke();
}
/*
函数名称：进程渲染函数
传入参数：进程信息
传出参数：渲染后的DOM节点
*/
function processRender(process) {
    var node = document.createElement("div");
    var title = document.createElement("p");
    var line = document.createElement("span");
    var per = document.createElement("span");
    var value = document.createElement("span");
    var status = document.createElement("span");
    node.className = "process";
    title.className = "process-title";
    title.innerHTML = process.name;
    per.className = "process-per";
    line.id = "line";
    line.style.width = process.percent + "px";
    value.id = "value";
    value.innerHTML = process.percent + "%";
    status.className = "process-status";
    if (!process.status) status.style.backgroundColor = "#840000";
    per.appendChild(line);
    per.appendChild(value);
    node.appendChild(title);
    node.appendChild(per);
    node.appendChild(status);

    return node;
}
/*
函数名称：渲染函数
传入参数：即时数据
传出参数：无
*/
function render(data) {
    if (recentData.cpu.length > 360) {
        recentData.cpu.shift();
        recentData.disk.shift();
        recentData.pv.shift();
        recentData.timeStamp.shift();
    }
    recentData.cpu.push(data.cpu);
    recentData.disk.push(data.disk);
    recentData.pv.push(data.pv);
    recentData.timeStamp.push(data.nowTime);

    /*渲染进程状态部分*/
    var targetDiv = $("#process-wrap");
    if (targetDiv.childElementCount) {
        var count = targetDiv.childElementCount;
        for (var i = 0; i < count; i++) {
            targetDiv.removeChild(targetDiv.children[0]);
        }
    } //清空容器
    for (var k in data.process) {
        targetDiv.appendChild(processRender(data.process[k]));
    } //渲染子容器

    /*渲染服务器状态部分*/
    $("#CPU").innerHTML = data.cpu + "%";
    $("#disk").innerHTML = data.disk + "%";
    $("#pv").innerHTML = data.pv + "/h";

    $("#status-chart").getContext('2d').clearRect(0, 0, 843, 174);
    drawLine(recentData.cpu, "#00AF3D", "percent");
    drawLine(recentData.disk, "#C23531", "percent");
    drawLine(recentData.pv, "#61A0A8", "number");

}
/*
函数名称：获取数据函数
传入参数：请求类型
传出参数：从服务器获取的即时数据
*/
function getData(type) {

}
//初始化函数
function init() {
    var data = {
        nowTime: "1460425658",
        cpu: 23.43,
        disk: 32.33,
        pv: 123,
        process: [{
            name: "haha",
            percent: 25,
            status: true
        }, {
            name: "h1aha",
            percent: 90,
            status: false
        }, {
            name: "h2aha",
            percent: 10,
            status: true
        }, {
            name: "h2aha",
            percent: 5,
            status: true
        }, {
            name: "h2aha",
            percent: 2,
            status: true
        }, {
            name: "h2aha",
            percent: 10,
            status: true
        }, {
            name: "h2aha",
            percent: 5,
            status: true
        }, {
            name: "h2aha",
            percent: 2,
            status: true
        }, {
            name: "h2aha",
            percent: 10,
            status: true
        }, {
            name: "h2aha",
            percent: 5,
            status: true
        }, {
            name: "h2aha",
            percent: 2,
            status: true
        }, {
            name: "h2aha",
            percent: 10,
            status: true
        }, {
            name: "h2aha",
            percent: 5,
            status: true
        }, {
            name: "h2aha",
            percent: 2,
            status: true
        }]
    };
    $("#status-chart").addEventListener("mousemove", function(event) {
        var x = event.clientX + 10 + "px";
        var y = event.clientY + "px";
        var tooltip = $("#tooltip");
        tooltip.style.top = y;
        tooltip.style.left = x;
        tooltip.style.visibility = "visible";
        var dataX = event.clientX - 127 - $("#container").offsetLeft;
        var key = parseInt(dataX / 843 * recentData.cpu.length);
        tooltip.innerHTML = recentData.timeStamp[key] + "<br>CPU:" + recentData.cpu[key] + "%<br>Disk:" + recentData.disk[key] + "%<br>PV:" + recentData.pv[key];
    })
    $("#status-chart").addEventListener("mouseleave", function() {
        $("#tooltip").style.visibility = "hidden";
    });
    //test
    var testData = [
        [],
        [],
        [],
        []
    ];
    for (var i = 0; i < 360; i++) {
        testData[0].push(parseInt(Math.random() * 30));
        testData[1].push(parseInt(Math.random() * 20));
        testData[2].push(parseInt(Math.random() * 160 + 300));
        var date = new Date();
        testData[3].push(date.getMonth() + "/" + date.getDate() + "/" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
    }
    recentData.cpu = testData[0];
    recentData.disk = testData[1];
    recentData.pv = testData[2];
    recentData.timeStamp = testData[3];
    //test

    setInterval(function() {
        data.cpu = parseInt(Math.random() * 10 + 20);
        data.disk = parseInt(Math.random() * 20);
        data.pv = parseInt(Math.random() * 160 + 300);
        var date = new Date();
        data.nowTime = date.getMonth() + "/" + date.getDate() + "/" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        render(data);
    }, 1000);
}