require.config({
    baseUrl: 'assets',
    shim: {
        'backbone': {
            deps: ['underscore'],
            exports: 'Backbone'
        }
    }
});

require(['routers/routers'],function(Router){
    Router.initialize();
})
