$(document).ready(function(){

    function displayLinks(data){
        for (let i = 0; i < data.length; i++){
            let row = $("<div>").addClass("row").attr("style", "margin-top: 5px");
            let linkColumn = $("<div>").addClass("col-md-6");
            let link = $("<a>").attr("href", data[i].link).text(data[i].title);
            let span = $("<span>").text("| Create Note");

            let buttonColumn = $("<div>").addClass("col-md-6");
            let newButton = $("<a>").attr("id", `createNote-${i}`).text("Create Note").attr("style", "border-left: solid black 2px; padding-left: 5px");
            
            linkColumn.append(link, span);
            buttonColumn.append(newButton);
            row.append(linkColumn);
            
            $("#pats-headlines").append(row);
        }
    };


    $.getJSON("/articles", function(data) {
        // Call our function to generate a table body
        displayLinks(data);
      });




}); // eds document ready