# http-template-literal

Make HTTP requests the way TBL intended.

```javascript
const http = require('http-template-literal')

var res = await http`
  GET https://httpbin.org/get HTTP/1.1
  Accept: application/json
`
console.log('Request one:', res.body)

var res = await http`
  POST https://httpbin.org/post HTTP/1.1
  Content-Type: application/json

  ${JSON.stringify({
    hello: 'world',
    awesome: true
  })}
`
console.log('Request two:', res.body)
```

## FAQ

### Oh cool, should I use this?

No.