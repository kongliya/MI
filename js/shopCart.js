// ***********瀑布流;************
function WaterFall(){}
$.extend(WaterFall.prototype,{
    init(){
        // 页数;
        this.page = 1;
        // 结构外包围;
        this.main = $(".lists");
        // 是否在加载中;
        this.loading = false;

        this.loadJson()
        .done(function(res){
            // deferred 的 done 回调this 指向的都是 jQuery 对象本身;
            console.log(res,this);
            this.renderPage(res);
        })
        this.bindEvent();
    },
    loadJson(){
        var opt = {
            url:"../data/data.json",
            dataType:"json",
            data:{page:this.page},
            // this => 指向实例化对象;
            context:this
        }
        // 返回一个状态机;
        return $.ajax(opt);

    },
    // 以上拿到了数据 接着 渲染页面;
    renderPage(json){
        var html = "";
        console.log(json)
        for(var i = 0 ; i < json.length; i ++){
            var height = json[i].height / (json[i].width / $(".con").width());
            // 若 height 为 NaN 则跳出 不加载;
            if(isNaN(height)) continue;
            html += `<li class="con">
                        <img class="large-img" src="${this.json[i].img}" alt="">
                        <p class="list-title">${this.json[i].goods_name}</p>
                        <p class="goods-price">${this.json[i].goods_price} 元</p>
                        <button class="addCart" data-id="${this.json[i].goods_id}">添加到购物车</button>
                    </li>`;
        }
        this.main.html(html);
        this.sortPage();
    },
    sortPage(){
        var aBox = this.main.children();
        // console.log(aBox);
        var heightArray = [];
        for(var i = 0; i < aBox.length; i ++){
            // 第一排设置基准;
            if(i < 5){
                // console.log(aBox.eq(i));
                heightArray.push(aBox.eq(i).height());
            }else{
                // 找到数组中的最小值 (第一排里面最矮的那一个);
                // Math.min.apply => 可以取得数组之中的最小值;
                var min = Math.min.apply(false,heightArray);
                // console.log(min);
                // 最小值和最小值下标;
                var minIndex = heightArray.indexOf(min);
                aBox.eq(i).css({
                    position:"absolute",
                    top:min,
                    // 最矮的那一个元素 获取left值;
                    left:aBox.eq(minIndex).offset().left
                })
                // 给最小值加上拼接之后的高度 这样的话 最小值就是不会重复的;
                heightArray[minIndex] += aBox.eq(i).height();
            }
            // 第二排 及以后;
        }
        this.loading = false;
    },
    bindEvent(){
        $(window).on("scroll",this.ifLoad.bind(this));
    },
    ifLoad(){
        // 获取 scrollTop;
        var scrollTop = $("html,body").scrollTop();
        var clientHeight = $("html")[0].clientHeight;
        var lastBox = this.main.children(":last");
        if(scrollTop + clientHeight > lastBox.offset().top){
            if(this.loading){
                return 0;
            }
            this.loading = true;
            this.page ++;
            this.loadJson()
            .done(function(res){
                this.renderPage(res);
            })
        }
    }

})


var waterfall = new WaterFall();
waterfall.init();


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


