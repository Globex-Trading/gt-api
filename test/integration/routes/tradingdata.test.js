/* eslint-disable */

const request = require("supertest");

const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.TEST_MONGODB_CONNECT_URI;
mongoose.connect(url);


let server;


jest.setTimeout(60000);

describe("/trading data testing", () => {

    beforeEach(() => {
        server = require("../../../testserver");
    })


    afterEach(() => {
        server.close();

    })

    afterAll(async () => {

        await mongoose.connection.close();
    })

    describe("/provider testing", () => {

        it("get all providers fail", async () => {

            const res = await request(server)
            .post("/trading-data")
            .send({

            });


            expect(res.status).toBe(400);
        });

       
        it("get all providers pass", async () => {

            const res = await request(server)
            .post("/trading-data")
            .send({
                symbol: '62f0960d419406d5471fb5c7',
                interval: '15m',
                start: 1659934799999,
                end: 1659944699999,
            });


            expect(res.status).toBe(200);
        });

    })


    // describe("  provider/slug", () => {

    //     it("getsymbol by slug pass", async () => {

    //         const res = await request(server).get("/providers/slug/62f0960d419406d5471fb5c7")


    //         expect(res.status).toBe(200);
    //     });
    // })

   



});

