var lineChart = function(){
	var ctx = document.getElementById("myChart").getContext("2d");
	var now = new Date()
	var prev = new Date().setHours(0,0,0,0);
	prev.setMonth(prev.getMonth()-1)
	var getExpenseDateWise(prev, now,
		function(err, d) {
			var vals = []
			var labls = []
			for (i in d){
				labls.push(d[i].key])
				vals.push(d[i])
			}
		});
	var data1 = {
	    labels: labls,
	    datasets: [
	        {
	            data: vals
	        }
	    ]
	};

	var myLineChart = new Chart(ctx).Line(data, {});
};

var pieChart = function () {
	var ctx2 = document.getElementById("myChart2").getContext("2d");

	var data2 = []
	var getExpenseCategoryWise(
	function (err, d) {
		for (i in d){
		data2.push({'value' : d[i].value,
					'label' : d[i].key
				});
	});
	var myDoughnutChart = new Chart(ctx2).Doughnut(data2, {}});
};

$('#stats1').on('shown', lineChart);
$('#stats2').on('shown', pieChart);
