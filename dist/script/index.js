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
        console.log(this.oWrap)
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
$.each($(".brick-item"),function(index,item){
    
    $(item).on("mousemove",index,function(event){
        event.data.toggleClass = "brick-item-active"
    })
})
// $(".brick-item").on({
//     "mousemove":function(){
//         $(".brick-item").addClass("brick-item-active");
//     },
//     "mouseout":function(){
//         $(".brick-item").removeClass("brick-item-active");
//     }
// })

// *********小米闪购无缝轮播图********