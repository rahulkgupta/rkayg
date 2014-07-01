var exec = require('child_process').exec;

module.exports = function (grunt) {

  grunt.registerTask('metalsmith', function () {
    exec('rm -rf build/');
    exec('node_modules/metalsmith/bin/metalsmith');
  });

  grunt.registerTask('aws', function () {
    exec('aws s3 --region us-west-1 sync --delete  build/ s3://rkayg.com');
  });

  grunt.registerTask('default', ['metalsmith', 'aws']);
}
