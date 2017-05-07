"use strict";

const express = require("express"),
    body_Parser = require("body-parser"),
    cors = require("cors");

const express_App = express();
express_App.use(cors());

express_App.use(body_Parser.json());

express_App.use(express.static('./client'));

express_App.use('/node_modules', express.static('./node_modules'));

const nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'leprechaunteam2017@gmail.com',
        pass: 'brakmabrakma'
    }
});

const MongoClient = require('mongodb').MongoClient;
let db;

MongoClient.connect('mongodb://admin:admin@ds151060.mlab.com:51060/ticket-system', (err, database) => {
    if (err) {
        return console.log(err);
    }

    db = database;

    function* idGenerator(lastIDinDB) {
        let id = 0;
        if (lastIDinDB) {
            id = lastIDinDB;
        }
        while (true) {
            yield id++;
        }
    }

    let id;
    db.collection('tickets').count().then(function(totalTicketsCount) {
        id = idGenerator(totalTicketsCount + 1);

        require('./utils/authorize-user')(express_App, db);

        // User routes
        const usersController = require("../server/controllers/users-controller")(db);
        express_App.get("/api/users", usersController.get);
        express_App.post("/api/users", usersController.post);
        express_App.put("/api/auth", usersController.put);

        // New ticket routes
        const ticketController = require("../server/controllers/ticket-controller.js")(id, db, transporter);
        express_App.post("/api/newticket", ticketController.post);
        //Update ticket
        express_App.get("/api/ticket", ticketController.get);
        express_App.put("/api/updateTicket", ticketController.put);

        // Listing the tickets routine
        const listing_Controller = require("../server/controllers/listings-controller.js")(db);
        express_App.post("/listing/page:page_Index/amount:number_Of_Pages", listing_Controller.post_For_Tickets);
        express_App.post("/listlength", listing_Controller.post_For_Length);

        //popover
        const popoverController = require("../server/controllers/popover-controller.js")(db);

        express_App.get("/api/popover", popoverController.get);

        // Start the server
        const port = 5000;
        express_App.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
    });
});
