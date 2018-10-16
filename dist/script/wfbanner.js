function WFBanner(){}
$.extend(WFBanner.prototype,{
    init : function(options){
        // 所有的图片;
        this.item_list = $(options.item_list);
        // 左按钮;
        this.left_btn = $(options.left_btn);
        // 右按钮;
        this.right_btn = $(options.right_btn);
        
        this.wrap = $(options.wrap);
        // 核心下标;
        this.nowIndex = 0;

        this.item_num = this.item_list.length - 1;
        this.ul = $(options.ul);

        this.item_width = this.item_list.width();
;
        if(this.left_btn.length == 0 && this.right_btn.length == 0 && this.btn_list.length == 0){
            // 此时 直接执行自动轮播即可;
            this.autoPlay();
            return 0;
        }
        // 否则 进入事件绑定;
        this.bindEvent();
    },
    bindEvent(){
        
        this.left_btn.click($.proxy(this.prev,this));
        this.right_btn.click($.proxy(this.next,this));
          
    },
    next(){
        if(this.nowIndex == this.item_num){
            this.nowIndex = 1;
            this.ul.css({
                left : 0
            })
        }else{
            this.nowIndex ++;
        }
        this.animate();
    },
    prev(){
        if(this.nowIndex == 0){
            this.nowIndex = this.item_num - 1;
            this.ul.css({
                // 此时的 this.item_num 就相当于下标;
                left : - this.item_num * this.item_width
            })
        }else{
            this.nowIndex --;
        }
        this.animate();
    },
    toIndex(event){
        var target = event.target || event.ercElement;
        // 自动绑定 target 的 index;
        this.nowIndex = $(target).index();
        this.animate();
    },
    // *** animate部分;
    animate(){
        this.ul.stop().animate({
            left : -this.item_width * this.nowIndex
        })
    },
    
    autoPlay(){
            this.autoPlayTimer = setInterval(()=>{
            // this.next();
            // triggerHandler事件不会触发事件冒泡;
            this.right_btn.triggerHandler("click");
        },3000)
    },
    stopPlay(){
            clearInterval(this.autoPlayTimer);
            // console.log("停止播放")
        }
})