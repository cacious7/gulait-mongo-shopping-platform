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
   .sass('resources/sass/style.scss', 'views/css/style.css') //this converts scss to css for use in our react app
//    .options({
//         hmrOptions: { //hmr stands for hot module replacement, alternatively called hot reloading or auto reloading
//             host: 'localhost',
//             port: 3000
//         },
//   })

    //Hot reloading with browser sync
    //requires the following dependencies
    //browser-sync and browser-sync-webpack-plugin
    //.browserSync( 'localhost' )

    //PREVENT fs module not found problems
    .webpackConfig({node: {fs: 'empty'}});

//   if (mix.inProduction()) {
//     mix.version();
//   }
   
   
