const gutil = require('gulp-util')
const PluginError = gutil.PluginError
const _ = require('lodash')
const uri = require('urijs')
const through2 = require('through2')
const jsdom = require('jsdom')
const DOM = jsdom.JSDOM


const PLUGIN_NAME = 'gulp-add-query-fragment'


/**
 * 检查链接地址中是否是 javascript:*
 * @param {string} link 
 * @returns {boolean}
 */
const isVoidLink = (link) => {
    return link.trim().toLowerCase().startsWith('javascript')
}

/**
 * 根据配置对象给相关元素的链接地址添加查询参数或锚点
 * @param {Document} doc 
 * @param {Array<object>} option 
 * @returns {Document}
 */
const handler = (doc, option) => {
    const selector = option.selector
    const query = option.query || {}
    const fragment = option.fragment != null ? option.fragment : ''
    const overwrite = !!option.overwrite
    const elements = doc.querySelectorAll(selector)
    elements.forEach((ele) => {
        let tagName = ele.tagName.toLowerCase()
        let linkKey = 'src'
        if (tagName === 'a' || tagName === 'link') {
            linkKey = 'href'
            if (isVoidLink(ele[linkKey])) {
                return
            }
        }
        let linkObj = uri(ele[linkKey])
        if (overwrite) {
            const queryKeys = Object.keys(linkObj.query(true))
            linkObj.removeQuery(queryKeys)
        }
        ele[linkKey] = linkObj.addQuery(query).fragment(fragment) + ''
    })
    return doc
}

const resolveHtml = (doc, options) => {
    if (Array.isArray(options) && options.length > 0) {
        options.forEach(function (option) {
            if (option.selector != null) {
                doc = handler(doc, option)
            }
        })
    }
    return doc
}

const addQueryFragment = (options) => {

    options = options == null ? [] : options
    return through2.obj(function (file, enc, cb) {
        try {
            if (file.isNull()) {
                cb(null, file)
            }
            const fileDOM = new DOM(file.contents)
            const doc = fileDOM.window.document
            doc.innerHTML = resolveHtml(doc, options).innerHTML
            file.contents = new Buffer(fileDOM.serialize())
            cb(null, file)
        } catch (e) {
            throw new PluginError(PLUGIN_NAME, e);
        }
    })
}

module.exports = addQueryFragment 