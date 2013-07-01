Lls.Views.Panoramas = Backbone.View.extend({

    initialize : function(){
        this.microRate = 4;
        this.blockLength = 200 / this.microRate;

        this.blockRowNumber = 0;
        this.blockColumnNumber = 0;
    },

    show : function(){
        $(".global-block-layer").show();
        global_panorama_view.set_container_size();
        global_panorama_view.generate_empty_blocks();
        global_panorama_view.render();
    },

    set_container_size : function(){
        var width = (global_blocks.max_x() + 1 )* this.blockLength;
        var height = (global_blocks.max_y() + 1)* this.blockLength;
        $(".global-block-layer").css({'height': height, 'width': width});
    },

    generate_empty_blocks : function(){
        var container = $('.global-block-container').css('zoom','25%');
        var l = 200;

        for(var j = 0 ; j < global_blocks.max_y(); j++)
            for(var i = 0 ; i < global_blocks.max_x(); i++)
            {
                var block = $('.templates .g-block').clone().css({'height': l, 'width': l});
                block.attr({'coor-x': i, 'coor-y': j}).appendTo(container);
            }

        $(".block").click(this.click);
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

    get_block_at : function(x, y){
        var selectString = ".g-block[coor-x='" + x + "'][coor-y='" + y + "']";
        return $(selectString);
    },

    click :function(){
        alert('s');
    },

    mark_edited_at : function(x, y){

    },

    clear_mark : function(){
        $(".block.edited").removeClass('edited');
    }
});
