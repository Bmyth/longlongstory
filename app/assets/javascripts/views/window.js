define(function(){
    var windowWidth = 0;
    var windowHeight = 0;

    var initialize = function(){
        get_window_size();
    };

    var get_window_size = function(){
        if (window.innerHeight) {  // all except Explorer
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
        } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
            windowWidth = document.documentElement.clientWidth;
            windowHeight = document.documentElement.clientHeight;
        } else if (document.body) { // other Explorers
            windowWidth = document.body.clientWidth;
            windowHeight = document.body.clientHeight;
        }
    };

    var getWidth = function(){
        return windowWidth;
    };

    var getHeight = function(){
        return windowHeight;
    };

    return {
        initialize : initialize,
        windowWidth : getWidth,
        windowHeight : getHeight
    };
})