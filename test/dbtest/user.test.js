/* eslint-disable */
const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.TEST_MONGODB_CONNECT_URI;
mongoose.connect(url);

const { User } = require('../../models/user');


describe('insert', () => {
    // 	let connection;
    // 	let db;

    beforeAll(async () => {
        await User.remove({})
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('has module', async () => {
        expect(User).toBeDefined();
    });


    describe('get user', () => {

        it('insert and check', async () => {

            let mockuser = await User.findOne({ first_name: 'lala' });

            if (!mockuser) {
                const user = new User({
                    first_name: 'lala',
                    last_name: 'sadsada',
                    email: 'asa@gmail.com',
                    password: 'dsdsd',
                    user_type: 'USER',
                });
                await user.save();

                mockuser = await User.findOne({ first_name: 'lala' });

            }

            expect(mockuser.last_name).toEqual("sadsada");
        });

    });


});