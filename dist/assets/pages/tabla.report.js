const API_REPORTES = `http://localhost:8081/api/reportes/`;
let datTabl1, datTabl2, datTabla = {};
let datSilos, datAgregados, datQuimicos, datTurnos, consumos = {};


options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: 'America/Mexico_City'
};
const getAPIReport1 = (turnos, fechaFiltro) => {


    axios.get(API_REPORTES, {
        params: {
            fechaFiltro: fechaFiltro,
            turnos: turnos
        }
    }).then(res => {
        //console.log(res.data.reporte1);
        datTabla = res.data.reporte1;
        console.log(datTabla);
        crearTablaHTML();
        getTotalProd();

    });


};


let formatter = new Intl.DateTimeFormat('es-Es', options);
let filtSelect = document.getElementById('multiSelect');
filtSelect.addEventListener('change', function() {

    const fechaFiltro = document.getElementById("picker_date_rep").value;

    let turnos = [0, 0, 0];
    if (filtSelect.options[0].selected) {
        turnos[0] = 1;
    };
    if (filtSelect.options[1].selected) {
        turnos[1] = 2;
    };
    if (filtSelect.options[2].selected) {
        turnos[2] = 3;
    };

    var tab = document.querySelector('thead');
    var cuerpo = document.querySelector('tbody');
    if (tab) {
        tab.remove();
        cuerpo.remove();
    }

    getAPIReport1(turnos, fechaFiltro);
});


const crearTablaHTML = () => {

    var tablaReporte1 = document.querySelector('.tabla-1');
    var tblBody = document.createElement("tbody");
    tablaReporte1.appendChild(tblBody);
    const valEncabezado = `
    
                                    <tr>                                        
                                        <th scope="col">Marca de tiempo</th>
                                        <th scope="col">Formula</th>
                                        <th scope="col">Num Batch</th>
                                        <th scope="col">Silo 1</th>
                                        <th scope="col">Silo 2</th>
                                        <th scope="col">Silo 3</th>
                                        <th scope="col">Silo 4</th>
                                        <th scope="col">Silo 5</th>
                                        <th scope="col">Silo 6</th>
                                        <th scope="col">Silo 7</th>
                                        <th scope="col">C. Quim AQ</th>
                                        <th scope="col">C. Quim A2</th>
                                        <th scope="col">TP 2</th>
                                        <th scope="col">TP 4</th>
                                        <th scope="col">Total B</th>
                                    </tr>
                              
                                `;
    const encabezado = document.createElement('thead');

    encabezado.innerHTML = valEncabezado;
    tablaReporte1.append(encabezado);
    asindIDEnc = document.querySelector('thead');
    asindIDEnc.setAttribute('id', 'EstiloEnc');


    for (i = 0; i <= datTabla.length; i++) {
        let timestamp = Date.parse(datTabla[i].createdAt);
        const valRenglones = `
        
                 
            <td>${formatter.format(timestamp)}</td>
            <td>${datTabla[i].formula}</td>
            <td>${datTabla[i].numbatch}</td>
            <td>${datTabla[i].Silo_1}</td>
            <td>${datTabla[i].Silo_2}</td>
            <td>${datTabla[i].Silo_3}</td>
            <td>${datTabla[i].Silo_4}</td>
            <td>${datTabla[i].Silo_5}</td>
            <td>${datTabla[i].Silo_6}</td>
            <td>${datTabla[i].Silo_7}</td>
            <td>${datTabla[i].Carga_quimica_2}</td>
            <td>${datTabla[i].Carga_quimica_AQ}</td>
            <td>${datTabla[i].TP_2}</td>
            <td>${datTabla[i].TP_4}</td>
            <td>${datTabla[i].TotalBatch}</td>             
`;
        const renglon = document.createElement('tr');
        if (i % 2 == 0) {
            renglon.classList.add('table-primary');
        } else {
            renglon.classList.add('table-success');
        };
        renglon.innerHTML = valRenglones;
        tblBody.appendChild(renglon);
        var asingEstilo1 = document.querySelectorAll('.table-primary');
        var asingEstilo2 = document.querySelectorAll('.table-success');
        for (j = 0; j < asingEstilo1.length; j++) {
            asingEstilo1[j].setAttribute('id', 'Estilo');
        };

        for (k = 0; k < asingEstilo2.length; k++) {
            asingEstilo2[k].setAttribute('id', 'Estilo2');
        };
    };


    return tablaReporte1;

};

const getTotalProd = () => {
    let totalProd = 0;
    for (i = 0; i <= datTabla.length - 1; i++) {
        totalProd = totalProd + datTabla[i].TotalBatch;
    }
    totalProd = totalProd / 1000;
    var refTotalP = document.querySelector('.prodTotal');
    var parrafo = document.createElement("p");
    parrafo.classList.add('text-success');
    var valpProdT = `${totalProd} Ton`;
    parrafo.innerHTML = valpProdT;
    refTotalP.appendChild(parrafo);
    return refTotalP;

};