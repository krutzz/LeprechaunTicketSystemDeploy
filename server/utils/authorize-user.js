module.exports = function(express_App, db) {
    // tell Express to asociate the paths whose roots match with the root param with a funciton
    express_App.use('/api', function(req, res, next) {
        const authKey = req.headers['x-auth-key'];

        const dbUserCursor = db.collection('users').findOne({
            authKey: authKey
        }, function(e, user) {
            req.user = user;
            next();
        });
    });
};
