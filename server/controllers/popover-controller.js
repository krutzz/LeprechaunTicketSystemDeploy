module.exports = function (db) {

    function get(req, res) {
        const inputValue = req.headers.inputvalue || {};
        try {
            db.collection('tickets').find().toArray(function (e, ticketsList) {
                const tickets = ticketsList.map(t => t.id.toString());
                const result = [];
                tickets.forEach(t => {
                    if (t.indexOf(inputValue) >= 0) {
                        result.push(t);
                    }
                })
                res.status(201)
                    .json({
                        result: {
                            tickets: result
                        }
                    });
            });
        } catch (err) {
            res.status(400)
                .json('Invalid input value');
            return;
        }
    }
    return {
        get: get,
    }

}