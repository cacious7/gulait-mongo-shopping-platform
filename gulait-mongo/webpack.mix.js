let mix = require( 'laravel-mix' );

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */



mix.react('resources/js/index.jsx', 'views/js/index.js') //this file gets loaded for mobiles
   //.sass('resources/raw/sass/style.scss', 'public/css/style.css') //this is gets loaded for all platforms
   
   //PREVENT fs module not found problems
   .webpackConfig({node: {fs: 'empty'}});