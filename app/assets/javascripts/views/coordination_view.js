Lls.Views.Coordination = Backbone.View.extend({

    initialize : function(){

    },

    show : function(){
        for(var i = minX; i<=maxX; i++){
            var block = global_blocks_view.get_block_at(i, minY);
            $(".templates .coordination-digit.x").clone().text(i).appendTo(block);
        }

        for(var j = minY; j<=maxY; j++){
            var block = global_blocks_view.get_block_at(minX, j);
            $(".templates .coordination-digit.y").clone().text(j).appendTo(block);
        }
        this.hide();
    },

    hide : function(){
        setTimeout(function(){
            $(".block .coordination-digit").remove();
        }, 1000);
    },

    refresh : function(){

    }
});