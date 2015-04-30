'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
/** @jsx createElement */

var _createElement$Phrase = require('lacona-phrase');

var _resolve = require('path');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _thenify = require('thenify');

var _thenify2 = _interopRequireDefault(_thenify);

var readdir = _thenify2['default'](_fs2['default'].readdir);
var stat = _thenify2['default'](_fs2['default'].stat);

function getUserHome() {
  return process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
}

var FileSystem = (function (_Source) {
  function FileSystem() {
    _classCallCheck(this, FileSystem);

    if (_Source != null) {
      _Source.apply(this, arguments);
    }
  }

  _inherits(FileSystem, _Source);

  _createClass(FileSystem, [{
    key: 'onCreate',
    value: function onCreate() {
      this.replaceData({});
    }
  }, {
    key: 'readDir',
    value: function readDir(dir) {
      var _this = this;

      if (this.data[dir]) {
        return;
      }this.setData(_defineProperty({}, dir, {}));

      readdir(dir).then(function (files) {
        var statPromises = _.map(files, function (file) {
          return Promise.all([file, stat(_resolve.resolve(dir, file))]);
        });
        return Promise.all(statPromises);
      }).then(function (stats) {
        return _.chain(stats).indexBy(function (stat) {
          return stat[0];
        }).mapValues(function (stat) {
          isDir: stat[1];
        }).value();
      }).then(function (files) {
        _this.setData(_defineProperty({}, dir, files));
      });
    }
  }]);

  return FileSystem;
})(Source);

var File = (function (_Phrase) {
  function File() {
    _classCallCheck(this, File);

    if (_Phrase != null) {
      _Phrase.apply(this, arguments);
    }
  }

  _inherits(File, _Phrase);

  _createClass(File, [{
    key: 'describe',
    value: function describe() {
      if (this.props.directory == null) {
        return _createElement$Phrase.createElement(
          'choice',
          null,
          _createElement$Phrase.createElement(
            'sequence',
            null,
            _createElement$Phrase.createElement('literal', { text: '/' }),
            _createElement$Phrase.createElement(File, { directory: '/' })
          ),
          _createElement$Phrase.createElement(
            'sequence',
            null,
            _createElement$Phrase.createElement('literal', { text: '~/' }),
            _createElement$Phrase.createElement(File, { directory: getUserHome() })
          )
        );
      } else {}
    }
  }, {
    key: 'source',
    value: function source() {
      return {
        files: _createElement$Phrase.createElement(FileSystem, null)
      };
    }
  }]);

  return File;
})(_createElement$Phrase.Phrase);

exports['default'] = File;

File.defaultProps = {};
module.exports = exports['default'];