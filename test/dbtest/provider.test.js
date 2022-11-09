/* eslint-disable */
const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.TEST_MONGODB_CONNECT_URI;
mongoose.connect(url);

const { Provider } = require('../../models/provider');


describe('insert', () => {
    // 	let connection;
    // 	let db;

    beforeAll(async () => {
        // await Provider.remove({})
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('has module', async () => {
        expect(Provider).toBeDefined();
    });


    describe('get data', () => {

        it('insert and check', async () => {


            let mockprovider = await Provider.findOne({ name: 'FTX' });

            if (!mockprovider) {
                const provider = new Provider({
                    name: 'FTX',
                    slug: 'FTX',
                    providedTimeFrames: ['1min', '5min', '1h']
                });
                await provider.save();

                mockprovider = await Provider.findOne({ name: 'FTX' });

            }



            expect(mockprovider.slug).toEqual("FTX");
        });

    });


});