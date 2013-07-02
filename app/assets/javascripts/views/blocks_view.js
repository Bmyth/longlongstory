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
        this.zoomRate = 1;

        this.generate_empty_blocks();
    },

    zoom_rate : function(){
      return this.zoomRate;
    },

    generate_empty_blocks : function(){
        this.calculate_block_number(global_window.windowWidth, global_window.windowHeight);
        var total_block_number = this.blockRowNumber * this.blockColumnNumber;
        var container = $('.block-container');
        var zoom = (100 / this.zoomRate) + '%';
        var offset = this.zoomRate * 50;

        container.css({'width': (this.blockRowNumber * this.blockLength + offset) + 'px','zoom' : zoom});

        for(var i = 0 ; i < total_block_number; i++){
            var block = $('.templates .block').clone().addClass('r' + this.zoomRate);
            block.attr({'coor-x': i % this.blockRowNumber, 'coor-y': parseInt(i / this.blockRowNumber)}).appendTo(container);
        }

        $(".block").click(this.click);
        if(this.zoomRate !== 1){
            $(".block").hover(this.show_block_detail, this.remove_block_detail);
        }

        minX = 0;
        maxX = this.blockRowNumber - 1;
        minY = 0;
        maxY = this.blockColumnNumber - 1;
    },

    calculate_block_number : function(windowWidth, windowHeight){
        this.blockRowNumber =  parseInt(windowWidth / this.blockLength) * this.zoomRate + 1;
        this.blockColumnNumber =  parseInt(windowHeight / this.blockLength) * this.zoomRate + 1;
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

        var block = this.get_block_at(x, y).addClass('filled');
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
        global_blocks_view.get_block_at(x, y).addClass("r" + global_blocks_view.zoomRate);
    },

    bind_block_at : function(x, y){
        var that = this;
        this.get_block_at(x, y).click(that.click);
    },

    empty_block_at : function(x, y){
        this.get_block_at(x, y).children('.block-body').remove();
    },

    get_block_at : function(x, y){
        var selectString = ".block[coor-x='" + x + "'][coor-y='" + y + "']";
        return $(selectString);
    },

    click :function(){
        if(global_blocks_view.zoomRate === 1){
            var x = parseInt($(this).attr('coor-x'));
            var y = parseInt($(this).attr('coor-y'));
            focused_block_coorX = x;
            focused_block_coorY = y;

            if(global_side_panel_view.is_open()){
                global_blocks_view.mark_edited_at(x, y);
                global_side_panel_view.fill_block_form_at(x, y);
            }else{
                global_blocks_view.mark_edited_at(x, y);
                global_side_panel_view.show_edit_panel_at(x, y)
            }
        }
    },

    show_block_detail : function(){
        if($(this).hasClass('filled')){
            if($(this).css('overflow') === 'hidden'){
                var x = parseInt($(this).attr('coor-x'));
                var y = parseInt($(this).attr('coor-y'));
                var content = global_blocks_view.get_block_at(x, y).find('.block-body').html();
                var dp = $('.detail-panel').clone();
                dp.children('.content').html(content);
                dp.show().css('zoom',global_blocks_view.zoomRate).appendTo(this);
                $(this).css('overflow','visible').children('.block-body').html('');
            }
        }
    },

    remove_block_detail : function(){
        if($(this).hasClass('filled')){
            if($(this).css('overflow') === 'visible'){
                var x = parseInt($(this).attr('coor-x'));
                var y = parseInt($(this).attr('coor-y'));
                $(this).find(".detail-panel").remove();
                global_blocks_view.render_block_at(x, y);
                $(this).css('overflow','hidden');
            }
        }
    },

    mark_edited_at : function(x, y){
        this.clear_mark();
        global_blocks_view.get_block_at(x, y).addClass('edited');
    },

    clear_mark : function(){
        $(".block.edited").removeClass('edited');
    },

    //apply rate based move just in move down
    moveDown : function(){
        var position_offset = '-' + 200 * global_blocks_view.zoomRate + 'px';
        var speed = 250 / global_blocks_view.zoomRate;
        $(".block-container").animate({top: position_offset}, speed, function(){
            $(".block-container .block").each(function(){
                if(parseInt($(this).attr('coor-y')) <= minY + global_blocks_view.zoomRate - 1){
                    $(this).addClass("toBeRemoved");
                }
            })
            $(".block-container").find(".toBeRemoved").remove();
            for(var bottom = maxY + 1; bottom <= maxY + global_blocks_view.zoomRate; bottom++)
                for(var i = minX; i <= maxX; i++){
                    global_blocks_view.insertBlock(i, bottom, 2);
                }
            $(".block-container").css('top','0px');
            minY += global_blocks_view.zoomRate;
            maxY += global_blocks_view.zoomRate;
            offsetY -= global_blocks_view.zoomRate;
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
    },

    zoom_in : function(){
        if(global_blocks_view.zoomRate !== 1){
            global_blocks_view.zoomRate = global_blocks_view.zoomRate /2;
            global_blocks_view.clear_all();
            global_blocks_view.generate_empty_blocks();
            global_blocks_view.render();
        }else{

        }
    },

    zoom_out : function(){
        if(global_blocks_view.zoomRate !== 4){
            global_blocks_view.zoomRate = global_blocks_view.zoomRate * 2;
            global_blocks_view.clear_all();
            global_blocks_view.generate_empty_blocks();
            global_blocks_view.render();
        }else{

        }
    },

    clear_all : function(){
        $(".block-container").find(".block").remove();
    }
});
