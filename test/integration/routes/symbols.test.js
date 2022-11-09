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

    describe("/symbol testing", () => {

        it("get all symbol pass", async () => {
            // const [symbolId, timeframe, TI, startTime, endTime] = ['62f0960d419406d5471fb5c7', '15m', 'vwma', 1659934799999, 1659944699999]

            const res = await request(server)
                .get("/symbols")


            expect(res.status).toBe(200);
        });

        it("getsymbol by id 1 pass", async () => {
            // const [symbolId, timeframe, TI, startTime, endTime] = ['62f0960d419406d5471fb5c7', '15m', 'vwma', 1659934799999, 1659944699999]

            const res = await request(server)
                .get("/symbols/provider/id/62f0960d419406d5471fb5c7")


            expect(res.status).toBe(200);
        });

        // it("getsymbol by id fail", async () => {

        //     const res = await request(server)
        //         .get("/symbols/provider/id/provider_id=''")


        //     expect(res.status).toBe(201);
        // });

    })



});

