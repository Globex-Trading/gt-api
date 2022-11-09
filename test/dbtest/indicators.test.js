/* eslint-disable */
const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.TEST_MONGODB_CONNECT_URI;
mongoose.connect(url);

const { Indicator } = require('../../models/indicator');


describe('insert', () => {
    // 	let connection;
    // 	let db;

    beforeAll(async () => {
        await Indicator.remove({})
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('has module', async () => {
        expect(Indicator).toBeDefined();
    });


    describe('get data', () => {

        it('insert and check', async () => {

            const indicator = new Indicator({
                name: 'EMA',
                newPane: true,
                chartType: "bar"
            });
            await indicator.save();

            const mockindicator = await Indicator.findOne({ name: 'EMA' });

            expect(mockindicator.chartType).toEqual("bar");
        });

    });


});