const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.use(chaiHttp);
chai.should();

describe('Users', () => {
  describe('GET /', () => {
    it('should get all users', (done) => {
      chai
        .request(server)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
    it('should get a single user', (done) => {
      const id = 4;
      chai
        .request(server)
        .get(`/user/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should not get a single todo', (done) => {
      const id = 10;
      chai
        .request(server)
        .get(`/user/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
