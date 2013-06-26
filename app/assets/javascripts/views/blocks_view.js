Lls.Views.Blocks = Backbone.View.extend({

    initialize : function(){
        offsetX = 0;
        offsetY = 0;

        this.blockLength = 200;

        focused_block_coorX = 0;
        focused_block_coorY = 0;

        minX = 0;
        maxX = 7;
        minY = 0;
        maxY = 5;

        this.blockRowNumber = 0;
        this.blockColumnNumber = 0;

        this.generate_empty_blocks();
    },

    generate_empty_blocks : function(){
        this.calculate_block_number(global_window_view.windowWidth, global_window_view.windowHeight);
        var total_block_number = this.blockRowNumber * this.blockColumnNumber;
        var container = $('.block-container');

        container.css('width', (this.blockRowNumber * this.blockLength + 50) + 'px');

        for(var i = 0 ; i < total_block_number; i++){
            var block = $('.templates .block').clone();
            block.attr({'coor-x': i % this.blockRowNumber, 'coor-y': parseInt(i / this.blockRowNumber)}).appendTo(container);
        }

        $(".block").click(global_block_edit_view.show_edit_panel);

        minX = 0;
        maxX = this.blockRowNumber - 1;
        minY = 0;
        maxY = this.blockColumnNumber - 1;
    },

    calculate_block_number : function(windowWidth, windowHeight){
        this.blockRowNumber =  parseInt(windowWidth / this.blockLength) + 1;
        this.blockColumnNumber =  parseInt(windowHeight / this.blockLength) + 1;
    },

    render : function() {
        var that = this;
        global_blocks.each(function(block){
            that.render_block_with(block);
        });
    },

    render_block_with : function(block_data){
        var block_body_template = "<div class='block-body'></div>";

        var x = block_data.get('coorX');
        var y = block_data.get('coorY');

        var block = this.get_block_at(x, y);
        $(block_body_template).html(block_data.get('body')).appendTo(block);
    },

    render_block_at : function(x, y){
        var block = global_blocks.get_block_data_at(x,y);
        if(block !== 0){
            this.empty_block_at(x, y);
            this.render_block_with(block);
        }else{
            this.empty_block_at(x, y);
        }
    },

    bind_block_at : function(x, y){
        this.get_block_at(x, y).click(global_block_edit_view.show_edit_panel);
    },

    empty_block_at : function(x, y){
        this.get_block_at(x, y).children('.block-body').remove();
    },

    get_block_at : function(x, y){
        var selectString = ".block[coor-x='" + x + "'][coor-y='" + y + "']";
        return $(selectString);
    },

    moveDown : function(){
        $(".block-container").animate({top: '-200px'},"fast",function(){
            $(".block-container .block").each(function(){
                if(parseInt($(this).attr('coor-y')) == minY){
                    $(this).addClass("toBeRemoved");
                }
            })
            $(".block-container").find(".toBeRemoved").remove();
            var bottom = maxY + 1;
            for(var i = minX; i <= maxX; i++){
                global_blocks_view.insertBlock(i, bottom, 2);
            }
            $(".block-container").css('top','0px');
            minY ++;
            maxY ++;
            offsetY --;
        });
    },

    moveUp : function(){
        $(".block-container").animate({top: '200px'},"fast",function(){
            $(".block-container .block").each(function(){
                if(parseInt($(this).attr('coor-y')) == maxY){
                    $(this).addClass("toBeRemoved");
                }
            })
            $(".block-container").find(".toBeRemoved").remove();
            var top = minY - 1;
            for(var i = maxX; i >= minX; i --){
                global_blocks_view.insertBlock(i, top, 0);
            }
            $(".block-container").css('top','0');
            minY --;
            maxY --;
            offsetY ++;
        });
    },

    moveRight : function(){
        $(".block-container").animate({left: '-200px'},"fast",function(){
            $(".block-container .block").each(function(){
                if(parseInt($(this).attr('coor-x')) == minX){
                    $(this).addClass("toBeRemoved");
                }
            })
            $(".block-container").find(".toBeRemoved").remove();
            var left = maxX + 1;
            for(var i = minY; i <= maxY; i ++){
                global_blocks_view.insertBlock(left, i, 1);
            }
            $(".block-container").css('left','0px');
            minX ++;
            maxX ++;
            offsetX --;
        });
    },

    moveLeft : function(){
        $(".block-container").animate({left: '200px'},"fast",function(){
            $(".block-container .block").each(function(){
                if(parseInt($(this).attr('coor-x')) == maxX){
                    $(this).addClass("toBeRemoved");
                }
            })
            $(".block-container").find(".toBeRemoved").remove();
            var left = minX - 1;
            for(var i = minY; i <= maxY; i ++){
                global_blocks_view.insertBlock(left, i, 3);
            }
            $(".block-container").css('left','0px');
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
            item.insertBefore($(".block-container .block:first"));
        }
        if(d == 1){
            item.insertAfter(this.get_block_at(x-1, y));
        }
        if(d == 2){
            item.insertAfter($(".block-container .block:last"));
        }
        if(d == 3){
            item.insertBefore(this.get_block_at(x+1, y));
        }
        this.render_block_at(x, y);
        this.bind_block_at(x, y);
    }
});
