/* eslint-disable */
const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.TEST_MONGODB_CONNECT_URI;
mongoose.connect(url);
const { calculate } = require('../../controllers/indicatorsController');




jest.setTimeout(60000);

describe("/indicator testing", () => {

    const data = [
        {
            _id: "62f09850d9fe6849e8eed14b",
            open_time: 1659933900000,
            close_time: 1659934799999,
            open_price: 23316.58,
            close_price: 23341.39,
            high_price: 23355.75,
            low_price: 23316.57,
            volume: 905.7422,
            _class: 'com.gt.datafetcher.gtdatafetcher.model.Candle'
        },
        {
            _id: "62f09bd4d9fe6849e8f59251",
            open_time: 1659934800000,
            close_time: 1659935699999,
            open_price: 23341.39,
            close_price: 23342.01,
            high_price: 23386.23,
            low_price: 23331.32,
            volume: 925.86676,
            _class: 'com.gt.datafetcher.gtdatafetcher.model.Candle'
        },
        {
            _id: "62f09f58d9fe6849e8fc8db4",
            open_time: 1659935700000,
            close_time: 1659936599999,
            open_price: 23342.01,
            close_price: 23388.44,
            high_price: 23418.7,
            low_price: 23340,
            volume: 1472.7223,
            _class: 'com.gt.datafetcher.gtdatafetcher.model.Candle'
        },
        {
            _id: "62f0a2dcd9fe6849e803d3f4",
            open_time: 1659936600000,
            close_time: 1659937499999,
            open_price: 23388.44,
            close_price: 23413.93,
            high_price: 23438.22,
            low_price: 23370,
            volume: 1615.6082,
            _class: 'com.gt.datafetcher.gtdatafetcher.model.Candle'
        },
        {
            _id: "62f0a660d9fe6849e80a7768",
            open_time: 1659937500000,
            close_time: 1659938399999,
            open_price: 23413.93,
            close_price: 23430.31,
            high_price: 23467,
            low_price: 23413.33,
            volume: 1593.4342,
            _class: 'com.gt.datafetcher.gtdatafetcher.model.Candle'
        },
        {
            _id: "62f0a9e4d9fe6849e811c28d",
            open_time: 1659938400000,
            close_time: 1659939299999,
            open_price: 23430.31,
            close_price: 23580.63,
            high_price: 23643.95,
            low_price: 23430.31,
            volume: 4410.0317,
            _class: 'com.gt.datafetcher.gtdatafetcher.model.Candle'
        },
        {
            _id: "62f0ad68d9fe6849e81894ea",
            open_time: 1659939300000,
            close_time: 1659940199999,
            open_price: 23580.63,
            close_price: 23635.53,
            high_price: 23658.62,
            low_price: 23579.29,
            volume: 2407.0317,
            _class: 'com.gt.datafetcher.gtdatafetcher.model.Candle'
        },
        {
            _id: "62f0b0ecd9fe6849e81f9a4e",
            open_time: 1659940200000,
            close_time: 1659941099999,
            open_price: 23635.53,
            close_price: 23707.82,
            high_price: 23776,
            low_price: 23632.18,
            volume: 3380.1067,
            _class: 'com.gt.datafetcher.gtdatafetcher.model.Candle'
        },
        {
            _id: "62f0b470d9fe6849e8265066",
            open_time: 1659941100000,
            close_time: 1659941999999,
            open_price: 23707,
            close_price: 23729.49,
            high_price: 23792.86,
            low_price: 23697.8,
            volume: 2273.5862,
            _class: 'com.gt.datafetcher.gtdatafetcher.model.Candle'
        },
        {
            _id: "62f0b7f4d9fe6849e82e78e9",
            open_time: 1659942000000,
            close_time: 1659942899999,
            open_price: 23729.49,
            close_price: 23774.53,
            high_price: 23798.73,
            low_price: 23729.47,
            volume: 2003.0448,
            _class: 'com.gt.datafetcher.gtdatafetcher.model.Candle'
        }
    ]


    afterAll(async () => {

        await mongoose.connection.close();
    })

    describe("/indicatorcalculator testing", () => {

            it('sma', async () => {
                expect(typeof await calculate(data,'sma')).toBe('object');
            });
    
            it('ema', async () => {
                expect(typeof await calculate(data,'ema')).toBe('object');
            });
        
            it('bband', async () => {
                expect(typeof await calculate(data,'bbands')).toBe('object');
            });
        
            it('wma', async () => {
                expect(typeof await calculate(data,'wma')).toBe('object');
            });
        
            it('rsi', async () => {
                expect(typeof await calculate(data,'rsi')).toBe('object');
            });
        
            it('macd', async () => {
                expect(typeof await calculate(data,'macd')).toBe('object');
            });
        
            it('roc', async () => {
                expect(typeof await calculate(data,'roc')).toBe('object');
            });
            it('stoch', async () => {
                expect(typeof await calculate(data,'stoch')).toBe('object');
            });
            it('obv', async () => {
                expect(typeof await calculate(data,'obv')).toBe('object');
            });
        
            it('md', async () => {
                expect(typeof await calculate(data,'md')).toBe('object');
            });
            it('rocr', async () => {
                expect(typeof await calculate(data,'rocr')).toBe('object');
            });
            it('vwma', async () => {
                expect(typeof await calculate(data,'vwma')).toBe('object');
            });


    })

    test('should throw an error', async() => {
        expect( ()=> calculate(data,'error')).toThrow(Error);
      })



});

