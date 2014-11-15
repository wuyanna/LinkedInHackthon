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
    $xml.find('company > name').each(function() {
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
    drawCurrentWorkYearDistribution(people);

    drawPastWorkYearDistribution(people);


    drawGraduateSchoolDistribution(people);

    var current_employees = people.filter(function(person) {
      for (var position in person.positions) {
        if (person.positions[position].is_current === "true" && person.positions[position].company === company.name) {
          return true;
        }
      }
      return false;
    });

    var past_employees = people.filter(function(person) {
      for (var position in person.positions) {
        if (person.positions[position].is_current === "true" && person.positions[position].company !== company.name) {
          return true;
        }
      }
      return false;
    });

    drawWhereDidCurrentEmployeesComeFrom(current_employees);


    //Bar chart for software engineers ratio
    renderSoftwareEnggRatio(people);


    drawWhereDoPastEmployeesGo(past_employees);


  };

  var showCompanyInfo = function(company) {
    $("#logo").attr("src", company.logo);

    /*for (var key in company.about) {
      $('#desc_list').append('<li class="aboutlist"><h3>' + key + '</h3><p>' + company.about[key] + '</p></li>')
    }*/

    $('#desc_list').append('<table style="width:100%">')
    for (var key in company.about) {
      $('#desc_list').append(
        '<tr><td><h3>' + key + '</h3></td><td>' + company.about[key] + '</td></tr>')
    }
    $('#desc_list').append('</table>')
  };

  var drawCurrentWorkYearDistribution = function(p) {

    var yearMap = [];
    var maxYears = 0;
    for (var person in p) {
      for (var position in p[person].positions) {
        if (p[person].positions[position].company === company.name && p[person].positions[position].is_current === "true") {
          var years = getDurationTillNow(p[person].positions[position].start_date);
          if (yearMap[years] === undefined) {
            yearMap[years] = 1;
          } else {
            yearMap[years] = yearMap[years] + 1;
          }
          maxYears = Math.max(years, maxYears);
        }
      }
    }

    var rows = [];
    var sum = 0;
    var count = 0;
    var avg = 0;
    for (var i = 0; i <= maxYears; i++) {
      var entry = [];
      entry[0] = "" + i + "yrs";
      entry[1] = yearMap[i] === undefined ? 0 : yearMap[i];
      rows.push(entry);
      sum += (i * entry[1]);
      count += entry[1];
    }

    if (count > 0) {
      avg = sum / count;
    }

    // Working years distribution in current employees
    drawChart("Working years distribution in current employees", [
      ['string', 'Topping'],
      ['number', 'Slices']
    ], rows, PIE_CHART, 'chart03_div');
    showAverageCurrnetWorkYears(avg);
  };

  var drawPastWorkYearDistribution = function(p) {

    var yearMap = [];
    var maxYears = 0;
    for (var person in p) {
      for (var position in p[person].positions) {
        if (p[person].positions[position].company === company.name && p[person].positions[position].is_current === "false") {
          var years = getDuration(p[person].positions[position].start_date, p[person].positions[position].end_date);
          if (yearMap[years] === undefined) {
            yearMap[years] = 1;
          } else {
            yearMap[years] = yearMap[years] + 1;
          }
          maxYears = Math.max(years, maxYears);
        }
      }
    }

    var rows = [];
    var sum = 0;
    var count = 0;
    var avg = 0;
    for (var i = 0; i <= maxYears; i++) {
      var entry = [];
      entry[0] = "" + i + "yrs";
      entry[1] = yearMap[i] === undefined ? 0 : yearMap[i];
      rows.push(entry);
      sum += (i * entry[1]);
      count += entry[1];
    }

    if (count > 0) {
      avg = sum / count;
    }
    // Working years distribution in past employees
    drawChart("Working years distribution in past employees", [
      ['string', 'Topping'],
      ['number', 'Slices']
    ], rows, PIE_CHART, 'chart07_div');

    showAveragePastWorkYears(avg);

  };

  var showAveragePastWorkYears = function(avg) {
    $('#chart07_div').append("<p class='datalbl'>Average working years in Past employees: " + avg + "</p>");
  };

  var showAverageCurrnetWorkYears = function(avg) {
    $('#chart03_div').append("<p class='datalbl'>Average working years in current employees: " + avg + "</p>");
  };


  var drawGraduateSchoolDistribution = function(people) { 
    var schoolMap = {};
	var getGraduateSchoolDistribution = function(p) {
	  for (var person in p){
		for (var school in p[person].educations){
		  if (schoolMap[p[person].educations[school].school] === undefined && p[person].positions[school].is_current === "true") {
			schoolMap[p[person].educations[school].school] = 1;
		  } else {
			schoolMap[p[person].educations[school].school] = schoolMap[p[person].educations[school].school] + 1;
		  }
		}
	  }
	
	  var rows = [];
	  for (var key in schoolMap){
	    var entry = [];
	    entry[0] = key;
	    entry[1] = schoolMap[key];
	    rows.push(entry);
	  }
	  return rows;
    };
	
    var rows = getGraduateSchoolDistribution(people);
	
    drawChart("Graduate School Distribution in Current Employees", [
      ['string', 'Topping'],
      ['number', 'Slices']
    ], rows, PIE_CHART, 'chart05_div');
  };

  var drawWhereDidCurrentEmployeesComeFrom = function(p) {
    var pastCompanyMap = {};
    for (var person in p) {
      for (var position in p[person].positions) {
        if (p[person].positions[position].company !== company.name && p[person].positions[position].is_current === "false") {

          if (pastCompanyMap[p[person].positions[position].company] === undefined) {
            pastCompanyMap[p[person].positions[position].company] = 1;
          } else {
            pastCompanyMap[p[person].positions[position].company] = pastCompanyMap[p[person].positions[position].company] + 1;
          }
        }
      }
    }

    var rows = [];
    for (var key in pastCompanyMap) {
      var entry = [];
      entry[0] = key;
      entry[1] = pastCompanyMap[key];
      rows.push(entry);
    }

    // What company did they come from
    drawBarChart("What companies did they come from", [
        ['string', 'Past Companies'],
        ['number', 'Companies']
      ], rows,
      'chart08_div');

  };

  var drawWhereDoPastEmployeesGo = function(p) {
    var curCompanyMap = {};
    for (var person in p) {
      for (var position in p[person].positions) {
        if (p[person].positions[position].company !== company.name && p[person].positions[position].is_current === "true") {

          if (curCompanyMap[p[person].positions[position].company] === undefined) {
            curCompanyMap[p[person].positions[position].company] = 1;
          } else {
            curCompanyMap[p[person].positions[position].company] = curCompanyMap[p[person].positions[position].company] + 1;
          }
        }
      }
    }

    var rows = [];
    for (var key in curCompanyMap) {
      var entry = [];
      entry[0] = key;
      entry[1] = curCompanyMap[key];
      rows.push(entry);
    }

    drawBarChart("What companies do they work for", [
        ['string', 'Past Companies'],
        ['number', 'Companies']
      ], rows,
      'chart04_div');


  };

  var renderSoftwareEnggRatio = function(people) {
    //Render bar chart for sofware engineer ratio

    var chartData = [];
    chartData.push(['string', 'Year']);
    chartData.push(['number', 'Software Engineers']);
    chartData.push(['number', 'Total Employees']);

    var softwareEnggs = {};
    var totalEmployees = {};

    for (var i = 0; i < people.length; i++) {
      var person = people[i];
      var positions = person.positions;
      for (var j = 0; j < positions.length; j++) {
        var position = positions[j];

        if (position.company === company.name) {
          var end_year;
          if (jQuery.isEmptyObject(position.end_date))
            end_year = new Date().getFullYear();
          else
            end_year = position.end_date.year;
          for (var year = parseInt(position.start_date.year); year <= end_year; year++) {
            if (!(year in totalEmployees))
              totalEmployees[year] = 0;
            totalEmployees[year] = totalEmployees[year] + 1;
            //check interval between start_date && end_date
            if (position.title.indexOf("Software Developer") != -1) {
              if (!(year in softwareEnggs))
                softwareEnggs[year] = 0;
              softwareEnggs[year] = softwareEnggs[year] + 1;
            }
          }
        }
      }
    }

    //Build data array for bar chart
    var data = [];

    for (var year in totalEmployees) {
      var softwareEnggsNumber = 0;
      if (softwareEnggs[year] !== undefined)
        softwareEnggsNumber = softwareEnggs[year];
      var totalEmployeesNumber = totalEmployees[year];
      data.push([year, softwareEnggs[year], totalEmployees[year]]);
    }

    // What company did they come from
    drawBarChart("Ratio of Software Engineers", chartData, data,
      'chart01_div');

  }

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

function getDurationTillNow(start) {
  return 2014 - parseInt(start.year);
}

// return years
function getDuration(start, end) {
  if (end === undefined) {
    return getDurationTillNow(start);
  }
  return parseInt(end.year) - parseInt(start.year);
}