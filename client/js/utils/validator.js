function validateTicket(ticket) {
    for (let keys in ticket) {
        if (keys !== "id" && keys !== "comments") {
            if (ticket[keys].match(/([<>&])/gm)) {
                toastr.error("You can't use symbols <> and & in " + keys);
                return false;
            } else if ((ticket[keys] === "" || ticket[keys] === undefined) && keys !== "comment") {
                toastr.error("You can't have empty filed  " + keys);
                return false;
            }
        }
    }

    if (ticket.engineer === 'select') {
        toastr.error("Please select Enigneer!");
        return false;
    }

    if (ticket.urgency === 'Select Urgency') {
        toastr.error("Please select Urgency status!");
        return false;
    }

    return true;
}

export {
    validateTicket
}
