const {
    profile
} = require('console');
const path = require('path');

module.exports = {
    entry: {
        script: './src/script.js',
        api: './src/api.js',
        allgames: './src/allgames.js',
        bookmarks: './src/bookmarks.js',
        moreinfo: './src/moreinfo.js',
        profile: './src/profile.js',
        signin: './src/signin.js',
        signup: './src/signup.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'docs/js'),
    },
    mode: 'production'

};