// *********二级菜单的显示********
// $(".nav-link").on({
//     "mouseenter":function(){
//         $(".children-list")
//         .stop()
//         .animate({
//             top: "+=20"
//         },500);
//     },
//     "mouseleave":function(){
//         $(".children-list").hide();
//     }
// })

// *********焦点轮播图********

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