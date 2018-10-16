$(document).ready(function(){

    function displayLinks(data){
        for (let i = 0; i < 5; i++){
            let item = $("<li>");
            let link = $("<a>").attr("href", data[i]).text(data[i]);
            item.append(link);
            $("#pats-headlines").append(item);
        }
    };

    function displaySeahawks(data){
        for (let i = 0; i < 5; i++){
            let item = $("<li>");
            let link = $("<a>").attr("href", data[i]).text(data[i]);
            item.append(link);
            $("#hawks-headlines").append(item);
        }
    };

    $.getJSON("/api/patriots", function(data) {
        // Call our function to generate a table body
        displayLinks(data);
      });

      $.getJSON("/api/team/seahawks", function(data) {
        // Call our function to generate a table body
        displayLinks(data);
      });




}); // eds document ready