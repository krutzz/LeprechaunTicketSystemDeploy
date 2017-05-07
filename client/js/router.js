import * as users from 'users';
import * as tickets from 'tickets';
import * as ticket from 'ticket';

function initRouter() {

    const router = new Navigo(null, false);

    router
        .on('register', () => users.register())
        .on('login', () => users.loginForm())
        .on('logout', () => users.logout())
        .on('NewTicket', () => {
            ticket.displayCreateTicketForm()
        })
        .on('ticket/:id', (params) => ticket.displayUpdateTicketForm(params))
        .on('paginacalls/:page_Index', function(params) {
            // paginator will call this when clicked and
            // navigo will take it to this function which will call the server
            tickets.display_Tickets(params.page_Index);
        })
        .on('/', () => {
            // this will be called when user clicks on bug-icon from other pages
            tickets.display_Tickets(+(window.sessionStorage.getItem('current_page_index')));
        });
}

export {
    initRouter
};
