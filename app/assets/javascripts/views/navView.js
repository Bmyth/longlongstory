define(['views/blocksView'],function(blocksView){
    var initialize = function(){
        bind_navigation();
    };

    var bind_navigation = function(){
        bind_mouse_nav($(".nav-btn.up"),blocksView.moveUp);
        bind_mouse_nav($(".nav-btn.down"),blocksView.moveDown);
        bind_mouse_nav($(".nav-btn.left"),blocksView.moveLeft);
        bind_mouse_nav($(".nav-btn.right"),blocksView.moveRight);
        $(".nav-btn.zoom-in").click(blocksView.zoom_in);
        $(".nav-btn.zoom-out").click(blocksView.zoom_out);
    };

    var bind_mouse_nav = function(element, event){
        $(element).mousedown(function(){
            event();
            var intervalTime = 150;
            var intervalId = window.setInterval(event, intervalTime);
            $(this).mouseup(function(){
                window.clearInterval(intervalId);
            })
        });
    };

    return {
        initialize : initialize
    };
})