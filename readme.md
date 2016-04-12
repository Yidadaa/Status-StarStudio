已经定义好了数据传输类型， 现在设置的是测试数据。## 初始化部分
初始化部分需要从服务器接收历史数据， 数据接口如下：
    ``
`javascript
var recentData={
    cpu:[],//cpu占用百分比，数组，数组元素为number型，精确到小数点后两位
    disk:[],//磁盘占用百分比，数组，同上
    pv:[],//单位时间访问次数，数组，数组元素为number型，取整数
    timeStamp:[]//时间戳，从某时刻到1970年的毫秒数
`
``##
监控时
监控时需要每秒从服务器返回服务器的当前状态值， 数据定义如下：
    ``
`javascript
var data={
    cpu:23.11,//当前CPU状态
    disk:32.21,//当前磁盘状态
    pv:300,//当前访问量
    process:[{//当前进程状态
        name:"process_name1",//进程1名字
        percent:12,//资源占比
        status:true//是否活跃
    },{
        name:"process_name2",
        percent:12,
        status:false
    }]
};
`
``

我也不太懂服务器方面的东西， 数据定义的有问题的话我再改， 就这样。