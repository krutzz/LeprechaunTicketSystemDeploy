import * as requester_JSON from 'json-requester';

const USERNAME_LOCAL_STORAGE_KEY = 'signed-in-user-username',
    AUTH_KEY_LOCAL_STORAGE_KEY = 'signed-in-user-auth-key';

/* Users */

function register(user) {
    const reqUser = {
        username: user.username,
        passHash: CryptoJS.SHA256(user.pass).toString(),
        frstname: user.frstname,
        lsname: user.lsname,
        email: user.email
    };

    return requester_JSON.post('api/users', {
            data: reqUser
        })
        .then(function(resp) {
            const user = resp.result;
            return {
                username: resp.result.username
            };
        });
}

function login(username, pass) {
    const passHash = CryptoJS.SHA256(pass).toString();
    return requester_JSON.put('api/auth', {
        data: {
            username,
            passHash
        }
    });
}

function getUsers() {
    return requester_JSON.get('/api/users', {});
}

function getLoggedInUser() {
    if (isLoggedIn()) {
        return localStorage.getItem(USERNAME_LOCAL_STORAGE_KEY)
    } else {
        return 'unknown';
    }
}

function isLoggedIn() {
    if (localStorage.getItem(AUTH_KEY_LOCAL_STORAGE_KEY)) {
        return true;
    } else {
        return false;
    }
}
/* NewTickets*/

function sendNewTicket(ticketObj) {
    return requester_JSON.post('api/newticket', {
            data: ticketObj
        })
        .then(function(resp) {
            return {
                result: resp.result
            }
        });

}

function updateTicket(ticket) {
    const options = {
        headers: {
            'x-auth-key': localStorage.getItem(AUTH_KEY_LOCAL_STORAGE_KEY)
        },
        data: ticket
    };
    return requester_JSON.put('api/updateTicket', options)
        .then(function(resp) {
            return {
                result: resp.result
            }
        });
}

// get the tickets from <-> to
function get_Tickets_Range(page_Index, number_Of_tickets_Per_Page) {
    return requester_JSON.post('/listing/page' + page_Index + '/amount' + number_Of_tickets_Per_Page, {

        })
        .then(function(resp) {
            return {
                result: resp.result
            }
        });
}

// get the total amount of tickets
function get_Tickets_Numb() {
    return requester_JSON.post('/listlength', {

        })
        .then(function(resp) {
            return {
                result: resp.result
            }
        });
}

function getTicket(ticketId) {
    const options = {
        headers: {
            'x-auth-key': localStorage.getItem(AUTH_KEY_LOCAL_STORAGE_KEY),
            'ticket': ticketId
        }
    };
    return requester_JSON.get('api/ticket', options)
}

function getPopoverValue(inputValue){
    const options={
        headers:{
            inputValue:inputValue
        }
    };
    return requester_JSON.get('api/popover', options)

}
export {
    register,
    login,
    getUsers,
    isLoggedIn,
    getLoggedInUser,
    sendNewTicket,
    updateTicket,
    get_Tickets_Range,
    get_Tickets_Numb,
    getTicket,
    getPopoverValue
}
