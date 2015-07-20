$(document).ready(function() {

    setTimeout('$(".flashMessages").fadeOut(2000)', 2000);
    $('.dataTable').dataTable({
        "sPaginationType": "full_numbers",
        "bJQueryUI": false,
        "aaSorting": [[0, "asc"]],
        "iDisplayLength": 20,
        'aLengthMenu': [[10, 20, 30, 50], [10, 20, 30, 50]],
        'oLanguage': {
            "sZeroRecords": "No Data found"
        }
    });

});
