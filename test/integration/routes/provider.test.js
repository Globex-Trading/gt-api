/* eslint-disable */

const request = require("supertest");

const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.TEST_MONGODB_CONNECT_URI;
mongoose.connect(url);


let server;


jest.setTimeout(60000);

describe("/provider testing", () => {

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

        it("get all providers pass", async () => {

            const res = await request(server).get("/providers")


            expect(res.status).toBe(200);
        });

    })


    describe("  provider/slug", () => {

        it("getsymbol by slug pass", async () => {

            const res = await request(server).get("/providers/slug/62f0960d419406d5471fb5c7")


            expect(res.status).toBe(200);
        });
    })

    // describe(" provider/for-fetcher/slug", () => {

    //     it("getsymbol by id pass 2", async () => {

    //         const res = await request(server).get("/providers/for-fetcher/slug/")


    //         expect(res.status).toBe(200);
    //     });


    //     it("getsymbol by id fail 1", async () => {

    //         const res = await request(server)
    //             .get("/providers/for-fetcher/slug/jshs")


    //         expect(res.status).toBe(400);
    //     });
    // })




});

