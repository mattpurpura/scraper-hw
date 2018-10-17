$(document).ready(function(){

    function displayLinks(data){
        for (let i = 0; i < data.length; i++){
            let row = $("<div>").addClass("row").attr("style", "margin-top: 5px");
            let linkColumn = $("<div>").addClass("col-md-6");
            let link = $("<a>").attr("href", data[i].link).text(data[i].title);
            let span = $("<span>").addClass("create-note").attr("data-id", data[i]._id).text("| Create Note");
            
            linkColumn.append(link, span);
            row.append(linkColumn);
            
            $("#pats-headlines").append(row);
        }
    };


    $(document).on("click",".create-note", function(){
        $("#noteTitle").val("")
        $("#noteBody").val("");

        let thisId = $(this).attr("data-id");
        console.log(thisId);
        $.getJSON(`/articles/${thisId}`, function(data){
            console.log(data)
            if(data[0].note){
                console.log(data[0].note.title);
                $("#noteTitle").val(data[0].note.title)
                $("#noteBody").val(data[0].note.body);
                $("#delete-note").attr("data-id", data[0].note._id);
                $("#delete-note").removeAttr("style");
            }
            
            $("#note-article").text(`${data[0].title}`).removeAttr("style");
            $("#note-form").removeAttr("style");
            $("#save-note").attr("data-id", thisId);
            
        })        
    })

    $("#save-note").on("click", function(event){
        event.preventDefault();
        $("#note-form").attr("style", "display: none")
        $("#note-article").attr("style", "display: none");
        
        let thisId = $(this).attr("data-id");
        console.log(thisId);
        $.ajax({
            method: "POST", 
            url: "/articles/" + thisId, 
            data: {
                title: $("#noteTitle").val(),
                body: $("#noteBody").val()
            }
        }).then(function(data){
            console.log(data);
            $("#noteBody").val("");
            $("#noteTitle").val("");
            $("#note-form").attr("style", "display: none");
        })

    })

    $("#delete-note").on("click", function(event){
        event.preventDefault();
        
        let thisId = $(this).attr("data-id");
        
        $.ajax({
            method: "DELETE", 
            url: `/delete/${thisId}`
        })

        $("#noteBody").val("");
        $("#noteTitle").val("");
    })

    $.getJSON("/articles", function(data) {
        // Call our function to generate a table body
        displayLinks(data);
      });




}); // eds document ready