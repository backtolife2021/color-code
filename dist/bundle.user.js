// ==UserScript==
// @name      color-code
// @namespace github.com/backtolife2021
// @require   https://unpkg.com/react@17/umd/react.development.js
// @require   https://unpkg.com/react-dom@17/umd/react-dom.development.js
// @include   https://github.com/*
// @version   0.0.0
// @homepage  https://github.com/backtolife2021/color-code
// @author    backtolife
// @license   MIT
// @grant     GM.getValue
// @grant     GM.registerMenuCommand
// ==/UserScript==

/*
MIT License

Copyright (c) 2020 cvzi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/* globals React, ReactDOM */
(function (React, ReactDOM) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () {
              return e[k];
            }
          });
        }
      });
    }
    n['default'] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);
  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  /*

  Based off glamor's StyleSheet, thanks Sunil ❤️

  high performance StyleSheet for css-in-js systems

  - uses multiple style tags behind the scenes for millions of rules
  - uses `insertRule` for appending in production for *much* faster performance

  // usage

  import { StyleSheet } from '@emotion/sheet'

  let styleSheet = new StyleSheet({ key: '', container: document.head })

  styleSheet.insert('#box { border: 1px solid red; }')
  - appends a css rule into the stylesheet

  styleSheet.flush()
  - empties the stylesheet of all its contents

  */
  // $FlowFixMe
  function sheetForTag(tag) {
    if (tag.sheet) {
      // $FlowFixMe
      return tag.sheet;
    } // this weirdness brought to you by firefox

    /* istanbul ignore next */


    for (var i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].ownerNode === tag) {
        // $FlowFixMe
        return document.styleSheets[i];
      }
    }
  }

  function createStyleElement(options) {
    var tag = document.createElement('style');
    tag.setAttribute('data-emotion', options.key);

    if (options.nonce !== undefined) {
      tag.setAttribute('nonce', options.nonce);
    }

    tag.appendChild(document.createTextNode(''));
    tag.setAttribute('data-s', '');
    return tag;
  }

  var StyleSheet = /*#__PURE__*/function () {
    function StyleSheet(options) {
      var _this = this;

      this._insertTag = function (tag) {
        var before;

        if (_this.tags.length === 0) {
          before = _this.prepend ? _this.container.firstChild : _this.before;
        } else {
          before = _this.tags[_this.tags.length - 1].nextSibling;
        }

        _this.container.insertBefore(tag, before);

        _this.tags.push(tag);
      };

      this.isSpeedy = options.speedy === undefined ? "production" === 'production' : options.speedy;
      this.tags = [];
      this.ctr = 0;
      this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

      this.key = options.key;
      this.container = options.container;
      this.prepend = options.prepend;
      this.before = null;
    }

    var _proto = StyleSheet.prototype;

    _proto.hydrate = function hydrate(nodes) {
      nodes.forEach(this._insertTag);
    };

    _proto.insert = function insert(rule) {
      // the max length is how many rules we have per style tag, it's 65000 in speedy mode
      // it's 1 in dev because we insert source maps that map a single rule to a location
      // and you can only have one source map per style tag
      if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
        this._insertTag(createStyleElement(this));
      }

      var tag = this.tags[this.tags.length - 1];

      if (this.isSpeedy) {
        var sheet = sheetForTag(tag);

        try {
          // this is the ultrafast version, works across browsers
          // the big drawback is that the css won't be editable in devtools
          sheet.insertRule(rule, sheet.cssRules.length);
        } catch (e) {
        }
      } else {
        tag.appendChild(document.createTextNode(rule));
      }

      this.ctr++;
    };

    _proto.flush = function flush() {
      // $FlowFixMe
      this.tags.forEach(function (tag) {
        return tag.parentNode.removeChild(tag);
      });
      this.tags = [];
      this.ctr = 0;
    };

    return StyleSheet;
  }();

  var MS = '-ms-';
  var MOZ = '-moz-';
  var WEBKIT = '-webkit-';
  var COMMENT = 'comm';
  var RULESET = 'rule';
  var DECLARATION = 'decl';
  var IMPORT = '@import';
  var KEYFRAMES = '@keyframes';

  /**
   * @param {number}
   * @return {number}
   */
  var abs = Math.abs;
  /**
   * @param {number}
   * @return {string}
   */

  var from = String.fromCharCode;
  /**
   * @param {string} value
   * @param {number} length
   * @return {number}
   */

  function hash(value, length) {
    return (((length << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3);
  }
  /**
   * @param {string} value
   * @return {string}
   */

  function trim(value) {
    return value.trim();
  }
  /**
   * @param {string} value
   * @param {RegExp} pattern
   * @return {string?}
   */

  function match(value, pattern) {
    return (value = pattern.exec(value)) ? value[0] : value;
  }
  /**
   * @param {string} value
   * @param {(string|RegExp)} pattern
   * @param {string} replacement
   * @return {string}
   */

  function replace(value, pattern, replacement) {
    return value.replace(pattern, replacement);
  }
  /**
   * @param {string} value
   * @param {string} value
   * @return {number}
   */

  function indexof(value, search) {
    return value.indexOf(search);
  }
  /**
   * @param {string} value
   * @param {number} index
   * @return {number}
   */

  function charat(value, index) {
    return value.charCodeAt(index) | 0;
  }
  /**
   * @param {string} value
   * @param {number} begin
   * @param {number} end
   * @return {string}
   */

  function substr(value, begin, end) {
    return value.slice(begin, end);
  }
  /**
   * @param {string} value
   * @return {number}
   */

  function strlen(value) {
    return value.length;
  }
  /**
   * @param {any[]} value
   * @return {number}
   */

  function sizeof(value) {
    return value.length;
  }
  /**
   * @param {any} value
   * @param {any[]} array
   * @return {any}
   */

  function append(value, array) {
    return array.push(value), value;
  }
  /**
   * @param {string[]} array
   * @param {function} callback
   * @return {string}
   */

  function combine(array, callback) {
    return array.map(callback).join('');
  }

  var line = 1;
  var column = 1;
  var length = 0;
  var position$1 = 0;
  var character = 0;
  var characters = '';
  /**
   * @param {string} value
   * @param {object} root
   * @param {object?} parent
   * @param {string} type
   * @param {string[]} props
   * @param {object[]} children
   * @param {number} length
   */

  function node(value, root, parent, type, props, children, length) {
    return {
      value: value,
      root: root,
      parent: parent,
      type: type,
      props: props,
      children: children,
      line: line,
      column: column,
      length: length,
      return: ''
    };
  }
  /**
   * @param {string} value
   * @param {object} root
   * @param {string} type
   */

  function copy(value, root, type) {
    return node(value, root.root, root.parent, type, root.props, root.children, 0);
  }
  /**
   * @return {number}
   */

  function char() {
    return character;
  }
  /**
   * @return {number}
   */

  function prev() {
    character = position$1 > 0 ? charat(characters, --position$1) : 0;
    if (column--, character === 10) column = 1, line--;
    return character;
  }
  /**
   * @return {number}
   */

  function next() {
    character = position$1 < length ? charat(characters, position$1++) : 0;
    if (column++, character === 10) column = 1, line++;
    return character;
  }
  /**
   * @return {number}
   */

  function peek() {
    return charat(characters, position$1);
  }
  /**
   * @return {number}
   */

  function caret() {
    return position$1;
  }
  /**
   * @param {number} begin
   * @param {number} end
   * @return {string}
   */

  function slice(begin, end) {
    return substr(characters, begin, end);
  }
  /**
   * @param {number} type
   * @return {number}
   */

  function token(type) {
    switch (type) {
      // \0 \t \n \r \s whitespace token
      case 0:
      case 9:
      case 10:
      case 13:
      case 32:
        return 5;
      // ! + , / > @ ~ isolate token

      case 33:
      case 43:
      case 44:
      case 47:
      case 62:
      case 64:
      case 126: // ; { } breakpoint token

      case 59:
      case 123:
      case 125:
        return 4;
      // : accompanied token

      case 58:
        return 3;
      // " ' ( [ opening delimit token

      case 34:
      case 39:
      case 40:
      case 91:
        return 2;
      // ) ] closing delimit token

      case 41:
      case 93:
        return 1;
    }

    return 0;
  }
  /**
   * @param {string} value
   * @return {any[]}
   */

  function alloc(value) {
    return line = column = 1, length = strlen(characters = value), position$1 = 0, [];
  }
  /**
   * @param {any} value
   * @return {any}
   */

  function dealloc(value) {
    return characters = '', value;
  }
  /**
   * @param {number} type
   * @return {string}
   */

  function delimit(type) {
    return trim(slice(position$1 - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
  }
  /**
   * @param {number} type
   * @return {string}
   */

  function whitespace(type) {
    while (character = peek()) if (character < 33) next();else break;

    return token(type) > 2 || token(character) > 3 ? '' : ' ';
  }
  /**
   * @param {number} index
   * @param {number} count
   * @return {string}
   */

  function escaping(index, count) {
    while (--count && next()) // not 0-9 A-F a-f
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97) break;

    return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
  }
  /**
   * @param {number} type
   * @return {number}
   */

  function delimiter(type) {
    while (next()) switch (character) {
      // ] ) " '
      case type:
        return position$1;
      // " '

      case 34:
      case 39:
        return delimiter(type === 34 || type === 39 ? type : character);
      // (

      case 40:
        if (type === 41) delimiter(type);
        break;
      // \

      case 92:
        next();
        break;
    }

    return position$1;
  }
  /**
   * @param {number} type
   * @param {number} index
   * @return {number}
   */

  function commenter(type, index) {
    while (next()) // //
    if (type + character === 47 + 10) break; // /*
    else if (type + character === 42 + 42 && peek() === 47) break;

    return '/*' + slice(index, position$1 - 1) + '*' + from(type === 47 ? type : next());
  }
  /**
   * @param {number} index
   * @return {string}
   */

  function identifier(index) {
    while (!token(peek())) next();

    return slice(index, position$1);
  }

  /**
   * @param {string} value
   * @return {object[]}
   */

  function compile(value) {
    return dealloc(parse$1('', null, null, null, [''], value = alloc(value), 0, [0], value));
  }
  /**
   * @param {string} value
   * @param {object} root
   * @param {object?} parent
   * @param {string[]} rule
   * @param {string[]} rules
   * @param {string[]} rulesets
   * @param {number[]} pseudo
   * @param {number[]} points
   * @param {string[]} declarations
   * @return {object}
   */

  function parse$1(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
    var index = 0;
    var offset = 0;
    var length = pseudo;
    var atrule = 0;
    var property = 0;
    var previous = 0;
    var variable = 1;
    var scanning = 1;
    var ampersand = 1;
    var character = 0;
    var type = '';
    var props = rules;
    var children = rulesets;
    var reference = rule;
    var characters = type;

    while (scanning) switch (previous = character, character = next()) {
      // " ' [ (
      case 34:
      case 39:
      case 91:
      case 40:
        characters += delimit(character);
        break;
      // \t \n \r \s

      case 9:
      case 10:
      case 13:
      case 32:
        characters += whitespace(previous);
        break;
      // \

      case 92:
        characters += escaping(caret() - 1, 7);
        continue;
      // /

      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent), declarations);
            break;

          default:
            characters += '/';
        }

        break;
      // {

      case 123 * variable:
        points[index++] = strlen(characters) * ampersand;
      // } ; \0

      case 125 * variable:
      case 59:
      case 0:
        switch (character) {
          // \0 }
          case 0:
          case 125:
            scanning = 0;
          // ;

          case 59 + offset:
            if (property > 0 && strlen(characters) - length) append(property > 32 ? declaration(characters + ';', rule, parent, length - 1) : declaration(replace(characters, ' ', '') + ';', rule, parent, length - 2), declarations);
            break;
          // @ ;

          case 59:
            characters += ';';
          // { rule/at-rule

          default:
            append(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length), rulesets);
            if (character === 123) if (offset === 0) parse$1(characters, root, reference, reference, props, rulesets, length, points, children);else switch (atrule) {
              // d m s
              case 100:
              case 109:
              case 115:
                parse$1(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length), children), rules, children, length, points, rule ? props : children);
                break;

              default:
                parse$1(characters, reference, reference, reference, [''], children, length, points, children);
            }
        }

        index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo;
        break;
      // :

      case 58:
        length = 1 + strlen(characters), property = previous;

      default:
        if (variable < 1) if (character == 123) --variable;else if (character == 125 && variable++ == 0 && prev() == 125) continue;

        switch (characters += from(character), character * variable) {
          // &
          case 38:
            ampersand = offset > 0 ? 1 : (characters += '\f', -1);
            break;
          // ,

          case 44:
            points[index++] = (strlen(characters) - 1) * ampersand, ampersand = 1;
            break;
          // @

          case 64:
            // -
            if (peek() === 45) characters += delimit(next());
            atrule = peek(), offset = strlen(type = characters += identifier(caret())), character++;
            break;
          // -

          case 45:
            if (previous === 45 && strlen(characters) == 2) variable = 0;
        }

    }

    return rulesets;
  }
  /**
   * @param {string} value
   * @param {object} root
   * @param {object?} parent
   * @param {number} index
   * @param {number} offset
   * @param {string[]} rules
   * @param {number[]} points
   * @param {string} type
   * @param {string[]} props
   * @param {string[]} children
   * @param {number} length
   * @return {object}
   */

  function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length) {
    var post = offset - 1;
    var rule = offset === 0 ? rules : [''];
    var size = sizeof(rule);

    for (var i = 0, j = 0, k = 0; i < index; ++i) for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x) if (z = trim(j > 0 ? rule[x] + ' ' + y : replace(y, /&\f/g, rule[x]))) props[k++] = z;

    return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length);
  }
  /**
   * @param {number} value
   * @param {object} root
   * @param {object?} parent
   * @return {object}
   */

  function comment(value, root, parent) {
    return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
  }
  /**
   * @param {string} value
   * @param {object} root
   * @param {object?} parent
   * @param {number} length
   * @return {object}
   */

  function declaration(value, root, parent, length) {
    return node(value, root, parent, DECLARATION, substr(value, 0, length), substr(value, length + 1, -1), length);
  }

  /**
   * @param {string} value
   * @param {number} length
   * @return {string}
   */

  function prefix$1(value, length) {
    switch (hash(value, length)) {
      // color-adjust
      case 5103:
        return WEBKIT + 'print-' + value + value;
      // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)

      case 5737:
      case 4201:
      case 3177:
      case 3433:
      case 1641:
      case 4457:
      case 2921: // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break

      case 5572:
      case 6356:
      case 5844:
      case 3191:
      case 6645:
      case 3005: // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,

      case 6391:
      case 5879:
      case 5623:
      case 6135:
      case 4599:
      case 4855: // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)

      case 4215:
      case 6389:
      case 5109:
      case 5365:
      case 5621:
      case 3829:
        return WEBKIT + value + value;
      // appearance, user-select, transform, hyphens, text-size-adjust

      case 5349:
      case 4246:
      case 4810:
      case 6968:
      case 2756:
        return WEBKIT + value + MOZ + value + MS + value + value;
      // flex, flex-direction

      case 6828:
      case 4268:
        return WEBKIT + value + MS + value + value;
      // order

      case 6165:
        return WEBKIT + value + MS + 'flex-' + value + value;
      // align-items

      case 5187:
        return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + 'box-$1$2' + MS + 'flex-$1$2') + value;
      // align-self

      case 5443:
        return WEBKIT + value + MS + 'flex-item-' + replace(value, /flex-|-self/, '') + value;
      // align-content

      case 4675:
        return WEBKIT + value + MS + 'flex-line-pack' + replace(value, /align-content|flex-|-self/, '') + value;
      // flex-shrink

      case 5548:
        return WEBKIT + value + MS + replace(value, 'shrink', 'negative') + value;
      // flex-basis

      case 5292:
        return WEBKIT + value + MS + replace(value, 'basis', 'preferred-size') + value;
      // flex-grow

      case 6060:
        return WEBKIT + 'box-' + replace(value, '-grow', '') + WEBKIT + value + MS + replace(value, 'grow', 'positive') + value;
      // transition

      case 4554:
        return WEBKIT + replace(value, /([^-])(transform)/g, '$1' + WEBKIT + '$2') + value;
      // cursor

      case 6187:
        return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + '$1'), /(image-set)/, WEBKIT + '$1'), value, '') + value;
      // background, background-image

      case 5495:
      case 3959:
        return replace(value, /(image-set\([^]*)/, WEBKIT + '$1' + '$`$1');
      // justify-content

      case 4968:
        return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + 'box-pack:$3' + MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + WEBKIT + value + value;
      // (margin|padding)-inline-(start|end)

      case 4095:
      case 3583:
      case 4068:
      case 2532:
        return replace(value, /(.+)-inline(.+)/, WEBKIT + '$1$2') + value;
      // (min|max)?(width|height|inline-size|block-size)

      case 8116:
      case 7059:
      case 5753:
      case 5535:
      case 5445:
      case 5701:
      case 4933:
      case 4677:
      case 5533:
      case 5789:
      case 5021:
      case 4765:
        // stretch, max-content, min-content, fill-available
        if (strlen(value) - 1 - length > 6) switch (charat(value, length + 1)) {
          // (m)ax-content, (m)in-content
          case 109:
            // -
            if (charat(value, length + 4) !== 45) break;
          // (f)ill-available, (f)it-content

          case 102:
            return replace(value, /(.+:)(.+)-([^]+)/, '$1' + WEBKIT + '$2-$3' + '$1' + MOZ + (charat(value, length + 3) == 108 ? '$3' : '$2-$3')) + value;
          // (s)tretch

          case 115:
            return ~indexof(value, 'stretch') ? prefix$1(replace(value, 'stretch', 'fill-available'), length) + value : value;
        }
        break;
      // position: sticky

      case 4949:
        // (s)ticky?
        if (charat(value, length + 1) !== 115) break;
      // display: (flex|inline-flex)

      case 6444:
        switch (charat(value, strlen(value) - 3 - (~indexof(value, '!important') && 10))) {
          // stic(k)y
          case 107:
            return replace(value, ':', ':' + WEBKIT) + value;
          // (inline-)?fl(e)x

          case 101:
            return replace(value, /(.+:)([^;!]+)(;|!.+)?/, '$1' + WEBKIT + (charat(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + WEBKIT + '$2$3' + '$1' + MS + '$2box$3') + value;
        }

        break;
      // writing-mode

      case 5936:
        switch (charat(value, length + 11)) {
          // vertical-l(r)
          case 114:
            return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb') + value;
          // vertical-r(l)

          case 108:
            return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value;
          // horizontal(-)tb

          case 45:
            return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'lr') + value;
        }

        return WEBKIT + value + MS + value + value;
    }

    return value;
  }

  /**
   * @param {object[]} children
   * @param {function} callback
   * @return {string}
   */

  function serialize(children, callback) {
    var output = '';
    var length = sizeof(children);

    for (var i = 0; i < length; i++) output += callback(children[i], i, children, callback) || '';

    return output;
  }
  /**
   * @param {object} element
   * @param {number} index
   * @param {object[]} children
   * @param {function} callback
   * @return {string}
   */

  function stringify(element, index, children, callback) {
    switch (element.type) {
      case IMPORT:
      case DECLARATION:
        return element.return = element.return || element.value;

      case COMMENT:
        return '';

      case RULESET:
        element.value = element.props.join(',');
    }

    return strlen(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : '';
  }

  /**
   * @param {function[]} collection
   * @return {function}
   */

  function middleware(collection) {
    var length = sizeof(collection);
    return function (element, index, children, callback) {
      var output = '';

      for (var i = 0; i < length; i++) output += collection[i](element, index, children, callback) || '';

      return output;
    };
  }
  /**
   * @param {function} callback
   * @return {function}
   */

  function rulesheet(callback) {
    return function (element) {
      if (!element.root) if (element = element.return) callback(element);
    };
  }
  /**
   * @param {object} element
   * @param {number} index
   * @param {object[]} children
   * @param {function} callback
   */

  function prefixer(element, index, children, callback) {
    if (!element.return) switch (element.type) {
      case DECLARATION:
        element.return = prefix$1(element.value, element.length);
        break;

      case KEYFRAMES:
        return serialize([copy(replace(element.value, '@', '@' + WEBKIT), element, '')], callback);

      case RULESET:
        if (element.length) return combine(element.props, function (value) {
          switch (match(value, /(::plac\w+|:read-\w+)/)) {
            // :read-(only|write)
            case ':read-only':
            case ':read-write':
              return serialize([copy(replace(value, /:(read-\w+)/, ':' + MOZ + '$1'), element, '')], callback);
            // :placeholder

            case '::placeholder':
              return serialize([copy(replace(value, /:(plac\w+)/, ':' + WEBKIT + 'input-$1'), element, ''), copy(replace(value, /:(plac\w+)/, ':' + MOZ + '$1'), element, ''), copy(replace(value, /:(plac\w+)/, MS + 'input-$1'), element, '')], callback);
          }

          return '';
        });
    }
  }

  var weakMemoize = function weakMemoize(func) {
    // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
    var cache = new WeakMap();
    return function (arg) {
      if (cache.has(arg)) {
        // $FlowFixMe
        return cache.get(arg);
      }

      var ret = func(arg);
      cache.set(arg, ret);
      return ret;
    };
  };

  function memoize$1(fn) {
    var cache = Object.create(null);
    return function (arg) {
      if (cache[arg] === undefined) cache[arg] = fn(arg);
      return cache[arg];
    };
  }

  var toRules = function toRules(parsed, points) {
    // pretend we've started with a comma
    var index = -1;
    var character = 44;

    do {
      switch (token(character)) {
        case 0:
          // &\f
          if (character === 38 && peek() === 12) {
            // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
            // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
            // and when it should just concatenate the outer and inner selectors
            // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
            points[index] = 1;
          }

          parsed[index] += identifier(position$1 - 1);
          break;

        case 2:
          parsed[index] += delimit(character);
          break;

        case 4:
          // comma
          if (character === 44) {
            // colon
            parsed[++index] = peek() === 58 ? '&\f' : '';
            points[index] = parsed[index].length;
            break;
          }

        // fallthrough

        default:
          parsed[index] += from(character);
      }
    } while (character = next());

    return parsed;
  };

  var getRules = function getRules(value, points) {
    return dealloc(toRules(alloc(value), points));
  }; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


  var fixedElements = /* #__PURE__ */new WeakMap();

  var compat = function compat(element) {
    if (element.type !== 'rule' || !element.parent || // .length indicates if this rule contains pseudo or not
    !element.length) {
      return;
    }

    var value = element.value,
        parent = element.parent;
    var isImplicitRule = element.column === parent.column && element.line === parent.line;

    while (parent.type !== 'rule') {
      parent = parent.parent;
      if (!parent) return;
    } // short-circuit for the simplest case


    if (element.props.length === 1 && value.charCodeAt(0) !== 58
    /* colon */
    && !fixedElements.get(parent)) {
      return;
    } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
    // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


    if (isImplicitRule) {
      return;
    }

    fixedElements.set(element, true);
    var points = [];
    var rules = getRules(value, points);
    var parentRules = parent.props;

    for (var i = 0, k = 0; i < rules.length; i++) {
      for (var j = 0; j < parentRules.length; j++, k++) {
        element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
      }
    }
  };

  var removeLabel = function removeLabel(element) {
    if (element.type === 'decl') {
      var value = element.value;

      if ( // charcode for l
      value.charCodeAt(0) === 108 && // charcode for b
      value.charCodeAt(2) === 98) {
        // this ignores label
        element["return"] = '';
        element.value = '';
      }
    }
  };

  var isBrowser$4 = typeof document !== 'undefined';
  var getServerStylisCache = isBrowser$4 ? undefined : weakMemoize(function () {
    return memoize$1(function () {
      var cache = {};
      return function (name) {
        return cache[name];
      };
    });
  });
  var defaultStylisPlugins = [prefixer];

  var createCache = function createCache(options) {
    var key = options.key;

    if (isBrowser$4 && key === 'css') {
      var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
      // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
      // note this very very intentionally targets all style elements regardless of the key to ensure
      // that creating a cache works inside of render of a React component

      Array.prototype.forEach.call(ssrStyles, function (node) {
        // we want to only move elements which have a space in the data-emotion attribute value
        // because that indicates that it is an Emotion 11 server-side rendered style elements
        // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
        // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
        // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
        // will not result in the Emotion 10 styles being destroyed
        var dataEmotionAttribute = node.getAttribute('data-emotion');

        if (dataEmotionAttribute.indexOf(' ') === -1) {
          return;
        }

        document.head.appendChild(node);
        node.setAttribute('data-s', '');
      });
    }

    var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

    var inserted = {}; // $FlowFixMe

    var container;
    var nodesToHydrate = [];

    if (isBrowser$4) {
      container = options.container || document.head;
      Array.prototype.forEach.call( // this means we will ignore elements which don't have a space in them which
      // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
      document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node) {
        var attrib = node.getAttribute("data-emotion").split(' '); // $FlowFixMe

        for (var i = 1; i < attrib.length; i++) {
          inserted[attrib[i]] = true;
        }

        nodesToHydrate.push(node);
      });
    }

    var _insert;

    var omnipresentPlugins = [compat, removeLabel];

    if (isBrowser$4) {
      var currentSheet;
      var finalizingPlugins = [stringify, rulesheet(function (rule) {
        currentSheet.insert(rule);
      })];
      var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

      var stylis = function stylis(styles) {
        return serialize(compile(styles), serializer);
      };

      _insert = function insert(selector, serialized, sheet, shouldCache) {
        currentSheet = sheet;

        stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

        if (shouldCache) {
          cache.inserted[serialized.name] = true;
        }
      };
    } else {
      var _finalizingPlugins = [stringify];

      var _serializer = middleware(omnipresentPlugins.concat(stylisPlugins, _finalizingPlugins));

      var _stylis = function _stylis(styles) {
        return serialize(compile(styles), _serializer);
      }; // $FlowFixMe


      var serverStylisCache = getServerStylisCache(stylisPlugins)(key);

      var getRules = function getRules(selector, serialized) {
        var name = serialized.name;

        if (serverStylisCache[name] === undefined) {
          serverStylisCache[name] = _stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
        }

        return serverStylisCache[name];
      };

      _insert = function _insert(selector, serialized, sheet, shouldCache) {
        var name = serialized.name;
        var rules = getRules(selector, serialized);

        if (cache.compat === undefined) {
          // in regular mode, we don't set the styles on the inserted cache
          // since we don't need to and that would be wasting memory
          // we return them so that they are rendered in a style tag
          if (shouldCache) {
            cache.inserted[name] = true;
          }

          return rules;
        } else {
          // in compat mode, we put the styles on the inserted cache so
          // that emotion-server can pull out the styles
          // except when we don't want to cache it which was in Global but now
          // is nowhere but we don't want to do a major right now
          // and just in case we're going to leave the case here
          // it's also not affecting client side bundle size
          // so it's really not a big deal
          if (shouldCache) {
            cache.inserted[name] = rules;
          } else {
            return rules;
          }
        }
      };
    }

    var cache = {
      key: key,
      sheet: new StyleSheet({
        key: key,
        container: container,
        nonce: options.nonce,
        speedy: options.speedy,
        prepend: options.prepend
      }),
      nonce: options.nonce,
      inserted: inserted,
      registered: {},
      insert: _insert
    };
    cache.sheet.hydrate(nodesToHydrate);
    return cache;
  };

  function _extends$y() {
    _extends$y = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$y.apply(this, arguments);
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var reactIs$1 = {exports: {}};

  var reactIs_production_min = {};

  /** @license React v16.13.1
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var b = "function" === typeof Symbol && Symbol.for,
      c = b ? Symbol.for("react.element") : 60103,
      d = b ? Symbol.for("react.portal") : 60106,
      e = b ? Symbol.for("react.fragment") : 60107,
      f = b ? Symbol.for("react.strict_mode") : 60108,
      g = b ? Symbol.for("react.profiler") : 60114,
      h = b ? Symbol.for("react.provider") : 60109,
      k = b ? Symbol.for("react.context") : 60110,
      l = b ? Symbol.for("react.async_mode") : 60111,
      m = b ? Symbol.for("react.concurrent_mode") : 60111,
      n = b ? Symbol.for("react.forward_ref") : 60112,
      p = b ? Symbol.for("react.suspense") : 60113,
      q = b ? Symbol.for("react.suspense_list") : 60120,
      r = b ? Symbol.for("react.memo") : 60115,
      t$1 = b ? Symbol.for("react.lazy") : 60116,
      v = b ? Symbol.for("react.block") : 60121,
      w = b ? Symbol.for("react.fundamental") : 60117,
      x = b ? Symbol.for("react.responder") : 60118,
      y = b ? Symbol.for("react.scope") : 60119;

  function z(a) {
    if ("object" === typeof a && null !== a) {
      var u = a.$$typeof;

      switch (u) {
        case c:
          switch (a = a.type, a) {
            case l:
            case m:
            case e:
            case g:
            case f:
            case p:
              return a;

            default:
              switch (a = a && a.$$typeof, a) {
                case k:
                case n:
                case t$1:
                case r:
                case h:
                  return a;

                default:
                  return u;
              }

          }

        case d:
          return u;
      }
    }
  }

  function A(a) {
    return z(a) === m;
  }

  reactIs_production_min.AsyncMode = l;
  reactIs_production_min.ConcurrentMode = m;
  reactIs_production_min.ContextConsumer = k;
  reactIs_production_min.ContextProvider = h;
  reactIs_production_min.Element = c;
  reactIs_production_min.ForwardRef = n;
  reactIs_production_min.Fragment = e;
  reactIs_production_min.Lazy = t$1;
  reactIs_production_min.Memo = r;
  reactIs_production_min.Portal = d;
  reactIs_production_min.Profiler = g;
  reactIs_production_min.StrictMode = f;
  reactIs_production_min.Suspense = p;

  reactIs_production_min.isAsyncMode = function (a) {
    return A(a) || z(a) === l;
  };

  reactIs_production_min.isConcurrentMode = A;

  reactIs_production_min.isContextConsumer = function (a) {
    return z(a) === k;
  };

  reactIs_production_min.isContextProvider = function (a) {
    return z(a) === h;
  };

  reactIs_production_min.isElement = function (a) {
    return "object" === typeof a && null !== a && a.$$typeof === c;
  };

  reactIs_production_min.isForwardRef = function (a) {
    return z(a) === n;
  };

  reactIs_production_min.isFragment = function (a) {
    return z(a) === e;
  };

  reactIs_production_min.isLazy = function (a) {
    return z(a) === t$1;
  };

  reactIs_production_min.isMemo = function (a) {
    return z(a) === r;
  };

  reactIs_production_min.isPortal = function (a) {
    return z(a) === d;
  };

  reactIs_production_min.isProfiler = function (a) {
    return z(a) === g;
  };

  reactIs_production_min.isStrictMode = function (a) {
    return z(a) === f;
  };

  reactIs_production_min.isSuspense = function (a) {
    return z(a) === p;
  };

  reactIs_production_min.isValidElementType = function (a) {
    return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t$1 || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
  };

  reactIs_production_min.typeOf = z;

  {
    reactIs$1.exports = reactIs_production_min;
  }

  var reactIs = reactIs$1.exports;
  var FORWARD_REF_STATICS = {
    '$$typeof': true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
  };
  var MEMO_STATICS = {
    '$$typeof': true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
  };
  var TYPE_STATICS = {};
  TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
  TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

  var isBrowser$3 = typeof document !== 'undefined';

  function getRegisteredStyles(registered, registeredStyles, classNames) {
    var rawClassName = '';
    classNames.split(' ').forEach(function (className) {
      if (registered[className] !== undefined) {
        registeredStyles.push(registered[className] + ";");
      } else {
        rawClassName += className + " ";
      }
    });
    return rawClassName;
  }

  var insertStyles = function insertStyles(cache, serialized, isStringTag) {
    var className = cache.key + "-" + serialized.name;

    if ( // we only need to add the styles to the registered cache if the
    // class name could be used further down
    // the tree but if it's a string tag, we know it won't
    // so we don't have to add it to registered cache.
    // this improves memory usage since we can avoid storing the whole style string
    (isStringTag === false || // we need to always store it if we're in compat mode and
    // in node since emotion-server relies on whether a style is in
    // the registered cache to know whether a style is global or not
    // also, note that this check will be dead code eliminated in the browser
    isBrowser$3 === false && cache.compat !== undefined) && cache.registered[className] === undefined) {
      cache.registered[className] = serialized.styles;
    }

    if (cache.inserted[serialized.name] === undefined) {
      var stylesForSSR = '';
      var current = serialized;

      do {
        var maybeStyles = cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);

        if (!isBrowser$3 && maybeStyles !== undefined) {
          stylesForSSR += maybeStyles;
        }

        current = current.next;
      } while (current !== undefined);

      if (!isBrowser$3 && stylesForSSR.length !== 0) {
        return stylesForSSR;
      }
    }
  };

  /* eslint-disable */
  // Inspired by https://github.com/garycourt/murmurhash-js
  // Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
  function murmur2(str) {
    // 'm' and 'r' are mixing constants generated offline.
    // They're not really 'magic', they just happen to work well.
    // const m = 0x5bd1e995;
    // const r = 24;
    // Initialize the hash
    var h = 0; // Mix 4 bytes at a time into the hash

    var k,
        i = 0,
        len = str.length;

    for (; len >= 4; ++i, len -= 4) {
      k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
      k =
      /* Math.imul(k, m): */
      (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
      k ^=
      /* k >>> r: */
      k >>> 24;
      h =
      /* Math.imul(k, m): */
      (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
    } // Handle the last few bytes of the input array


    switch (len) {
      case 3:
        h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

      case 2:
        h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

      case 1:
        h ^= str.charCodeAt(i) & 0xff;
        h =
        /* Math.imul(h, m): */
        (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
    } // Do a few final mixes of the hash to ensure the last few
    // bytes are well-incorporated.


    h ^= h >>> 13;
    h =
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
    return ((h ^ h >>> 15) >>> 0).toString(36);
  }

  var unitlessKeys = {
    animationIterationCount: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    // SVG-related properties
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1
  };

  var hyphenateRegex = /[A-Z]|^ms/g;
  var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

  var isCustomProperty = function isCustomProperty(property) {
    return property.charCodeAt(1) === 45;
  };

  var isProcessableValue = function isProcessableValue(value) {
    return value != null && typeof value !== 'boolean';
  };

  var processStyleName = /* #__PURE__ */memoize$1(function (styleName) {
    return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
  });

  var processStyleValue = function processStyleValue(key, value) {
    switch (key) {
      case 'animation':
      case 'animationName':
        {
          if (typeof value === 'string') {
            return value.replace(animationRegex, function (match, p1, p2) {
              cursor = {
                name: p1,
                styles: p2,
                next: cursor
              };
              return p1;
            });
          }
        }
    }

    if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
      return value + 'px';
    }

    return value;
  };

  function handleInterpolation(mergedProps, registered, interpolation) {
    if (interpolation == null) {
      return '';
    }

    if (interpolation.__emotion_styles !== undefined) {

      return interpolation;
    }

    switch (typeof interpolation) {
      case 'boolean':
        {
          return '';
        }

      case 'object':
        {
          if (interpolation.anim === 1) {
            cursor = {
              name: interpolation.name,
              styles: interpolation.styles,
              next: cursor
            };
            return interpolation.name;
          }

          if (interpolation.styles !== undefined) {
            var next = interpolation.next;

            if (next !== undefined) {
              // not the most efficient thing ever but this is a pretty rare case
              // and there will be very few iterations of this generally
              while (next !== undefined) {
                cursor = {
                  name: next.name,
                  styles: next.styles,
                  next: cursor
                };
                next = next.next;
              }
            }

            var styles = interpolation.styles + ";";

            return styles;
          }

          return createStringFromObject(mergedProps, registered, interpolation);
        }

      case 'function':
        {
          if (mergedProps !== undefined) {
            var previousCursor = cursor;
            var result = interpolation(mergedProps);
            cursor = previousCursor;
            return handleInterpolation(mergedProps, registered, result);
          }

          break;
        }
    } // finalize string values (regular strings and functions interpolated into css calls)


    if (registered == null) {
      return interpolation;
    }

    var cached = registered[interpolation];
    return cached !== undefined ? cached : interpolation;
  }

  function createStringFromObject(mergedProps, registered, obj) {
    var string = '';

    if (Array.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
      }
    } else {
      for (var _key in obj) {
        var value = obj[_key];

        if (typeof value !== 'object') {
          if (registered != null && registered[value] !== undefined) {
            string += _key + "{" + registered[value] + "}";
          } else if (isProcessableValue(value)) {
            string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
          }
        } else {
          if (_key === 'NO_COMPONENT_SELECTOR' && "production" !== 'production') {
            throw new Error('Component selectors can only be used in conjunction with @emotion/babel-plugin.');
          }

          if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
            for (var _i = 0; _i < value.length; _i++) {
              if (isProcessableValue(value[_i])) {
                string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
              }
            }
          } else {
            var interpolated = handleInterpolation(mergedProps, registered, value);

            switch (_key) {
              case 'animation':
              case 'animationName':
                {
                  string += processStyleName(_key) + ":" + interpolated + ";";
                  break;
                }

              default:
                {

                  string += _key + "{" + interpolated + "}";
                }
            }
          }
        }
      }
    }

    return string;
  }

  var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
  // keyframes are stored on the SerializedStyles object as a linked list


  var cursor;

  var serializeStyles = function serializeStyles(args, registered, mergedProps) {
    if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
      return args[0];
    }

    var stringMode = true;
    var styles = '';
    cursor = undefined;
    var strings = args[0];

    if (strings == null || strings.raw === undefined) {
      stringMode = false;
      styles += handleInterpolation(mergedProps, registered, strings);
    } else {

      styles += strings[0];
    } // we start at 1 since we've already handled the first arg


    for (var i = 1; i < args.length; i++) {
      styles += handleInterpolation(mergedProps, registered, args[i]);

      if (stringMode) {

        styles += strings[i];
      }
    }


    labelPattern.lastIndex = 0;
    var identifierName = '';
    var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

    while ((match = labelPattern.exec(styles)) !== null) {
      identifierName += '-' + // $FlowFixMe we know it's not null
      match[1];
    }

    var name = murmur2(styles) + identifierName;

    return {
      name: name,
      styles: styles,
      next: cursor
    };
  };

  var isBrowser$2 = typeof document !== 'undefined';
  var EmotionCacheContext = /* #__PURE__ */React.createContext( // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement !== 'undefined' ? /* #__PURE__ */createCache({
    key: 'css'
  }) : null);
  var CacheProvider = EmotionCacheContext.Provider;

  var withEmotionCache = function withEmotionCache(func) {
    // $FlowFixMe
    return /*#__PURE__*/React.forwardRef(function (props, ref) {
      // the cache will never be null in the browser
      var cache = React.useContext(EmotionCacheContext);
      return func(props, cache, ref);
    });
  };

  if (!isBrowser$2) {
    withEmotionCache = function withEmotionCache(func) {
      return function (props) {
        var cache = React.useContext(EmotionCacheContext);

        if (cache === null) {
          // yes, we're potentially creating this on every render
          // it doesn't actually matter though since it's only on the server
          // so there will only every be a single render
          // that could change in the future because of suspense and etc. but for now,
          // this works and i don't want to optimise for a future thing that we aren't sure about
          cache = createCache({
            key: 'css'
          });
          return /*#__PURE__*/React.createElement(EmotionCacheContext.Provider, {
            value: cache
          }, func(props, cache));
        } else {
          return func(props, cache);
        }
      };
    };
  }

  var ThemeContext = /* #__PURE__ */React.createContext({});

  var getTheme = function getTheme(outerTheme, theme) {
    if (typeof theme === 'function') {
      var mergedTheme = theme(outerTheme);

      return mergedTheme;
    }

    return _extends$y({}, outerTheme, theme);
  };

  var createCacheWithTheme = /* #__PURE__ */weakMemoize(function (outerTheme) {
    return weakMemoize(function (theme) {
      return getTheme(outerTheme, theme);
    });
  });

  var ThemeProvider$1 = function ThemeProvider(props) {
    var theme = React.useContext(ThemeContext);

    if (props.theme !== theme) {
      theme = createCacheWithTheme(theme)(props.theme);
    }

    return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
      value: theme
    }, props.children);
  };

  // initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
  // initial client-side render from SSR, use place of hydrating tag

  var Global = /* #__PURE__ */withEmotionCache(function (props, cache) {

    var styles = props.styles;
    var serialized = serializeStyles([styles], undefined, typeof styles === 'function' || Array.isArray(styles) ? React.useContext(ThemeContext) : undefined);

    if (!isBrowser$2) {
      var _ref;

      var serializedNames = serialized.name;
      var serializedStyles = serialized.styles;
      var next = serialized.next;

      while (next !== undefined) {
        serializedNames += ' ' + next.name;
        serializedStyles += next.styles;
        next = next.next;
      }

      var shouldCache = cache.compat === true;
      var rules = cache.insert("", {
        name: serializedNames,
        styles: serializedStyles
      }, cache.sheet, shouldCache);

      if (shouldCache) {
        return null;
      }

      return /*#__PURE__*/React.createElement("style", (_ref = {}, _ref["data-emotion"] = cache.key + "-global " + serializedNames, _ref.dangerouslySetInnerHTML = {
        __html: rules
      }, _ref.nonce = cache.sheet.nonce, _ref));
    } // yes, i know these hooks are used conditionally
    // but it is based on a constant that will never change at runtime
    // it's effectively like having two implementations and switching them out
    // so it's not actually breaking anything


    var sheetRef = React.useRef();
    React.useLayoutEffect(function () {
      var key = cache.key + "-global";
      var sheet = new StyleSheet({
        key: key,
        nonce: cache.sheet.nonce,
        container: cache.sheet.container,
        speedy: cache.sheet.isSpeedy
      });
      var rehydrating = false; // $FlowFixMe

      var node = document.querySelector("style[data-emotion=\"" + key + " " + serialized.name + "\"]");

      if (cache.sheet.tags.length) {
        sheet.before = cache.sheet.tags[0];
      }

      if (node !== null) {
        rehydrating = true; // clear the hash so this node won't be recognizable as rehydratable by other <Global/>s

        node.setAttribute('data-emotion', key);
        sheet.hydrate([node]);
      }

      sheetRef.current = [sheet, rehydrating];
      return function () {
        sheet.flush();
      };
    }, [cache]);
    React.useLayoutEffect(function () {
      var sheetRefCurrent = sheetRef.current;
      var sheet = sheetRefCurrent[0],
          rehydrating = sheetRefCurrent[1];

      if (rehydrating) {
        sheetRefCurrent[1] = false;
        return;
      }

      if (serialized.next !== undefined) {
        // insert keyframes
        insertStyles(cache, serialized.next, true);
      }

      if (sheet.tags.length) {
        // if this doesn't exist then it will be null so the style element will be appended
        var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
        sheet.before = element;
        sheet.flush();
      }

      cache.insert("", serialized, sheet, false);
    }, [cache, serialized.name]);
    return null;
  });

  function css$2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return serializeStyles(args);
  }

  var keyframes = function keyframes() {
    var insertable = css$2.apply(void 0, arguments);
    var name = "animation-" + insertable.name; // $FlowFixMe

    return {
      name: name,
      styles: "@keyframes " + name + "{" + insertable.styles + "}",
      anim: 1,
      toString: function toString() {
        return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
      }
    };
  };

  var CSSReset = () => /*#__PURE__*/React__namespace.createElement(Global, {
    styles: "\n      html {\n        line-height: 1.5;\n        -webkit-text-size-adjust: 100%;\n        font-family: system-ui, sans-serif;\n        -webkit-font-smoothing: antialiased;\n        text-rendering: optimizeLegibility;      \n        -moz-osx-font-smoothing: grayscale; \n        touch-action: manipulation; \n      }\n\n      body {\n        position: relative;\n        min-height: 100%;\n        font-feature-settings: 'kern';\n      }\n\n      *,\n      *::before,\n      *::after {\n        border-width: 0;\n        border-style: solid;\n        box-sizing: border-box;\n      }\n\n      main {\n        display: block;\n      }\n\n      hr {\n        border-top-width: 1px;\n        box-sizing: content-box;\n        height: 0;\n        overflow: visible;\n      }\n\n      pre,\n      code,\n      kbd,\n      samp {\n        font-family: SFMono-Regular,  Menlo, Monaco, Consolas, monospace;\n        font-size: 1em;\n      }\n\n      a {\n        background-color: transparent;\n        color: inherit;\n        text-decoration: inherit;\n      }\n\n      abbr[title] {\n        border-bottom: none;\n        text-decoration: underline;\n        -webkit-text-decoration: underline dotted;\n        text-decoration: underline dotted;\n      }\n\n      b,\n      strong {\n        font-weight: bold;\n      }\n\n      small {\n        font-size: 80%;\n      }\n\n      sub,\n      sup {\n        font-size: 75%;\n        line-height: 0;\n        position: relative;\n        vertical-align: baseline;\n      }\n\n      sub {\n        bottom: -0.25em;\n      }\n\n      sup {\n        top: -0.5em;\n      }\n\n      img {\n        border-style: none;\n      }\n\n      button,\n      input,\n      optgroup,\n      select,\n      textarea {\n        font-family: inherit;\n        font-size: 100%;\n        line-height: 1.15;\n        margin: 0;\n      }\n\n      button,\n      input {\n        overflow: visible;\n      }\n\n      button,\n      select {\n        text-transform: none;\n      }\n\n      button::-moz-focus-inner,\n      [type=\"button\"]::-moz-focus-inner,\n      [type=\"reset\"]::-moz-focus-inner,\n      [type=\"submit\"]::-moz-focus-inner {\n        border-style: none;\n        padding: 0;\n      }\n\n      fieldset {\n        padding: 0.35em 0.75em 0.625em;\n      }\n\n      legend {\n        box-sizing: border-box;\n        color: inherit;\n        display: table;\n        max-width: 100%;\n        padding: 0;\n        white-space: normal;\n      }\n\n      progress {\n        vertical-align: baseline;\n      }\n\n      textarea {\n        overflow: auto;\n      }\n\n      [type=\"checkbox\"],\n      [type=\"radio\"] {\n        box-sizing: border-box;\n        padding: 0;\n      }\n\n      [type=\"number\"]::-webkit-inner-spin-button,\n      [type=\"number\"]::-webkit-outer-spin-button {\n        -webkit-appearance: none !important;\n      }\n\n      input[type=\"number\"] {\n        -moz-appearance: textfield;\n      }\n\n      [type=\"search\"] {\n        -webkit-appearance: textfield;\n        outline-offset: -2px;\n      }\n\n      [type=\"search\"]::-webkit-search-decoration {\n        -webkit-appearance: none !important;\n      }\n\n      ::-webkit-file-upload-button {\n        -webkit-appearance: button;\n        font: inherit;\n      }\n\n      details {\n        display: block;\n      }\n\n      summary {\n        display: list-item;\n      }\n\n      template {\n        display: none;\n      }\n\n      [hidden] {\n        display: none !important;\n      }\n\n      body,\n      blockquote,\n      dl,\n      dd,\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6,\n      hr,\n      figure,\n      p,\n      pre {\n        margin: 0;\n      }\n\n      button {\n        background: transparent;\n        padding: 0;\n      }\n\n      fieldset {\n        margin: 0;\n        padding: 0;\n      }\n\n      ol,\n      ul {\n        margin: 0;\n        padding: 0;\n      }\n\n      textarea {\n        resize: vertical;\n      }\n\n      button,\n      [role=\"button\"] {\n        cursor: pointer;\n      }\n\n      button::-moz-focus-inner {\n        border: 0 !important;\n      }\n\n      table {\n        border-collapse: collapse;\n      }\n\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6 {\n        font-size: inherit;\n        font-weight: inherit;\n      }\n\n      button,\n      input,\n      optgroup,\n      select,\n      textarea {\n        padding: 0;\n        line-height: inherit;\n        color: inherit;\n      }\n\n      img,\n      svg,\n      video,\n      canvas,\n      audio,\n      iframe,\n      embed,\n      object {\n        display: block;\n        vertical-align: middle;\n      }\n\n      img,\n      video {\n        max-width: 100%;\n        height: auto;\n      }\n\n      [data-js-focus-visible] :focus:not([data-focus-visible-added]) {\n        outline: none;\n        box-shadow: none;\n      }\n\n      select::-ms-expand {\n        display: none;\n      }\n    "
  });
  var CSSReset$1 = CSSReset;

  var isProduction = "production" === 'production';
  var prefix = 'Invariant failed';

  function invariant(condition, message) {
    if (condition) {
      return;
    }

    if (isProduction) {
      throw new Error(prefix);
    }

    throw new Error(prefix + ": " + (message || ''));
  }

  var getRect = function getRect(_ref) {
    var top = _ref.top,
        right = _ref.right,
        bottom = _ref.bottom,
        left = _ref.left;
    var width = right - left;
    var height = bottom - top;
    var rect = {
      top: top,
      right: right,
      bottom: bottom,
      left: left,
      width: width,
      height: height,
      x: left,
      y: top,
      center: {
        x: (right + left) / 2,
        y: (bottom + top) / 2
      }
    };
    return rect;
  };

  var expand = function expand(target, expandBy) {
    return {
      top: target.top - expandBy.top,
      left: target.left - expandBy.left,
      bottom: target.bottom + expandBy.bottom,
      right: target.right + expandBy.right
    };
  };

  var shrink = function shrink(target, shrinkBy) {
    return {
      top: target.top + shrinkBy.top,
      left: target.left + shrinkBy.left,
      bottom: target.bottom - shrinkBy.bottom,
      right: target.right - shrinkBy.right
    };
  };

  var noSpacing = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

  var createBox = function createBox(_ref2) {
    var borderBox = _ref2.borderBox,
        _ref2$margin = _ref2.margin,
        margin = _ref2$margin === void 0 ? noSpacing : _ref2$margin,
        _ref2$border = _ref2.border,
        border = _ref2$border === void 0 ? noSpacing : _ref2$border,
        _ref2$padding = _ref2.padding,
        padding = _ref2$padding === void 0 ? noSpacing : _ref2$padding;
    var marginBox = getRect(expand(borderBox, margin));
    var paddingBox = getRect(shrink(borderBox, border));
    var contentBox = getRect(shrink(paddingBox, padding));
    return {
      marginBox: marginBox,
      borderBox: getRect(borderBox),
      paddingBox: paddingBox,
      contentBox: contentBox,
      margin: margin,
      border: border,
      padding: padding
    };
  };

  var parse = function parse(raw) {
    var value = raw.slice(0, -2);
    var suffix = raw.slice(-2);

    if (suffix !== 'px') {
      return 0;
    }

    var result = Number(value);
    !!isNaN(result) ? invariant(false) : void 0;
    return result;
  };

  var calculateBox = function calculateBox(borderBox, styles) {
    var margin = {
      top: parse(styles.marginTop),
      right: parse(styles.marginRight),
      bottom: parse(styles.marginBottom),
      left: parse(styles.marginLeft)
    };
    var padding = {
      top: parse(styles.paddingTop),
      right: parse(styles.paddingRight),
      bottom: parse(styles.paddingBottom),
      left: parse(styles.paddingLeft)
    };
    var border = {
      top: parse(styles.borderTopWidth),
      right: parse(styles.borderRightWidth),
      bottom: parse(styles.borderBottomWidth),
      left: parse(styles.borderLeftWidth)
    };
    return createBox({
      borderBox: borderBox,
      margin: margin,
      padding: padding,
      border: border
    });
  };

  var getBox = function getBox(el) {
    var borderBox = el.getBoundingClientRect();
    var styles = window.getComputedStyle(el);
    return calculateBox(borderBox, styles);
  };

  function getLastItem(array) {
    var length = array == null ? 0 : array.length;
    return length ? array[length - 1] : undefined;
  }

  // Number assertions
  function isNumber(value) {
    return typeof value === "number";
  }
  function isNotNumber(value) {
    return typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value);
  }

  function isArray(value) {
    return Array.isArray(value);
  }

  function isFunction(value) {
    return typeof value === "function";
  } // Generic assertions

  function isObject(value) {
    var type = typeof value;
    return value != null && (type === "object" || type === "function") && !isArray(value);
  }
  function isEmptyObject(value) {
    return isObject(value) && Object.keys(value).length === 0;
  }

  function isString(value) {
    return Object.prototype.toString.call(value) === "[object String]";
  }
  function isCssVar(value) {
    return /^var\(--.+\)$/.test(value);
  } // Empty assertions
  var __DEV__ = "production" !== "production";

  var lodash_mergewith = {exports: {}};

  /**
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */

  (function (module, exports) {
    /** Used as the size to enable large array optimizations. */
    var LARGE_ARRAY_SIZE = 200;
    /** Used to stand-in for `undefined` hash values. */

    var HASH_UNDEFINED = '__lodash_hash_undefined__';
    /** Used to detect hot functions by number of calls within a span of milliseconds. */

    var HOT_COUNT = 800,
        HOT_SPAN = 16;
    /** Used as references for various `Number` constants. */

    var MAX_SAFE_INTEGER = 9007199254740991;
    /** `Object#toString` result references. */

    var argsTag = '[object Arguments]',
        arrayTag = '[object Array]',
        asyncTag = '[object AsyncFunction]',
        boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        errorTag = '[object Error]',
        funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        mapTag = '[object Map]',
        numberTag = '[object Number]',
        nullTag = '[object Null]',
        objectTag = '[object Object]',
        proxyTag = '[object Proxy]',
        regexpTag = '[object RegExp]',
        setTag = '[object Set]',
        stringTag = '[object String]',
        undefinedTag = '[object Undefined]',
        weakMapTag = '[object WeakMap]';
    var arrayBufferTag = '[object ArrayBuffer]',
        dataViewTag = '[object DataView]',
        float32Tag = '[object Float32Array]',
        float64Tag = '[object Float64Array]',
        int8Tag = '[object Int8Array]',
        int16Tag = '[object Int16Array]',
        int32Tag = '[object Int32Array]',
        uint8Tag = '[object Uint8Array]',
        uint8ClampedTag = '[object Uint8ClampedArray]',
        uint16Tag = '[object Uint16Array]',
        uint32Tag = '[object Uint32Array]';
    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
     */

    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    /** Used to detect host constructors (Safari). */

    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    /** Used to detect unsigned integer values. */

    var reIsUint = /^(?:0|[1-9]\d*)$/;
    /** Used to identify `toStringTag` values of typed arrays. */

    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    /** Detect free variable `global` from Node.js. */

    var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
    /** Detect free variable `self`. */

    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
    /** Used as a reference to the global object. */

    var root = freeGlobal || freeSelf || Function('return this')();
    /** Detect free variable `exports`. */

    var freeExports = exports && !exports.nodeType && exports;
    /** Detect free variable `module`. */

    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
    /** Detect the popular CommonJS extension `module.exports`. */

    var moduleExports = freeModule && freeModule.exports === freeExports;
    /** Detect free variable `process` from Node.js. */

    var freeProcess = moduleExports && freeGlobal.process;
    /** Used to access faster Node.js helpers. */

    var nodeUtil = function () {
      try {
        // Use `util.types` for Node.js 10+.
        var types = freeModule && freeModule.require && freeModule.require('util').types;

        if (types) {
          return types;
        } // Legacy `process.binding('util')` for Node.js < 10.


        return freeProcess && freeProcess.binding && freeProcess.binding('util');
      } catch (e) {}
    }();
    /* Node.js helper references. */


    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    /**
     * A faster alternative to `Function#apply`, this function invokes `func`
     * with the `this` binding of `thisArg` and the arguments of `args`.
     *
     * @private
     * @param {Function} func The function to invoke.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} args The arguments to invoke `func` with.
     * @returns {*} Returns the result of `func`.
     */

    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);

        case 1:
          return func.call(thisArg, args[0]);

        case 2:
          return func.call(thisArg, args[0], args[1]);

        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }

      return func.apply(thisArg, args);
    }
    /**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */


    function baseTimes(n, iteratee) {
      var index = -1,
          result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }

      return result;
    }
    /**
     * The base implementation of `_.unary` without support for storing metadata.
     *
     * @private
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     */


    function baseUnary(func) {
      return function (value) {
        return func(value);
      };
    }
    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */


    function getValue(object, key) {
      return object == null ? undefined : object[key];
    }
    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */


    function overArg(func, transform) {
      return function (arg) {
        return func(transform(arg));
      };
    }
    /** Used for built-in method references. */


    var arrayProto = Array.prototype,
        funcProto = Function.prototype,
        objectProto = Object.prototype;
    /** Used to detect overreaching core-js shims. */

    var coreJsData = root['__core-js_shared__'];
    /** Used to resolve the decompiled source of functions. */

    var funcToString = funcProto.toString;
    /** Used to check objects for own properties. */

    var hasOwnProperty = objectProto.hasOwnProperty;
    /** Used to detect methods masquerading as native. */

    var maskSrcKey = function () {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? 'Symbol(src)_1.' + uid : '';
    }();
    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */


    var nativeObjectToString = objectProto.toString;
    /** Used to infer the `Object` constructor. */

    var objectCtorString = funcToString.call(Object);
    /** Used to detect if a method is native. */

    var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
    /** Built-in value references. */

    var Buffer = moduleExports ? root.Buffer : undefined,
        Symbol = root.Symbol,
        Uint8Array = root.Uint8Array,
        allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
        getPrototype = overArg(Object.getPrototypeOf, Object),
        objectCreate = Object.create,
        propertyIsEnumerable = objectProto.propertyIsEnumerable,
        splice = arrayProto.splice,
        symToStringTag = Symbol ? Symbol.toStringTag : undefined;

    var defineProperty = function () {
      try {
        var func = getNative(Object, 'defineProperty');
        func({}, '', {});
        return func;
      } catch (e) {}
    }();
    /* Built-in method references for those with the same name as other `lodash` methods. */


    var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
        nativeMax = Math.max,
        nativeNow = Date.now;
    /* Built-in method references that are verified to be native. */

    var Map = getNative(root, 'Map'),
        nativeCreate = getNative(Object, 'create');
    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} proto The object to inherit from.
     * @returns {Object} Returns the new object.
     */

    var baseCreate = function () {
      function object() {}

      return function (proto) {
        if (!isObject(proto)) {
          return {};
        }

        if (objectCreate) {
          return objectCreate(proto);
        }

        object.prototype = proto;
        var result = new object();
        object.prototype = undefined;
        return result;
      };
    }();
    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */


    function Hash(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;
      this.clear();

      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */


    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */


    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */


    function hashGet(key) {
      var data = this.__data__;

      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }

      return hasOwnProperty.call(data, key) ? data[key] : undefined;
    }
    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */


    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
    }
    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */


    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
      return this;
    } // Add methods to `Hash`.


    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */

    function ListCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;
      this.clear();

      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */


    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */


    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }

      var lastIndex = data.length - 1;

      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }

      --this.size;
      return true;
    }
    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */


    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);
      return index < 0 ? undefined : data[index][1];
    }
    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */


    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */


    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }

      return this;
    } // Add methods to `ListCache`.


    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */

    function MapCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;
      this.clear();

      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */


    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        'hash': new Hash(),
        'map': new (Map || ListCache)(),
        'string': new Hash()
      };
    }
    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */


    function mapCacheDelete(key) {
      var result = getMapData(this, key)['delete'](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */


    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */


    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */


    function mapCacheSet(key, value) {
      var data = getMapData(this, key),
          size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    } // Add methods to `MapCache`.


    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */

    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }
    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */


    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */


    function stackDelete(key) {
      var data = this.__data__,
          result = data['delete'](key);
      this.size = data.size;
      return result;
    }
    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */


    function stackGet(key) {
      return this.__data__.get(key);
    }
    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */


    function stackHas(key) {
      return this.__data__.has(key);
    }
    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */


    function stackSet(key, value) {
      var data = this.__data__;

      if (data instanceof ListCache) {
        var pairs = data.__data__;

        if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }

        data = this.__data__ = new MapCache(pairs);
      }

      data.set(key, value);
      this.size = data.size;
      return this;
    } // Add methods to `Stack`.


    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */

    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value),
          isArg = !isArr && isArguments(value),
          isBuff = !isArr && !isArg && isBuffer(value),
          isType = !isArr && !isArg && !isBuff && isTypedArray(value),
          skipIndexes = isArr || isArg || isBuff || isType,
          result = skipIndexes ? baseTimes(value.length, String) : [],
          length = result.length;

      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
        key == 'length' || isBuff && (key == 'offset' || key == 'parent') || isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
        isIndex(key, length)))) {
          result.push(key);
        }
      }

      return result;
    }
    /**
     * This function is like `assignValue` except that it doesn't assign
     * `undefined` values.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */


    function assignMergeValue(object, key, value) {
      if (value !== undefined && !eq(object[key], value) || value === undefined && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }
    /**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */


    function assignValue(object, key, value) {
      var objValue = object[key];

      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }
    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */


    function assocIndexOf(array, key) {
      var length = array.length;

      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }

      return -1;
    }
    /**
     * The base implementation of `assignValue` and `assignMergeValue` without
     * value checks.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */


    function baseAssignValue(object, key, value) {
      if (key == '__proto__' && defineProperty) {
        defineProperty(object, key, {
          'configurable': true,
          'enumerable': true,
          'value': value,
          'writable': true
        });
      } else {
        object[key] = value;
      }
    }
    /**
     * The base implementation of `baseForOwn` which iterates over `object`
     * properties returned by `keysFunc` and invokes `iteratee` for each property.
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */


    var baseFor = createBaseFor();
    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */

    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }

      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    /**
     * The base implementation of `_.isArguments`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     */


    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */


    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }

      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    /**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */


    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    /**
     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */


    function baseKeysIn(object) {
      if (!isObject(object)) {
        return nativeKeysIn(object);
      }

      var isProto = isPrototype(object),
          result = [];

      for (var key in object) {
        if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }

      return result;
    }
    /**
     * The base implementation of `_.merge` without support for multiple sources.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */


    function baseMerge(object, source, srcIndex, customizer, stack) {
      if (object === source) {
        return;
      }

      baseFor(source, function (srcValue, key) {
        stack || (stack = new Stack());

        if (isObject(srcValue)) {
          baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
        } else {
          var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + '', object, source, stack) : undefined;

          if (newValue === undefined) {
            newValue = srcValue;
          }

          assignMergeValue(object, key, newValue);
        }
      }, keysIn);
    }
    /**
     * A specialized version of `baseMerge` for arrays and objects which performs
     * deep merges and tracks traversed objects enabling objects with circular
     * references to be merged.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {string} key The key of the value to merge.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} mergeFunc The function to merge values.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */


    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
      var objValue = safeGet(object, key),
          srcValue = safeGet(source, key),
          stacked = stack.get(srcValue);

      if (stacked) {
        assignMergeValue(object, key, stacked);
        return;
      }

      var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;
      var isCommon = newValue === undefined;

      if (isCommon) {
        var isArr = isArray(srcValue),
            isBuff = !isArr && isBuffer(srcValue),
            isTyped = !isArr && !isBuff && isTypedArray(srcValue);
        newValue = srcValue;

        if (isArr || isBuff || isTyped) {
          if (isArray(objValue)) {
            newValue = objValue;
          } else if (isArrayLikeObject(objValue)) {
            newValue = copyArray(objValue);
          } else if (isBuff) {
            isCommon = false;
            newValue = cloneBuffer(srcValue, true);
          } else if (isTyped) {
            isCommon = false;
            newValue = cloneTypedArray(srcValue, true);
          } else {
            newValue = [];
          }
        } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          newValue = objValue;

          if (isArguments(objValue)) {
            newValue = toPlainObject(objValue);
          } else if (!isObject(objValue) || isFunction(objValue)) {
            newValue = initCloneObject(srcValue);
          }
        } else {
          isCommon = false;
        }
      }

      if (isCommon) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack['delete'](srcValue);
      }

      assignMergeValue(object, key, newValue);
    }
    /**
     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     */


    function baseRest(func, start) {
      return setToString(overRest(func, start, identity), func + '');
    }
    /**
     * The base implementation of `setToString` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */


    var baseSetToString = !defineProperty ? identity : function (func, string) {
      return defineProperty(func, 'toString', {
        'configurable': true,
        'enumerable': false,
        'value': constant(string),
        'writable': true
      });
    };
    /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */

    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }

      var length = buffer.length,
          result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
      buffer.copy(result);
      return result;
    }
    /**
     * Creates a clone of `arrayBuffer`.
     *
     * @private
     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */


    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
      return result;
    }
    /**
     * Creates a clone of `typedArray`.
     *
     * @private
     * @param {Object} typedArray The typed array to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned typed array.
     */


    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }
    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */


    function copyArray(source, array) {
      var index = -1,
          length = source.length;
      array || (array = Array(length));

      while (++index < length) {
        array[index] = source[index];
      }

      return array;
    }
    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property identifiers to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */


    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});
      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];
        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

        if (newValue === undefined) {
          newValue = source[key];
        }

        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }

      return object;
    }
    /**
     * Creates a function like `_.assign`.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */


    function createAssigner(assigner) {
      return baseRest(function (object, sources) {
        var index = -1,
            length = sources.length,
            customizer = length > 1 ? sources[length - 1] : undefined,
            guard = length > 2 ? sources[2] : undefined;
        customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? undefined : customizer;
          length = 1;
        }

        object = Object(object);

        while (++index < length) {
          var source = sources[index];

          if (source) {
            assigner(object, source, index, customizer);
          }
        }

        return object;
      });
    }
    /**
     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */


    function createBaseFor(fromRight) {
      return function (object, iteratee, keysFunc) {
        var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;

        while (length--) {
          var key = props[fromRight ? length : ++index];

          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }

        return object;
      };
    }
    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */


    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
    }
    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */


    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }
    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */


    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag),
          tag = value[symToStringTag];

      try {
        value[symToStringTag] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString.call(value);

      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }

      return result;
    }
    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */


    function initCloneObject(object) {
      return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
    }
    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */


    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
    }
    /**
     * Checks if the given arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
     *  else `false`.
     */


    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }

      var type = typeof index;

      if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
        return eq(object[index], value);
      }

      return false;
    }
    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */


    function isKeyable(value) {
      var type = typeof value;
      return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
    }
    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */


    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */


    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
      return value === proto;
    }
    /**
     * This function is like
     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * except that it includes inherited enumerable properties.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */


    function nativeKeysIn(object) {
      var result = [];

      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }

      return result;
    }
    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */


    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    /**
     * A specialized version of `baseRest` which transforms the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @param {Function} transform The rest array transform.
     * @returns {Function} Returns the new function.
     */


    function overRest(func, start, transform) {
      start = nativeMax(start === undefined ? func.length - 1 : start, 0);
      return function () {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);

        while (++index < length) {
          array[index] = args[start + index];
        }

        index = -1;
        var otherArgs = Array(start + 1);

        while (++index < start) {
          otherArgs[index] = args[index];
        }

        otherArgs[start] = transform(array);
        return apply(func, this, otherArgs);
      };
    }
    /**
     * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */


    function safeGet(object, key) {
      if (key === 'constructor' && typeof object[key] === 'function') {
        return;
      }

      if (key == '__proto__') {
        return;
      }

      return object[key];
    }
    /**
     * Sets the `toString` method of `func` to return `string`.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */


    var setToString = shortOut(baseSetToString);
    /**
     * Creates a function that'll short out and invoke `identity` instead
     * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
     * milliseconds.
     *
     * @private
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new shortable function.
     */

    function shortOut(func) {
      var count = 0,
          lastCalled = 0;
      return function () {
        var stamp = nativeNow(),
            remaining = HOT_SPAN - (stamp - lastCalled);
        lastCalled = stamp;

        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }

        return func.apply(undefined, arguments);
      };
    }
    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to convert.
     * @returns {string} Returns the source code.
     */


    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}

        try {
          return func + '';
        } catch (e) {}
      }

      return '';
    }
    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */


    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */


    var isArguments = baseIsArguments(function () {
      return arguments;
    }()) ? baseIsArguments : function (value) {
      return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
    };
    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */

    var isArray = Array.isArray;
    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */

    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */


    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */


    var isBuffer = nativeIsBuffer || stubFalse;
    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */

    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      } // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 9 which returns 'object' for typed arrays and other constructors.


      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */


    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */


    function isObject(value) {
      var type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }
    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */


    function isObjectLike(value) {
      return value != null && typeof value == 'object';
    }
    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */


    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
        return false;
      }

      var proto = getPrototype(value);

      if (proto === null) {
        return true;
      }

      var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
      return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
    }
    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */


    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    /**
     * Converts `value` to a plain object flattening inherited enumerable string
     * keyed properties of `value` to own properties of the plain object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Object} Returns the converted plain object.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.assign({ 'a': 1 }, new Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */

    function toPlainObject(value) {
      return copyObject(value, keysIn(value));
    }
    /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */


    function keysIn(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }
    /**
     * This method is like `_.merge` except that it accepts `customizer` which
     * is invoked to produce the merged values of the destination and source
     * properties. If `customizer` returns `undefined`, merging is handled by the
     * method instead. The `customizer` is invoked with six arguments:
     * (objValue, srcValue, key, object, source, stack).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} customizer The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   if (_.isArray(objValue)) {
     *     return objValue.concat(srcValue);
     *   }
     * }
     *
     * var object = { 'a': [1], 'b': [2] };
     * var other = { 'a': [3], 'b': [4] };
     *
     * _.mergeWith(object, other, customizer);
     * // => { 'a': [1, 3], 'b': [2, 4] }
     */


    var mergeWith = createAssigner(function (object, source, srcIndex, customizer) {
      baseMerge(object, source, srcIndex, customizer);
    });
    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new constant function.
     * @example
     *
     * var objects = _.times(2, _.constant({ 'a': 1 }));
     *
     * console.log(objects);
     * // => [{ 'a': 1 }, { 'a': 1 }]
     *
     * console.log(objects[0] === objects[1]);
     * // => true
     */

    function constant(value) {
      return function () {
        return value;
      };
    }
    /**
     * This method returns the first argument it receives.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'a': 1 };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */


    function identity(value) {
      return value;
    }
    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */


    function stubFalse() {
      return false;
    }

    module.exports = mergeWith;
  })(lodash_mergewith, lodash_mergewith.exports);

  var mergeWith = lodash_mergewith.exports;

  function omit(object, keys) {
    var result = {};
    Object.keys(object).forEach(key => {
      if (keys.includes(key)) return;
      result[key] = object[key];
    });
    return result;
  }
  function pick(object, keys) {
    var result = {};
    keys.forEach(key => {
      if (key in object) {
        result[key] = object[key];
      }
    });
    return result;
  }
  function split(object, keys) {
    var picked = {};
    var omitted = {};
    Object.keys(object).forEach(key => {
      if (keys.includes(key)) {
        picked[key] = object[key];
      } else {
        omitted[key] = object[key];
      }
    });
    return [picked, omitted];
  }
  /**
   * Get value from a deeply nested object using a string path.
   * Memoizes the value.
   * @param obj - the object
   * @param path - the string path
   * @param def  - the fallback value
   */

  function get(obj, path, fallback, index) {
    var key = typeof path === "string" ? path.split(".") : [path];

    for (index = 0; index < key.length; index += 1) {
      if (!obj) break;
      obj = obj[key[index]];
    }

    return obj === undefined ? fallback : obj;
  }
  var memoize = fn => {
    var cache = new WeakMap();

    var memoizedFn = (obj, path, fallback, index) => {
      if (typeof obj === "undefined") {
        return fn(obj, path, fallback);
      }

      if (!cache.has(obj)) {
        cache.set(obj, new Map());
      }

      var map = cache.get(obj);

      if (map.has(path)) {
        return map.get(path);
      }

      var value = fn(obj, path, fallback, index);
      map.set(path, value);
      return value;
    };

    return memoizedFn;
  };
  var memoizedGet = memoize(get);
  /**
   * Returns the items of an object that meet the condition specified in a callback function.
   *
   * @param object the object to loop through
   * @param fn The filter function
   */

  function objectFilter(object, fn) {
    var result = {};
    Object.keys(object).forEach(key => {
      var value = object[key];
      var shouldPass = fn(value, key, object);

      if (shouldPass) {
        result[key] = value;
      }
    });
    return result;
  }
  var filterUndefined = object => objectFilter(object, val => val !== null && val !== undefined);
  var objectKeys = obj => Object.keys(obj);
  /**
   * Object.entries polyfill for Nodev10 compatibility
   */

  var fromEntries = entries => entries.reduce((carry, _ref) => {
    var [key, value] = _ref;
    carry[key] = value;
    return carry;
  }, {});

  function analyzeCSSValue$1(value) {
    var num = parseFloat(value.toString());
    var unit = value.toString().replace(String(num), "");
    return {
      unitless: !unit,
      value: num,
      unit
    };
  }

  function px(value) {
    if (value == null) return value;
    var {
      unitless
    } = analyzeCSSValue$1(value);
    return unitless || isNumber(value) ? value + "px" : value;
  }

  var sortByBreakpointValue = (a, b) => parseInt(a[1], 10) > parseInt(b[1], 10) ? 1 : -1;

  var sortBps = breakpoints => fromEntries(Object.entries(breakpoints).sort(sortByBreakpointValue));

  function normalize(breakpoints) {
    var sorted = sortBps(breakpoints);
    return Object.assign(Object.values(sorted), sorted);
  }

  function keys(breakpoints) {
    var value = Object.keys(sortBps(breakpoints));
    return new Set(value);
  }

  function subtract(value) {
    var _px;

    if (!value) return value;
    value = (_px = px(value)) != null ? _px : value;
    var factor = value.endsWith("px") ? -1 : // the equivalent of 1px in em using a 16px base
    -0.0635;
    return isNumber(value) ? "" + (value + factor) : value.replace(/([0-9]+\.?[0-9]*)/, m => "" + (parseFloat(m) + factor));
  }

  function queryString(min, max) {
    var query = [];
    if (min) query.push("@media screen and (min-width: " + px(min) + ")");
    if (query.length > 0 && max) query.push("and");
    if (max) query.push("@media screen and (max-width: " + px(max) + ")");
    return query.join(" ");
  }

  function analyzeBreakpoints(breakpoints) {
    var _breakpoints$base;

    if (!breakpoints) return null;
    breakpoints.base = (_breakpoints$base = breakpoints.base) != null ? _breakpoints$base : "0px";
    var normalized = normalize(breakpoints);
    var queries = Object.entries(breakpoints).sort(sortByBreakpointValue).map((_ref, index, entry) => {
      var _entry;

      var [breakpoint, minW] = _ref;
      var [, maxW] = (_entry = entry[index + 1]) != null ? _entry : [];
      maxW = parseFloat(maxW) > 0 ? subtract(maxW) : undefined;
      return {
        breakpoint,
        minW,
        maxW,
        maxWQuery: queryString(null, maxW),
        minWQuery: queryString(minW),
        minMaxQuery: queryString(minW, maxW)
      };
    });

    var _keys = keys(breakpoints);

    var _keysArr = Array.from(_keys.values());

    return {
      keys: _keys,
      normalized,

      isResponsive(test) {
        var keys = Object.keys(test);
        return keys.length > 0 && keys.every(key => _keys.has(key));
      },

      asObject: sortBps(breakpoints),
      asArray: normalize(breakpoints),
      details: queries,
      media: [null, ...normalized.map(minW => queryString(minW)).slice(1)],

      toArrayValue(test) {
        if (!isObject(test)) {
          throw new Error("toArrayValue: value must be an object");
        }

        var result = _keysArr.map(bp => {
          var _test$bp;

          return (_test$bp = test[bp]) != null ? _test$bp : null;
        });

        while (getLastItem(result) === null) {
          result.pop();
        }

        return result;
      },

      toObjectValue(test) {
        if (!Array.isArray(test)) {
          throw new Error("toObjectValue: value must be an array");
        }

        return test.reduce((acc, value, index) => {
          var key = _keysArr[index];
          if (key != null && value != null) acc[key] = value;
          return acc;
        }, {});
      }

    };
  }

  function getOwnerDocument(node) {
    var _node$ownerDocument;

    return node instanceof Element ? (_node$ownerDocument = node.ownerDocument) != null ? _node$ownerDocument : document : document;
  }
  function canUseDOM() {
    return !!(typeof window !== "undefined" && window.document && window.document.createElement);
  }
  var isBrowser$1 = canUseDOM();
  var dataAttr = condition => condition ? "" : undefined;
  var ariaAttr = condition => condition ? true : undefined;
  var cx = function cx() {
    for (var _len = arguments.length, classNames = new Array(_len), _key = 0; _key < _len; _key++) {
      classNames[_key] = arguments[_key];
    }

    return classNames.filter(Boolean).join(" ");
  };
  function addDomEvent(target, eventName, handler, options) {
    target.addEventListener(eventName, handler, options);
    return () => {
      target.removeEventListener(eventName, handler, options);
    };
  }
  /**
   * Get the normalized event key across all browsers
   * @param event keyboard event
   */

  function normalizeEventKey(event) {
    var {
      key,
      keyCode
    } = event;
    var isArrowKey = keyCode >= 37 && keyCode <= 40 && key.indexOf("Arrow") !== 0;
    var eventKey = isArrowKey ? "Arrow" + key : key;
    return eventKey;
  }

  // Really great work done by Diego Haz on this one
  function isInputElement(element) {
    return isHTMLElement(element) && element.tagName.toLowerCase() === "input" && "select" in element;
  }
  function isActiveElement(element) {
    var doc = element instanceof HTMLElement ? getOwnerDocument(element) : document;
    return doc.activeElement === element;
  }
  function isHTMLElement(element) {
    return element instanceof HTMLElement;
  }

  /* eslint-disable no-nested-ternary */
  function runIfFn(valueOrFn) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
  }
  function callAllHandlers() {
    for (var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      fns[_key2] = arguments[_key2];
    }

    return function func(event) {
      fns.some(fn => {
        fn == null ? void 0 : fn(event);
        return event == null ? void 0 : event.defaultPrevented;
      });
    };
  }
  function once(fn) {
    var result;
    return function func() {
      if (fn) {
        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        result = fn.apply(this, args);
        fn = null;
      }

      return result;
    };
  }
  var noop = () => {};
  var warn = once(options => () => {
    var {
      condition,
      message
    } = options;

    if (condition && __DEV__) {
      console.warn(message);
    }
  });

  var promiseMicrotask = callback => {
    Promise.resolve().then(callback);
  };

  var scheduleMicrotask = typeof queueMicrotask === "function" ? queueMicrotask : promiseMicrotask;
  var pipe = function pipe() {
    for (var _len6 = arguments.length, fns = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      fns[_key6] = arguments[_key6];
    }

    return v => fns.reduce((a, b) => b(a), v);
  };

  var distance1D = (a, b) => Math.abs(a - b);

  var isPoint = point => "x" in point && "y" in point;

  function distance(a, b) {
    if (isNumber(a) && isNumber(b)) {
      return distance1D(a, b);
    }

    if (isPoint(a) && isPoint(b)) {
      var xDelta = distance1D(a.x, b.x);
      var yDelta = distance1D(a.y, b.y);
      return Math.sqrt(xDelta ** 2 + yDelta ** 2);
    }

    return 0;
  }

  // Original licensing for the following methods can be found in the
  function focus(element, options) {
    if (options === void 0) {
      options = {};
    }

    var {
      isActive = isActiveElement,
      nextTick,
      preventScroll = true,
      selectTextIfInput = true
    } = options;
    if (!element || isActive(element)) return -1;

    function triggerFocus() {
      if (!element) {
        warn({
          condition: true,
          message: "[chakra-ui]: can't call focus() on `null` or `undefined` element"
        });
        return;
      }

      if (supportsPreventScroll()) {
        element.focus({
          preventScroll
        });
      } else {
        element.focus();

        if (preventScroll) {
          var scrollableElements = getScrollableElements(element);
          restoreScrollPosition(scrollableElements);
        }
      }

      if (isInputElement(element) && selectTextIfInput) {
        element.select();
      }
    }

    if (nextTick) {
      return requestAnimationFrame(triggerFocus);
    }

    triggerFocus();
    return -1;
  }
  var supportsPreventScrollCached = null;

  function supportsPreventScroll() {
    if (supportsPreventScrollCached == null) {
      supportsPreventScrollCached = false;

      try {
        var div = document.createElement("div");
        div.focus({
          get preventScroll() {
            supportsPreventScrollCached = true;
            return true;
          }

        });
      } catch (e) {// Ignore
      }
    }

    return supportsPreventScrollCached;
  }

  function getScrollableElements(element) {
    var doc = getOwnerDocument(element);
    var parent = element.parentNode;
    var scrollableElements = [];
    var rootScrollingElement = doc.scrollingElement || doc.documentElement;

    while (parent instanceof HTMLElement && parent !== rootScrollingElement) {
      if (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth) {
        scrollableElements.push({
          element: parent,
          scrollTop: parent.scrollTop,
          scrollLeft: parent.scrollLeft
        });
      }

      parent = parent.parentNode;
    }

    if (rootScrollingElement instanceof HTMLElement) {
      scrollableElements.push({
        element: rootScrollingElement,
        scrollTop: rootScrollingElement.scrollTop,
        scrollLeft: rootScrollingElement.scrollLeft
      });
    }

    return scrollableElements;
  }

  function restoreScrollPosition(scrollableElements) {
    for (var {
      element,
      scrollTop,
      scrollLeft
    } of scrollableElements) {
      element.scrollTop = scrollTop;
      element.scrollLeft = scrollLeft;
    }
  }

  function toNumber(value) {
    var num = parseFloat(value);
    return isNotNumber(num) ? 0 : num;
  }
  /**
   * Converts a value to a specific precision (or decimal points).
   *
   * Returns a string representing a number in fixed-point notation.
   *
   * @param value the value to convert
   * @param precision the precision or decimal points
   */


  function toPrecision(value, precision) {
    var nextValue = toNumber(value);
    var scaleFactor = 10 ** (precision != null ? precision : 10);
    nextValue = Math.round(nextValue * scaleFactor) / scaleFactor;
    return precision ? nextValue.toFixed(precision) : nextValue.toString();
  }
  /**
   * Counts the number of decimal places a number has
   *
   * @param value the decimal value to count
   */

  function countDecimalPlaces(value) {
    if (!Number.isFinite(value)) return 0;
    var e = 1;
    var p = 0;

    while (Math.round(value * e) / e !== value) {
      e *= 10;
      p += 1;
    }

    return p;
  }
  /**
   * Convert a value to percentage based on lower and upper bound values
   *
   * @param value the value in number
   * @param min the minimum value
   * @param max the maximum value
   */

  function valueToPercent(value, min, max) {
    return (value - min) * 100 / (max - min);
  }
  /**
   * Calculate the value based on percentage, lower and upper bound values
   *
   * @param percent the percent value in decimals (e.g 0.6, 0.3)
   * @param min the minimum value
   * @param max the maximum value
   */

  function percentToValue(percent, min, max) {
    return (max - min) * percent + min;
  }
  /**
   * Rounds a specific value to the next or previous step
   *
   * @param value the value to round
   * @param from the number that stepping started from
   * @param step the specified step
   */

  function roundValueToStep(value, from, step) {
    var nextValue = Math.round((value - from) / step) * step + from;
    var precision = countDecimalPlaces(step);
    return toPrecision(nextValue, precision);
  }
  /**
   * Clamps a value to ensure it stays within the min and max range.
   *
   * @param value the value to clamp
   * @param min the minimum value
   * @param max the maximum value
   */

  function clampValue(value, min, max) {
    if (value == null) return value;
    warn({
      condition: max < min,
      message: "clamp: max cannot be less than min"
    });
    return Math.min(Math.max(value, min), max);
  }

  var defaultTimestep = 1 / 60 * 1000;
  var getCurrentTime = typeof performance !== "undefined" ? function () {
    return performance.now();
  } : function () {
    return Date.now();
  };
  var onNextFrame = typeof window !== "undefined" ? function (callback) {
    return window.requestAnimationFrame(callback);
  } : function (callback) {
    return setTimeout(function () {
      return callback(getCurrentTime());
    }, defaultTimestep);
  };

  function createRenderStep(runNextFrame) {
    var toRun = [];
    var toRunNextFrame = [];
    var numToRun = 0;
    var isProcessing = false;
    var toKeepAlive = new WeakSet();
    var step = {
      schedule: function (callback, keepAlive, immediate) {
        if (keepAlive === void 0) {
          keepAlive = false;
        }

        if (immediate === void 0) {
          immediate = false;
        }

        var addToCurrentFrame = immediate && isProcessing;
        var buffer = addToCurrentFrame ? toRun : toRunNextFrame;
        if (keepAlive) toKeepAlive.add(callback);

        if (buffer.indexOf(callback) === -1) {
          buffer.push(callback);
          if (addToCurrentFrame && isProcessing) numToRun = toRun.length;
        }

        return callback;
      },
      cancel: function (callback) {
        var index = toRunNextFrame.indexOf(callback);
        if (index !== -1) toRunNextFrame.splice(index, 1);
        toKeepAlive.delete(callback);
      },
      process: function (frameData) {
        var _a;

        isProcessing = true;
        _a = [toRunNextFrame, toRun], toRun = _a[0], toRunNextFrame = _a[1];
        toRunNextFrame.length = 0;
        numToRun = toRun.length;

        if (numToRun) {
          for (var i = 0; i < numToRun; i++) {
            var callback = toRun[i];
            callback(frameData);

            if (toKeepAlive.has(callback)) {
              step.schedule(callback);
              runNextFrame();
            }
          }
        }

        isProcessing = false;
      }
    };
    return step;
  }

  var maxElapsed = 40;
  var useDefaultElapsed = true;
  var runNextFrame = false;
  var isProcessing = false;
  var frame = {
    delta: 0,
    timestamp: 0
  };
  var stepsOrder = ["read", "update", "preRender", "render", "postRender"];
  var steps = /*#__PURE__*/stepsOrder.reduce(function (acc, key) {
    acc[key] = createRenderStep(function () {
      return runNextFrame = true;
    });
    return acc;
  }, {});
  var sync = /*#__PURE__*/stepsOrder.reduce(function (acc, key) {
    var step = steps[key];

    acc[key] = function (process, keepAlive, immediate) {
      if (keepAlive === void 0) {
        keepAlive = false;
      }

      if (immediate === void 0) {
        immediate = false;
      }

      if (!runNextFrame) startLoop();
      return step.schedule(process, keepAlive, immediate);
    };

    return acc;
  }, {});
  var cancelSync = /*#__PURE__*/stepsOrder.reduce(function (acc, key) {
    acc[key] = steps[key].cancel;
    return acc;
  }, {});

  var processStep = function (stepId) {
    return steps[stepId].process(frame);
  };

  var processFrame = function (timestamp) {
    runNextFrame = false;
    frame.delta = useDefaultElapsed ? defaultTimestep : Math.max(Math.min(timestamp - frame.timestamp, maxElapsed), 1);
    frame.timestamp = timestamp;
    isProcessing = true;
    stepsOrder.forEach(processStep);
    isProcessing = false;

    if (runNextFrame) {
      useDefaultElapsed = false;
      onNextFrame(processFrame);
    }
  };

  var startLoop = function () {
    runNextFrame = true;
    useDefaultElapsed = true;
    if (!isProcessing) onNextFrame(processFrame);
  };

  var getFrameData = function () {
    return frame;
  };

  /**
   * Credit goes to `framer-motion` of this useful utilities.
   * License can be found here: https://github.com/framer/motion
   */
  function isMouseEvent(event) {
    // PointerEvent inherits from MouseEvent so we can't use a straight instanceof check.
    if (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) {
      return !!(event.pointerType === "mouse");
    }

    return event instanceof MouseEvent;
  }
  function isTouchEvent(event) {
    var hasTouches = !!event.touches;
    return hasTouches;
  }
  /**
   * Filters out events not attached to the primary pointer (currently left mouse button)
   * @param eventHandler
   */

  function filterPrimaryPointer(eventHandler) {
    return event => {
      var isMouseEvent = event instanceof MouseEvent;
      var isPrimaryPointer = !isMouseEvent || isMouseEvent && event.button === 0;

      if (isPrimaryPointer) {
        eventHandler(event);
      }
    };
  }

  var defaultPagePoint = {
    pageX: 0,
    pageY: 0
  };

  function pointFromTouch(e, pointType) {
    if (pointType === void 0) {
      pointType = "page";
    }

    var primaryTouch = e.touches[0] || e.changedTouches[0];
    var point = primaryTouch || defaultPagePoint;
    return {
      x: point[pointType + "X"],
      y: point[pointType + "Y"]
    };
  }

  function pointFromMouse(point, pointType) {
    if (pointType === void 0) {
      pointType = "page";
    }

    return {
      x: point[pointType + "X"],
      y: point[pointType + "Y"]
    };
  }

  function extractEventInfo(event, pointType) {
    if (pointType === void 0) {
      pointType = "page";
    }

    return {
      point: isTouchEvent(event) ? pointFromTouch(event, pointType) : pointFromMouse(event, pointType)
    };
  }
  var wrapPointerEventHandler = function wrapPointerEventHandler(handler, shouldFilterPrimaryPointer) {
    if (shouldFilterPrimaryPointer === void 0) {
      shouldFilterPrimaryPointer = false;
    }

    var listener = event => handler(event, extractEventInfo(event));

    return shouldFilterPrimaryPointer ? filterPrimaryPointer(listener) : listener;
  }; // We check for event support via functions in case they've been mocked by a testing suite.

  var supportsPointerEvents = () => isBrowser$1 && window.onpointerdown === null;

  var supportsTouchEvents = () => isBrowser$1 && window.ontouchstart === null;

  var supportsMouseEvents = () => isBrowser$1 && window.onmousedown === null;

  var mouseEventNames = {
    pointerdown: "mousedown",
    pointermove: "mousemove",
    pointerup: "mouseup",
    pointercancel: "mousecancel",
    pointerover: "mouseover",
    pointerout: "mouseout",
    pointerenter: "mouseenter",
    pointerleave: "mouseleave"
  };
  var touchEventNames = {
    pointerdown: "touchstart",
    pointermove: "touchmove",
    pointerup: "touchend",
    pointercancel: "touchcancel"
  };
  function getPointerEventName(name) {
    if (supportsPointerEvents()) {
      return name;
    }

    if (supportsTouchEvents()) {
      return touchEventNames[name];
    }

    if (supportsMouseEvents()) {
      return mouseEventNames[name];
    }

    return name;
  }
  function addPointerEvent(target, eventName, handler, options) {
    return addDomEvent(target, getPointerEventName(eventName), wrapPointerEventHandler(handler, eventName === "pointerdown"), options);
  }
  function isMultiTouchEvent(event) {
    return isTouchEvent(event) && event.touches.length > 1;
  }

  function _extends$x() {
    _extends$x = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$x.apply(this, arguments);
  }

  function _defineProperty$1(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }
  /**
   * The event information passed to pan event handlers like `onPan`, `onPanStart`.
   *
   * It contains information about the current state of the tap gesture such as its
   * `point`, `delta`, and `offset`
   */

  /**
   * @internal
   *
   * A Pan Session is recognized when the pointer is down
   * and moved in the allowed direction.
   */

  class PanSession {
    /**
     * We use this to keep track of the `x` and `y` pan session history
     * as the pan event happens. It helps to calculate the `offset` and `delta`
     */
    // The pointer event that started the pan session
    // The current pointer event for the pan session
    // The current pointer event info for the pan session

    /**
     * Minimal pan distance required before recognizing the pan.
     * @default "3px"
     */
    constructor(_event, handlers, threshold) {
      _defineProperty$1(this, "history", []);

      _defineProperty$1(this, "startEvent", null);

      _defineProperty$1(this, "lastEvent", null);

      _defineProperty$1(this, "lastEventInfo", null);

      _defineProperty$1(this, "handlers", {});

      _defineProperty$1(this, "removeListeners", noop);

      _defineProperty$1(this, "threshold", 3);

      _defineProperty$1(this, "updatePoint", () => {
        if (!(this.lastEvent && this.lastEventInfo)) return;
        var info = getPanInfo(this.lastEventInfo, this.history);
        var isPanStarted = this.startEvent !== null;
        var isDistancePastThreshold = distance(info.offset, {
          x: 0,
          y: 0
        }) >= this.threshold;
        if (!isPanStarted && !isDistancePastThreshold) return;
        var {
          timestamp
        } = getFrameData();
        this.history.push(_extends$x({}, info.point, {
          timestamp
        }));
        var {
          onStart,
          onMove
        } = this.handlers;

        if (!isPanStarted) {
          onStart == null ? void 0 : onStart(this.lastEvent, info);
          this.startEvent = this.lastEvent;
        }

        onMove == null ? void 0 : onMove(this.lastEvent, info);
      });

      _defineProperty$1(this, "onPointerMove", (event, info) => {
        this.lastEvent = event;
        this.lastEventInfo = info; // Because Safari doesn't trigger mouseup events when it's above a `<select>`

        if (isMouseEvent(event) && event.buttons === 0) {
          this.onPointerUp(event, info);
          return;
        } // Throttle mouse move event to once per frame


        sync.update(this.updatePoint, true);
      });

      _defineProperty$1(this, "onPointerUp", (event, info) => {
        // notify pan session ended
        var panInfo = getPanInfo(info, this.history);
        var {
          onEnd,
          onSessionEnd
        } = this.handlers;
        onSessionEnd == null ? void 0 : onSessionEnd(event, panInfo);
        this.end(); // if panning never started, no need to call `onEnd`
        // panning requires a pointermove of at least 3px

        if (!onEnd || !this.startEvent) return;
        onEnd == null ? void 0 : onEnd(event, panInfo);
      }); // If we have more than one touch, don't start detecting this gesture


      if (isMultiTouchEvent(_event)) return;
      this.handlers = handlers;

      if (threshold) {
        this.threshold = threshold;
      } // stop default browser behavior


      _event.stopPropagation();

      _event.preventDefault(); // get and save the `pointerdown` event info in history
      // we'll use it to compute the `offset`


      var _info = extractEventInfo(_event);

      var {
        timestamp: _timestamp
      } = getFrameData();
      this.history = [_extends$x({}, _info.point, {
        timestamp: _timestamp
      })]; // notify pan session start

      var {
        onSessionStart
      } = handlers;
      onSessionStart == null ? void 0 : onSessionStart(_event, getPanInfo(_info, this.history)); // attach event listeners and return a single function to remove them all

      this.removeListeners = pipe(addPointerEvent(window, "pointermove", this.onPointerMove), addPointerEvent(window, "pointerup", this.onPointerUp), addPointerEvent(window, "pointercancel", this.onPointerUp));
    }

    updateHandlers(handlers) {
      this.handlers = handlers;
    }

    end() {
      var _this$removeListeners;

      (_this$removeListeners = this.removeListeners) == null ? void 0 : _this$removeListeners.call(this);
      cancelSync.update(this.updatePoint);
    }

  }

  function subtractPoint(a, b) {
    return {
      x: a.x - b.x,
      y: a.y - b.y
    };
  }

  function startPanPoint(history) {
    return history[0];
  }

  function lastPanPoint(history) {
    return history[history.length - 1];
  }

  function getPanInfo(info, history) {
    return {
      point: info.point,
      delta: subtractPoint(info.point, lastPanPoint(history)),
      offset: subtractPoint(info.point, startPanPoint(history)),
      velocity: getVelocity(history, 0.1)
    };
  }

  function lastDevicePoint(history) {
    return history[history.length - 1];
  }

  var toMilliseconds = seconds => seconds * 1000;

  function getVelocity(history, timeDelta) {
    if (history.length < 2) {
      return {
        x: 0,
        y: 0
      };
    }

    var i = history.length - 1;
    var timestampedPoint = null;
    var lastPoint = lastDevicePoint(history);

    while (i >= 0) {
      timestampedPoint = history[i];

      if (lastPoint.timestamp - timestampedPoint.timestamp > toMilliseconds(timeDelta)) {
        break;
      }

      i--;
    }

    if (!timestampedPoint) {
      return {
        x: 0,
        y: 0
      };
    }

    var time = (lastPoint.timestamp - timestampedPoint.timestamp) / 1000;

    if (time === 0) {
      return {
        x: 0,
        y: 0
      };
    }

    var currentVelocity = {
      x: (lastPoint.x - timestampedPoint.x) / time,
      y: (lastPoint.y - timestampedPoint.y) / time
    };

    if (currentVelocity.x === Infinity) {
      currentVelocity.x = 0;
    }

    if (currentVelocity.y === Infinity) {
      currentVelocity.y = 0;
    }

    return currentVelocity;
  }

  Object.freeze(["base", "sm", "md", "lg", "xl", "2xl"]);
  function mapResponsive(prop, mapper) {
    if (isArray(prop)) {
      return prop.map(item => {
        if (item === null) {
          return null;
        }

        return mapper(item);
      });
    }

    if (isObject(prop)) {
      return objectKeys(prop).reduce((result, key) => {
        result[key] = mapper(prop[key]);
        return result;
      }, {});
    }

    if (prop != null) {
      return mapper(prop);
    }

    return null;
  }

  function walkObject(target, predicate) {
    function inner(value, path) {
      if (path === void 0) {
        path = [];
      }

      if (isArray(value)) {
        return value.map((item, index) => inner(item, [...path, String(index)]));
      }

      if (isObject(value)) {
        return Object.fromEntries(Object.entries(value).map(_ref => {
          var [key, child] = _ref;
          return [key, inner(child, [...path, key])];
        }));
      }

      return predicate(value, path);
    }

    return inner(target);
  }

  /**
   * Assigns a value to a ref function or object
   *
   * @param ref the ref to assign to
   * @param value the value
   */

  function assignRef(ref, value) {
    if (ref == null) return;

    if (isFunction(ref)) {
      ref(value);
      return;
    }

    try {
      // @ts-ignore
      ref.current = value;
    } catch (error) {
      throw new Error("Cannot assign value '" + value + "' to ref '" + ref + "'");
    }
  }
  /**
   * Combine multiple React refs into a single ref function.
   * This is used mostly when you need to allow consumers forward refs to
   * internal components
   *
   * @param refs refs to assign to value to
   */

  function mergeRefs() {
    for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
      refs[_key] = arguments[_key];
    }

    return node => {
      refs.forEach(ref => assignRef(ref, node));
    };
  }

  /**
   * Creates a named context, provider, and hook.
   *
   * @param options create context options
   */

  function createContext(options) {
    if (options === void 0) {
      options = {};
    }

    var {
      strict = true,
      errorMessage = "useContext: `context` is undefined. Seems you forgot to wrap component within the Provider",
      name
    } = options;
    var Context = /*#__PURE__*/React__namespace.createContext(undefined);
    Context.displayName = name;

    function useContext() {
      var context = React__namespace.useContext(Context);

      if (!context && strict) {
        var error = new Error(errorMessage);
        error.name = "ContextError";
        Error.captureStackTrace == null ? void 0 : Error.captureStackTrace(error, useContext);
        throw error;
      }

      return context;
    }

    return [Context.Provider, useContext, Context];
  }

  /**
   * Gets only the valid children of a component,
   * and ignores any nullish or falsy child.
   *
   * @param children the children
   */

  function getValidChildren(children) {
    return React__namespace.Children.toArray(children).filter(child => /*#__PURE__*/React__namespace.isValidElement(child));
  }

  var [PortalManagerContextProvider, usePortalManager] = createContext({
    strict: false,
    name: "PortalManagerContext"
  });
  function PortalManager(props) {
    var {
      children,
      zIndex
    } = props;
    return /*#__PURE__*/React__namespace.createElement(PortalManagerContextProvider, {
      value: {
        zIndex
      }
    }, children);
  }

  /**
   * React hook to manage boolean (on - off) states
   *
   * @param initialState the initial boolean state value
   */

  function useBoolean(initialState) {
    if (initialState === void 0) {
      initialState = false;
    }

    var [value, setValue] = React.useState(initialState);
    var on = React.useCallback(() => {
      setValue(true);
    }, []);
    var off = React.useCallback(() => {
      setValue(false);
    }, []);
    var toggle = React.useCallback(() => {
      setValue(prev => !prev);
    }, []);
    return [value, {
      on,
      off,
      toggle
    }];
  }

  /**
   * useSafeLayoutEffect enables us to safely call `useLayoutEffect` on the browser
   * (for SSR reasons)
   *
   * React currently throws a warning when using useLayoutEffect on the server.
   * To get around it, we can conditionally useEffect on the server (no-op) and
   * useLayoutEffect in the browser.
   *
   * @see https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
   */

  var useSafeLayoutEffect = isBrowser$1 ? React__namespace.useLayoutEffect : React__namespace.useEffect;

  /**
   * React hook to persist any value between renders,
   * but keeps it up-to-date if it changes.
   *
   * @param value the value or function to persist
   */

  function useCallbackRef(fn, deps) {
    if (deps === void 0) {
      deps = [];
    }

    var ref = React__namespace.useRef(fn);
    useSafeLayoutEffect(() => {
      ref.current = fn;
    }); // eslint-disable-next-line react-hooks/exhaustive-deps

    return React__namespace.useCallback(function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return ref.current == null ? void 0 : ref.current(...args);
    }, deps);
  }

  function useControllableProp(prop, state) {
    var isControlled = prop !== undefined;
    var value = isControlled && typeof prop !== "undefined" ? prop : state;
    return [isControlled, value];
  }
  /**
   * React hook for using controlling component state.
   * @param props
   */

  function useControllableState(props) {
    var {
      value: valueProp,
      defaultValue,
      onChange,
      shouldUpdate = (prev, next) => prev !== next
    } = props;
    var onChangeProp = useCallbackRef(onChange);
    var shouldUpdateProp = useCallbackRef(shouldUpdate);
    var [valueState, setValue] = React__namespace.useState(defaultValue);
    var isControlled = valueProp !== undefined;
    var value = isControlled ? valueProp : valueState;
    var updateValue = React__namespace.useCallback(next => {
      var nextValue = runIfFn(next, value);

      if (!shouldUpdateProp(value, nextValue)) {
        return;
      }

      if (!isControlled) {
        setValue(nextValue);
      }

      onChangeProp(nextValue);
    }, [isControlled, onChangeProp, value, shouldUpdateProp]);
    return [value, updateValue];
  }

  /**
   * Reack hook to measure a component's dimensions
   *
   * @param ref ref of the component to measure
   * @param observe if `true`, resize and scroll observers will be turned on
   */

  function useDimensions(ref, observe) {
    var [dimensions, setDimensions] = React__namespace.useState(null);
    var rafId = React__namespace.useRef();
    useSafeLayoutEffect(() => {
      if (!ref.current) return undefined;
      var node = ref.current;

      function measure() {
        rafId.current = requestAnimationFrame(() => {
          var boxModel = getBox(node);
          setDimensions(boxModel);
        });
      }

      measure();

      if (observe) {
        window.addEventListener("resize", measure);
        window.addEventListener("scroll", measure);
      }

      return () => {
        if (observe) {
          window.removeEventListener("resize", measure);
          window.removeEventListener("scroll", measure);
        }

        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }
      };
    }, [observe]);
    return dimensions;
  }

  // This implementation is heavily inspired by react-aria's implementation
  var defaultIdContext = {
    prefix: Math.round(Math.random() * 10000000000),
    current: 0
  };
  var IdContext = /*#__PURE__*/React__namespace.createContext(defaultIdContext);
  function useId(idProp, prefix) {
    var context = React__namespace.useContext(IdContext);
    return React__namespace.useMemo(() => idProp || [prefix, context.prefix, ++context.current].filter(Boolean).join("-"), // eslint-disable-next-line react-hooks/exhaustive-deps
    [idProp, prefix]);
  }
  /**
   * Reack hook to generate ids for use in compound components
   *
   * @param idProp the external id passed from the user
   * @param prefixes array of prefixes to use
   *
   * @example
   *
   * ```js
   * const [buttonId, menuId] = useIds("52", "button", "menu")
   *
   * // buttonId will be `button-52`
   * // menuId will be `menu-52`
   * ```
   */

  function useIds(idProp) {
    for (var _len = arguments.length, prefixes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      prefixes[_key - 1] = arguments[_key];
    }

    var id = useId(idProp);
    return React__namespace.useMemo(() => {
      return prefixes.map(prefix => prefix + "-" + id);
    }, [id, prefixes]);
  }

  /**
   * React hook to manage browser event listeners
   *
   * @param event the event name
   * @param handler the event handler function to execute
   * @param doc the dom environment to execute against (defaults to `document`)
   * @param options the event listener options
   *
   * @internal
   */

  function useEventListener(event, handler, env, options) {
    var listener = useCallbackRef(handler);
    React__namespace.useEffect(() => {
      var _runIfFn;

      var node = (_runIfFn = runIfFn(env)) != null ? _runIfFn : document;
      node.addEventListener(event, listener, options);
      return () => {
        node.removeEventListener(event, listener, options);
      };
    }, [event, env, options, listener]);
    return () => {
      var _runIfFn2;

      var node = (_runIfFn2 = runIfFn(env)) != null ? _runIfFn2 : document;
      node.removeEventListener(event, listener, options);
    };
  }

  /**
   * React effect hook that invokes only on update.
   * It doesn't invoke on mount
   */

  var useUpdateEffect = (effect, deps) => {
    var mounted = React__namespace.useRef(false);
    React__namespace.useEffect(() => {
      if (mounted.current) {
        return effect();
      }

      mounted.current = true;
      return undefined; // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
    return mounted.current;
  };

  /**
   * Credit goes to `framer-motion` of this useful utilities.
   * License can be found here: https://github.com/framer/motion
   */
  /**
   * @internal
   */

  function usePointerEvent(env, eventName, handler, options) {
    return useEventListener(getPointerEventName(eventName), wrapPointerEventHandler(handler, eventName === "pointerdown"), env, options);
  }

  function useUnmountEffect(fn, deps) {
    if (deps === void 0) {
      deps = [];
    }

    return React__namespace.useEffect(() => () => fn(), // eslint-disable-next-line react-hooks/exhaustive-deps
    deps);
  }

  /**
   * React hook to persist any value between renders,
   * but keeps it up-to-date if it changes.
   *
   * @param value the value or function to persist
   */

  function useLatestRef(value) {
    var ref = React__namespace.useRef(null);
    ref.current = value;
    return ref;
  }

  function usePanGesture(ref, props) {
    var {
      onPan,
      onPanStart,
      onPanEnd,
      onPanSessionStart,
      onPanSessionEnd
    } = props;
    var hasPanEvents = Boolean(onPan || onPanStart || onPanEnd || onPanSessionStart || onPanSessionEnd);
    var panSession = React.useRef(null);
    var handlers = {
      onSessionStart: onPanSessionStart,
      onSessionEnd: onPanSessionEnd,
      onStart: onPanStart,
      onMove: onPan,

      onEnd(event, info) {
        panSession.current = null;
        onPanEnd == null ? void 0 : onPanEnd(event, info);
      }

    };
    React.useEffect(() => {
      var _panSession$current;

      (_panSession$current = panSession.current) == null ? void 0 : _panSession$current.updateHandlers(handlers);
    });

    function onPointerDown(event) {
      panSession.current = new PanSession(event, handlers);
    }

    usePointerEvent(() => ref.current, "pointerdown", hasPanEvents ? onPointerDown : noop);
    useUnmountEffect(() => {
      var _panSession$current2;

      (_panSession$current2 = panSession.current) == null ? void 0 : _panSession$current2.end();
      panSession.current = null;
    });
  }

  function usePrevious(value) {
    var ref = React.useRef();
    React.useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }

  var classNames = {
    light: "chakra-ui-light",
    dark: "chakra-ui-dark"
  };
  /**
   * SSR: Graceful fallback for the `body` element
   */

  var mockBody = {
    classList: {
      add: noop,
      remove: noop
    }
  };

  var getBody = () => isBrowser$1 ? document.body : mockBody;
  /**
   * Function to add/remove class from `body` based on color mode
   */


  function syncBodyClassName(isDark) {
    var body = getBody();
    body.classList.add(isDark ? classNames.dark : classNames.light);
    body.classList.remove(isDark ? classNames.light : classNames.dark);
  }
  /**
   * Check if JS media query matches the query string passed
   */

  function getMediaQuery(query) {
    var mediaQueryList = window.matchMedia == null ? void 0 : window.matchMedia(query);

    if (!mediaQueryList) {
      return undefined;
    }

    return !!mediaQueryList.media === mediaQueryList.matches;
  }

  var queries = {
    light: "(prefers-color-scheme: light)",
    dark: "(prefers-color-scheme: dark)"
  };
  function getColorScheme(fallback) {
    var _getMediaQuery;

    var isDark = (_getMediaQuery = getMediaQuery(queries.dark)) != null ? _getMediaQuery : fallback === "dark";
    return isDark ? "dark" : "light";
  }
  /**
   * Adds system os color mode listener, and run the callback
   * once preference changes
   */

  function addListener(fn) {
    if (!("matchMedia" in window)) {
      return noop;
    }

    var mediaQueryList = window.matchMedia(queries.dark);

    var listener = () => {
      fn(mediaQueryList.matches ? "dark" : "light");
    };

    listener();
    mediaQueryList.addListener(listener);
    return () => {
      mediaQueryList.removeListener(listener);
    };
  }
  var root = {
    get: () => document.documentElement.style.getPropertyValue("--chakra-ui-color-mode"),
    set: mode => {
      if (isBrowser$1) {
        document.documentElement.style.setProperty("--chakra-ui-color-mode", mode);
      }
    }
  };

  var hasSupport = () => typeof Storage !== "undefined";

  var storageKey = "chakra-ui-color-mode";
  /**
   * Simple object to handle read-write to localStorage
   */

  var localStorageManager = {
    get(init) {
      if (!hasSupport()) return init;

      try {
        var _value = localStorage.getItem(storageKey);

        return _value != null ? _value : init;
      } catch (error) {

        return init;
      }
    },

    set(value) {
      if (!hasSupport()) return;

      try {
        localStorage.setItem(storageKey, value);
      } catch (error) {
      }
    },

    type: "localStorage"
  };

  var ColorModeContext = /*#__PURE__*/React__namespace.createContext({});
  /**
   * React hook that reads from `ColorModeProvider` context
   * Returns the color mode and function to toggle it
   */


  var useColorMode = () => {
    var context = React__namespace.useContext(ColorModeContext);

    if (context === undefined) {
      throw new Error("useColorMode must be used within a ColorModeProvider");
    }

    return context;
  };
  /**
   * Provides context for the color mode based on config in `theme`
   * Returns the color mode and function to toggle the color mode
   */

  function ColorModeProvider(props) {
    var {
      value,
      children,
      options: {
        useSystemColorMode,
        initialColorMode
      },
      colorModeManager = localStorageManager
    } = props;
    /**
     * Only attempt to retrieve if we're on the server. Else this will result
     * in a hydration mismatch warning and partially invalid visuals.
     *
     * Else fallback safely to `theme.config.initialColormode` (default light)
     */

    var [colorMode, rawSetColorMode] = React__namespace.useState(colorModeManager.type === "cookie" ? colorModeManager.get(initialColorMode) : initialColorMode);
    React__namespace.useEffect(() => {
      /**
       * Since we cannot initially retrieve localStorage to due above mentioned
       * reasons, do so after hydration.
       *
       * Priority:
       * - system color mode
       * - defined value on <ColorModeScript />, if present
       * - previously stored value
       */
      if (isBrowser$1 && colorModeManager.type === "localStorage") {
        var mode = useSystemColorMode ? getColorScheme(initialColorMode) : root.get() || colorModeManager.get();

        if (mode) {
          rawSetColorMode(mode);
        }
      }
    }, [colorModeManager, useSystemColorMode, initialColorMode]);
    React__namespace.useEffect(() => {
      var isDark = colorMode === "dark";
      syncBodyClassName(isDark);
      root.set(isDark ? "dark" : "light");
    }, [colorMode]);
    var setColorMode = React__namespace.useCallback(value => {
      colorModeManager.set(value);
      rawSetColorMode(value);
    }, [colorModeManager]);
    var toggleColorMode = React__namespace.useCallback(() => {
      setColorMode(colorMode === "light" ? "dark" : "light");
    }, [colorMode, setColorMode]);
    React__namespace.useEffect(() => {
      var removeListener;

      if (useSystemColorMode) {
        removeListener = addListener(setColorMode);
      }

      return () => {
        if (removeListener && useSystemColorMode) {
          removeListener();
        }
      };
    }, [setColorMode, useSystemColorMode]); // presence of `value` indicates a controlled context

    var context = React__namespace.useMemo(() => ({
      colorMode: value != null ? value : colorMode,
      toggleColorMode: value ? noop : toggleColorMode,
      setColorMode: value ? noop : setColorMode
    }), [colorMode, setColorMode, toggleColorMode, value]);
    return /*#__PURE__*/React__namespace.createElement(ColorModeContext.Provider, {
      value: context
    }, children);
  }

  var tokenToCSSVar = (scale, value) => theme => {
    var valueStr = String(value);
    var key = scale ? scale + "." + valueStr : valueStr;
    return isObject(theme.__cssMap) && key in theme.__cssMap ? theme.__cssMap[key].varRef : value;
  };
  function createTransform(options) {
    var {
      scale,
      transform,
      compose
    } = options;

    var fn = (value, theme) => {
      var _transform;

      var _value = tokenToCSSVar(scale, value)(theme);

      var result = (_transform = transform == null ? void 0 : transform(_value, theme)) != null ? _transform : _value;

      if (compose) {
        result = compose(result, theme);
      }

      return result;
    };

    return fn;
  }

  function toConfig(scale, transform) {
    return property => {
      var result = {
        property,
        scale
      };
      result.transform = createTransform({
        scale,
        transform
      });
      return result;
    };
  }

  var getRtl = _ref => {
    var {
      rtl,
      ltr
    } = _ref;
    return theme => theme.direction === "rtl" ? rtl : ltr;
  };

  function logical(options) {
    var {
      property,
      scale,
      transform
    } = options;
    return {
      scale,
      property: getRtl(property),
      transform: scale ? createTransform({
        scale,
        compose: transform
      }) : transform
    };
  }

  /**
   * The CSS transform order following the upcoming spec from CSSWG
   * translate => rotate => scale => skew
   * @see https://drafts.csswg.org/css-transforms-2/#ctm
   * @see https://www.stefanjudis.com/blog/order-in-css-transformation-transform-functions-vs-individual-transforms/
   */
  var transformTemplate = ["rotate(var(--chakra-rotate, 0))", "scaleX(var(--chakra-scale-x, 1))", "scaleY(var(--chakra-scale-y, 1))", "skewX(var(--chakra-skew-x, 0))", "skewY(var(--chakra-skew-y, 0))"];
  function getTransformTemplate() {
    return ["translateX(var(--chakra-translate-x, 0))", "translateY(var(--chakra-translate-y, 0))", ...transformTemplate].join(" ");
  }
  function getTransformGpuTemplate() {
    return ["translate3d(var(--chakra-translate-x, 0), var(--chakra-translate-y, 0), 0)", ...transformTemplate].join(" ");
  }
  var filterTemplate = {
    "--chakra-blur": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-brightness": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-contrast": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-grayscale": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-hue-rotate": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-invert": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-saturate": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-sepia": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-drop-shadow": "var(--chakra-empty,/*!*/ /*!*/)",
    filter: ["var(--chakra-blur)", "var(--chakra-brightness)", "var(--chakra-contrast)", "var(--chakra-grayscale)", "var(--chakra-hue-rotate)", "var(--chakra-invert)", "var(--chakra-saturate)", "var(--chakra-sepia)", "var(--chakra-drop-shadow)"].join(" ")
  };
  var backdropFilterTemplate = {
    backdropFilter: ["var(--chakra-backdrop-blur)", "var(--chakra-backdrop-brightness)", "var(--chakra-backdrop-contrast)", "var(--chakra-backdrop-grayscale)", "var(--chakra-backdrop-hue-rotate)", "var(--chakra-backdrop-invert)", "var(--chakra-backdrop-opacity)", "var(--chakra-backdrop-saturate)", "var(--chakra-backdrop-sepia)"].join(" "),
    "--chakra-backdrop-blur": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-backdrop-brightness": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-backdrop-contrast": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-backdrop-grayscale": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-backdrop-hue-rotate": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-backdrop-invert": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-backdrop-opacity": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-backdrop-saturate": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-backdrop-sepia": "var(--chakra-empty,/*!*/ /*!*/)"
  };
  function getRingTemplate(value) {
    return {
      "--chakra-ring-offset-shadow": "var(--chakra-ring-inset) 0 0 0 var(--chakra-ring-offset-width) var(--chakra-ring-offset-color)",
      "--chakra-ring-shadow": "var(--chakra-ring-inset) 0 0 0 calc(var(--chakra-ring-width) + var(--chakra-ring-offset-width)) var(--chakra-ring-color)",
      "--chakra-ring-width": value,
      boxShadow: ["var(--chakra-ring-offset-shadow)", "var(--chakra-ring-shadow)", "var(--chakra-shadow, 0 0 #0000)"].join(", ")
    };
  }
  var flexDirectionTemplate = {
    "row-reverse": {
      space: "--chakra-space-x-reverse",
      divide: "--chakra-divide-x-reverse"
    },
    "column-reverse": {
      space: "--chakra-space-y-reverse",
      divide: "--chakra-divide-y-reverse"
    }
  };
  var owlSelector = "& > :not(style) ~ :not(style)";
  var spaceXTemplate = {
    [owlSelector]: {
      marginInlineStart: "calc(var(--chakra-space-x) * calc(1 - var(--chakra-space-x-reverse)))",
      marginInlineEnd: "calc(var(--chakra-space-x) * var(--chakra-space-x-reverse))"
    }
  };
  var spaceYTemplate = {
    [owlSelector]: {
      marginTop: "calc(var(--chakra-space-y) * calc(1 - var(--chakra-space-y-reverse)))",
      marginBottom: "calc(var(--chakra-space-y) * var(--chakra-space-y-reverse))"
    }
  };

  function _wrapRegExp(re, groups) {
    _wrapRegExp = function _wrapRegExp(re, groups) {
      return new BabelRegExp(re, undefined, groups);
    };

    var _RegExp = _wrapNativeSuper(RegExp);

    var _super = RegExp.prototype;

    var _groups = new WeakMap();

    function BabelRegExp(re, flags, groups) {
      var _this = _RegExp.call(this, re, flags);

      _groups.set(_this, groups || _groups.get(re));

      return _this;
    }

    _inherits(BabelRegExp, _RegExp);

    BabelRegExp.prototype.exec = function (str) {
      var result = _super.exec.call(this, str);

      if (result) result.groups = buildGroups(result, this);
      return result;
    };

    BabelRegExp.prototype[Symbol.replace] = function (str, substitution) {
      if (typeof substitution === "string") {
        var groups = _groups.get(this);

        return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) {
          return "$" + groups[name];
        }));
      } else if (typeof substitution === "function") {
        var _this = this;

        return _super[Symbol.replace].call(this, str, function () {
          var args = [];
          args.push.apply(args, arguments);

          if (typeof args[args.length - 1] !== "object") {
            args.push(buildGroups(args, _this));
          }

          return substitution.apply(this, args);
        });
      } else {
        return _super[Symbol.replace].call(this, str, substitution);
      }
    };

    function buildGroups(result, re) {
      var g = _groups.get(re);

      return Object.keys(g).reduce(function (groups, name) {
        groups[name] = result[g[name]];
        return groups;
      }, Object.create(null));
    }

    return _wrapRegExp.apply(this, arguments);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  var directionMap = {
    "to-t": "to top",
    "to-tr": "to top right",
    "to-r": "to right",
    "to-br": "to bottom right",
    "to-b": "to bottom",
    "to-bl": "to bottom left",
    "to-l": "to left",
    "to-tl": "to top left"
  };
  var valueSet = new Set(Object.values(directionMap));
  var globalSet = new Set(["none", "-moz-initial", "inherit", "initial", "revert", "unset"]);

  var trimSpace = str => str.trim();

  function parseGradient(value, theme) {
    var _regex$exec$groups, _regex$exec;

    if (value == null || globalSet.has(value)) return value;

    var regex = /*#__PURE__*/_wrapRegExp(/(^[\x2DA-Za-z]+)\(((.*))\)/g, {
      type: 1,
      values: 2
    });

    var {
      type,
      values
    } = (_regex$exec$groups = (_regex$exec = regex.exec(value)) == null ? void 0 : _regex$exec.groups) != null ? _regex$exec$groups : {};
    if (!type || !values) return value;

    var _type = type.includes("-gradient") ? type : type + "-gradient";

    var [maybeDirection, ...stops] = values.split(",").map(trimSpace).filter(Boolean);
    if ((stops == null ? void 0 : stops.length) === 0) return value;
    var direction = maybeDirection in directionMap ? directionMap[maybeDirection] : maybeDirection;
    stops.unshift(direction);

    var _values = stops.map(stop => {
      // if stop is valid shorthand direction, return it
      if (valueSet.has(stop)) return stop; // color stop could be `red.200 20%` based on css gradient spec

      var [_color, _stop] = stop.split(" "); // else, get and transform the color token or css value

      var key = "colors." + _color;
      var color = key in theme.__cssMap ? theme.__cssMap[key].varRef : _color;
      return _stop ? [color, _stop].join(" ") : color;
    });

    return _type + "(" + _values.join(", ") + ")";
  }
  var gradientTransform = (value, theme) => parseGradient(value, theme != null ? theme : {});

  var analyzeCSSValue = value => {
    var num = parseFloat(value.toString());
    var unit = value.toString().replace(String(num), "");
    return {
      unitless: !unit,
      value: num,
      unit
    };
  };

  var wrap = str => value => str + "(" + value + ")";

  var transformFunctions = {
    filter(value) {
      return value !== "auto" ? value : filterTemplate;
    },

    backdropFilter(value) {
      return value !== "auto" ? value : backdropFilterTemplate;
    },

    ring(value) {
      return getRingTemplate(transformFunctions.px(value));
    },

    bgClip(value) {
      return value === "text" ? {
        color: "transparent",
        backgroundClip: "text"
      } : {
        backgroundClip: value
      };
    },

    transform(value) {
      if (value === "auto") return getTransformTemplate();
      if (value === "auto-gpu") return getTransformGpuTemplate();
      return value;
    },

    px(value) {
      if (value == null) return value;
      var {
        unitless
      } = analyzeCSSValue(value);
      return unitless || isNumber(value) ? value + "px" : value;
    },

    fraction(value) {
      return !isNumber(value) || value > 1 ? value : value * 100 + "%";
    },

    float(value, theme) {
      var map = {
        left: "right",
        right: "left"
      };
      return theme.direction === "rtl" ? map[value] : value;
    },

    degree(value) {
      if (isCssVar(value) || value == null) return value;
      var unitless = isString(value) && !value.endsWith("deg");
      return isNumber(value) || unitless ? value + "deg" : value;
    },

    gradient: gradientTransform,
    blur: wrap("blur"),
    opacity: wrap("opacity"),
    brightness: wrap("brightness"),
    contrast: wrap("contrast"),
    dropShadow: wrap("drop-shadow"),
    grayscale: wrap("grayscale"),
    hueRotate: wrap("hue-rotate"),
    invert: wrap("invert"),
    saturate: wrap("saturate"),
    sepia: wrap("sepia"),

    bgImage(value) {
      if (value == null) return value;
      var prevent = isCSSFunction(value) || globalSet.has(value);
      return !prevent ? "url(" + value + ")" : value;
    },

    outline(value) {
      var isNoneOrZero = String(value) === "0" || String(value) === "none";
      return value !== null && isNoneOrZero ? {
        outline: "2px solid transparent",
        outlineOffset: "2px"
      } : {
        outline: value
      };
    },

    flexDirection(value) {
      var _flexDirectionTemplat;

      var {
        space,
        divide
      } = (_flexDirectionTemplat = flexDirectionTemplate[value]) != null ? _flexDirectionTemplat : {};
      var result = {
        flexDirection: value
      };
      if (space) result[space] = 1;
      if (divide) result[divide] = 1;
      return result;
    }

  };

  var isCSSFunction = value => {
    return isString(value) && value.includes("(") && value.includes(")");
  };

  function _extends$w() {
    _extends$w = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$w.apply(this, arguments);
  }
  var t = {
    borderWidths: toConfig("borderWidths"),
    borderStyles: toConfig("borderStyles"),
    colors: toConfig("colors"),
    borders: toConfig("borders"),
    radii: toConfig("radii", transformFunctions.px),
    space: toConfig("space", transformFunctions.px),
    spaceT: toConfig("space", transformFunctions.px),

    degreeT(property) {
      return {
        property,
        transform: transformFunctions.degree
      };
    },

    prop(property, scale, transform) {
      return _extends$w({
        property,
        scale
      }, scale && {
        transform: createTransform({
          scale,
          transform
        })
      });
    },

    propT(property, transform) {
      return {
        property,
        transform
      };
    },

    sizes: toConfig("sizes", transformFunctions.px),
    sizesT: toConfig("sizes", transformFunctions.fraction),
    shadows: toConfig("shadows"),
    logical,
    blur: toConfig("blur", transformFunctions.blur)
  };

  var background = {
    background: t.colors("background"),
    backgroundColor: t.colors("backgroundColor"),
    backgroundImage: t.propT("backgroundImage", transformFunctions.bgImage),
    backgroundSize: true,
    backgroundPosition: true,
    backgroundRepeat: true,
    backgroundAttachment: true,
    backgroundClip: {
      transform: transformFunctions.bgClip
    },
    bgSize: t.prop("backgroundSize"),
    bgPosition: t.prop("backgroundPosition"),
    bg: t.colors("background"),
    bgColor: t.colors("backgroundColor"),
    bgPos: t.prop("backgroundPosition"),
    bgRepeat: t.prop("backgroundRepeat"),
    bgAttachment: t.prop("backgroundAttachment"),
    bgGradient: t.propT("backgroundImage", transformFunctions.gradient),
    bgClip: {
      transform: transformFunctions.bgClip
    }
  };
  Object.assign(background, {
    bgImage: background.backgroundImage,
    bgImg: background.backgroundImage
  });

  var border = {
    border: t.borders("border"),
    borderWidth: t.borderWidths("borderWidth"),
    borderStyle: t.borderStyles("borderStyle"),
    borderColor: t.colors("borderColor"),
    borderRadius: t.radii("borderRadius"),
    borderTop: t.borders("borderTop"),
    borderBlockStart: t.borders("borderBlockStart"),
    borderTopLeftRadius: t.radii("borderTopLeftRadius"),
    borderStartStartRadius: t.logical({
      scale: "radii",
      property: {
        ltr: "borderTopLeftRadius",
        rtl: "borderTopRightRadius"
      }
    }),
    borderEndStartRadius: t.logical({
      scale: "radii",
      property: {
        ltr: "borderBottomLeftRadius",
        rtl: "borderBottomRightRadius"
      }
    }),
    borderTopRightRadius: t.radii("borderTopRightRadius"),
    borderStartEndRadius: t.logical({
      scale: "radii",
      property: {
        ltr: "borderTopRightRadius",
        rtl: "borderTopLeftRadius"
      }
    }),
    borderEndEndRadius: t.logical({
      scale: "radii",
      property: {
        ltr: "borderBottomRightRadius",
        rtl: "borderBottomLeftRadius"
      }
    }),
    borderRight: t.borders("borderRight"),
    borderInlineEnd: t.borders("borderInlineEnd"),
    borderBottom: t.borders("borderBottom"),
    borderBlockEnd: t.borders("borderBlockEnd"),
    borderBottomLeftRadius: t.radii("borderBottomLeftRadius"),
    borderBottomRightRadius: t.radii("borderBottomRightRadius"),
    borderLeft: t.borders("borderLeft"),
    borderInlineStart: {
      property: "borderInlineStart",
      scale: "borders"
    },
    borderInlineStartRadius: t.logical({
      scale: "radii",
      property: {
        ltr: ["borderTopLeftRadius", "borderBottomLeftRadius"],
        rtl: ["borderTopRightRadius", "borderBottomRightRadius"]
      }
    }),
    borderInlineEndRadius: t.logical({
      scale: "radii",
      property: {
        ltr: ["borderTopRightRadius", "borderBottomRightRadius"],
        rtl: ["borderTopLeftRadius", "borderBottomLeftRadius"]
      }
    }),
    borderX: t.borders(["borderLeft", "borderRight"]),
    borderInline: t.borders("borderInline"),
    borderY: t.borders(["borderTop", "borderBottom"]),
    borderBlock: t.borders("borderBlock"),
    borderTopWidth: t.borderWidths("borderTopWidth"),
    borderBlockStartWidth: t.borderWidths("borderBlockStartWidth"),
    borderTopColor: t.colors("borderTopColor"),
    borderBlockStartColor: t.colors("borderBlockStartColor"),
    borderTopStyle: t.borderStyles("borderTopStyle"),
    borderBlockStartStyle: t.borderStyles("borderBlockStartStyle"),
    borderBottomWidth: t.borderWidths("borderBottomWidth"),
    borderBlockEndWidth: t.borderWidths("borderBlockEndWidth"),
    borderBottomColor: t.colors("borderBottomColor"),
    borderBlockEndColor: t.colors("borderBlockEndColor"),
    borderBottomStyle: t.borderStyles("borderBottomStyle"),
    borderBlockEndStyle: t.borderStyles("borderBlockEndStyle"),
    borderLeftWidth: t.borderWidths("borderLeftWidth"),
    borderInlineStartWidth: t.borderWidths("borderInlineStartWidth"),
    borderLeftColor: t.colors("borderLeftColor"),
    borderInlineStartColor: t.colors("borderInlineStartColor"),
    borderLeftStyle: t.borderStyles("borderLeftStyle"),
    borderInlineStartStyle: t.borderStyles("borderInlineStartStyle"),
    borderRightWidth: t.borderWidths("borderRightWidth"),
    borderInlineEndWidth: t.borderWidths("borderInlineEndWidth"),
    borderRightColor: t.colors("borderRightColor"),
    borderInlineEndColor: t.colors("borderInlineEndColor"),
    borderRightStyle: t.borderStyles("borderRightStyle"),
    borderInlineEndStyle: t.borderStyles("borderInlineEndStyle"),
    borderTopRadius: t.radii(["borderTopLeftRadius", "borderTopRightRadius"]),
    borderBottomRadius: t.radii(["borderBottomLeftRadius", "borderBottomRightRadius"]),
    borderLeftRadius: t.radii(["borderTopLeftRadius", "borderBottomLeftRadius"]),
    borderRightRadius: t.radii(["borderTopRightRadius", "borderBottomRightRadius"])
  };
  Object.assign(border, {
    rounded: border.borderRadius,
    roundedTop: border.borderTopRadius,
    roundedTopLeft: border.borderTopLeftRadius,
    roundedTopRight: border.borderTopRightRadius,
    roundedTopStart: border.borderStartStartRadius,
    roundedTopEnd: border.borderStartEndRadius,
    roundedBottom: border.borderBottomRadius,
    roundedBottomLeft: border.borderBottomLeftRadius,
    roundedBottomRight: border.borderBottomRightRadius,
    roundedBottomStart: border.borderEndStartRadius,
    roundedBottomEnd: border.borderEndEndRadius,
    roundedLeft: border.borderLeftRadius,
    roundedRight: border.borderRightRadius,
    roundedStart: border.borderInlineStartRadius,
    roundedEnd: border.borderInlineEndRadius,
    borderStart: border.borderInlineStart,
    borderEnd: border.borderInlineEnd,
    borderTopStartRadius: border.borderStartStartRadius,
    borderTopEndRadius: border.borderStartEndRadius,
    borderBottomStartRadius: border.borderEndStartRadius,
    borderBottomEndRadius: border.borderEndEndRadius,
    borderStartRadius: border.borderInlineStartRadius,
    borderEndRadius: border.borderInlineEndRadius,
    borderStartWidth: border.borderInlineStartWidth,
    borderEndWidth: border.borderInlineEndWidth,
    borderStartColor: border.borderInlineStartColor,
    borderEndColor: border.borderInlineEndColor,
    borderStartStyle: border.borderInlineStartStyle,
    borderEndStyle: border.borderInlineEndStyle
  });
  /**
   * The prop types for border properties listed above
   */

  var color = {
    color: t.colors("color"),
    textColor: t.colors("color"),
    fill: t.colors("fill"),
    stroke: t.colors("stroke")
  };

  var effect = {
    boxShadow: t.shadows("boxShadow"),
    mixBlendMode: true,
    blendMode: t.prop("mixBlendMode"),
    backgroundBlendMode: true,
    bgBlendMode: t.prop("backgroundBlendMode"),
    opacity: true
  };
  Object.assign(effect, {
    shadow: effect.boxShadow
  });
  /**
   * Types for box and text shadow properties
   */

  var filter = {
    filter: {
      transform: transformFunctions.filter
    },
    blur: t.blur("--chakra-blur"),
    brightness: t.propT("--chakra-brightness", transformFunctions.brightness),
    contrast: t.propT("--chakra-contrast", transformFunctions.contrast),
    hueRotate: t.degreeT("--chakra-hue-rotate"),
    invert: t.propT("--chakra-invert", transformFunctions.invert),
    saturate: t.propT("--chakra-saturate", transformFunctions.saturate),
    dropShadow: t.propT("--chakra-drop-shadow", transformFunctions.dropShadow),
    backdropFilter: {
      transform: transformFunctions.backdropFilter
    },
    backdropBlur: t.blur("--chakra-backdrop-blur"),
    backdropBrightness: t.propT("--chakra-backdrop-brightness", transformFunctions.brightness),
    backdropContrast: t.propT("--chakra-backdrop-contrast", transformFunctions.contrast),
    backdropHueRotate: t.degreeT("--chakra-backdrop-hue-rotate"),
    backdropInvert: t.propT("--chakra-backdrop-invert", transformFunctions.invert),
    backdropSaturate: t.propT("--chakra-backdrop-saturate", transformFunctions.saturate)
  };

  var flexbox = {
    alignItems: true,
    alignContent: true,
    justifyItems: true,
    justifyContent: true,
    flexWrap: true,
    flexDirection: {
      transform: transformFunctions.flexDirection
    },
    experimental_spaceX: {
      static: spaceXTemplate,
      transform: createTransform({
        scale: "space",
        transform: value => value !== null ? {
          "--chakra-space-x": value
        } : null
      })
    },
    experimental_spaceY: {
      static: spaceYTemplate,
      transform: createTransform({
        scale: "space",
        transform: value => value != null ? {
          "--chakra-space-y": value
        } : null
      })
    },
    flex: true,
    flexFlow: true,
    flexGrow: true,
    flexShrink: true,
    flexBasis: t.sizes("flexBasis"),
    justifySelf: true,
    alignSelf: true,
    order: true,
    placeItems: true,
    placeContent: true,
    placeSelf: true
  };
  Object.assign(flexbox, {
    flexDir: flexbox.flexDirection
  });

  var grid = {
    gridGap: t.space("gridGap"),
    gridColumnGap: t.space("gridColumnGap"),
    gridRowGap: t.space("gridRowGap"),
    gridColumn: true,
    gridRow: true,
    gridAutoFlow: true,
    gridAutoColumns: true,
    gridColumnStart: true,
    gridColumnEnd: true,
    gridRowStart: true,
    gridRowEnd: true,
    gridAutoRows: true,
    gridTemplate: true,
    gridTemplateColumns: true,
    gridTemplateRows: true,
    gridTemplateAreas: true,
    gridArea: true
  };

  var interactivity = {
    appearance: true,
    cursor: true,
    resize: true,
    userSelect: true,
    pointerEvents: true,
    outline: {
      transform: transformFunctions.outline
    },
    outlineOffset: true,
    outlineColor: t.colors("outlineColor")
  };

  var layout = {
    width: t.sizesT("width"),
    inlineSize: t.sizesT("inlineSize"),
    height: t.sizes("height"),
    blockSize: t.sizes("blockSize"),
    boxSize: t.sizes(["width", "height"]),
    minWidth: t.sizes("minWidth"),
    minInlineSize: t.sizes("minInlineSize"),
    minHeight: t.sizes("minHeight"),
    minBlockSize: t.sizes("minBlockSize"),
    maxWidth: t.sizes("maxWidth"),
    maxInlineSize: t.sizes("maxInlineSize"),
    maxHeight: t.sizes("maxHeight"),
    maxBlockSize: t.sizes("maxBlockSize"),
    d: t.prop("display"),
    overflow: true,
    overflowX: true,
    overflowY: true,
    overscrollBehavior: true,
    overscrollBehaviorX: true,
    overscrollBehaviorY: true,
    display: true,
    verticalAlign: true,
    boxSizing: true,
    boxDecorationBreak: true,
    float: t.propT("float", transformFunctions.float),
    objectFit: true,
    objectPosition: true,
    visibility: true,
    isolation: true
  };
  Object.assign(layout, {
    w: layout.width,
    h: layout.height,
    minW: layout.minWidth,
    maxW: layout.maxWidth,
    minH: layout.minHeight,
    maxH: layout.maxHeight,
    overscroll: layout.overscrollBehavior,
    overscrollX: layout.overscrollBehaviorX,
    overscrollY: layout.overscrollBehaviorY
  });
  /**
   * Types for layout related CSS properties
   */

  var list = {
    listStyleType: true,
    listStylePosition: true,
    listStylePos: t.prop("listStylePosition"),
    listStyleImage: true,
    listStyleImg: t.prop("listStyleImage")
  };

  var srOnly = {
    border: "0px",
    clip: "rect(0, 0, 0, 0)",
    width: "1px",
    height: "1px",
    margin: "-1px",
    padding: "0px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    position: "absolute"
  };
  var srFocusable = {
    position: "static",
    width: "auto",
    height: "auto",
    clip: "auto",
    padding: "0",
    margin: "0",
    overflow: "visible",
    whiteSpace: "normal"
  };

  var getWithPriority = (theme, key, styles) => {
    var result = {};
    var obj = memoizedGet(theme, key, {});

    for (var prop in obj) {
      var isInStyles = prop in styles && styles[prop] != null;
      if (!isInStyles) result[prop] = obj[prop];
    }

    return result;
  };

  var others = {
    srOnly: {
      transform(value) {
        if (value === true) return srOnly;
        if (value === "focusable") return srFocusable;
        return {};
      }

    },
    layerStyle: {
      processResult: true,
      transform: (value, theme, styles) => getWithPriority(theme, "layerStyles." + value, styles)
    },
    textStyle: {
      processResult: true,
      transform: (value, theme, styles) => getWithPriority(theme, "textStyles." + value, styles)
    },
    apply: {
      processResult: true,
      transform: (value, theme, styles) => getWithPriority(theme, value, styles)
    }
  };

  var position = {
    position: true,
    pos: t.prop("position"),
    zIndex: t.prop("zIndex", "zIndices"),
    inset: t.spaceT(["top", "right", "bottom", "left"]),
    insetX: t.spaceT(["left", "right"]),
    insetInline: t.spaceT("insetInline"),
    insetY: t.spaceT(["top", "bottom"]),
    insetBlock: t.spaceT("insetBlock"),
    top: t.spaceT("top"),
    insetBlockStart: t.spaceT("insetBlockStart"),
    bottom: t.spaceT("bottom"),
    insetBlockEnd: t.spaceT("insetBlockEnd"),
    left: t.spaceT("left"),
    insetInlineStart: t.logical({
      scale: "space",
      property: {
        ltr: "left",
        rtl: "right"
      }
    }),
    right: t.spaceT("right"),
    insetInlineEnd: t.logical({
      scale: "space",
      property: {
        ltr: "right",
        rtl: "left"
      }
    })
  };
  Object.assign(position, {
    insetStart: position.insetInlineStart,
    insetEnd: position.insetInlineEnd
  });
  /**
   * Types for position CSS properties
   */

  /**
   * The parser configuration for common outline properties
   */

  var ring = {
    ring: {
      transform: transformFunctions.ring
    },
    ringColor: t.colors("--chakra-ring-color"),
    ringOffset: t.prop("--chakra-ring-offset-width"),
    ringOffsetColor: t.colors("--chakra-ring-offset-color"),
    ringInset: t.prop("--chakra-ring-inset")
  };

  var space = {
    margin: t.spaceT("margin"),
    marginTop: t.spaceT("marginTop"),
    marginBlockStart: t.spaceT("marginBlockStart"),
    marginRight: t.spaceT("marginRight"),
    marginInlineEnd: t.spaceT("marginInlineEnd"),
    marginBottom: t.spaceT("marginBottom"),
    marginBlockEnd: t.spaceT("marginBlockEnd"),
    marginLeft: t.spaceT("marginLeft"),
    marginInlineStart: t.spaceT("marginInlineStart"),
    marginX: t.spaceT(["marginInlineStart", "marginInlineEnd"]),
    marginInline: t.spaceT("marginInline"),
    marginY: t.spaceT(["marginTop", "marginBottom"]),
    marginBlock: t.spaceT("marginBlock"),
    padding: t.space("padding"),
    paddingTop: t.space("paddingTop"),
    paddingBlockStart: t.space("paddingBlockStart"),
    paddingRight: t.space("paddingRight"),
    paddingBottom: t.space("paddingBottom"),
    paddingBlockEnd: t.space("paddingBlockEnd"),
    paddingLeft: t.space("paddingLeft"),
    paddingInlineStart: t.space("paddingInlineStart"),
    paddingInlineEnd: t.space("paddingInlineEnd"),
    paddingX: t.space(["paddingInlineStart", "paddingInlineEnd"]),
    paddingInline: t.space("paddingInline"),
    paddingY: t.space(["paddingTop", "paddingBottom"]),
    paddingBlock: t.space("paddingBlock")
  };
  Object.assign(space, {
    m: space.margin,
    mt: space.marginTop,
    mr: space.marginRight,
    me: space.marginInlineEnd,
    marginEnd: space.marginInlineEnd,
    mb: space.marginBottom,
    ml: space.marginLeft,
    ms: space.marginInlineStart,
    marginStart: space.marginInlineStart,
    mx: space.marginX,
    my: space.marginY,
    p: space.padding,
    pt: space.paddingTop,
    py: space.paddingY,
    px: space.paddingX,
    pb: space.paddingBottom,
    pl: space.paddingLeft,
    ps: space.paddingInlineStart,
    paddingStart: space.paddingInlineStart,
    pr: space.paddingRight,
    pe: space.paddingInlineEnd,
    paddingEnd: space.paddingInlineEnd
  });
  /**
   * Types for space related CSS properties
   */

  var textDecoration = {
    textDecorationColor: t.colors("textDecorationColor"),
    textDecoration: true,
    textDecor: {
      property: "textDecoration"
    },
    textDecorationLine: true,
    textDecorationStyle: true,
    textDecorationThickness: true,
    textUnderlineOffset: true,
    textShadow: t.shadows("textShadow")
  };

  var transform = {
    clipPath: true,
    transform: t.propT("transform", transformFunctions.transform),
    transformOrigin: true,
    translateX: t.spaceT("--chakra-translate-x"),
    translateY: t.spaceT("--chakra-translate-y"),
    skewX: t.degreeT("--chakra-skew-x"),
    skewY: t.degreeT("--chakra-skew-y"),
    scaleX: t.prop("--chakra-scale-x"),
    scaleY: t.prop("--chakra-scale-y"),
    scale: t.prop(["--chakra-scale-x", "--chakra-scale-y"]),
    rotate: t.degreeT("--chakra-rotate")
  };

  var transition$2 = {
    transition: true,
    transitionDelay: true,
    animation: true,
    willChange: true,
    transitionDuration: t.prop("transitionDuration", "transition.duration"),
    transitionProperty: t.prop("transitionProperty", "transition.property"),
    transitionTimingFunction: t.prop("transitionTimingFunction", "transition.easing")
  };

  var typography$2 = {
    fontFamily: t.prop("fontFamily", "fonts"),
    fontSize: t.prop("fontSize", "fontSizes", transformFunctions.px),
    fontWeight: t.prop("fontWeight", "fontWeights"),
    lineHeight: t.prop("lineHeight", "lineHeights"),
    letterSpacing: t.prop("letterSpacing", "letterSpacings"),
    textAlign: true,
    fontStyle: true,
    wordBreak: true,
    overflowWrap: true,
    textOverflow: true,
    textTransform: true,
    whiteSpace: true,
    noOfLines: {
      static: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        //@ts-ignore
        WebkitLineClamp: "var(--chakra-line-clamp)"
      },
      property: "--chakra-line-clamp"
    },
    isTruncated: {
      transform(value) {
        if (value === true) {
          return {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          };
        }
      }

    }
  };
  /**
   * Types for typography related CSS properties
   */

  var group = {
    hover: selector => selector + ":hover &, " + selector + "[data-hover] &",
    focus: selector => selector + ":focus &, " + selector + "[data-focus] &",
    active: selector => selector + ":active &, " + selector + "[data-active] &",
    disabled: selector => selector + ":disabled &, " + selector + "[data-disabled] &",
    invalid: selector => selector + ":invalid &, " + selector + "[data-invalid] &",
    checked: selector => selector + ":checked &, " + selector + "[data-checked] &",
    indeterminate: selector => selector + ":indeterminate &, " + selector + "[aria-checked=mixed] &, " + selector + "[data-indeterminate] &",
    readOnly: selector => selector + ":read-only &, " + selector + "[readonly] &, " + selector + "[data-read-only] &",
    expanded: selector => selector + ":read-only &, " + selector + "[aria-expanded=true] &, " + selector + "[data-expanded] &"
  };

  var toGroup = fn => merge$1(fn, "[role=group]", "[data-group]", ".group");

  var merge$1 = function merge(fn) {
    for (var _len = arguments.length, selectors = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      selectors[_key - 1] = arguments[_key];
    }

    return selectors.map(fn).join(", ");
  };

  var pseudoSelectors = {
    /**
     * Styles for CSS selector `&:hover`
     */
    _hover: "&:hover, &[data-hover]",

    /**
     * Styles for CSS Selector `&:active`
     */
    _active: "&:active, &[data-active]",

    /**
     * Styles for CSS selector `&:focus`
     *
     */
    _focus: "&:focus, &[data-focus]",

    /**
     * Styles for the highlighted state.
     */
    _highlighted: "&[data-highlighted]",

    /**
     * Styles to apply when a child of this element has received focus
     * - CSS Selector `&:focus-within`
     */
    _focusWithin: "&:focus-within",
    _focusVisible: "&:focus-visible",

    /**
     * Styles to apply when this element is disabled. The passed styles are applied to these CSS selectors:
     * - `&[aria-disabled=true]`
     * - `&:disabled`
     * - `&[data-disabled]`
     */
    _disabled: "&[disabled], &[aria-disabled=true], &[data-disabled]",

    /**
     * Styles for CSS Selector `&:readonly`
     */
    _readOnly: "&[aria-readonly=true], &[readonly], &[data-readonly]",

    /**
     * Styles for CSS selector `&::before`
     *
     * NOTE:When using this, ensure the `content` is wrapped in a backtick.
     * @example
     * ```jsx
     * <Box _before={{content:`""` }}/>
     * ```
     */
    _before: "&::before",

    /**
     * Styles for CSS selector `&::after`
     *
     * NOTE:When using this, ensure the `content` is wrapped in a backtick.
     * @example
     * ```jsx
     * <Box _after={{content:`""` }}/>
     * ```
     */
    _after: "&::after",
    _empty: "&:empty",

    /**
     * Styles to apply when the ARIA attribute `aria-expanded` is `true`
     * - CSS selector `&[aria-expanded=true]`
     */
    _expanded: "&[aria-expanded=true], &[data-expanded]",

    /**
     * Styles to apply when the ARIA attribute `aria-checked` is `true`
     * - CSS selector `&[aria-checked=true]`
     */
    _checked: "&[aria-checked=true], &[data-checked]",

    /**
     * Styles to apply when the ARIA attribute `aria-grabbed` is `true`
     * - CSS selector `&[aria-grabbed=true]`
     */
    _grabbed: "&[aria-grabbed=true], &[data-grabbed]",

    /**
     * Styles for CSS Selector `&[aria-pressed=true]`
     * Typically used to style the current "pressed" state of toggle buttons
     */
    _pressed: "&[aria-pressed=true], &[data-pressed]",

    /**
     * Styles to apply when the ARIA attribute `aria-invalid` is `true`
     * - CSS selector `&[aria-invalid=true]`
     */
    _invalid: "&[aria-invalid=true], &[data-invalid]",

    /**
     * Styles for the valid state
     * - CSS selector `&[data-valid], &[data-state=valid]`
     */
    _valid: "&[data-valid], &[data-state=valid]",

    /**
     * Styles for CSS Selector `&[aria-busy=true]` or `&[data-loading=true]`.
     * Useful for styling loading states
     */
    _loading: "&[data-loading], &[aria-busy=true]",

    /**
     * Styles to apply when the ARIA attribute `aria-selected` is `true`
     *
     * - CSS selector `&[aria-selected=true]`
     */
    _selected: "&[aria-selected=true], &[data-selected]",

    /**
     * Styles for CSS Selector `[hidden=true]`
     */
    _hidden: "&[hidden], &[data-hidden]",

    /**
     * Styles for CSS Selector `&:-webkit-autofill`
     */
    _autofill: "&:-webkit-autofill",

    /**
     * Styles for CSS Selector `&:nth-child(even)`
     */
    _even: "&:nth-of-type(even)",

    /**
     * Styles for CSS Selector `&:nth-child(odd)`
     */
    _odd: "&:nth-of-type(odd)",

    /**
     * Styles for CSS Selector `&:first-of-type`
     */
    _first: "&:first-of-type",

    /**
     * Styles for CSS Selector `&:last-of-type`
     */
    _last: "&:last-of-type",

    /**
     * Styles for CSS Selector `&:not(:first-of-type)`
     */
    _notFirst: "&:not(:first-of-type)",

    /**
     * Styles for CSS Selector `&:not(:last-of-type)`
     */
    _notLast: "&:not(:last-of-type)",

    /**
     * Styles for CSS Selector `&:visited`
     */
    _visited: "&:visited",

    /**
     * Used to style the active link in a navigation
     * Styles for CSS Selector `&[aria-current=page]`
     */
    _activeLink: "&[aria-current=page]",

    /**
     * Used to style the current step within a process
     * Styles for CSS Selector `&[aria-current=step]`
     */
    _activeStep: "&[aria-current=step]",

    /**
     * Styles to apply when the ARIA attribute `aria-checked` is `mixed`
     * - CSS selector `&[aria-checked=mixed]`
     */
    _indeterminate: "&:indeterminate, &[aria-checked=mixed], &[data-indeterminate]",

    /**
     * Styles to apply when parent is hovered
     */
    _groupHover: toGroup(group.hover),

    /**
     * Styles to apply when parent is focused
     */
    _groupFocus: toGroup(group.focus),

    /**
     * Styles to apply when parent is active
     */
    _groupActive: toGroup(group.active),

    /**
     * Styles to apply when parent is disabled
     */
    _groupDisabled: toGroup(group.disabled),

    /**
     * Styles to apply when parent is invalid
     */
    _groupInvalid: toGroup(group.invalid),

    /**
     * Styles to apply when parent is checked
     */
    _groupChecked: toGroup(group.checked),

    /**
     * Styles for CSS Selector `&::placeholder`.
     */
    _placeholder: "&::placeholder",

    /**
     * Styles for CSS Selector `&:fullscreen`.
     */
    _fullScreen: "&:fullscreen",

    /**
     * Styles for CSS Selector `&::selection`
     */
    _selection: "&::selection",

    /**
     * Styles for CSS Selector `[dir=rtl] &`
     * It is applied when any parent element has `dir="rtl"`
     */
    _rtl: "[dir=rtl] &",

    /**
     * Styles for CSS Selector `@media (prefers-color-scheme: dark)`
     * used when the user has requested the system
     * use a light or dark color theme.
     */
    _mediaDark: "@media (prefers-color-scheme: dark)",

    /**
     * Styles for when `data-theme` is applied to any parent of
     * this component or element.
     */
    _dark: ".chakra-ui-dark &, [data-theme=dark] &, &[data-theme=dark]",

    /**
     * Styles for when `data-theme` is applied to any parent of
     * this component or element.
     */
    _light: ".chakra-ui-light &, [data-theme=light] &, &[data-theme=light]"
  };
  var pseudoPropNames = objectKeys(pseudoSelectors);

  function _extends$v() {
    _extends$v = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$v.apply(this, arguments);
  }
  var systemProps = mergeWith({}, background, border, color, flexbox, layout, filter, ring, interactivity, grid, others, position, effect, space, typography$2, textDecoration, transform, list, transition$2);
  var layoutSystem = Object.assign({}, space, layout, flexbox, grid, position);
  var layoutPropNames = objectKeys(layoutSystem);
  var propNames = [...objectKeys(systemProps), ...pseudoPropNames];

  var styleProps = _extends$v({}, systemProps, pseudoSelectors);

  var isStyleProp = prop => prop in styleProps;

  /**
   * Expands an array or object syntax responsive style.
   *
   * @example
   * expandResponsive({ mx: [1, 2] })
   * // or
   * expandResponsive({ mx: { base: 1, sm: 2 } })
   *
   * // => { mx: 1, "@media(min-width:<sm>)": { mx: 2 } }
   */

  var expandResponsive = styles => theme => {
    /**
     * Before any style can be processed, the user needs to call `toCSSVar`
     * which analyzes the theme's breakpoint and appends a `__breakpoints` property
     * to the theme with more details of the breakpoints.
     *
     * To learn more, go here: packages/utils/src/responsive.ts #analyzeBreakpoints
     */
    if (!theme.__breakpoints) return styles;
    var {
      isResponsive,
      toArrayValue,
      media: medias
    } = theme.__breakpoints;
    var computedStyles = {};

    for (var key in styles) {
      var value = runIfFn(styles[key], theme);
      if (value == null) continue; // converts the object responsive syntax to array syntax

      value = isObject(value) && isResponsive(value) ? toArrayValue(value) : value;

      if (!Array.isArray(value)) {
        computedStyles[key] = value;
        continue;
      }

      var queries = value.slice(0, medias.length).length;

      for (var index = 0; index < queries; index += 1) {
        var media = medias == null ? void 0 : medias[index];

        if (!media) {
          computedStyles[key] = value[index];
          continue;
        }

        computedStyles[media] = computedStyles[media] || {};

        if (value[index] == null) {
          continue;
        }

        computedStyles[media][key] = value[index];
      }
    }

    return computedStyles;
  };

  var isCSSVariableTokenValue = (key, value) => key.startsWith("--") && isString(value) && !isCssVar(value);

  var resolveTokenValue = (theme, value) => {
    var _ref, _getVar2;

    if (value == null) return value;

    var getVar = val => {
      var _theme$__cssMap, _theme$__cssMap$val;

      return (_theme$__cssMap = theme.__cssMap) == null ? void 0 : (_theme$__cssMap$val = _theme$__cssMap[val]) == null ? void 0 : _theme$__cssMap$val.varRef;
    };

    var getValue = val => {
      var _getVar;

      return (_getVar = getVar(val)) != null ? _getVar : val;
    };

    var valueSplit = value.split(",").map(v => v.trim());
    var [tokenValue, fallbackValue] = valueSplit;
    value = (_ref = (_getVar2 = getVar(tokenValue)) != null ? _getVar2 : getValue(fallbackValue)) != null ? _ref : getValue(value);
    return value;
  };

  function getCss(options) {
    var {
      configs = {},
      pseudos = {},
      theme
    } = options;

    var css = function css(stylesOrFn, nested) {
      if (nested === void 0) {
        nested = false;
      }

      var _styles = runIfFn(stylesOrFn, theme);

      var styles = expandResponsive(_styles)(theme);
      var computedStyles = {};

      for (var key in styles) {
        var _config$transform, _config, _config2, _config3, _config4;

        var valueOrFn = styles[key];
        /**
         * allows the user to pass functional values
         * boxShadow: theme => `0 2px 2px ${theme.colors.red}`
         */

        var value = runIfFn(valueOrFn, theme);
        /**
         * converts pseudo shorthands to valid selector
         * "_hover" => "&:hover"
         */

        if (key in pseudos) {
          key = pseudos[key];
        }
        /**
         * allows the user to use theme tokens in css vars
         * { --banner-height: "sizes.md" } => { --banner-height: "var(--chakra-sizes-md)" }
         *
         * You can also provide fallback values
         * { --banner-height: "sizes.no-exist, 40px" } => { --banner-height: "40px" }
         */


        if (isCSSVariableTokenValue(key, value)) {
          value = resolveTokenValue(theme, value);
        }

        var config = configs[key];

        if (config === true) {
          config = {
            property: key
          };
        }

        if (isObject(value)) {
          var _computedStyles$key;

          computedStyles[key] = (_computedStyles$key = computedStyles[key]) != null ? _computedStyles$key : {};
          computedStyles[key] = mergeWith({}, computedStyles[key], css(value, true));
          continue;
        }

        var rawValue = (_config$transform = (_config = config) == null ? void 0 : _config.transform == null ? void 0 : _config.transform(value, theme, _styles)) != null ? _config$transform : value;
        /**
         * Used for `layerStyle`, `textStyle` and `apply`. After getting the
         * styles in the theme, we need to process them since they might
         * contain theme tokens.
         *
         * `processResult` is the config property we pass to `layerStyle`, `textStyle` and `apply`
         */

        rawValue = (_config2 = config) != null && _config2.processResult ? css(rawValue, true) : rawValue;
        /**
         * allows us define css properties for RTL and LTR.
         *
         * const marginStart = {
         *   property: theme => theme.direction === "rtl" ? "marginRight": "marginLeft",
         * }
         */

        var configProperty = runIfFn((_config3 = config) == null ? void 0 : _config3.property, theme);

        if (!nested && (_config4 = config) != null && _config4.static) {
          var staticStyles = runIfFn(config.static, theme);
          computedStyles = mergeWith({}, computedStyles, staticStyles);
        }

        if (configProperty && Array.isArray(configProperty)) {
          for (var property of configProperty) {
            computedStyles[property] = rawValue;
          }

          continue;
        }

        if (configProperty) {
          if (configProperty === "&" && isObject(rawValue)) {
            computedStyles = mergeWith({}, computedStyles, rawValue);
          } else {
            computedStyles[configProperty] = rawValue;
          }

          continue;
        }

        if (isObject(rawValue)) {
          computedStyles = mergeWith({}, computedStyles, rawValue);
          continue;
        }

        computedStyles[key] = rawValue;
      }

      return computedStyles;
    };

    return css;
  }
  var css$1 = styles => theme => {
    var cssFn = getCss({
      theme,
      pseudos: pseudoSelectors,
      configs: systemProps
    });
    return cssFn(styles);
  };

  /**
   * Thank you @markdalgleish for this piece of art!
   */

  function resolveReference(operand) {
    if (isObject(operand) && operand.reference) {
      return operand.reference;
    }

    return String(operand);
  }

  var toExpression = function toExpression(operator) {
    for (var _len = arguments.length, operands = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      operands[_key - 1] = arguments[_key];
    }

    return operands.map(resolveReference).join(" " + operator + " ").replace(/calc/g, "");
  };

  var _add = function add() {
    for (var _len2 = arguments.length, operands = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      operands[_key2] = arguments[_key2];
    }

    return "calc(" + toExpression("+", ...operands) + ")";
  };

  var _subtract = function subtract() {
    for (var _len3 = arguments.length, operands = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      operands[_key3] = arguments[_key3];
    }

    return "calc(" + toExpression("-", ...operands) + ")";
  };

  var _multiply = function multiply() {
    for (var _len4 = arguments.length, operands = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      operands[_key4] = arguments[_key4];
    }

    return "calc(" + toExpression("*", ...operands) + ")";
  };

  var _divide = function divide() {
    for (var _len5 = arguments.length, operands = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      operands[_key5] = arguments[_key5];
    }

    return "calc(" + toExpression("/", ...operands) + ")";
  };

  var _negate = x => {
    var value = resolveReference(x);

    if (value != null && !Number.isNaN(parseFloat(value))) {
      return String(value).startsWith("-") ? String(value).slice(1) : "-" + value;
    }

    return _multiply(value, -1);
  };

  var calc = Object.assign(x => ({
    add: function add() {
      for (var _len6 = arguments.length, operands = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        operands[_key6] = arguments[_key6];
      }

      return calc(_add(x, ...operands));
    },
    subtract: function subtract() {
      for (var _len7 = arguments.length, operands = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        operands[_key7] = arguments[_key7];
      }

      return calc(_subtract(x, ...operands));
    },
    multiply: function multiply() {
      for (var _len8 = arguments.length, operands = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        operands[_key8] = arguments[_key8];
      }

      return calc(_multiply(x, ...operands));
    },
    divide: function divide() {
      for (var _len9 = arguments.length, operands = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        operands[_key9] = arguments[_key9];
      }

      return calc(_divide(x, ...operands));
    },
    negate: () => calc(_negate(x)),
    toString: () => x.toString()
  }), {
    add: _add,
    subtract: _subtract,
    multiply: _multiply,
    divide: _divide,
    negate: _negate
  });

  function replaceWhiteSpace(value, replaceValue) {
    if (replaceValue === void 0) {
      replaceValue = "-";
    }

    return value.replace(/\s+/g, replaceValue);
  }

  function escape(value) {
    var valueStr = replaceWhiteSpace(value.toString());
    if (valueStr.includes("\\.")) return value;
    var isDecimal = !Number.isInteger(parseFloat(value.toString()));
    return isDecimal ? valueStr.replace(".", "\\.") : value;
  }

  function addPrefix(value, prefix) {
    if (prefix === void 0) {
      prefix = "";
    }

    return [prefix, escape(value)].filter(Boolean).join("-");
  }
  function toVarReference(name, fallback) {
    return "var(" + escape(name) + (fallback ? ", " + fallback : "") + ")";
  }
  function toVarDefinition(value, prefix) {
    if (prefix === void 0) {
      prefix = "";
    }

    return "--" + addPrefix(value, prefix);
  }
  function cssVar(name, fallback, cssVarPrefix) {
    var cssVariable = toVarDefinition(name, cssVarPrefix);
    return {
      variable: cssVariable,
      reference: toVarReference(cssVariable, fallback)
    };
  }

  function _extends$u() {
    _extends$u = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$u.apply(this, arguments);
  }
  function createThemeVars(target, options) {
    var context = {
      cssMap: {},
      cssVars: {}
    };
    walkObject(target, (value, path) => {
      var _tokenHandlerMap$firs; // firstKey will be e.g. "space"


      var [firstKey] = path;
      var handler = (_tokenHandlerMap$firs = tokenHandlerMap[firstKey]) != null ? _tokenHandlerMap$firs : tokenHandlerMap.defaultHandler;
      var {
        cssVars,
        cssMap
      } = handler(path, value, options);
      Object.assign(context.cssVars, cssVars);
      Object.assign(context.cssMap, cssMap);
    });
    return context;
  }
  /**
   * Define transformation handlers for ThemeScale
   */

  var tokenHandlerMap = {
    space: (keys, value, options) => {
      var properties = tokenHandlerMap.defaultHandler(keys, value, options);
      var [firstKey, ...referenceKeys] = keys;
      var negativeLookupKey = firstKey + ".-" + referenceKeys.join(".");
      var negativeVarKey = keys.join("-");
      var {
        variable,
        reference
      } = cssVar(negativeVarKey, undefined, options.cssVarPrefix);
      var negativeValue = calc.negate(value);
      var varRef = calc.negate(reference);
      return {
        cssVars: properties.cssVars,
        cssMap: _extends$u({}, properties.cssMap, {
          [negativeLookupKey]: {
            value: "" + negativeValue,
            var: "" + variable,
            varRef
          }
        })
      };
    },
    defaultHandler: (keys, value, options) => {
      var lookupKey = keys.join(".");
      var varKey = keys.join("-");
      var {
        variable,
        reference
      } = cssVar(varKey, undefined, options.cssVarPrefix);
      return {
        cssVars: {
          [variable]: value
        },
        cssMap: {
          [lookupKey]: {
            value,
            var: variable,
            varRef: reference
          }
        }
      };
    }
  };

  function _objectWithoutPropertiesLoose$e(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }
  var tokens = ["colors", "borders", "borderWidths", "borderStyles", "fonts", "fontSizes", "fontWeights", "letterSpacings", "lineHeights", "radii", "space", "shadows", "sizes", "zIndices", "transition", "blur"];
  function extractTokens(theme) {
    var _tokens = tokens;
    return pick(theme, _tokens);
  }
  function omitVars(rawTheme) {
    var cleanTheme = _objectWithoutPropertiesLoose$e(rawTheme, ["__cssMap", "__cssVars", "__breakpoints"]);

    return cleanTheme;
  }

  function _extends$t() {
    _extends$t = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$t.apply(this, arguments);
  }
  function toCSSVar(rawTheme) {
    var _theme$config;
    /**
     * In the case the theme has already been converted to css-var (e.g extending the theme),
     * we can omit the computed css vars and recompute it for the extended theme.
     */


    var theme = omitVars(rawTheme); // omit components and breakpoints from css variable map

    var tokens = extractTokens(theme);
    var cssVarPrefix = (_theme$config = theme.config) == null ? void 0 : _theme$config.cssVarPrefix;
    var {
      /**
       * This is more like a dictionary of tokens users will type `green.500`,
       * and their equivalent css variable.
       */
      cssMap,

      /**
       * The extracted css variables will be stored here, and used in
       * the emotion's <Global/> component to attach variables to `:root`
       */
      cssVars
    } = createThemeVars(tokens, {
      cssVarPrefix
    });
    var defaultCssVars = {
      "--chakra-ring-inset": "var(--chakra-empty,/*!*/ /*!*/)",
      "--chakra-ring-offset-width": "0px",
      "--chakra-ring-offset-color": "#fff",
      "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
      "--chakra-ring-offset-shadow": "0 0 #0000",
      "--chakra-ring-shadow": "0 0 #0000",
      "--chakra-space-x-reverse": "0",
      "--chakra-space-y-reverse": "0"
    };
    Object.assign(theme, {
      __cssVars: _extends$t({}, defaultCssVars, cssVars),
      __cssMap: cssMap,
      __breakpoints: analyzeBreakpoints(theme.breakpoints)
    });
    return theme;
  }

  /* global Map:readonly, Set:readonly, ArrayBuffer:readonly */
  var hasElementType = typeof Element !== 'undefined';
  var hasMap = typeof Map === 'function';
  var hasSet = typeof Set === 'function';
  var hasArrayBuffer = typeof ArrayBuffer === 'function' && !!ArrayBuffer.isView; // Note: We **don't** need `envHasBigInt64Array` in fde es6/index.js

  function equal(a, b) {
    // START: fast-deep-equal es6/index.js 3.1.1
    if (a === b) return true;

    if (a && b && typeof a == 'object' && typeof b == 'object') {
      if (a.constructor !== b.constructor) return false;
      var length, i, keys;

      if (Array.isArray(a)) {
        length = a.length;
        if (length != b.length) return false;

        for (i = length; i-- !== 0;) if (!equal(a[i], b[i])) return false;

        return true;
      } // START: Modifications:
      // 1. Extra `has<Type> &&` helpers in initial condition allow es6 code
      //    to co-exist with es5.
      // 2. Replace `for of` with es5 compliant iteration using `for`.
      //    Basically, take:
      //
      //    ```js
      //    for (i of a.entries())
      //      if (!b.has(i[0])) return false;
      //    ```
      //
      //    ... and convert to:
      //
      //    ```js
      //    it = a.entries();
      //    while (!(i = it.next()).done)
      //      if (!b.has(i.value[0])) return false;
      //    ```
      //
      //    **Note**: `i` access switches to `i.value`.


      var it;

      if (hasMap && a instanceof Map && b instanceof Map) {
        if (a.size !== b.size) return false;
        it = a.entries();

        while (!(i = it.next()).done) if (!b.has(i.value[0])) return false;

        it = a.entries();

        while (!(i = it.next()).done) if (!equal(i.value[1], b.get(i.value[0]))) return false;

        return true;
      }

      if (hasSet && a instanceof Set && b instanceof Set) {
        if (a.size !== b.size) return false;
        it = a.entries();

        while (!(i = it.next()).done) if (!b.has(i.value[0])) return false;

        return true;
      } // END: Modifications


      if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
        length = a.length;
        if (length != b.length) return false;

        for (i = length; i-- !== 0;) if (a[i] !== b[i]) return false;

        return true;
      }

      if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
      if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
      if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) return false;

      for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false; // END: fast-deep-equal
      // START: react-fast-compare
      // custom handling for DOM elements


      if (hasElementType && a instanceof Element) return false; // custom handling for React/Preact

      for (i = length; i-- !== 0;) {
        if ((keys[i] === '_owner' || keys[i] === '__v' || keys[i] === '__o') && a.$$typeof) {
          // React-specific: avoid traversing React elements' _owner
          // Preact-specific: avoid traversing Preact elements' __v and __o
          //    __v = $_original / $_vnode
          //    __o = $_owner
          // These properties contain circular references and are not needed when
          // comparing the actual elements (and not their owners)
          // .$$typeof and ._store on just reasonable markers of elements
          continue;
        } // all other properties should be traversed as usual


        if (!equal(a[keys[i]], b[keys[i]])) return false;
      } // END: react-fast-compare
      // START: fast-deep-equal


      return true;
    }

    return a !== a && b !== b;
  } // end fast-deep-equal


  var reactFastCompare = function isEqual(a, b) {
    try {
      return equal(a, b);
    } catch (error) {
      if ((error.message || '').match(/stack|recursion/i)) {
        // warn on circular references, don't crash
        // browsers give this different errors name and messages:
        // chrome/safari: "RangeError", "Maximum call stack size exceeded"
        // firefox: "InternalError", too much recursion"
        // edge: "Error", "Out of stack space"
        console.warn('react-fast-compare cannot handle circular refs');
        return false;
      } // some other error. we should definitely know about these


      throw error;
    }
  };

  var isEqual = reactFastCompare;

  var ThemeProvider = props => {
    var {
      cssVarsRoot = ":host, :root",
      theme,
      children
    } = props;
    var computedTheme = React__namespace.useMemo(() => toCSSVar(theme), [theme]);
    return /*#__PURE__*/React__namespace.createElement(ThemeProvider$1, {
      theme: computedTheme
    }, /*#__PURE__*/React__namespace.createElement(Global, {
      styles: theme => ({
        [cssVarsRoot]: theme.__cssVars
      })
    }), children);
  };
  function useTheme() {
    var theme = React__namespace.useContext(ThemeContext);

    if (!theme) {
      throw Error("useTheme: `theme` is undefined. Seems you forgot to wrap your app in `<ChakraProvider />` or `<ThemeProvider />`");
    }

    return theme;
  }
  var [StylesProvider, useStyles] = createContext({
    name: "StylesContext",
    errorMessage: "useStyles: `styles` is undefined. Seems you forgot to wrap the components in `<StylesProvider />` "
  });
  /**
   * Applies styles defined in `theme.styles.global` globally
   * using emotion's `Global` component
   */

  var GlobalStyle = () => {
    var {
      colorMode
    } = useColorMode();
    return /*#__PURE__*/React__namespace.createElement(Global, {
      styles: theme => {
        var styleObjectOrFn = memoizedGet(theme, "styles.global");
        var globalStyles = runIfFn(styleObjectOrFn, {
          theme,
          colorMode
        });
        if (!globalStyles) return undefined;
        var styles = css$1(globalStyles)(theme);
        return styles;
      }
    });
  };

  /**
   * Carefully selected html elements for chakra components.
   * This is mostly for `chakra.<element>` syntax.
   */

  var domElements = ["a", "b", "article", "aside", "blockquote", "button", "caption", "cite", "circle", "code", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "img", "input", "kbd", "label", "li", "main", "mark", "nav", "ol", "p", "path", "pre", "q", "rect", "s", "svg", "section", "select", "strong", "small", "span", "sub", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "tr", "ul"];
  function omitThemingProps(props) {
    return omit(props, ["styleConfig", "size", "variant", "colorScheme"]);
  }

  function _extends$s() {
    _extends$s = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$s.apply(this, arguments);
  }
  function useChakra() {
    var colorModeResult = useColorMode();
    var theme = useTheme();
    return _extends$s({}, colorModeResult, {
      theme
    });
  }

  var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

  var isPropValid = /* #__PURE__ */memoize$1(function (prop) {
    return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
    /* o */
    && prop.charCodeAt(1) === 110
    /* n */
    && prop.charCodeAt(2) < 91;
  }
  /* Z+1 */
  );

  var testOmitPropsOnStringTag = isPropValid;

  var testOmitPropsOnComponent = function testOmitPropsOnComponent(key) {
    return key !== 'theme';
  };

  var getDefaultShouldForwardProp = function getDefaultShouldForwardProp(tag) {
    return typeof tag === 'string' && // 96 is one less than the char code
    // for "a" so this is checking that
    // it's a lowercase character
    tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
  };

  var composeShouldForwardProps = function composeShouldForwardProps(tag, options, isReal) {
    var shouldForwardProp;

    if (options) {
      var optionsShouldForwardProp = options.shouldForwardProp;
      shouldForwardProp = tag.__emotion_forwardProp && optionsShouldForwardProp ? function (propName) {
        return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
      } : optionsShouldForwardProp;
    }

    if (typeof shouldForwardProp !== 'function' && isReal) {
      shouldForwardProp = tag.__emotion_forwardProp;
    }

    return shouldForwardProp;
  };
  var isBrowser = typeof document !== 'undefined';

  var createStyled = function createStyled(tag, options) {

    var isReal = tag.__emotion_real === tag;
    var baseTag = isReal && tag.__emotion_base || tag;
    var identifierName;
    var targetClassName;

    if (options !== undefined) {
      identifierName = options.label;
      targetClassName = options.target;
    }

    var shouldForwardProp = composeShouldForwardProps(tag, options, isReal);
    var defaultShouldForwardProp = shouldForwardProp || getDefaultShouldForwardProp(baseTag);
    var shouldUseAs = !defaultShouldForwardProp('as');
    return function () {
      var args = arguments;
      var styles = isReal && tag.__emotion_styles !== undefined ? tag.__emotion_styles.slice(0) : [];

      if (identifierName !== undefined) {
        styles.push("label:" + identifierName + ";");
      }

      if (args[0] == null || args[0].raw === undefined) {
        styles.push.apply(styles, args);
      } else {

        styles.push(args[0][0]);
        var len = args.length;
        var i = 1;

        for (; i < len; i++) {

          styles.push(args[i], args[0][i]);
        }
      } // $FlowFixMe: we need to cast StatelessFunctionalComponent to our PrivateStyledComponent class


      var Styled = withEmotionCache(function (props, cache, ref) {
        var finalTag = shouldUseAs && props.as || baseTag;
        var className = '';
        var classInterpolations = [];
        var mergedProps = props;

        if (props.theme == null) {
          mergedProps = {};

          for (var key in props) {
            mergedProps[key] = props[key];
          }

          mergedProps.theme = React.useContext(ThemeContext);
        }

        if (typeof props.className === 'string') {
          className = getRegisteredStyles(cache.registered, classInterpolations, props.className);
        } else if (props.className != null) {
          className = props.className + " ";
        }

        var serialized = serializeStyles(styles.concat(classInterpolations), cache.registered, mergedProps);
        var rules = insertStyles(cache, serialized, typeof finalTag === 'string');
        className += cache.key + "-" + serialized.name;

        if (targetClassName !== undefined) {
          className += " " + targetClassName;
        }

        var finalShouldForwardProp = shouldUseAs && shouldForwardProp === undefined ? getDefaultShouldForwardProp(finalTag) : defaultShouldForwardProp;
        var newProps = {};

        for (var _key in props) {
          if (shouldUseAs && _key === 'as') continue;

          if ( // $FlowFixMe
          finalShouldForwardProp(_key)) {
            newProps[_key] = props[_key];
          }
        }

        newProps.className = className;
        newProps.ref = ref;
        var ele = /*#__PURE__*/React.createElement(finalTag, newProps);

        if (!isBrowser && rules !== undefined) {
          var _ref;

          var serializedNames = serialized.name;
          var next = serialized.next;

          while (next !== undefined) {
            serializedNames += ' ' + next.name;
            next = next.next;
          }

          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", (_ref = {}, _ref["data-emotion"] = cache.key + " " + serializedNames, _ref.dangerouslySetInnerHTML = {
            __html: rules
          }, _ref.nonce = cache.sheet.nonce, _ref)), ele);
        }

        return ele;
      });
      Styled.displayName = identifierName !== undefined ? identifierName : "Styled(" + (typeof baseTag === 'string' ? baseTag : baseTag.displayName || baseTag.name || 'Component') + ")";
      Styled.defaultProps = tag.defaultProps;
      Styled.__emotion_real = Styled;
      Styled.__emotion_base = baseTag;
      Styled.__emotion_styles = styles;
      Styled.__emotion_forwardProp = shouldForwardProp;
      Object.defineProperty(Styled, 'toString', {
        value: function value() {
          if (targetClassName === undefined && "production" !== 'production') {
            return 'NO_COMPONENT_SELECTOR';
          } // $FlowFixMe: coerce undefined to string


          return "." + targetClassName;
        }
      });

      Styled.withComponent = function (nextTag, nextOptions) {
        return createStyled(nextTag, _extends$y({}, options, nextOptions, {
          shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
        })).apply(void 0, styles);
      };

      return Styled;
    };
  };

  var tags = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', // SVG
  'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];
  var newStyled = createStyled.bind();
  tags.forEach(function (tagName) {
    // $FlowFixMe: we can ignore this because its exposed type is defined by the CreateStyled type
    newStyled[tagName] = newStyled(tagName);
  });

  /**
   * List of props for emotion to omit from DOM.
   * It mostly consists of Chakra props
   */

  var allPropNames = new Set([...propNames, "textStyle", "layerStyle", "apply", "isTruncated", "noOfLines", "focusBorderColor", "errorBorderColor", "as", "__css", "css", "sx"]);
  /**
   * htmlWidth and htmlHeight is used in the <Image />
   * component to support the native `width` and `height` attributes
   *
   * https://github.com/chakra-ui/chakra-ui/issues/149
   */

  var validHTMLProps = new Set(["htmlWidth", "htmlHeight", "htmlSize"]);
  var shouldForwardProp = prop => validHTMLProps.has(prop) || !allPropNames.has(prop);

  function _objectWithoutPropertiesLoose$d(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }
  /**
   * Style resolver function that manages how style props are merged
   * in combination with other possible ways of defining styles.
   *
   * For example, take a component defined this way:
   * ```jsx
   * <Box fontSize="24px" sx={{ fontSize: "40px" }}></Box>
   * ```
   *
   * We want to manage the priority of the styles properly to prevent unwanted
   * behaviors. Right now, the `sx` prop has the highest priority so the resolved
   * fontSize will be `40px`
   */

  var toCSSObject = _ref => {
    var {
      baseStyle
    } = _ref;
    return props => {
      var {
        css: cssProp,
        __css,
        sx
      } = props,
          rest = _objectWithoutPropertiesLoose$d(props, ["theme", "css", "__css", "sx"]);

      var styleProps = objectFilter(rest, (_, prop) => isStyleProp(prop));
      var finalBaseStyle = runIfFn(baseStyle, props);
      var finalStyles = Object.assign({}, __css, finalBaseStyle, filterUndefined(styleProps), sx);
      var computedCSS = css$1(finalStyles)(props.theme);
      return cssProp ? [computedCSS, cssProp] : computedCSS;
    };
  };
  function styled(component, options) {
    var _ref2 = options != null ? options : {},
        {
      baseStyle
    } = _ref2,
        styledOptions = _objectWithoutPropertiesLoose$d(_ref2, ["baseStyle"]);

    if (!styledOptions.shouldForwardProp) {
      styledOptions.shouldForwardProp = shouldForwardProp;
    }

    var styleObject = toCSSObject({
      baseStyle
    });
    return newStyled(component, styledOptions)(styleObject);
  }
  var chakra = styled;
  domElements.forEach(tag => {
    chakra[tag] = chakra(tag);
  });

  /**
   * All credit goes to Chance (Reach UI), Haz (Reakit) and (fluentui)
   * for creating the base type definitions upon which we improved on
   */
  function forwardRef(component) {
    return /*#__PURE__*/React__namespace.forwardRef(component);
  }

  function _objectWithoutPropertiesLoose$c(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }
  function useStyleConfig(themeKey, props, opts) {
    var _styleConfig$defaultP, _opts2;

    if (props === void 0) {
      props = {};
    }

    if (opts === void 0) {
      opts = {};
    }

    var {
      styleConfig: styleConfigProp
    } = props,
        rest = _objectWithoutPropertiesLoose$c(props, ["styleConfig"]);

    var {
      theme,
      colorMode
    } = useChakra();
    var themeStyleConfig = memoizedGet(theme, "components." + themeKey);
    var styleConfig = styleConfigProp || themeStyleConfig;
    var mergedProps = mergeWith({
      theme,
      colorMode
    }, (_styleConfig$defaultP = styleConfig == null ? void 0 : styleConfig.defaultProps) != null ? _styleConfig$defaultP : {}, filterUndefined(omit(rest, ["children"])));
    /**
     * Store the computed styles in a `ref` to avoid unneeded re-computation
     */

    var stylesRef = React.useRef({});
    return React.useMemo(() => {
      if (styleConfig) {
        var _styleConfig$baseStyl, _styleConfig$variants, _styleConfig$variants2, _styleConfig$sizes$me, _styleConfig$sizes, _opts;

        var baseStyles = runIfFn((_styleConfig$baseStyl = styleConfig.baseStyle) != null ? _styleConfig$baseStyl : {}, mergedProps);
        var variants = runIfFn((_styleConfig$variants = (_styleConfig$variants2 = styleConfig.variants) == null ? void 0 : _styleConfig$variants2[mergedProps.variant]) != null ? _styleConfig$variants : {}, mergedProps);
        var sizes = runIfFn((_styleConfig$sizes$me = (_styleConfig$sizes = styleConfig.sizes) == null ? void 0 : _styleConfig$sizes[mergedProps.size]) != null ? _styleConfig$sizes$me : {}, mergedProps);
        var styles = mergeWith({}, baseStyles, sizes, variants);

        if ((_opts = opts) != null && _opts.isMultiPart && styleConfig.parts) {
          styleConfig.parts.forEach(part => {
            var _styles$part;

            styles[part] = (_styles$part = styles[part]) != null ? _styles$part : {};
          });
        }

        var isStyleEqual = isEqual(stylesRef.current, styles);

        if (!isStyleEqual) {
          stylesRef.current = styles;
        }
      }

      return stylesRef.current;
    }, [styleConfig, mergedProps, (_opts2 = opts) == null ? void 0 : _opts2.isMultiPart]);
  }
  function useMultiStyleConfig(themeKey, props) {
    return useStyleConfig(themeKey, props, {
      isMultiPart: true
    });
  }

  var parts$n = ["container", "button", "panel", "icon"];
  var baseStyleContainer$4 = {
    borderTopWidth: "1px",
    borderColor: "inherit",
    _last: {
      borderBottomWidth: "1px"
    }
  };
  var baseStyleButton$1 = {
    transitionProperty: "common",
    transitionDuration: "normal",
    fontSize: "1rem",
    _focus: {
      boxShadow: "outline"
    },
    _hover: {
      bg: "blackAlpha.50"
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    },
    px: 4,
    py: 2
  };
  var baseStylePanel = {
    pt: 2,
    px: 4,
    pb: 5
  };
  var baseStyleIcon$5 = {
    fontSize: "1.25em"
  };
  var baseStyle$D = {
    container: baseStyleContainer$4,
    button: baseStyleButton$1,
    panel: baseStylePanel,
    icon: baseStyleIcon$5
  };
  var Accordion = {
    parts: parts$n,
    baseStyle: baseStyle$D
  };

  var tinycolor = {exports: {}};

  (function (module) {
    // TinyColor v1.4.2
    // https://github.com/bgrins/TinyColor
    // Brian Grinstead, MIT License
    (function (Math) {
      var trimLeft = /^\s+/,
          trimRight = /\s+$/,
          tinyCounter = 0,
          mathRound = Math.round,
          mathMin = Math.min,
          mathMax = Math.max,
          mathRandom = Math.random;

      function tinycolor(color, opts) {
        color = color ? color : '';
        opts = opts || {}; // If input is already a tinycolor, return itself

        if (color instanceof tinycolor) {
          return color;
        } // If we are called as a function, call using new instead


        if (!(this instanceof tinycolor)) {
          return new tinycolor(color, opts);
        }

        var rgb = inputToRGB(color);
        this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = mathRound(100 * this._a) / 100, this._format = opts.format || rgb.format;
        this._gradientType = opts.gradientType; // Don't let the range of [0,255] come back in [0,1].
        // Potentially lose a little bit of precision here, but will fix issues where
        // .5 gets interpreted as half of the total, instead of half of 1
        // If it was supposed to be 128, this was already taken care of by `inputToRgb`

        if (this._r < 1) {
          this._r = mathRound(this._r);
        }

        if (this._g < 1) {
          this._g = mathRound(this._g);
        }

        if (this._b < 1) {
          this._b = mathRound(this._b);
        }

        this._ok = rgb.ok;
        this._tc_id = tinyCounter++;
      }

      tinycolor.prototype = {
        isDark: function () {
          return this.getBrightness() < 128;
        },
        isLight: function () {
          return !this.isDark();
        },
        isValid: function () {
          return this._ok;
        },
        getOriginalInput: function () {
          return this._originalInput;
        },
        getFormat: function () {
          return this._format;
        },
        getAlpha: function () {
          return this._a;
        },
        getBrightness: function () {
          //http://www.w3.org/TR/AERT#color-contrast
          var rgb = this.toRgb();
          return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        },
        getLuminance: function () {
          //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
          var rgb = this.toRgb();
          var RsRGB, GsRGB, BsRGB, R, G, B;
          RsRGB = rgb.r / 255;
          GsRGB = rgb.g / 255;
          BsRGB = rgb.b / 255;

          if (RsRGB <= 0.03928) {
            R = RsRGB / 12.92;
          } else {
            R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
          }

          if (GsRGB <= 0.03928) {
            G = GsRGB / 12.92;
          } else {
            G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
          }

          if (BsRGB <= 0.03928) {
            B = BsRGB / 12.92;
          } else {
            B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
          }

          return 0.2126 * R + 0.7152 * G + 0.0722 * B;
        },
        setAlpha: function (value) {
          this._a = boundAlpha(value);
          this._roundA = mathRound(100 * this._a) / 100;
          return this;
        },
        toHsv: function () {
          var hsv = rgbToHsv(this._r, this._g, this._b);
          return {
            h: hsv.h * 360,
            s: hsv.s,
            v: hsv.v,
            a: this._a
          };
        },
        toHsvString: function () {
          var hsv = rgbToHsv(this._r, this._g, this._b);
          var h = mathRound(hsv.h * 360),
              s = mathRound(hsv.s * 100),
              v = mathRound(hsv.v * 100);
          return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
        },
        toHsl: function () {
          var hsl = rgbToHsl(this._r, this._g, this._b);
          return {
            h: hsl.h * 360,
            s: hsl.s,
            l: hsl.l,
            a: this._a
          };
        },
        toHslString: function () {
          var hsl = rgbToHsl(this._r, this._g, this._b);
          var h = mathRound(hsl.h * 360),
              s = mathRound(hsl.s * 100),
              l = mathRound(hsl.l * 100);
          return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
        },
        toHex: function (allow3Char) {
          return rgbToHex(this._r, this._g, this._b, allow3Char);
        },
        toHexString: function (allow3Char) {
          return '#' + this.toHex(allow3Char);
        },
        toHex8: function (allow4Char) {
          return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
        },
        toHex8String: function (allow4Char) {
          return '#' + this.toHex8(allow4Char);
        },
        toRgb: function () {
          return {
            r: mathRound(this._r),
            g: mathRound(this._g),
            b: mathRound(this._b),
            a: this._a
          };
        },
        toRgbString: function () {
          return this._a == 1 ? "rgb(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" : "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
        },
        toPercentageRgb: function () {
          return {
            r: mathRound(bound01(this._r, 255) * 100) + "%",
            g: mathRound(bound01(this._g, 255) * 100) + "%",
            b: mathRound(bound01(this._b, 255) * 100) + "%",
            a: this._a
          };
        },
        toPercentageRgbString: function () {
          return this._a == 1 ? "rgb(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" : "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
        },
        toName: function () {
          if (this._a === 0) {
            return "transparent";
          }

          if (this._a < 1) {
            return false;
          }

          return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
        },
        toFilter: function (secondColor) {
          var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
          var secondHex8String = hex8String;
          var gradientType = this._gradientType ? "GradientType = 1, " : "";

          if (secondColor) {
            var s = tinycolor(secondColor);
            secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
          }

          return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
        },
        toString: function (format) {
          var formatSet = !!format;
          format = format || this._format;
          var formattedString = false;
          var hasAlpha = this._a < 1 && this._a >= 0;
          var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

          if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === "name" && this._a === 0) {
              return this.toName();
            }

            return this.toRgbString();
          }

          if (format === "rgb") {
            formattedString = this.toRgbString();
          }

          if (format === "prgb") {
            formattedString = this.toPercentageRgbString();
          }

          if (format === "hex" || format === "hex6") {
            formattedString = this.toHexString();
          }

          if (format === "hex3") {
            formattedString = this.toHexString(true);
          }

          if (format === "hex4") {
            formattedString = this.toHex8String(true);
          }

          if (format === "hex8") {
            formattedString = this.toHex8String();
          }

          if (format === "name") {
            formattedString = this.toName();
          }

          if (format === "hsl") {
            formattedString = this.toHslString();
          }

          if (format === "hsv") {
            formattedString = this.toHsvString();
          }

          return formattedString || this.toHexString();
        },
        clone: function () {
          return tinycolor(this.toString());
        },
        _applyModification: function (fn, args) {
          var color = fn.apply(null, [this].concat([].slice.call(args)));
          this._r = color._r;
          this._g = color._g;
          this._b = color._b;
          this.setAlpha(color._a);
          return this;
        },
        lighten: function () {
          return this._applyModification(lighten, arguments);
        },
        brighten: function () {
          return this._applyModification(brighten, arguments);
        },
        darken: function () {
          return this._applyModification(darken, arguments);
        },
        desaturate: function () {
          return this._applyModification(desaturate, arguments);
        },
        saturate: function () {
          return this._applyModification(saturate, arguments);
        },
        greyscale: function () {
          return this._applyModification(greyscale, arguments);
        },
        spin: function () {
          return this._applyModification(spin, arguments);
        },
        _applyCombination: function (fn, args) {
          return fn.apply(null, [this].concat([].slice.call(args)));
        },
        analogous: function () {
          return this._applyCombination(analogous, arguments);
        },
        complement: function () {
          return this._applyCombination(complement, arguments);
        },
        monochromatic: function () {
          return this._applyCombination(monochromatic, arguments);
        },
        splitcomplement: function () {
          return this._applyCombination(splitcomplement, arguments);
        },
        triad: function () {
          return this._applyCombination(triad, arguments);
        },
        tetrad: function () {
          return this._applyCombination(tetrad, arguments);
        }
      }; // If input is an object, force 1 into "1.0" to handle ratios properly
      // String input requires "1.0" as input, so 1 will be treated as 1

      tinycolor.fromRatio = function (color, opts) {
        if (typeof color == "object") {
          var newColor = {};

          for (var i in color) {
            if (color.hasOwnProperty(i)) {
              if (i === "a") {
                newColor[i] = color[i];
              } else {
                newColor[i] = convertToPercentage(color[i]);
              }
            }
          }

          color = newColor;
        }

        return tinycolor(color, opts);
      }; // Given a string or object, convert that input to RGB
      // Possible string inputs:
      //
      //     "red"
      //     "#f00" or "f00"
      //     "#ff0000" or "ff0000"
      //     "#ff000000" or "ff000000"
      //     "rgb 255 0 0" or "rgb (255, 0, 0)"
      //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
      //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
      //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
      //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
      //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
      //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
      //


      function inputToRGB(color) {
        var rgb = {
          r: 0,
          g: 0,
          b: 0
        };
        var a = 1;
        var s = null;
        var v = null;
        var l = null;
        var ok = false;
        var format = false;

        if (typeof color == "string") {
          color = stringInputToObject(color);
        }

        if (typeof color == "object") {
          if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
          } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = "hsv";
          } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = "hsl";
          }

          if (color.hasOwnProperty("a")) {
            a = color.a;
          }
        }

        a = boundAlpha(a);
        return {
          ok: ok,
          format: color.format || format,
          r: mathMin(255, mathMax(rgb.r, 0)),
          g: mathMin(255, mathMax(rgb.g, 0)),
          b: mathMin(255, mathMax(rgb.b, 0)),
          a: a
        };
      } // Conversion Functions
      // --------------------
      // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
      // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>
      // `rgbToRgb`
      // Handle bounds / percentage checking to conform to CSS color spec
      // <http://www.w3.org/TR/css3-color/>
      // *Assumes:* r, g, b in [0, 255] or [0, 1]
      // *Returns:* { r, g, b } in [0, 255]


      function rgbToRgb(r, g, b) {
        return {
          r: bound01(r, 255) * 255,
          g: bound01(g, 255) * 255,
          b: bound01(b, 255) * 255
        };
      } // `rgbToHsl`
      // Converts an RGB color value to HSL.
      // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
      // *Returns:* { h, s, l } in [0,1]


      function rgbToHsl(r, g, b) {
        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);
        var max = mathMax(r, g, b),
            min = mathMin(r, g, b);
        var h,
            s,
            l = (max + min) / 2;

        if (max == min) {
          h = s = 0; // achromatic
        } else {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;

            case g:
              h = (b - r) / d + 2;
              break;

            case b:
              h = (r - g) / d + 4;
              break;
          }

          h /= 6;
        }

        return {
          h: h,
          s: s,
          l: l
        };
      } // `hslToRgb`
      // Converts an HSL color value to RGB.
      // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
      // *Returns:* { r, g, b } in the set [0, 255]


      function hslToRgb(h, s, l) {
        var r, g, b;
        h = bound01(h, 360);
        s = bound01(s, 100);
        l = bound01(l, 100);

        function hue2rgb(p, q, t) {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        }

        if (s === 0) {
          r = g = b = l; // achromatic
        } else {
          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }

        return {
          r: r * 255,
          g: g * 255,
          b: b * 255
        };
      } // `rgbToHsv`
      // Converts an RGB color value to HSV
      // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
      // *Returns:* { h, s, v } in [0,1]


      function rgbToHsv(r, g, b) {
        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);
        var max = mathMax(r, g, b),
            min = mathMin(r, g, b);
        var h,
            s,
            v = max;
        var d = max - min;
        s = max === 0 ? 0 : d / max;

        if (max == min) {
          h = 0; // achromatic
        } else {
          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;

            case g:
              h = (b - r) / d + 2;
              break;

            case b:
              h = (r - g) / d + 4;
              break;
          }

          h /= 6;
        }

        return {
          h: h,
          s: s,
          v: v
        };
      } // `hsvToRgb`
      // Converts an HSV color value to RGB.
      // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
      // *Returns:* { r, g, b } in the set [0, 255]


      function hsvToRgb(h, s, v) {
        h = bound01(h, 360) * 6;
        s = bound01(s, 100);
        v = bound01(v, 100);
        var i = Math.floor(h),
            f = h - i,
            p = v * (1 - s),
            q = v * (1 - f * s),
            t = v * (1 - (1 - f) * s),
            mod = i % 6,
            r = [v, q, p, p, t, v][mod],
            g = [t, v, v, q, p, p][mod],
            b = [p, p, t, v, v, q][mod];
        return {
          r: r * 255,
          g: g * 255,
          b: b * 255
        };
      } // `rgbToHex`
      // Converts an RGB color to hex
      // Assumes r, g, and b are contained in the set [0, 255]
      // Returns a 3 or 6 character hex


      function rgbToHex(r, g, b, allow3Char) {
        var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))]; // Return a 3 character hex if possible

        if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
          return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
        }

        return hex.join("");
      } // `rgbaToHex`
      // Converts an RGBA color plus alpha transparency to hex
      // Assumes r, g, b are contained in the set [0, 255] and
      // a in [0, 1]. Returns a 4 or 8 character rgba hex


      function rgbaToHex(r, g, b, a, allow4Char) {
        var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16)), pad2(convertDecimalToHex(a))]; // Return a 4 character hex if possible

        if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
          return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
        }

        return hex.join("");
      } // `rgbaToArgbHex`
      // Converts an RGBA color to an ARGB Hex8 string
      // Rarely used, but required for "toFilter()"


      function rgbaToArgbHex(r, g, b, a) {
        var hex = [pad2(convertDecimalToHex(a)), pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];
        return hex.join("");
      } // `equals`
      // Can be called with any tinycolor input


      tinycolor.equals = function (color1, color2) {
        if (!color1 || !color2) {
          return false;
        }

        return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
      };

      tinycolor.random = function () {
        return tinycolor.fromRatio({
          r: mathRandom(),
          g: mathRandom(),
          b: mathRandom()
        });
      }; // Modification Functions
      // ----------------------
      // Thanks to less.js for some of the basics here
      // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>


      function desaturate(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.s -= amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
      }

      function saturate(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.s += amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
      }

      function greyscale(color) {
        return tinycolor(color).desaturate(100);
      }

      function lighten(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.l += amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
      }

      function brighten(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var rgb = tinycolor(color).toRgb();
        rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
        rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
        rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
        return tinycolor(rgb);
      }

      function darken(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.l -= amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
      } // Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
      // Values outside of this range will be wrapped into this range.


      function spin(color, amount) {
        var hsl = tinycolor(color).toHsl();
        var hue = (hsl.h + amount) % 360;
        hsl.h = hue < 0 ? 360 + hue : hue;
        return tinycolor(hsl);
      } // Combination Functions
      // ---------------------
      // Thanks to jQuery xColor for some of the ideas behind these
      // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>


      function complement(color) {
        var hsl = tinycolor(color).toHsl();
        hsl.h = (hsl.h + 180) % 360;
        return tinycolor(hsl);
      }

      function triad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [tinycolor(color), tinycolor({
          h: (h + 120) % 360,
          s: hsl.s,
          l: hsl.l
        }), tinycolor({
          h: (h + 240) % 360,
          s: hsl.s,
          l: hsl.l
        })];
      }

      function tetrad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [tinycolor(color), tinycolor({
          h: (h + 90) % 360,
          s: hsl.s,
          l: hsl.l
        }), tinycolor({
          h: (h + 180) % 360,
          s: hsl.s,
          l: hsl.l
        }), tinycolor({
          h: (h + 270) % 360,
          s: hsl.s,
          l: hsl.l
        })];
      }

      function splitcomplement(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [tinycolor(color), tinycolor({
          h: (h + 72) % 360,
          s: hsl.s,
          l: hsl.l
        }), tinycolor({
          h: (h + 216) % 360,
          s: hsl.s,
          l: hsl.l
        })];
      }

      function analogous(color, results, slices) {
        results = results || 6;
        slices = slices || 30;
        var hsl = tinycolor(color).toHsl();
        var part = 360 / slices;
        var ret = [tinycolor(color)];

        for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
          hsl.h = (hsl.h + part) % 360;
          ret.push(tinycolor(hsl));
        }

        return ret;
      }

      function monochromatic(color, results) {
        results = results || 6;
        var hsv = tinycolor(color).toHsv();
        var h = hsv.h,
            s = hsv.s,
            v = hsv.v;
        var ret = [];
        var modification = 1 / results;

        while (results--) {
          ret.push(tinycolor({
            h: h,
            s: s,
            v: v
          }));
          v = (v + modification) % 1;
        }

        return ret;
      } // Utility Functions
      // ---------------------


      tinycolor.mix = function (color1, color2, amount) {
        amount = amount === 0 ? 0 : amount || 50;
        var rgb1 = tinycolor(color1).toRgb();
        var rgb2 = tinycolor(color2).toRgb();
        var p = amount / 100;
        var rgba = {
          r: (rgb2.r - rgb1.r) * p + rgb1.r,
          g: (rgb2.g - rgb1.g) * p + rgb1.g,
          b: (rgb2.b - rgb1.b) * p + rgb1.b,
          a: (rgb2.a - rgb1.a) * p + rgb1.a
        };
        return tinycolor(rgba);
      }; // Readability Functions
      // ---------------------
      // <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)
      // `contrast`
      // Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)


      tinycolor.readability = function (color1, color2) {
        var c1 = tinycolor(color1);
        var c2 = tinycolor(color2);
        return (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
      }; // `isReadable`
      // Ensure that foreground and background color combinations meet WCAG2 guidelines.
      // The third argument is an optional Object.
      //      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
      //      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
      // If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.
      // *Example*
      //    tinycolor.isReadable("#000", "#111") => false
      //    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false


      tinycolor.isReadable = function (color1, color2, wcag2) {
        var readability = tinycolor.readability(color1, color2);
        var wcag2Parms, out;
        out = false;
        wcag2Parms = validateWCAG2Parms(wcag2);

        switch (wcag2Parms.level + wcag2Parms.size) {
          case "AAsmall":
          case "AAAlarge":
            out = readability >= 4.5;
            break;

          case "AAlarge":
            out = readability >= 3;
            break;

          case "AAAsmall":
            out = readability >= 7;
            break;
        }

        return out;
      }; // `mostReadable`
      // Given a base color and a list of possible foreground or background
      // colors for that base, returns the most readable color.
      // Optionally returns Black or White if the most readable color is unreadable.
      // *Example*
      //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
      //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
      //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
      //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"


      tinycolor.mostReadable = function (baseColor, colorList, args) {
        var bestColor = null;
        var bestScore = 0;
        var readability;
        var includeFallbackColors, level, size;
        args = args || {};
        includeFallbackColors = args.includeFallbackColors;
        level = args.level;
        size = args.size;

        for (var i = 0; i < colorList.length; i++) {
          readability = tinycolor.readability(baseColor, colorList[i]);

          if (readability > bestScore) {
            bestScore = readability;
            bestColor = tinycolor(colorList[i]);
          }
        }

        if (tinycolor.isReadable(baseColor, bestColor, {
          "level": level,
          "size": size
        }) || !includeFallbackColors) {
          return bestColor;
        } else {
          args.includeFallbackColors = false;
          return tinycolor.mostReadable(baseColor, ["#fff", "#000"], args);
        }
      }; // Big List of Colors
      // ------------------
      // <http://www.w3.org/TR/css3-color/#svg-color>


      var names = tinycolor.names = {
        aliceblue: "f0f8ff",
        antiquewhite: "faebd7",
        aqua: "0ff",
        aquamarine: "7fffd4",
        azure: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "000",
        blanchedalmond: "ffebcd",
        blue: "00f",
        blueviolet: "8a2be2",
        brown: "a52a2a",
        burlywood: "deb887",
        burntsienna: "ea7e5d",
        cadetblue: "5f9ea0",
        chartreuse: "7fff00",
        chocolate: "d2691e",
        coral: "ff7f50",
        cornflowerblue: "6495ed",
        cornsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "0ff",
        darkblue: "00008b",
        darkcyan: "008b8b",
        darkgoldenrod: "b8860b",
        darkgray: "a9a9a9",
        darkgreen: "006400",
        darkgrey: "a9a9a9",
        darkkhaki: "bdb76b",
        darkmagenta: "8b008b",
        darkolivegreen: "556b2f",
        darkorange: "ff8c00",
        darkorchid: "9932cc",
        darkred: "8b0000",
        darksalmon: "e9967a",
        darkseagreen: "8fbc8f",
        darkslateblue: "483d8b",
        darkslategray: "2f4f4f",
        darkslategrey: "2f4f4f",
        darkturquoise: "00ced1",
        darkviolet: "9400d3",
        deeppink: "ff1493",
        deepskyblue: "00bfff",
        dimgray: "696969",
        dimgrey: "696969",
        dodgerblue: "1e90ff",
        firebrick: "b22222",
        floralwhite: "fffaf0",
        forestgreen: "228b22",
        fuchsia: "f0f",
        gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff",
        gold: "ffd700",
        goldenrod: "daa520",
        gray: "808080",
        green: "008000",
        greenyellow: "adff2f",
        grey: "808080",
        honeydew: "f0fff0",
        hotpink: "ff69b4",
        indianred: "cd5c5c",
        indigo: "4b0082",
        ivory: "fffff0",
        khaki: "f0e68c",
        lavender: "e6e6fa",
        lavenderblush: "fff0f5",
        lawngreen: "7cfc00",
        lemonchiffon: "fffacd",
        lightblue: "add8e6",
        lightcoral: "f08080",
        lightcyan: "e0ffff",
        lightgoldenrodyellow: "fafad2",
        lightgray: "d3d3d3",
        lightgreen: "90ee90",
        lightgrey: "d3d3d3",
        lightpink: "ffb6c1",
        lightsalmon: "ffa07a",
        lightseagreen: "20b2aa",
        lightskyblue: "87cefa",
        lightslategray: "789",
        lightslategrey: "789",
        lightsteelblue: "b0c4de",
        lightyellow: "ffffe0",
        lime: "0f0",
        limegreen: "32cd32",
        linen: "faf0e6",
        magenta: "f0f",
        maroon: "800000",
        mediumaquamarine: "66cdaa",
        mediumblue: "0000cd",
        mediumorchid: "ba55d3",
        mediumpurple: "9370db",
        mediumseagreen: "3cb371",
        mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc",
        mediumvioletred: "c71585",
        midnightblue: "191970",
        mintcream: "f5fffa",
        mistyrose: "ffe4e1",
        moccasin: "ffe4b5",
        navajowhite: "ffdead",
        navy: "000080",
        oldlace: "fdf5e6",
        olive: "808000",
        olivedrab: "6b8e23",
        orange: "ffa500",
        orangered: "ff4500",
        orchid: "da70d6",
        palegoldenrod: "eee8aa",
        palegreen: "98fb98",
        paleturquoise: "afeeee",
        palevioletred: "db7093",
        papayawhip: "ffefd5",
        peachpuff: "ffdab9",
        peru: "cd853f",
        pink: "ffc0cb",
        plum: "dda0dd",
        powderblue: "b0e0e6",
        purple: "800080",
        rebeccapurple: "663399",
        red: "f00",
        rosybrown: "bc8f8f",
        royalblue: "4169e1",
        saddlebrown: "8b4513",
        salmon: "fa8072",
        sandybrown: "f4a460",
        seagreen: "2e8b57",
        seashell: "fff5ee",
        sienna: "a0522d",
        silver: "c0c0c0",
        skyblue: "87ceeb",
        slateblue: "6a5acd",
        slategray: "708090",
        slategrey: "708090",
        snow: "fffafa",
        springgreen: "00ff7f",
        steelblue: "4682b4",
        tan: "d2b48c",
        teal: "008080",
        thistle: "d8bfd8",
        tomato: "ff6347",
        turquoise: "40e0d0",
        violet: "ee82ee",
        wheat: "f5deb3",
        white: "fff",
        whitesmoke: "f5f5f5",
        yellow: "ff0",
        yellowgreen: "9acd32"
      }; // Make it easy to access colors via `hexNames[hex]`

      var hexNames = tinycolor.hexNames = flip(names); // Utilities
      // ---------
      // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`

      function flip(o) {
        var flipped = {};

        for (var i in o) {
          if (o.hasOwnProperty(i)) {
            flipped[o[i]] = i;
          }
        }

        return flipped;
      } // Return a valid alpha value [0,1] with all invalid values being set to 1


      function boundAlpha(a) {
        a = parseFloat(a);

        if (isNaN(a) || a < 0 || a > 1) {
          a = 1;
        }

        return a;
      } // Take input from [0, n] and return it as [0, 1]


      function bound01(n, max) {
        if (isOnePointZero(n)) {
          n = "100%";
        }

        var processPercent = isPercentage(n);
        n = mathMin(max, mathMax(0, parseFloat(n))); // Automatically convert percentage into number

        if (processPercent) {
          n = parseInt(n * max, 10) / 100;
        } // Handle floating point rounding errors


        if (Math.abs(n - max) < 0.000001) {
          return 1;
        } // Convert into [0, 1] range if it isn't already


        return n % max / parseFloat(max);
      } // Force a number between 0 and 1


      function clamp01(val) {
        return mathMin(1, mathMax(0, val));
      } // Parse a base-16 hex value into a base-10 integer


      function parseIntFromHex(val) {
        return parseInt(val, 16);
      } // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
      // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>


      function isOnePointZero(n) {
        return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
      } // Check to see if string passed in is a percentage


      function isPercentage(n) {
        return typeof n === "string" && n.indexOf('%') != -1;
      } // Force a hex value to have 2 characters


      function pad2(c) {
        return c.length == 1 ? '0' + c : '' + c;
      } // Replace a decimal with it's percentage value


      function convertToPercentage(n) {
        if (n <= 1) {
          n = n * 100 + "%";
        }

        return n;
      } // Converts a decimal to a hex value


      function convertDecimalToHex(d) {
        return Math.round(parseFloat(d) * 255).toString(16);
      } // Converts a hex value to a decimal


      function convertHexToDecimal(h) {
        return parseIntFromHex(h) / 255;
      }

      var matchers = function () {
        // <http://www.w3.org/TR/css3-values/#integers>
        var CSS_INTEGER = "[-\\+]?\\d+%?"; // <http://www.w3.org/TR/css3-values/#number-value>

        var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?"; // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.

        var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")"; // Actual matching.
        // Parentheses and commas are optional, but not required.
        // Whitespace can take the place of commas or opening paren

        var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
        var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
        return {
          CSS_UNIT: new RegExp(CSS_UNIT),
          rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
          rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
          hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
          hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
          hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
          hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
          hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
          hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
          hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
          hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
        };
      }(); // `isValidCSSUnit`
      // Take in a single string / number and check to see if it looks like a CSS unit
      // (see `matchers` above for definition).


      function isValidCSSUnit(color) {
        return !!matchers.CSS_UNIT.exec(color);
      } // `stringInputToObject`
      // Permissive string parsing.  Take in a number of formats, and output an object
      // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`


      function stringInputToObject(color) {
        color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();
        var named = false;

        if (names[color]) {
          color = names[color];
          named = true;
        } else if (color == 'transparent') {
          return {
            r: 0,
            g: 0,
            b: 0,
            a: 0,
            format: "name"
          };
        } // Try to match string input using regular expressions.
        // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
        // Just return an object and let the conversion functions handle that.
        // This way the result will be the same whether the tinycolor is initialized with string or object.


        var match;

        if (match = matchers.rgb.exec(color)) {
          return {
            r: match[1],
            g: match[2],
            b: match[3]
          };
        }

        if (match = matchers.rgba.exec(color)) {
          return {
            r: match[1],
            g: match[2],
            b: match[3],
            a: match[4]
          };
        }

        if (match = matchers.hsl.exec(color)) {
          return {
            h: match[1],
            s: match[2],
            l: match[3]
          };
        }

        if (match = matchers.hsla.exec(color)) {
          return {
            h: match[1],
            s: match[2],
            l: match[3],
            a: match[4]
          };
        }

        if (match = matchers.hsv.exec(color)) {
          return {
            h: match[1],
            s: match[2],
            v: match[3]
          };
        }

        if (match = matchers.hsva.exec(color)) {
          return {
            h: match[1],
            s: match[2],
            v: match[3],
            a: match[4]
          };
        }

        if (match = matchers.hex8.exec(color)) {
          return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? "name" : "hex8"
          };
        }

        if (match = matchers.hex6.exec(color)) {
          return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? "name" : "hex"
          };
        }

        if (match = matchers.hex4.exec(color)) {
          return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            a: convertHexToDecimal(match[4] + '' + match[4]),
            format: named ? "name" : "hex8"
          };
        }

        if (match = matchers.hex3.exec(color)) {
          return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            format: named ? "name" : "hex"
          };
        }

        return false;
      }

      function validateWCAG2Parms(parms) {
        // return valid WCAG2 parms for isReadable.
        // If input parms are invalid, return {"level":"AA", "size":"small"}
        var level, size;
        parms = parms || {
          "level": "AA",
          "size": "small"
        };
        level = (parms.level || "AA").toUpperCase();
        size = (parms.size || "small").toLowerCase();

        if (level !== "AA" && level !== "AAA") {
          level = "AA";
        }

        if (size !== "small" && size !== "large") {
          size = "small";
        }

        return {
          "level": level,
          "size": size
        };
      } // Node: Export function


      if (module.exports) {
        module.exports = tinycolor;
      } // AMD/requirejs: Define the module
      else {
        window.tinycolor = tinycolor;
      }
    })(Math);
  })(tinycolor);

  var Color = tinycolor.exports;

  /**
   * Get the color raw value from theme
   * @param theme - the theme object
   * @param color - the color path ("green.200")
   * @param fallback - the fallback color
   */

  var getColor = (theme, color, fallback) => {
    var hex = memoizedGet(theme, "colors." + color, color);
    var isValid = Color(hex).isValid();
    return isValid ? hex : fallback;
  };
  /**
   * Determines if the tone of given color is "light" or "dark"
   * @param color - the color in hex, rgb, or hsl
   */

  var tone = color => theme => {
    var hex = getColor(theme, color);
    var isDark = Color(hex).isDark();
    return isDark ? "dark" : "light";
  };
  /**
   * Determines if a color tone is "dark"
   * @param color - the color in hex, rgb, or hsl
   */

  var isDark = color => theme => tone(color)(theme) === "dark";
  /**
   * Make a color transparent
   * @param color - the color in hex, rgb, or hsl
   * @param opacity - the amount of opacity the color should have (0-1)
   */

  var transparentize = (color, opacity) => theme => {
    var raw = getColor(theme, color);
    return Color(raw).setAlpha(opacity).toRgbString();
  };
  function generateStripe(size, color) {
    if (size === void 0) {
      size = "1rem";
    }

    if (color === void 0) {
      color = "rgba(255, 255, 255, 0.15)";
    }

    return {
      backgroundImage: "linear-gradient(\n    45deg,\n    " + color + " 25%,\n    transparent 25%,\n    transparent 50%,\n    " + color + " 50%,\n    " + color + " 75%,\n    transparent 75%,\n    transparent\n  )",
      backgroundSize: size + " " + size
    };
  }
  function randomColor(opts) {
    var fallback = Color.random().toHexString();

    if (!opts || isEmptyObject(opts)) {
      return fallback;
    }

    if (opts.string && opts.colors) {
      return randomColorFromList(opts.string, opts.colors);
    }

    if (opts.string && !opts.colors) {
      return randomColorFromString(opts.string);
    }

    if (opts.colors && !opts.string) {
      return randomFromList(opts.colors);
    }

    return fallback;
  }

  function randomColorFromString(str) {
    var hash = 0;
    if (str.length === 0) return hash.toString();

    for (var i = 0; i < str.length; i += 1) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }

    var color = "#";

    for (var j = 0; j < 3; j += 1) {
      var value = hash >> j * 8 & 255;
      color += ("00" + value.toString(16)).substr(-2);
    }

    return color;
  }

  function randomColorFromList(str, list) {
    var index = 0;
    if (str.length === 0) return list[0];

    for (var i = 0; i < str.length; i += 1) {
      index = str.charCodeAt(i) + ((index << 5) - index);
      index = index & index;
    }

    index = (index % list.length + list.length) % list.length;
    return list[index];
  }

  function randomFromList(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function mode(light, dark) {
    return props => props.colorMode === "dark" ? dark : light;
  }
  function orient$2(options) {
    var {
      orientation,
      vertical,
      horizontal
    } = options;
    if (!orientation) return {};
    return orientation === "vertical" ? vertical : horizontal;
  }

  function _extends$r() {
    _extends$r = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$r.apply(this, arguments);
  }
  var createBreakpoints = config => {
    warn({
      condition: true,
      message: ["[chakra-ui]: createBreakpoints(...) will be deprecated pretty soon", "simply pass the breakpoints as an object. Remove the createBreakpoint(..) call"].join("")
    });
    return _extends$r({
      base: "0em"
    }, config);
  };

  var parts$m = ["container", "title", "description", "icon"];
  var baseStyle$C = {
    container: {
      px: 4,
      py: 3
    },
    title: {
      fontWeight: "bold",
      lineHeight: 6,
      marginEnd: 2
    },
    description: {
      lineHeight: 6
    },
    icon: {
      flexShrink: 0,
      marginEnd: 3,
      w: 5,
      h: 6
    }
  };

  function getBg(props) {
    var {
      theme,
      colorScheme: c
    } = props;
    var lightBg = getColor(theme, c + ".100", c);
    var darkBg = transparentize(c + ".200", 0.16)(theme);
    return mode(lightBg, darkBg)(props);
  }

  function variantSubtle$1(props) {
    var {
      colorScheme: c
    } = props;
    return {
      container: {
        bg: getBg(props)
      },
      icon: {
        color: mode(c + ".500", c + ".200")(props)
      }
    };
  }

  function variantLeftAccent(props) {
    var {
      colorScheme: c
    } = props;
    return {
      container: {
        paddingStart: 3,
        borderStartWidth: "4px",
        borderStartColor: mode(c + ".500", c + ".200")(props),
        bg: getBg(props)
      },
      icon: {
        color: mode(c + ".500", c + ".200")(props)
      }
    };
  }

  function variantTopAccent(props) {
    var {
      colorScheme: c
    } = props;
    return {
      container: {
        pt: 2,
        borderTopWidth: "4px",
        borderTopColor: mode(c + ".500", c + ".200")(props),
        bg: getBg(props)
      },
      icon: {
        color: mode(c + ".500", c + ".200")(props)
      }
    };
  }

  function variantSolid$3(props) {
    var {
      colorScheme: c
    } = props;
    return {
      container: {
        bg: mode(c + ".500", c + ".200")(props),
        color: mode("white", "gray.900")(props)
      }
    };
  }

  var variants$b = {
    subtle: variantSubtle$1,
    "left-accent": variantLeftAccent,
    "top-accent": variantTopAccent,
    solid: variantSolid$3
  };
  var defaultProps$o = {
    variant: "subtle",
    colorScheme: "blue"
  };
  var Alert = {
    parts: parts$m,
    baseStyle: baseStyle$C,
    variants: variants$b,
    defaultProps: defaultProps$o
  };

  var spacing = {
    px: "1px",
    0.5: "0.125rem",
    1: "0.25rem",
    1.5: "0.375rem",
    2: "0.5rem",
    2.5: "0.625rem",
    3: "0.75rem",
    3.5: "0.875rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
    12: "3rem",
    14: "3.5rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    28: "7rem",
    32: "8rem",
    36: "9rem",
    40: "10rem",
    44: "11rem",
    48: "12rem",
    52: "13rem",
    56: "14rem",
    60: "15rem",
    64: "16rem",
    72: "18rem",
    80: "20rem",
    96: "24rem"
  };
  /**
   * @deprecated
   * Spacing tokens are a part of DefaultChakraTheme['sizes']
   */

  function _extends$q() {
    _extends$q = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$q.apply(this, arguments);
  }
  var largeSizes = {
    max: "max-content",
    min: "min-content",
    full: "100%",
    "3xs": "14rem",
    "2xs": "16rem",
    xs: "20rem",
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "36rem",
    "2xl": "42rem",
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem",
    "7xl": "80rem",
    "8xl": "90rem"
  };
  var container = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px"
  };

  var sizes$l = _extends$q({}, spacing, largeSizes, {
    container
  });
  /**
   * @deprecated
   * You can derive the Sizes type from the DefaultChakraTheme
   *
   * type Sizes = DefaultChakraTheme['sizes']
   */


  var sizes$m = sizes$l;

  var parts$l = ["container", "excessLabel", "badge", "label"];

  function baseStyleBadge(props) {
    return {
      transform: "translate(25%, 25%)",
      borderRadius: "full",
      border: "0.2em solid",
      borderColor: mode("white", "gray.800")(props)
    };
  }

  function baseStyleExcessLabel(props) {
    return {
      bg: mode("gray.200", "whiteAlpha.400")(props)
    };
  }

  function baseStyleContainer$3(props) {
    var {
      name,
      theme
    } = props;
    var bg = name ? randomColor({
      string: name
    }) : "gray.400";
    var isBgDark = isDark(bg)(theme);
    var color = "white";
    if (!isBgDark) color = "gray.800";
    var borderColor = mode("white", "gray.800")(props);
    return {
      bg,
      color,
      borderColor,
      verticalAlign: "top"
    };
  }

  var baseStyle$B = props => ({
    badge: baseStyleBadge(props),
    excessLabel: baseStyleExcessLabel(props),
    container: baseStyleContainer$3(props)
  });

  function getSize$3(size) {
    var themeSize = sizes$m[size];
    return {
      container: {
        width: size,
        height: size,
        fontSize: "calc(" + (themeSize != null ? themeSize : size) + " / 2.5)"
      },
      excessLabel: {
        width: size,
        height: size
      },
      label: {
        fontSize: "calc(" + (themeSize != null ? themeSize : size) + " / 2.5)",
        lineHeight: size !== "100%" ? themeSize != null ? themeSize : size : undefined
      }
    };
  }

  var sizes$k = {
    "2xs": getSize$3("4"),
    xs: getSize$3("6"),
    sm: getSize$3("8"),
    md: getSize$3("12"),
    lg: getSize$3("16"),
    xl: getSize$3("24"),
    "2xl": getSize$3("32"),
    full: getSize$3("100%")
  };
  var defaultProps$n = {
    size: "md"
  };
  var Avatar = {
    parts: parts$l,
    baseStyle: baseStyle$B,
    sizes: sizes$k,
    defaultProps: defaultProps$n
  };

  var baseStyle$A = {
    px: 1,
    textTransform: "uppercase",
    fontSize: "xs",
    borderRadius: "sm",
    fontWeight: "bold"
  };

  function variantSolid$2(props) {
    var {
      colorScheme: c,
      theme
    } = props;
    var dark = transparentize(c + ".500", 0.6)(theme);
    return {
      bg: mode(c + ".500", dark)(props),
      color: mode("white", "whiteAlpha.800")(props)
    };
  }

  function variantSubtle(props) {
    var {
      colorScheme: c,
      theme
    } = props;
    var darkBg = transparentize(c + ".200", 0.16)(theme);
    return {
      bg: mode(c + ".100", darkBg)(props),
      color: mode(c + ".800", c + ".200")(props)
    };
  }

  function variantOutline$2(props) {
    var {
      colorScheme: c,
      theme
    } = props;
    var darkColor = transparentize(c + ".200", 0.8)(theme);
    var lightColor = getColor(theme, c + ".500");
    var color = mode(lightColor, darkColor)(props);
    return {
      color,
      boxShadow: "inset 0 0 0px 1px " + color
    };
  }

  var variants$a = {
    solid: variantSolid$2,
    subtle: variantSubtle,
    outline: variantOutline$2
  };
  var defaultProps$m = {
    variant: "subtle",
    colorScheme: "gray"
  };
  var Badge = {
    baseStyle: baseStyle$A,
    variants: variants$a,
    defaultProps: defaultProps$m
  };

  var parts$k = ["container", "item", "link", "separator"];
  var baseStyleLink = {
    transitionProperty: "common",
    transitionDuration: "fast",
    transitionTimingFunction: "ease-out",
    cursor: "pointer",
    textDecoration: "none",
    outline: "none",
    color: "inherit",
    _hover: {
      textDecoration: "underline"
    },
    _focus: {
      boxShadow: "outline"
    }
  };
  var baseStyle$z = {
    link: baseStyleLink
  };
  var Breadcrumb = {
    parts: parts$k,
    baseStyle: baseStyle$z
  };

  function _extends$p() {
    _extends$p = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$p.apply(this, arguments);
  }
  var baseStyle$y = {
    lineHeight: "1.2",
    borderRadius: "md",
    fontWeight: "semibold",
    transitionProperty: "common",
    transitionDuration: "normal",
    _focus: {
      boxShadow: "outline"
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
      boxShadow: "none"
    },
    _hover: {
      _disabled: {
        bg: "initial"
      }
    }
  };

  function variantGhost(props) {
    var {
      colorScheme: c,
      theme
    } = props;

    if (c === "gray") {
      return {
        color: mode("inherit", "whiteAlpha.900")(props),
        _hover: {
          bg: mode("gray.100", "whiteAlpha.200")(props)
        },
        _active: {
          bg: mode("gray.200", "whiteAlpha.300")(props)
        }
      };
    }

    var darkHoverBg = transparentize(c + ".200", 0.12)(theme);
    var darkActiveBg = transparentize(c + ".200", 0.24)(theme);
    return {
      color: mode(c + ".600", c + ".200")(props),
      bg: "transparent",
      _hover: {
        bg: mode(c + ".50", darkHoverBg)(props)
      },
      _active: {
        bg: mode(c + ".100", darkActiveBg)(props)
      }
    };
  }

  function variantOutline$1(props) {
    var {
      colorScheme: c
    } = props;
    var borderColor = mode("gray.200", "whiteAlpha.300")(props);
    return _extends$p({
      border: "1px solid",
      borderColor: c === "gray" ? borderColor : "currentColor"
    }, variantGhost(props));
  }
  /** Accessible color overrides for less accessible colors. */


  var accessibleColorMap = {
    yellow: {
      bg: "yellow.400",
      color: "black",
      hoverBg: "yellow.500",
      activeBg: "yellow.600"
    },
    cyan: {
      bg: "cyan.400",
      color: "black",
      hoverBg: "cyan.500",
      activeBg: "cyan.600"
    }
  };

  function variantSolid$1(props) {
    var {
      colorScheme: c
    } = props;

    if (c === "gray") {
      var _bg = mode("gray.100", "whiteAlpha.200")(props);

      return {
        bg: _bg,
        _hover: {
          bg: mode("gray.200", "whiteAlpha.300")(props),
          _disabled: {
            bg: _bg
          }
        },
        _active: {
          bg: mode("gray.300", "whiteAlpha.400")(props)
        }
      };
    }

    var {
      bg = c + ".500",
      color = "white",
      hoverBg = c + ".600",
      activeBg = c + ".700"
    } = accessibleColorMap[c] || {};
    var background = mode(bg, c + ".200")(props);
    return {
      bg: background,
      color: mode(color, "gray.800")(props),
      _hover: {
        bg: mode(hoverBg, c + ".300")(props),
        _disabled: {
          bg: background
        }
      },
      _active: {
        bg: mode(activeBg, c + ".400")(props)
      }
    };
  }

  function variantLink(props) {
    var {
      colorScheme: c
    } = props;
    return {
      padding: 0,
      height: "auto",
      lineHeight: "normal",
      verticalAlign: "baseline",
      color: mode(c + ".500", c + ".200")(props),
      _hover: {
        textDecoration: "underline",
        _disabled: {
          textDecoration: "none"
        }
      },
      _active: {
        color: mode(c + ".700", c + ".500")(props)
      }
    };
  }

  var variantUnstyled$2 = {
    bg: "none",
    color: "inherit",
    display: "inline",
    lineHeight: "inherit",
    m: 0,
    p: 0
  };
  var variants$9 = {
    ghost: variantGhost,
    outline: variantOutline$1,
    solid: variantSolid$1,
    link: variantLink,
    unstyled: variantUnstyled$2
  };
  var sizes$j = {
    lg: {
      h: 12,
      minW: 12,
      fontSize: "lg",
      px: 6
    },
    md: {
      h: 10,
      minW: 10,
      fontSize: "md",
      px: 4
    },
    sm: {
      h: 8,
      minW: 8,
      fontSize: "sm",
      px: 3
    },
    xs: {
      h: 6,
      minW: 6,
      fontSize: "xs",
      px: 2
    }
  };
  var defaultProps$l = {
    variant: "solid",
    size: "md",
    colorScheme: "gray"
  };
  var Button$1 = {
    baseStyle: baseStyle$y,
    variants: variants$9,
    sizes: sizes$j,
    defaultProps: defaultProps$l
  };

  var parts$j = ["container", "control", "label", "icon"];

  function baseStyleControl$1(props) {
    var {
      colorScheme: c
    } = props;
    return {
      w: "100%",
      transitionProperty: "box-shadow",
      transitionDuration: "normal",
      border: "2px solid",
      borderRadius: "sm",
      borderColor: "inherit",
      color: "white",
      _checked: {
        bg: mode(c + ".500", c + ".200")(props),
        borderColor: mode(c + ".500", c + ".200")(props),
        color: mode("white", "gray.900")(props),
        _hover: {
          bg: mode(c + ".600", c + ".300")(props),
          borderColor: mode(c + ".600", c + ".300")(props)
        },
        _disabled: {
          borderColor: mode("gray.200", "transparent")(props),
          bg: mode("gray.200", "whiteAlpha.300")(props),
          color: mode("gray.500", "whiteAlpha.500")(props)
        }
      },
      _indeterminate: {
        bg: mode(c + ".500", c + ".200")(props),
        borderColor: mode(c + ".500", c + ".200")(props),
        color: mode("white", "gray.900")(props)
      },
      _disabled: {
        bg: mode("gray.100", "whiteAlpha.100")(props),
        borderColor: mode("gray.100", "transparent")(props)
      },
      _focus: {
        boxShadow: "outline"
      },
      _invalid: {
        borderColor: mode("red.500", "red.300")(props)
      }
    };
  }

  var baseStyleLabel$3 = {
    userSelect: "none",
    _disabled: {
      opacity: 0.4
    }
  };
  var baseStyleIcon$4 = {
    transitionProperty: "transform",
    transitionDuration: "normal"
  };

  var baseStyle$x = props => ({
    icon: baseStyleIcon$4,
    control: baseStyleControl$1(props),
    label: baseStyleLabel$3
  });

  var sizes$i = {
    sm: {
      control: {
        h: 3,
        w: 3
      },
      label: {
        fontSize: "sm"
      },
      icon: {
        fontSize: "0.45rem"
      }
    },
    md: {
      control: {
        w: 4,
        h: 4
      },
      label: {
        fontSize: "md"
      },
      icon: {
        fontSize: "0.625rem"
      }
    },
    lg: {
      control: {
        w: 5,
        h: 5
      },
      label: {
        fontSize: "lg"
      },
      icon: {
        fontSize: "0.625rem"
      }
    }
  };
  var defaultProps$k = {
    size: "md",
    colorScheme: "blue"
  };
  var Checkbox = {
    parts: parts$j,
    baseStyle: baseStyle$x,
    sizes: sizes$i,
    defaultProps: defaultProps$k
  };

  function baseStyle$w(props) {
    var hoverBg = mode("blackAlpha.100", "whiteAlpha.100")(props);
    var activeBg = mode("blackAlpha.200", "whiteAlpha.200")(props);
    return {
      borderRadius: "md",
      transitionProperty: "common",
      transitionDuration: "normal",
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
        boxShadow: "none"
      },
      _hover: {
        bg: hoverBg
      },
      _active: {
        bg: activeBg
      },
      _focus: {
        boxShadow: "outline"
      }
    };
  }

  var sizes$h = {
    lg: {
      w: "40px",
      h: "40px",
      fontSize: "16px"
    },
    md: {
      w: "32px",
      h: "32px",
      fontSize: "12px"
    },
    sm: {
      w: "24px",
      h: "24px",
      fontSize: "10px"
    }
  };
  var defaultProps$j = {
    size: "md"
  };
  var CloseButton = {
    baseStyle: baseStyle$w,
    sizes: sizes$h,
    defaultProps: defaultProps$j
  };

  var {
    variants: variants$8,
    defaultProps: defaultProps$i
  } = Badge;
  var baseStyle$v = {
    fontFamily: "mono",
    fontSize: "sm",
    px: "0.2em",
    borderRadius: "sm"
  };
  var Code = {
    baseStyle: baseStyle$v,
    variants: variants$8,
    defaultProps: defaultProps$i
  };

  var baseStyle$u = {
    w: "100%",
    mx: "auto",
    maxW: "60ch",
    px: "1rem"
  };
  var Container = {
    baseStyle: baseStyle$u
  };

  var baseStyle$t = {
    opacity: 0.6,
    borderColor: "inherit"
  };
  var variantSolid = {
    borderStyle: "solid"
  };
  var variantDashed = {
    borderStyle: "dashed"
  };
  var variants$7 = {
    solid: variantSolid,
    dashed: variantDashed
  };
  var defaultProps$h = {
    variant: "solid"
  };
  var Divider = {
    baseStyle: baseStyle$t,
    variants: variants$7,
    defaultProps: defaultProps$h
  };

  var parts$i = ["overlay", "dialogContainer", "dialog", "header", "closeButton", "body", "footer"];
  var baseStyleOverlay$1 = {
    bg: "blackAlpha.600",
    zIndex: "modal"
  };

  function baseStyleDialogContainer$1(props) {
    var {
      isCentered,
      scrollBehavior
    } = props;
    return {
      display: "flex",
      zIndex: "modal",
      justifyContent: "center",
      alignItems: isCentered ? "center" : "flex-start",
      overflow: scrollBehavior === "inside" ? "hidden" : "auto"
    };
  }

  function baseStyleDialog$1(props) {
    var {
      scrollBehavior
    } = props;
    return {
      borderRadius: "md",
      bg: mode("white", "gray.700")(props),
      color: "inherit",
      my: "3.75rem",
      zIndex: "modal",
      maxH: scrollBehavior === "inside" ? "calc(100% - 7.5rem)" : undefined,
      boxShadow: mode("lg", "dark-lg")(props)
    };
  }

  var baseStyleHeader$2 = {
    px: 6,
    py: 4,
    fontSize: "xl",
    fontWeight: "semibold"
  };
  var baseStyleCloseButton$2 = {
    position: "absolute",
    top: 2,
    insetEnd: 3
  };

  function baseStyleBody$2(props) {
    var {
      scrollBehavior
    } = props;
    return {
      px: 6,
      py: 2,
      flex: 1,
      overflow: scrollBehavior === "inside" ? "auto" : undefined
    };
  }

  var baseStyleFooter$2 = {
    px: 6,
    py: 4
  };

  var baseStyle$s = props => ({
    overlay: baseStyleOverlay$1,
    dialogContainer: baseStyleDialogContainer$1(props),
    dialog: baseStyleDialog$1(props),
    header: baseStyleHeader$2,
    closeButton: baseStyleCloseButton$2,
    body: baseStyleBody$2(props),
    footer: baseStyleFooter$2
  });
  /**
   * Since the `maxWidth` prop references theme.sizes internally,
   * we can leverage that to size our modals.
   */


  function getSize$2(value) {
    if (value === "full") {
      return {
        dialog: {
          maxW: "100vw",
          minH: "100vh"
        }
      };
    }

    return {
      dialog: {
        maxW: value
      }
    };
  }

  var sizes$g = {
    xs: getSize$2("xs"),
    sm: getSize$2("sm"),
    md: getSize$2("md"),
    lg: getSize$2("lg"),
    xl: getSize$2("xl"),
    "2xl": getSize$2("2xl"),
    "3xl": getSize$2("3xl"),
    "4xl": getSize$2("4xl"),
    "5xl": getSize$2("5xl"),
    "6xl": getSize$2("6xl"),
    full: getSize$2("full")
  };
  var defaultProps$g = {
    size: "md"
  };
  var Modal = {
    parts: parts$i,
    baseStyle: baseStyle$s,
    sizes: sizes$g,
    defaultProps: defaultProps$g
  };

  function _extends$o() {
    _extends$o = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$o.apply(this, arguments);
  }
  var parts$h = Modal.parts;
  /**
   * Since the `maxWidth` prop references theme.sizes internally,
   * we can leverage that to size our modals.
   */

  function getSize$1(value) {
    if (value === "full") {
      return {
        dialog: {
          maxW: "100vw",
          h: "100vh"
        }
      };
    }

    return {
      dialog: {
        maxW: value
      }
    };
  }

  var baseStyleOverlay = {
    bg: "blackAlpha.600",
    zIndex: "overlay"
  };
  var baseStyleDialogContainer = {
    display: "flex",
    zIndex: "modal",
    justifyContent: "center"
  };

  function baseStyleDialog(props) {
    var {
      isFullHeight
    } = props;
    return _extends$o({}, isFullHeight && {
      height: "100vh"
    }, {
      zIndex: "modal",
      maxH: "100vh",
      bg: mode("white", "gray.700")(props),
      color: "inherit",
      boxShadow: mode("lg", "dark-lg")(props)
    });
  }

  var baseStyleHeader$1 = {
    px: 6,
    py: 4,
    fontSize: "xl",
    fontWeight: "semibold"
  };
  var baseStyleCloseButton$1 = {
    position: "absolute",
    top: 2,
    insetEnd: 3
  };
  var baseStyleBody$1 = {
    px: 6,
    py: 2,
    flex: 1,
    overflow: "auto"
  };
  var baseStyleFooter$1 = {
    px: 6,
    py: 4
  };

  var baseStyle$r = props => ({
    overlay: baseStyleOverlay,
    dialogContainer: baseStyleDialogContainer,
    dialog: baseStyleDialog(props),
    header: baseStyleHeader$1,
    closeButton: baseStyleCloseButton$1,
    body: baseStyleBody$1,
    footer: baseStyleFooter$1
  });

  var sizes$f = {
    xs: getSize$1("xs"),
    sm: getSize$1("md"),
    md: getSize$1("lg"),
    lg: getSize$1("2xl"),
    xl: getSize$1("4xl"),
    full: getSize$1("full")
  };
  var defaultProps$f = {
    size: "xs"
  };
  var Drawer = {
    parts: parts$h,
    baseStyle: baseStyle$r,
    sizes: sizes$f,
    defaultProps: defaultProps$f
  };

  var parts$g = ["preview", "input"];
  var baseStylePreview = {
    borderRadius: "md",
    py: "3px",
    transitionProperty: "common",
    transitionDuration: "normal"
  };
  var baseStyleInput = {
    borderRadius: "md",
    py: "3px",
    transitionProperty: "common",
    transitionDuration: "normal",
    width: "full",
    _focus: {
      boxShadow: "outline"
    },
    _placeholder: {
      opacity: 0.6
    }
  };
  var baseStyle$q = {
    preview: baseStylePreview,
    input: baseStyleInput
  };
  var Editable = {
    parts: parts$g,
    baseStyle: baseStyle$q
  };

  var parts$f = ["requiredIndicator", "helperText"];

  function baseStyleRequiredIndicator(props) {
    return {
      marginStart: 1,
      color: mode("red.500", "red.300")(props)
    };
  }

  function baseStyleHelperText(props) {
    return {
      mt: 2,
      color: mode("gray.500", "whiteAlpha.600")(props),
      lineHeight: "normal",
      fontSize: "sm"
    };
  }

  var baseStyle$p = props => ({
    requiredIndicator: baseStyleRequiredIndicator(props),
    helperText: baseStyleHelperText(props)
  });

  var Form = {
    parts: parts$f,
    baseStyle: baseStyle$p
  };

  var baseStyle$o = {
    fontSize: "md",
    marginEnd: 3,
    mb: 2,
    fontWeight: "medium",
    transitionProperty: "common",
    transitionDuration: "normal",
    opacity: 1,
    _disabled: {
      opacity: 0.4
    }
  };
  var FormLabel$1 = {
    baseStyle: baseStyle$o
  };

  var baseStyle$n = {
    fontFamily: "heading",
    fontWeight: "bold"
  };
  var sizes$e = {
    "4xl": {
      fontSize: ["6xl", null, "7xl"],
      lineHeight: 1
    },
    "3xl": {
      fontSize: ["5xl", null, "6xl"],
      lineHeight: 1
    },
    "2xl": {
      fontSize: ["4xl", null, "5xl"],
      lineHeight: [1.2, null, 1]
    },
    xl: {
      fontSize: ["3xl", null, "4xl"],
      lineHeight: [1.33, null, 1.2]
    },
    lg: {
      fontSize: ["2xl", null, "3xl"],
      lineHeight: [1.33, null, 1.2]
    },
    md: {
      fontSize: "xl",
      lineHeight: 1.2
    },
    sm: {
      fontSize: "md",
      lineHeight: 1.2
    },
    xs: {
      fontSize: "sm",
      lineHeight: 1.2
    }
  };
  var defaultProps$e = {
    size: "xl"
  };
  var Heading = {
    baseStyle: baseStyle$n,
    sizes: sizes$e,
    defaultProps: defaultProps$e
  };

  var parts$e = ["field", "addon"];
  var baseStyle$m = {
    field: {
      width: "100%",
      minWidth: 0,
      outline: 0,
      position: "relative",
      appearance: "none",
      transitionProperty: "common",
      transitionDuration: "normal"
    }
  };
  var size = {
    lg: {
      fontSize: "lg",
      px: 4,
      h: 12,
      borderRadius: "md"
    },
    md: {
      fontSize: "md",
      px: 4,
      h: 10,
      borderRadius: "md"
    },
    sm: {
      fontSize: "sm",
      px: 3,
      h: 8,
      borderRadius: "sm"
    },
    xs: {
      fontSize: "xs",
      px: 2,
      h: 6,
      borderRadius: "sm"
    }
  };
  var sizes$d = {
    lg: {
      field: size.lg,
      addon: size.lg
    },
    md: {
      field: size.md,
      addon: size.md
    },
    sm: {
      field: size.sm,
      addon: size.sm
    },
    xs: {
      field: size.xs,
      addon: size.xs
    }
  };

  function getDefaults(props) {
    var {
      focusBorderColor: fc,
      errorBorderColor: ec
    } = props;
    return {
      focusBorderColor: fc || mode("blue.500", "blue.300")(props),
      errorBorderColor: ec || mode("red.500", "red.300")(props)
    };
  }

  function variantOutline(props) {
    var {
      theme
    } = props;
    var {
      focusBorderColor: fc,
      errorBorderColor: ec
    } = getDefaults(props);
    return {
      field: {
        border: "1px solid",
        borderColor: "inherit",
        bg: "inherit",
        _hover: {
          borderColor: mode("gray.300", "whiteAlpha.400")(props)
        },
        _readOnly: {
          boxShadow: "none !important",
          userSelect: "all"
        },
        _disabled: {
          opacity: 0.4,
          cursor: "not-allowed"
        },
        _invalid: {
          borderColor: getColor(theme, ec),
          boxShadow: "0 0 0 1px " + getColor(theme, ec)
        },
        _focus: {
          zIndex: 1,
          borderColor: getColor(theme, fc),
          boxShadow: "0 0 0 1px " + getColor(theme, fc)
        }
      },
      addon: {
        border: "1px solid",
        borderColor: mode("inherit", "whiteAlpha.50")(props),
        bg: mode("gray.100", "whiteAlpha.300")(props)
      }
    };
  }

  function variantFilled(props) {
    var {
      theme
    } = props;
    var {
      focusBorderColor: fc,
      errorBorderColor: ec
    } = getDefaults(props);
    return {
      field: {
        border: "2px solid",
        borderColor: "transparent",
        bg: mode("gray.100", "whiteAlpha.50")(props),
        _hover: {
          bg: mode("gray.200", "whiteAlpha.100")(props)
        },
        _readOnly: {
          boxShadow: "none !important",
          userSelect: "all"
        },
        _disabled: {
          opacity: 0.4,
          cursor: "not-allowed"
        },
        _invalid: {
          borderColor: getColor(theme, ec)
        },
        _focus: {
          bg: "transparent",
          borderColor: getColor(theme, fc)
        }
      },
      addon: {
        border: "2px solid",
        borderColor: "transparent",
        bg: mode("gray.100", "whiteAlpha.50")(props)
      }
    };
  }

  function variantFlushed(props) {
    var {
      theme
    } = props;
    var {
      focusBorderColor: fc,
      errorBorderColor: ec
    } = getDefaults(props);
    return {
      field: {
        borderBottom: "1px solid",
        borderColor: "inherit",
        borderRadius: 0,
        px: 0,
        bg: "transparent",
        _readOnly: {
          boxShadow: "none !important",
          userSelect: "all"
        },
        _invalid: {
          borderColor: getColor(theme, ec),
          boxShadow: "0px 1px 0px 0px " + getColor(theme, ec)
        },
        _focus: {
          borderColor: getColor(theme, fc),
          boxShadow: "0px 1px 0px 0px " + getColor(theme, fc)
        }
      },
      addon: {
        borderBottom: "2px solid",
        borderColor: "inherit",
        borderRadius: 0,
        px: 0,
        bg: "transparent"
      }
    };
  }

  var variantUnstyled$1 = {
    field: {
      bg: "transparent",
      px: 0,
      height: "auto"
    },
    addon: {
      bg: "transparent",
      px: 0,
      height: "auto"
    }
  };
  var variants$6 = {
    outline: variantOutline,
    filled: variantFilled,
    flushed: variantFlushed,
    unstyled: variantUnstyled$1
  };
  var defaultProps$d = {
    size: "md",
    variant: "outline"
  };
  var Input = {
    parts: parts$e,
    baseStyle: baseStyle$m,
    sizes: sizes$d,
    variants: variants$6,
    defaultProps: defaultProps$d
  };

  function baseStyle$l(props) {
    return {
      bg: mode("gray.100", "whiteAlpha")(props),
      borderRadius: "md",
      borderWidth: "1px",
      borderBottomWidth: "3px",
      fontSize: "0.8em",
      fontWeight: "bold",
      lineHeight: "normal",
      px: "0.4em",
      whiteSpace: "nowrap"
    };
  }

  var Kbd = {
    baseStyle: baseStyle$l
  };

  var baseStyle$k = {
    transitionProperty: "common",
    transitionDuration: "fast",
    transitionTimingFunction: "ease-out",
    cursor: "pointer",
    textDecoration: "none",
    outline: "none",
    color: "inherit",
    _hover: {
      textDecoration: "underline"
    },
    _focus: {
      boxShadow: "outline"
    }
  };
  var Link = {
    baseStyle: baseStyle$k
  };

  var parts$d = ["container", "item", "icon"];
  var baseStyleContainer$2 = {};
  var baseStyleItem$1 = {};
  var baseStyleIcon$3 = {
    marginEnd: "0.5rem",
    display: "inline",
    verticalAlign: "text-bottom"
  };
  var baseStyle$j = {
    container: baseStyleContainer$2,
    item: baseStyleItem$1,
    icon: baseStyleIcon$3
  };
  var List = {
    parts: parts$d,
    baseStyle: baseStyle$j
  };

  var parts$c = ["item", "command", "list", "button", "groupTitle", "divider"];

  function baseStyleList(props) {
    return {
      bg: mode("#fff", "gray.700")(props),
      boxShadow: mode("sm", "dark-lg")(props),
      color: "inherit",
      minW: "3xs",
      py: "2",
      zIndex: 1,
      borderRadius: "md",
      borderWidth: "1px"
    };
  }

  function baseStyleItem(props) {
    return {
      py: "0.4rem",
      px: "0.8rem",
      transitionProperty: "background",
      transitionDuration: "ultra-fast",
      transitionTimingFunction: "ease-in",
      _focus: {
        bg: mode("gray.100", "whiteAlpha.100")(props)
      },
      _active: {
        bg: mode("gray.200", "whiteAlpha.200")(props)
      },
      _expanded: {
        bg: mode("gray.100", "whiteAlpha.100")(props)
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed"
      }
    };
  }

  var baseStyleGroupTitle = {
    mx: 4,
    my: 2,
    fontWeight: "semibold",
    fontSize: "sm"
  };
  var baseStyleCommand = {
    opacity: 0.6
  };
  var baseStyleDivider = {
    border: 0,
    borderBottom: "1px solid",
    borderColor: "inherit",
    my: "0.5rem",
    opacity: 0.6
  };
  var baseStyleButton = {
    transitionProperty: "common",
    transitionDuration: "normal"
  };

  var baseStyle$i = props => ({
    button: baseStyleButton,
    list: baseStyleList(props),
    item: baseStyleItem(props),
    groupTitle: baseStyleGroupTitle,
    command: baseStyleCommand,
    divider: baseStyleDivider
  });

  var Menu = {
    parts: parts$c,
    baseStyle: baseStyle$i
  };

  var typography = {
    letterSpacings: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em"
    },
    lineHeights: {
      normal: "normal",
      none: 1,
      shorter: 1.25,
      short: 1.375,
      base: 1.5,
      tall: 1.625,
      taller: "2",
      "3": ".75rem",
      "4": "1rem",
      "5": "1.25rem",
      "6": "1.5rem",
      "7": "1.75rem",
      "8": "2rem",
      "9": "2.25rem",
      "10": "2.5rem"
    },
    fontWeights: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },
    fonts: {
      heading: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
      body: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
      mono: "SFMono-Regular,Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace"
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
      "8xl": "6rem",
      "9xl": "8rem"
    }
  };
  /**
   * @deprecated
   * You can derive the Typography type from the DefaultChakraTheme
   *
   * type Typography = Pick<
   *   DefaultChakraTheme,
   *   | "letterSpacings"
   *   | "lineHeights"
   *   | "fontWeights"
   *   | "fonts"
   *   | "fontSizes"
   *  >
   */

  var typography$1 = typography;

  var _Input$baseStyle;

  function _extends$n() {
    _extends$n = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$n.apply(this, arguments);
  }
  var parts$b = ["root", "field", "stepper", "stepperGroup"];
  var {
    variants: variants$5,
    defaultProps: defaultProps$c
  } = Input;
  var baseStyleRoot$1 = {
    "--number-input-stepper-width": "24px",
    "--number-input-field-padding": "calc(var(--number-input-stepper-width) + 0.5rem)"
  };
  var baseStyleField$1 = (_Input$baseStyle = Input.baseStyle) == null ? void 0 : _Input$baseStyle.field;
  var baseStyleStepperGroup = {
    width: "var(--number-input-stepper-width)"
  };

  function baseStyleStepper(props) {
    return {
      borderStart: "1px solid",
      borderStartColor: mode("inherit", "whiteAlpha.300")(props),
      color: mode("inherit", "whiteAlpha.800")(props),
      _active: {
        bg: mode("gray.200", "whiteAlpha.300")(props)
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed"
      }
    };
  }

  var baseStyle$h = props => ({
    root: baseStyleRoot$1,
    field: baseStyleField$1,
    stepperGroup: baseStyleStepperGroup,
    stepper: baseStyleStepper(props)
  });

  function getSize(size) {
    var sizeStyle = Input.sizes[size];
    var radius = {
      lg: "md",
      md: "md",
      sm: "sm",
      xs: "sm"
    };
    var resolvedFontSize = typography$1.fontSizes[sizeStyle.field.fontSize];
    return {
      field: _extends$n({}, sizeStyle.field, {
        paddingInlineEnd: "var(--number-input-field-padding)",
        verticalAlign: "top"
      }),
      stepper: {
        fontSize: "calc(" + resolvedFontSize + " * 0.75)",
        _first: {
          borderTopEndRadius: radius[size]
        },
        _last: {
          borderBottomEndRadius: radius[size],
          mt: "-1px",
          borderTopWidth: 1
        }
      }
    };
  }

  var sizes$c = {
    xs: getSize("xs"),
    sm: getSize("sm"),
    md: getSize("md"),
    lg: getSize("lg")
  };
  var NumberInput = {
    parts: parts$b,
    baseStyle: baseStyle$h,
    sizes: sizes$c,
    variants: variants$5,
    defaultProps: defaultProps$c
  };

  function _extends$m() {
    _extends$m = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$m.apply(this, arguments);
  }

  var baseStyle$g = _extends$m({}, Input.baseStyle.field, {
    textAlign: "center"
  });

  var sizes$b = {
    lg: {
      fontSize: "lg",
      w: 12,
      h: 12,
      borderRadius: "md"
    },
    md: {
      fontSize: "md",
      w: 10,
      h: 10,
      borderRadius: "md"
    },
    sm: {
      fontSize: "sm",
      w: 8,
      h: 8,
      borderRadius: "sm"
    },
    xs: {
      fontSize: "xs",
      w: 6,
      h: 6,
      borderRadius: "sm"
    }
  };
  var variants$4 = {
    outline: props => Input.variants.outline(props).field,
    flushed: props => Input.variants.flushed(props).field,
    filled: props => Input.variants.filled(props).field,
    unstyled: Input.variants.unstyled.field
  };
  var defaultProps$b = Input.defaultProps;
  var PinInput = {
    baseStyle: baseStyle$g,
    sizes: sizes$b,
    variants: variants$4,
    defaultProps: defaultProps$b
  };

  var parts$a = ["popper", "content", "header", "body", "footer", "arrow"];
  var baseStylePopper = {
    zIndex: 10
  };

  function baseStyleContent(props) {
    var bg = mode("white", "gray.700")(props);
    var shadowColor = mode("gray.200", "whiteAlpha.300")(props);
    return {
      "--popover-bg": "colors." + bg,
      bg: "var(--popover-bg)",
      "--popper-arrow-bg": "var(--popover-bg)",
      "--popper-arrow-shadow-color": "colors." + shadowColor,
      width: "xs",
      border: "1px solid",
      borderColor: "inherit",
      borderRadius: "md",
      boxShadow: "sm",
      zIndex: "inherit",
      _focus: {
        outline: 0,
        boxShadow: "outline"
      }
    };
  }

  var baseStyleHeader = {
    px: 3,
    py: 2,
    borderBottomWidth: "1px"
  };
  var baseStyleBody = {
    px: 3,
    py: 2
  };
  var baseStyleFooter = {
    px: 3,
    py: 2,
    borderTopWidth: "1px"
  };

  var baseStyle$f = props => ({
    popper: baseStylePopper,
    content: baseStyleContent(props),
    header: baseStyleHeader,
    body: baseStyleBody,
    footer: baseStyleFooter,
    arrow: {}
  });

  var Popover = {
    parts: parts$a,
    baseStyle: baseStyle$f
  };

  function _extends$l() {
    _extends$l = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$l.apply(this, arguments);
  }
  var parts$9 = ["track", "filledTrack", "label"];

  function filledStyle(props) {
    var {
      colorScheme: c,
      theme: t,
      isIndeterminate,
      hasStripe
    } = props;
    var stripeStyle = mode(generateStripe(), generateStripe("1rem", "rgba(0,0,0,0.1)"))(props);
    var bgColor = mode(c + ".500", c + ".200")(props);
    var gradient = "linear-gradient(\n    to right,\n    transparent 0%,\n    " + getColor(t, bgColor) + " 50%,\n    transparent 100%\n  )";
    var addStripe = !isIndeterminate && hasStripe;
    return _extends$l({}, addStripe && stripeStyle, isIndeterminate ? {
      bgImage: gradient
    } : {
      bgColor
    });
  }

  var baseStyleLabel$2 = {
    lineHeight: "1",
    fontSize: "0.25em",
    fontWeight: "bold",
    color: "white"
  };

  function baseStyleTrack$2(props) {
    return {
      bg: mode("gray.100", "whiteAlpha.300")(props)
    };
  }

  function baseStyleFilledTrack$1(props) {
    return _extends$l({
      transitionProperty: "common",
      transitionDuration: "slow"
    }, filledStyle(props));
  }

  var baseStyle$e = props => ({
    label: baseStyleLabel$2,
    filledTrack: baseStyleFilledTrack$1(props),
    track: baseStyleTrack$2(props)
  });

  var sizes$a = {
    xs: {
      track: {
        h: "0.25rem"
      }
    },
    sm: {
      track: {
        h: "0.5rem"
      }
    },
    md: {
      track: {
        h: "0.75rem"
      }
    },
    lg: {
      track: {
        h: "1rem"
      }
    }
  };
  var defaultProps$a = {
    size: "md",
    colorScheme: "blue"
  };
  var Progress = {
    parts: parts$9,
    sizes: sizes$a,
    baseStyle: baseStyle$e,
    defaultProps: defaultProps$a
  };

  function _extends$k() {
    _extends$k = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$k.apply(this, arguments);
  }
  var parts$8 = ["container", "control", "label"];

  function baseStyleControl(props) {
    var {
      control
    } = Checkbox.baseStyle(props);
    return _extends$k({}, control, {
      borderRadius: "full",
      _checked: _extends$k({}, control["_checked"], {
        _before: {
          content: "\"\"",
          display: "inline-block",
          pos: "relative",
          w: "50%",
          h: "50%",
          borderRadius: "50%",
          bg: "currentColor"
        }
      })
    });
  }

  var baseStyle$d = props => ({
    label: Checkbox.baseStyle(props).label,
    control: baseStyleControl(props)
  });

  var sizes$9 = {
    md: {
      control: {
        w: 4,
        h: 4
      },
      label: {
        fontSize: "md"
      }
    },
    lg: {
      control: {
        w: 5,
        h: 5
      },
      label: {
        fontSize: "lg"
      }
    },
    sm: {
      control: {
        width: 3,
        height: 3
      },
      label: {
        fontSize: "sm"
      }
    }
  };
  var defaultProps$9 = {
    size: "md",
    colorScheme: "blue"
  };
  var Radio = {
    parts: parts$8,
    baseStyle: baseStyle$d,
    sizes: sizes$9,
    defaultProps: defaultProps$9
  };

  function _extends$j() {
    _extends$j = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$j.apply(this, arguments);
  }
  var parts$7 = ["field", "icon"];

  function baseStyleField(props) {
    return _extends$j({}, Input.baseStyle.field, {
      appearance: "none",
      paddingBottom: "1px",
      lineHeight: "normal",
      "> option, > optgroup": {
        bg: mode("white", "gray.700")(props)
      }
    });
  }

  var baseStyleIcon$2 = {
    width: "1.5rem",
    height: "100%",
    insetEnd: "0.5rem",
    position: "relative",
    color: "currentColor",
    fontSize: "1.25rem",
    _disabled: {
      opacity: 0.5
    }
  };

  var baseStyle$c = props => ({
    field: baseStyleField(props),
    icon: baseStyleIcon$2
  });

  var sizes$8 = mergeWith({}, Input.sizes, {
    xs: {
      icon: {
        insetEnd: "0.25rem"
      }
    }
  });
  var Select$1 = {
    parts: parts$7,
    baseStyle: baseStyle$c,
    sizes: sizes$8,
    variants: Input.variants,
    defaultProps: Input.defaultProps
  };

  var fade = (startColor, endColor) => keyframes({
    from: {
      borderColor: startColor,
      background: startColor
    },
    to: {
      borderColor: endColor,
      background: endColor
    }
  });

  var baseStyle$b = props => {
    var defaultStartColor = mode("gray.100", "gray.800")(props);
    var defaultEndColor = mode("gray.400", "gray.600")(props);
    var {
      startColor = defaultStartColor,
      endColor = defaultEndColor,
      speed,
      theme
    } = props;
    var start = getColor(theme, startColor);
    var end = getColor(theme, endColor);
    return {
      opacity: 0.7,
      borderRadius: "2px",
      borderColor: start,
      background: end,
      animation: speed + "s linear infinite alternate " + fade(start, end)
    };
  };

  var Skeleton = {
    baseStyle: baseStyle$b
  };

  var baseStyle$a = props => ({
    borderRadius: "md",
    fontWeight: "semibold",
    _focus: {
      boxShadow: "outline",
      padding: "1rem",
      position: "fixed",
      top: "1.5rem",
      insetStart: "1.5rem",
      bg: mode("white", "gray.700")(props)
    }
  });

  var SkipLink = {
    baseStyle: baseStyle$a
  };

  function _extends$i() {
    _extends$i = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$i.apply(this, arguments);
  }
  var parts$6 = ["container", "thumb", "track", "filledTrack"];

  function thumbOrientation(props) {
    return orient$2({
      orientation: props.orientation,
      vertical: {
        left: "50%",
        transform: "translateX(-50%)",
        _active: {
          transform: "translateX(-50%) scale(1.15)"
        }
      },
      horizontal: {
        top: "50%",
        transform: "translateY(-50%)",
        _active: {
          transform: "translateY(-50%) scale(1.15)"
        }
      }
    });
  }

  var baseStyleContainer$1 = props => {
    var {
      orientation
    } = props;
    return _extends$i({
      _disabled: {
        opacity: 0.6,
        cursor: "default",
        pointerEvents: "none"
      }
    }, orient$2({
      orientation,
      vertical: {
        h: "100%"
      },
      horizontal: {
        w: "100%"
      }
    }));
  };

  function baseStyleTrack$1(props) {
    return {
      borderRadius: "sm",
      bg: mode("gray.200", "whiteAlpha.200")(props),
      _disabled: {
        bg: mode("gray.300", "whiteAlpha.300")(props)
      }
    };
  }

  function baseStyleThumb$1(props) {
    return _extends$i({
      zIndex: 1,
      borderRadius: "full",
      bg: "white",
      boxShadow: "base",
      border: "1px solid",
      borderColor: "transparent",
      transitionProperty: "transform",
      transitionDuration: "normal",
      _focus: {
        boxShadow: "outline"
      },
      _disabled: {
        bg: "gray.300"
      }
    }, thumbOrientation(props));
  }

  function baseStyleFilledTrack(props) {
    var {
      colorScheme: c
    } = props;
    return {
      bg: mode(c + ".500", c + ".200")(props)
    };
  }

  var baseStyle$9 = props => ({
    container: baseStyleContainer$1(props),
    track: baseStyleTrack$1(props),
    thumb: baseStyleThumb$1(props),
    filledTrack: baseStyleFilledTrack(props)
  });

  function sizeLg(props) {
    return {
      thumb: {
        w: "16px",
        h: "16px"
      },
      track: orient$2({
        orientation: props.orientation,
        horizontal: {
          h: "4px"
        },
        vertical: {
          w: "4px"
        }
      })
    };
  }

  function sizeMd(props) {
    return {
      thumb: {
        w: "14px",
        h: "14px"
      },
      track: orient$2({
        orientation: props.orientation,
        horizontal: {
          h: "4px"
        },
        vertical: {
          w: "4px"
        }
      })
    };
  }

  function sizeSm(props) {
    return {
      thumb: {
        w: "10px",
        h: "10px"
      },
      track: orient$2({
        orientation: props.orientation,
        horizontal: {
          h: "2px"
        },
        vertical: {
          w: "2px"
        }
      })
    };
  }

  var sizes$7 = {
    lg: sizeLg,
    md: sizeMd,
    sm: sizeSm
  };
  var defaultProps$8 = {
    size: "md",
    colorScheme: "blue"
  };
  var Slider$1 = {
    parts: parts$6,
    sizes: sizes$7,
    baseStyle: baseStyle$9,
    defaultProps: defaultProps$8
  };

  var baseStyle$8 = {
    width: "var(--spinner-size)",
    height: "var(--spinner-size)"
  };
  var sizes$6 = {
    xs: {
      "--spinner-size": "0.75rem"
    },
    sm: {
      "--spinner-size": "1rem"
    },
    md: {
      "--spinner-size": "1.5rem"
    },
    lg: {
      "--spinner-size": "2rem"
    },
    xl: {
      "--spinner-size": "3rem"
    }
  };
  var defaultProps$7 = {
    size: "md"
  };
  var Spinner$1 = {
    baseStyle: baseStyle$8,
    sizes: sizes$6,
    defaultProps: defaultProps$7
  };

  var parts$5 = ["label", "number", "icon", "helpText"];
  var baseStyleLabel$1 = {
    fontWeight: "medium"
  };
  var baseStyleHelpText = {
    opacity: 0.8,
    marginBottom: 2
  };
  var baseStyleNumber = {
    verticalAlign: "baseline",
    fontWeight: "semibold"
  };
  var baseStyleIcon$1 = {
    marginEnd: 1,
    w: "14px",
    h: "14px",
    verticalAlign: "middle"
  };
  var baseStyle$7 = {
    label: baseStyleLabel$1,
    helpText: baseStyleHelpText,
    number: baseStyleNumber,
    icon: baseStyleIcon$1
  };
  var sizes$5 = {
    md: {
      label: {
        fontSize: "sm"
      },
      helpText: {
        fontSize: "sm"
      },
      number: {
        fontSize: "2xl"
      }
    }
  };
  var defaultProps$6 = {
    size: "md"
  };
  var Stat = {
    parts: parts$5,
    baseStyle: baseStyle$7,
    sizes: sizes$5,
    defaultProps: defaultProps$6
  };

  var parts$4 = ["container", "track", "thumb"];

  function baseStyleTrack(props) {
    var {
      colorScheme: c
    } = props;
    return {
      borderRadius: "full",
      p: "2px",
      width: "var(--slider-track-width)",
      height: "var(--slider-track-height)",
      transitionProperty: "common",
      transitionDuration: "fast",
      bg: mode("gray.300", "whiteAlpha.400")(props),
      _focus: {
        boxShadow: "outline"
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed"
      },
      _checked: {
        bg: mode(c + ".500", c + ".200")(props)
      }
    };
  }

  var baseStyleThumb = {
    bg: "white",
    transitionProperty: "transform",
    transitionDuration: "normal",
    borderRadius: "inherit",
    width: "var(--slider-track-height)",
    height: "var(--slider-track-height)",
    _checked: {
      transform: "translateX(var(--slider-thumb-x))"
    }
  };

  var baseStyle$6 = props => ({
    container: {
      "--slider-track-diff": "calc(var(--slider-track-width) - var(--slider-track-height))",
      "--slider-thumb-x": "var(--slider-track-diff)",
      _rtl: {
        "--slider-thumb-x": "calc(-1 * var(--slider-track-diff))"
      }
    },
    track: baseStyleTrack(props),
    thumb: baseStyleThumb
  });

  var sizes$4 = {
    sm: {
      container: {
        "--slider-track-width": "1.375rem",
        "--slider-track-height": "0.75rem"
      }
    },
    md: {
      container: {
        "--slider-track-width": "1.875rem",
        "--slider-track-height": "1rem"
      }
    },
    lg: {
      container: {
        "--slider-track-width": "2.875rem",
        "--slider-track-height": "1.5rem"
      }
    }
  };
  var defaultProps$5 = {
    size: "md",
    colorScheme: "blue"
  };
  var Switch$1 = {
    parts: parts$4,
    baseStyle: baseStyle$6,
    sizes: sizes$4,
    defaultProps: defaultProps$5
  };

  function _extends$h() {
    _extends$h = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$h.apply(this, arguments);
  }
  var parts$3 = ["table", "thead", "tbody", "tr", "th", "td", "caption"];
  var baseStyle$5 = {
    table: {
      fontVariantNumeric: "lining-nums tabular-nums",
      borderCollapse: "collapse",
      width: "full"
    },
    th: {
      fontFamily: "heading",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "wider",
      textAlign: "start"
    },
    td: {
      textAlign: "start"
    },
    caption: {
      mt: 4,
      fontFamily: "heading",
      textAlign: "center",
      fontWeight: "medium"
    }
  };
  var numericStyles = {
    "&[data-is-numeric=true]": {
      textAlign: "end"
    }
  };

  var simpleVariant = props => {
    var {
      colorScheme: c
    } = props;
    return {
      th: _extends$h({
        color: mode("gray.600", "gray.400")(props),
        borderBottom: "1px",
        borderColor: mode(c + ".100", c + ".700")(props)
      }, numericStyles),
      td: _extends$h({
        borderBottom: "1px",
        borderColor: mode(c + ".100", c + ".700")(props)
      }, numericStyles),
      caption: {
        color: mode("gray.600", "gray.100")(props)
      },
      tfoot: {
        tr: {
          "&:last-of-type": {
            th: {
              borderBottomWidth: 0
            }
          }
        }
      }
    };
  };

  var stripedVariant = props => {
    var {
      colorScheme: c
    } = props;
    return {
      th: _extends$h({
        color: mode("gray.600", "gray.400")(props),
        borderBottom: "1px",
        borderColor: mode(c + ".100", c + ".700")(props)
      }, numericStyles),
      td: _extends$h({
        borderBottom: "1px",
        borderColor: mode(c + ".100", c + ".700")(props)
      }, numericStyles),
      caption: {
        color: mode("gray.600", "gray.100")(props)
      },
      tbody: {
        tr: {
          "&:nth-of-type(odd)": {
            "th, td": {
              borderBottomWidth: "1px",
              borderColor: mode(c + ".100", c + ".700")(props)
            },
            td: {
              background: mode(c + ".100", c + ".700")(props)
            }
          }
        }
      },
      tfoot: {
        tr: {
          "&:last-of-type": {
            th: {
              borderBottomWidth: 0
            }
          }
        }
      }
    };
  };

  var variants$3 = {
    simple: simpleVariant,
    striped: stripedVariant,
    unstyled: {}
  };
  var sizes$3 = {
    sm: {
      th: {
        px: "4",
        py: "1",
        lineHeight: "4",
        fontSize: "xs"
      },
      td: {
        px: "4",
        py: "2",
        fontSize: "sm",
        lineHeight: "4"
      },
      caption: {
        px: "4",
        py: "2",
        fontSize: "xs"
      }
    },
    md: {
      th: {
        px: "6",
        py: "3",
        lineHeight: "4",
        fontSize: "xs"
      },
      td: {
        px: "6",
        py: "4",
        lineHeight: "5"
      },
      caption: {
        px: "6",
        py: "2",
        fontSize: "sm"
      }
    },
    lg: {
      th: {
        px: "8",
        py: "4",
        lineHeight: "5",
        fontSize: "sm"
      },
      td: {
        px: "8",
        py: "5",
        lineHeight: "6"
      },
      caption: {
        px: "6",
        py: "2",
        fontSize: "md"
      }
    }
  };
  var defaultProps$4 = {
    variant: "simple",
    size: "md",
    colorScheme: "gray"
  };
  var Table = {
    parts: parts$3,
    baseStyle: baseStyle$5,
    variants: variants$3,
    sizes: sizes$3,
    defaultProps: defaultProps$4
  };

  var parts$2 = ["root", "tablist", "tab", "tabpanels", "tabpanel", "indicator"];

  function baseStyleRoot(props) {
    var {
      orientation
    } = props;
    return {
      display: orientation === "vertical" ? "flex" : "block"
    };
  }

  function baseStyleTab(props) {
    var {
      isFitted
    } = props;
    return {
      flex: isFitted ? 1 : undefined,
      transitionProperty: "common",
      transitionDuration: "normal",
      _focus: {
        zIndex: 1,
        boxShadow: "outline"
      }
    };
  }

  function baseStyleTablist(props) {
    var {
      align = "start",
      orientation
    } = props;
    var alignments = {
      end: "flex-end",
      center: "center",
      start: "flex-start"
    };
    return {
      justifyContent: alignments[align],
      flexDirection: orientation === "vertical" ? "column" : "row"
    };
  }

  var baseStyleTabpanel = {
    p: 4
  };

  var baseStyle$4 = props => ({
    root: baseStyleRoot(props),
    tab: baseStyleTab(props),
    tablist: baseStyleTablist(props),
    tabpanel: baseStyleTabpanel
  });

  var sizes$2 = {
    sm: {
      tab: {
        py: 1,
        px: 4,
        fontSize: "sm"
      }
    },
    md: {
      tab: {
        fontSize: "md",
        py: 2,
        px: 4
      }
    },
    lg: {
      tab: {
        fontSize: "lg",
        py: 3,
        px: 4
      }
    }
  };

  function variantLine(props) {
    var {
      colorScheme: c,
      orientation
    } = props;
    var isVertical = orientation === "vertical";
    var borderProp = orientation === "vertical" ? "borderStart" : "borderBottom";
    var marginProp = isVertical ? "marginStart" : "marginBottom";
    return {
      tablist: {
        [borderProp]: "2px solid",
        borderColor: "inherit"
      },
      tab: {
        [borderProp]: "2px solid",
        borderColor: "transparent",
        [marginProp]: "-2px",
        _selected: {
          color: mode(c + ".600", c + ".300")(props),
          borderColor: "currentColor"
        },
        _active: {
          bg: mode("gray.200", "whiteAlpha.300")(props)
        },
        _disabled: {
          opacity: 0.4,
          cursor: "not-allowed"
        }
      }
    };
  }

  function variantEnclosed(props) {
    var {
      colorScheme: c
    } = props;
    return {
      tab: {
        borderTopRadius: "md",
        border: "1px solid",
        borderColor: "transparent",
        mb: "-1px",
        _selected: {
          color: mode(c + ".600", c + ".300")(props),
          borderColor: "inherit",
          borderBottomColor: mode("white", "gray.800")(props)
        }
      },
      tablist: {
        mb: "-1px",
        borderBottom: "1px solid",
        borderColor: "inherit"
      }
    };
  }

  function variantEnclosedColored(props) {
    var {
      colorScheme: c
    } = props;
    return {
      tab: {
        border: "1px solid",
        borderColor: "inherit",
        bg: mode("gray.50", "whiteAlpha.50")(props),
        mb: "-1px",
        _notLast: {
          marginEnd: "-1px"
        },
        _selected: {
          bg: mode("#fff", "gray.800")(props),
          color: mode(c + ".600", c + ".300")(props),
          borderColor: "inherit",
          borderTopColor: "currentColor",
          borderBottomColor: "transparent"
        }
      },
      tablist: {
        mb: "-1px",
        borderBottom: "1px solid",
        borderColor: "inherit"
      }
    };
  }

  function variantSoftRounded(props) {
    var {
      colorScheme: c,
      theme
    } = props;
    return {
      tab: {
        borderRadius: "full",
        fontWeight: "semibold",
        color: "gray.600",
        _selected: {
          color: getColor(theme, c + ".700"),
          bg: getColor(theme, c + ".100")
        }
      }
    };
  }

  function variantSolidRounded(props) {
    var {
      colorScheme: c
    } = props;
    return {
      tab: {
        borderRadius: "full",
        fontWeight: "semibold",
        color: mode("gray.600", "inherit")(props),
        _selected: {
          color: mode("#fff", "gray.800")(props),
          bg: mode(c + ".600", c + ".300")(props)
        }
      }
    };
  }

  var variantUnstyled = {};
  var variants$2 = {
    line: variantLine,
    enclosed: variantEnclosed,
    "enclosed-colored": variantEnclosedColored,
    "soft-rounded": variantSoftRounded,
    "solid-rounded": variantSolidRounded,
    unstyled: variantUnstyled
  };
  var defaultProps$3 = {
    size: "md",
    variant: "line",
    colorScheme: "blue"
  };
  var Tabs = {
    parts: parts$2,
    baseStyle: baseStyle$4,
    sizes: sizes$2,
    variants: variants$2,
    defaultProps: defaultProps$3
  };

  var parts$1 = ["container", "label", "closeButton"];
  var baseStyleContainer = {
    fontWeight: "medium",
    lineHeight: 1.2,
    outline: 0,
    _focus: {
      boxShadow: "outline"
    }
  };
  var baseStyleLabel = {
    lineHeight: 1.2
  };
  var baseStyleCloseButton = {
    fontSize: "18px",
    w: "1.25rem",
    h: "1.25rem",
    transitionProperty: "common",
    transitionDuration: "normal",
    borderRadius: "full",
    marginStart: "0.375rem",
    marginEnd: "-1",
    opacity: 0.5,
    _disabled: {
      opacity: 0.4
    },
    _focus: {
      boxShadow: "outline",
      bg: "rgba(0, 0, 0, 0.14)"
    },
    _hover: {
      opacity: 0.8
    },
    _active: {
      opacity: 1
    }
  };
  var baseStyle$3 = {
    container: baseStyleContainer,
    label: baseStyleLabel,
    closeButton: baseStyleCloseButton
  };
  var sizes$1 = {
    sm: {
      container: {
        minH: "1.25rem",
        minW: "1.25rem",
        fontSize: "xs",
        px: 2,
        borderRadius: "md"
      },
      closeButton: {
        marginEnd: "-2px",
        marginStart: "0.35rem"
      }
    },
    md: {
      container: {
        minH: "1.5rem",
        minW: "1.5rem",
        fontSize: "sm",
        borderRadius: "md",
        px: 2
      }
    },
    lg: {
      container: {
        minH: 8,
        minW: 8,
        fontSize: "md",
        borderRadius: "md",
        px: 3
      }
    }
  };
  var variants$1 = {
    subtle: props => ({
      container: Badge.variants.subtle(props)
    }),
    solid: props => ({
      container: Badge.variants.solid(props)
    }),
    outline: props => ({
      container: Badge.variants.outline(props)
    })
  };
  var defaultProps$2 = {
    size: "md",
    variant: "subtle",
    colorScheme: "gray"
  };
  var Tag = {
    parts: parts$1,
    variants: variants$1,
    baseStyle: baseStyle$3,
    sizes: sizes$1,
    defaultProps: defaultProps$2
  };

  function _extends$g() {
    _extends$g = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$g.apply(this, arguments);
  }

  var baseStyle$2 = _extends$g({}, Input.baseStyle.field, {
    paddingY: "8px",
    minHeight: "80px",
    lineHeight: "short",
    verticalAlign: "top"
  });

  var variants = {
    outline: props => Input.variants.outline(props).field,
    flushed: props => Input.variants.flushed(props).field,
    filled: props => Input.variants.filled(props).field,
    unstyled: Input.variants.unstyled.field
  };
  var sizes = {
    xs: Input.sizes.xs.field,
    sm: Input.sizes.sm.field,
    md: Input.sizes.md.field,
    lg: Input.sizes.lg.field
  };
  var defaultProps$1 = {
    size: "md",
    variant: "outline"
  };
  var Textarea = {
    baseStyle: baseStyle$2,
    sizes,
    variants,
    defaultProps: defaultProps$1
  };

  function baseStyle$1(props) {
    var bg = mode("gray.700", "gray.300")(props);
    return {
      "--tooltip-bg": "colors." + bg,
      px: "8px",
      py: "2px",
      bg: "var(--tooltip-bg)",
      "--popper-arrow-bg": "var(--tooltip-bg)",
      color: mode("whiteAlpha.900", "gray.900")(props),
      borderRadius: "sm",
      fontWeight: "medium",
      fontSize: "sm",
      boxShadow: "md",
      maxW: "320px",
      zIndex: "tooltip"
    };
  }

  var Tooltip = {
    baseStyle: baseStyle$1
  };

  var parts = ["text", "icon"];

  function baseStyleText(props) {
    return {
      color: mode("red.500", "red.300")(props),
      mt: 2,
      fontSize: "sm"
    };
  }

  function baseStyleIcon(props) {
    return {
      marginEnd: "0.5em",
      color: mode("red.500", "red.300")(props)
    };
  }

  var baseStyle = props => ({
    text: baseStyleText(props),
    icon: baseStyleIcon(props)
  });

  var FormError = {
    parts,
    baseStyle
  };

  var components = {
    Accordion,
    Alert,
    Avatar,
    Badge,
    Breadcrumb,
    Button: Button$1,
    Checkbox,
    CloseButton,
    Code,
    Container,
    Divider,
    Drawer,
    Editable,
    Form,
    FormLabel: FormLabel$1,
    Heading,
    Input,
    Kbd,
    Link,
    List,
    Menu,
    Modal,
    NumberInput,
    PinInput,
    Popover,
    Progress,
    Radio,
    Select: Select$1,
    Skeleton,
    SkipLink,
    Slider: Slider$1,
    Spinner: Spinner$1,
    Stat,
    Switch: Switch$1,
    Table,
    Tabs,
    Tag,
    Textarea,
    Tooltip,
    FormError
  };

  var borders = {
    none: 0,
    "1px": "1px solid",
    "2px": "2px solid",
    "4px": "4px solid",
    "8px": "8px solid"
  };
  var borders$1 = borders;

  /**
   * Breakpoints for responsive design
   */

  var breakpoints = createBreakpoints({
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em"
  });
  var breakpoints$1 = breakpoints;

  /**
   * @deprecated
   * You can derive the Colors type from the DefaultChakraTheme:
   *
   * type Colors = DefaultChakraTheme["colors"]
   */
  var colors$2 = {
    transparent: "transparent",
    current: "currentColor",
    black: "#000000",
    white: "#FFFFFF",
    whiteAlpha: {
      50: "rgba(255, 255, 255, 0.04)",
      100: "rgba(255, 255, 255, 0.06)",
      200: "rgba(255, 255, 255, 0.08)",
      300: "rgba(255, 255, 255, 0.16)",
      400: "rgba(255, 255, 255, 0.24)",
      500: "rgba(255, 255, 255, 0.36)",
      600: "rgba(255, 255, 255, 0.48)",
      700: "rgba(255, 255, 255, 0.64)",
      800: "rgba(255, 255, 255, 0.80)",
      900: "rgba(255, 255, 255, 0.92)"
    },
    blackAlpha: {
      50: "rgba(0, 0, 0, 0.04)",
      100: "rgba(0, 0, 0, 0.06)",
      200: "rgba(0, 0, 0, 0.08)",
      300: "rgba(0, 0, 0, 0.16)",
      400: "rgba(0, 0, 0, 0.24)",
      500: "rgba(0, 0, 0, 0.36)",
      600: "rgba(0, 0, 0, 0.48)",
      700: "rgba(0, 0, 0, 0.64)",
      800: "rgba(0, 0, 0, 0.80)",
      900: "rgba(0, 0, 0, 0.92)"
    },
    gray: {
      50: "#F7FAFC",
      100: "#EDF2F7",
      200: "#E2E8F0",
      300: "#CBD5E0",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568",
      700: "#2D3748",
      800: "#1A202C",
      900: "#171923"
    },
    red: {
      50: "#FFF5F5",
      100: "#FED7D7",
      200: "#FEB2B2",
      300: "#FC8181",
      400: "#F56565",
      500: "#E53E3E",
      600: "#C53030",
      700: "#9B2C2C",
      800: "#822727",
      900: "#63171B"
    },
    orange: {
      50: "#FFFAF0",
      100: "#FEEBC8",
      200: "#FBD38D",
      300: "#F6AD55",
      400: "#ED8936",
      500: "#DD6B20",
      600: "#C05621",
      700: "#9C4221",
      800: "#7B341E",
      900: "#652B19"
    },
    yellow: {
      50: "#FFFFF0",
      100: "#FEFCBF",
      200: "#FAF089",
      300: "#F6E05E",
      400: "#ECC94B",
      500: "#D69E2E",
      600: "#B7791F",
      700: "#975A16",
      800: "#744210",
      900: "#5F370E"
    },
    green: {
      50: "#F0FFF4",
      100: "#C6F6D5",
      200: "#9AE6B4",
      300: "#68D391",
      400: "#48BB78",
      500: "#38A169",
      600: "#2F855A",
      700: "#276749",
      800: "#22543D",
      900: "#1C4532"
    },
    teal: {
      50: "#E6FFFA",
      100: "#B2F5EA",
      200: "#81E6D9",
      300: "#4FD1C5",
      400: "#38B2AC",
      500: "#319795",
      600: "#2C7A7B",
      700: "#285E61",
      800: "#234E52",
      900: "#1D4044"
    },
    blue: {
      50: "#ebf8ff",
      100: "#bee3f8",
      200: "#90cdf4",
      300: "#63b3ed",
      400: "#4299e1",
      500: "#3182ce",
      600: "#2b6cb0",
      700: "#2c5282",
      800: "#2a4365",
      900: "#1A365D"
    },
    cyan: {
      50: "#EDFDFD",
      100: "#C4F1F9",
      200: "#9DECF9",
      300: "#76E4F7",
      400: "#0BC5EA",
      500: "#00B5D8",
      600: "#00A3C4",
      700: "#0987A0",
      800: "#086F83",
      900: "#065666"
    },
    purple: {
      50: "#FAF5FF",
      100: "#E9D8FD",
      200: "#D6BCFA",
      300: "#B794F4",
      400: "#9F7AEA",
      500: "#805AD5",
      600: "#6B46C1",
      700: "#553C9A",
      800: "#44337A",
      900: "#322659"
    },
    pink: {
      50: "#FFF5F7",
      100: "#FED7E2",
      200: "#FBB6CE",
      300: "#F687B3",
      400: "#ED64A6",
      500: "#D53F8C",
      600: "#B83280",
      700: "#97266D",
      800: "#702459",
      900: "#521B41"
    },
    linkedin: {
      50: "#E8F4F9",
      100: "#CFEDFB",
      200: "#9BDAF3",
      300: "#68C7EC",
      400: "#34B3E4",
      500: "#00A0DC",
      600: "#008CC9",
      700: "#0077B5",
      800: "#005E93",
      900: "#004471"
    },
    facebook: {
      50: "#E8F4F9",
      100: "#D9DEE9",
      200: "#B7C2DA",
      300: "#6482C0",
      400: "#4267B2",
      500: "#385898",
      600: "#314E89",
      700: "#29487D",
      800: "#223B67",
      900: "#1E355B"
    },
    messenger: {
      50: "#D0E6FF",
      100: "#B9DAFF",
      200: "#A2CDFF",
      300: "#7AB8FF",
      400: "#2E90FF",
      500: "#0078FF",
      600: "#0063D1",
      700: "#0052AC",
      800: "#003C7E",
      900: "#002C5C"
    },
    whatsapp: {
      50: "#dffeec",
      100: "#b9f5d0",
      200: "#90edb3",
      300: "#65e495",
      400: "#3cdd78",
      500: "#22c35e",
      600: "#179848",
      700: "#0c6c33",
      800: "#01421c",
      900: "#001803"
    },
    twitter: {
      50: "#E5F4FD",
      100: "#C8E9FB",
      200: "#A8DCFA",
      300: "#83CDF7",
      400: "#57BBF5",
      500: "#1DA1F2",
      600: "#1A94DA",
      700: "#1681BF",
      800: "#136B9E",
      900: "#0D4D71"
    },
    telegram: {
      50: "#E3F2F9",
      100: "#C5E4F3",
      200: "#A2D4EC",
      300: "#7AC1E4",
      400: "#47A9DA",
      500: "#0088CC",
      600: "#007AB8",
      700: "#006BA1",
      800: "#005885",
      900: "#003F5E"
    }
  };
  var colors$3 = colors$2;

  var radii = {
    none: "0",
    sm: "0.125rem",
    base: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px"
  };
  /**
   * @deprecated
   * You can derive the Radii type from the DefaultChakraTheme
   *
   * type Radii = DefaultChakraTheme['radii']
   */

  var radii$1 = radii;

  var shadows = {
    xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    outline: "0 0 0 3px rgba(66, 153, 225, 0.6)",
    inner: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
    none: "none",
    "dark-lg": "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px"
  };
  /**
   * @deprecated
   * You can derive the Shadows type from the DefaultChakraTheme
   *
   * type Shadows = DefaultChakraTheme['shadows']
   */

  var shadows$1 = shadows;

  var transitionProperty = {
    common: "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
    colors: "background-color, border-color, color, fill, stroke",
    dimensions: "width, height",
    position: "left, right, top, bottom",
    background: "background-color, background-image, background-position"
  };
  var transitionTimingFunction = {
    "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
    "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
    "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
  };
  var transitionDuration = {
    "ultra-fast": "50ms",
    faster: "100ms",
    fast: "150ms",
    normal: "200ms",
    slow: "300ms",
    slower: "400ms",
    "ultra-slow": "500ms"
  };
  var transition = {
    property: transitionProperty,
    easing: transitionTimingFunction,
    duration: transitionDuration
  };
  var transition$1 = transition;

  var zIndices = {
    hide: -1,
    auto: "auto",
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800
  };
  /**
   * @deprecated
   * You can derive the ZIndices type from the DefaultChakraTheme
   *
   * type ZIndices = DefaultChakraTheme['zIndices']
   */

  var zIndices$1 = zIndices;

  var blur = {
    none: 0,
    sm: "4px",
    base: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    "2xl": "40px",
    "3xl": "64px"
  };
  var blur$1 = blur;

  function _extends$f() {
    _extends$f = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$f.apply(this, arguments);
  }

  var foundations = _extends$f({
    breakpoints: breakpoints$1,
    zIndices: zIndices$1,
    radii: radii$1,
    blur: blur$1,
    colors: colors$3
  }, typography$1, {
    sizes: sizes$m,
    shadows: shadows$1,
    space: spacing,
    borders: borders$1,
    transition: transition$1
  });

  var foundations$1 = foundations;

  var styles = {
    global: props => ({
      body: {
        fontFamily: "body",
        color: mode("gray.800", "whiteAlpha.900")(props),
        bg: mode("white", "gray.800")(props),
        transitionProperty: "background-color",
        transitionDuration: "normal",
        lineHeight: "base"
      },
      "*::placeholder": {
        color: mode("gray.400", "whiteAlpha.400")(props)
      },
      "*, *::before, &::after": {
        borderColor: mode("gray.200", "whiteAlpha.300")(props),
        wordWrap: "break-word"
      }
    })
  };
  var styles$1 = styles;

  var requiredChakraThemeKeys = ["borders", "breakpoints", "colors", "components", "config", "direction", "fonts", "fontSizes", "fontWeights", "letterSpacings", "lineHeights", "radii", "shadows", "sizes", "space", "styles", "transition", "zIndices"];
  function isChakraTheme(unit) {
    if (!isObject(unit)) {
      return false;
    }

    return requiredChakraThemeKeys.every(propertyName => Object.prototype.hasOwnProperty.call(unit, propertyName));
  }

  function _extends$e() {
    _extends$e = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$e.apply(this, arguments);
  }
  var direction = "ltr";
  var config = {
    useSystemColorMode: false,
    initialColorMode: "light",
    cssVarPrefix: "chakra"
  };
  var theme$a = _extends$e({
    direction
  }, foundations$1, {
    components,
    styles: styles$1,
    config
  });
  var defaultTheme = theme$a;

  /**
   * Function to override or customize the Chakra UI theme conveniently.
   * First extension overrides the baseTheme and following extensions override the preceding extensions.
   *
   * @example:
   * import { theme as baseTheme, extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
   *
   * const customTheme = extendTheme(
   *   {
   *     colors: {
   *       brand: {
   *         500: "#b4d455",
   *       },
   *     },
   *   },
   *   withDefaultColorScheme({ colorScheme: "red" }),
   *   baseTheme // optional
   * )
   */

  function extendTheme() {
    for (var _len = arguments.length, extensions = new Array(_len), _key = 0; _key < _len; _key++) {
      extensions[_key] = arguments[_key];
    }

    var overrides = [...extensions];
    var baseTheme = extensions[extensions.length - 1];

    if (isChakraTheme(baseTheme) && // this ensures backward compatibility
    // previously only `extendTheme(override, baseTheme?)` was allowed
    overrides.length > 1) {
      overrides = overrides.slice(0, overrides.length - 1);
    } else {
      baseTheme = defaultTheme;
    }

    return pipe(...overrides.map(extension => prevTheme => isFunction(extension) ? extension(prevTheme) : mergeThemeOverride(prevTheme, extension)))(baseTheme);
  }
  function mergeThemeOverride() {
    for (var _len2 = arguments.length, overrides = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      overrides[_key2] = arguments[_key2];
    }

    return mergeWith({}, ...overrides, mergeThemeCustomizer);
  }

  function mergeThemeCustomizer(source, override, key, object) {
    if ((isFunction(source) || isFunction(override)) && Object.prototype.hasOwnProperty.call(object, key)) {
      return function () {
        var sourceValue = isFunction(source) ? source(...arguments) : source;
        var overrideValue = isFunction(override) ? override(...arguments) : override;
        return mergeWith({}, sourceValue, overrideValue, mergeThemeCustomizer);
      };
    } // fallback to default behaviour


    return undefined;
  }

  /**
   * Styles to visually hide an element
   * but make it accessible to screen-readers
   */

  var visuallyHiddenStyle = {
    border: "0px",
    clip: "rect(0px, 0px, 0px, 0px)",
    height: "1px",
    width: "1px",
    margin: "-1px",
    padding: "0px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    position: "absolute"
  };
  /**
   * Visually hidden component used to hide
   * elements on screen
   */

  var VisuallyHidden = chakra("span", {
    baseStyle: visuallyHiddenStyle
  });
  /**
   * Visually hidden input component for designing
   * custom input components using the html `input`
   * as a proxy
   */


  chakra("input", {
    baseStyle: visuallyHiddenStyle
  });

  function _extends$d() {
    _extends$d = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$d.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose$b(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }
  var spin = keyframes({
    "0%": {
      transform: "rotate(0deg)"
    },
    "100%": {
      transform: "rotate(360deg)"
    }
  });
  /**
   * Spinner is used to indicate the loading state of a page or a component,
   * It renders a `div` by default.
   *
   * @see Docs https://chakra-ui.com/spinner
   */

  var Spinner = /*#__PURE__*/forwardRef((props, ref) => {
    var styles = useStyleConfig("Spinner", props);

    var _omitThemingProps = omitThemingProps(props),
        {
      label = "Loading...",
      thickness = "2px",
      speed = "0.45s",
      emptyColor = "transparent",
      className
    } = _omitThemingProps,
        rest = _objectWithoutPropertiesLoose$b(_omitThemingProps, ["label", "thickness", "speed", "emptyColor", "className"]);

    var _className = cx("chakra-spinner", className);

    var spinnerStyles = _extends$d({
      display: "inline-block",
      borderColor: "currentColor",
      borderStyle: "solid",
      borderRadius: "99999px",
      borderWidth: thickness,
      borderBottomColor: emptyColor,
      borderLeftColor: emptyColor,
      animation: spin + " " + speed + " linear infinite"
    }, styles);

    return /*#__PURE__*/React__namespace.createElement(chakra.div, _extends$d({
      ref: ref,
      __css: spinnerStyles,
      className: _className
    }, rest), label && /*#__PURE__*/React__namespace.createElement(VisuallyHidden, null, label));
  });

  var [ButtonGroupProvider, useButtonGroup] = createContext({
    strict: false,
    name: "ButtonGroupContext"
  });

  function _objectWithoutPropertiesLoose$a(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _extends$c() {
    _extends$c = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$c.apply(this, arguments);
  }
  var Button = /*#__PURE__*/forwardRef((props, ref) => {
    var _styles$_focus;

    var group = useButtonGroup();
    var styles = useStyleConfig("Button", _extends$c({}, group, props));

    var _omitThemingProps = omitThemingProps(props),
        {
      isDisabled = group == null ? void 0 : group.isDisabled,
      isLoading,
      isActive,
      isFullWidth,
      children,
      leftIcon,
      rightIcon,
      loadingText,
      iconSpacing = "0.5rem",
      type,
      spinner,
      spinnerPlacement = "start",
      className,
      as
    } = _omitThemingProps,
        rest = _objectWithoutPropertiesLoose$a(_omitThemingProps, ["isDisabled", "isLoading", "isActive", "isFullWidth", "children", "leftIcon", "rightIcon", "loadingText", "iconSpacing", "type", "spinner", "spinnerPlacement", "className", "as"]);
    /**
     * When button is used within ButtonGroup (i.e flushed with sibling buttons),
     * it is important to add a `zIndex` on focus.
     *
     * So let's read the component styles and then add `zIndex` to it.
     */


    var _focus = mergeWith({}, (_styles$_focus = styles == null ? void 0 : styles["_focus"]) != null ? _styles$_focus : {}, {
      zIndex: 1
    });

    var buttonStyles = _extends$c({
      display: "inline-flex",
      appearance: "none",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
      position: "relative",
      whiteSpace: "nowrap",
      verticalAlign: "middle",
      outline: "none",
      width: isFullWidth ? "100%" : "auto"
    }, styles, !!group && {
      _focus
    });

    var {
      ref: _ref,
      type: defaultType
    } = useButtonType(as);
    return /*#__PURE__*/React__namespace.createElement(chakra.button, _extends$c({
      disabled: isDisabled || isLoading,
      ref: mergeRefs(ref, _ref),
      as: as,
      type: type != null ? type : defaultType,
      "data-active": dataAttr(isActive),
      "data-loading": dataAttr(isLoading),
      __css: buttonStyles,
      className: cx("chakra-button", className)
    }, rest), leftIcon && !isLoading && /*#__PURE__*/React__namespace.createElement(ButtonIcon, {
      marginEnd: iconSpacing
    }, leftIcon), isLoading && spinnerPlacement === "start" && /*#__PURE__*/React__namespace.createElement(ButtonSpinner, {
      className: "chakra-button__spinner--start",
      label: loadingText,
      placement: "start"
    }, spinner), isLoading ? loadingText || /*#__PURE__*/React__namespace.createElement(chakra.span, {
      opacity: 0
    }, children) : children, isLoading && spinnerPlacement === "end" && /*#__PURE__*/React__namespace.createElement(ButtonSpinner, {
      className: "chakra-button__spinner--end",
      label: loadingText,
      placement: "end"
    }, spinner), rightIcon && !isLoading && /*#__PURE__*/React__namespace.createElement(ButtonIcon, {
      marginStart: iconSpacing
    }, rightIcon));
  });

  function useButtonType(value) {
    var [isButton, setIsButton] = React__namespace.useState(!value);
    var refCallback = React__namespace.useCallback(node => {
      if (!node) return;
      setIsButton(node.tagName === "BUTTON");
    }, []);
    var type = isButton ? "button" : undefined;
    return {
      ref: refCallback,
      type
    };
  }

  var ButtonIcon = props => {
    var {
      children,
      className
    } = props,
        rest = _objectWithoutPropertiesLoose$a(props, ["children", "className"]);

    var _children = /*#__PURE__*/React__namespace.isValidElement(children) ? /*#__PURE__*/React__namespace.cloneElement(children, {
      "aria-hidden": true,
      focusable: false
    }) : children;

    var _className = cx("chakra-button__icon", className);

    return /*#__PURE__*/React__namespace.createElement(chakra.span, _extends$c({
      display: "inline-flex",
      alignSelf: "center",
      flexShrink: 0
    }, rest, {
      className: _className
    }), _children);
  };

  var ButtonSpinner = props => {
    var {
      label,
      placement,
      children = /*#__PURE__*/React__namespace.createElement(Spinner, {
        color: "currentColor",
        width: "1em",
        height: "1em"
      }),
      className,
      __css
    } = props,
        rest = _objectWithoutPropertiesLoose$a(props, ["label", "placement", "spacing", "children", "className", "__css"]);

    var _className = cx("chakra-button__spinner", className);

    var marginProp = placement === "start" ? "marginEnd" : "marginStart";

    var spinnerStyles = _extends$c({
      display: "flex",
      alignItems: "center",
      position: label ? "relative" : "absolute",
      [marginProp]: label ? "0.5rem" : 0,
      fontSize: "1em",
      lineHeight: "normal"
    }, __css);

    return /*#__PURE__*/React__namespace.createElement(chakra.div, _extends$c({
      className: _className
    }, rest, {
      __css: spinnerStyles
    }), children);
  };

  function _extends$b() {
    _extends$b = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$b.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose$9(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }
  /**
   * useCheckbox that provides all the state and focus management logic
   * for a checkbox. It is consumed by the `Checkbox` component
   *
   * @see Docs https://chakra-ui.com/checkbox#hooks
   */

  function useCheckbox(props) {
    if (props === void 0) {
      props = {};
    }

    var {
      defaultIsChecked,
      defaultChecked = defaultIsChecked,
      isChecked: checkedProp,
      isFocusable,
      isDisabled,
      isReadOnly,
      isRequired,
      onChange,
      isIndeterminate,
      isInvalid,
      name,
      value,
      id,
      onBlur,
      onFocus,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-invalid": ariaInvalid,
      "aria-describedby": ariaDescribedBy
    } = props,
        htmlProps = _objectWithoutPropertiesLoose$9(props, ["defaultIsChecked", "defaultChecked", "isChecked", "isFocusable", "isDisabled", "isReadOnly", "isRequired", "onChange", "isIndeterminate", "isInvalid", "name", "value", "id", "onBlur", "onFocus", "aria-label", "aria-labelledby", "aria-invalid", "aria-describedby"]);

    var onChangeProp = useCallbackRef(onChange);
    var onBlurProp = useCallbackRef(onBlur);
    var onFocusProp = useCallbackRef(onFocus);
    var [isFocused, setFocused] = useBoolean();
    var [isHovered, setHovered] = useBoolean();
    var [isActive, setActive] = useBoolean();
    var inputRef = React.useRef(null);
    var [rootIsLabelElement, setRootIsLabelElement] = React.useState(true);
    var [checkedState, setCheckedState] = React.useState(!!defaultChecked);
    var [isControlled, isChecked] = useControllableProp(checkedProp, checkedState);
    warn({
      condition: !!defaultIsChecked,
      message: 'The "defaultIsChecked" prop has been deprecated and will be removed in a future version. ' + 'Please use the "defaultChecked" prop instead, which mirrors default React checkbox behavior.'
    });
    var handleChange = React.useCallback(event => {
      if (isReadOnly || isDisabled) {
        event.preventDefault();
        return;
      }

      if (!isControlled) {
        if (isChecked) {
          setCheckedState(event.target.checked);
        } else {
          setCheckedState(isIndeterminate ? true : event.target.checked);
        }
      }

      onChangeProp == null ? void 0 : onChangeProp(event);
    }, [isReadOnly, isDisabled, isChecked, isControlled, isIndeterminate, onChangeProp]);
    useSafeLayoutEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = Boolean(isIndeterminate);
      }
    }, [isIndeterminate]);
    var trulyDisabled = isDisabled && !isFocusable;
    var onKeyDown = React.useCallback(event => {
      if (event.key === " ") {
        setActive.on();
      }
    }, [setActive]);
    var onKeyUp = React.useCallback(event => {
      if (event.key === " ") {
        setActive.off();
      }
    }, [setActive]);
    /**
     * Sync state with uncontrolled form libraries like `react-hook-form`.
     *
     * These libraries set the checked value for input fields
     * using their refs. For the checkbox, it sets `ref.current.checked = true | false` directly.
     *
     * This means the `isChecked` state will get out of sync with `ref.current.checked`,
     * even though the input validation with work, the UI will not be up to date.
     *
     * Let's correct that by checking and syncing the state accordingly.
     */

    useSafeLayoutEffect(() => {
      if (!inputRef.current) return;
      var notInSync = inputRef.current.checked !== isChecked;

      if (notInSync) {
        setCheckedState(inputRef.current.checked);
      }
    }, [inputRef.current]);
    var getCheckboxProps = React.useCallback(function (props, forwardedRef) {
      if (props === void 0) {
        props = {};
      }

      if (forwardedRef === void 0) {
        forwardedRef = null;
      }

      var onPressDown = event => {
        // On mousedown, the input blurs and returns focus to the `body`,
        // we need to prevent this. Native checkboxes keeps focus on `input`
        event.preventDefault();
        setActive.on();
      };

      return _extends$b({}, props, {
        ref: forwardedRef,
        "data-active": dataAttr(isActive),
        "data-hover": dataAttr(isHovered),
        "data-checked": dataAttr(isChecked),
        "data-focus": dataAttr(isFocused),
        "data-indeterminate": dataAttr(isIndeterminate),
        "data-disabled": dataAttr(isDisabled),
        "data-invalid": dataAttr(isInvalid),
        "data-readonly": dataAttr(isReadOnly),
        "aria-hidden": true,
        onMouseDown: callAllHandlers(props.onMouseDown, onPressDown),
        onMouseUp: callAllHandlers(props.onMouseUp, setActive.off),
        onMouseEnter: callAllHandlers(props.onMouseEnter, setHovered.on),
        onMouseLeave: callAllHandlers(props.onMouseLeave, setHovered.off)
      });
    }, [isActive, isChecked, isDisabled, isFocused, isHovered, isIndeterminate, isInvalid, isReadOnly, setActive, setHovered.off, setHovered.on]);
    var getRootProps = React.useCallback(function (props, forwardedRef) {
      if (props === void 0) {
        props = {};
      }

      if (forwardedRef === void 0) {
        forwardedRef = null;
      }

      return _extends$b({}, htmlProps, props, {
        ref: mergeRefs(forwardedRef, node => {
          if (!node) return;
          setRootIsLabelElement(node.tagName === "LABEL");
        }),
        onClick: callAllHandlers(props.onClick, () => {
          /**
           * Accessibility:
           *
           * Ideally, `getRootProps` should be spread unto a `label` element.
           *
           * If the element was changed using the `as` prop or changing
           * the dom node `getRootProps` is spread unto (to a `div` or `span`), we'll trigger
           * click on the input when the element is clicked.
           * @see Issue https://github.com/chakra-ui/chakra-ui/issues/3480
           */
          if (!rootIsLabelElement) {
            var _inputRef$current;

            (_inputRef$current = inputRef.current) == null ? void 0 : _inputRef$current.click();
            focus(inputRef.current, {
              nextTick: true
            });
          }
        }),
        "data-disabled": dataAttr(isDisabled)
      });
    }, [htmlProps, isDisabled, rootIsLabelElement]);
    var getInputProps = React.useCallback(function (props, forwardedRef) {
      if (props === void 0) {
        props = {};
      }

      if (forwardedRef === void 0) {
        forwardedRef = null;
      }

      var onFocus = () => {
        scheduleMicrotask(setFocused.on);
      };

      return _extends$b({}, props, {
        ref: mergeRefs(inputRef, forwardedRef),
        type: "checkbox",
        name,
        value,
        id,
        onChange: callAllHandlers(props.onChange, handleChange),
        onBlur: callAllHandlers(props.onBlur, onBlurProp, setFocused.off),
        onFocus: callAllHandlers(props.onFocus, onFocusProp, onFocus),
        onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
        onKeyUp: callAllHandlers(props.onKeyUp, onKeyUp),
        required: isRequired,
        checked: isChecked,
        disabled: trulyDisabled,
        readOnly: isReadOnly,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-invalid": ariaInvalid ? Boolean(ariaInvalid) : isInvalid,
        "aria-describedby": ariaDescribedBy,
        "aria-disabled": isDisabled,
        style: visuallyHiddenStyle
      });
    }, [name, value, id, handleChange, setFocused.off, setFocused.on, onBlurProp, onFocusProp, onKeyDown, onKeyUp, isRequired, isChecked, trulyDisabled, isReadOnly, ariaLabel, ariaLabelledBy, ariaInvalid, isInvalid, ariaDescribedBy, isDisabled]);
    var getLabelProps = React.useCallback(function (props, forwardedRef) {
      if (props === void 0) {
        props = {};
      }

      if (forwardedRef === void 0) {
        forwardedRef = null;
      }

      return _extends$b({}, props, {
        ref: forwardedRef,
        onMouseDown: callAllHandlers(props.onMouseDown, stopEvent),
        onTouchStart: callAllHandlers(props.onTouchStart, stopEvent),
        "data-disabled": dataAttr(isDisabled),
        "data-checked": dataAttr(isChecked),
        "data-invalid": dataAttr(isInvalid)
      });
    }, [isChecked, isDisabled, isInvalid]);
    return {
      state: {
        isInvalid,
        isFocused,
        isChecked,
        isActive,
        isHovered,
        isIndeterminate,
        isDisabled,
        isReadOnly,
        isRequired
      },
      getRootProps,
      getCheckboxProps,
      getInputProps,
      getLabelProps,
      htmlProps
    };
  }
  /**
   * Prevent `onBlur` being fired when the checkbox label is touched
   */

  function stopEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function _extends$a() {
    _extends$a = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$a.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose$8(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }
  var [FormControlProvider, useFormControlContext] = createContext({
    strict: false,
    name: "FormControlContext"
  });

  function useFormControlProvider(props) {
    var {
      id: idProp,
      isRequired,
      isInvalid,
      isDisabled,
      isReadOnly
    } = props,
        htmlProps = _objectWithoutPropertiesLoose$8(props, ["id", "isRequired", "isInvalid", "isDisabled", "isReadOnly"]); // Generate all the required ids


    var uuid = useId();
    var id = idProp || "field-" + uuid;
    var labelId = id + "-label";
    var feedbackId = id + "-feedback";
    var helpTextId = id + "-helptext";
    /**
     * Track whether the `FormErrorMessage` has been rendered.
     * We use this to append its id the the `aria-describedby` of the `input`.
     */

    var [hasFeedbackText, setHasFeedbackText] = React__namespace.useState(false);
    /**
     * Track whether the `FormHelperText` has been rendered.
     * We use this to append its id the the `aria-describedby` of the `input`.
     */

    var [hasHelpText, setHasHelpText] = React__namespace.useState(false); // Track whether the form element (e.g, `input`) has focus.

    var [isFocused, setFocus] = useBoolean();
    var getHelpTextProps = React__namespace.useCallback(function (props, forwardedRef) {
      if (props === void 0) {
        props = {};
      }

      if (forwardedRef === void 0) {
        forwardedRef = null;
      }

      return _extends$a({
        id: helpTextId
      }, props, {
        /**
         * Notify the field context when the help text is rendered on screen,
         * so we can apply the correct `aria-describedby` to the field (e.g. input, textarea).
         */
        ref: mergeRefs(forwardedRef, node => {
          if (!node) return;
          setHasHelpText(true);
        })
      });
    }, [helpTextId]);
    var getLabelProps = React__namespace.useCallback(function (props, forwardedRef) {
      var _props$id, _props$htmlFor;

      if (props === void 0) {
        props = {};
      }

      if (forwardedRef === void 0) {
        forwardedRef = null;
      }

      return _extends$a({}, props, {
        ref: forwardedRef,
        "data-focus": dataAttr(isFocused),
        "data-disabled": dataAttr(isDisabled),
        "data-invalid": dataAttr(isInvalid),
        "data-readonly": dataAttr(isReadOnly),
        id: (_props$id = props.id) != null ? _props$id : labelId,
        htmlFor: (_props$htmlFor = props.htmlFor) != null ? _props$htmlFor : id
      });
    }, [id, isDisabled, isFocused, isInvalid, isReadOnly, labelId]);
    var getErrorMessageProps = React__namespace.useCallback(function (props, forwardedRef) {
      if (props === void 0) {
        props = {};
      }

      if (forwardedRef === void 0) {
        forwardedRef = null;
      }

      return _extends$a({
        id: feedbackId
      }, props, {
        /**
         * Notify the field context when the error message is rendered on screen,
         * so we can apply the correct `aria-describedby` to the field (e.g. input, textarea).
         */
        ref: mergeRefs(forwardedRef, node => {
          if (!node) return;
          setHasFeedbackText(true);
        }),
        "aria-live": "polite"
      });
    }, [feedbackId]);
    var getRootProps = React__namespace.useCallback(function (props, forwardedRef) {
      if (props === void 0) {
        props = {};
      }

      if (forwardedRef === void 0) {
        forwardedRef = null;
      }

      return _extends$a({}, props, htmlProps, {
        ref: forwardedRef,
        role: "group"
      });
    }, [htmlProps]);
    var getRequiredIndicatorProps = React__namespace.useCallback(function (props, forwardedRef) {
      if (props === void 0) {
        props = {};
      }

      if (forwardedRef === void 0) {
        forwardedRef = null;
      }

      return _extends$a({}, props, {
        ref: forwardedRef,
        role: "presentation",
        "aria-hidden": true,
        children: props.children || "*"
      });
    }, []);
    var onFocus = React__namespace.useCallback(() => {
      scheduleMicrotask(setFocus.on);
    }, [setFocus]);
    return {
      isRequired: !!isRequired,
      isInvalid: !!isInvalid,
      isReadOnly: !!isReadOnly,
      isDisabled: !!isDisabled,
      isFocused: !!isFocused,
      onFocus,
      onBlur: setFocus.off,
      hasFeedbackText,
      setHasFeedbackText,
      hasHelpText,
      setHasHelpText,
      id,
      labelId,
      feedbackId,
      helpTextId,
      htmlProps,
      getHelpTextProps,
      getErrorMessageProps,
      getRootProps,
      getLabelProps,
      getRequiredIndicatorProps
    };
  }
  /**
   * FormControl provides context such as
   * `isInvalid`, `isDisabled`, and `isRequired` to form elements.
   *
   * This is commonly used in form elements such as `input`,
   * `select`, `textarea`, etc.
   */


  var FormControl = /*#__PURE__*/forwardRef((props, ref) => {
    var styles = useMultiStyleConfig("Form", props);
    var ownProps = omitThemingProps(props);

    var _useFormControlProvid = useFormControlProvider(ownProps),
        {
      getRootProps
    } = _useFormControlProvid,
        context = _objectWithoutPropertiesLoose$8(_useFormControlProvid, ["getRootProps", "htmlProps"]);

    var className = cx("chakra-form-control", props.className);
    var contextValue = React__namespace.useMemo(() => context, [context]);
    return /*#__PURE__*/React__namespace.createElement(FormControlProvider, {
      value: contextValue
    }, /*#__PURE__*/React__namespace.createElement(StylesProvider, {
      value: styles
    }, /*#__PURE__*/React__namespace.createElement(chakra.div, _extends$a({}, getRootProps({}, ref), {
      className: className,
      __css: {
        width: "100%",
        position: "relative"
      }
    }))));
  });

  function _extends$9() {
    _extends$9 = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$9.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose$7(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }
  /**
   * React hook that provides the props that should be spread on to
   * input fields (`input`, `select`, `textarea`, etc.).
   *
   * It provides a convenient way to control a form fields, validation
   * and helper text.
   */

  function useFormControl(props) {
    var _useFormControlProps = useFormControlProps(props),
        {
      isDisabled,
      isInvalid,
      isReadOnly,
      isRequired
    } = _useFormControlProps,
        rest = _objectWithoutPropertiesLoose$7(_useFormControlProps, ["isDisabled", "isInvalid", "isReadOnly", "isRequired"]);

    return _extends$9({}, rest, {
      disabled: isDisabled,
      readOnly: isReadOnly,
      required: isRequired,
      "aria-invalid": ariaAttr(isInvalid),
      "aria-required": ariaAttr(isRequired),
      "aria-readonly": ariaAttr(isReadOnly)
    });
  }
  function useFormControlProps(props) {
    var _ref, _ref2, _ref3;

    var field = useFormControlContext();

    var {
      id,
      disabled,
      readOnly,
      required,
      isRequired,
      isInvalid,
      isReadOnly,
      isDisabled,
      onFocus,
      onBlur
    } = props,
        rest = _objectWithoutPropertiesLoose$7(props, ["id", "disabled", "readOnly", "required", "isRequired", "isInvalid", "isReadOnly", "isDisabled", "onFocus", "onBlur"]);

    var labelIds = []; // Error message must be described first in all scenarios.

    if (field != null && field.hasFeedbackText && field != null && field.isInvalid) {
      labelIds.push(field.feedbackId);
    }

    if (field != null && field.hasHelpText) {
      labelIds.push(field.helpTextId);
    }

    return _extends$9({}, rest, {
      "aria-describedby": labelIds.join(" ") || undefined,
      id: id != null ? id : field == null ? void 0 : field.id,
      isDisabled: (_ref = disabled != null ? disabled : isDisabled) != null ? _ref : field == null ? void 0 : field.isDisabled,
      isReadOnly: (_ref2 = readOnly != null ? readOnly : isReadOnly) != null ? _ref2 : field == null ? void 0 : field.isReadOnly,
      isRequired: (_ref3 = required != null ? required : isRequired) != null ? _ref3 : field == null ? void 0 : field.isRequired,
      isInvalid: isInvalid != null ? isInvalid : field == null ? void 0 : field.isInvalid,
      onFocus: callAllHandlers(field == null ? void 0 : field.onFocus, onFocus),
      onBlur: callAllHandlers(field == null ? void 0 : field.onBlur, onBlur)
    });
  }

  function _extends$8() {
    _extends$8 = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$8.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose$6(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }
  /**
   * Used to enhance the usability of form controls.
   *
   * It is used to inform users as to what information
   * is requested for a form field.
   *
   * ♿️ Accessibility: Every form field should have a form label.
   */

  var FormLabel = /*#__PURE__*/forwardRef((passedProps, ref) => {
    var _field$getLabelProps;

    var styles = useStyleConfig("FormLabel", passedProps);
    var props = omitThemingProps(passedProps);

    var {
      children,
      requiredIndicator = /*#__PURE__*/React__namespace.createElement(RequiredIndicator, null)
    } = props,
        rest = _objectWithoutPropertiesLoose$6(props, ["className", "children", "requiredIndicator"]);

    var field = useFormControlContext();
    var ownProps = (_field$getLabelProps = field == null ? void 0 : field.getLabelProps(rest, ref)) != null ? _field$getLabelProps : _extends$8({
      ref
    }, rest);
    return /*#__PURE__*/React__namespace.createElement(chakra.label, _extends$8({}, ownProps, {
      className: cx("chakra-form__label", props.className),
      __css: _extends$8({
        display: "block",
        textAlign: "start"
      }, styles)
    }), children, field != null && field.isRequired ? requiredIndicator : null);
  });
  /**
   * Used to show a "required" text or an asterisks (*) to indicate that
   * a field is required.
   */


  var RequiredIndicator = /*#__PURE__*/forwardRef((props, ref) => {
    var field = useFormControlContext();
    var styles = useStyles();
    if (!(field != null && field.isRequired)) return null;
    var className = cx("chakra-form__required-indicator", props.className);
    return /*#__PURE__*/React__namespace.createElement(chakra.span, _extends$8({}, field == null ? void 0 : field.getRequiredIndicatorProps(props, ref), {
      __css: styles.requiredIndicator,
      className: className
    }));
  });

  /**
   * Box is the most abstract component on top of which other chakra
   * components are built. It renders a `div` element by default.
   *
   * @see Docs https://chakra-ui.com/box
   */

  var Box = chakra("div");

  function _extends$7() {
    _extends$7 = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$7.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose$5(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }
  /**
   * React component used to create flexbox layouts.
   *
   * It renders a `div` with `display: flex` and
   * comes with helpful style shorthand.
   *
   * @see Docs https://chakra-ui.com/flex
   */

  var Flex = /*#__PURE__*/forwardRef((props, ref) => {
    var {
      direction,
      align,
      justify,
      wrap,
      basis,
      grow,
      shrink
    } = props,
        rest = _objectWithoutPropertiesLoose$5(props, ["direction", "align", "justify", "wrap", "basis", "grow", "shrink"]);

    var styles = {
      display: "flex",
      flexDirection: direction,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap,
      flexBasis: basis,
      flexGrow: grow,
      flexShrink: shrink
    };
    return /*#__PURE__*/React__namespace.createElement(chakra.div, _extends$7({
      ref: ref,
      __css: styles
    }, rest));
  });

  /**
   * If we ever run into SSR issues with this, check this post to find a fix for it:
   * @see https://medium.com/@emmenko/patching-lobotomized-owl-selector-for-emotion-ssr-5a582a3c424c
   */

  var selector = "& > *:not(style) ~ *:not(style)";
  function getStackStyles(options) {
    var {
      spacing,
      direction
    } = options;
    var directionStyles = {
      column: {
        marginTop: spacing,
        marginEnd: 0,
        marginBottom: 0,
        marginStart: 0
      },
      row: {
        marginTop: 0,
        marginEnd: 0,
        marginBottom: 0,
        marginStart: spacing
      },
      "column-reverse": {
        marginTop: 0,
        marginEnd: 0,
        marginBottom: spacing,
        marginStart: 0
      },
      "row-reverse": {
        marginTop: 0,
        marginEnd: spacing,
        marginBottom: 0,
        marginStart: 0
      }
    };
    return {
      flexDirection: direction,
      [selector]: mapResponsive(direction, value => directionStyles[value])
    };
  }
  function getDividerStyles(options) {
    var {
      spacing,
      direction
    } = options;
    var dividerStyles = {
      column: {
        my: spacing,
        mx: 0,
        borderLeftWidth: 0,
        borderBottomWidth: "1px"
      },
      "column-reverse": {
        my: spacing,
        mx: 0,
        borderLeftWidth: 0,
        borderBottomWidth: "1px"
      },
      row: {
        mx: spacing,
        my: 0,
        borderLeftWidth: "1px",
        borderBottomWidth: 0
      },
      "row-reverse": {
        mx: spacing,
        my: 0,
        borderLeftWidth: "1px",
        borderBottomWidth: 0
      }
    };
    return {
      "&": mapResponsive(direction, value => dividerStyles[value])
    };
  }

  function _objectWithoutPropertiesLoose$4(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _extends$6() {
    _extends$6 = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$6.apply(this, arguments);
  }
  var StackItem = props => /*#__PURE__*/React__namespace.createElement(chakra.div, _extends$6({
    className: "chakra-stack__item"
  }, props, {
    __css: _extends$6({
      display: "inline-block",
      flex: "0 0 auto",
      minWidth: 0
    }, props["__css"])
  }));
  /**
   * Stacks help you easily create flexible and automatically distributed layouts
   *
   * You can stack elements in the horizontal or vertical direction,
   * and apply a space or/and divider between each element.
   *
   * It uses `display: flex` internally and renders a `div`.
   *
   * @see Docs https://chakra-ui.com/stack
   *
   */

  var Stack = /*#__PURE__*/forwardRef((props, ref) => {
    var {
      isInline,
      direction: directionProp,
      align,
      justify,
      spacing = "0.5rem",
      wrap,
      children,
      divider,
      className,
      shouldWrapChildren
    } = props,
        rest = _objectWithoutPropertiesLoose$4(props, ["isInline", "direction", "align", "justify", "spacing", "wrap", "children", "divider", "className", "shouldWrapChildren"]);

    var direction = isInline ? "row" : directionProp != null ? directionProp : "column";
    var styles = React__namespace.useMemo(() => getStackStyles({
      direction,
      spacing
    }), [direction, spacing]);
    var dividerStyle = React__namespace.useMemo(() => getDividerStyles({
      spacing,
      direction
    }), [spacing, direction]);
    var hasDivider = !!divider;
    var shouldUseChildren = !shouldWrapChildren && !hasDivider;
    var validChildren = getValidChildren(children);
    var clones = shouldUseChildren ? validChildren : validChildren.map((child, index) => {
      var isLast = index + 1 === validChildren.length;
      var wrappedChild = /*#__PURE__*/React__namespace.createElement(StackItem, {
        key: index
      }, child);

      var _child = shouldWrapChildren ? wrappedChild : child;

      if (!hasDivider) return _child;
      var clonedDivider = /*#__PURE__*/React__namespace.cloneElement(divider, {
        __css: dividerStyle
      });

      var _divider = isLast ? null : clonedDivider;

      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, {
        key: index
      }, _child, _divider);
    });

    var _className = cx("chakra-stack", className);

    return /*#__PURE__*/React__namespace.createElement(chakra.div, _extends$6({
      ref: ref,
      display: "flex",
      alignItems: align,
      justifyContent: justify,
      flexDirection: styles.flexDirection,
      flexWrap: wrap,
      className: _className,
      __css: hasDivider ? {} : {
        [selector]: styles[selector]
      }
    }, rest), clones);
  });

  function _extends$5() {
    _extends$5 = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$5.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose$3(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }
  var SelectField = /*#__PURE__*/forwardRef((props, ref) => {
    var {
      children,
      placeholder,
      className
    } = props,
        rest = _objectWithoutPropertiesLoose$3(props, ["children", "placeholder", "className"]);

    var ownProps = useFormControl(rest);
    return /*#__PURE__*/React__namespace.createElement(chakra.select, _extends$5({}, ownProps, {
      ref: ref,
      className: cx("chakra-select", className)
    }), placeholder && /*#__PURE__*/React__namespace.createElement("option", {
      value: ""
    }, placeholder), children);
  });
  /**
   * React component used to select one item from a list of options.
   */


  var Select = /*#__PURE__*/forwardRef((props, ref) => {
    var styles = useMultiStyleConfig("Select", props);

    var _omitThemingProps = omitThemingProps(props),
        {
      rootProps,
      placeholder,
      icon,
      color,
      height,
      h,
      minH,
      minHeight,
      iconColor,
      iconSize
    } = _omitThemingProps,
        rest = _objectWithoutPropertiesLoose$3(_omitThemingProps, ["rootProps", "placeholder", "icon", "color", "height", "h", "minH", "minHeight", "iconColor", "iconSize", "isFullWidth"]);

    var [layoutProps, otherProps] = split(rest, layoutPropNames);
    var rootStyles = {
      width: "100%",
      height: "fit-content",
      position: "relative",
      color
    };
    var fieldStyles = mergeWith({}, styles.field, {
      paddingEnd: "2rem",
      _focus: {
        zIndex: "unset"
      }
    });
    return /*#__PURE__*/React__namespace.createElement(chakra.div, _extends$5({
      className: "chakra-select__wrapper",
      __css: rootStyles
    }, layoutProps, rootProps), /*#__PURE__*/React__namespace.createElement(SelectField, _extends$5({
      ref: ref,
      height: h != null ? h : height,
      minH: minH != null ? minH : minHeight,
      placeholder: placeholder
    }, otherProps, {
      __css: fieldStyles
    }), props.children), /*#__PURE__*/React__namespace.createElement(SelectIcon, _extends$5({
      "data-disabled": props.isDisabled
    }, (iconColor || color) && {
      color: iconColor || color
    }, {
      __css: styles.icon
    }, iconSize && {
      fontSize: iconSize
    }), icon));
  });

  var DefaultIcon = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$5({
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React__namespace.createElement("path", {
    fill: "currentColor",
    d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
  }));
  var IconWrapper = chakra("div", {
    baseStyle: {
      position: "absolute",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none",
      top: "50%",
      transform: "translateY(-50%)"
    }
  });

  var SelectIcon = props => {
    var {
      children = /*#__PURE__*/React__namespace.createElement(DefaultIcon, null)
    } = props,
        rest = _objectWithoutPropertiesLoose$3(props, ["children"]);

    var clone = /*#__PURE__*/React__namespace.cloneElement(children, {
      role: "presentation",
      className: "chakra-select__icon",
      focusable: false,
      "aria-hidden": true,
      // force icon to adhere to `IconWrapper` styles
      style: {
        width: "1em",
        height: "1em",
        color: "currentColor"
      }
    });
    return /*#__PURE__*/React__namespace.createElement(IconWrapper, _extends$5({}, rest, {
      className: "chakra-select__icon-wrapper"
    }), /*#__PURE__*/React__namespace.isValidElement(children) ? clone : null);
  };

  function _extends$4() {
    _extends$4 = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$4.apply(this, arguments);
  }

  function orient$1(options) {
    var {
      orientation,
      vertical,
      horizontal
    } = options;
    return orientation === "vertical" ? vertical : horizontal;
  }

  function getPartsStyle(options) {
    var {
      orientation,
      trackPercent,
      thumbRect,
      isReversed
    } = options;

    var thumbStyle = _extends$4({
      position: "absolute",
      userSelect: "none",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
      touchAction: "none"
    }, orient$1({
      orientation,
      vertical: {
        bottom: "calc(" + trackPercent + "% - " + thumbRect.height / 2 + "px)"
      },
      horizontal: {
        left: "calc(" + trackPercent + "% - " + thumbRect.width / 2 + "px)"
      }
    }));

    var rootStyle = _extends$4({
      position: "relative",
      touchAction: "none",
      WebkitTapHighlightColor: "rgba(0,0,0,0)",
      userSelect: "none",
      outline: 0
    }, orient$1({
      orientation,
      vertical: {
        paddingLeft: thumbRect.width / 2,
        paddingRight: thumbRect.width / 2
      },
      horizontal: {
        paddingTop: thumbRect.height / 2,
        paddingBottom: thumbRect.height / 2
      }
    }));

    var trackStyle = _extends$4({
      position: "absolute"
    }, orient$1({
      orientation,
      vertical: {
        left: "50%",
        transform: "translateX(-50%)",
        height: "100%"
      },
      horizontal: {
        top: "50%",
        transform: "translateY(-50%)",
        width: "100%"
      }
    }));

    var innerTrackStyle = _extends$4({}, trackStyle, orient$1({
      orientation,
      vertical: isReversed ? {
        height: 100 - trackPercent + "%",
        top: 0
      } : {
        height: trackPercent + "%",
        bottom: 0
      },
      horizontal: isReversed ? {
        width: 100 - trackPercent + "%",
        right: 0
      } : {
        width: trackPercent + "%",
        left: 0
      }
    }));

    return {
      trackStyle,
      innerTrackStyle,
      rootStyle,
      thumbStyle
    };
  }

  function _extends$3() {
    _extends$3 = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$3.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose$2(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }
  /**
   * React hook that implements an accessible range slider.
   *
   * It is an alternative to `<input type="range" />`, and returns
   * prop getters for the component parts
   *
   * @see Docs     https://chakra-ui.com/docs/form/slider
   * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.1/#slider
   */

  function useSlider(props) {
    var _getAriaValueText;

    var {
      min = 0,
      max = 100,
      onChange,
      value: valueProp,
      defaultValue,
      isReversed,
      orientation = "horizontal",
      id: idProp,
      isDisabled,
      isReadOnly,
      onChangeStart: onChangeStartProp,
      onChangeEnd: onChangeEndProp,
      step = 1,
      getAriaValueText: getAriaValueTextProp,
      "aria-valuetext": ariaValueText,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      name,
      focusThumbOnChange = true
    } = props,
        htmlProps = _objectWithoutPropertiesLoose$2(props, ["min", "max", "onChange", "value", "defaultValue", "isReversed", "orientation", "id", "isDisabled", "isReadOnly", "onChangeStart", "onChangeEnd", "step", "getAriaValueText", "aria-valuetext", "aria-label", "aria-labelledby", "name", "focusThumbOnChange"]);

    var onChangeStart = useCallbackRef(onChangeStartProp);
    var onChangeEnd = useCallbackRef(onChangeEndProp);
    var getAriaValueText = useCallbackRef(getAriaValueTextProp);
    /**
     * Enable the slider handle controlled and uncontrolled scenarios
     */

    var [computedValue, setValue] = useControllableState({
      value: valueProp,
      defaultValue: defaultValue != null ? defaultValue : getDefaultValue(min, max),
      onChange
    });
    var [isDragging, setDragging] = useBoolean();
    var prevIsDragging = usePrevious(isDragging);
    var [isFocused, setFocused] = useBoolean();
    var eventSourceRef = React.useRef(null);
    var isInteractive = !(isDisabled || isReadOnly);
    /**
     * Constrain the value because it can't be less than min
     * or greater than max
     */

    var value = clampValue(computedValue, min, max);
    var valueRef = useLatestRef(value);
    var prevRef = React.useRef(valueRef.current);
    var reversedValue = max - value + min;
    var trackValue = isReversed ? reversedValue : value;
    var trackPercent = valueToPercent(trackValue, min, max);
    var isVertical = orientation === "vertical";
    /**
     * Let's keep a reference to the slider track and thumb
     */

    var trackRef = React.useRef(null);
    var thumbRef = React.useRef(null);
    var rootRef = React.useRef(null);
    /**
     * Generate unique ids for component parts
     */

    var [thumbId, trackId] = useIds(idProp, "slider-thumb", "slider-track");
    /**
     * Get relative value of slider from the event by tracking
     * how far you clicked within the track to determine the value
     *
     * @todo - Refactor this later on to use info from pan session
     */

    var getValueFromPointer = React.useCallback(event => {
      var _event$touches$, _event$touches;

      if (!trackRef.current) return;
      eventSourceRef.current = "pointer";
      var trackRect = getBox(trackRef.current).borderBox;
      var {
        clientX,
        clientY
      } = (_event$touches$ = (_event$touches = event.touches) == null ? void 0 : _event$touches[0]) != null ? _event$touches$ : event;
      var diff = isVertical ? trackRect.bottom - clientY : clientX - trackRect.left;
      var length = isVertical ? trackRect.height : trackRect.width;
      var percent = diff / length;

      if (isReversed) {
        percent = 1 - percent;
      }

      var nextValue = percentToValue(percent, min, max);

      if (step) {
        nextValue = parseFloat(roundValueToStep(nextValue, min, step));
      }

      nextValue = clampValue(nextValue, min, max);
      return nextValue;
    }, [isVertical, isReversed, max, min, step]);
    var tenSteps = (max - min) / 10;
    var oneStep = step || (max - min) / 100;
    var constrain = React.useCallback(value => {
      if (!isInteractive) return;
      value = parseFloat(roundValueToStep(value, min, oneStep));
      value = clampValue(value, min, max);
      setValue(value);
    }, [oneStep, max, min, setValue, isInteractive]);
    var actions = React.useMemo(() => ({
      stepUp: function stepUp(step) {
        if (step === void 0) {
          step = oneStep;
        }

        var next = isReversed ? value - step : value + step;
        constrain(next);
      },
      stepDown: function stepDown(step) {
        if (step === void 0) {
          step = oneStep;
        }

        var next = isReversed ? value + step : value - step;
        constrain(next);
      },
      reset: () => constrain(defaultValue || 0),
      stepTo: value => constrain(value)
    }), [constrain, isReversed, value, oneStep, defaultValue]);
    /**
     * Keyboard interaction to ensure users can operate
     * the slider using only their keyboard.
     */

    var onKeyDown = React.useCallback(event => {
      var eventKey = normalizeEventKey(event);
      var keyMap = {
        ArrowRight: () => actions.stepUp(),
        ArrowUp: () => actions.stepUp(),
        ArrowLeft: () => actions.stepDown(),
        ArrowDown: () => actions.stepDown(),
        PageUp: () => actions.stepUp(tenSteps),
        PageDown: () => actions.stepDown(tenSteps),
        Home: () => constrain(min),
        End: () => constrain(max)
      };
      var action = keyMap[eventKey];

      if (action) {
        event.preventDefault();
        event.stopPropagation();
        action(event);
        eventSourceRef.current = "keyboard";
      }
    }, [actions, constrain, max, min, tenSteps]);
    /**
     * ARIA (Optional): To define a human readable representation of the value,
     * we allow users pass aria-valuetext.
     */

    var valueText = (_getAriaValueText = getAriaValueText == null ? void 0 : getAriaValueText(value)) != null ? _getAriaValueText : ariaValueText;
    /**
     * Measure the dimensions of the thumb so
     * we can center it within the track properly
     */

    var thumbBoxModel = useDimensions(thumbRef);
    /**
     * Compute styles for all component parts.
     */

    var {
      thumbStyle,
      rootStyle,
      trackStyle,
      innerTrackStyle
    } = React.useMemo(() => {
      var _thumbBoxModel$border;

      var thumbRect = (_thumbBoxModel$border = thumbBoxModel == null ? void 0 : thumbBoxModel.borderBox) != null ? _thumbBoxModel$border : {
        width: 0,
        height: 0
      };
      return getPartsStyle({
        isReversed,
        orientation,
        thumbRect,
        trackPercent
      });
    }, [isReversed, orientation, thumbBoxModel == null ? void 0 : thumbBoxModel.borderBox, trackPercent]);
    var focusThumb = React.useCallback(() => {
      if (thumbRef.current && focusThumbOnChange) {
        setTimeout(() => focus(thumbRef.current));
      }
    }, [focusThumbOnChange]);
    useUpdateEffect(() => {
      focusThumb();

      if (eventSourceRef.current === "keyboard") {
        onChangeEndProp == null ? void 0 : onChangeEndProp(valueRef.current);
      }
    }, [value, onChangeEndProp]);

    var setValueFromPointer = event => {
      var nextValue = getValueFromPointer(event);

      if (nextValue != null && nextValue !== valueRef.current) {
        setValue(nextValue);
      }
    };

    usePanGesture(rootRef, {
      onPanSessionStart(event) {
        if (!isInteractive) return;
        setValueFromPointer(event);
      },

      onPanSessionEnd() {
        if (!isInteractive) return;

        if (!prevIsDragging && prevRef.current !== valueRef.current) {
          onChangeEnd == null ? void 0 : onChangeEnd(valueRef.current);
          prevRef.current = valueRef.current;
        }
      },

      onPanStart() {
        if (!isInteractive) return;
        setDragging.on();
        onChangeStart == null ? void 0 : onChangeStart(valueRef.current);
      },

      onPan(event) {
        if (!isInteractive) return;
        setValueFromPointer(event);
      },

      onPanEnd() {
        if (!isInteractive) return;
        setDragging.off();
        onChangeEnd == null ? void 0 : onChangeEnd(valueRef.current);
      }

    });
    var getRootProps = React.useCallback(function (props, ref) {
      if (props === void 0) {
        props = {};
      }

      if (ref === void 0) {
        ref = null;
      }

      return _extends$3({}, props, htmlProps, {
        ref: mergeRefs(ref, rootRef),
        tabIndex: -1,
        "aria-disabled": ariaAttr(isDisabled),
        "data-focused": dataAttr(isFocused),
        style: _extends$3({}, props.style, rootStyle)
      });
    }, [htmlProps, isDisabled, isFocused, rootStyle]);
    var getTrackProps = React.useCallback(function (props, ref) {
      if (props === void 0) {
        props = {};
      }

      if (ref === void 0) {
        ref = null;
      }

      return _extends$3({}, props, {
        ref: mergeRefs(ref, trackRef),
        id: trackId,
        "data-disabled": dataAttr(isDisabled),
        style: _extends$3({}, props.style, trackStyle)
      });
    }, [isDisabled, trackId, trackStyle]);
    var getInnerTrackProps = React.useCallback(function (props, ref) {
      if (props === void 0) {
        props = {};
      }

      if (ref === void 0) {
        ref = null;
      }

      return _extends$3({}, props, {
        ref,
        style: _extends$3({}, props.style, innerTrackStyle)
      });
    }, [innerTrackStyle]);
    var getThumbProps = React.useCallback(function (props, ref) {
      if (props === void 0) {
        props = {};
      }

      if (ref === void 0) {
        ref = null;
      }

      return _extends$3({}, props, {
        ref: mergeRefs(ref, thumbRef),
        role: "slider",
        tabIndex: isInteractive ? 0 : undefined,
        id: thumbId,
        "data-active": dataAttr(isDragging),
        "aria-valuetext": valueText,
        "aria-valuemin": min,
        "aria-valuemax": max,
        "aria-valuenow": value,
        "aria-orientation": orientation,
        "aria-disabled": ariaAttr(isDisabled),
        "aria-readonly": ariaAttr(isReadOnly),
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabel ? undefined : ariaLabelledBy,
        style: _extends$3({}, props.style, thumbStyle),
        onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
        onFocus: callAllHandlers(props.onFocus, setFocused.on),
        onBlur: callAllHandlers(props.onBlur, setFocused.off)
      });
    }, [ariaLabel, ariaLabelledBy, isDisabled, isDragging, isReadOnly, isInteractive, max, min, onKeyDown, orientation, setFocused.off, setFocused.on, thumbId, thumbStyle, value, valueText]);
    var getMarkerProps = React.useCallback(function (props, ref) {
      if (props === void 0) {
        props = {};
      }

      if (ref === void 0) {
        ref = null;
      }

      var isInRange = !(props.value < min || props.value > max);
      var isHighlighted = value >= props.value;
      var markerPercent = valueToPercent(props.value, min, max);

      var markerStyle = _extends$3({
        position: "absolute",
        pointerEvents: "none"
      }, orient({
        orientation,
        vertical: {
          bottom: isReversed ? 100 - markerPercent + "%" : markerPercent + "%"
        },
        horizontal: {
          left: isReversed ? 100 - markerPercent + "%" : markerPercent + "%"
        }
      }));

      return _extends$3({}, props, {
        ref,
        role: "presentation",
        "aria-hidden": true,
        "data-disabled": dataAttr(isDisabled),
        "data-invalid": dataAttr(!isInRange),
        "data-highlighted": dataAttr(isHighlighted),
        style: _extends$3({}, props.style, markerStyle)
      });
    }, [isDisabled, isReversed, max, min, orientation, value]);
    var getInputProps = React.useCallback(function (props, ref) {
      if (props === void 0) {
        props = {};
      }

      if (ref === void 0) {
        ref = null;
      }

      return _extends$3({}, props, {
        ref,
        type: "hidden",
        value,
        name
      });
    }, [name, value]);
    return {
      state: {
        value,
        isFocused,
        isDragging
      },
      actions,
      getRootProps,
      getTrackProps,
      getInnerTrackProps,
      getThumbProps,
      getMarkerProps,
      getInputProps
    };
  }

  function orient(options) {
    var {
      orientation,
      vertical,
      horizontal
    } = options;
    return orientation === "vertical" ? vertical : horizontal;
  }
  /**
   * The browser <input type="range" /> calculates
   * the default value of a slider by using mid-point
   * between the min and the max.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
   */


  function getDefaultValue(min, max) {
    return max < min ? min : min + (max - min) / 2;
  }

  function _extends$2() {
    _extends$2 = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$2.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose$1(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }
  var [SliderProvider, useSliderContext] = createContext({
    name: "SliderContext",
    errorMessage: "useSliderContext: `context` is undefined. Seems you forgot to wrap all slider components within <Slider />"
  });
  /**
   * The Slider is used to allow users to make selections from a range of values.
   * It provides context and functionality for all slider components
   *
   * @see Docs     https://chakra-ui.com/docs/form/slider
   * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices/#slider
   */

  var Slider = /*#__PURE__*/forwardRef((props, ref) => {
    var styles = useMultiStyleConfig("Slider", props);
    var ownProps = omitThemingProps(props);

    var _useSlider = useSlider(ownProps),
        {
      getInputProps,
      getRootProps
    } = _useSlider,
        context = _objectWithoutPropertiesLoose$1(_useSlider, ["getInputProps", "getRootProps"]);

    var rootProps = getRootProps();
    var inputProps = getInputProps({}, ref);

    var rootStyles = _extends$2({
      display: "inline-block",
      position: "relative",
      cursor: "pointer"
    }, styles.container);

    return /*#__PURE__*/React__namespace.createElement(SliderProvider, {
      value: context
    }, /*#__PURE__*/React__namespace.createElement(StylesProvider, {
      value: styles
    }, /*#__PURE__*/React__namespace.createElement(chakra.div, _extends$2({}, rootProps, {
      className: "chakra-slider",
      __css: rootStyles
    }), props.children, /*#__PURE__*/React__namespace.createElement("input", inputProps))));
  });
  Slider.defaultProps = {
    orientation: "horizontal"
  };
  /**
   * Slider component that acts as the handle used to select predefined
   * values by dragging its handle along the track
   */


  var SliderThumb = /*#__PURE__*/forwardRef((props, ref) => {
    var {
      getThumbProps
    } = useSliderContext();
    var styles = useStyles();

    var thumbStyles = _extends$2({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      outline: 0
    }, styles.thumb);

    var thumbProps = getThumbProps(props, ref);
    return /*#__PURE__*/React__namespace.createElement(chakra.div, _extends$2({}, thumbProps, {
      className: cx("chakra-slider__thumb", props.className),
      __css: thumbStyles
    }));
  });

  var SliderTrack = /*#__PURE__*/forwardRef((props, ref) => {
    var {
      getTrackProps
    } = useSliderContext();
    var styles = useStyles();

    var trackStyles = _extends$2({
      overflow: "hidden"
    }, styles.track);

    var trackProps = getTrackProps(props, ref);
    return /*#__PURE__*/React__namespace.createElement(chakra.div, _extends$2({}, trackProps, {
      className: cx("chakra-slider__track", props.className),
      __css: trackStyles
    }));
  });

  var SliderFilledTrack = /*#__PURE__*/forwardRef((props, ref) => {
    var {
      getInnerTrackProps
    } = useSliderContext();
    var styles = useStyles();

    var trackStyles = _extends$2({
      width: "inherit",
      height: "inherit"
    }, styles.filledTrack);

    var trackProps = getInnerTrackProps(props, ref);
    return /*#__PURE__*/React__namespace.createElement(chakra.div, _extends$2({}, trackProps, {
      className: "chakra-slider__filled-track",
      __css: trackStyles
    }));
  });

  function _extends$1() {
    _extends$1 = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$1.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }
  var Switch = /*#__PURE__*/forwardRef((props, ref) => {
    var styles = useMultiStyleConfig("Switch", props);

    var _omitThemingProps = omitThemingProps(props),
        {
      spacing = "0.5rem",
      children
    } = _omitThemingProps,
        ownProps = _objectWithoutPropertiesLoose(_omitThemingProps, ["spacing", "children"]);

    var {
      state,
      getInputProps,
      getCheckboxProps,
      getRootProps,
      getLabelProps
    } = useCheckbox(ownProps);
    var containerStyles = React__namespace.useMemo(() => _extends$1({
      display: "inline-block",
      verticalAlign: "middle",
      lineHeight: "normal"
    }, styles.container), [styles.container]);
    var trackStyles = React__namespace.useMemo(() => _extends$1({
      display: "inline-flex",
      flexShrink: 0,
      justifyContent: "flex-start",
      boxSizing: "content-box",
      cursor: "pointer"
    }, styles.track), [styles.track]);
    var labelStyles = React__namespace.useMemo(() => _extends$1({
      userSelect: "none",
      marginStart: spacing
    }, styles.label), [spacing, styles.label]);
    return /*#__PURE__*/React__namespace.createElement(chakra.label, _extends$1({}, getRootProps(), {
      className: cx("chakra-switch", props.className),
      __css: containerStyles
    }), /*#__PURE__*/React__namespace.createElement("input", _extends$1({
      className: "chakra-switch__input"
    }, getInputProps({}, ref))), /*#__PURE__*/React__namespace.createElement(chakra.span, _extends$1({}, getCheckboxProps(), {
      className: "chakra-switch__track",
      __css: trackStyles
    }), /*#__PURE__*/React__namespace.createElement(chakra.span, {
      __css: styles.thumb,
      className: "chakra-switch__thumb",
      "data-checked": dataAttr(state.isChecked),
      "data-hover": dataAttr(state.isHovered)
    })), children && /*#__PURE__*/React__namespace.createElement(chakra.span, _extends$1({
      className: "chakra-switch__label"
    }, getLabelProps(), {
      __css: labelStyles
    }), children));
  });

  function insertWithoutScoping(cache, serialized) {
    if (cache.inserted[serialized.name] === undefined) {
      return cache.insert('', serialized, cache.sheet, true);
    }
  }

  function merge(registered, css, className) {
    var registeredStyles = [];
    var rawClassName = getRegisteredStyles(registered, registeredStyles, className);

    if (registeredStyles.length < 2) {
      return className;
    }

    return rawClassName + css(registeredStyles);
  }

  var createEmotion = function createEmotion(options) {
    var cache = createCache(options); // $FlowFixMe

    cache.sheet.speedy = function (value) {

      this.isSpeedy = value;
    };

    cache.compat = true;

    var css = function css() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var serialized = serializeStyles(args, cache.registered, undefined);
      insertStyles(cache, serialized, false);
      return cache.key + "-" + serialized.name;
    };

    var keyframes = function keyframes() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var serialized = serializeStyles(args, cache.registered);
      var animation = "animation-" + serialized.name;
      insertWithoutScoping(cache, {
        name: serialized.name,
        styles: "@keyframes " + animation + "{" + serialized.styles + "}"
      });
      return animation;
    };

    var injectGlobal = function injectGlobal() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var serialized = serializeStyles(args, cache.registered);
      insertWithoutScoping(cache, serialized);
    };

    var cx = function cx() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return merge(cache.registered, css, classnames(args));
    };

    return {
      css: css,
      cx: cx,
      injectGlobal: injectGlobal,
      keyframes: keyframes,
      hydrate: function hydrate(ids) {
        ids.forEach(function (key) {
          cache.inserted[key] = true;
        });
      },
      flush: function flush() {
        cache.registered = {};
        cache.inserted = {};
        cache.sheet.flush();
      },
      // $FlowFixMe
      sheet: cache.sheet,
      cache: cache,
      getRegisteredStyles: getRegisteredStyles.bind(null, cache.registered),
      merge: merge.bind(null, cache.registered, css)
    };
  };

  var classnames = function classnames(args) {
    var cls = '';

    for (var i = 0; i < args.length; i++) {
      var arg = args[i];
      if (arg == null) continue;
      var toAdd = void 0;

      switch (typeof arg) {
        case 'boolean':
          break;

        case 'object':
          {
            if (Array.isArray(arg)) {
              toAdd = classnames(arg);
            } else {
              toAdd = '';

              for (var k in arg) {
                if (arg[k] && k) {
                  toAdd && (toAdd += ' ');
                  toAdd += k;
                }
              }
            }

            break;
          }

        default:
          {
            toAdd = arg;
          }
      }

      if (toAdd) {
        cls && (cls += ' ');
        cls += toAdd;
      }
    }

    return cls;
  };

  var _createEmotion = createEmotion({
    key: 'css'
  }),
      css = _createEmotion.css;

  /**
   * Prism: Lightweight, robust, elegant syntax highlighting
   * MIT license http://www.opensource.org/licenses/mit-license.php/
   * @author Lea Verou http://lea.verou.me
   */

  /**
   * prism-react-renderer:
   * This file has been modified to remove:
   * - globals and window dependency
   * - worker support
   * - highlightAll and other element dependent methods
   * - _.hooks helpers
   * - UMD/node-specific hacks
   * It has also been run through prettier
   */
  var Prism = function () {
    var uniqueId = 0;
    var _ = {
      util: {
        encode: function (tokens) {
          if (tokens instanceof Token) {
            return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
          } else if (_.util.type(tokens) === "Array") {
            return tokens.map(_.util.encode);
          } else {
            return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
          }
        },
        type: function (o) {
          return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
        },
        objId: function (obj) {
          if (!obj["__id"]) {
            Object.defineProperty(obj, "__id", {
              value: ++uniqueId
            });
          }

          return obj["__id"];
        },
        // Deep clone a language definition (e.g. to extend it)
        clone: function (o, visited) {
          var type = _.util.type(o);

          visited = visited || {};

          switch (type) {
            case "Object":
              if (visited[_.util.objId(o)]) {
                return visited[_.util.objId(o)];
              }

              var clone = {};
              visited[_.util.objId(o)] = clone;

              for (var key in o) {
                if (o.hasOwnProperty(key)) {
                  clone[key] = _.util.clone(o[key], visited);
                }
              }

              return clone;

            case "Array":
              if (visited[_.util.objId(o)]) {
                return visited[_.util.objId(o)];
              }

              var clone = [];
              visited[_.util.objId(o)] = clone;
              o.forEach(function (v, i) {
                clone[i] = _.util.clone(v, visited);
              });
              return clone;
          }

          return o;
        }
      },
      languages: {
        extend: function (id, redef) {
          var lang = _.util.clone(_.languages[id]);

          for (var key in redef) {
            lang[key] = redef[key];
          }

          return lang;
        },

        /**
         * Insert a token before another token in a language literal
         * As this needs to recreate the object (we cannot actually insert before keys in object literals),
         * we cannot just provide an object, we need anobject and a key.
         * @param inside The key (or language id) of the parent
         * @param before The key to insert before. If not provided, the function appends instead.
         * @param insert Object with the key/value pairs to insert
         * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
         */
        insertBefore: function (inside, before, insert, root) {
          root = root || _.languages;
          var grammar = root[inside];

          if (arguments.length == 2) {
            insert = arguments[1];

            for (var newToken in insert) {
              if (insert.hasOwnProperty(newToken)) {
                grammar[newToken] = insert[newToken];
              }
            }

            return grammar;
          }

          var ret = {};

          for (var token in grammar) {
            if (grammar.hasOwnProperty(token)) {
              if (token == before) {
                for (var newToken in insert) {
                  if (insert.hasOwnProperty(newToken)) {
                    ret[newToken] = insert[newToken];
                  }
                }
              }

              ret[token] = grammar[token];
            }
          } // Update references in other language definitions


          _.languages.DFS(_.languages, function (key, value) {
            if (value === root[inside] && key != inside) {
              this[key] = ret;
            }
          });

          return root[inside] = ret;
        },
        // Traverse a language definition with Depth First Search
        DFS: function (o, callback, type, visited) {
          visited = visited || {};

          for (var i in o) {
            if (o.hasOwnProperty(i)) {
              callback.call(o, i, o[i], type || i);

              if (_.util.type(o[i]) === "Object" && !visited[_.util.objId(o[i])]) {
                visited[_.util.objId(o[i])] = true;

                _.languages.DFS(o[i], callback, null, visited);
              } else if (_.util.type(o[i]) === "Array" && !visited[_.util.objId(o[i])]) {
                visited[_.util.objId(o[i])] = true;

                _.languages.DFS(o[i], callback, i, visited);
              }
            }
          }
        }
      },
      plugins: {},
      highlight: function (text, grammar, language) {
        var env = {
          code: text,
          grammar: grammar,
          language: language
        };

        _.hooks.run("before-tokenize", env);

        env.tokens = _.tokenize(env.code, env.grammar);

        _.hooks.run("after-tokenize", env);

        return Token.stringify(_.util.encode(env.tokens), env.language);
      },
      matchGrammar: function (text, strarr, grammar, index, startPos, oneshot, target) {
        var Token = _.Token;

        for (var token in grammar) {
          if (!grammar.hasOwnProperty(token) || !grammar[token]) {
            continue;
          }

          if (token == target) {
            return;
          }

          var patterns = grammar[token];
          patterns = _.util.type(patterns) === "Array" ? patterns : [patterns];

          for (var j = 0; j < patterns.length; ++j) {
            var pattern = patterns[j],
                inside = pattern.inside,
                lookbehind = !!pattern.lookbehind,
                greedy = !!pattern.greedy,
                lookbehindLength = 0,
                alias = pattern.alias;

            if (greedy && !pattern.pattern.global) {
              // Without the global flag, lastIndex won't work
              var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
              pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
            }

            pattern = pattern.pattern || pattern; // Don’t cache length as it changes during the loop

            for (var i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, ++i) {
              var str = strarr[i];

              if (strarr.length > text.length) {
                // Something went terribly wrong, ABORT, ABORT!
                return;
              }

              if (str instanceof Token) {
                continue;
              }

              if (greedy && i != strarr.length - 1) {
                pattern.lastIndex = pos;
                var match = pattern.exec(text);

                if (!match) {
                  break;
                }

                var from = match.index + (lookbehind ? match[1].length : 0),
                    to = match.index + match[0].length,
                    k = i,
                    p = pos;

                for (var len = strarr.length; k < len && (p < to || !strarr[k].type && !strarr[k - 1].greedy); ++k) {
                  p += strarr[k].length; // Move the index i to the element in strarr that is closest to from

                  if (from >= p) {
                    ++i;
                    pos = p;
                  }
                } // If strarr[i] is a Token, then the match starts inside another Token, which is invalid


                if (strarr[i] instanceof Token) {
                  continue;
                } // Number of tokens to delete and replace with the new match


                delNum = k - i;
                str = text.slice(pos, p);
                match.index -= pos;
              } else {
                pattern.lastIndex = 0;
                var match = pattern.exec(str),
                    delNum = 1;
              }

              if (!match) {
                if (oneshot) {
                  break;
                }

                continue;
              }

              if (lookbehind) {
                lookbehindLength = match[1] ? match[1].length : 0;
              }

              var from = match.index + lookbehindLength,
                  match = match[0].slice(lookbehindLength),
                  to = from + match.length,
                  before = str.slice(0, from),
                  after = str.slice(to);
              var args = [i, delNum];

              if (before) {
                ++i;
                pos += before.length;
                args.push(before);
              }

              var wrapped = new Token(token, inside ? _.tokenize(match, inside) : match, alias, match, greedy);
              args.push(wrapped);

              if (after) {
                args.push(after);
              }

              Array.prototype.splice.apply(strarr, args);

              if (delNum != 1) {
                _.matchGrammar(text, strarr, grammar, i, pos, true, token);
              }

              if (oneshot) {
                break;
              }
            }
          }
        }
      },
      hooks: {
        add: function () {},
        run: function (name, env) {}
      },
      tokenize: function (text, grammar, language) {
        var strarr = [text];
        var rest = grammar.rest;

        if (rest) {
          for (var token in rest) {
            grammar[token] = rest[token];
          }

          delete grammar.rest;
        }

        _.matchGrammar(text, strarr, grammar, 0, 0, false);

        return strarr;
      }
    };

    var Token = _.Token = function (type, content, alias, matchedStr, greedy) {
      this.type = type;
      this.content = content;
      this.alias = alias; // Copy of the full string this token was created from

      this.length = (matchedStr || "").length | 0;
      this.greedy = !!greedy;
    };

    Token.stringify = function (o, language, parent) {
      if (typeof o == "string") {
        return o;
      }

      if (_.util.type(o) === "Array") {
        return o.map(function (element) {
          return Token.stringify(element, language, o);
        }).join("");
      }

      var env = {
        type: o.type,
        content: Token.stringify(o.content, language, parent),
        tag: "span",
        classes: ["token", o.type],
        attributes: {},
        language: language,
        parent: parent
      };

      if (o.alias) {
        var aliases = _.util.type(o.alias) === "Array" ? o.alias : [o.alias];
        Array.prototype.push.apply(env.classes, aliases);
      }

      var attributes = Object.keys(env.attributes).map(function (name) {
        return name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
      }).join(" ");
      return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + (attributes ? " " + attributes : "") + ">" + env.content + "</" + env.tag + ">";
    };

    return _;
  }();
  /* This content is auto-generated to include some prismjs language components: */

  /* "prismjs/components/prism-markup" */


  Prism.languages.markup = {
    'comment': /<!--[\s\S]*?-->/,
    'prolog': /<\?[\s\S]+?\?>/,
    'doctype': {
      // https://www.w3.org/TR/xml/#NT-doctypedecl
      pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
      greedy: true,
      inside: {
        'internal-subset': {
          pattern: /(\[)[\s\S]+(?=\]>$)/,
          lookbehind: true,
          greedy: true,
          inside: null // see below

        },
        'string': {
          pattern: /"[^"]*"|'[^']*'/,
          greedy: true
        },
        'punctuation': /^<!|>$|[[\]]/,
        'doctype-tag': /^DOCTYPE/,
        'name': /[^\s<>'"]+/
      }
    },
    'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
    'tag': {
      pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
      greedy: true,
      inside: {
        'tag': {
          pattern: /^<\/?[^\s>\/]+/,
          inside: {
            'punctuation': /^<\/?/,
            'namespace': /^[^\s>\/:]+:/
          }
        },
        'attr-value': {
          pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
          inside: {
            'punctuation': [{
              pattern: /^=/,
              alias: 'attr-equals'
            }, /"|'/]
          }
        },
        'punctuation': /\/?>/,
        'attr-name': {
          pattern: /[^\s>\/]+/,
          inside: {
            'namespace': /^[^\s>\/:]+:/
          }
        }
      }
    },
    'entity': [{
      pattern: /&[\da-z]{1,8};/i,
      alias: 'named-entity'
    }, /&#x?[\da-f]{1,8};/i]
  };
  Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] = Prism.languages.markup['entity'];
  Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup; // Plugin to make entity title show the real entity, idea by Roman Komarov

  Prism.hooks.add('wrap', function (env) {
    if (env.type === 'entity') {
      env.attributes['title'] = env.content.replace(/&amp;/, '&');
    }
  });
  Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
    /**
     * Adds an inlined language to markup.
     *
     * An example of an inlined language is CSS with `<style>` tags.
     *
     * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
     * case insensitive.
     * @param {string} lang The language key.
     * @example
     * addInlined('style', 'css');
     */
    value: function addInlined(tagName, lang) {
      var includedCdataInside = {};
      includedCdataInside['language-' + lang] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: true,
        inside: Prism.languages[lang]
      };
      includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;
      var inside = {
        'included-cdata': {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          inside: includedCdataInside
        }
      };
      inside['language-' + lang] = {
        pattern: /[\s\S]+/,
        inside: Prism.languages[lang]
      };
      var def = {};
      def[tagName] = {
        pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () {
          return tagName;
        }), 'i'),
        lookbehind: true,
        greedy: true,
        inside: inside
      };
      Prism.languages.insertBefore('markup', 'cdata', def);
    }
  });
  Prism.languages.html = Prism.languages.markup;
  Prism.languages.mathml = Prism.languages.markup;
  Prism.languages.svg = Prism.languages.markup;
  Prism.languages.xml = Prism.languages.extend('markup', {});
  Prism.languages.ssml = Prism.languages.xml;
  Prism.languages.atom = Prism.languages.xml;
  Prism.languages.rss = Prism.languages.xml;
  /* "prismjs/components/prism-bash" */

  (function (Prism) {
    // $ set | grep '^[A-Z][^[:space:]]*=' | cut -d= -f1 | tr '\n' '|'
    // + LC_ALL, RANDOM, REPLY, SECONDS.
    // + make sure PS1..4 are here as they are not always set,
    // - some useless things.
    var envVars = '\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b';
    var commandAfterHeredoc = {
      pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
      lookbehind: true,
      alias: 'punctuation',
      // this looks reasonably well in all themes
      inside: null // see below

    };
    var insideString = {
      'bash': commandAfterHeredoc,
      'environment': {
        pattern: RegExp("\\$" + envVars),
        alias: 'constant'
      },
      'variable': [// [0]: Arithmetic Environment
      {
        pattern: /\$?\(\([\s\S]+?\)\)/,
        greedy: true,
        inside: {
          // If there is a $ sign at the beginning highlight $(( and )) as variable
          'variable': [{
            pattern: /(^\$\(\([\s\S]+)\)\)/,
            lookbehind: true
          }, /^\$\(\(/],
          'number': /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
          // Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
          'operator': /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
          // If there is no $ sign at the beginning highlight (( and )) as punctuation
          'punctuation': /\(\(?|\)\)?|,|;/
        }
      }, // [1]: Command Substitution
      {
        pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
        greedy: true,
        inside: {
          'variable': /^\$\(|^`|\)$|`$/
        }
      }, // [2]: Brace expansion
      {
        pattern: /\$\{[^}]+\}/,
        greedy: true,
        inside: {
          'operator': /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
          'punctuation': /[\[\]]/,
          'environment': {
            pattern: RegExp("(\\{)" + envVars),
            lookbehind: true,
            alias: 'constant'
          }
        }
      }, /\$(?:\w+|[#?*!@$])/],
      // Escape sequences from echo and printf's manuals, and escaped quotes.
      'entity': /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/
    };
    Prism.languages.bash = {
      'shebang': {
        pattern: /^#!\s*\/.*/,
        alias: 'important'
      },
      'comment': {
        pattern: /(^|[^"{\\$])#.*/,
        lookbehind: true
      },
      'function-name': [// a) function foo {
      // b) foo() {
      // c) function foo() {
      // but not “foo {”
      {
        // a) and c)
        pattern: /(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,
        lookbehind: true,
        alias: 'function'
      }, {
        // b)
        pattern: /\b\w+(?=\s*\(\s*\)\s*\{)/,
        alias: 'function'
      }],
      // Highlight variable names as variables in for and select beginnings.
      'for-or-select': {
        pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
        alias: 'variable',
        lookbehind: true
      },
      // Highlight variable names as variables in the left-hand part
      // of assignments (“=” and “+=”).
      'assign-left': {
        pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
        inside: {
          'environment': {
            pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + envVars),
            lookbehind: true,
            alias: 'constant'
          }
        },
        alias: 'variable',
        lookbehind: true
      },
      'string': [// Support for Here-documents https://en.wikipedia.org/wiki/Here_document
      {
        pattern: /((?:^|[^<])<<-?\s*)(\w+?)\s[\s\S]*?(?:\r?\n|\r)\2/,
        lookbehind: true,
        greedy: true,
        inside: insideString
      }, // Here-document with quotes around the tag
      // → No expansion (so no “inside”).
      {
        pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
        lookbehind: true,
        greedy: true,
        inside: {
          'bash': commandAfterHeredoc
        }
      }, // “Normal” string
      {
        pattern: /(^|[^\\](?:\\\\)*)(["'])(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|(?!\2)[^\\`$])*\2/,
        lookbehind: true,
        greedy: true,
        inside: insideString
      }],
      'environment': {
        pattern: RegExp("\\$?" + envVars),
        alias: 'constant'
      },
      'variable': insideString.variable,
      'function': {
        pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
        lookbehind: true
      },
      'keyword': {
        pattern: /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
        lookbehind: true
      },
      // https://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
      'builtin': {
        pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
        lookbehind: true,
        // Alias added to make those easier to distinguish from strings.
        alias: 'class-name'
      },
      'boolean': {
        pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,
        lookbehind: true
      },
      'file-descriptor': {
        pattern: /\B&\d\b/,
        alias: 'important'
      },
      'operator': {
        // Lots of redirections here, but not just that.
        pattern: /\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,
        inside: {
          'file-descriptor': {
            pattern: /^\d/,
            alias: 'important'
          }
        }
      },
      'punctuation': /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
      'number': {
        pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
        lookbehind: true
      }
    };
    commandAfterHeredoc.inside = Prism.languages.bash;
    /* Patterns in command substitution. */

    var toBeCopied = ['comment', 'function-name', 'for-or-select', 'assign-left', 'string', 'environment', 'function', 'keyword', 'builtin', 'boolean', 'file-descriptor', 'operator', 'punctuation', 'number'];
    var inside = insideString.variable[1].inside;

    for (var i = 0; i < toBeCopied.length; i++) {
      inside[toBeCopied[i]] = Prism.languages.bash[toBeCopied[i]];
    }

    Prism.languages.shell = Prism.languages.bash;
  })(Prism);
  /* "prismjs/components/prism-clike" */


  Prism.languages.clike = {
    'comment': [{
      pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
      lookbehind: true,
      greedy: true
    }, {
      pattern: /(^|[^\\:])\/\/.*/,
      lookbehind: true,
      greedy: true
    }],
    'string': {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: true
    },
    'class-name': {
      pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
      lookbehind: true,
      inside: {
        'punctuation': /[.\\]/
      }
    },
    'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    'boolean': /\b(?:true|false)\b/,
    'function': /\w+(?=\()/,
    'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    'punctuation': /[{}[\];(),.:]/
  };
  /* "prismjs/components/prism-c" */

  Prism.languages.c = Prism.languages.extend('clike', {
    'comment': {
      pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
      greedy: true
    },
    'class-name': {
      pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
      lookbehind: true
    },
    'keyword': /\b(?:__attribute__|_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
    'function': /[a-z_]\w*(?=\s*\()/i,
    'number': /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
    'operator': />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/
  });
  Prism.languages.insertBefore('c', 'string', {
    'macro': {
      // allow for multiline macro definitions
      // spaces after the # character compile fine with gcc
      pattern: /(^\s*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
      lookbehind: true,
      greedy: true,
      alias: 'property',
      inside: {
        'string': [{
          // highlight the path of the include statement as a string
          pattern: /^(#\s*include\s*)<[^>]+>/,
          lookbehind: true
        }, Prism.languages.c['string']],
        'comment': Prism.languages.c['comment'],
        'macro-name': [{
          pattern: /(^#\s*define\s+)\w+\b(?!\()/i,
          lookbehind: true
        }, {
          pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
          lookbehind: true,
          alias: 'function'
        }],
        // highlight macro directives as keywords
        'directive': {
          pattern: /^(#\s*)[a-z]+/,
          lookbehind: true,
          alias: 'keyword'
        },
        'directive-hash': /^#/,
        'punctuation': /##|\\(?=[\r\n])/,
        'expression': {
          pattern: /\S[\s\S]*/,
          inside: Prism.languages.c
        }
      }
    },
    // highlight predefined macros as constants
    'constant': /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/
  });
  delete Prism.languages.c['boolean'];
  /* "prismjs/components/prism-cpp" */

  (function (Prism) {
    var keyword = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/;
    Prism.languages.cpp = Prism.languages.extend('c', {
      'class-name': [{
        pattern: RegExp(/(\b(?:class|concept|enum|struct|typename)\s+)(?!<keyword>)\w+/.source.replace(/<keyword>/g, function () {
          return keyword.source;
        })),
        lookbehind: true
      }, // This is intended to capture the class name of method implementations like:
      //   void foo::bar() const {}
      // However! The `foo` in the above example could also be a namespace, so we only capture the class name if
      // it starts with an uppercase letter. This approximation should give decent results.
      /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/, // This will capture the class name before destructors like:
      //   Foo::~Foo() {}
      /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i, // This also intends to capture the class name of method implementations but here the class has template
      // parameters, so it can't be a namespace (until C++ adds generic namespaces).
      /\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/],
      'keyword': keyword,
      'number': {
        pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
        greedy: true
      },
      'operator': />>=?|<<=?|->|([-+&|:])\1|[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
      'boolean': /\b(?:true|false)\b/
    });
    Prism.languages.insertBefore('cpp', 'string', {
      'raw-string': {
        pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
        alias: 'string',
        greedy: true
      }
    });
    Prism.languages.insertBefore('cpp', 'class-name', {
      // the base clause is an optional list of parent classes
      // https://en.cppreference.com/w/cpp/language/class
      'base-clause': {
        pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
        lookbehind: true,
        greedy: true,
        inside: Prism.languages.extend('cpp', {})
      }
    });
    Prism.languages.insertBefore('inside', 'operator', {
      // All untokenized words that are not namespaces should be class names
      'class-name': /\b[a-z_]\w*\b(?!\s*::)/i
    }, Prism.languages.cpp['base-clause']);
  })(Prism);
  /* "prismjs/components/prism-css" */


  (function (Prism) {
    var string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
    Prism.languages.css = {
      'comment': /\/\*[\s\S]*?\*\//,
      'atrule': {
        pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
        inside: {
          'rule': /^@[\w-]+/,
          'selector-function-argument': {
            pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
            lookbehind: true,
            alias: 'selector'
          },
          'keyword': {
            pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
            lookbehind: true
          } // See rest below

        }
      },
      'url': {
        // https://drafts.csswg.org/css-values-3/#urls
        pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
        greedy: true,
        inside: {
          'function': /^url/i,
          'punctuation': /^\(|\)$/,
          'string': {
            pattern: RegExp('^' + string.source + '$'),
            alias: 'url'
          }
        }
      },
      'selector': RegExp('[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
      'string': {
        pattern: string,
        greedy: true
      },
      'property': /(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
      'important': /!important\b/i,
      'function': /[-a-z0-9]+(?=\()/i,
      'punctuation': /[(){};:,]/
    };
    Prism.languages.css['atrule'].inside.rest = Prism.languages.css;
    var markup = Prism.languages.markup;

    if (markup) {
      markup.tag.addInlined('style', 'css');
      Prism.languages.insertBefore('inside', 'attr-value', {
        'style-attr': {
          pattern: /(^|["'\s])style\s*=\s*(?:"[^"]*"|'[^']*')/i,
          lookbehind: true,
          inside: {
            'attr-value': {
              pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
              inside: {
                'style': {
                  pattern: /(["'])[\s\S]+(?=["']$)/,
                  lookbehind: true,
                  alias: 'language-css',
                  inside: Prism.languages.css
                },
                'punctuation': [{
                  pattern: /^=/,
                  alias: 'attr-equals'
                }, /"|'/]
              }
            },
            'attr-name': /^style/i
          }
        }
      }, markup.tag);
    }
  })(Prism);
  /* "prismjs/components/prism-css-extras" */


  (function (Prism) {
    var string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
    var selectorInside;
    Prism.languages.css.selector = {
      pattern: Prism.languages.css.selector,
      inside: selectorInside = {
        'pseudo-element': /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
        'pseudo-class': /:[-\w]+/,
        'class': /\.[-\w]+/,
        'id': /#[-\w]+/,
        'attribute': {
          pattern: RegExp('\\[(?:[^[\\]"\']|' + string.source + ')*\\]'),
          greedy: true,
          inside: {
            'punctuation': /^\[|\]$/,
            'case-sensitivity': {
              pattern: /(\s)[si]$/i,
              lookbehind: true,
              alias: 'keyword'
            },
            'namespace': {
              pattern: /^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/,
              lookbehind: true,
              inside: {
                'punctuation': /\|$/
              }
            },
            'attr-name': {
              pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/,
              lookbehind: true
            },
            'attr-value': [string, {
              pattern: /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/,
              lookbehind: true
            }],
            'operator': /[|~*^$]?=/
          }
        },
        'n-th': [{
          pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
          lookbehind: true,
          inside: {
            'number': /[\dn]+/,
            'operator': /[+-]/
          }
        }, {
          pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i,
          lookbehind: true
        }],
        'combinator': />|\+|~|\|\|/,
        // the `tag` token has been existed and removed.
        // because we can't find a perfect tokenize to match it.
        // if you want to add it, please read https://github.com/PrismJS/prism/pull/2373 first.
        'punctuation': /[(),]/
      }
    };
    Prism.languages.css['atrule'].inside['selector-function-argument'].inside = selectorInside;
    Prism.languages.insertBefore('css', 'property', {
      'variable': {
        pattern: /(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i,
        lookbehind: true
      }
    });
    var unit = {
      pattern: /(\b\d+)(?:%|[a-z]+\b)/,
      lookbehind: true
    }; // 123 -123 .123 -.123 12.3 -12.3

    var number = {
      pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/,
      lookbehind: true
    };
    Prism.languages.insertBefore('css', 'function', {
      'operator': {
        pattern: /(\s)[+\-*\/](?=\s)/,
        lookbehind: true
      },
      // CAREFUL!
      // Previewers and Inline color use hexcode and color.
      'hexcode': {
        pattern: /\B#(?:[\da-f]{1,2}){3,4}\b/i,
        alias: 'color'
      },
      'color': [/\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i, {
        pattern: /\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
        inside: {
          'unit': unit,
          'number': number,
          'function': /[\w-]+(?=\()/,
          'punctuation': /[(),]/
        }
      }],
      // it's important that there is no boundary assertion after the hex digits
      'entity': /\\[\da-f]{1,8}/i,
      'unit': unit,
      'number': number
    });
  })(Prism);
  /* "prismjs/components/prism-javascript" */


  Prism.languages.javascript = Prism.languages.extend('clike', {
    'class-name': [Prism.languages.clike['class-name'], {
      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
      lookbehind: true
    }],
    'keyword': [{
      pattern: /((?:^|})\s*)(?:catch|finally)\b/,
      lookbehind: true
    }, {
      pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: true
    }],
    // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
    'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    'number': /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
    'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
  });
  Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;
  Prism.languages.insertBefore('javascript', 'keyword', {
    'regex': {
      pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
      lookbehind: true,
      greedy: true,
      inside: {
        'regex-source': {
          pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
          lookbehind: true,
          alias: 'language-regex',
          inside: Prism.languages.regex
        },
        'regex-flags': /[a-z]+$/,
        'regex-delimiter': /^\/|\/$/
      }
    },
    // This must be declared before keyword because we use "function" inside the look-forward
    'function-variable': {
      pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
      alias: 'function'
    },
    'parameter': [{
      pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
      lookbehind: true,
      inside: Prism.languages.javascript
    }, {
      pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
      inside: Prism.languages.javascript
    }, {
      pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
      lookbehind: true,
      inside: Prism.languages.javascript
    }, {
      pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
      lookbehind: true,
      inside: Prism.languages.javascript
    }],
    'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
  });
  Prism.languages.insertBefore('javascript', 'string', {
    'template-string': {
      pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
      greedy: true,
      inside: {
        'template-punctuation': {
          pattern: /^`|`$/,
          alias: 'string'
        },
        'interpolation': {
          pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
          lookbehind: true,
          inside: {
            'interpolation-punctuation': {
              pattern: /^\${|}$/,
              alias: 'punctuation'
            },
            rest: Prism.languages.javascript
          }
        },
        'string': /[\s\S]+/
      }
    }
  });

  if (Prism.languages.markup) {
    Prism.languages.markup.tag.addInlined('script', 'javascript');
  }

  Prism.languages.js = Prism.languages.javascript;
  /* "prismjs/components/prism-jsx" */

  (function (Prism) {
    var javascript = Prism.util.clone(Prism.languages.javascript);
    Prism.languages.jsx = Prism.languages.extend('markup', javascript);
    Prism.languages.jsx.tag.pattern = /<\/?(?:[\w.:-]+(?:\s+(?:[\w.:$-]+(?:=(?:"(?:\\[^]|[^\\"])*"|'(?:\\[^]|[^\\'])*'|[^\s{'">=]+|\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\}))?|\{\s*\.{3}\s*[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\s*\}))*\s*\/?)?>/i;
    Prism.languages.jsx.tag.inside['tag'].pattern = /^<\/?[^\s>\/]*/i;
    Prism.languages.jsx.tag.inside['attr-value'].pattern = /=(?!\{)(?:"(?:\\[^]|[^\\"])*"|'(?:\\[^]|[^\\'])*'|[^\s'">]+)/i;
    Prism.languages.jsx.tag.inside['tag'].inside['class-name'] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/;
    Prism.languages.insertBefore('inside', 'attr-name', {
      'spread': {
        pattern: /\{\s*\.{3}\s*[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\s*\}/,
        inside: {
          'punctuation': /\.{3}|[{}.]/,
          'attr-value': /\w+/
        }
      }
    }, Prism.languages.jsx.tag);
    Prism.languages.insertBefore('inside', 'attr-value', {
      'script': {
        // Allow for two levels of nesting
        pattern: /=(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\})/i,
        inside: {
          'script-punctuation': {
            pattern: /^=(?={)/,
            alias: 'punctuation'
          },
          rest: Prism.languages.jsx
        },
        'alias': 'language-javascript'
      }
    }, Prism.languages.jsx.tag); // The following will handle plain text inside tags

    var stringifyToken = function (token) {
      if (!token) {
        return '';
      }

      if (typeof token === 'string') {
        return token;
      }

      if (typeof token.content === 'string') {
        return token.content;
      }

      return token.content.map(stringifyToken).join('');
    };

    var walkTokens = function (tokens) {
      var openedTags = [];

      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        var notTagNorBrace = false;

        if (typeof token !== 'string') {
          if (token.type === 'tag' && token.content[0] && token.content[0].type === 'tag') {
            // We found a tag, now find its kind
            if (token.content[0].content[0].content === '</') {
              // Closing tag
              if (openedTags.length > 0 && openedTags[openedTags.length - 1].tagName === stringifyToken(token.content[0].content[1])) {
                // Pop matching opening tag
                openedTags.pop();
              }
            } else {
              if (token.content[token.content.length - 1].content === '/>') ;else {
                // Opening tag
                openedTags.push({
                  tagName: stringifyToken(token.content[0].content[1]),
                  openedBraces: 0
                });
              }
            }
          } else if (openedTags.length > 0 && token.type === 'punctuation' && token.content === '{') {
            // Here we might have entered a JSX context inside a tag
            openedTags[openedTags.length - 1].openedBraces++;
          } else if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces > 0 && token.type === 'punctuation' && token.content === '}') {
            // Here we might have left a JSX context inside a tag
            openedTags[openedTags.length - 1].openedBraces--;
          } else {
            notTagNorBrace = true;
          }
        }

        if (notTagNorBrace || typeof token === 'string') {
          if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces === 0) {
            // Here we are inside a tag, and not inside a JSX context.
            // That's plain text: drop any tokens matched.
            var plainText = stringifyToken(token); // And merge text with adjacent text

            if (i < tokens.length - 1 && (typeof tokens[i + 1] === 'string' || tokens[i + 1].type === 'plain-text')) {
              plainText += stringifyToken(tokens[i + 1]);
              tokens.splice(i + 1, 1);
            }

            if (i > 0 && (typeof tokens[i - 1] === 'string' || tokens[i - 1].type === 'plain-text')) {
              plainText = stringifyToken(tokens[i - 1]) + plainText;
              tokens.splice(i - 1, 1);
              i--;
            }

            tokens[i] = new Prism.Token('plain-text', plainText, null, plainText);
          }
        }

        if (token.content && typeof token.content !== 'string') {
          walkTokens(token.content);
        }
      }
    };

    Prism.hooks.add('after-tokenize', function (env) {
      if (env.language !== 'jsx' && env.language !== 'tsx') {
        return;
      }

      walkTokens(env.tokens);
    });
  })(Prism);
  /* "prismjs/components/prism-js-extras" */


  (function (Prism) {
    Prism.languages.insertBefore('javascript', 'function-variable', {
      'method-variable': {
        pattern: RegExp('(\\.\\s*)' + Prism.languages.javascript['function-variable'].pattern.source),
        lookbehind: true,
        alias: ['function-variable', 'method', 'function', 'property-access']
      }
    });
    Prism.languages.insertBefore('javascript', 'function', {
      'method': {
        pattern: RegExp('(\\.\\s*)' + Prism.languages.javascript['function'].source),
        lookbehind: true,
        alias: ['function', 'property-access']
      }
    });
    Prism.languages.insertBefore('javascript', 'constant', {
      'known-class-name': [{
        // standard built-ins
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
        pattern: /\b(?:(?:(?:Uint|Int)(?:8|16|32)|Uint8Clamped|Float(?:32|64))?Array|ArrayBuffer|BigInt|Boolean|DataView|Date|Error|Function|Intl|JSON|Math|Number|Object|Promise|Proxy|Reflect|RegExp|String|Symbol|(?:Weak)?(?:Set|Map)|WebAssembly)\b/,
        alias: 'class-name'
      }, {
        // errors
        pattern: /\b(?:[A-Z]\w*)Error\b/,
        alias: 'class-name'
      }]
    });
    /**
     * Replaces the `<ID>` placeholder in the given pattern with a pattern for general JS identifiers.
     *
     * @param {string} source
     * @param {string} [flags]
     * @returns {RegExp}
     */

    function withId(source, flags) {
      return RegExp(source.replace(/<ID>/g, function () {
        return /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/.source;
      }), flags);
    }

    Prism.languages.insertBefore('javascript', 'keyword', {
      'imports': {
        // https://tc39.es/ecma262/#sec-imports
        pattern: withId(/(\bimport\b\s*)(?:<ID>(?:\s*,\s*(?:\*\s*as\s+<ID>|\{[^{}]*\}))?|\*\s*as\s+<ID>|\{[^{}]*\})(?=\s*\bfrom\b)/.source),
        lookbehind: true,
        inside: Prism.languages.javascript
      },
      'exports': {
        // https://tc39.es/ecma262/#sec-exports
        pattern: withId(/(\bexport\b\s*)(?:\*(?:\s*as\s+<ID>)?(?=\s*\bfrom\b)|\{[^{}]*\})/.source),
        lookbehind: true,
        inside: Prism.languages.javascript
      }
    });
    Prism.languages.javascript['keyword'].unshift({
      pattern: /\b(?:as|default|export|from|import)\b/,
      alias: 'module'
    }, {
      pattern: /\b(?:await|break|catch|continue|do|else|for|finally|if|return|switch|throw|try|while|yield)\b/,
      alias: 'control-flow'
    }, {
      pattern: /\bnull\b/,
      alias: ['null', 'nil']
    }, {
      pattern: /\bundefined\b/,
      alias: 'nil'
    });
    Prism.languages.insertBefore('javascript', 'operator', {
      'spread': {
        pattern: /\.{3}/,
        alias: 'operator'
      },
      'arrow': {
        pattern: /=>/,
        alias: 'operator'
      }
    });
    Prism.languages.insertBefore('javascript', 'punctuation', {
      'property-access': {
        pattern: withId(/(\.\s*)#?<ID>/.source),
        lookbehind: true
      },
      'maybe-class-name': {
        pattern: /(^|[^$\w\xA0-\uFFFF])[A-Z][$\w\xA0-\uFFFF]+/,
        lookbehind: true
      },
      'dom': {
        // this contains only a few commonly used DOM variables
        pattern: /\b(?:document|location|navigator|performance|(?:local|session)Storage|window)\b/,
        alias: 'variable'
      },
      'console': {
        pattern: /\bconsole(?=\s*\.)/,
        alias: 'class-name'
      }
    }); // add 'maybe-class-name' to tokens which might be a class name

    var maybeClassNameTokens = ['function', 'function-variable', 'method', 'method-variable', 'property-access'];

    for (var i = 0; i < maybeClassNameTokens.length; i++) {
      var token = maybeClassNameTokens[i];
      var value = Prism.languages.javascript[token]; // convert regex to object

      if (Prism.util.type(value) === 'RegExp') {
        value = Prism.languages.javascript[token] = {
          pattern: value
        };
      } // keep in mind that we don't support arrays


      var inside = value.inside || {};
      value.inside = inside;
      inside['maybe-class-name'] = /^[A-Z][\s\S]*/;
    }
  })(Prism);
  /* "prismjs/components/prism-coffeescript" */


  (function (Prism) {
    // Ignore comments starting with { to privilege string interpolation highlighting
    var comment = /#(?!\{).+/,
        interpolation = {
      pattern: /#\{[^}]+\}/,
      alias: 'variable'
    };
    Prism.languages.coffeescript = Prism.languages.extend('javascript', {
      'comment': comment,
      'string': [// Strings are multiline
      {
        pattern: /'(?:\\[\s\S]|[^\\'])*'/,
        greedy: true
      }, {
        // Strings are multiline
        pattern: /"(?:\\[\s\S]|[^\\"])*"/,
        greedy: true,
        inside: {
          'interpolation': interpolation
        }
      }],
      'keyword': /\b(?:and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
      'class-member': {
        pattern: /@(?!\d)\w+/,
        alias: 'variable'
      }
    });
    Prism.languages.insertBefore('coffeescript', 'comment', {
      'multiline-comment': {
        pattern: /###[\s\S]+?###/,
        alias: 'comment'
      },
      // Block regexp can contain comments and interpolation
      'block-regex': {
        pattern: /\/{3}[\s\S]*?\/{3}/,
        alias: 'regex',
        inside: {
          'comment': comment,
          'interpolation': interpolation
        }
      }
    });
    Prism.languages.insertBefore('coffeescript', 'string', {
      'inline-javascript': {
        pattern: /`(?:\\[\s\S]|[^\\`])*`/,
        inside: {
          'delimiter': {
            pattern: /^`|`$/,
            alias: 'punctuation'
          },
          'script': {
            pattern: /[\s\S]+/,
            alias: 'language-javascript',
            inside: Prism.languages.javascript
          }
        }
      },
      // Block strings
      'multiline-string': [{
        pattern: /'''[\s\S]*?'''/,
        greedy: true,
        alias: 'string'
      }, {
        pattern: /"""[\s\S]*?"""/,
        greedy: true,
        alias: 'string',
        inside: {
          interpolation: interpolation
        }
      }]
    });
    Prism.languages.insertBefore('coffeescript', 'keyword', {
      // Object property
      'property': /(?!\d)\w+(?=\s*:(?!:))/
    });
    delete Prism.languages.coffeescript['template-string'];
    Prism.languages.coffee = Prism.languages.coffeescript;
  })(Prism);
  /* "prismjs/components/prism-diff" */


  (function (Prism) {
    Prism.languages.diff = {
      'coord': [// Match all kinds of coord lines (prefixed by "+++", "---" or "***").
      /^(?:\*{3}|-{3}|\+{3}).*$/m, // Match "@@ ... @@" coord lines in unified diff.
      /^@@.*@@$/m, // Match coord lines in normal diff (starts with a number).
      /^\d.*$/m] // deleted, inserted, unchanged, diff

    };
    /**
     * A map from the name of a block to its line prefix.
     *
     * @type {Object<string, string>}
     */

    var PREFIXES = {
      'deleted-sign': '-',
      'deleted-arrow': '<',
      'inserted-sign': '+',
      'inserted-arrow': '>',
      'unchanged': ' ',
      'diff': '!'
    }; // add a token for each prefix

    Object.keys(PREFIXES).forEach(function (name) {
      var prefix = PREFIXES[name];
      var alias = [];

      if (!/^\w+$/.test(name)) {
        // "deleted-sign" -> "deleted"
        alias.push(/\w+/.exec(name)[0]);
      }

      if (name === "diff") {
        alias.push("bold");
      }

      Prism.languages.diff[name] = {
        pattern: RegExp('^(?:[' + prefix + '].*(?:\r\n?|\n|(?![\\s\\S])))+', 'm'),
        alias: alias,
        inside: {
          'line': {
            pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/,
            lookbehind: true
          },
          'prefix': {
            pattern: /[\s\S]/,
            alias: /\w+/.exec(name)[0]
          }
        }
      };
    }); // make prefixes available to Diff plugin

    Object.defineProperty(Prism.languages.diff, 'PREFIXES', {
      value: PREFIXES
    });
  })(Prism);
  /* "prismjs/components/prism-git" */


  Prism.languages.git = {
    /*
     * A simple one line comment like in a git status command
     * For instance:
     * $ git status
     * # On branch infinite-scroll
     * # Your branch and 'origin/sharedBranches/frontendTeam/infinite-scroll' have diverged,
     * # and have 1 and 2 different commits each, respectively.
     * nothing to commit (working directory clean)
     */
    'comment': /^#.*/m,

    /*
     * Regexp to match the changed lines in a git diff output. Check the example below.
     */
    'deleted': /^[-–].*/m,
    'inserted': /^\+.*/m,

    /*
     * a string (double and simple quote)
     */
    'string': /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,

    /*
     * a git command. It starts with a random prompt finishing by a $, then "git" then some other parameters
     * For instance:
     * $ git add file.txt
     */
    'command': {
      pattern: /^.*\$ git .*$/m,
      inside: {
        /*
         * A git command can contain a parameter starting by a single or a double dash followed by a string
         * For instance:
         * $ git diff --cached
         * $ git log -p
         */
        'parameter': /\s--?\w+/m
      }
    },

    /*
     * Coordinates displayed in a git diff command
     * For instance:
     * $ git diff
     * diff --git file.txt file.txt
     * index 6214953..1d54a52 100644
     * --- file.txt
     * +++ file.txt
     * @@ -1 +1,2 @@
     * -Here's my tetx file
     * +Here's my text file
     * +And this is the second line
     */
    'coord': /^@@.*@@$/m,

    /*
     * Match a "commit [SHA1]" line in a git log output.
     * For instance:
     * $ git log
     * commit a11a14ef7e26f2ca62d4b35eac455ce636d0dc09
     * Author: lgiraudel
     * Date:   Mon Feb 17 11:18:34 2014 +0100
     *
     *     Add of a new line
     */
    'commit-sha1': /^commit \w{40}$/m
  };
  /* "prismjs/components/prism-go" */

  Prism.languages.go = Prism.languages.extend('clike', {
    'string': {
      pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/,
      greedy: true
    },
    'keyword': /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
    'boolean': /\b(?:_|iota|nil|true|false)\b/,
    'number': /(?:\b0x[a-f\d]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
    'operator': /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
    'builtin': /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/
  });
  delete Prism.languages.go['class-name'];
  /* "prismjs/components/prism-graphql" */

  Prism.languages.graphql = {
    'comment': /#.*/,
    'description': {
      pattern: /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i,
      greedy: true,
      alias: 'string',
      inside: {
        'language-markdown': {
          pattern: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/,
          lookbehind: true,
          inside: Prism.languages.markdown
        }
      }
    },
    'string': {
      pattern: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/,
      greedy: true
    },
    'number': /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    'boolean': /\b(?:true|false)\b/,
    'variable': /\$[a-z_]\w*/i,
    'directive': {
      pattern: /@[a-z_]\w*/i,
      alias: 'function'
    },
    'attr-name': {
      pattern: /[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
      greedy: true
    },
    'class-name': {
      pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*)[a-zA-Z_]\w*/,
      lookbehind: true
    },
    'fragment': {
      pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
      lookbehind: true,
      alias: 'function'
    },
    'keyword': /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,
    'operator': /[!=|&]|\.{3}/,
    'punctuation': /[!(){}\[\]:=,]/,
    'constant': /\b(?!ID\b)[A-Z][A-Z_\d]*\b/
  };
  /* "prismjs/components/prism-markup-templating" */

  (function (Prism) {
    /**
     * Returns the placeholder for the given language id and index.
     *
     * @param {string} language
     * @param {string|number} index
     * @returns {string}
     */
    function getPlaceholder(language, index) {
      return '___' + language.toUpperCase() + index + '___';
    }

    Object.defineProperties(Prism.languages['markup-templating'] = {}, {
      buildPlaceholders: {
        /**
         * Tokenize all inline templating expressions matching `placeholderPattern`.
         *
         * If `replaceFilter` is provided, only matches of `placeholderPattern` for which `replaceFilter` returns
         * `true` will be replaced.
         *
         * @param {object} env The environment of the `before-tokenize` hook.
         * @param {string} language The language id.
         * @param {RegExp} placeholderPattern The matches of this pattern will be replaced by placeholders.
         * @param {(match: string) => boolean} [replaceFilter]
         */
        value: function (env, language, placeholderPattern, replaceFilter) {
          if (env.language !== language) {
            return;
          }

          var tokenStack = env.tokenStack = [];
          env.code = env.code.replace(placeholderPattern, function (match) {
            if (typeof replaceFilter === 'function' && !replaceFilter(match)) {
              return match;
            }

            var i = tokenStack.length;
            var placeholder; // Check for existing strings

            while (env.code.indexOf(placeholder = getPlaceholder(language, i)) !== -1) {
              ++i;
            } // Create a sparse array


            tokenStack[i] = match;
            return placeholder;
          }); // Switch the grammar to markup

          env.grammar = Prism.languages.markup;
        }
      },
      tokenizePlaceholders: {
        /**
         * Replace placeholders with proper tokens after tokenizing.
         *
         * @param {object} env The environment of the `after-tokenize` hook.
         * @param {string} language The language id.
         */
        value: function (env, language) {
          if (env.language !== language || !env.tokenStack) {
            return;
          } // Switch the grammar back


          env.grammar = Prism.languages[language];
          var j = 0;
          var keys = Object.keys(env.tokenStack);

          function walkTokens(tokens) {
            for (var i = 0; i < tokens.length; i++) {
              // all placeholders are replaced already
              if (j >= keys.length) {
                break;
              }

              var token = tokens[i];

              if (typeof token === 'string' || token.content && typeof token.content === 'string') {
                var k = keys[j];
                var t = env.tokenStack[k];
                var s = typeof token === 'string' ? token : token.content;
                var placeholder = getPlaceholder(language, k);
                var index = s.indexOf(placeholder);

                if (index > -1) {
                  ++j;
                  var before = s.substring(0, index);
                  var middle = new Prism.Token(language, Prism.tokenize(t, env.grammar), 'language-' + language, t);
                  var after = s.substring(index + placeholder.length);
                  var replacement = [];

                  if (before) {
                    replacement.push.apply(replacement, walkTokens([before]));
                  }

                  replacement.push(middle);

                  if (after) {
                    replacement.push.apply(replacement, walkTokens([after]));
                  }

                  if (typeof token === 'string') {
                    tokens.splice.apply(tokens, [i, 1].concat(replacement));
                  } else {
                    token.content = replacement;
                  }
                }
              } else if (token.content
              /* && typeof token.content !== 'string' */
              ) {
                walkTokens(token.content);
              }
            }

            return tokens;
          }

          walkTokens(env.tokens);
        }
      }
    });
  })(Prism);
  /* "prismjs/components/prism-handlebars" */


  (function (Prism) {
    Prism.languages.handlebars = {
      'comment': /\{\{![\s\S]*?\}\}/,
      'delimiter': {
        pattern: /^\{\{\{?|\}\}\}?$/i,
        alias: 'punctuation'
      },
      'string': /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
      'number': /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][+-]?\d+)?/,
      'boolean': /\b(?:true|false)\b/,
      'block': {
        pattern: /^(\s*(?:~\s*)?)[#\/]\S+?(?=\s*(?:~\s*)?$|\s)/i,
        lookbehind: true,
        alias: 'keyword'
      },
      'brackets': {
        pattern: /\[[^\]]+\]/,
        inside: {
          punctuation: /\[|\]/,
          variable: /[\s\S]+/
        }
      },
      'punctuation': /[!"#%&':()*+,.\/;<=>@\[\\\]^`{|}~]/,
      'variable': /[^!"#%&'()*+,\/;<=>@\[\\\]^`{|}~\s]+/
    };
    Prism.hooks.add('before-tokenize', function (env) {
      var handlebarsPattern = /\{\{\{[\s\S]+?\}\}\}|\{\{[\s\S]+?\}\}/g;
      Prism.languages['markup-templating'].buildPlaceholders(env, 'handlebars', handlebarsPattern);
    });
    Prism.hooks.add('after-tokenize', function (env) {
      Prism.languages['markup-templating'].tokenizePlaceholders(env, 'handlebars');
    });
  })(Prism);
  /* "prismjs/components/prism-json" */
  // https://www.json.org/json-en.html


  Prism.languages.json = {
    'property': {
      pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
      greedy: true
    },
    'string': {
      pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
      greedy: true
    },
    'comment': {
      pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
      greedy: true
    },
    'number': /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    'punctuation': /[{}[\],]/,
    'operator': /:/,
    'boolean': /\b(?:true|false)\b/,
    'null': {
      pattern: /\bnull\b/,
      alias: 'keyword'
    }
  };
  Prism.languages.webmanifest = Prism.languages.json;
  /* "prismjs/components/prism-less" */

  /* FIXME :
   :extend() is not handled specifically : its highlighting is buggy.
   Mixin usage must be inside a ruleset to be highlighted.
   At-rules (e.g. import) containing interpolations are buggy.
   Detached rulesets are highlighted as at-rules.
   A comment before a mixin usage prevents the latter to be properly highlighted.
   */

  Prism.languages.less = Prism.languages.extend('css', {
    'comment': [/\/\*[\s\S]*?\*\//, {
      pattern: /(^|[^\\])\/\/.*/,
      lookbehind: true
    }],
    'atrule': {
      pattern: /@[\w-](?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};\s]|\s+(?!\s))*?(?=\s*\{)/,
      inside: {
        'punctuation': /[:()]/
      }
    },
    // selectors and mixins are considered the same
    'selector': {
      pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@\s]|\s+(?!\s))*?(?=\s*\{)/,
      inside: {
        // mixin parameters
        'variable': /@+[\w-]+/
      }
    },
    'property': /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
    'operator': /[+\-*\/]/
  });
  Prism.languages.insertBefore('less', 'property', {
    'variable': [// Variable declaration (the colon must be consumed!)
    {
      pattern: /@[\w-]+\s*:/,
      inside: {
        "punctuation": /:/
      }
    }, // Variable usage
    /@@?[\w-]+/],
    'mixin-usage': {
      pattern: /([{;]\s*)[.#](?!\d)[\w-].*?(?=[(;])/,
      lookbehind: true,
      alias: 'function'
    }
  });
  /* "prismjs/components/prism-makefile" */

  Prism.languages.makefile = {
    'comment': {
      pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,
      lookbehind: true
    },
    'string': {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: true
    },
    // Built-in target names
    'builtin': /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
    // Targets
    'symbol': {
      pattern: /^(?:[^:=\s]|[ \t]+(?![\s:]))+(?=\s*:(?!=))/m,
      inside: {
        'variable': /\$+(?:(?!\$)[^(){}:#=\s]+|(?=[({]))/
      }
    },
    'variable': /\$+(?:(?!\$)[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
    'keyword': [// Directives
    /-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/, // Functions
    {
      pattern: /(\()(?:addsuffix|abspath|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:s|list)?)(?=[ \t])/,
      lookbehind: true
    }],
    'operator': /(?:::|[?:+!])?=|[|@]/,
    'punctuation': /[:;(){}]/
  };
  /* "prismjs/components/prism-markdown" */

  (function (Prism) {
    // Allow only one line break
    var inner = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?!\n|\r\n?))/.source;
    /**
     * This function is intended for the creation of the bold or italic pattern.
     *
     * This also adds a lookbehind group to the given pattern to ensure that the pattern is not backslash-escaped.
     *
     * _Note:_ Keep in mind that this adds a capturing group.
     *
     * @param {string} pattern
     * @returns {RegExp}
     */

    function createInline(pattern) {
      pattern = pattern.replace(/<inner>/g, function () {
        return inner;
      });
      return RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + '(?:' + pattern + ')');
    }

    var tableCell = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source;
    var tableRow = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g, function () {
      return tableCell;
    });
    var tableLine = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;
    Prism.languages.markdown = Prism.languages.extend('markup', {});
    Prism.languages.insertBefore('markdown', 'prolog', {
      'front-matter-block': {
        pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
        lookbehind: true,
        greedy: true,
        inside: {
          'punctuation': /^---|---$/,
          'font-matter': {
            pattern: /\S+(?:\s+\S+)*/,
            alias: ['yaml', 'language-yaml'],
            inside: Prism.languages.yaml
          }
        }
      },
      'blockquote': {
        // > ...
        pattern: /^>(?:[\t ]*>)*/m,
        alias: 'punctuation'
      },
      'table': {
        pattern: RegExp('^' + tableRow + tableLine + '(?:' + tableRow + ')*', 'm'),
        inside: {
          'table-data-rows': {
            pattern: RegExp('^(' + tableRow + tableLine + ')(?:' + tableRow + ')*$'),
            lookbehind: true,
            inside: {
              'table-data': {
                pattern: RegExp(tableCell),
                inside: Prism.languages.markdown
              },
              'punctuation': /\|/
            }
          },
          'table-line': {
            pattern: RegExp('^(' + tableRow + ')' + tableLine + '$'),
            lookbehind: true,
            inside: {
              'punctuation': /\||:?-{3,}:?/
            }
          },
          'table-header-row': {
            pattern: RegExp('^' + tableRow + '$'),
            inside: {
              'table-header': {
                pattern: RegExp(tableCell),
                alias: 'important',
                inside: Prism.languages.markdown
              },
              'punctuation': /\|/
            }
          }
        }
      },
      'code': [{
        // Prefixed by 4 spaces or 1 tab and preceded by an empty line
        pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
        lookbehind: true,
        alias: 'keyword'
      }, {
        // `code`
        // ``code``
        pattern: /``.+?``|`[^`\r\n]+`/,
        alias: 'keyword'
      }, {
        // ```optional language
        // code block
        // ```
        pattern: /^```[\s\S]*?^```$/m,
        greedy: true,
        inside: {
          'code-block': {
            pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
            lookbehind: true
          },
          'code-language': {
            pattern: /^(```).+/,
            lookbehind: true
          },
          'punctuation': /```/
        }
      }],
      'title': [{
        // title 1
        // =======
        // title 2
        // -------
        pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
        alias: 'important',
        inside: {
          punctuation: /==+$|--+$/
        }
      }, {
        // # title 1
        // ###### title 6
        pattern: /(^\s*)#.+/m,
        lookbehind: true,
        alias: 'important',
        inside: {
          punctuation: /^#+|#+$/
        }
      }],
      'hr': {
        // ***
        // ---
        // * * *
        // -----------
        pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
        lookbehind: true,
        alias: 'punctuation'
      },
      'list': {
        // * item
        // + item
        // - item
        // 1. item
        pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
        lookbehind: true,
        alias: 'punctuation'
      },
      'url-reference': {
        // [id]: http://example.com "Optional title"
        // [id]: http://example.com 'Optional title'
        // [id]: http://example.com (Optional title)
        // [id]: <http://example.com> "Optional title"
        pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
        inside: {
          'variable': {
            pattern: /^(!?\[)[^\]]+/,
            lookbehind: true
          },
          'string': /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
          'punctuation': /^[\[\]!:]|[<>]/
        },
        alias: 'url'
      },
      'bold': {
        // **strong**
        // __strong__
        // allow one nested instance of italic text using the same delimiter
        pattern: createInline(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),
        lookbehind: true,
        greedy: true,
        inside: {
          'content': {
            pattern: /(^..)[\s\S]+(?=..$)/,
            lookbehind: true,
            inside: {} // see below

          },
          'punctuation': /\*\*|__/
        }
      },
      'italic': {
        // *em*
        // _em_
        // allow one nested instance of bold text using the same delimiter
        pattern: createInline(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),
        lookbehind: true,
        greedy: true,
        inside: {
          'content': {
            pattern: /(^.)[\s\S]+(?=.$)/,
            lookbehind: true,
            inside: {} // see below

          },
          'punctuation': /[*_]/
        }
      },
      'strike': {
        // ~~strike through~~
        // ~strike~
        pattern: createInline(/(~~?)(?:(?!~)<inner>)+?\2/.source),
        lookbehind: true,
        greedy: true,
        inside: {
          'content': {
            pattern: /(^~~?)[\s\S]+(?=\1$)/,
            lookbehind: true,
            inside: {} // see below

          },
          'punctuation': /~~?/
        }
      },
      'url': {
        // [example](http://example.com "Optional title")
        // [example][id]
        // [example] [id]
        pattern: createInline(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source),
        lookbehind: true,
        greedy: true,
        inside: {
          'operator': /^!/,
          'content': {
            pattern: /(^\[)[^\]]+(?=\])/,
            lookbehind: true,
            inside: {} // see below

          },
          'variable': {
            pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
            lookbehind: true
          },
          'url': {
            pattern: /(^\]\()[^\s)]+/,
            lookbehind: true
          },
          'string': {
            pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
            lookbehind: true
          }
        }
      }
    });
    ['url', 'bold', 'italic', 'strike'].forEach(function (token) {
      ['url', 'bold', 'italic', 'strike'].forEach(function (inside) {
        if (token !== inside) {
          Prism.languages.markdown[token].inside.content.inside[inside] = Prism.languages.markdown[inside];
        }
      });
    });
    Prism.hooks.add('after-tokenize', function (env) {
      if (env.language !== 'markdown' && env.language !== 'md') {
        return;
      }

      function walkTokens(tokens) {
        if (!tokens || typeof tokens === 'string') {
          return;
        }

        for (var i = 0, l = tokens.length; i < l; i++) {
          var token = tokens[i];

          if (token.type !== 'code') {
            walkTokens(token.content);
            continue;
          }
          /*
           * Add the correct `language-xxxx` class to this code block. Keep in mind that the `code-language` token
           * is optional. But the grammar is defined so that there is only one case we have to handle:
           *
           * token.content = [
           *     <span class="punctuation">```</span>,
           *     <span class="code-language">xxxx</span>,
           *     '\n', // exactly one new lines (\r or \n or \r\n)
           *     <span class="code-block">...</span>,
           *     '\n', // exactly one new lines again
           *     <span class="punctuation">```</span>
           * ];
           */


          var codeLang = token.content[1];
          var codeBlock = token.content[3];

          if (codeLang && codeBlock && codeLang.type === 'code-language' && codeBlock.type === 'code-block' && typeof codeLang.content === 'string') {
            // this might be a language that Prism does not support
            // do some replacements to support C++, C#, and F#
            var lang = codeLang.content.replace(/\b#/g, 'sharp').replace(/\b\+\+/g, 'pp'); // only use the first word

            lang = (/[a-z][\w-]*/i.exec(lang) || [''])[0].toLowerCase();
            var alias = 'language-' + lang; // add alias

            if (!codeBlock.alias) {
              codeBlock.alias = [alias];
            } else if (typeof codeBlock.alias === 'string') {
              codeBlock.alias = [codeBlock.alias, alias];
            } else {
              codeBlock.alias.push(alias);
            }
          }
        }
      }

      walkTokens(env.tokens);
    });
    Prism.hooks.add('wrap', function (env) {
      if (env.type !== 'code-block') {
        return;
      }

      var codeLang = '';

      for (var i = 0, l = env.classes.length; i < l; i++) {
        var cls = env.classes[i];
        var match = /language-(.+)/.exec(cls);

        if (match) {
          codeLang = match[1];
          break;
        }
      }

      var grammar = Prism.languages[codeLang];

      if (!grammar) {
        if (codeLang && codeLang !== 'none' && Prism.plugins.autoloader) {
          var id = 'md-' + new Date().valueOf() + '-' + Math.floor(Math.random() * 1e16);
          env.attributes['id'] = id;
          Prism.plugins.autoloader.loadLanguages(codeLang, function () {
            var ele = document.getElementById(id);

            if (ele) {
              ele.innerHTML = Prism.highlight(ele.textContent, Prism.languages[codeLang], codeLang);
            }
          });
        }
      } else {
        // reverse Prism.util.encode
        var code = env.content.replace(/&lt;/g, '<').replace(/&amp;/g, '&');
        env.content = Prism.highlight(code, grammar, codeLang);
      }
    });
    Prism.languages.md = Prism.languages.markdown;
  })(Prism);
  /* "prismjs/components/prism-objectivec" */


  Prism.languages.objectivec = Prism.languages.extend('c', {
    'string': /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|@"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
    'keyword': /\b(?:asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|in|self|super)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
    'operator': /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/
  });
  delete Prism.languages.objectivec['class-name'];
  Prism.languages.objc = Prism.languages.objectivec;
  /* "prismjs/components/prism-ocaml" */

  Prism.languages.ocaml = {
    'comment': /\(\*[\s\S]*?\*\)/,
    'string': [{
      pattern: /"(?:\\.|[^\\\r\n"])*"/,
      greedy: true
    }, {
      pattern: /(['`])(?:\\(?:\d+|x[\da-f]+|.)|(?!\1)[^\\\r\n])\1/i,
      greedy: true
    }],
    'number': /\b(?:0x[\da-f][\da-f_]+|(?:0[bo])?\d[\d_]*(?:\.[\d_]*)?(?:e[+-]?[\d_]+)?)/i,
    'directive': {
      pattern: /\B#\w+/,
      alias: 'important'
    },
    'label': {
      pattern: /\B~\w+/,
      alias: 'function'
    },
    'type-variable': {
      pattern: /\B'\w+/,
      alias: 'function'
    },
    'variant': {
      pattern: /`\w+/,
      alias: 'variable'
    },
    'module': {
      pattern: /\b[A-Z]\w+/,
      alias: 'variable'
    },
    // For the list of keywords and operators,
    // see: http://caml.inria.fr/pub/docs/manual-ocaml/lex.html#sec84
    'keyword': /\b(?:as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|match|method|module|mutable|new|nonrec|object|of|open|private|rec|sig|struct|then|to|try|type|val|value|virtual|when|where|while|with)\b/,
    'boolean': /\b(?:false|true)\b/,
    // Custom operators are allowed
    'operator': /:=|[=<>@^|&+\-*\/$%!?~][!$%&*+\-.\/:<=>?@^|~]*|\b(?:and|asr|land|lor|lsl|lsr|lxor|mod|or)\b/,
    'punctuation': /[(){}\[\]|.,:;]|\b_\b/
  };
  /* "prismjs/components/prism-python" */

  Prism.languages.python = {
    'comment': {
      pattern: /(^|[^\\])#.*/,
      lookbehind: true
    },
    'string-interpolation': {
      pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
      greedy: true,
      inside: {
        'interpolation': {
          // "{" <expression> <optional "!s", "!r", or "!a"> <optional ":" format specifier> "}"
          pattern: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
          lookbehind: true,
          inside: {
            'format-spec': {
              pattern: /(:)[^:(){}]+(?=}$)/,
              lookbehind: true
            },
            'conversion-option': {
              pattern: /![sra](?=[:}]$)/,
              alias: 'punctuation'
            },
            rest: null
          }
        },
        'string': /[\s\S]+/
      }
    },
    'triple-quoted-string': {
      pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]*?\1/i,
      greedy: true,
      alias: 'string'
    },
    'string': {
      pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
      greedy: true
    },
    'function': {
      pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
      lookbehind: true
    },
    'class-name': {
      pattern: /(\bclass\s+)\w+/i,
      lookbehind: true
    },
    'decorator': {
      pattern: /(^\s*)@\w+(?:\.\w+)*/im,
      lookbehind: true,
      alias: ['annotation', 'punctuation'],
      inside: {
        'punctuation': /\./
      }
    },
    'keyword': /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
    'builtin': /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
    'boolean': /\b(?:True|False|None)\b/,
    'number': /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?j?\b/i,
    'operator': /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
    'punctuation': /[{}[\];(),.:]/
  };
  Prism.languages.python['string-interpolation'].inside['interpolation'].inside.rest = Prism.languages.python;
  Prism.languages.py = Prism.languages.python;
  /* "prismjs/components/prism-reason" */

  Prism.languages.reason = Prism.languages.extend('clike', {
    'string': {
      pattern: /"(?:\\(?:\r\n|[\s\S])|[^\\\r\n"])*"/,
      greedy: true
    },
    // 'class-name' must be matched *after* 'constructor' defined below
    'class-name': /\b[A-Z]\w*/,
    'keyword': /\b(?:and|as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|method|module|mutable|new|nonrec|object|of|open|or|private|rec|sig|struct|switch|then|to|try|type|val|virtual|when|while|with)\b/,
    'operator': /\.{3}|:[:=]|\|>|->|=(?:==?|>)?|<=?|>=?|[|^?'#!~`]|[+\-*\/]\.?|\b(?:mod|land|lor|lxor|lsl|lsr|asr)\b/
  });
  Prism.languages.insertBefore('reason', 'class-name', {
    'character': {
      pattern: /'(?:\\x[\da-f]{2}|\\o[0-3][0-7][0-7]|\\\d{3}|\\.|[^'\\\r\n])'/,
      alias: 'string'
    },
    'constructor': {
      // Negative look-ahead prevents from matching things like String.capitalize
      pattern: /\b[A-Z]\w*\b(?!\s*\.)/,
      alias: 'variable'
    },
    'label': {
      pattern: /\b[a-z]\w*(?=::)/,
      alias: 'symbol'
    }
  }); // We can't match functions property, so let's not even try.

  delete Prism.languages.reason.function;
  /* "prismjs/components/prism-sass" */

  (function (Prism) {
    Prism.languages.sass = Prism.languages.extend('css', {
      // Sass comments don't need to be closed, only indented
      'comment': {
        pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t].+)*/m,
        lookbehind: true
      }
    });
    Prism.languages.insertBefore('sass', 'atrule', {
      // We want to consume the whole line
      'atrule-line': {
        // Includes support for = and + shortcuts
        pattern: /^(?:[ \t]*)[@+=].+/m,
        inside: {
          'atrule': /(?:@[\w-]+|[+=])/m
        }
      }
    });
    delete Prism.languages.sass.atrule;
    var variable = /\$[-\w]+|#\{\$[-\w]+\}/;
    var operator = [/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/, {
      pattern: /(\s+)-(?=\s)/,
      lookbehind: true
    }];
    Prism.languages.insertBefore('sass', 'property', {
      // We want to consume the whole line
      'variable-line': {
        pattern: /^[ \t]*\$.+/m,
        inside: {
          'punctuation': /:/,
          'variable': variable,
          'operator': operator
        }
      },
      // We want to consume the whole line
      'property-line': {
        pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s].*)/m,
        inside: {
          'property': [/[^:\s]+(?=\s*:)/, {
            pattern: /(:)[^:\s]+/,
            lookbehind: true
          }],
          'punctuation': /:/,
          'variable': variable,
          'operator': operator,
          'important': Prism.languages.sass.important
        }
      }
    });
    delete Prism.languages.sass.property;
    delete Prism.languages.sass.important; // Now that whole lines for other patterns are consumed,
    // what's left should be selectors

    Prism.languages.insertBefore('sass', 'punctuation', {
      'selector': {
        pattern: /([ \t]*)\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*)*/,
        lookbehind: true
      }
    });
  })(Prism);
  /* "prismjs/components/prism-scss" */


  Prism.languages.scss = Prism.languages.extend('css', {
    'comment': {
      pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
      lookbehind: true
    },
    'atrule': {
      pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
      inside: {
        'rule': /@[\w-]+/ // See rest below

      }
    },
    // url, compassified
    'url': /(?:[-a-z]+-)?url(?=\()/i,
    // CSS selector regex is not appropriate for Sass
    // since there can be lot more things (var, @ directive, nesting..)
    // a selector must start at the end of a property or after a brace (end of other rules or nesting)
    // it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
    // the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
    // can "pass" as a selector- e.g: proper#{$erty})
    // this one was hard to do, so please be careful if you edit this one :)
    'selector': {
      // Initial look-ahead is used to prevent matching of blank selectors
      pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]+))/m,
      inside: {
        'parent': {
          pattern: /&/,
          alias: 'important'
        },
        'placeholder': /%[-\w]+/,
        'variable': /\$[-\w]+|#\{\$[-\w]+\}/
      }
    },
    'property': {
      pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
      inside: {
        'variable': /\$[-\w]+|#\{\$[-\w]+\}/
      }
    }
  });
  Prism.languages.insertBefore('scss', 'atrule', {
    'keyword': [/@(?:if|else(?: if)?|forward|for|each|while|import|use|extend|debug|warn|mixin|include|function|return|content)\b/i, {
      pattern: /( +)(?:from|through)(?= )/,
      lookbehind: true
    }]
  });
  Prism.languages.insertBefore('scss', 'important', {
    // var and interpolated vars
    'variable': /\$[-\w]+|#\{\$[-\w]+\}/
  });
  Prism.languages.insertBefore('scss', 'function', {
    'module-modifier': {
      pattern: /\b(?:as|with|show|hide)\b/i,
      alias: 'keyword'
    },
    'placeholder': {
      pattern: /%[-\w]+/,
      alias: 'selector'
    },
    'statement': {
      pattern: /\B!(?:default|optional)\b/i,
      alias: 'keyword'
    },
    'boolean': /\b(?:true|false)\b/,
    'null': {
      pattern: /\bnull\b/,
      alias: 'keyword'
    },
    'operator': {
      pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
      lookbehind: true
    }
  });
  Prism.languages.scss['atrule'].inside.rest = Prism.languages.scss;
  /* "prismjs/components/prism-sql" */

  Prism.languages.sql = {
    'comment': {
      pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
      lookbehind: true
    },
    'variable': [{
      pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
      greedy: true
    }, /@[\w.$]+/],
    'string': {
      pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
      greedy: true,
      lookbehind: true
    },
    'function': /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
    // Should we highlight user defined functions too?
    'keyword': /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:S|ING)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
    'boolean': /\b(?:TRUE|FALSE|NULL)\b/i,
    'number': /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
    'operator': /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
    'punctuation': /[;[\]()`,.]/
  };
  /* "prismjs/components/prism-stylus" */

  (function (Prism) {
    var unit = {
      pattern: /(\b\d+)(?:%|[a-z]+)/,
      lookbehind: true
    }; // 123 -123 .123 -.123 12.3 -12.3

    var number = {
      pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/,
      lookbehind: true
    };
    var inside = {
      'comment': {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
        lookbehind: true
      },
      'url': {
        pattern: /url\((["']?).*?\1\)/i,
        greedy: true
      },
      'string': {
        pattern: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
        greedy: true
      },
      'interpolation': null,
      // See below
      'func': null,
      // See below
      'important': /\B!(?:important|optional)\b/i,
      'keyword': {
        pattern: /(^|\s+)(?:(?:if|else|for|return|unless)(?=\s+|$)|@[\w-]+)/,
        lookbehind: true
      },
      'hexcode': /#[\da-f]{3,6}/i,
      'color': [/\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i, {
        pattern: /\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
        inside: {
          'unit': unit,
          'number': number,
          'function': /[\w-]+(?=\()/,
          'punctuation': /[(),]/
        }
      }],
      'entity': /\\[\da-f]{1,8}/i,
      'unit': unit,
      'boolean': /\b(?:true|false)\b/,
      'operator': [// We want non-word chars around "-" because it is
      // accepted in property names.
      /~|[+!\/%<>?=]=?|[-:]=|\*[*=]?|\.{2,3}|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/],
      'number': number,
      'punctuation': /[{}()\[\];:,]/
    };
    inside['interpolation'] = {
      pattern: /\{[^\r\n}:]+\}/,
      alias: 'variable',
      inside: {
        'delimiter': {
          pattern: /^{|}$/,
          alias: 'punctuation'
        },
        rest: inside
      }
    };
    inside['func'] = {
      pattern: /[\w-]+\([^)]*\).*/,
      inside: {
        'function': /^[^(]+/,
        rest: inside
      }
    };
    Prism.languages.stylus = {
      'atrule-declaration': {
        pattern: /(^\s*)@.+/m,
        lookbehind: true,
        inside: {
          'atrule': /^@[\w-]+/,
          rest: inside
        }
      },
      'variable-declaration': {
        pattern: /(^[ \t]*)[\w$-]+\s*.?=[ \t]*(?:\{[^{}]*\}|\S.*|$)/m,
        lookbehind: true,
        inside: {
          'variable': /^\S+/,
          rest: inside
        }
      },
      'statement': {
        pattern: /(^[ \t]*)(?:if|else|for|return|unless)[ \t].+/m,
        lookbehind: true,
        inside: {
          'keyword': /^\S+/,
          rest: inside
        }
      },
      // A property/value pair cannot end with a comma or a brace
      // It cannot have indented content unless it ended with a semicolon
      'property-declaration': {
        pattern: /((?:^|\{)([ \t]*))(?:[\w-]|\{[^}\r\n]+\})+(?:\s*:\s*|[ \t]+)(?!\s)[^{\r\n]*(?:;|[^{\r\n,](?=$)(?!(?:\r?\n|\r)(?:\{|\2[ \t]+)))/m,
        lookbehind: true,
        inside: {
          'property': {
            pattern: /^[^\s:]+/,
            inside: {
              'interpolation': inside.interpolation
            }
          },
          rest: inside
        }
      },
      // A selector can contain parentheses only as part of a pseudo-element
      // It can span multiple lines.
      // It must end with a comma or an accolade or have indented content.
      'selector': {
        pattern: /(^[ \t]*)(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\)|(?![\w-]))|\{[^}\r\n]+\})+)(?:(?:\r?\n|\r)(?:\1(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\)|(?![\w-]))|\{[^}\r\n]+\})+)))*(?:,$|\{|(?=(?:\r?\n|\r)(?:\{|\1[ \t]+)))/m,
        lookbehind: true,
        inside: {
          'interpolation': inside.interpolation,
          'comment': inside.comment,
          'punctuation': /[{},]/
        }
      },
      'func': inside.func,
      'string': inside.string,
      'comment': {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
        lookbehind: true,
        greedy: true
      },
      'interpolation': inside.interpolation,
      'punctuation': /[{}()\[\];:.]/
    };
  })(Prism);
  /* "prismjs/components/prism-typescript" */


  (function (Prism) {
    Prism.languages.typescript = Prism.languages.extend('javascript', {
      'class-name': {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
        lookbehind: true,
        greedy: true,
        inside: null // see below

      },
      // From JavaScript Prism keyword list and TypeScript language spec: https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#221-reserved-words
      'keyword': /\b(?:abstract|as|asserts|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|undefined|var|void|while|with|yield)\b/,
      'builtin': /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/
    }); // doesn't work with TS because TS is too complex

    delete Prism.languages.typescript['parameter']; // a version of typescript specifically for highlighting types

    var typeInside = Prism.languages.extend('typescript', {});
    delete typeInside['class-name'];
    Prism.languages.typescript['class-name'].inside = typeInside;
    Prism.languages.insertBefore('typescript', 'function', {
      'generic-function': {
        // e.g. foo<T extends "bar" | "baz">( ...
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
        greedy: true,
        inside: {
          'function': /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
          'generic': {
            pattern: /<[\s\S]+/,
            // everything after the first <
            alias: 'class-name',
            inside: typeInside
          }
        }
      }
    });
    Prism.languages.ts = Prism.languages.typescript;
  })(Prism);
  /* "prismjs/components/prism-tsx" */


  (function (Prism) {
    var typescript = Prism.util.clone(Prism.languages.typescript);
    Prism.languages.tsx = Prism.languages.extend('jsx', typescript); // This will prevent collisions between TSX tags and TS generic types.
    // Idea by https://github.com/karlhorky
    // Discussion: https://github.com/PrismJS/prism/issues/2594#issuecomment-710666928

    var tag = Prism.languages.tsx.tag;
    tag.pattern = RegExp(/(^|[^\w$]|(?=<\/))/.source + '(?:' + tag.pattern.source + ')', tag.pattern.flags);
    tag.lookbehind = true;
  })(Prism);
  /* "prismjs/components/prism-wasm" */


  Prism.languages.wasm = {
    'comment': [/\(;[\s\S]*?;\)/, {
      pattern: /;;.*/,
      greedy: true
    }],
    'string': {
      pattern: /"(?:\\[\s\S]|[^"\\])*"/,
      greedy: true
    },
    'keyword': [{
      pattern: /\b(?:align|offset)=/,
      inside: {
        'operator': /=/
      }
    }, {
      pattern: /\b(?:(?:f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|nearest|neg?|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|store(?:8|16|32)?|sqrt|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))?|memory\.(?:grow|size))\b/,
      inside: {
        'punctuation': /\./
      }
    }, /\b(?:anyfunc|block|br(?:_if|_table)?|call(?:_indirect)?|data|drop|elem|else|end|export|func|get_(?:global|local)|global|if|import|local|loop|memory|module|mut|nop|offset|param|result|return|select|set_(?:global|local)|start|table|tee_local|then|type|unreachable)\b/],
    'variable': /\$[\w!#$%&'*+\-./:<=>?@\\^_`|~]+/i,
    'number': /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/,
    'punctuation': /[()]/
  };
  /* "prismjs/components/prism-yaml" */

  (function (Prism) {
    // https://yaml.org/spec/1.2/spec.html#c-ns-anchor-property
    // https://yaml.org/spec/1.2/spec.html#c-ns-alias-node
    var anchorOrAlias = /[*&][^\s[\]{},]+/; // https://yaml.org/spec/1.2/spec.html#c-ns-tag-property

    var tag = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/; // https://yaml.org/spec/1.2/spec.html#c-ns-properties(n,c)

    var properties = '(?:' + tag.source + '(?:[ \t]+' + anchorOrAlias.source + ')?|' + anchorOrAlias.source + '(?:[ \t]+' + tag.source + ')?)'; // https://yaml.org/spec/1.2/spec.html#ns-plain(n,c)
    // This is a simplified version that doesn't support "#" and multiline keys
    // All these long scarry character classes are simplified versions of YAML's characters

    var plainKey = /(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(/<PLAIN>/g, function () {
      return /[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source;
    });
    var string = /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;
    /**
     *
     * @param {string} value
     * @param {string} [flags]
     * @returns {RegExp}
     */

    function createValuePattern(value, flags) {
      flags = (flags || '').replace(/m/g, '') + 'm'; // add m flag

      var pattern = /([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|]|}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g, function () {
        return properties;
      }).replace(/<<value>>/g, function () {
        return value;
      });
      return RegExp(pattern, flags);
    }

    Prism.languages.yaml = {
      'scalar': {
        pattern: RegExp(/([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(/<<prop>>/g, function () {
          return properties;
        })),
        lookbehind: true,
        alias: 'string'
      },
      'comment': /#.*/,
      'key': {
        pattern: RegExp(/((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source.replace(/<<prop>>/g, function () {
          return properties;
        }).replace(/<<key>>/g, function () {
          return '(?:' + plainKey + '|' + string + ')';
        })),
        lookbehind: true,
        greedy: true,
        alias: 'atrule'
      },
      'directive': {
        pattern: /(^[ \t]*)%.+/m,
        lookbehind: true,
        alias: 'important'
      },
      'datetime': {
        pattern: createValuePattern(/\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.source),
        lookbehind: true,
        alias: 'number'
      },
      'boolean': {
        pattern: createValuePattern(/true|false/.source, 'i'),
        lookbehind: true,
        alias: 'important'
      },
      'null': {
        pattern: createValuePattern(/null|~/.source, 'i'),
        lookbehind: true,
        alias: 'important'
      },
      'string': {
        pattern: createValuePattern(string),
        lookbehind: true,
        greedy: true
      },
      'number': {
        pattern: createValuePattern(/[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.?\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source, 'i'),
        lookbehind: true
      },
      'tag': tag,
      'important': anchorOrAlias,
      'punctuation': /---|[:[\]{}\-,|>?]|\.\.\./
    };
    Prism.languages.yml = Prism.languages.yaml;
  })(Prism);

  // Duotone Dark
  // Author: Simurai, adapted from DuoTone themes for Atom (http://simurai.com/projects/2016/01/01/duotone-themes)
  // Conversion: Bram de Haan (http://atelierbram.github.io/Base2Tone-prism/output/prism/prism-base2tone-evening-dark.css)
  // Generated with Base16 Builder (https://github.com/base16-builder/base16-builder)
  var theme$9 = {
    plain: {
      backgroundColor: "#2a2734",
      color: "#9a86fd"
    },
    styles: [{
      types: ["comment", "prolog", "doctype", "cdata", "punctuation"],
      style: {
        color: "#6c6783"
      }
    }, {
      types: ["namespace"],
      style: {
        opacity: 0.7
      }
    }, {
      types: ["tag", "operator", "number"],
      style: {
        color: "#e09142"
      }
    }, {
      types: ["property", "function"],
      style: {
        color: "#9a86fd"
      }
    }, {
      types: ["tag-id", "selector", "atrule-id"],
      style: {
        color: "#eeebff"
      }
    }, {
      types: ["attr-name"],
      style: {
        color: "#c4b9fe"
      }
    }, {
      types: ["boolean", "string", "entity", "url", "attr-value", "keyword", "control", "directive", "unit", "statement", "regex", "at-rule", "placeholder", "variable"],
      style: {
        color: "#ffcc99"
      }
    }, {
      types: ["deleted"],
      style: {
        textDecorationLine: "line-through"
      }
    }, {
      types: ["inserted"],
      style: {
        textDecorationLine: "underline"
      }
    }, {
      types: ["italic"],
      style: {
        fontStyle: "italic"
      }
    }, {
      types: ["important", "bold"],
      style: {
        fontWeight: "bold"
      }
    }, {
      types: ["important"],
      style: {
        color: "#c4b9fe"
      }
    }]
  };
  var duotoneDark = theme$9;

  var defaultProps = {
    // $FlowFixMe
    Prism: Prism,
    theme: duotoneDark
  };

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  var newlineRe = /\r\n|\r|\n/; // Empty lines need to contain a single empty token, denoted with { empty: true }

  var normalizeEmptyLines = function (line) {
    if (line.length === 0) {
      line.push({
        types: ["plain"],
        content: "\n",
        empty: true
      });
    } else if (line.length === 1 && line[0].content === "") {
      line[0].content = "\n";
      line[0].empty = true;
    }
  };

  var appendTypes = function (types, add) {
    var typesSize = types.length;

    if (typesSize > 0 && types[typesSize - 1] === add) {
      return types;
    }

    return types.concat(add);
  }; // Takes an array of Prism's tokens and groups them by line, turning plain
  // strings into tokens as well. Tokens can become recursive in some cases,
  // which means that their types are concatenated. Plain-string tokens however
  // are always of type "plain".
  // This is not recursive to avoid exceeding the call-stack limit, since it's unclear
  // how nested Prism's tokens can become


  var normalizeTokens = function (tokens) {
    var typeArrStack = [[]];
    var tokenArrStack = [tokens];
    var tokenArrIndexStack = [0];
    var tokenArrSizeStack = [tokens.length];
    var i = 0;
    var stackIndex = 0;
    var currentLine = [];
    var acc = [currentLine];

    while (stackIndex > -1) {
      while ((i = tokenArrIndexStack[stackIndex]++) < tokenArrSizeStack[stackIndex]) {
        var content = void 0;
        var types = typeArrStack[stackIndex];
        var tokenArr = tokenArrStack[stackIndex];
        var token = tokenArr[i]; // Determine content and append type to types if necessary

        if (typeof token === "string") {
          types = stackIndex > 0 ? types : ["plain"];
          content = token;
        } else {
          types = appendTypes(types, token.type);

          if (token.alias) {
            types = appendTypes(types, token.alias);
          }

          content = token.content;
        } // If token.content is an array, increase the stack depth and repeat this while-loop


        if (typeof content !== "string") {
          stackIndex++;
          typeArrStack.push(types);
          tokenArrStack.push(content);
          tokenArrIndexStack.push(0);
          tokenArrSizeStack.push(content.length);
          continue;
        } // Split by newlines


        var splitByNewlines = content.split(newlineRe);
        var newlineCount = splitByNewlines.length;
        currentLine.push({
          types: types,
          content: splitByNewlines[0]
        }); // Create a new line for each string on a new line

        for (var i$1 = 1; i$1 < newlineCount; i$1++) {
          normalizeEmptyLines(currentLine);
          acc.push(currentLine = []);
          currentLine.push({
            types: types,
            content: splitByNewlines[i$1]
          });
        }
      } // Decreate the stack depth


      stackIndex--;
      typeArrStack.pop();
      tokenArrStack.pop();
      tokenArrIndexStack.pop();
      tokenArrSizeStack.pop();
    }

    normalizeEmptyLines(currentLine);
    return acc;
  };

  var themeToDict = function (theme, language) {
    var plain = theme.plain; // $FlowFixMe

    var base = Object.create(null);
    var themeDict = theme.styles.reduce(function (acc, themeEntry) {
      var languages = themeEntry.languages;
      var style = themeEntry.style;

      if (languages && !languages.includes(language)) {
        return acc;
      }

      themeEntry.types.forEach(function (type) {
        // $FlowFixMe
        var accStyle = _extends({}, acc[type], style);

        acc[type] = accStyle;
      });
      return acc;
    }, base); // $FlowFixMe

    themeDict.root = plain; // $FlowFixMe

    themeDict.plain = _extends({}, plain, {
      backgroundColor: null
    });
    return themeDict;
  };

  function objectWithoutProperties(obj, exclude) {
    var target = {};

    for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k];

    return target;
  }

  var Highlight = /*@__PURE__*/function (Component) {
    function Highlight() {
      var this$1$1 = this;
      var args = [],
          len = arguments.length;

      while (len--) args[len] = arguments[len];

      Component.apply(this, args);

      _defineProperty(this, "getThemeDict", function (props) {
        if (this$1$1.themeDict !== undefined && props.theme === this$1$1.prevTheme && props.language === this$1$1.prevLanguage) {
          return this$1$1.themeDict;
        }

        this$1$1.prevTheme = props.theme;
        this$1$1.prevLanguage = props.language;
        var themeDict = props.theme ? themeToDict(props.theme, props.language) : undefined;
        return this$1$1.themeDict = themeDict;
      });

      _defineProperty(this, "getLineProps", function (ref) {
        var key = ref.key;
        var className = ref.className;
        var style = ref.style;
        var rest$1 = objectWithoutProperties(ref, ["key", "className", "style", "line"]);
        var rest = rest$1;

        var output = _extends({}, rest, {
          className: "token-line",
          style: undefined,
          key: undefined
        });

        var themeDict = this$1$1.getThemeDict(this$1$1.props);

        if (themeDict !== undefined) {
          output.style = themeDict.plain;
        }

        if (style !== undefined) {
          output.style = output.style !== undefined ? _extends({}, output.style, style) : style;
        }

        if (key !== undefined) {
          output.key = key;
        }

        if (className) {
          output.className += " " + className;
        }

        return output;
      });

      _defineProperty(this, "getStyleForToken", function (ref) {
        var types = ref.types;
        var empty = ref.empty;
        var typesSize = types.length;
        var themeDict = this$1$1.getThemeDict(this$1$1.props);

        if (themeDict === undefined) {
          return undefined;
        } else if (typesSize === 1 && types[0] === "plain") {
          return empty ? {
            display: "inline-block"
          } : undefined;
        } else if (typesSize === 1 && !empty) {
          return themeDict[types[0]];
        }

        var baseStyle = empty ? {
          display: "inline-block"
        } : {}; // $FlowFixMe

        var typeStyles = types.map(function (type) {
          return themeDict[type];
        });
        return Object.assign.apply(Object, [baseStyle].concat(typeStyles));
      });

      _defineProperty(this, "getTokenProps", function (ref) {
        var key = ref.key;
        var className = ref.className;
        var style = ref.style;
        var token = ref.token;
        var rest$1 = objectWithoutProperties(ref, ["key", "className", "style", "token"]);
        var rest = rest$1;

        var output = _extends({}, rest, {
          className: "token " + token.types.join(" "),
          children: token.content,
          style: this$1$1.getStyleForToken(token),
          key: undefined
        });

        if (style !== undefined) {
          output.style = output.style !== undefined ? _extends({}, output.style, style) : style;
        }

        if (key !== undefined) {
          output.key = key;
        }

        if (className) {
          output.className += " " + className;
        }

        return output;
      });

      _defineProperty(this, "tokenize", function (Prism, code, grammar, language) {
        var env = {
          code: code,
          grammar: grammar,
          language: language,
          tokens: []
        };
        Prism.hooks.run("before-tokenize", env);
        var tokens = env.tokens = Prism.tokenize(env.code, env.grammar, env.language);
        Prism.hooks.run("after-tokenize", env);
        return tokens;
      });
    }

    if (Component) Highlight.__proto__ = Component;
    Highlight.prototype = Object.create(Component && Component.prototype);
    Highlight.prototype.constructor = Highlight;

    Highlight.prototype.render = function render() {
      var ref = this.props;
      var Prism = ref.Prism;
      var language = ref.language;
      var code = ref.code;
      var children = ref.children;
      var themeDict = this.getThemeDict(this.props);
      var grammar = Prism.languages[language];
      var mixedTokens = grammar !== undefined ? this.tokenize(Prism, code, grammar, language) : [code];
      var tokens = normalizeTokens(mixedTokens);
      return children({
        tokens: tokens,
        className: "prism-code language-" + language,
        style: themeDict !== undefined ? themeDict.root : {},
        getLineProps: this.getLineProps,
        getTokenProps: this.getTokenProps
      });
    };

    return Highlight;
  }(React.Component);

  var Highlight$1 = Highlight;

  // Original: https://github.com/dracula/visual-studio-code
  // Converted automatically using ./tools/themeFromVsCode
  var theme$8 = {
    plain: {
      color: "#F8F8F2",
      backgroundColor: "#282A36"
    },
    styles: [{
      types: ["prolog", "constant", "builtin"],
      style: {
        color: "rgb(189, 147, 249)"
      }
    }, {
      types: ["inserted", "function"],
      style: {
        color: "rgb(80, 250, 123)"
      }
    }, {
      types: ["deleted"],
      style: {
        color: "rgb(255, 85, 85)"
      }
    }, {
      types: ["changed"],
      style: {
        color: "rgb(255, 184, 108)"
      }
    }, {
      types: ["punctuation", "symbol"],
      style: {
        color: "rgb(248, 248, 242)"
      }
    }, {
      types: ["string", "char", "tag", "selector"],
      style: {
        color: "rgb(255, 121, 198)"
      }
    }, {
      types: ["keyword", "variable"],
      style: {
        color: "rgb(189, 147, 249)",
        fontStyle: "italic"
      }
    }, {
      types: ["comment"],
      style: {
        color: "rgb(98, 114, 164)"
      }
    }, {
      types: ["attr-name"],
      style: {
        color: "rgb(241, 250, 140)"
      }
    }]
  };
  var dracula = theme$8;

  // Duotone Light
  // Author: Simurai, adapted from DuoTone themes for Atom (http://simurai.com/projects/2016/01/01/duotone-themes)
  // Conversion: Bram de Haan (http://atelierbram.github.io/Base2Tone-prism/output/prism/prism-base2tone-evening-dark.css)
  // Generated with Base16 Builder (https://github.com/base16-builder/base16-builder)
  var theme$7 = {
    plain: {
      backgroundColor: "#faf8f5",
      color: "#728fcb"
    },
    styles: [{
      types: ["comment", "prolog", "doctype", "cdata", "punctuation"],
      style: {
        color: "#b6ad9a"
      }
    }, {
      types: ["namespace"],
      style: {
        opacity: 0.7
      }
    }, {
      types: ["tag", "operator", "number"],
      style: {
        color: "#063289"
      }
    }, {
      types: ["property", "function"],
      style: {
        color: "#b29762"
      }
    }, {
      types: ["tag-id", "selector", "atrule-id"],
      style: {
        color: "#2d2006"
      }
    }, {
      types: ["attr-name"],
      style: {
        color: "#896724"
      }
    }, {
      types: ["boolean", "string", "entity", "url", "attr-value", "keyword", "control", "directive", "unit", "statement", "regex", "at-rule"],
      style: {
        color: "#728fcb"
      }
    }, {
      types: ["placeholder", "variable"],
      style: {
        color: "#93abdc"
      }
    }, {
      types: ["deleted"],
      style: {
        textDecorationLine: "line-through"
      }
    }, {
      types: ["inserted"],
      style: {
        textDecorationLine: "underline"
      }
    }, {
      types: ["italic"],
      style: {
        fontStyle: "italic"
      }
    }, {
      types: ["important", "bold"],
      style: {
        fontWeight: "bold"
      }
    }, {
      types: ["important"],
      style: {
        color: "#896724"
      }
    }]
  };
  var duotoneLight = theme$7;

  // Original: https://raw.githubusercontent.com/PrismJS/prism-themes/master/themes/prism-ghcolors.css
  var theme$6 = {
    plain: {
      color: "#393A34",
      backgroundColor: "#f6f8fa"
    },
    styles: [{
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#999988",
        fontStyle: "italic"
      }
    }, {
      types: ["namespace"],
      style: {
        opacity: 0.7
      }
    }, {
      types: ["string", "attr-value"],
      style: {
        color: "#e3116c"
      }
    }, {
      types: ["punctuation", "operator"],
      style: {
        color: "#393A34"
      }
    }, {
      types: ["entity", "url", "symbol", "number", "boolean", "variable", "constant", "property", "regex", "inserted"],
      style: {
        color: "#36acaa"
      }
    }, {
      types: ["atrule", "keyword", "attr-name", "selector"],
      style: {
        color: "#00a4db"
      }
    }, {
      types: ["function", "deleted", "tag"],
      style: {
        color: "#d73a49"
      }
    }, {
      types: ["function-variable"],
      style: {
        color: "#6f42c1"
      }
    }, {
      types: ["tag", "selector", "keyword"],
      style: {
        color: "#00009f"
      }
    }]
  };
  var github = theme$6;

  // Original: https://github.com/sdras/night-owl-vscode-theme
  // Converted automatically using ./tools/themeFromVsCode
  var theme$5 = {
    plain: {
      color: "#d6deeb",
      backgroundColor: "#011627"
    },
    styles: [{
      types: ["changed"],
      style: {
        color: "rgb(162, 191, 252)",
        fontStyle: "italic"
      }
    }, {
      types: ["deleted"],
      style: {
        color: "rgba(239, 83, 80, 0.56)",
        fontStyle: "italic"
      }
    }, {
      types: ["inserted", "attr-name"],
      style: {
        color: "rgb(173, 219, 103)",
        fontStyle: "italic"
      }
    }, {
      types: ["comment"],
      style: {
        color: "rgb(99, 119, 119)",
        fontStyle: "italic"
      }
    }, {
      types: ["string", "url"],
      style: {
        color: "rgb(173, 219, 103)"
      }
    }, {
      types: ["variable"],
      style: {
        color: "rgb(214, 222, 235)"
      }
    }, {
      types: ["number"],
      style: {
        color: "rgb(247, 140, 108)"
      }
    }, {
      types: ["builtin", "char", "constant", "function"],
      style: {
        color: "rgb(130, 170, 255)"
      }
    }, {
      // This was manually added after the auto-generation
      // so that punctuations are not italicised
      types: ["punctuation"],
      style: {
        color: "rgb(199, 146, 234)"
      }
    }, {
      types: ["selector", "doctype"],
      style: {
        color: "rgb(199, 146, 234)",
        fontStyle: "italic"
      }
    }, {
      types: ["class-name"],
      style: {
        color: "rgb(255, 203, 139)"
      }
    }, {
      types: ["tag", "operator", "keyword"],
      style: {
        color: "rgb(127, 219, 202)"
      }
    }, {
      types: ["boolean"],
      style: {
        color: "rgb(255, 88, 116)"
      }
    }, {
      types: ["property"],
      style: {
        color: "rgb(128, 203, 196)"
      }
    }, {
      types: ["namespace"],
      style: {
        color: "rgb(178, 204, 214)"
      }
    }]
  };
  var nightOwl = theme$5;

  // Original: https://github.com/sdras/night-owl-vscode-theme
  // Converted automatically using ./tools/themeFromVsCode
  var theme$4 = {
    plain: {
      color: "#403f53",
      backgroundColor: "#FBFBFB"
    },
    styles: [{
      types: ["changed"],
      style: {
        color: "rgb(162, 191, 252)",
        fontStyle: "italic"
      }
    }, {
      types: ["deleted"],
      style: {
        color: "rgba(239, 83, 80, 0.56)",
        fontStyle: "italic"
      }
    }, {
      types: ["inserted", "attr-name"],
      style: {
        color: "rgb(72, 118, 214)",
        fontStyle: "italic"
      }
    }, {
      types: ["comment"],
      style: {
        color: "rgb(152, 159, 177)",
        fontStyle: "italic"
      }
    }, {
      types: ["string", "builtin", "char", "constant", "url"],
      style: {
        color: "rgb(72, 118, 214)"
      }
    }, {
      types: ["variable"],
      style: {
        color: "rgb(201, 103, 101)"
      }
    }, {
      types: ["number"],
      style: {
        color: "rgb(170, 9, 130)"
      }
    }, {
      // This was manually added after the auto-generation
      // so that punctuations are not italicised
      types: ["punctuation"],
      style: {
        color: "rgb(153, 76, 195)"
      }
    }, {
      types: ["function", "selector", "doctype"],
      style: {
        color: "rgb(153, 76, 195)",
        fontStyle: "italic"
      }
    }, {
      types: ["class-name"],
      style: {
        color: "rgb(17, 17, 17)"
      }
    }, {
      types: ["tag"],
      style: {
        color: "rgb(153, 76, 195)"
      }
    }, {
      types: ["operator", "property", "keyword", "namespace"],
      style: {
        color: "rgb(12, 150, 155)"
      }
    }, {
      types: ["boolean"],
      style: {
        color: "rgb(188, 84, 84)"
      }
    }]
  };
  var nightOwlLight = theme$4;

  // Oceanic Next
  // Author: Dmitri Voronianski (https://github.com/voronianski)
  // https://github.com/voronianski/oceanic-next-color-scheme
  // Adapted from: https://github.com/reactjs/reactjs.org/blob/428d52b/src/prism-styles.js
  var colors$1 = {
    char: "#D8DEE9",
    comment: "#999999",
    keyword: "#c5a5c5",
    primitive: "#5a9bcf",
    string: "#8dc891",
    variable: "#d7deea",
    boolean: "#ff8b50",
    punctuation: "#5FB3B3",
    tag: "#fc929e",
    function: "#79b6f2",
    className: "#FAC863",
    method: "#6699CC",
    operator: "#fc929e"
  };
  var theme$3 = {
    plain: {
      backgroundColor: "#282c34",
      color: "#ffffff"
    },
    styles: [{
      types: ["attr-name"],
      style: {
        color: colors$1.keyword
      }
    }, {
      types: ["attr-value"],
      style: {
        color: colors$1.string
      }
    }, {
      types: ["comment", "block-comment", "prolog", "doctype", "cdata", "shebang"],
      style: {
        color: colors$1.comment
      }
    }, {
      types: ["property", "number", "function-name", "constant", "symbol", "deleted"],
      style: {
        color: colors$1.primitive
      }
    }, {
      types: ["boolean"],
      style: {
        color: colors$1.boolean
      }
    }, {
      types: ["tag"],
      style: {
        color: colors$1.tag
      }
    }, {
      types: ["string"],
      style: {
        color: colors$1.string
      }
    }, {
      types: ["punctuation"],
      style: {
        color: colors$1.string
      }
    }, {
      types: ["selector", "char", "builtin", "inserted"],
      style: {
        color: colors$1.char
      }
    }, {
      types: ["function"],
      style: {
        color: colors$1.function
      }
    }, {
      types: ["operator", "entity", "url", "variable"],
      style: {
        color: colors$1.variable
      }
    }, {
      types: ["keyword"],
      style: {
        color: colors$1.keyword
      }
    }, {
      types: ["at-rule", "class-name"],
      style: {
        color: colors$1.className
      }
    }, {
      types: ["important"],
      style: {
        fontWeight: "400"
      }
    }, {
      types: ["bold"],
      style: {
        fontWeight: "bold"
      }
    }, {
      types: ["italic"],
      style: {
        fontStyle: "italic"
      }
    }, {
      types: ["namespace"],
      style: {
        opacity: 0.7
      }
    }]
  };
  var oceanicNext = theme$3;

  // Converted automatically using ./tools/themeFromVsCode
  var theme$2 = {
    plain: {
      color: "#bfc7d5",
      backgroundColor: "#292d3e"
    },
    styles: [{
      types: ["comment"],
      style: {
        color: "rgb(105, 112, 152)",
        fontStyle: "italic"
      }
    }, {
      types: ["string", "inserted"],
      style: {
        color: "rgb(195, 232, 141)"
      }
    }, {
      types: ["number"],
      style: {
        color: "rgb(247, 140, 108)"
      }
    }, {
      types: ["builtin", "char", "constant", "function"],
      style: {
        color: "rgb(130, 170, 255)"
      }
    }, {
      types: ["punctuation", "selector"],
      style: {
        color: "rgb(199, 146, 234)"
      }
    }, {
      types: ["variable"],
      style: {
        color: "rgb(191, 199, 213)"
      }
    }, {
      types: ["class-name", "attr-name"],
      style: {
        color: "rgb(255, 203, 107)"
      }
    }, {
      types: ["tag", "deleted"],
      style: {
        color: "rgb(255, 85, 114)"
      }
    }, {
      types: ["operator"],
      style: {
        color: "rgb(137, 221, 255)"
      }
    }, {
      types: ["boolean"],
      style: {
        color: "rgb(255, 88, 116)"
      }
    }, {
      types: ["keyword"],
      style: {
        fontStyle: "italic"
      }
    }, {
      types: ["doctype"],
      style: {
        color: "rgb(199, 146, 234)",
        fontStyle: "italic"
      }
    }, {
      types: ["namespace"],
      style: {
        color: "rgb(178, 204, 214)"
      }
    }, {
      types: ["url"],
      style: {
        color: "rgb(221, 221, 221)"
      }
    }]
  };
  var palenight = theme$2;

  // Shades of Purple
  // Author: Ahmad Awais https://twitter.com/MrAhmadAwais
  // Original: https://github.com/ahmadawais/shades-of-purple-vscode/
  // Converted automatically using ./tools/themeFromVsCode and then customized manually.
  var theme$1 = {
    plain: {
      color: "#9EFEFF",
      backgroundColor: "#2D2A55"
    },
    styles: [{
      types: ["changed"],
      style: {
        color: "rgb(255, 238, 128)"
      }
    }, {
      types: ["deleted"],
      style: {
        color: "rgba(239, 83, 80, 0.56)"
      }
    }, {
      types: ["inserted"],
      style: {
        color: "rgb(173, 219, 103)"
      }
    }, {
      types: ["comment"],
      style: {
        color: "rgb(179, 98, 255)",
        fontStyle: "italic"
      }
    }, {
      types: ["punctuation"],
      style: {
        color: "rgb(255, 255, 255)"
      }
    }, {
      types: ["constant"],
      style: {
        color: "rgb(255, 98, 140)"
      }
    }, {
      types: ["string", "url"],
      style: {
        color: "rgb(165, 255, 144)"
      }
    }, {
      types: ["variable"],
      style: {
        color: "rgb(255, 238, 128)"
      }
    }, {
      types: ["number", "boolean"],
      style: {
        color: "rgb(255, 98, 140)"
      }
    }, {
      types: ["attr-name"],
      style: {
        color: "rgb(255, 180, 84)"
      }
    }, {
      types: ["keyword", "operator", "property", "namespace", "tag", "selector", "doctype"],
      style: {
        color: "rgb(255, 157, 0)"
      }
    }, {
      types: ["builtin", "char", "constant", "function", "class-name"],
      style: {
        color: "rgb(250, 208, 0)"
      }
    }]
  };
  var shadesOfPurple = theme$1;

  // Original: https://github.com/damienstanton/ultramin
  // Converted automatically using ./tools/themeFromVsCode
  var theme = {
    plain: {
      color: "#282a2e",
      backgroundColor: "#ffffff"
    },
    styles: [{
      types: ["comment"],
      style: {
        color: "rgb(197, 200, 198)"
      }
    }, {
      types: ["string", "number", "builtin", "variable"],
      style: {
        color: "rgb(150, 152, 150)"
      }
    }, {
      types: ["class-name", "function", "tag", "attr-name"],
      style: {
        color: "rgb(40, 42, 46)"
      }
    }]
  };
  var ultramin = theme;

  const themes = {
      dracula,
      duotoneDark,
      duotoneLight,
      github,
      nightOwl,
      nightOwlLight,
      oceanicNext,
      palenight,
      shadesOfPurple,
      ultramin,
  };

  /* eslint-disable unicorn/no-unused-properties */
  const exampleCode = `
import something from 'something'

// 获取并设置样式
const setStyle = () => {
  // 获取主题样式并添加
  const themeStyle = GM_getValue(currentTheme)

  if (themeStyle) {
    GM_addStyle(themeStyle)
  } else {
    const themeUrl = \`https://cdn.bootcss.com/highlight.js/9.15.10/styles/\${currentTheme}.min.css\`

    fetchStyleText(themeUrl).then(style => {
      GM_addStyle(style)
      GM_setValue(currentTheme, style)
    })
  }
}

export default something
`.trim();
  const Pre = newStyled.pre `
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;

  & .token-line {
    line-height: 1.3em;
    height: 1.3em;
  }
`;
  const LineNo = newStyled.span `
  display: inline-block;
  width: 2em;
  user-select: none;
  opacity: 0.3;
`;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const Preview = (props) => {
      const { state } = props;
      const fontRef = React.useRef(null);
      React.useEffect(() => {
          const font = fontRef.current;
          if (font) {
              font.style.fontFamily = state.font;
              font.style.fontSize = state.fontSize.toString() + 'px';
          }
      }, [state.font, state.fontSize]);
      return React.useMemo(() => (React__default['default'].createElement(Highlight$1, { ...defaultProps, theme: themes[state.theme], code: exampleCode, language: "jsx" }, ({ className, style, tokens, getLineProps, getTokenProps }) => (React__default['default'].createElement(Pre, { className: className, style: style, ref: fontRef }, tokens.map((line, i) => (React__default['default'].createElement("div", { ...getLineProps({ line, key: i }) },
          React__default['default'].createElement(LineNo, null, i + 1),
          line.map((token, key) => (React__default['default'].createElement("span", { ...getTokenProps({ token, key }) })))))))))), [state]);
  };

  const fonts = [
      'Fira Code',
      'Helvetica',
      'Garamond',
      'Franklin Gothic',
      'Times',
      'Rockwell',
      'Copperplate Gothic',
      'Arial',
      'Verdana',
      'Garamond',
      'Centaur',
      'Granjon',
  ];

  /* eslint-disable @typescript-eslint/no-shadow */
  const Setting = (props) => {
      const { state, dispatch } = props;
      const [isThemeChanges, setIsThemeChanges] = useBoolean(true);
      const [isFontChanges, setIsFontChanges] = useBoolean(true);
      const [isForceThemeBackground, setIsForceThemeBackground] = useBoolean(false);
      const [isGWF, setIsGWF] = useBoolean(true);
      return React.useMemo(() => (React__default['default'].createElement("div", { className: "setting" },
          React__default['default'].createElement(Box, { borderWidth: "1px", borderRadius: "10", padding: "7" },
              React__default['default'].createElement("label", null,
                  "Themes",
                  React__default['default'].createElement(Select, { value: state.theme, borderRadius: "20", onChange: (event) => {
                          if (isThemeChanges) {
                              dispatch({ type: 'update', payload: { theme: event.target.value } });
                          }
                      } }, Object.keys(themes).map((value) => (React__default['default'].createElement("option", { key: value }, value))))),
              React__default['default'].createElement("label", null,
                  "Monospace Fonts",
                  React__default['default'].createElement(Select, { value: state.font, borderRadius: "20", onChange: (event) => {
                          if (isFontChanges) {
                              dispatch({ type: 'update', payload: { font: event.target.value } });
                          }
                      } }, fonts.map((value) => (React__default['default'].createElement("option", { key: value }, value))))),
              React__default['default'].createElement("label", null,
                  "Font Size",
                  React__default['default'].createElement(Slider, { "aria-label": "slider-ex-2", colorScheme: "pink", value: state.fontSize, min: 8, max: 24, onChange: (value) => {
                          if (isFontChanges) {
                              dispatch({
                                  type: 'update',
                                  payload: { fontSize: value },
                              });
                          }
                      } },
                      React__default['default'].createElement(SliderTrack, null,
                          React__default['default'].createElement(SliderFilledTrack, null)),
                      React__default['default'].createElement(SliderThumb, null))),
              React__default['default'].createElement("label", null,
                  "Apply theme changes",
                  React__default['default'].createElement(FormControl, { display: "flex", alignItems: "center" },
                      React__default['default'].createElement(Switch, { id: "apply-theme", isChecked: isThemeChanges, onChange: setIsThemeChanges.toggle }),
                      React__default['default'].createElement(FormLabel, { htmlFor: "apply-theme", ml: "3" }, isThemeChanges ? 'Yes' : 'No'))),
              React__default['default'].createElement("label", null,
                  "Apply font changes",
                  React__default['default'].createElement(FormControl, { display: "flex", alignItems: "center" },
                      React__default['default'].createElement(Switch, { id: "font-change", isChecked: isFontChanges, onChange: setIsFontChanges.toggle }),
                      React__default['default'].createElement(FormLabel, { htmlFor: "font-change", ml: "3" }, isFontChanges ? 'Yes' : 'No'))),
              React__default['default'].createElement("label", null,
                  "Force theme background",
                  React__default['default'].createElement(FormControl, { display: "flex", alignItems: "center" },
                      React__default['default'].createElement(Switch, { id: "force-theme", isChecked: isForceThemeBackground, onChange: setIsForceThemeBackground.toggle }),
                      React__default['default'].createElement(FormLabel, { htmlFor: "force-theme", ml: "3" }, isForceThemeBackground ? 'Yes' : 'No'))),
              React__default['default'].createElement("label", null,
                  "\u94C1\u5E55\u91CD\u91CD\u56F0\u9752\u5E74",
                  React__default['default'].createElement(FormControl, { display: "flex", alignItems: "center" },
                      React__default['default'].createElement(Switch, { id: "gwf", isChecked: isGWF, onChange: setIsGWF.toggle }),
                      React__default['default'].createElement(FormLabel, { htmlFor: "gwf", ml: "3" }, isGWF ? 'Fuck' : 'No thank you!'))),
              React__default['default'].createElement(Stack, { direction: "row", spacing: 4, align: "center", marginTop: "3" },
                  React__default['default'].createElement(Button, { colorScheme: "purple", isDisabled: true, borderRadius: "20" }, "Apply!!!"),
                  React__default['default'].createElement(Button, { colorScheme: "orange", isDisabled: true, borderRadius: "20" }, "closed"),
                  React__default['default'].createElement(Button, { colorScheme: "red", borderRadius: "20", onClick: () => {
                          dispatch({
                              type: 'reset',
                              payload: { theme: 'shadesOfPurple', font: 'Fira Code', fontSize: 16 },
                          });
                      } }, "Reset"))))), [
          dispatch,
          isFontChanges,
          isForceThemeBackground,
          isGWF,
          isThemeChanges,
          setIsFontChanges.toggle,
          setIsForceThemeBackground.toggle,
          setIsGWF.toggle,
          setIsThemeChanges.toggle,
          state.font,
          state.fontSize,
          state.theme,
      ]);
  };

  /**
   * The global provider that must be added to make all Chakra components
   * work correctly
   */
  const ChakraProvider = (props) => {
      const { children, colorModeManager, portalZIndex, resetCSS = true, theme = defaultTheme, } = props;
      return (React__namespace.createElement(ThemeProvider, { theme: theme },
          React__namespace.createElement(ColorModeProvider, { colorModeManager: colorModeManager, options: theme.config },
              resetCSS && React__namespace.createElement(CSSReset$1, null),
              React__namespace.createElement(GlobalStyle, null),
              portalZIndex ? (React__namespace.createElement(PortalManager, { zIndex: portalZIndex }, children)) : (children))));
  };

  const colors = {
      gray: {
          900: '#1a1f36',
          800: '#2a2f45',
          700: '#3c4257',
          600: '#4f566b',
          500: '#697386',
          400: '#8792a2',
          300: '#a3acb9',
          200: '#c1c9d2',
          100: '#e3e8ee',
          50: '#f7fafc',
      },
      blue: {
          900: '#131f41',
          800: '#212d63',
          700: '#2f3d89',
          600: '#3d4eac',
          500: '#556cd6',
          400: '#6c8eef',
          300: '#7dabf8',
          200: '#a4cdfe',
          100: '#d6ecff',
          50: '#f5fbff',
      },
      cyan: {
          900: '#042235',
          800: '#093353',
          700: '#06457a',
          600: '#075996',
          500: '#067ab8',
          400: '#3a97d4',
          300: '#4db7e8',
          200: '#7fd3ed',
          100: '#c4f1f9',
          50: '#edfdfd',
      },
      green: {
          900: '#082429',
          800: '#0b3733',
          700: '#0d4b3b',
          600: '#0e6245',
          500: '#09825d',
          400: '#1ea672',
          300: '#33c27f',
          200: '#85d996',
          100: '#cbf4c9',
          50: '#efffed',
      },
      orange: {
          900: '#420e11',
          800: '#5d161b',
          700: '#7e1e23',
          600: '#9e2f28',
          500: '#c44c34',
          400: '#e56f4a',
          300: '#f5925e',
          200: '#f8b886',
          100: '#fee3c0',
          50: '#fffaee',
      },
      purple: {
          900: '#2d0f55',
          800: '#401d6a',
          700: '#5b2b80',
          600: '#7b3997',
          500: '#a450b5',
          400: '#c96ed0',
          300: '#e28ddc',
          200: '#f0b4e4',
          100: '#fce0f6',
          50: '#fff8fe',
      },
      red: {
          900: '#420828',
          800: '#5e1039',
          700: '#80143f',
          600: '#a41c4e',
          500: '#cd3d64',
          400: '#ed5f74',
          300: '#fa8389',
          200: '#fbb5b2',
          100: '#fde2dd',
          50: '#fff8f5',
      },
      yellow: {
          900: '#3a1607',
          800: '#571f0d',
          700: '#762b0b',
          600: '#983705',
          500: '#bb5504',
          400: '#d97917',
          300: '#e5993e',
          200: '#efc078',
          100: '#f8e5b9',
          50: '#fcf9e9',
      },
      violet: {
          900: '#1f184e',
          800: '#352465',
          700: '#4b3480',
          600: '#61469b',
          500: '#8260c3',
          400: '#9c82db',
          300: '#b0a1e1',
          200: '#c7c2ea',
          100: '#e6e6fc',
          50: '#f8f9fe',
      },
  };

  const Sidebar = (props) => {
      const { left, right } = props;
      return React.useMemo(() => (React__default['default'].createElement(Flex, { sx: {
              flexWrap: 'wrap',
          } },
          React__default['default'].createElement(Box, { sx: {
                  p: 3,
                  flexGrow: 1,
                  flexBasis: 256,
              } }, left()),
          React__default['default'].createElement(Box, { sx: {
                  p: 3,
                  flexGrow: 9999,
                  flexBasis: 0,
                  minWidth: 300,
              } }, right()))), [left, right]);
  };

  /** @see https://github.com/facebook/react/pull/15894#issuecomment-549687672 */
  const create = () => {
      const parasitifer = document.createElement('div');
      const root = parasitifer.attachShadow({ mode: 'open' });
      const html = document.createElement('html');
      const head = document.createElement('head');
      const body = document.createElement('body');
      const main = document.createElement('main');
      body.append(main);
      html.append(head);
      html.append(body);
      root.append(html);
      return {
          parasitifer,
          root,
          html,
          head,
          body,
          main,
      };
  };
  const mount = (position, element) => {
      if (position === 'first') {
          const first = document.body.firstChild;
          document.body.insertBefore(element, first);
      }
      else {
          document.body.append(element);
      }
  };

  /* eslint-disable react/button-has-type */
  const initialState = {
      theme: 'shadesOfPurple',
      font: 'Fira Code',
      fontSize: 16,
  };
  const reducer = (state, action) => {
      // eslint-disable-next-line default-case
      switch (action.type) {
          case 'reset':
              return initialState;
          case 'update':
              return {
                  ...state,
                  ...action.payload,
              };
      }
  };
  const App = () => {
      const [state, dispatch] = React.useReducer(reducer, initialState);
      return React.useMemo(() => (React__default['default'].createElement(Sidebar, { left: () => {
              return (React__default['default'].createElement(React__default['default'].Fragment, null,
                  React__default['default'].createElement(Button, { colorScheme: "pink", onClick: () => {
                          createApp().hide();
                      } }, "hello word"),
                  React__default['default'].createElement(Setting, { ...{ state, dispatch } })));
          }, right: () => {
              return React__default['default'].createElement(Preview, { ...{ state, dispatch } });
          } })), [dispatch, state]);
  };
  const _createApp = () => {
      // extendTheme 方法用于在默认主题对象的基础上进行扩展
      const stripe = extendTheme({
          colors: { ...colors },
      });
      const { head, main, parasitifer } = create();
      parasitifer.classList.add(css `
      display: none;
      position: fixed;
      top: 0;
      bottom: 0;
      z-index: 9999;
      width: 100vw;
      height: 100vh;
      font-size: 16px;
      background-color: #fff;
    `);
      const show = () => {
          parasitifer.style.display = 'block';
      };
      const hide = () => {
          parasitifer.style.display = 'none';
      };
      mount('last', parasitifer);
      /** @see https://emotion.sh/docs/@emotion/cache#createcache */
      const cacheEmotionForShadowDom = createCache({
          key: 'userscript-shadow-dom',
          container: head,
      });
      ReactDOM__default['default'].render(React__default['default'].createElement(CacheProvider, { value: cacheEmotionForShadowDom },
          React__default['default'].createElement(ChakraProvider, { theme: stripe },
              React__default['default'].createElement(App, null))), main);
      return {
          show,
          hide,
      };
  };
  const singleton = (factory) => {
      let instance;
      return (...args) => {
          if (!instance) {
              instance = factory(...args);
          }
          return instance;
      };
  };
  const createApp = singleton(_createApp);

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  GM.registerMenuCommand('Setting', () => {
      createApp().show();
  });

}(React, ReactDOM));
//# sourceMappingURL=bundle.user.js.map
