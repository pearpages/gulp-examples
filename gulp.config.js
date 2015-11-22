module.exports = function() {
    var client = './src/client/';
    var clientApp = client + 'app/'

    var config = {
        client: client,
        temp: './.tmp/',

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

        less: client + 'styles/styles.less',

        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },
        getWiredDefaultOptions: getWiredDefaultOptions
    };

    function getWiredDefaultOptions() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        return options;
    }

    return config;
};