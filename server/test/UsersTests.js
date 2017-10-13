//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  /*
  * Test the /POST route for user login
  */
  describe('/POST users', () => {
      it('User shuld be able to login with correct username and password', (done) => {
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
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('msg').eqls('Wrong password');
              done();
            });
      });

  });
});
