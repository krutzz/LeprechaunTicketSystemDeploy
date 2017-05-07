import * as templates_Generator from 'templates';   // './js/templates_Generator.js',
import * as db_Queryer from 'data';                 // './js/db_Queryer.js'


const max_Number_Of_Neighbor_Pages = 3;
const number_Of_tickets_Per_Page = 8;

let tableObjObj = {
    tickets : [
        {
            "table_Tags": {
                "id": "5321",
                "worker": "worker Name",
                "start_Date": "2017-04-26",
                "status": "unresolved",
                "engneer": "somebody",
                "urgency": "blah"
            },
            "descriptions": {
                "very_Short_Description": "bad work",
                "full_Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum, ante eget maximus lobortis, massa diam pharetra lectus, eu auctor neque justo ac risus. Phasellus ac dignissim neque, ultricies elementum quam. In nec diam non dui laoreet vulputate sit amet sit amet quam. Curabitur accumsan pharetra arcu non pharetra. ",
                "additional_Comments": "additional comments goes here fndsajngibdsihbfosoaIJHFBDOIJHSABFHDB JNJjnf nf nbf hbB FSAHJFB JHlfs fblhHSBLK",
            }
        },
        {
            "table_Tags": {
                "id": "5321",
                "worker": "worker Name",
                "start_Date": "2017-04-26",
                "status": "unresolved",
                "engneer": "somebody",
                "urgency": "blah"
            },
            "descriptions": {
                "very_Short_Description": "bad work",
                "full_Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum, ante eget maximus lobortis, massa diam pharetra lectus, eu auctor neque justo ac risus. Phasellus ac dignissim neque, ultricies elementum quam. In nec diam non dui laoreet vulputate sit amet sit amet quam. Curabitur accumsan pharetra arcu non pharetra. ",
                "additional_Comments": "additional comments goes here fndsajngibdsihbfosoaIJHFBDOIJHSABFHDB JNJjnf nf nbf hbB FSAHJFB JHlfs fblhHSBLK",
            }
        },
        {
            "table_Tags": {
                "id": "5321",
                "worker": "worker Name",
                "start_Date": "2017-04-26",
                "status": "unresolved",
                "engneer": "somebody",
                "urgency": "blah"
            },
            "descriptions": {
                "very_Short_Description": "bad work",
                "full_Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum, ante eget maximus lobortis, massa diam pharetra lectus, eu auctor neque justo ac risus. Phasellus ac dignissim neque, ultricies elementum quam. In nec diam non dui laoreet vulputate sit amet sit amet quam. Curabitur accumsan pharetra arcu non pharetra. ",
                "additional_Comments": "additional comments goes here fndsajngibdsihbfosoaIJHFBDOIJHSABFHDB JNJjnf nf nbf hbB FSAHJFB JHlfs fblhHSBLK",
            }
        },
        {
            "table_Tags": {
                "id": "5321",
                "worker": "worker Name",
                "start_Date": "2017-04-26",
                "status": "unresolved",
                "engneer": "somebody",
                "urgency": "blah"
            },
            "descriptions": {
                "very_Short_Description": "bad work",
                "full_Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum, ante eget maximus lobortis, massa diam pharetra lectus, eu auctor neque justo ac risus. Phasellus ac dignissim neque, ultricies elementum quam. In nec diam non dui laoreet vulputate sit amet sit amet quam. Curabitur accumsan pharetra arcu non pharetra. ",
                "additional_Comments": "additional comments goes here fndsajngibdsihbfosoaIJHFBDOIJHSABFHDB JNJjnf nf nbf hbB FSAHJFB JHlfs fblhHSBLK",
            }
        },
        {
            "table_Tags": {
                "id": "5321",
                "worker": "worker Name",
                "start_Date": "2017-04-26",
                "status": "unresolved",
                "engneer": "somebody",
                "urgency": "blah"
            },
            "descriptions": {
                "very_Short_Description": "bad work",
                "full_Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum, ante eget maximus lobortis, massa diam pharetra lectus, eu auctor neque justo ac risus. Phasellus ac dignissim neque, ultricies elementum quam. In nec diam non dui laoreet vulputate sit amet sit amet quam. Curabitur accumsan pharetra arcu non pharetra. ",
                "additional_Comments": "additional comments goes here fndsajngibdsihbfosoaIJHFBDOIJHSABFHDB JNJjnf nf nbf hbB FSAHJFB JHlfs fblhHSBLK",
            }
        },
        {
            "table_Tags": {
                "id": "5321",
                "worker": "worker Name",
                "start_Date": "2017-04-26",
                "status": "unresolved",
                "engneer": "somebody",
                "urgency": "blah"
            },
            "descriptions": {
                "very_Short_Description": "bad work",
                "full_Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum, ante eget maximus lobortis, massa diam pharetra lectus, eu auctor neque justo ac risus. Phasellus ac dignissim neque, ultricies elementum quam. In nec diam non dui laoreet vulputate sit amet sit amet quam. Curabitur accumsan pharetra arcu non pharetra. ",
                "additional_Comments": "additional comments goes here fndsajngibdsihbfosoaIJHFBDOIJHSABFHDB JNJjnf nf nbf hbB FSAHJFB JHlfs fblhHSBLK",
            }
        }
    ]
};

// display the centarl drop-down item
function display_Tickets(current_Page_Index) {

    // retrieve from db_Queryer base the right chunk/amount of tickets
    //let tickets_Range = db_Queryer.get_Tickets_Range(current_Page_Index, number_Of_tickets_Per_Page);  

    let tickets_Range = tableObjObj;
    
    //// load a template
    templates_Generator.get('main')
        .then(function (compilled_To_Func_Template) {
            // display the template to HTML
            $('#main-content').html(compilled_To_Func_Template(tickets_Range));

            // add event listeners
            // TODO: plus minus switching doesnt work, it drop-downs well but doesnt change the icon acurrately
            $('.plus').on('click', changeGliph);
        });
    
    display_Pagination(current_Page_Index);
}

function display_Pagination(current_Page_Index) {

    // retrieve from db_Queryer base the right chunk/amount of tickets
    //let number_Of_All_tickets = db_Queryer.get_Tickets_Numb();
    let number_Of_All_tickets = 1450;
    
    let last_Page_Index = Math.ceil(number_Of_All_tickets / number_Of_tickets_Per_Page); // one based
    last_Page_Index = 9;
    current_Page_Index = 9; // one based

    // draw the paniataro only if there is more than one pages to show
    if (last_Page_Index > 1) {

        let pagination_Content = { nav_Content: [] };

        if (last_Page_Index == 2) {

            // display special case of paginator with two coices
            if (current_Page_Index == 0) {
                pagination_Content.nav_Content.push(
                    {
                        target_Page_Offset: null,
                        arias_Description: null,
                        user_Visible: '..'
                    }
                );
                pagination_Content.nav_Content.push(
                    {
                        target_Page_Offset: '2',
                        arias_Description: 'last page',
                        user_Visible: String.fromCharCode(187)  // &raquo;
                    }
                );
            } else {
                pagination_Content.nav_Content.push(
                    {
                        target_Page_Offset: '1',
                        arias_Description: 'first page',
                        user_Visible: String.fromCharCode(171)  // &laquo;
                    }
                );
                pagination_Content.nav_Content.push(
                    {
                        target_Page_Offset: null,
                        arias_Description: null,
                        user_Visible: '..'
                    }
                );
            }
        } else {

            // now a coomon logic can express the rest of the cases

            // print the elements up to the current element
            if (current_Page_Index == 1) {
                // set first element to itself
                pagination_Content.nav_Content.push(
                    {
                        target_Page_Offset: null,
                        arias_Description: null,
                        user_Visible: '..'
                    }
                );
            } else {
                let current_Number_Of_Neighbor_Pages;
                let bottom_Page_Index;

                if (current_Page_Index - max_Number_Of_Neighbor_Pages > 1) {
                    current_Number_Of_Neighbor_Pages = max_Number_Of_Neighbor_Pages;
                    bottom_Page_Index = current_Page_Index - max_Number_Of_Neighbor_Pages;
                } else {
                    current_Number_Of_Neighbor_Pages = (current_Page_Index - max_Number_Of_Neighbor_Pages) + 1;
                    bottom_Page_Index = 2;
                }

                // set first element to default
                pagination_Content.nav_Content.push(
                    {
                        target_Page_Offset: '1',
                        arias_Description: 'first page',
                        user_Visible: String.fromCharCode(171)  // &laquo;
                    }
                );
                
                let i = bottom_Page_Index;
                let j = 0;

                while (j < current_Number_Of_Neighbor_Pages) {
                    pagination_Content.nav_Content.push(
                        {
                            target_Page_Offset: '' + i,   // one based
                            arias_Description: numberToWords.toWordsOrdinal(i) + ' page', // converts numb 21 to "twenty first" for example
                            user_Visible: '' + i++    //one based
                        }
                    );
                    j++;
                }

                // point the current page element to point ot null
                pagination_Content.nav_Content.push(
                    {
                        target_Page_Offset: null,
                        arias_Description: null,
                        user_Visible: '..'  // &raquo;
                    }
                );
            }

            if (current_Page_Index < last_Page_Index) {

                let i = current_Page_Index + 1;
                let j = 0;

                while (i < last_Page_Index && j < max_Number_Of_Neighbor_Pages) {
                    pagination_Content.nav_Content.push(
                        {
                            target_Page_Offset: '' + i,   // one based
                            arias_Description: numberToWords.toWordsOrdinal(i) + ' page', // converts numb 21 to "twenty first" for example
                            user_Visible: '' + i++    //one based
                        }
                    );
                    j++;
                }
                
                // set last element to default
                pagination_Content.nav_Content.push(
                    {
                        target_Page_Offset: '' + last_Page_Index,
                        arias_Description: 'last page',
                        user_Visible: String.fromCharCode(187)  // &raquo;
                    }
                );
            }
        }

        // get little small HTML(func) for the pagination
        let pagination = templates_Generator.get('pagination')
            .then(function (template) {
                $('#main-content').append(template(pagination_Content))
            });
    }
}

function changeGliph() {
    let $this = $(this);
    if ($this.hasClass('glyphicon-plus')) {
        $this.removeClass('glyphicon-plus');
        $this.addClass('glyphicon-minus');
    } else {
        $this.removeClass('glyphicon-minus');
        $this.addClass('glyphicon-plus');
    }
}

export {
    display_Tickets
};