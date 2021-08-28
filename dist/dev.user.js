// ==UserScript==
// @name        rollup-userscript-template [dev]
// @description Bundle typescript, react and JSX/TSX script files into a single userscript file with rollup
// @namespace   github.com/backtolife2021
// @require     https://unpkg.com/react@17/umd/react.development.js
// @require     https://unpkg.com/react-dom@17/umd/react-dom.development.js
// @include     https://github.com/*
// @version     1.2.2
// @homepage    https://github.com/cvzi/rollup-userscript-template
// @author      cuzi
// @license     MIT
// @grant       GM.getValue
// @grant       GM.registerMenuCommand
// @grant       GM.xmlHttpRequest
// @grant       GM.setValue
// ==/UserScript==
/* eslint-disable no-undef */
/* eslint-disable compat/compat */
/* eslint-disable node/handle-callback-err */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/catch-or-return */
/**  globals GM */

'use strict'
;(function () {
  const url = `http://localhost:8124/bundle.user.js?${Date.now()}`
  new Promise(function loadBundleFromServer (resolve, reject) {
    const req = GM.xmlHttpRequest({
      method: 'GET',
      url: url,
      onload: function (r) {
        if (r.status !== 200) {
          reject(r)
          return
        }
        resolve(r.responseText)
      },
      onerror: (e) => reject(e),
    })
    if (req && 'catch' in req) {
      req.catch((err) => {
        /* ignore */
      })
    }
  })
    .catch(function (err) {
      const log = function (obj, b) {
        let prefix = 'loadBundleFromServer: '
        try {
          prefix = GM.info.script.name + ': '
        } catch {}
        if (b) {
          console.log(prefix + obj, b)
        } else {
          console.log(prefix, obj)
        }
      }
      if (err && 'status' in err) {
        if (err.status <= 0) {
          log('Server is not responding')
          GM.getValue('scriptlastsource3948218', false).then(function (src) {
            if (src) {
              log('%cExecuting cached script version', 'color: Crimson; font-size:x-large;')
              /* eslint-disable no-eval */
              eval(src)
            }
          })
        } else {
          log('HTTP status: ' + err.status)
        }
      } else {
        log(err)
      }
    })
    .then(function (s) {
      if (s) {
        /* eslint-disable no-eval */
        eval(`${s} //# sourceURL=${url}`)
        GM.setValue('scriptlastsource3948218', s)
      }
    })
    .finally(() => void 0)
})()