// Credentials
var api_key = "75oa3bqal87ryg";
var secret_key = "jzHJseHTdW0SycrY";
var oauth_user_token = "6f7d329f-7cfd-43c6-8f6a-3f0b28ceb454";
var oauth_user_secret = "75184e04-f293-481a-beca-ec71f6c37287";

// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {
  'packages': ['corechart']
});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(main);


function main() {
  // Load Company Data
  // For prototype, we use dummy data in an XML



  // Load People Search Result
}


// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
    ['Mushrooms', 3],
    ['Onions', 1],
    ['Olives', 1],
    ['Zucchini', 1],
    ['Pepperoni', 2]
  ]);

  // Set chart options
  var options = {
    'title': 'How Much Pizza I Ate Last Night',
    'width': 400,
    'height': 300
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}