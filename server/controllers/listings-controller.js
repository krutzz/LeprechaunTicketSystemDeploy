module.exports = function(db) {

    function post_For_Length(request, response) {
        let page_Index = request.params.page_Index;

        db.collection('tickets').count().then(function(total_Tickets_Length) {
            console.log('Node says: post for length: ' + total_Tickets_Length);

            response.status(201)
                .json({
                    total_Tickets_Length: total_Tickets_Length
                });
        });
    }

    function post_For_Tickets(request, response) {
        let page_Index = request.params.page_Index;
        let number_Of_Pages = request.params.number_Of_Pages;

        db.collection('tickets').find().toArray(function(e, TicketCollection) {

            const array_Of_Tickets = TicketCollection.slice(page_Index * number_Of_Pages, number_Of_Pages + 1);
            console.log('Node says: post for Tickets ' + JSON.stringify(array_Of_Tickets));
            response.status(201)
                .json({
                    array_Of_Tickets: array_Of_Tickets
                });
        });
    }

    return {
        post_For_Tickets: post_For_Tickets,
        post_For_Length: post_For_Length
    };
};
