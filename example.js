const http = require('.')
const pkg = require('./package')

http`
  GET / HTTP/1.1
  Host: juliangruber.com
`.then(res => {
  console.log('Request one:', res.body)
  return http`
    POST /post HTTP/1.1
    Host: httpbin.org
    Content-Type: application/json

    ${JSON.stringify({
      hello: 'world',
      awesome: true
    })}
  `
}).then(res => {
  console.log('Request two:', res.body)  
}).catch(err => {
  console.log('Oh no!', err)
})
