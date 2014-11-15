// Credentials
var api_key = "75oa3bqal87ryg";
var secret_key = "jzHJseHTdW0SycrY";
var oauth_user_token = "6f7d329f-7cfd-43c6-8f6a-3f0b28ceb454";
var oauth_user_secret = "75184e04-f293-481a-beca-ec71f6c37287";

var BAR_CHART = 1;
var PIE_CHART = 2;

// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {
  'packages': ['corechart']
});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(main);

function main() {
  // Load Company Data
  // For prototype, we use dummy data in an XML
  $.get('linkedin.xml', function(myContentFile) {
    var company = {};
    company.about = {};
    xmlDoc = $.parseXML(myContentFile),
    $xml = $(xmlDoc),
    $xml.find('logo-url').each(function () {
      company.logo = $(this).text();
    });
    $xml.find('description').each(function () {
      company.desc = $(this).text();
    });
    $xml.find('website-url').each(function () {
      company.about.website = $(this).text();
    });
    $xml.find('industry > name').each(function () {
      company.about.industry = $(this).text();
    });
    $xml.find('founded-year').each(function () {
      company.about.founded = $(this).text();
    });

    showCompanyInfo(company);
  }, 'text');

  var showCompanyInfo = function (company) {
    $("#logo").attr("src", company.logo);

    for (var key in company.about) {
      $('#desc_list').append('<li class="aboutlist"><h4>' + key + '</h4><p>' + company.about[key] + '</p></li>')
    }
    
  };



  // Load People Search Result
  // For prototype, we use dummy data in an XML

  // How Many Software Engineers

  drawChart("How Many Software Engineers", [
    ['string', 'Topping'],
    ['number', 'Slices']
  ], [
    ['Software Engineers', 3],
    ['Total Employees', 1],
  ], PIE_CHART, 'chart01_div');

  // Average working years in current employees
  drawChart("Average working years in current employees", [
    ['string', 'Topping'],
    ['number', 'Slices']
  ], [
    ['1 yr', 3],
    ['2 yrs', 1],
    ['3 yrs', 1],
    ['4 yrs', 1],
    ['5 yrs', 1],
    ['more than 5 yrs', 1],
  ], PIE_CHART, 'chart02_div');


  // Working years distribution in current employees
  drawChart("Working years distribution in current employees", [
    ['string', 'Topping'],
    ['number', 'Slices']
  ], [
    ['1 yr', 3],
    ['2 yrs', 1],
    ['3 yrs', 1],
    ['4 yrs', 1],
    ['5 yrs', 1],
    ['more than 5 yrs', 1],
  ], PIE_CHART, 'chart03_div');


  // Graduation Schools distribution in current employees
  drawChart("Graduation Schools distribution in current employees", [
    ['string', 'Topping'],
    ['number', 'Slices']
  ], [
    ['Stanford', 3],
    ['MIT', 1],
    ['CMU', 1],
    ['UIUC', 1],
    ['Others', 1]
  ], PIE_CHART, 'chart04_div');

  // What company did they come from
  drawChart("What company did they come from", [
    ['string', 'Topping'],
    ['number', 'Slices']
  ], [
    ['Pinterest', 3],
    ['LinkedIn', 1],
    ['LinkedIn', 1],
    ['LinkedIn', 1]
  ], PIE_CHART, 'chart07_div');

  // Average working years in Past employees
  drawChart("Average working years in Past employees", [
    ['string', 'Topping'],
    ['number', 'Slices']
  ], [
    ['Software Engineers', 3],
    ['Total Employees', 1],
  ], PIE_CHART, 'chart05_div');


  // Working years distribution in past employees
  drawChart("Working years distribution in past employees", [
    ['string', 'Topping'],
    ['number', 'Slices']
  ], [
    ['1 yr', 3],
    ['2 yrs', 1],
    ['3 yrs', 1],
    ['4 yrs', 1],
    ['5 yrs', 1],
    ['more than 5 yrs', 1],
  ], PIE_CHART, 'chart06_div');


  // What company did they go to
  drawChart("What company did they go to", [
    ['string', 'Topping'],
    ['number', 'Slices']
  ], [
    ['Software Engineers', 3],
    ['Total Employees', 1],
  ], PIE_CHART, 'chart07_div');
}


// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart(title, columns, rows, chartType, div) {

  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn(columns[0][0], columns[0][1]);
  data.addColumn(columns[1][0], columns[1][1]);
  data.addRows(rows);

  // Set chart options
  var options = {
    'title': title,
    'width': 400,
    'height': 300
  };

  // Instantiate and draw our chart, passing in some options.
  if (chartType === PIE_CHART) {
    var chart = new google.visualization.PieChart(document.getElementById(div));
    chart.draw(data, options);
  }

}