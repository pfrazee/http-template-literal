const http = require('./index')

http`
  GET https://httpbin.org/get HTTP/1.1
  Accept: application/json
`.then(res => {
  console.log('Request one:', res.body)
  return http`
    POST https://httpbin.org/post HTTP/1.1
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