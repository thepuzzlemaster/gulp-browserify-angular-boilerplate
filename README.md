##Setup instructions
- Install nodeJs
- Clone the git repository `git clone https://github.com/thepuzzlemaster/gulp-browserify-angular-boilerplate.git`
- `cd gulp-browserify-angular-boilerplate`
- `npm install`

###Run dev environment
- `npm run dev`

###Run production build
(Still being worked on)

##Info
###Directory Structure:
The directory structure has been set up to keep components separate and modular. An example component has been included (navbar), which currently uses standard bootstrap styling and angular for rendering and business logic. It is included to demonstrate how a component would be instantiated ​using this setup.

The 'src' directory houses all the raw pre-compiled files that make up the application; The raw LESS files; The raw html files; Any additional assets as they become necessary (fonts, images, audio, etc.).

Within the 'src/js' directory is a file 'main.js' which instantiates an angular application. All the angular components are housed in 'src/js/components'. Each component gets its own directory.

A 'public' directory gets created when a build is performed. This directory stores the compiled content to be served by a web server.

###Build Steps:
Gulp has been set up to act as the task runner for this application. All code for gulp lives in 'gulpfile.js'. It will be utilized to perform the following steps to generate development and production builds.
Compiling ​CSS from LESS files.
Copying static and compiled files to a 'public' folder for builds.
Bundle javascript dependencies for client-side utilization (using browserify).
Uglify/Minify css and js dependencies.
Instantiate web server with livereload for development.
Watch files and compile/reload browser when a change is detected.

Currently there are 2 build processes - dev and build (production)
When running the dev task ('npm run dev'), all the build steps are run through one time and a web server is started to serve up the content from the 'public' folder. All source files are actively watched for changes. When a change is detected, the correct compilation process will run, copy the new file over to the 'public' directory and trigger a reload in the browser. Sourcemaps are generated for all compiled files and no minifaction/uglification is performed.

When running the build task ('npm run build'), all build steps are run through one time and no web server is instantiated. Additionally, compiled files will be run through compressors and minifiers to keep file sizes as small as possible. No sourcemaps will be included. At current time, only the 'dev' step has been completed and tested. The 'build' step is still being developed.
