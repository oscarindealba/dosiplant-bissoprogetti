const API_USERS = "http://localhost:8081/api/consumos/";
const xhr = new XMLHttpRequest();
var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "portrait" });




function onRequestHandler() {
    let datTabl2 = [];
        let datTabl1 = [];

    if (this.readyState === 4 && this.status === 200) {

        const datosTabla = JSON.parse(this.response);
        datTabl2 = datosTabla[0];
        datTabl1 = datosTabla[1];
        console.log(datTabl2);


        var table = new Tabulator("#datatable-3", {
            layout: "fitDataFill",
            height: "650px",
            pagination: "local",
            paginationSize: 12,
            addRowPos: "top",
            responsiveLayout: "collapse",
            movableColumns: true,
            resizableRows: false,
            initialSort: [
                { column: "createdAt", dir: "desc" },
            ],
            rowContextMenu: rowMenu,
            columns: [
                // { title: "ID", field: "id", sorter: "number", headerMenu: headerMenu }, //add menu to this column header
                { title: "Marca de tiempo", field: "createdAt", headerMenu: headerMenu },
                { title: "Numero de batch", field: "id", hozAlign: "center", headerMenu: headerMenu },
                { title: "Formula", field: "formula", hozAlign: "center", headerMenu: headerMenu },
                { title: "Numero de silo", field: "numsilo", hozAlign: "center", headerMenu: headerMenu },
                { title: "Tipo", field: "gruposilo", hozAlign: "center", headerMenu: headerMenu },
                { title: "Peso Real", field: "setpoint", hozAlign: "center", headerMenu: headerMenu },
            ],
            data: datTabl1,
        });



        var table2 = new Tabulator("#datatable-2", {
            layout: "fitColumns",
            height: "387px",
            responsiveLayout: "collapse",
            autoColumns: false,
            data: datTabl2,
            columns: [
                { formatter: "responsiveCollapse", width: 30, minWidth: 30, hozAlign: "center", resizable: false, headerSort: true },
                { title: "Numero de  Silo", field: "silo", width: 150, hozAlign: "center", },
                { title: "Consumo real en Kg", field: "consumo", hozAlign: "center", sorter: "number", width: 150 },

            ],

            // autoColumns:true,
        });

        var table3 = new Tabulator("#datatable-4", {
            layout: "fitDataFill",
            height: "650px",
            pagination: "local",
            paginationSize: 12,
            addRowPos: "top",
            responsiveLayout: "collapse",
            movableColumns: true,
            resizableRows: false,
            initialSort: [
                { column: "createdAt", dir: "desc" },
            ],
            rowContextMenu: rowMenu,
            columns: [
                // { title: "ID", field: "id", sorter: "number", headerMenu: headerMenu }, //add menu to this column header
                { title: "Marca de tiempo", field: "createdAt", headerMenu: headerMenu },
                // { title: "Formula", field: "formula", hozAlign: "center", headerMenu: headerMenu },
                { title: "Numero de silo", field: "numsilo", hozAlign: "center", headerMenu: headerMenu },
                { title: "Set Point", field: "setpoint", hozAlign: "center", headerMenu: headerMenu },
                { title: "Real", field: "real", hozAlign: "center", headerMenu: headerMenu },
            ],
            data: datTabl1,
        });


    }


    //funcion para generar datos en .xlsx
    document.getElementById("download-xlsx").addEventListener("click", function() {
        table.download("xlsx", "data.xlsx", { sheetName: "Reporte" });
    });

    function createHeaders(keys) {
        var result = [];
        for (var i = 0; i < keys.length; i += 1) {
          result.push({
            id: keys[i],
            name: keys[i],
            prompt: keys[i],
            width: 12,
            align: "center",
            padding: 0
          });
        }
        return result;
      }

      
    document.getElementById("download-pdf").addEventListener("click", function() {

        // table.download("pdf", "realvsSP.pdf", {
        //     orientation: "portrait",
        //     title: "Reporte de Real Vs SetPoint",
        // });
        var elementHTML = $('#datable-3').html();
var specialElementHandlers = {
    '#elementH': function (element, renderer) {
        return true;
    }
};
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        var headers = createHeaders([
            "createdAt",
            "id",
            "formula",
            "numsilo",
            "gruposilo",
            "setpoint"
          ]);
       
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        today = dd + '/' + mm + '/' + yyyy;

        doc.text("Reporte de producción", 10, 20, {
            horizontalScale: 9,
            baseline: 'bottom'
        });
        doc.setFont("verdana", "normal");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 255);
        doc.text(`${today}`, 160, 20);
        doc.line(10, 22, 195, 22);     
        doc.fromHTML(elementHTML, 15, 27, {
            'width': 170,
            'elementHandlers': specialElementHandlers
        });
        
        setTimeout(function () {
            doc.save("save.pdf");
        }, 10); 
        

    });


    // document.getElementById("download-pdf").addEventListener("click", function() {
    //     table.download("pdf", "data.pdf", {
    //         orientation: "portrait",
    //         title: "Reporte de producción Kg",
    //     });
    // });

}

const datos = xhr.addEventListener("load", onRequestHandler);
xhr.open("GET", API_USERS);
xhr.send();


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