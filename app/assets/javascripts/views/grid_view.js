Lls.Views.Grid = Backbone.View.extend({

    initialize : function(){
        offsetX = 1;
        offsetY = 1;
        Lblock = 160;
        focused_block_coorX = 0;
        focused_block_coorY = 0;

        minX = 0;
        maxX = 7;
        minY = 0;
        maxY = 5;

        this.init_coordinate();
    },

    render : function() {
        var that = this;
        global_blocks.each(function(block){
            that.render_block_with(block);
        });
    },

    render_block_with : function(block_data){
        var block_title_template = "<p class='block-title'></p>";
        var block_img_template = "<img class='block-img'>";

        var x = block_data.get('coorX');
        var y = block_data.get('coorY');

        var block = this.get_block_at(x, y);

        $(block_img_template).attr('src',block_data.get('img').thumb.url).appendTo(block);
    },

    render_block_at : function(x, y){
        var block = global_blocks.get_block_data_at(x,y);
        if(block != 0){
            this.render_block_with(block);
        }
    },

    empty_block_at : function(x, y){
        var b = this.get_block_at(x, y);
        b.find('.block-title').remove();
        b.find('.block-img').remove();
        b.attr('status','blank');
    },

    get_block_at : function(x, y){
        var selectString = ".block[coor-x='" + x + "'][coor-y='" + y + "']";
        return $(selectString);
    },

    init_coordinate : function(){

    },

    moveDown : function(){
        $(".block-world").animate({top: '-320px'},"fast",function(){
            $(".block-world .block").each(function(){
                if(parseInt($(this).attr('coor-y')) == minY){
                    $(this).addClass("toBeRemoved");
                }
            })
            $(".block-world").find(".toBeRemoved").remove();
            var bottom = maxY + 1;
            for(var i = minX; i <= maxX; i++){
                global_grid_view.insertBlock(i, bottom, 2);
            }
            $(".block-world").css('top','-160px');
            minY ++;
            maxY ++;
            offsetY --;
        });
    },

    moveUp : function(){
        $(".block-world").animate({top: '0px'},"fast",function(){
            $(".block-world .block").each(function(){
                if(parseInt($(this).attr('coor-y')) == maxY){
                    $(this).addClass("toBeRemoved");
                }
            })
            $(".block-world").find(".toBeRemoved").remove();
            var top = minY - 1;
            for(var i = maxX; i >= minX; i --){
                global_grid_view.insertBlock(i, top, 0);
            }
            $(".block-world").css('top','-160px');
            minY --;
            maxY --;
            offsetY ++;
        });
    },

    moveRight : function(){
        $(".block-world").animate({left: '-320px'},"fast",function(){
            $(".block-world .block").each(function(){
                if(parseInt($(this).attr('coor-x')) == minX){
                    $(this).addClass("toBeRemoved");
                }
            })
            $(".block-world").find(".toBeRemoved").remove();
            var left = maxX + 1;
            for(var i = minY; i <= maxY; i ++){
                global_grid_view.insertBlock(left, i, 1);
            }
            $(".block-world").css('left','-160px');
            minX ++;
            maxX ++;
            offsetX --;
        });
    },

    moveLeft : function(){
        $(".block-world").animate({left: '0px'},"fast",function(){
            $(".block-world .block").each(function(){
                if(parseInt($(this).attr('coor-x')) == maxX){
                    $(this).addClass("toBeRemoved");
                }
            })
            $(".block-world").find(".toBeRemoved").remove();
            var left = minX - 1;
            for(var i = minY; i <= maxY; i ++){
                global_grid_view.insertBlock(left, i, 3);
            }
            $(".block-world").css('left','-160px');
            minX --;
            maxX --;
            offsetX ++;
        });
    },

    // d: 0-top 1-right 2-bottom 3-left
    insertBlock : function(x, y, d){
        var block_template = "<div class='block' coor-x='' coor-y='' status='blank'></div>";
        var item = $(block_template).attr('coor-x', x).attr('coor-y', y);
        if(d == 0){
            item.insertBefore($(".block:first"));
        }
        if(d == 1){
            item.insertAfter(this.get_block_at(x-1, y));
        }
        if(d == 2){
            item.insertAfter($(".block:last"));
        }
        if(d == 3){
            item.insertBefore(this.get_block_at(x+1, y));
        }
        this.render_block_at(x,y);
    }
});
