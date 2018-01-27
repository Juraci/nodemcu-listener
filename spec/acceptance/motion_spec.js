import EventSource from 'eventsource';
import config from '../../config/environment';
import appMaker from '../../app/app';

describe('POST cards/:id/motion', () => {
  const base64 = new Buffer(`${config.ENV.user}:${config.ENV.password}`).toString('base64')
  const authorization = `Basic ${base64}`;
  const cardId = '1';
  const enabledCards = [ cardId ];
  const app = appMaker(enabledCards);
  const port = 3000;
  const url = `http://localhost:${port}`;
  let server;

  beforeEach((done) => {
    server = app.listen(3000, () => done());
  });

  afterEach(() => server.close());

  it('emits a server sent event on cards/:id/stream endpoint', done => {
    const source = new EventSource(`${url}/cards/${cardId}/stream`);
    source.on('message', (e) => {
      if(e.data === 'sse ready') {
        return;
      }
      expect(e.data).to.match(/Motion \d+\/\d+\/\d+, \d+\:\d+\:\d+ (am|pm)/);
      done();
    });

    request
      .post(`${url}/cards/${cardId}/motion`)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', authorization)
      .end((err, res) => {
        expect(res.status).to.be.equal(204);
      });
  });

  context('when the board id does not exist', () => {
    it('returns 404', done => {
      request
        .post(`${url}/cards/does-not-exit/motion`)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', authorization)
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          done();
        });
    });
  });

  context('when there is no authorization', () => {
    it('returns 404', done => {
      request
        .post(`${url}/cards/${cardId}/motion`)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          done();
        });
    });
  });
});
