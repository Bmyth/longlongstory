Lls.Views.StudioDis = Backbone.View.extend({
    initialize : function(){

    },

    create : function(){
        $(".templates .dis-block").clone().appendTo($(".g-middle .studio"));
        this.render_each_board();
    },

    render_each_board : function(){
        this.render_title_board();
        this.render_image_board();
    },

    render_image_board : function(){
        var block_data = global_blocks.get_block_data_at(focused_block_coorX, focused_block_coorY);
        if(block_data != 0){
            if(block_data.get('img').url)
                $('.studio .image-board img').attr('src', block_data.get('img').url);
        }
    },

    render_title_board : function(){
        var block_data = global_blocks.get_block_data_at(focused_block_coorX, focused_block_coorY);
        if(block_data != 0){
            if(block_data.get('title'))
                $('.studio .title-board').text(block_data.get('title'));
        }
    },

    show_title : function(){
        this.render_title_board();
        $(".studio .title-board").animate({top:'0px'});
    },

    update_title : function(){
        global_studio_dis_view.render_title_board();
    },

    hide_title : function(){
        $(".studio .title-board").animate({top:'-160px'});
    },

    update_image :function(){
        global_studio_dis_view.render_image_board();
        global_grid_view.render_block_at(focused_block_coorX, focused_block_coorY);
    }
});
