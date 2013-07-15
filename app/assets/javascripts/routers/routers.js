define(['backbone', 'views/mainView'],function(Backbone, MainView){
    var AppRouter = Backbone.Router.extend({
        routes : {
            '*actions' : 'index'
        }
    });

    var initialize = function(){
       var router = new AppRouter;
       MainView.initialize();

       router.on('route:index', function(){
           MainView.render();
       });

       Backbone.history.start();
    };

    return {
        initialize : initialize
    };
});
