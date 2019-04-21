 // Initial array of gifs
 var gifs = ["Kia", "GMC", "Toyota", "Nissan", "Ford"];

 
 function displayGifInfo() {

    var gif = $(this).attr("data-name");
    var queryURL = ("https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=wwVTTY5IMdcwxvC9v045wZ6CmPIkCli2&limit=10");

    // Creating an AJAX call for the specific gif button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        for (var i = 0; i < response.data.length; i++){

            var gifDiv = $("<div>");
    
            var pTag = $("<p>").text("rating " + response.data[i].rating);

            var imgTag = $("<img>");

            imgTag.addClass("gif")
            imgTag.attr({
                src: response.data[i].images.downsized_still.url, 
                        dataAnimate: response.data[i].images.downsized.url,
                        dataStill: response.data[i].images.downsized_still.url, 
                        dataState: "still"
            });

                gifDiv.append(imgTag);
                gifDiv.append(pTag);
                $("#newDiv").prepend(gifDiv);
        }
        }

    )};

    $(document).on("click", ".gif",  function animate() {  
        var state = $(this).attr("dataState");
    
        if (state === "still") {
            // Switch to animate
            $(this).attr("src", $(this).attr("dataAnimate"));
            $(this).attr("dataState", "animate");
          } else {
            // Switch to still
            $(this).attr("src", $(this).attr("dataStill"));
            $(this).attr("dataState", "still");
          }
        });


 // Function for displaying gif data
 function renderButtons() {

    // Deleting the gif buttons prior to adding new gif buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();
 
    // Looping through the array of gifs
    for (var i = 0; i < gifs.length; i++) {
 
      // Then dynamicaly generating buttons for each gif in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var newButton = $("<button>");
      // Adding a class
      newButton.addClass("gif-btn");
      // Adding a data-attribute with a value of the gif at index i
      newButton.attr("data-name", gifs[i]);
      // Providing the button's text with a value of the gif at index i
      newButton.text(gifs[i]);
      // Adding the button to the HTML
      $("#buttons-view").append(newButton);
    }
  }
 
  // This function handles events where one button is clicked
  $("#add-Gif").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();
 
    // This line will grab the text from the input box
    var gif = $("#Gif-input").val().trim();
    // The gif from the textbox is then added to our array
    gifs.push(gif);
 
    // calling renderButtons which handles the processing of our gif array
    renderButtons();
  });
 
     $(document).on("click", ".gif-btn", displayGifInfo);
 // Calling the renderButtons function at least once to display the initial list of gifs
 renderButtons();
 // My Key wwVTTY5IMdcwxvC9v045wZ6CmPIkCli2