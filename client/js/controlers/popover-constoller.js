import * as data from 'data';

function initiatePopover() {
    $('[data-toggle="popover"]').popover({
        html: true,
        content: ""
    });
    updatePopover();
}

function updatePopover() {
    $('#quick-serach-input').keyup(function () {
        const popover = $('[data-toggle="popover"]').data('bs.popover');
        const currentInput = ($('#quick-serach-input').val());
        let popoverText = data.getPopoverValue(currentInput)
        popoverText.then(function (success) {
            popover.options.content = "";
            if (success.result.tickets.length === 0) {
                $('[data-toggle="popover"]').popover('hide');
            } else {
                popover.options.content = success.result.tickets.join(", ");
                $('[data-toggle="popover"]').popover('show');
            }
        });
    });
}
export {
    initiatePopover
}