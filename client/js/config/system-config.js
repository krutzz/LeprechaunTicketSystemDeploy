SystemJS.config({
    // tell SystemJS which transpiler to use
    transpiler: 'plugin-babel',
    // tell SystemJS where to look for the dependencies
    map: {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        // app start script
        'main': './js/main.js',
        'router': './js/router.js',
        'users': './js/controlers/users-controler.js',
        'templates': './js/templates.js',
        'json-requester': './js/json-requester.js',
        'data': './js/data.js',
        'tickets': './js/controlers/display-tickets.js',
        'sigin': './js/controlers/signin-constroller.js',
        'ticket': './js/controlers/ticket-controller.js',
        'validator': './js/utils/validator.js',
        'popover':'./js/controlers/popover-constoller.js'
    }
});
