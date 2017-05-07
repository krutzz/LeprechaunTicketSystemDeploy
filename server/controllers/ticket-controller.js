module.exports = function(idGenerator, db, transporter) {

    function get(req, res) {
        const user = req.user;
        if (!user) {
            res.status(400)
                .json('Invalid user');
            return;
        }
        const ticketID = req.headers['ticket'];
        if (!ticketID) {
            res.status(400)
                .json('Invalid ticket id');
            return;
        }
        db.collection('tickets').aggregate([{
            $lookup: {
                from: "comments",
                localField: "id",
                foreignField: "id",
                as: "comments"
            }
        }]).toArray(function(e, TicketCollection) {
            const id = ticketID | 0;
            const ticket = TicketCollection.find(t => t.id === id);
            if (!ticket) {
                res.status(404)
                    .json('Ticket not found');
                return;
            }
            res.status(201)
                .json({
                    result: {
                        ticket
                    }
                });
        });
    }

    function post(req, res) {
        let ticket = req.body;
        let status = true;

        for (let keys in ticket) {
            if (ticket[keys].match(/([<>&])/gm)) {
                status = false;
                res.status(401)
                    .json("You can't use symbols like < > and & in field " + keys);
                return;
            } else if ((ticket[keys] === "" || ticket[keys] === undefined) && keys != "comment") {
                status = false;
                res.status(401)
                    .json("You can't have empty filed " + keys);
                return;
            }
        }
        if (ticket.engineer === 'select') {
            status = false;
            res.status(401)
                .json("Please select enigneer!");
            return;
        }
        if (ticket.urgency === 'Select Urgency') {
            status = false;
            res.status(401)
                .json("Please select urgency status!");
            return;
        }
        ticket.id = idGenerator.next().value;

        if (status) {
            db.collection('tickets').insert(ticket);
            sendEmail(ticket, 'engineer', 'new ticket created');
            res.status(201)
                .json({
                    result: {
                        status: 'success',
                        ticketId: ticket.id
                    }
                });
        }
    }

    function put(req, res) {
        const user = req.user;
        const ticket = req.body;
        if (!user) {
            res.status(400)
                .json('Invalid user');
            return;
        }

        db.collection('tickets').update({
            id: ticket.id
        }, {
            $set: {
                shortDescription: ticket.shortDescription,
                longDescription: ticket.longDescription,
                engineer: ticket.engineer,
                urgency: ticket.urgency,
                status: ticket.status
            }
        });

        ticket.comments.forEach(function(comment) {
            const element = {
                id: ticket.id,
                comment: comment
            };
            db.collection('comments').insert(element);
        });

        sendEmail(ticket, 'engineer', 'Ticket updated');
        sendEmail(ticket, 'user', 'Ticket updated');
        res.status(201)
            .json({
                result: {
                    status: 'success'
                }
            });
    }

    function sendEmail(ticket, userType, subject) {
        db.collection('users').findOne({
            usernameToLower: ticket[userType].toLowerCase()
        }, function(e, dbUser) {
            if (dbUser) {
                const mailBody = `
                ID: ${ticket.id}
                Short Description: ${ticket.shortDescription}
                Long Description: ${ticket.longDescription}
                Urgency: ${ticket.urgency}
                                  `;
                let mailOptions = {
                    from: '"Leprechaun Team" <noreply@leprechaun.com>',
                    to: dbUser.email,
                    subject: subject,
                    text: mailBody,
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                });
            }
        });
    }

    return {
        get: get,
        post: post,
        put: put
    };
};
