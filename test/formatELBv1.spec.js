/* global before, describe, it */

var assert = require("assert");
var fs = require("fs");

var handler = require("../handlers/formatELBv1");

describe('handler/formatELBv1.js', function() {
  describe('#process()', function() {
    var dataSource;
    var dataJson;

    before(function() {
      dataSource = JSON.parse(fs.readFileSync(
        "test/assets/elbv1.parse.json"));
      dataJson = JSON.parse(fs.readFileSync(
        "test/assets/elbv1.format.json"));
    });

    it('should format parsed ELB data',
      function(done) {
        var config = {
          data: dataSource,
          dateField: 'date',
          setting: true
        };
        handler.process(config)
          .then(function(result) {
            assert.ok(result.hasOwnProperty('setting'),
              'process returns config object');
            assert.deepStrictEqual(result.data, dataJson,
              'ELB data formatted successfully');
            done();
          })
          .catch(function(err) {
            console.log(err);
          });
      });

    it('should fail if malformed ELB data is provided',
      function(done) {
        var config = {
          data: {malformed: 'data'},
          setting: true
        };
        handler.process(config)
          .catch(function(err) {
            assert.ok(err, 'error is thrown');
            done();
          });
      });
  });
});
