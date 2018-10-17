// *********搜索的iconfont********



// *********顶部导航栏二级菜单的显示********
$.each($(".nav-link"),function(index,item){
    $(item).on("mouseenter",index,function(){
        $(".list-choose").eq(index)
        .addClass("children-active")
        .stop()
        .animate({
            height : "229",
            top : "100"
        },600)
        .show()
        .siblings(".list-choose")
        .hide()
        .stop() 
        .animate({
            height : "0",
        });
    })
    $(item).on("mouseleave",index,function(){
        $(".list-choose").eq(index)
        .hide();
    })
})

// *********侧边导航栏二级菜单的显示********
$.each($(".nav-item"),function(index,item){
    $(item).on("mouseenter",index,function(){
        $(".children").eq(index)
        .show()
        .siblings(".children")
        .hide();
    })
    $(item).on("mouseleave",index,function(){
        $(".children").eq(index)
        .hide();
    })
})



// *********焦点轮播图********
function Banner(){}
$.extend(Banner.prototype,{
    init(){
        this.aListItem = $(".banner-img img");
        this.oLeft = $(".banner-prev");
        this.oRight = $(".banner-next");
        this.aPageBtn = $(".page-item");
        this.oWrap = $(".banner");
        this.nowIndex = 0;
        this.list_num = this.aListItem.length;
        this.bindEvent();
    },
    bindEvent(){
        this.oLeft.click($.proxy(this.prev,this));
        this.oRight.click($.proxy(this.next,this));
        this.aPageBtn.mousemove($.proxy(this.toIndex,this));
        this.oWrap.mouseenter($.proxy(this.stopPlay,this));
        this.oWrap.mouseleave($.proxy(this.autoPlay,this));
    },
    next(){
        if(this.nowIndex == this.list_num - 1){
            this.nowIndex = 0;
        }else{
            this.nowIndex ++;
        }
        this.animate();
    },
    prev(){
        if(this.nowIndex == 0){
            this.nowIndex = this.aListItem.last().index();
        }else{
            this.nowIndex --;
        }
        this.animate();
    },
    toIndex(event){
        var target = event.target;
        this.nowIndex = $(target).index();
        this.animate();
    },
    animate(){
        var index = this.nowIndex == this.item_num ? 0 : this.nowIndex;
        this.aListItem.eq(index).addClass("active")
        .stop()
        .animate({
            opacity:"1"
        },1000)
        .siblings("img").removeClass("active")
        .stop()
        .animate({
            opacity:"0"
        },800);
        this.aPageBtn.eq(index).addClass("active")
        .siblings("a").removeClass("active");
    },
    autoPlay(){
        clearInterval(this.autoTimer);
        this.autoTimer = setInterval(()=>{
            this.oRight.triggerHandler("click");
        },3000)
    },
    stopPlay(){
        clearInterval(this.autoTimer);
    }
})
var banner = new Banner();
banner.init();
banner.autoPlay();

// *********图片特效********
$(".brick-item-m").on({
    "mouseenter":function(){
        $(this).addClass("brick-item-active");
    },
    "mouseleave":function(){
        $(this).removeClass("brick-item-active");
    }
})

// *********小米闪购切换********
var wfbanner2 = new WFBanner();
wfbanner2.init({
    item_list : ".xm-list",
    left_btn : "#left2",
    right_btn : "#right2",
    wrap : ".flash-banner",
    ul : ".xm-list"
})

// *********家电选项卡********
$.each($(".tab1 li"),function(index,item){
    $(item).on("mousemove",index,function(event){
        $(".brick-choose").eq(index).show()
        .siblings(".brick-choose").hide();

        $(".tab-list li").eq(index)
        .addClass("tab-active")
        .siblings("li").removeClass("tab-active");
    })
})

// *********智能********
$.each($(".tab2 li"),function(index,item){
    $(item).on("mousemove",index,function(event){
        $(".brick-choose2").eq(index).show()
        .siblings(".brick-choose2").hide();

        $(".tab2 li").eq(index)
        .addClass("tab-active")
        .siblings("li").removeClass("tab-active");
    })
})

// *********搭配********
$.each($(".tab3 li"),function(index,item){
    $(item).on("mousemove",index,function(event){
        $(".brick-choose3").eq(index).show()
        .siblings(".brick-choose3").hide();

        $(".tab3 li").eq(index)
        .addClass("tab-active")
        .siblings("li").removeClass("tab-active");
    })
})

// *********万有影力********
$.each($(".tab4 li"),function(index,item){
    $(item).on("mousemove",index,function(event){
        $(".brick-choose4").eq(index).show()
        .siblings(".brick-choose4").hide();

        $(".tab4 li").eq(index)
        .addClass("tab-active")
        .siblings("li").removeClass("tab-active");
    })
})

// *********周边********
$.each($(".tab5 li"),function(index,item){
    $(item).on("mousemove",index,function(event){
        $(".brick-choose5").eq(index).show()
        .siblings(".brick-choose5").hide();

        $(".tab5 li").eq(index)
        .addClass("tab-active")
        .siblings("li").removeClass("tab-active");
    })
})

// *********为你推荐********
var wfbanner1 = new WFBanner();
wfbanner1.init({
    item_list : ".xm-carousel-col-5-list",
    left_btn : "#left",
    right_btn : "#right",
    wrap : ".xm-carousel-wrapper",
    ul : ".xm-carousel-list"
})


// *********回到顶部********
$(".bar-totop").on("click",function(){
    $("html,body").scrollTop(0);
})
$.each($(".bar-sort"),function(index,item){
    $(item).on("mouseenter",index,function(){
        $(this).find(".original-img").hide()
        .siblings("img").show();
    })
    $(item).on("mouseleave",index,function(){
        $(this).find(".hover-img").hide()
        .siblings("img").show();
    })
})
