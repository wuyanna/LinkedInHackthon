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
  var company = {};
  // For prototype, we use dummy data in an XML
  $.get('linkedin.xml', function(myContentFile) {
    
    company.about = {};
    xmlDoc = $.parseXML(myContentFile),
    $xml = $(xmlDoc),
    $xml.find('logo-url').each(function() {
      company.logo = $(this).text();
    });
    $xml.find('description').each(function() {
      company.desc = $(this).text();
    });
    $xml.find('website-url').each(function() {
      company.about.website = $(this).text();
    });
    $xml.find('industry > name').each(function() {
      company.about.industry = $(this).text();
    });
    $xml.find('founded-year').each(function() {
      company.about.founded = $(this).text();
    });
    $xml.find('name').each(function () {
      company.name = $(this).text();
    });
    showCompanyInfo(company);
  }, 'text');

  $.get('sample_data.xml', function(myContentFile) {
    var people = [];
    xmlDoc = $.parseXML(myContentFile),
    $xml = $(xmlDoc),
    $xml.find('person').each(function() {
      var person = {};
      $(this).find('id').each(function() {
        person.id = $(this).text();
      });

      $(this).find('first-name').each(function() {
        person.firstname = $(this).text();
      });

      $(this).find('last-name').each(function() {
        person.lastname = $(this).text();
      });

      var positions = [];


      $(this).find('position').each(function() {
        var position = {};
        $(this).find('id').each(function() {
          position.id = $(this).text();
        });
        $(this).find('title').each(function() {
          position.title = $(this).text();
        });
        var start_date = {};

        $(this).find('start-date > year').each(function() {
          start_date.year = $(this).text();
        });
        $(this).find('start-date > month').each(function() {
          start_date.month = $(this).text();
        });
        position.start_date = start_date;

        var end_date = {};

        $(this).find('end-date > year').each(function() {
          end_date.year = $(this).text();
        });

        $(this).find('end-date > month').each(function() {
          end_date.month = $(this).text();
        });
        position.end_date = end_date;

        $(this).find('is-current').each(function() {
          position.is_current = $(this).text();
        });

        $(this).find('company > name').each(function() {
          position.company = $(this).text();
        });
        positions.push(position);
      });
      person.positions = positions;

      var educations = [];

      $(this).find('education').each(function() {
        var education = {};
        $(this).find('id').each(function() {
          education.id = $(this).text();
        });
        $(this).find('school-name').each(function() {
          education.school = $(this).text();
        });
        $(this).find('degree').each(function() {
          education.degree = $(this).text();
        });
        var start_date = {};

        $(this).find('start-date > year').each(function() {
          start_date.year = $(this).text();
        });
        $(this).find('start-date > month').each(function() {
          start_date.month = $(this).text();
        });
        education.start_date = start_date;

        var end_date = {};

        $(this).find('end-date > year').each(function() {
          end_date.year = $(this).text();
        });

        $(this).find('end-date > month').each(function() {
          end_date.month = $(this).text();
        });

        education.end_date = end_date;

        educations.push(education);
      });
      person.educations = educations;

      people.push(person);
    });

    renderGraphs(people);
  }, 'text');

  var renderGraphs = function(people) {

  	//Bar chart for software engineers ratio
  	renderSoftwareEnggRatio(people);

  };

  var showCompanyInfo = function(company) {
    $("#logo").attr("src", company.logo);

    for (var key in company.about) {
      $('#desc_list').append('<li class="aboutlist"><h4>' + key + '</h4><p>' + company.about[key] + '</p></li>')
    }

  };

  var renderSoftwareEnggRatio = function(people) {
	//Render bar chart for sofware engineer ratio
	for(var i=0;i<people.length;i++)
	{
		for(var position in people[i].positions)
		{
			if(position.is_currentv && position.company==company.name)
			{
				//2011 data

				//2012 data

				//2013 data

				//2014 data
			}
		}
	}  	
  }

  // Load People Search Result
  // For prototype, we use dummy data in an XML

  // How Many Software Engineers

  // drawChart("How Many Software Engineers", [
  //   ['string', 'Topping'],
  //   ['number', 'Slices']
  // ], [
  //   ['Software Engineers', 3],
  //   ['Total Employees', 1],
  // ], PIE_CHART, 'chart01_div');

  // What company did they come from
  drawBarChart("Ratio of Software Engineers", [
      ['string', 'Year'],
      ['number', 'Software Engineers'],
      ['number', 'Total Employees']
    ], [
      ['2011', 12000, 28000],
      ['2012', 14000, 32000],
      ['2013', 19000, 46000],
      ['2014', 29000, 55000]
    ],
    'chart01_div');

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
  ], PIE_CHART, 'chart05_div');

  // What company did they come from
  drawBarChart("What companies did they come from", [
      ['string', 'Past Companies'],
      ['number', 'Companies']
    ], [
      ['Amazon', 1000],
      ['Facebook', 1170],
      ['LinkedIn', 660],
      ['Adobe', 1030]
    ],
    'chart04_div');

  // Average working years in Past employees
  drawChart("Average working years in Past employees", [
    ['string', 'Topping'],
    ['number', 'Slices']
  ], [
    ['Software Engineers', 3],
    ['Total Employees', 1],
  ], PIE_CHART, 'chart06_div');


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
  ], PIE_CHART, 'chart07_div');


  // // What company did they go to
  // drawChart("What company did they go to", [
  //   ['string', 'Topping'],
  //   ['number', 'Slices']
  // ], [
  //   ['Software Engineers', 3],
  //   ['Total Employees', 1],
  // ], PIE_CHART, 'chart07_div');
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


function drawBarChart(title, columns, rows, div) {

  // Create the data table.
  var data = new google.visualization.DataTable();
  for (var i = 0; i < columns.length; i++) {
    data.addColumn(columns[i][0], columns[i][1]);
  }
  data.addRows(rows);

  var options = {
    title: title,
    vAxis: {
      title: columns[0][1],
      titleTextStyle: {
        color: 'red'
      }
    }
  };

  var chart = new google.visualization.BarChart(document.getElementById(div));

  chart.draw(data, options);
}