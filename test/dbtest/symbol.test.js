/* eslint-disable */
const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.TESTDB_MONGODB_CONNECT_URI;
mongoose.connect(url);

const { Symbol } = require('../../models/symbol');


describe('insert', () => {
    // 	let connection;
    // 	let db;

    beforeAll(async () => {
        // await Symbol.remove({})
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('has module', async () => {
        expect(Symbol).toBeDefined();
    });


    describe('get data', () => {

        it('insert and check', async () => {

            const symbol = new Symbol({
                name: 'ALGOUSDT',
                providedName: "BINANCE",
                provider: "62f0960d419406d5471fb5c2"
            });
            await symbol.save();

            const mocksymbol = await Symbol.findOne({ name: 'ALGOUSDT' });

            expect(mocksymbol.provider.toString()).toEqual("62f0960d419406d5471fb5c2");
        });

    });


});