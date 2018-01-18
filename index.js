'use strict'
const jsdom = require('jsdom')
const { JSDOM } = jsdom

function walkTextCore(node, dom, text) {
	let newText = ''
	for (const child of node.childNodes) {
		if (child.nodeType === dom.window.Node.ELEMENT_NODE) {
			newText = newText + walkTextCore(child, dom, text)
		} else if (child.nodeType === dom.window.Node.TEXT_NODE) {
			newText = newText + child.textContent
		}
	}
	return text + newText
}

function walkText(dom) {
	const body = dom.window.document.body
	const text = walkTextCore(body, dom, '')
	return text
}

module.exports = function(html) {
	const dom = new JSDOM(html)
	return walkText(dom)
}
