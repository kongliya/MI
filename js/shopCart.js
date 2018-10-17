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
            url : "data.json",
            type : "GET",
            context : this
        }
        return $.ajax(opt);
    },
    renderPage(){
        console.log(this.json);
        var html = "";
        for(var i = 0; i < this.json.length; i ++){
            html += `<li class="con">
                        <img class="large-img" src="${this.json[i].img}" alt="">
                        <p class="title">${this.json[i].goods_name}</p>
                        <p class="goods-price">${this.json[i].goods_price} 元</p>
                        <button data-id="${this.json[i].goods_id}">添加到购物车</button>
                    </li>`;
                    // console.log(this.main)
        }
        this.main.html(html);
    },
    bindEvent(){
        $(".lists").on("click","button",this.addCar.bind(this));
        $(".cart-list").on("mouseenter",this.showList.bind(this));
        $(".cart-list").on("mouseleave",function(){
            $(".cart-lists").children().remove();
        });
        $(".empty").on("click",function(event){
            console.log(1);
            var target = event.target;
            if(target != $(".empty")[0]) return 0;
            $.removeCookie("shopCar");

            // 执行鼠标移出事件;
            $(".cart-list").triggerHandler("mouseleave");
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
        var target = event.target;
        if(target != $(".cart-list")[0]) return 0;
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
                                <img style="width:80px; height:80px" src="${this.json[i].img}" alt="">
                                <div class="cart-txt">
                                    <p class="txt">
                                        <i class="title">${this.json[i].goods_name}</i>
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
            $(".container").find("span").html(0);
            return 0;
        };
        var cookieArray = JSON.parse(cookie);
        var sum = 0;
        for(var i = 0 ; i < cookieArray.length; i ++){
            sum += Number(cookieArray[i].num);
        }
        $(".container").find("span").html(sum);
    }
})
var shopCar = new ShopCar();
shopCar.init();