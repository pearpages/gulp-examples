module.exports = function() {
    var client = './src/client/';
    var clientApp = client + 'app/'

    var config = {
        temp: './.tmp/',

        /**
         * Files paths
         */

        //all js to vet
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        index: client + 'index.html',
        //! is for excluding
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],

        less: client + 'styles/styles.less'
    };

    return config;
};