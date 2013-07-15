define(['backbone', 'collections/blocks', 'views/blocksView', 'views/navView', 'views/sidePanelView'],function(Backbone, Blocks, BlocksView, NavView, SidePanelView){
    var initialized = false;

    var initialize = function(){

        Blocks.initialize();
        BlocksView.initialize();
        SidePanelView.initialize();
//            global_side_panel_view = new Lls.Views.SidePanel();
//            global_coordination_view = new Lls.Views.Coordination();
        NavView.initialize();
    };

    var data_ready = function(){
        initialized = true;
        render();
    };

    var render = function(){
        if(!initialized)
            return false;

        BlocksView.render();
    };

    return {
        initialize : initialize,
        render : render,
        dataReady : data_ready
    };
})
