google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      google.charts.load('current', {'packages':['bar']});
      google.charts.load('current', {'packages':['line']});
      function drawChart() {
        var conta = google.visualization.arrayToDataTable([
          ['Idade', 'Hours per Day'],
          ['10 ao 20',    50],
          ['21 aos 30',      20],
          ['31 aos 40',  5],
          ['41 aos 50', 2],
          ['Acima de 51',    7]
        ]);

        var options = {
          title: 'Faixa etária dos usuários',
          pieHole: 0.4,
          width: 500,
         height: 300,
        };

        var chart = new google.visualization.PieChart(document.getElementById('conta'));
        chart.draw(conta, options);


        var etaria = google.visualization.arrayToDataTable([
            ['Year', 'Cadastros', 'Confirmações'],
            ['2004',  1000,      400],
            ['2005',  2170,      460],
            ['2006',  660,       1120],
            ['2007',  1030,      1080]
          ]);
  
          var options = {
            title: 'Controle de Criação e confirmação de conta',
            curveType: 'function',
            legend: { position: 'bottom' },
            width: 500,
            height: 300,
          };
  
          var chart = new google.visualization.LineChart(document.getElementById('etaria'));
  
          chart.draw(etaria, options);


          var data = google.visualization.arrayToDataTable([
            ['Year', 'Ideias Criadas', 'Ideias Concluidas'],
            ['2014', 1000, 400],
            ['2015', 1170, 460],
            ['2016', 660, 1120],
            ['2017', 1030, 540 ]
          ]);
  
          var options = {
   
              title: 'WeDo - Plataforma de ideias',
              subtitle: 'Relação de Ideias criadas e concluídas por mês',
              width: 500,
              height: 300,
          };
  
          var chart = new google.charts.Bar(document.getElementById('eta'));
  
          chart.draw(data, google.charts.Bar.convertOptions(options));



          var dat = new google.visualization.DataTable();
          dat.addColumn('string', 'Mês');
          dat.addColumn('number', 'Acessos');
        
          
    
          dat.addRows([
            ['Janeiro',  37.8],
            ['Fevereiro',  30.9],
            ['Março',  25.4],
            ['Abril',  11.7],
            ['Maio',  11.9],
            ['Junho',   8.8],
            ['Julho',   7.6],
            ['Agosto',  12.3],
            ['Setembro',  16.9],
            ['Outubro', 12.8],
            ['Novembro',  5.3],
            ['Dezembro',  6.6]
            
          ]);
    
          var options = {
            chart: {
              title: 'Acessos por mês na plataforma',
              subtitle: 'Acessos, cadastros e visitas'
            },
            width: 900,
            height: 500,
            axes: {
              x: {
                0: {side: 'top'}
              }
            }
          };
    
          var chart = new google.charts.Line(document.getElementById('acessos'));
    
          chart.draw(dat, google.charts.Line.convertOptions(options));
          


          var d = google.visualization.arrayToDataTable([
            ['Região', 'Hours per Day'],
            ['Norte',     11],
            ['Nordeste',      2],
            ['Sudeste',  2],
            ['Sul', 2],
            ['Centro-oeste',    7]
          ]);
  
          var options = {
            title: 'My Daily Activities',
            width: 500,
            height: 300,
          };
  
          var chart = new google.visualization.PieChart(document.getElementById('pie'));
  
          chart.draw(d, options);
      }

