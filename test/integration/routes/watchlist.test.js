/* eslint-disable */

const request = require("supertest");


const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.TEST_MONGODB_CONNECT_URI;
mongoose.connect(url);
const { User } = require('../../../models/user');
let server;
let token;
let userid;
let refreshToken;


jest.setTimeout(60000);

describe("/servicer", () => {

    beforeEach(() => {
        server = require("../../../testserver");
    })

    beforeAll(async () => {
        server = require("../../../testserver");
        await User.remove({})

        await request(server)
            .post("/users")
            .send({
                first_name: 'asas',
                last_name: 'sadsada',
                email: 'bbbb@gmail.com',
                password: 'bbbb',
                user_type: 'USER',
            });

        const res = await request(server)
            .post("/users/login")
            .send({

                email: 'bbbb@gmail.com',
                password: 'bbbb',

            });

        console.log(res.body.token);


        token = res.body.token;
        userid = res.body._id.toString();
        refreshToken = res.body.refresh_token;
        console.log(userid);
    })

    afterEach(() => {
        server.close();

    })

    afterAll(async () => {
        // await User.remove({})
        await mongoose.connection.close();
    })


    describe("/save item", () => {

        it("save item pass", async () => {
            // await agent.post("/serviceProvider/sig").send({
            //   username: "Teflon International",
            // });
            const res = await request(server)
                .post("/watchlist/saveitem")
                .set('authorization', 'Bearer '.concat(token))
                .send({
                    symbolId: "62f0960d419406d5471fb5c7",
                    userId: userid,

                });
            // .expect(200);

            expect(res.status).toBe(200);
        });
        it("save item fail1", async () => {
            // await agent.post("/serviceProvider/sig").send({
            //   username: "Teflon International",
            // });
            const res = await request(server)
                .post("/watchlist/saveitem")
                .set('authorization', 'Bearer '.concat(token))
                .send({

                    userId: userid,

                });
            // .expect(200);

            expect(res.status).toBe(400);
        });

        it("save item fail12", async () => {
            // await agent.post("/serviceProvider/sig").send({
            //   username: "Teflon International",
            // });
            const res = await request(server)
                .post("/watchlist/saveitem")
                .set('authorization', 'Bearer '.concat(token))
                .send({
                    symbolId: "62f0960d419406d5471fb5c7",
                    userId: "5s55sd5",

                });
            // .expect(200);

            expect(res.status).toBe(401);
        });

    })

    describe("/get item list", () => {

        it("get items pass", async () => {
            // await agent.post("/serviceProvider/sig").send({
            //   username: "Teflon International",
            // });
            const res = await request(server)
                .post("/watchlist/getitemlist")
                .set('authorization', 'Bearer '.concat(token))
                .send({
                    userId: userid
                });
            // .expect(200);

            expect(res.status).toBe(200);
        });

        it("get items fail1", async () => {
            // await agent.post("/serviceProvider/sig").send({
            //   username: "Teflon International",
            // });
            const res = await request(server)
                .post("/watchlist/getitemlist")
                .set('authorization', 'Bearer '.concat(token))
                .send({

                });
            // .expect(200);

            expect(res.status).toBe(400);

        });

        it("get items fail2", async () => {
            // await agent.post("/serviceProvider/sig").send({
            //   username: "Teflon International",
            // });
            const res = await request(server)
                .post("/watchlist/getitemlist")
                .set('authorization', 'Bearer '.concat(token))
                .send({
                    userId: "54445454"
                });
            // .expect(200);

            expect(res.status).toBe(400);
        });



    });


    describe("/remove item", () => {

        it("remove item pass", async () => {
            // await agent.post("/serviceProvider/sig").send({
            //   username: "Teflon International",
            // });
            const res = await request(server)
                .post("/watchlist/removeitem")
                .set('authorization', 'Bearer '.concat(token))
                .send({
                    symbolId: "62f0960d419406d5471fb5c7",
                    userId: userid,

                });
            // .expect(200);

            expect(res.status).toBe(200);
        });
        it("remove item fail1", async () => {
            // await agent.post("/serviceProvider/sig").send({
            //   username: "Teflon International",
            // });
            const res = await request(server)
                .post("/watchlist/removeitem")
                .set('authorization', 'Bearer '.concat(token))
                .send({

                    userId: userid,
                    

                });
            // .expect(200);

            expect(res.status).toBe(400);
        });
        it("remove item fail1", async () => {
            // await agent.post("/serviceProvider/sig").send({
            //   username: "Teflon International",
            // });
            const res = await request(server)
                .post("/watchlist/removeitem")
                .set('authorization', 'Bearer '.concat(token))
                .send({
                    symbolId: "62f0960d419406d5471fb5c7",
                    userId: "hhhshas",
                    

                });
            // .expect(200);

            expect(res.status).toBe(401);
        });

     
    })




});
