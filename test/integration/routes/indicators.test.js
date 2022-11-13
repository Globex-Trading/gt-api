/* eslint-disable */

const request = require("supertest");

const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.TEST_MONGODB_CONNECT_URI;
mongoose.connect(url);


let server;


jest.setTimeout(60000);

describe("/indicator testing", () => {

    beforeEach(() => {
        server = require("../../../testserver");
    })

    // beforeAll(async () => {
    //     await User.remove({})
    // });

    afterEach(() => {
        server.close();

    })

    afterAll(async () => {

        await mongoose.connection.close();
    })

    describe("/indicator testing", () => {

        it("getdata pass", async () => {
            // const [symbolId, timeframe, TI, startTime, endTime] = ['62f0960d419406d5471fb5c7', '15m', 'vwma', 1659934799999, 1659944699999]

            const res = await request(server)
                .post("/indicators")
                .send({
                    symbolId: '62f0960d419406d5471fb5c7',
                    timeframe: '15m',
                    TI: 'vwma',
                    startTime: 1659934799999,
                    endTime: 1659944699999,
                });

            expect(res.status).toBe(200);
        });

        it("getdata fail 1", async () => {
            // const [symbolId, timeframe, TI, startTime, endTime] = ['62f0960d419406d5471fb5c7', '15m', 'vwma', 1659934799999, 1659944699999]

            const res = await request(server)
                .post("/indicators")
                .send({
                    symbolId: '62f0960d419406d5471fb5c7',
                    timeframe: '15m',
                    startTime: 1659934799999,
                    endTime: 1659944699999,
                });

            expect(res.status).toBe(400);
        });

    })


    //get indecato
    describe("/indicator testing", () => {

        it("get allindecators pass", async () => {
            // const [symbolId, timeframe, TI, startTime, endTime] = ['62f0960d419406d5471fb5c7', '15m', 'vwma', 1659934799999, 1659944699999]

            const res = await request(server).get("/indicators")
              

            expect(res.status).toBe(200);
        });

        it("getsindicator by id pass", async () => {

            const res = await request(server).get("/indicators/id/6371093d29986788030658b7")


            expect(res.status).toBe(200);
        });

        it("getsindicator by id fail", async () => {

            const res = await request(server).get("/indicators/id/6370fde0e232393f37d")


            expect(res.status).toBe(501);
        });

        it("getsindicator by id fail2", async () => {

            const res = await request(server).get("/indicators/id/")


            expect(res.status).toBe(404);
        });
    })



});

