// from data.js
var tableData = data; // YOUR CODE HERE!

var tbody = d3.select("tbody");
var button = d3.select("#filter-btn");
var column1 = d3.select("#datetime");
var column2 = d3.select("#city");
var resetbtn = d3.select("#reset-btn");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"];

var populate = function populate(tableinput) {
  tableinput.forEach(function (ufo_sightings) {
    var row = tbody.append("tr");
    columns.forEach(function (column) {
      return row.append("td").text(ufo_sightings[column]);
    });
  });
};

populate(data);
button.on("click", function () {
  d3.event.preventDefault();
  var Datefield = column1.property("value").trim();
  var Cityfield = column2.property("value").toLowerCase().trim();
  var Datefilter = data.filter(function (data) {
    return data.datetime === Datefield;
  });
  console.log(Datefilter);
  var Cityfilter = data.filter(function (data) {
    return data.city === Cityfield;
  });
  console.log(Cityfilter);
  var FilteredData = data.filter(function (data) {
    return data.datetime === Datefield && data.city === Cityfield;
  });
  console.log(FilteredData);
  tbody.html("");
  var response = {
    FilteredData: FilteredData,
    Cityfilter: Cityfilter,
    Datefilter: Datefilter
  };

  if (response.FilteredData.length !== 0) {
    populate(FilteredData);
  } else if (response.FilteredData.length === 0 && (response.Cityfilter.length !== 0 || response.Datefilter.length !== 0)) {
    populate(Cityfilter) || populate(Datefilter);
  } else {
    tbody.append("tr").append("td").text("No results found!");
  }
});
resetbtn.on("click", function () {
  tbody.html("");
  populate(data);
  console.log("Table reset");
});