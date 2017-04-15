const net = require('net')
const { parse, format } = require('url')

module.exports = function (strings, ...values) {
  return new Promise((resolve, reject) => {
    const lines = String.raw(strings, ...values).trim().split('\n').map(l=>l.trim())
    lines.push('\n')
    const con = net.connect({
      port: 80,
      host: lines[1].split(': ')[1]
    })
    const req = lines.join('\n')
    console.log(`"${req}"`)
    con.end(req)
    let out = new Buffer(0)
    con.on('data', d => out = Buffer.concat([out, d]))
    con.on('end', () => resolve({
      body: out.toString()
    }))
  })
}
