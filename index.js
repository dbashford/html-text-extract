'use strict'
const jsdom = require('jsdom')
const { JSDOM } = jsdom

module.exports = function(html) {
	const dom = new JSDOM(html)
	return dom.window.document.querySelector('p').textContent
}
