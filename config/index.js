
module.exports = (function () {
    
    let config={};

    if (process.env.NODE_ENV =='develop'){
        config= require('./develop.json');
    }

    if (process.env.NODE_ENV =='test'){
        config= require('./test.json');
    }
    
    console.log(config);
    return config;
})();
