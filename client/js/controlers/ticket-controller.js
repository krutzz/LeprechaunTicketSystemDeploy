import * as templates from 'templates';
import * as data from 'data';
import { validateTicket } from 'validator';

function displayCreateTicketForm() {

    Promise.all([templates.get('newTicket'), data.getUsers()])
        .then(([template, users]) => {
            let currentDate = new Date().toString().split(' ');
            currentDate = currentDate[1] + " " + currentDate[2] + " " + currentDate[3] + " " + currentDate[4];

            $('#main-content').html(template({
                owner: data.getLoggedInUser(),
                date: currentDate,
                users: users.result,
                urgency: ["low", "mid", "high"]
            }));
            $('#sendNewTicket').on('click', submitForm);
            $('#select-engineer li a').on('click', selectOptionEngineer);
            $('#select-urgency li a').on('click', selectOptionUrgency);
        })
}

function displayUpdateTicketForm(params) {
    Promise.all([templates.get('updateTicket'), data.getTicket(params.id), data.getUsers()])
        .then(([template, ticketResponse, users]) => {
            const ticket = ticketResponse.result.ticket;
            const engineer = users.result.find(u => u.username.toLowerCase() === ticket.engineer.toLowerCase());
            $('#main-content').html(template({
                ticket: ticket,
                frstname: engineer.frstname,
                lsname: engineer.lsname,
                users: users.result,
                urgency: ["low", "mid", "high"],
                status: ["new", "in progress", "rejected", "resolved"]
            }));
            $('#updateTicket').on('click', updateTicket);
            $('#select-engineer li a').on('click', selectOptionEngineer);
            $('#select-urgency li a').on('click', selectOptionUrgency);
            $('#select-status li a').on('click', selectOptionStatus);
            $('#add-comment').on('click', addComment);
            $('.close-comment').on('click', closeComment);
        }, () => {
            $('#main-content').html('');
            const img = $('<img>');
            img.attr('src', './img/error-404.png');
            img.appendTo('#main-content');
        });
}

function selectOptionEngineer() {
    const currentSelection = $(this).text();
    const dataUserId = $(this).attr('data-user-id');

    $('#engineer').attr('data-user-id', dataUserId);
    $('#engineer-text').text(currentSelection);
}

function selectOptionUrgency() {
    const currentSelection = $(this).text();
    $('#urgency-text').text(currentSelection);
}

function selectOptionStatus() {
    const currentSelection = $(this).text();
    $('#status-text').text(currentSelection);
}

function addComment() {
    const text = $('#comment-text').val();
    $('#comment-text').val('');
    let currentDate = new Date().toString().split(' ');
    currentDate = currentDate[1] + " " + currentDate[2] + " " + currentDate[3] + " " + currentDate[4];
    const user = data.getLoggedInUser();
    const comment = {
        user: user,
        date: currentDate,
        text: text
    }
    templates.get('newCommentRow')
        .then(function(template) {
            $('#comments-panel').append(template(comment));
        });
    $('#comment').modal('hide')
}

function closeComment() {
    $('#comment-text').val('');
    $('#comment').modal('hide')
}

function submitForm() {
    const newTicket = {
        user: $('#userName').text(),
        shortDescription: $('#shortDescription').val(),
        longDescription: $('#lognDescription').val(),
        date: new Date() + "",
        engineer: $('#engineer').attr('data-user-id'),
        urgency: $('#urgency-text').text(),
        status: "new"
    }

    if (validateTicket(newTicket)) {
        data.sendNewTicket(newTicket)
            .then(function(successObj) {
                toastr.success(`Ticket ${successObj.result.ticketId} successfully filed.`);
                $('#main-content').text('');
                document.location.href = '#';
            }, function(err) {
                toastr.error(err.responseJSON);
            })
    };
}

function updateTicket() {
    const comments = getNewComments();
    const ticket = {
        id: Number($('#ticketID').text()),
        user: $('#userName').text(),
        shortDescription: $('#shortDescription').val(),
        longDescription: $('#lognDescription').val(),
        engineer: $('#engineer').attr('data-user-id'),
        urgency: $('#urgency-text').text(),
        status: $('#status-text').text(),
        comments: comments
    }

    if (validateTicket(ticket)) {
        data.updateTicket(ticket)
            .then(function(successObj) {
                toastr.success('Ticket successfully updated.');
                $('#main-content').text('');
                document.location.href = '#';
            }, function(err) {
                toastr.error(err.responseJSON);
            })
    };
}

function getNewComments() {
    const comments = [];
    $('.new-comment').each(function(index, el) {
        const user = el.children[0].children[0].children[0].children[0].textContent;
        const date = el.children[0].children[0].children[0].children[1].textContent;
        const text = el.children[0].children[0].children[1].textContent;
        comments.push({
            user: user,
            date: date,
            text: text
        });
    });
    return comments;
}

function initQuickSerachEvent() {
    $('#quick-serach-button').on('click', function() {
        const input = $('#quick-serach-input');
        if (!input.val()) {
            toastr.error("Quick Serach is empty");
        } else {
            $('[data-toggle="popover"]').popover('hide');
            document.location.href = '#/ticket/' + input.val();
            input.val('');
        }
    });
}


export {
    displayCreateTicketForm,
    displayUpdateTicketForm,
    initQuickSerachEvent
}
