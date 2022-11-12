/* eslint-disable */
const { generateRefreshToken, generateToken } = require('../../controllers/userController');

const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGODB_CONNECT_URI;
mongoose.connect(url);
let server;
// const app = require("../../testapp");

// const agent = request.agent(app);

jest.setTimeout(60000);

describe("/user testing", () => {


    afterAll(async () => {

        await mongoose.connection.close();
    })

    it('refresh token', () => {
        expect(typeof generateRefreshToken('4523', 'USER')).toBe('string');
    });
    it('jwt token', () => {
        expect(typeof generateToken('4523', 'USER')).toBe('string');
    });






});
