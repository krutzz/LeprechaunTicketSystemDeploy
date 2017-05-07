module.exports = function(db) {
    const AUTH_KEY_LENGTH = 60,
        AUTH_KEY_CHARS = 'qwertyuiopasdfghjklzxcvbnmWERTYUIOPASDFGHJKLZXCVBNM';

    function validate(user) {
        const {
            username,
            frstname,
            lsname,
            email
        } = user;

        const regexUsername = /^[a-zA-Z0-9_\.]{6,30}$/;

        if (!regexUsername.test(username)) {
            return false;
        }

        const regexName = /^[a-zA-Z]{1,30}$/;

        if (!regexName.test(frstname)) {
            return false
        }

        if (!regexName.test(lsname)) {
            return false;
        }

        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!regexEmail.test(email)) {
            return false;
        }

        return true;
    }

    function generateAuthKey(uniquePart) {
        let authKey = uniquePart,
            index;
        while (authKey.length < AUTH_KEY_LENGTH) {
            index = Math.floor(Math.random() * AUTH_KEY_CHARS.length);
            authKey += AUTH_KEY_CHARS[index];
        }
        return authKey;
    }

    function get(req, res) {
        db.collection('users').find().toArray(function(e, userCollection) {
            let users = userCollection.map(function(user) {
                return {
                    username: user.username,
                    frstname: user.frstname,
                    lsname: user.lsname
                };
            });

            res.json({
                result: users
            });
        });

    }

    function post(req, res) {

        const user = req.body;
        if (!user || typeof user.username !== 'string' || typeof user.passHash !== 'string') {
            res.status(400)
                .json('Invalid user');
            return;
        }

        if (!validate(user)) {
            res.status(400)
                .json('Incorect user input data data');
            return;
        }

        db.collection('users').findOne({
            usernameToLower: user.username.toLowerCase()
        }, function(e, dbUser) {
            if (dbUser) {
                res.status(400)
                    .json('Duplicated user');
                return;
            }
            user.usernameToLower = user.username.toLowerCase();
            db.collection('users').insert(user);
            res.status(201)
                .json({
                    result: {
                        username: user.username
                    }
                });
        });

    }

    function put(req, res) {

        const reqUser = req.body;

        db.collection('users').findOne({
            usernameToLower: reqUser.username.toLowerCase()
        }, function(e, user) {
            if (!user || user.passHash !== reqUser.passHash) {
                res.status(404)
                    .json('Invalid username or password');
                return;
            }
            if (!user.authKey) {
                user.authKey = generateAuthKey(user.username);

                db.collection('users').update({
                    _id: user._id
                }, {
                    $set: {
                        'authKey': user.authKey
                    }
                });

            }

            res.json({
                result: {
                    username: user.username,
                    authKey: user.authKey
                }
            });
        });
    }

    return {
        get: get,
        post: post,
        put: put
    };
};
