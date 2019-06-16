// prettier-ignore
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).registerPromiseWorker=e()}}(function(){return function f(i,s,u){function c(n,e){if(!s[n]){if(!i[n]){var r="function"==typeof require&&require;if(!e&&r)return r(n,!0);if(a)return a(n,!0);var o=new Error("Cannot find module '"+n+"'");throw o.code="MODULE_NOT_FOUND",o}var t=s[n]={exports:{}};i[n][0].call(t.exports,function(e){return c(i[n][1][e]||e)},t,t.exports,f,i,s,u)}return s[n].exports}for(var a="function"==typeof require&&require,e=0;e<u.length;e++)c(u[e]);return c}({1:[function(e,n,r){"use strict";n.exports=function(u){function c(n,e,r,o){function t(e){"function"!=typeof self.postMessage?n.ports[0].postMessage(e):self.postMessage(e)}r?("undefined"!=typeof console&&"error"in console&&console.error("Worker caught an error:",r),t([e,{message:r.message}])):t([e,null,o])}self.addEventListener("message",function(e){var n=e.data;if(Array.isArray(n)&&2===n.length){var r,o,t,f,i=n[0],s=n[1];"function"!=typeof u?c(e,i,new Error("Please pass a function into register().")):(r=e,o=i,(f=function(e,n){try{return{res:e(n)}}catch(e){return{err:e}}}(u,s)).err?c(r,o,f.err):!(t=f.res)||"object"!=typeof t&&"function"!=typeof t||"function"!=typeof t.then?c(r,o,null,f.res):f.res.then(function(e){c(r,o,null,e)},function(e){c(r,o,e)}))}})}},{}]},{},[1])(1)});

registerPromiseWorker(function(data) {
  importScripts(
    `${
      data.path
    }/node_modules/localized-readability/dist/localized-readability.min.js`
  );
  try {
    const Highlighter = LocalizedReadability.highlighter;
    const highlight = Highlighter.highlight(data.nlcst, {
      paragraphs: false,
      sentences: true
    });
    return highlight;
  } catch (error) {
    return error;
  }
});
