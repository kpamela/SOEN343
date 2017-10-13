//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Products', () => {
  /*
  * Test the /GET route
  */
  describe('/GET products', () => {
      it('it should GET all the products', (done) => {
        chai.request(server)
            .get('/products/view')
            .set('Authorization', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MDY1NDI2MDQsImV4cCI6MTUzODA3ODYwNiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.AJ4hiuABiG2SkUgVOsU9xNRCpKcDtIVnMKMbfgxPCts")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('television');
              done();
            });
      });
  });

  /*
  * Test the /POST route
  */
  describe('/POST products', () => {
      it('it should not POST a product with an incorrect category field', (done) => {
        let product =  {
         	"name":"Hello",
         	"category":"tv",
         	"price":12.99,
         	"available":5,
         	"description":{
         		"SerialNumber": 9999999999,
            	"ModelNumber": 12345008910,
                "Dimensions": 123.00,
                "Weight": 782.99,
                "TelevisionType": "LCD"
            }
        }
        chai.request(server)
            .post('/products/add')
            .set('Authorization', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MDY1NDI2MDQsImV4cCI6MTUzODA3ODYwNiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.AJ4hiuABiG2SkUgVOsU9xNRCpKcDtIVnMKMbfgxPCts")
            .send(product)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(false);
              done();
            });
      });

  });
});
