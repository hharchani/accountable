var lineChart = function(){
	var ctx = document.getElementById("myChart").getContext("2d");
	var now = new Date()
	var prev = new Date(new Date().setHours(0,0,0,0));
	prev.setMonth(prev.getMonth()-1)
	var vals = []
	var labls = []
	getExpenseDateWise(prev, now,
		function(err, d) {
			for (i in d) {
				labls.push(d[i].key)
				vals.push(d[i])
			}

			var data1 = {
			    labels: labls,
			    datasets: [
			        {
			            data: vals
			        }
			    ]
			};
			var myLineChart = new Chart(ctx).Line(data1, {});
		});

};

var pieChart = function () {
	var ctx2 = document.getElementById("myChart2").getContext("2d");

	var data2 = []
	getExpenseCategoryWise(
		function (err, d) {
			console.log(d);
			for (i in d){
			data2.push({'value' : d[i].value,
						'label' : d[i].key,
						'color' : 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')'
					});
			}
			var myDoughnutChart = new Chart(ctx2).Doughnut(data2, {});
	});
};

$('#stats1').on('shown', lineChart);
$('#stats2').on('shown', pieChart);
