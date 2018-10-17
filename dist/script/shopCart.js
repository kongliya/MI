

// *********购物车及商品列表;************
function ShopCar(){}
$.extend(ShopCar.prototype,{
    init(){
        this.main = $(".lists");
        this.loadJson()
        .then(function(res){
            this.json = res.data.list.list;
            this.renderPage();
            // console.log(res.data.list);
        })
        this.bindEvent();
        this.listSum();
    },
    loadJson(){
        var opt = {
            url : "data/data.json",
            type : "GET",
            context : this
        }
        return $.ajax(opt);
    },
    renderPage(){
        // console.log(this.json);
        var html = "";
        for(var i = 0; i < this.json.length; i ++){
            html += `<li class="con">
                        <img class="large-img" src="${this.json[i].img}" alt="">
                        <p class="list-title">${this.json[i].goods_name}</p>
                        <p class="goods-price">${this.json[i].goods_price} 元</p>
                        <button class="addCart" data-id="${this.json[i].goods_id}">添加到购物车</button>
                    </li>`;
                    // console.log(this.main)
        }
        this.main.html(html);
    },
    bindEvent(){
        $(".lists").on("click",".addCart",this.addCar.bind(this));
        $(".topbar-cart").on("mouseenter",this.showList.bind(this));
        $(".topbar-cart").on("mouseleave",function(){
            $(".topbar-cart").find(".cart-menu").hide();
        });
        $(".topbar-cart").on("click",function(event){
            var target = event.target;
            if(target != $(".topbar-cart")[0]) return 0;
            $.removeCookie("shopCar");

            // 执行鼠标移出事件;
            $(".topbar-cart").triggerHandler("mouseleave");
            this.listSum();
        }.bind(this));
    },
    addCar(event){
        // 怎么知道将谁加入的购物车 => 通过 goods-id;
        var target = event.target;
        var goodsId = $(target).attr("data-id");
        var cookie;
        if(cookie = $.cookie("shopCar")){
            // 将字符串转换为数组 方便插入操作;
            var cookieArray = JSON.parse(cookie);

            // 判断当前要添加的商品 是否已经存在于购物车之中;
            // 表示是否存在当前商品;
            var hasGoods = false;
            console.log(cookieArray);
            for(var i = 0 ; i < cookieArray.length; i ++){
                if(cookieArray[i].id == goodsId){
                    // 表示存在商品;
                    hasGoods = true;
                    cookieArray[i].num ++;
                    break;
                }
            } 

            // 如果没有商品;
            if(hasGoods == false){
                var goods = {
                    id : goodsId,
                    num : "1"
                }
                cookieArray.push(goods);
            }

            // 将数组 转为字符串 方便储存 cookie;

            // console.log(JSON.stringify(cookieArray));
            $.cookie("shopCar",JSON.stringify(cookieArray));
        }else{
            $.cookie("shopCar",`[{"id":"${goodsId}","num":"1"}]`);
        }
        // console.log($.cookie("shopCar"));
        this.listSum();
    },
    showList(event){
        // 判定是否存在购物车，如果不存在购物车就没必要拼接列表了;
        $(".cart-menu").show();
        var target = event.target;
        if(target != $(".topbar-cart")[0]) return 0;
        var cookie;
        if(!(cookie = $.cookie("shopCar"))) return 0;
        var cookieArray = JSON.parse(cookie);
        var html = "";
        // for 购物车里有多少个就拼接多少个;
        for(var i = 0 ; i < cookieArray.length; i++){
            // console.log(cookieArray[i]);
            // for 判断哪一个商品是购物车里的商品;
            for(var j = 0 ; j < this.json.length; j ++){
                if(cookieArray[i].id == this.json[j].goods_id){
                    html +=`<li data-id=${cookieArray[i].id} class="carts">
                                <img style="width:80px; height:80px;float:left;" src="${this.json[i].img}" alt="">
                                <div class="cart-txt">
                                    <p class="txt">
                                        <i class="title">${this.json[i].goods_name}</i>
                                        <em class="goodNo"> X ${cookieArray[i].num}</em>
                                        <i class="cart-price">${this.json[i].goods_price} 元</i>
                                    </p>
                                </div>
                            </li>
                            `;
                    break;
                }
            }
        }
        $(".cart-lists").html(html);
    },
    listSum(){
        var cookie;
        if(!(cookie = $.cookie("shopCar"))){
            $(".topbar-cart").find(".cart-num").html(0);
            return 0;
        };
        var cookieArray = JSON.parse(cookie);
        var sum = 0;
        for(var i = 0 ; i < cookieArray.length; i ++){
            sum += Number(cookieArray[i].num);
        }
        $(".topbar-cart").find(".cart-num").html(`(`+sum+`)`);
    }
})
var shopCar = new ShopCar();
shopCar.init();

// ***********瀑布流;************
function WaterFall(){}
WaterFall.prototype.init = function(){
    // 进度条;
    this.ul = document.querySelector(".waterfall .lists2");
    // 加载第几页;
    this.page = 0;
    // 是否加载完了;
    this.loaded = false;
    

    // 绑定事件;
    // 渲染页面;
    this.handleEvent();
    this.loadMsg()
    .then((res)=>{
        // console.log(res);
        //json.parse 用于从一个字符串中解析出json 对象
        res = typeof res == "string" ? JSON.parse(res) : res;
        this.renderPag(res);

    })
}   
WaterFall.prototype.handleEvent = function(){
    // 滚动事件判定是否应该加载数据;
    onscroll = this.iflLoad.bind(this);
}
WaterFall.prototype.loadMsg = function(){
    // 请求的加载;
    return new Promise((succ)=>{
        // this => 实例化对象;
        var xhr = new XMLHttpRequest();
        var path = "http://localhost:88/proxy/api.douban.com/v2/movie/top250?start="+this.page * 20 + "&count=20";
        xhr.open("GET",path);
        xhr.send(null);
        xhr.onload = function(){
            succ(xhr.response);
        }
        this.page++;
        // console.log(this.page);
    })
}
WaterFall.prototype.renderPag = function(json){
    var list = json.subjects;
    var html = "";
    for(var i = 0 ; i < list.length ; i ++){
        html += `
                <li class="con">
                    <img class="large-img" src="${list[i].images.small}" alt="">
                    <p class="list-title">${list[i].title}</p>
                    <p class="goods-price">${list[i].rating.average} 元</p>
                </li>
                `
    }
    // 把渲染好的字符串放入页面之中;
    this.ul.innerHTML += html;

    // 渲染结束;
    this.loaded = true;
}
WaterFall.prototype.iflLoad = function(){
    if(this.loaded == false){
        return 0;
    }
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    // 显示的高度有多高;
    var showHeight = document.documentElement.clientHeight + scrollTop;
    // 最后一个元素;
    var aLi = document.querySelectorAll(".lists2 li");
    var lastLi = aLi[aLi.length - 1];
    if(lastLi.offsetTop <= showHeight + 300){
        // 加载数据
        this.loadMsg()
        .then((res)=>{
            res = typeof res == "string" ? JSON.parse(res) : res;
            this.renderPag(res);
        })
        this.loaded = false;
    }
}
function getName(arr){
    var res = "";
    for(var i = 0 ; i < arr.length ; i ++){
        res += "  " + arr[i].name;
    }
    return res;
}

var waterfall = new WaterFall();
waterfall.init();

