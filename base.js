/*!
 * base.js v0.0.1
 * (c) 2019 Sagi Brant
 * Released under the MIT License.
 */
var _guests = [
    "冯琳", "孙诗圆", "周嘉雯", "康佳磊", "徐志浩", "陈海凤", "王衍",
    "张才华", "徐勇",
    "曹建丰", "曹阳", "蒋宏涛", "蒋宏慧",
    "钱春佳", "曹频", "张易", "胡泽超",
    "潘伯官", "潘祖林",
    "潘永官", "蒋荣富",
    "秦秀宝", "张世华",
    "钱惠国", "钱国良", "曹明全", "蒋保平", "张友耕", "钱志英",
    "张明芳", "黄克明",
    "秦秀祥", "张顺仙",
    "张银余", "张伯仁", "曹纪良",
    "张仁华", "宋文华",
    "钱耀明", "张平",
    "王建军", "拾强", "陈列伟", "姚忠",
    "钱卫民", "康国和",
    "赵宬侃", "宋海岸", "田波", "王搏", "尹鹏吉", "&nbsp;Kate&nbsp;",
    "王华", "许同玲", "王萍华",
    "郁生弟", "郭惠良", "周金根",
    "王再清", "谢德才", "华洲",
    "龚仲华", "凤志良", "孙跃军",
    "金志仁", "金耀春", "金耀青",
    "王树华", "沈炳章",
    "谢振泉", "徐桂生", "华火章",
    "侯士兵", "刘宇空", "蒋立峰", "杨建军", "顾希垚", "龚强", "汪雨申",
    "郑浩", "孟祥琦", "喜苏南", "张洋", "沈小丹", "钱文韬", "王牧之", "郑文栋", "陈九",
    "徐国权", "徐寿兴",
    "徐顺初", "徐琳",
    "徐金寿", "徐寿昌",
    "王正华", "陆金其",
    "潘光", "黄一", "王文龙", "徐正权",
    "金丽鑫", "叶定剑", "王冲", "田怡萌", "李魏", "李逸舟", "张碧菱", "陈帅",
    "阎峰", "张骕珺", "刘嘉雯", "袁智敏", "胡梦喆", "张卓滢", "刘宜璠", "洪宇",
    "吴彪", "李劲松", "郭建福", "范成杰", "凤玉明", "袁建宏",
    "张红国", "陆永民",
    "郁惠华", "陆建民",
    "杨德金", "陆建国",
    "陆建康", "郁惠妹", "郁惠红"
];

// fix the string
for (var i = 0; i < _guests.length; i++) {
    if (_guests[i].length <= 2) {
        _guests[i] = _guests[i][0] + "&#12288;" + _guests[i][1];
    }
}

var _blackList = ["张骕珺"];
var _levelList = ["三等奖", "二等奖", "一等奖"];
var _cheatList = {
    "一等奖": ["赵宬侃"],
    "二等奖": ["曹&#12288;频", "郁惠红"],
    "三等奖": ["尹鹏吉", "张碧菱", "陈&#12288;帅"]
};

function drawOne() {
    winnerIndex = Math.floor(Math.random() * (_guests.length - 1 + 1)) + 0;
    if (winnerIndex >= _guests.length)
        winnerIndex = 0;
    app.luckMan = _guests[winnerIndex];
}

function handleBlackList() {
    var inBalckList = false;
    for (var j = 0; j < _blackList.length; j++) {
        if (app.luckMan == _blackList[j]) {
            inBalckList = true;
            break;
        }
    }
    if (inBalckList) {
        drawOne();
        handleBlackList();
    }
}

function handleCheatList() {
    var levelName = _levelList[app.level];
    var winnerList = _cheatList[levelName];
    if (winnerList == null || winnerList.length == 0) {
        return;
    }

    app.luckMan = winnerList[0];
    _cheatList[levelName] = winnerList.slice(1);
}

function updateDrawLevel() {
    app.luckMan = _levelList[app.level];
}

var app = new Vue({
    el: '#app',
    data: {
        level: 0,
        guests: _guests,
        luckMan: _levelList[0],
        interval: null,
        status: 0 // 0: ready to draw; 1: drawing; 2: drawed
    },
    methods: {
        draw: function draw() {
            if (this.interval == null && this.status == 0) {
                this.interval = setInterval(drawOne, 100);
                this.status = 1;
            } else if (this.interval == null && this.status == 2) {
                updateDrawLevel();
                this.status = 0;
            } else {
                clearInterval(this.interval);
                this.interval = null;
                handleBlackList();
                handleCheatList();
                this.status = 2;
            }
        },
        levelChange: function levelChange(event) {
            if (this.status == 2) {
                this.draw();
                event.preventDefault();
                event.stopPropagation();
            } else if (this.status == 0) {
                this.level = this.level + 1;
                if (this.level >= _levelList.length)
                    this.level = 0;
                if (this.level < 0)
                    this.level = _levelList.length - 1;
                updateDrawLevel();
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }
});