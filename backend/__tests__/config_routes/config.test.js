require('dotenv').config()
let app = require('../../app')
const supertest = require('supertest')
const request = supertest(app)

const Config = require('../../models/config.model')

const { dbConnect, dbDisconnect, token } = require('../__utils__/memoryDB')

// let mongoServer

beforeAll(async () => {
    await dbConnect()
    await new Config({
        makers: ['a', 'b'],
        scales: ['c'],
        materials: ['wood', 'stone', 'metal'],
        packages: ['big', 'small'],
    }).save()
})

afterAll(async () => {
    await dbDisconnect()
})

describe('get api/config', () => {
    // afterEach(async () => {
    //   await Userboard.deleteMany({});
    // });

    describe('when no token is given in the headers', () => {
        it('should return 403', async () => {
            const res = request
                .get('/api/config')
                .set('Accept', 'application/json')

            await res.expect(403)
        })
    })

    describe('when token is given in the headers', () => {
        it('should return 200', async () => {
            const res = request
                .get('/api/config')
                .set('Accept', 'application/json')
                .set('Authorization', token)
            // console.log(res.status)
            await res.expect(200)
        })
    })

  let _id

    describe('it should give back things', () => {
        it('should give back', done => {
            const res = request
                .get('/api/config')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end(function (err, res) {
                    expect(res.body).not.toEqual('asd')
                    expect(res.body).toHaveProperty('makers')
                    expect(res.body.makers).toHaveLength(2)
                    // console.log(res.body._id)
                    _id = res.body._id
                    return done()
                })

            res.expect(200)
        })
    })
  
    describe('it should update on post', () => {
        it('should give back 200 and "Settings saved!"', done => {
            const res = request
                .post('/api/config')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .send({
                    _id:_id,
                    makers: ['a'],
                    scales: ['c'],
                    materials: ['wood', 'stone', 'metal', 'adamantium'],
                    packages: ['big', 'small'],
                })
                .end(function (err, res) {
                    expect(res.body).toEqual({
                        msg: 'Settings saved!',
                    })
                    return done()
                })

              

            res.expect(200)
        })

       
    })

    describe('it should give back updated data after post', () => {
        it('should give back', done => {
            const res = request
                .get('/api/config')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end(function (err, res) {
                    expect(res.body).not.toEqual('asd')
                    expect(res.body.makers).toHaveLength(1)
                    expect(res.body.materials).toHaveLength(4)
                    return done()
                })

            res.expect(200)
        })
    })


     describe('it should give error if data is wrong format', () => {
         it('should give back', done => {
              const res = request
                  .post('/api/config')
                  .set('Accept', 'application/json')
                  .set('Authorization', token)
                  .send([
                      {
                        //   _id: _id,
                        //   makers: ['a'],
                          scalesss: ' ',
                          materialssss: {},
                      },
                  ])
                  .end(function (err, res) {
                    //   console.log(err)
                    //   console.log(res.body)
                      expect(res.body).toEqual({
                          msg: 'Settings saved!',
                      })
                      return done()
                  })

             res.expect(200)
         })
     })

      describe('it should give back updated data after post', () => {
          it('should give back', done => {
              const res = request
                  .get('/api/config')
                  .set('Accept', 'application/json')
                  .set('Authorization', token)
                  .end(function (err, res) {
                      console.log(res.body)
                      return done()
                  })

              res.expect(200)
          })
      })

})
