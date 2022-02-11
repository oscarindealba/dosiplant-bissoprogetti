const API_CONSUMO = `http://localhost:8081/api/consumos/`;
let datSilos, datAgregados, datQuimicos, datTurnos, consumos = {};
let filtSelect = document.getElementById('multiSelect');

filtSelect.addEventListener('change', function() {

    const fechaFiltro = document.getElementById("picker_date_op").value;


    if (!fechaFiltro) {};


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
    //console.log(turnos);

    getAPIOperacion(turnos, fechaFiltro);


});


const getAPIOperacion = (turnos, fechaFiltro) => {
    axios.get(API_CONSUMO, {
        params: {
            fechaFiltro: fechaFiltro,
            turnos: turnos
        }
    }).then(res => {
        let datOperecaion = res.data;
        let arg = datOperecaion[1];
        let serieS = [];
        let delta = [];
        let operacion = [];
        let dattotal = []
        let elapse = 1;

        for (let i = 0; i <= arg.length - 1; i++) {
            serieS.push(Date.parse(new Date(arg[i].createdAt)));
            serieS.sort(function(a, b) {
                return a - b;
            });
            //let s2 = Date.parse(new Date(arg[i - 1].createdAt));
            //console.log(s2);
            //let transc = s1 - s2;
            // console.log(transc);
        };

        for (let i = 1; i <= arg.length - 1; i++) {
            delta.push((serieS[i] - serieS[i - 1]) / 60000);
        };


        for (let i = 1; i <= arg.length; i++) {
            if (delta[i] > (elapse)) {
                operacion.push(0);
            } else {
                operacion.push(1);
            };
        };

        for (let i = 1; i <= arg.length - 1; i++) {

            dattotal.push([serieS[i], operacion[i]]);

        };
        console.log(dattotal);

        var options = {
            annotations: {
                yaxis: [{
                    y: 30,
                    borderColor: '#999',
                    label: {
                        show: true,
                        text: 'Operando',
                        style: {
                            color: "#fff",
                            background: '#03d87f'
                        }
                    }
                }],
                xaxis: [{
                    x: new Date('14:00:00').getTime(),
                    borderColor: '#999',
                    yAxisIndex: 0,
                    label: {
                        show: true,
                        text: 'Turno 2',
                        style: {
                            color: "#fff",
                            background: '#ffb822'
                        }
                    },
                }]
            },
            chart: {
                type: 'area',
                height: 350,
            },
            stroke: {
                width: [3],
            },
            dataLabels: {
                enabled: false
            },
            series: [{
                data: dattotal

            }, ],
            markers: {
                size: 0,
                style: 'hollow',
            },
            xaxis: {
                type: 'datetime',
                min: dattotal,
                tickAmount: 6,
                axisBorder: {
                    show: true,
                    color: '#bec7e0',
                },
                axisTicks: {
                    show: true,
                    color: '#bec7e0',
                },
            },
            colors: ['#008ffb'],
            tooltip: {
                x: {
                    format: 'dd MMM yyyy'
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.4,
                    stops: [0, 100]
                }
            },
        }

        var chart = new ApexCharts(
            document.querySelector("#apex_area2"),
            options
        );

        chart.render();

    });
};