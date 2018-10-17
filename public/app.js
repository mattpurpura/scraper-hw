$(document).ready(function(){

    function displayLinks(data){
        console.log(data);
        for (let i = 0; i < data.length; i++){
            let row = $("<div>").addClass("row headline");
            if(i===0){
                row.addClass("top");
            }
            let link = $("<a>").attr("href", data[i].link).text(data[i].title);
            let noteButton = $("<span>").addClass("note-button").attr("data-id", data[i]._id);
            
            row.append(link);
            
            if(data[i].note){
                noteButton.text("| View Notes").addClass("has-notes");
            }
            else{
                noteButton.text("| Create Note");
            }

            row.append(noteButton);
            $("#pats-headlines").append(row);
        }
    };


    $(document).on("click",".note-button", function(){
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
                $("#delete-note").attr("data-note-id", data[0].note._id).attr("data-article-id", data[0]._id);
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

        if($(`.note-button[data-id=${thisId}]`).hasClass("has-notes")){
            
        }
        else{
            $(`.note-button[data-id=${thisId}]`).text(" | View Notes").addClass("has-notes")
        }

        console.log(thisId);
        $.ajax({
            method: "POST", 
            url: "/articles/" + thisId, 
            data: {
                title: $("#noteTitle").val(),
                body: $("#noteBody").val()
            }
        }).then(function(){
            $("#noteBody").val("");
            $("#noteTitle").val("");
            $("#note-form").attr("style", "display: none");
        })

    })

    $("#delete-note").on("click", function(event){
        event.preventDefault();
        
        let thisNoteId = $(this).attr("data-note-id");
        let thisArticleId = $(this).attr("data-article-id");


        $(`.note-button[data-id= ${thisArticleId}]`).removeClass("has-notes").text(" | Create Note")
        
        $.ajax({
            method: "DELETE", 
            url: `/delete/${thisNoteId}`
        })

        $("#noteBody").val("");
        $("#noteTitle").val("");
    })


    $("#sync").on("click", function(event){
        $.getJSON("/api/patriots", function(data){

        })
        .then(function(){
            $.getJSON("/articles", function(data) {
                // Call our function to generate a table body
                displayLinks(data);
              });
        })
    })

    $.getJSON("/articles", function(data) {
        // Call our function to generate a table body
        displayLinks(data);
      });

}); // eds document ready