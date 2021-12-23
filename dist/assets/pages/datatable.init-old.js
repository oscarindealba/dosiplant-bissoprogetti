/**
 * Theme: Metrica - Responsive Bootstrap 5 Admin Dashboard
 * Author: Mannatthemes
 * Datatables Js
 */
//define data array
var tabledata = [
    { id: 1, name: "Oli Bob", id: 6, other: "male", receta: "Receta 1", silo: 4, timest: "19/02/1984 13:25", peso: 850 },
    { id: 2, name: "Mary May", id: 5, gender: "female", receta: "Receta 1", silo: 3, timest: "14/05/1982", peso: 320 },
    { id: 3, name: "Christine Lobowski", id: 4, gender: "female", receta: "Receta 1", silo: 2, timest: "22/05/1982", peso: 450 },
    { id: 4, name: "Brendon Philips", id: 3, gender: "male", receta: "Receta 2", silo: 5, timest: "01/08/1980", peso: 210 },
    { id: 5, name: "Margret Marmajuke", id: 2, gender: "female", receta: "Receta 2", silo: 3, timest: "31/01/1999", peso: 587 },
    { id: 6, name: "Frank Harbours", id: 1, gender: "male", receta: "Receta 2", silo: 2, timest: "12/05/1966", peso: 25 },
    { id: 1, name: "Oli Bob", id: 12, gender: "male", receta: 1, silo: "red", timest: "19/02/1984", peso: 1 },
    { id: 2, name: "Mary May", id: 1, gender: "female", receta: 2, silo: "blue", timest: "14/05/1982", peso: true },
    { id: 3, name: "Christine Lobowski", id: 42, gender: "female", receta: 0, silo: "green", timest: "22/05/1982", peso: "true" },
    { id: 4, name: "Brendon Philips", id: 100, gender: "male", receta: 1, silo: "orange", timest: "01/08/1980" },
    { id: 5, name: "Margret Marmajuke", id: 16, gender: "female", receta: 5, silo: "yellow", timest: "31/01/1999" },
    { id: 6, name: "Frank Harbours", id: 38, gender: "male", receta: 4, silo: "red", timest: "12/05/1966", peso: 1 },
];


var consumos = [
    { silo: 1, consumo: 676 },
    { silo: 2, consumo: 10563 },
    { silo: 3, consumo: 574 },
    { silo: 4, consumo: 20563 },
    { silo: 5, consumo: 5222 },
    { silo: 6, consumo: 778 },
    { silo: 7, consumo: 8582 },

];

// var table = new Tabulator("#datatable-1", {
//     data: tabledata, //load row data from array
//     layout: "fitColumns", //fit columns to width of table
//     responsiveLayout: "collapse", //hide columns that dont fit on the table
//     tooltips: true, //show tool tips on cells
//     addRowPos: "top", //when adding a new row, add it to the top of the table
//     history: true, //allow undo and redo actions on the table
//     pagination: "local", //paginate the data
//     paginationSize: 10, //allow 7 rows per page of data
//     movableColumns: true, //allow column order to be changed
//     resizableRows: true, //allow row order to be changed
//     initialSort: [ //set the initial sort order of the data
//         { column: "name", dir: "asc" },
//     ],
//     columns: [ //define the table columns
//         { title: "Name", field: "name", editor: "input" },
//         { title: "Task Progress", field: "progress", hozAlign: "left", formatter: "progress", editor: true },
//         { title: "Gender", field: "gender", width: 95, editor: "select", editorParams: { values: ["male", "female"] } },
//         { title: "Rating", field: "rating", formatter: "star", hozAlign: "center", width: 100, editor: true },
//         { title: "Color", field: "col", width: 130, editor: "input" },
//         { title: "Date Of Birth", field: "dob", width: 130, sorter: "date", hozAlign: "center" },
//         { title: "Driver", field: "car", width: 90, hozAlign: "center", formatter: "tickCross", sorter: "boolean", editor: true },
//     ],
// });



var table = new Tabulator("#datatable-2", {
    layout: "fitColumns",
    height: "310px",
    responsiveLayout: "collapse",
    autoColumns: false,
    data: consumos,
    columns: [
        { formatter: "responsiveCollapse", width: 30, minWidth: 30, hozAlign: "center", resizable: false, headerSort: true },
        { title: "Num Silo", field: "silo", width: 150, hozAlign: "center", },
        { title: "Consumo en Kg", field: "consumo", hozAlign: "center", sorter: "number", width: 150 },


    ],

    // autoColumns:true,
});

// Menu

//define row context menu contents
var rowMenu = [{
        label: "<i class='fas fa-user'></i> Change Name",
        action: function(e, row) {
            row.update({ name: "Steve Bobberson" });
        }
    },
    {
        label: "<i class='fas fa-check-square'></i> Select Row",
        action: function(e, row) {
            row.select();
        }
    },
    {
        separator: true,
    },
    {
        label: "Admin Functions",
        menu: [{
                label: "<i class='fas fa-trash'></i> Delete Row",
                action: function(e, row) {
                    row.delete();
                }
            },
            {
                label: "<i class='fas fa-ban'></i> Disabled Option",
                disabled: true,
            },
        ]
    }
]

//define column header menu as column visibility toggle
var headerMenu = function() {
    var menu = [];
    var columns = this.getColumns();

    for (let column of columns) {

        //create checkbox element using font awesome icons
        let icon = document.createElement("i");
        icon.classList.add("fas");
        icon.classList.add(column.isVisible() ? "fa-check-square" : "fa-square");

        //build label
        let label = document.createElement("span");
        let title = document.createElement("span");

        title.textContent = " " + column.getDefinition().title;

        label.appendChild(icon);
        label.appendChild(title);

        //create menu item
        menu.push({
            label: label,
            action: function(e) {
                //prevent menu closing
                e.stopPropagation();

                //toggle current column visibility
                column.toggle();

                //change menu item icon
                if (column.isVisible()) {
                    icon.classList.remove("fa-square");
                    icon.classList.add("fa-check-square");
                } else {
                    icon.classList.remove("fa-check-square");
                    icon.classList.add("fa-square");
                }
            }
        });
    }

    return menu;
};

//initialize table
var table = new Tabulator("#datatable-3", {
    layout: "fitDataFill",
    height: "310px",
    responsiveLayout: "collapse",
    rowContextMenu: rowMenu, //add context menu to rows
    columns: [
        { title: "ID", field: "id", sorter: "number", headerMenu: headerMenu }, //add menu to this column header
        { title: "Marca de tiempo", field: "timest", headerMenu: headerMenu },
        { title: "Receta", field: "receta", hozAlign: "center", headerMenu: headerMenu },
        { title: "Numero de silo", field: "silo", hozAlign: "center", headerMenu: headerMenu },
        { title: "Peso agregado", field: "peso", hozAlign: "center", headerMenu: headerMenu },
    ],
    data: tabledata,
});

//trigger download of data.csv file
// document.getElementById("download-csv").addEventListener("click", function() {
//     table.download("csv", "data.csv");
// });

//trigger download of data.json file
// document.getElementById("download-json").addEventListener("click", function() {
//     table.download("json", "data.json");
// });

//trigger download of data.xlsx file
// document.getElementById("download-xlsx").addEventListener("click", function() {
//     table.download("xlsx", "data.xlsx", { sheetName: "Reporte" });
// });

//trigger download of data.pdf file
// document.getElementById("download-pdf").addEventListener("click", function() {
//     table.download("pdf", "data.pdf", {
//         orientation: "portrait", //set page orientation to portrait
//         title: "Reporte de producción", //add title to report
//     });
// });

//trigger download of data.html file
// document.getElementById("download-html").addEventListener("click", function() {
//     table.download("html", "data.html", { style: true });
// });