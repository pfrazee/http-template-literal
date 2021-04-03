jest.mock('fs');

const http = require('../src');

describe('http', () => {
	it('works', () => {
		const request = http`
			GET https://httpbin.org/get HTTP/1.1
			Accept: application/json
		`;

		expect(request).toEqual({
		 headers: {
			 Accept: 'application/json',
		 },
		 method: 'GET',
		 resolveWithFullResponse: true,
		 simple: false,
		 url: 'https://httpbin.org/get',
		});
	});
});
