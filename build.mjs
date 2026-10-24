// src/page.html + src/rules.js → dist/artifact.html(웹 게시용), www/index.html(앱용)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const rules = readFileSync('src/rules.js', 'utf8');
const page = readFileSync('src/page.html', 'utf8').replace('/*@RULES*/', () => rules);

mkdirSync('dist', { recursive: true });
mkdirSync('www', { recursive: true });
writeFileSync('dist/artifact.html', page);

const head = '<!doctype html><html lang="ko"><head><meta charset="utf-8">' +
  '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">' +
  '<meta name="theme-color" content="#eef1f4">' +
  '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>' +
  '</head><body>';
writeFileSync('www/index.html', head + page + '</body></html>');
console.log('built', page.length, 'bytes');
