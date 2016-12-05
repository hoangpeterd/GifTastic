// initial array of animals
var animals = ['rat', 'mouse', 'dog', 'cat', 'narwhal'];

// function for displaying animal data 
function renderButtons(){ 

	// Deletes the animals prior to adding new animals (this is necessary otherwise you will have repeat buttons)
	$('#animalsView').empty();

	// Loops through the array of animals
	for (var i = 0; i < animals.length; i++){

		// Then dynamicaly generates buttons for each animal in the array
		var a = $('<button>').attr('type', 'button').addClass('btn btn-default'); //variable that creates the buttons
		a.addClass('animals'); // added a class 
		a.attr('data-name', animals[i]); // added a data-attribute
		a.text(animals[i]); // provided the initial button text
		$('#animalsView').prepend(a); // added the button to the HTML
	}
};
// end function for displaying animal data

// this function handles events when the submit button is clicked
$('#addAnimal').on('click', function(){

	// deletes the animals prior to adding new animals (this is necessary otherwise you will have repeat buttons)
	$('#images').empty();

	// this line of code will grab the input from the textbox
	var animal = $('#animal-input').val().trim();

	// this line of code will prevent a button from showing up if there is no input when the search button is pressed
	if ($('#animal-input').val().trim() === ""){
		$('#alertModal').modal();
	} else {
		// the animal from the textbox is then added to our array
		animals.push(animal);
		renderButtons(); // this calls on the function that renders buttons based on what is inputed
		renderFunction(animal); // this calls on the function that attaches the giphy API to each button
	}	
	return false;
});
// end submit button click function

// function that triggers the submit button when users hit "enter"
$("#animal-input").keyup(function(event){
    if(event.keyCode == 13){
        $("#addAnimal").click();
    }
});
// end function that triggers the submit button when pressing "enter"

//this function gets the images from the giphy API
$('#animalsView').on('click keypress', '.animals', function(){

	// Deletes the animals prior to adding new animals (this is necessary otherwise you will have repeat images)
	$('#images').empty();
	// this line of code will grab the input from the textbox
	var animal = $(this).attr('data-name');

	renderFunction(animal);
});
// end animals view function

// function that allows user to "pause" or "play" gifs when clicking on the gif itself
$(".gifParent").on("click", ".gif", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        // If the clicked image's state is still, update it's src attribute to what it's data-animate value is.
        // Then set the image's data-state to animate
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
      }
    });
// end function that allows user to "play" or "pause" the gifs

// function that pulls the giphy API
function renderFunction(animal){
	// here we assemble our giphy API URL
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&api_key=dc6zaTOxFJmzC&";

	// perfoming an AJAX GET request for the queryURL
	$.ajax({
		url: queryURL,
		method: "GET"
	})

	// after the data from the AJAX request comes back
	.done(function(response) {
		console.log(response);

		// appending the animalImage to the images div
		for (var i = 0; i < response.data.length; i++) {
			var container = $("<div>").addClass("gifParent col-sm-6");
			
			// creating and storing an img tag
			var animalImage = $("<img>").addClass("img-rounded img-responsive");
			var rating = $("<p>").text("rating: " + response.data[i].rating);

			configImg(response.data[i], animalImage);

    		container.append(rating);
    		container.append(animalImage);
    		$("#images").append(container);
		};
	});
};
// end function that pulls the giphy API

// function that sets the image attributes
function configImg(data, image, animal){
	var imageURL = data.images.fixed_height.url;
	var imageURLStill = data.images.fixed_height_still.url;
	image.addClass("gif");
	image.attr("src", imageURLStill);
	image.attr("alt", animal);
    image.attr("data-state", "still");
    image.attr("data-still", imageURLStill);
    image.attr("data-animate", imageURL);
};
// end function that sets the image attributes

// This calls the renderButtons() function
renderButtons();