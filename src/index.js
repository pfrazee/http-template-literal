const request = require('request-promise')
const line0Regex = /^([A-z]+) ([\S]+)/

module.exports = function (strings, ...values) {
  var params, headers, body

  try {
    // split out the lines
    const lines = String.raw(strings, ...values).trim().split('\n')

    // separate the header and body lines
    const line0 = lines.shift()
    var headerLines = []
    var bodyLines = []
    var isConsumingHeaders = true
    lines.forEach(line => {
      if (!line.trim()) {
        isConsumingHeaders = false
        return
      }
      if (isConsumingHeaders) {
        headerLines.push(line)
      } else {
        bodyLines.push(line.trim())
      }
    })

    // parse
    params = parseLine0(line0)
    headers = parseHeaders(headerLines)
    if (bodyLines.length > 0) body = bodyLines.join('\n')
  } catch (err) {
    return Promise.reject(err)
  }

  var opts = {
    resolveWithFullResponse: true,
    simple: false,
    url: params.url,
    method: params.method,
    headers
  }
  if (body) opts.body = body
  return request(opts)
}

function parseLine0 (str) {
  try {
    const match = line0Regex.exec(str)
    return {
      method: match[1],
      url: match[2]
    }
  } catch (e) {
    throw new Error(`Parse error: ${str} is invalid, must be "{METHOD} {URL}". ${e.toString()}`)
  }
}

function parseHeaders (lines) {
  var headers = {}
  lines.forEach(line => {
    var parts = line.split(':')
    if (parts.length <= 1) {
      throw new Error(`Parsing error: ${line} is not a valid header K/V`)
    }
    headers[parts[0].trim()] = parts.slice(1).join(':').trim()
  })
  return headers
}