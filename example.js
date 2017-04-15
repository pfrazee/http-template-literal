const http = require('.')
const pkg = require('./package')

http`
  GET juliangruber.com/ HTTP/1.1
`.then(res => {
  console.log('Request one:', res.body)
  return http`
    POST httpbin.org/post HTTP/1.1
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
