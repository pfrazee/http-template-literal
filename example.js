const http = require('./index')

http`
  GET https://httpbin.org/get
  Accept: application/json
`.then(res => {
  console.log('Request one:', res.body)
  return http`
    POST https://httpbin.org/post
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