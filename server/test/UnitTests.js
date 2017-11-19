//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

//TEST USERS
describe('Users', () => {
  /*
  * Test the /POST route for user login
  */
  describe('/POST users', () => {
      it('User should be able to login with correct username and password', (done) => {
        let user =  {
          Username: "test",
          Password: "test"
        }
        chai.request(server)
            .post('/users/authenticate')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('user');
                res.body.should.have.property('token');
              done();
            });
      });
  });
  /*
  * Test the /POST route for user Logout
  */
  describe('/POST users', () => {
    it('User should be able to log out', (done) => {
      let user =  {
        username: "test"
      }
      chai.request(server)
          .post('/users/logout')
          .send(user)
          .end((err, res) => {
            res.body.should.have.property('success').eql(true);
            res.body.should.have.property("msg").eqls("logged out");
            done();
          });
    });
});
  /*
  * Test the /POST route for incorrect usernmane in user login
  */
  describe('/POST users', () => {
      it('User should not be able to register with an incorrect username', (done) => {
        let user =  {
          Username: "incorrect",
          Password: "test"
        }
        chai.request(server)
            .post('/users/authenticate')
            .send(user)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('msg').eqls('User Not found');
              done();
            });
      });
  });
  /*
  * Test the /POST route for incorrect password in user login
  */
  describe('/POST users', () => {
      it('User should not be able to login with wrong password', (done) => {
        let user =  {
          Username: "test",
          Password: "incorrect"
        }
        chai.request(server)
            .post('/users/authenticate')
            .send(user)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('msg').eqls('Wrong password');
              done();
            });
      });
  });

});

//TEST PRODUCTS
describe('Products', () => {
  /*
  * Test the /GET route
  */
  describe('/GET products', () => {
      it('it should GET all the products', (done) => {
        chai.request(server)
            .get('/products/view')
            .set('Authorization', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlVzZXJuYW1lIjoidGVzdCIsIlBhc3N3b3JkIjoiJDJhJDEwJG1DRzFzV0pHSkNleHpJSkdYdnB0NGVHSkRRRTV4SEs0b3hYci9pWEowZU1vY0hpVjN1RHl5IiwiRmlyc3ROYW1lIjoidGVzdCIsIkxhc3ROYW1lIjoidGVzdCIsIkVtYWlsQWRkcmVzcyI6InRlc3QiLCJQaG9uZU51bWJlciI6IjEyMyIsIkFkbWluaXN0cmF0b3IiOjAsIkFwdCI6bnVsbCwiU3RyZWV0TnVtYmVyIjowLCJTdHJlZXQiOiIiLCJDaXR5IjoiIiwiWklQIjoiIiwiQ291bnRyeSI6IiJ9LCJpYXQiOjE1MTA3NjY5NDcsImV4cCI6MTUxMTM3MTc0N30.seVNLEik66EPvkd-luer0GxNh3eXOm0ZOX-E3tm6EIM")
            .end((err, res) => {
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('television');
              done();
            });
      });
  });

  /*
  * Test the /POST route for including an incorrect category field
  */
  describe('/POST products', () => {
      it('it should not POST a product with an incorrect Category field', (done) => {
        //randomNum=Math.floor(Math.random() * (999 - 0 + 1)) + 0;
        let product =  {"data":{
            "amount":1,
            "category":"SwaggBoi",
            "description":{
                "additionalInfo": "None",
               "brandName":"10",
               "dimensions": 123.00,
               "modelNumber": "MON",
               "price": 10,
               "size":10,
               "weight": 10
            }
        }}
        chai.request(server)
            .post('/products/add')
            .set('Authorization', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlVzZXJuYW1lIjoidGVzdCIsIlBhc3N3b3JkIjoiJDJhJDEwJG1DRzFzV0pHSkNleHpJSkdYdnB0NGVHSkRRRTV4SEs0b3hYci9pWEowZU1vY0hpVjN1RHl5IiwiRmlyc3ROYW1lIjoidGVzdCIsIkxhc3ROYW1lIjoidGVzdCIsIkVtYWlsQWRkcmVzcyI6InRlc3QiLCJQaG9uZU51bWJlciI6IjEyMyIsIkFkbWluaXN0cmF0b3IiOjAsIkFwdCI6bnVsbCwiU3RyZWV0TnVtYmVyIjowLCJTdHJlZXQiOiIiLCJDaXR5IjoiIiwiWklQIjoiIiwiQ291bnRyeSI6IiJ9LCJpYXQiOjE1MTA3NjY5NDcsImV4cCI6MTUxMTM3MTc0N30.seVNLEik66EPvkd-luer0GxNh3eXOm0ZOX-E3tm6EIM")
            .send(product)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property("msg").eqls("Invalid product Category.");
              done();
            });
      });

  });
});
