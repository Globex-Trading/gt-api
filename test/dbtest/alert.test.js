/* eslint-disable */
const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.TESTDB_MONGODB_CONNECT_URI;
mongoose.connect(url);

const { Alert } = require('../../models/alert');


describe('insert', () => {
    // 	let connection;
    // 	let db;

    beforeAll(async () => {
        await Alert.remove({})
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('has module', async () => {
        expect(Alert).toBeDefined();
    });


    describe('get data', () => {

        it('insert and check', async () => {

            const alert = new Alert({
                provider: 'BINANCE',
                symbol: 'BTCUSDT',
                trigger_price: 20000,
                user: '633fac06895400a2403fea19',
                is_triggered: true,
                alert_type: "Crossing"
            });
            await alert.save();

            const mockalert = await Alert.findOne({ provider: 'BINANCE' });

            expect(mockalert.trigger_price).toEqual(20000);
        });

    });


});