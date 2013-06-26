Lls.Views.Window = Backbone.View.extend({

    initialize : function(){
        this.windowWidth = 0;
        this.windowHeight = 0;
        this.get_window_size();
    },

    get_window_size :function(){
        if (window.innerHeight) {  // all except Explorer
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
        } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
            this.windowWidth = document.documentElement.clientWidth;
            this.windowHeight = document.documentElement.clientHeight;
        } else if (document.body) { // other Explorers
            this.windowWidth = document.body.clientWidth;
            this.windowHeight = document.body.clientHeight;
        }
    }
});