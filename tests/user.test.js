const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const mongoose = require('mongoose')

const userTest = {
    name: 'Test user',
    email: 'test@test.com',
    password: 'test1234'
}

beforeEach(async () => {
    await User.deleteMany()
    const user = new User(userTest)
    await user.save()
})

afterAll(async () => {
    await mongoose.disconnect()
})

test('Should create a new user', async () => {
    const response = await request(app).post('/user')
        .send({
            name: 'jayant',
            email: 'jv@jv.com',
            password: 'go123'
        })
        .expect(201)

        //assert that the db was updated correctly
        const user = await User.findById(response.body.user._id)
        expect(user).not.toBeNull()

        //assert about the response
        expect(response.body.user.name).toBe('jayant')
})

test('Should login an existing user', async () => {
    await request(app).post('/user/login')
        .send({
            email: userTest.email,
            password: userTest.password
        })
        .expect(200)
})

test('Should not login with incorrect user credentials', async () => {
    await request(app).post('/user/login')
        .send({
            email: userTest.email,
            password: 'wrongpass'
        })
        .expect(400)
})