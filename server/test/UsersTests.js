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
