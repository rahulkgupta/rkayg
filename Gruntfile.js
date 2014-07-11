module.exports = function (grunt) {

  var exec = require('child_process').exec;

  var metalsmith = require('metalsmith')
    , markdown    = require('metalsmith-markdown')
    , templates   = require('metalsmith-templates')
    , collections = require('metalsmith-collections')
    , permalinks = require('metalsmith-permalinks')
    , _ = require('underscore');

  grunt.registerTask('metal', function () {
    exec('rm -rf build/');
    var done = this.async();
    metalsmith(__dirname)
      .use(collections({
        'posts': {
          pattern: 'posts/*.md',
          sortBy: 'date',
          reverse: true
        }
      }))
      .use(markdown())
      .use(templates({
        engine: 'handlebars',
        partials: {
          header: 'partials/header',
          footer: 'partials/footer'
        }
      }))
      .use(permalinks({
        pattern: ':collection/:title',
        relative: false
      }))
      .build(function(err){
        if (err) throw err;
        done();
      });
  });

  grunt.registerTask('aws', function () {
    exec('aws s3 --region us-west-1 sync  build/ s3://rkayg.com');
  });

  grunt.registerTask('default', ['metal', 'aws']);
}
