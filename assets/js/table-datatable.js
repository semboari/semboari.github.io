$(document).ready(function () {
    $('#myTable').DataTable({
        scrollY: '300px',
        dom: 'Bfrtip',
        button: [{
                extend: 'pdf',
                oriented: 'Lanscape',
                pageSize: 'A4',
                title: 'SIPAK',
                download: 'open'
            },
            'csv', 'excel', 'print', 'copy'
        ],
    });
});