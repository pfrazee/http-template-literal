const net = require('net')

module.exports = function (strings, ...values) {
  return new Promise((resolve, reject) => {
    const lines = String.raw(strings, ...values).trim().split('\n').map(l=>l.trim())
    lines.push('\n')

    // Extract and properly add Host:
    const segs = lines[0].split(' ')
    const host = segs[1].split('/')[0]
    segs[1] = '/' + segs[1].split('/').slice(1).join('/')
    lines[0] = segs.join(' ')
    lines.splice(1, 0, `Host: ${host}`)

    const con = net.connect({
      port: 80,
      host
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
