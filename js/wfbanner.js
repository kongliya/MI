function Banner(){}
$.extend(Banner.prototype,{
    // 写法是兼容的;
    // options 为传入的参数对象;
    init : function(options){
        /*
            {
                item_list : "#item li",
                left_btn : "#left",
                right_btn : "#right",
                btn_list : "#btn_list button"
                }
        */
        // 所有的图片;
        this.item_list = $(options.item_list);
        // 左按钮;
        this.left_btn = $(options.left_btn);
        // 右按钮;
        this.right_btn = $(options.right_btn);
        // 按钮列表;
        this.btn_list = $(options.btn_list);
        this.wrap = $(wrap);
        // 核心下标;
        this.nowIndex = 0;

        // 有多少元素?
        this.item_num = this.item_list.length - 1;
        
        this.ul = $(ul);
        // 获取列表中的第一个元素的宽度值;
        // 不传参直接为取值;
        this.item_width = this.item_list.width();

        // 判断是否有需要选择的选择器的参数;
        // 因为我们选择的元素都是用jQuery对象包裹的;
        // 所以 我们根据length判断 有没有传参 没传参的length为0;
        if(this.left_btn.length == 0 && this.right_btn.length == 0 && this.btn_list.length == 0){
            // 此时 直接执行自动轮播即可;
            this.autoPlay();
            return 0;
        }
        // 否则 进入事件绑定;
        this.bindEvent();
    },
    bindEvent(){
        // 1. 按钮点击事件;
        // this.left_btn.onclick = this.prev.bind(this);
        this.left_btn.click($.proxy(this.prev,this));
        // this.right_btn.onclick = this.next.bind(this);
        this.right_btn.click($.proxy(this.next,this));
        // 按钮列表切换事件;
        // this.btn_list.onmouseover = this.toIndex.bind(this);
        this.btn_list.mouseover($.proxy(this.toIndex,this));
            // 因为我们用mousemove 和 out 里边的元素也会被触发此事件;
       // 所以 触发频率太高了 我们只需要触发一次;
       // 所以 我们用 enter leave;
        this.wrap.mouseenter($.proxy(this.stopPlay,this));
        this.wrap.mouseleave($.proxy(this.autoPlay,this));
    },
    next(){
        if(this.nowIndex == this.item_num){
            this.nowIndex = 1;
            // ******;
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
            // ******返回倒数第二张;
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
        // 获取当前元素的下标;
        var target = event.target || event.ercElement;
        // ***jQuery 中 存在可以直接调用的 index;
        // 自动绑定 target 的 index;
        this.nowIndex = $(target).index();
        this.animate();
    },
    // *** animate部分;
    animate(){
        this.ul.stop().animate({
            left : -this.item_width * this.nowIndex
        })
        var index = this.nowIndex == this.item_num ? 0 : this.nowIndex;
        // 第 index 个 切换的按钮 添加 class;
        this.btn_list.eq(index).addClass("active")
        .siblings("button").removeClass("active");
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