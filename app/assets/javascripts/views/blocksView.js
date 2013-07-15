define(['views/window', 'collections/blocks', 'views/sidePanelView'],function(Window, Blocks, sidePanelView){
    var offsetX = 0;
    var offsetY = 0;
    var blockLength = 200;
    var focused_block_coorX = 0;
    var focused_block_coorY = 0;

    var minX = 0;
    var maxX = 7;
    var minY = 0;
    var maxY = 5;

    var blockRowNumber = 0;
    var blockColumnNumber = 0;
    var zoomRate = 1;

    var initialize = function(){
        Window.initialize();
        generate_empty_blocks();
    };

    var zoom_rate = function(){
        return zoomRate;
    };

    var get_focused_block_coorX = function(){
        return focused_block_coorX;
    };

    var get_focused_block_coorY = function(){
        return focused_block_coorY;
    };

    var generate_empty_blocks = function(){
        calculate_block_number(Window.windowWidth(), Window.windowHeight());
        var total_block_number = blockRowNumber * blockColumnNumber;
        var container = $('.block-container');
        var zoom = (100 / zoomRate) + '%';
        var offset = zoomRate * 50;

        container.css({'width': (blockRowNumber * blockLength + offset) + 'px','zoom' : zoom});

        for(var i = 0 ; i < total_block_number; i++){
            var block = $('.templates .block').clone().addClass('r' + zoomRate);
            block.attr({'coor-x': i % blockRowNumber, 'coor-y': parseInt(i / blockRowNumber)}).appendTo(container);
        }

        $(".block").click(click);
        if(zoomRate !== 1){
            $(".block").hover(show_block_detail, remove_block_detail);
        }

        minX = 0;
        maxX = blockRowNumber - 1;
        minY = 0;
        maxY = blockColumnNumber - 1;
    };

    var calculate_block_number = function(windowWidth, windowHeight){
        blockRowNumber =  parseInt(windowWidth / blockLength) * zoomRate + 1;
        blockColumnNumber =  parseInt(windowHeight / blockLength) * zoomRate + 1;
    };

    var render = function() {
        Blocks.data.each(function(block){
            render_block_with(block);
        });
    };

    var render_block_with = function(block_data){
        var block_body_template = "<div class='block-body'></div>";

        var x = block_data.get('coorX');
        var y = block_data.get('coorY');

        var block = get_block_at(x, y).addClass('filled');
        $(block_body_template).html(block_data.get('body')).appendTo(block);
    };

    var render_block_at = function(x, y){
        var block = Blocks.get_block_data_at(x,y);
        if(block !== 0){
            empty_block_at(x, y);
            render_block_with(block);
        }else{
            empty_block_at(x, y);
        }
        get_block_at(x, y).addClass("r" + zoomRate);
    };

    var bind_block_at = function(x, y){
        get_block_at(x, y).click(click);
    };

    var empty_block_at = function(x, y){
        get_block_at(x, y).children('.block-body').remove();
    };

    var get_block_at = function(x, y){
        var selectString = ".block[coor-x='" + x + "'][coor-y='" + y + "']";
        return $(selectString);
    };

    var click =function(){
        if(zoomRate === 1){
            var x = parseInt($(this).attr('coor-x'));
            var y = parseInt($(this).attr('coor-y'));
            focused_block_coorX = x;
            focused_block_coorY = y;
            mark_edited_at(x, y);
            sidePanelView.show(x, y);
        }else{

        }
    };

    var show_block_detail = function(){
        if($(this).hasClass('filled')){
            if($(this).css('overflow') === 'hidden'){
                var x = parseInt($(this).attr('coor-x'));
                var y = parseInt($(this).attr('coor-y'));
                var content = get_block_at(x, y).find('.block-body').html();
                var dp = $('.detail-panel').clone();
                dp.children('.content').html(content);
                dp.show().css('zoom',zoomRate).appendTo(this);
                $(this).css('overflow','visible').children('.block-body').html('');
            }
        }
    };

    var remove_block_detail = function(){
        if($(this).hasClass('filled')){
            if($(this).css('overflow') === 'visible'){
                var x = parseInt($(this).attr('coor-x'));
                var y = parseInt($(this).attr('coor-y'));
                $(this).find(".detail-panel").remove();
                render_block_at(x, y);
                $(this).css('overflow','hidden');
            }
        }
    };

    var mark_edited_at = function(x, y){
        clear_mark();
        get_block_at(x, y).addClass('edited');
    };

    var clear_mark = function(){
        $(".block.edited").removeClass('edited');
    };

    //apply rate based move just in move down
    var moveDown = function(){
        var position_offset = '-' + 200 * zoomRate + 'px';
        $(".block-container").animate({top: position_offset}, 'fast', function(){
            $(".block-container .block").each(function(){
                if(parseInt($(this).attr('coor-y')) <= minY + zoomRate - 1){
                    $(this).addClass("toBeRemoved");
                }
            })
            $(".block-container").find(".toBeRemoved").remove();
            for(var bottom = maxY + 1; bottom <= maxY + zoomRate; bottom++)
                for(var i = minX; i <= maxX; i++){
                    insertBlock(i, bottom, 2);
                }
            $(".block-container").css('top','0px');
            minY += zoomRate;
            maxY += zoomRate;
            offsetY -= zoomRate;

        });
    };

    var moveUp = function(){
        $(".block-container").animate({top: '200px'},"fast",function(){
            $(".block-container .block").each(function(){
                if(parseInt($(this).attr('coor-y')) == maxY){
                    $(this).addClass("toBeRemoved");
                }
            })
            $(".block-container").find(".toBeRemoved").remove();
            var top = minY - 1;
            for(var i = maxX; i >= minX; i --){
                insertBlock(i, top, 0);
            }
            $(".block-container").css('top','0');
            $(".coordination-bar-x").css('top','0');

            minY --;
            maxY --;
            offsetY ++;
        });
    };

    var moveRight = function(){
        $(".block-container").animate({left: '-200px'},"fast",function(){
            $(".block-container .block").each(function(){
                if(parseInt($(this).attr('coor-x')) == minX){
                    $(this).addClass("toBeRemoved");
                }
            })
            $(".block-container").find(".toBeRemoved").remove();
            var left = maxX + 1;
            for(var i = minY; i <= maxY; i ++){
                insertBlock(left, i, 1);
            }
            $(".block-container").css('left','0px');

            minX ++;
            maxX ++;
            offsetX --;
        });
    };

    var moveLeft = function(){
        $(".block-container").animate({left: '200px'},"fast",function(){
            $(".block-container .block").each(function(){
                if(parseInt($(this).attr('coor-x')) == maxX){
                    $(this).addClass("toBeRemoved");
                }
            })
            $(".block-container").find(".toBeRemoved").remove();
            var left = minX - 1;
            for(var i = minY; i <= maxY; i ++){
                insertBlock(left, i, 3);
            }
            $(".block-container").css('left','0px');

            minX --;
            maxX --;
            offsetX ++;
        });
    };

    // d: 0-top 1-right 2-bottom 3-left
    var insertBlock = function(x, y, d){
        var block_template = "<div class='block' coor-x='' coor-y='' status='blank'></div>";
        var item = $(block_template).attr('coor-x', x).attr('coor-y', y);
        if(d == 0){
            item.insertBefore($(".block-container .block:first"));
        }
        if(d == 1){
            item.insertAfter(get_block_at(x-1, y));
        }
        if(d == 2){
            item.insertAfter($(".block-container .block:last"));
        }
        if(d == 3){
            item.insertBefore(get_block_at(x+1, y));
        }
        render_block_at(x, y);
        bind_block_at(x, y);
    };

    var zoom_in = function(){
        if(zoomRate !== 1){
            zoomRate = zoomRate /2;
            clear_all();
            generate_empty_blocks();
            render();
        }else{

        }
    };

    var zoom_out = function(){
        if(zoomRate !== 4){
            zoomRate = zoomRate * 2;
            clear_all();
            generate_empty_blocks();
            render();
        }else{

        }
    };

    var clear_all = function(){
        $(".block-container").find(".block").remove();
    }

    return {
        initialize : initialize,
        zoomRate : zoom_rate,
        focused_block_coorX : get_focused_block_coorX,
        focused_block_coorY : get_focused_block_coorY,
        clear_mark : clear_mark,
        moveDown : moveDown,
        moveUp : moveUp,
        moveRight : moveRight,
        moveLeft : moveLeft,
        zoom_in : zoom_in,
        zoom_out : zoom_out,
        render : render,
        render_block_at : render_block_at
    };
});
