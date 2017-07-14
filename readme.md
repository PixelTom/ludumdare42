# A Phaser.js Boilerplate

A template to boost the productivity of Phaser.js game developers. Provides tools to improve code reuse, assist in development activities, and can package projects into production ready bundles.

This fork updates Browserify to include Babelify and transpile from ES6. It also trims some of the fat.

## What's in the Box

[NPM](https://www.npmjs.org/) via [Browserify](http://browserify.org/), [Jade](http://jade-lang.com/), [Stylus](http://learnboost.github.io/stylus/), [Lodash](http://lodash.com/), [JsHint](http://www.jshint.com/), [Uglify.js](https://github.com/mishoo/UglifyJS), [Source maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/), [Stats.js](https://github.com/mrdoob/stats.js/), [Google Analytics](http://www.google.com/analytics/), [Image optimisation tools](http://pngquant.org/), Livereload (auto refresh), Cache busted assets, Zip compression, [.gitignore](https://github.com/serby/GitIgnore)

## Installing

### Node.js and Grunt

You will need to first install [Node.js](http://nodejs.org/download/) and the grunt-cli: `npm install -g grunt-cli`.

### Setup Your Project

Download and unpack [The Phaser.js Boilerplate](https://github.com/PixelTom/phaser-es6-boilerplate/archive/master.zip). Or alternatively checkout from source:

    git clone git@github.com:PixelTom/phaser-es6-boilerplate.git my-sweet-game
    cd my-sweet-game
    rm -rf .git/
    git init && git add -A && git commit -m "Importing Phaser boilerplate."

Next, inside the project, you need to install the project's various NPM dependencies:

    npm install

And you should now be ready to spin up a development build of your new project:

    grunt

## Developing

Your first port of call will likely be to customise the properties found in `package.json` and `src/js/game/properties.js`.

All of the files required to run the game will live in the `src` folder, this will include any JavaScript, images, HTML ([Jade](http://jade-lang.com/)), and CSS ([Stylus](http://learnboost.github.io/stylus/)). When the default grunt task is invoked, these files are compiled to a `build` directory.

Files in the `build` directory will always be generated and excluded from Git by the `.gitignore`, as such these will removed without warning and should generally not be edited.

### Recommendations

* Use relative file paths for any assets loaded by your HTML or JavaScript. This will negate any potential path issues when the game is later uploaded to a webserver.
* If you intend to store development assets (i.e PSD's, Texture Packer files, etc) inside your project, store them outside of the `src` directory to avoid bloating your builds with them.
* Browserify is crazy powerful. I'm not going to quote Spider-man, but you should definitely check out [Substack's Browserify Handbook](https://github.com/substack/browserify-handbook).
* Linting is disabled by default, if you'd like to enforce it for production builds update the `.jshintrc` with rules for your coding style and remove the comment block from jshint directive in the gruntfile's build task.

### Available Targets

#### `grunt`

Configures and runs an unminified development build optimised for fast watch performance with source maps and live reload.

#### `grunt build`

Creates an uglified, production ready build with no source maps.

#### `grunt optimise`

Lossy compression of all png's in the `src/images/` directory using [pngquant](http://pngquant.org/).

(Linux users will need to have a version of pngquant available on their paths.)

#### `grunt zip`

Compiles the current build into `{title}.zip` with an internal folder. This is intended for use when transferring the build to a third party for webserver upload.

#### `grunt cocoon`

Compiles the current build into `{title}.zip` ready for upload to [CocoonJs](https://www.ludei.com/cocoonjs/).

### Phaser and it's Physics Engines

You might notice that Phaser isn't actually bundled in with the rest of our Browserify bundle. Bundling it was our first choice initially, however leaving it out enables use of the P2 Physics engine and makes `grunt:browserify` run a whole lot faster. It also gives you the option to pull Phaser from in a [CDN](https://github.com/photonstorm/phaser#cdn).

#### Using P2

PixelTom: I've removed this for my version of the repo.

### Updating or Adding Libraries

When adding new libraries that aren't CommonJS compatible, you'll have to update the [Browserify Shim configuration](https://github.com/thlorenz/browserify-shim#3-provide-browserify-shim-config).

### Coding Style and Linting

I've adapted [Airbnb's JavaScript Style Guide](https://github.com/bengourley/js-style-guide). I've kept the code footprint low so you can easily include your own `.jshintrc`.

## Created with contributions and inspiration from

  * [Craig Beswetherick](http://grindheadgames.com)
  * [Jesse Freeman's Phaser template](https://github.com/gamecook/phaser-project-template)
  * The retired https://github.com/luizbills/phaser-js-boilerplate
