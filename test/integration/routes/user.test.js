/* eslint-disable */

const request = require("supertest");


const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.TEST_MONGODB_CONNECT_URI;
mongoose.connect(url);

const { User } = require('../../../models/user');
let server;
let token;
let refreshToken;

jest.setTimeout(60000);

describe("/user testing", () => {

    beforeEach(() => {
        server = require("../../../testserver");
    })

    beforeAll(async () => {
        await User.remove({})
    });

    afterEach(() => {
        server.close();

    })

    afterAll(async () => {

        await mongoose.connection.close();
    })



    describe("/register", () => {

        it("register pass", async () => {

            const res = await request(server)
                .post("/users")
                .send({
                    first_name: 'asas',
                    last_name: 'sadsada',
                    email: 'bbbbc@gmail.com',
                    password: 'bbbb',
                    user_type: 'USER',
                });

            expect(res.status).toBe(201);
        });

        it("register fail 1", async () => {

            const res = await request(server)
                .post("/users")
                .send({
                    first_name: 'asas',
                    last_name: 'sadsada',
                    email: 'bbbbc@gmail.com',
                    password: 'bbbb',
                    user_type: 'USER',
                });

            expect(res.status).toBe(400);
        });

        it("register fail", async () => {

            const res = await request(server)
                .post("/users")
                .send({
                    first_name: 'asas',
                    last_name: 'sadsada',
                    password: 'bbbb',
                    user_type: 'USER',
                });

            expect(res.status).toBe(400);
        });



    })


    describe("/login", () => {
        it("login pass", async () => {

            const res = await request(server)
                .post("/users/login")
                .send({

                    email: 'bbbbc@gmail.com',
                    password: 'bbbb',

                });
            // .expect(200);

            token = res.body.token;
            refreshToken = res.body.refresh_token;

            expect(res.status).toBe(200);
        });

        it("login fail", async () => {

            const res = await request(server)
                .post("/users/login")
                .send({

                    email: 'bbbb@gmail.com',
                    password: 'basc',

                });
            // .expect(200);

            expect(res.status).toBe(401);
        });
    })



    describe("/getme", () => {

        it("getme fail", async () => {

            const res = await request(server)
                .get("/users/me")
                .set('Authorization', 'abc123')
            // .expect(200);

            expect(res.status).toBe(401);
        });

        it("getme fail2", async () => {

            const res = await request(server)
                .get("/users/me")
                .set('authorization', 'Bearer 55assa')


            expect(res.status).toBe(401);
        });

        it("getme pass", async () => {

            const res = await request(server)
                .get("/users/me")
                .set('authorization', 'Bearer '.concat(token))


            expect(res.status).toBe(200);
        });
    })

    describe("/renewtoken", () => {
        it("renew pass", async () => {
            // await agent.post("/serviceProvider/sig").send({
            //   username: "Teflon International",
            // });
            const res = await request(server)
                .post("/users/renewToken")
                .set('authorization', 'Bearer '.concat(token))
                .send({

                    refresh_token: refreshToken,


                });
            // .expect(200);

            expect(res.status).toBe(200);
        });


        it("refresh_token fail", async () => {
            // await agent.post("/serviceProvider/sig").send({
            //   username: "Teflon International",
            // });
            const res = await request(server)
                .post("/users/renewToken")
                .send({

                });
            // .expect(200);

            expect(res.status).toBe(400);
        });
    })




});
