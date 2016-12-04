// initial array of animals
var animals = ['rat', 'mouse', 'dog', 'cat', 'narwhal'];
var colors = ["#009688", "#CCF2F6", "#3F51B5", "#673AB7", "#9C27B0"];
// function for displaying animal data 
function renderButtons(){ 

	// Deletes the animals prior to adding new animals (this is necessary otherwise you will have repeat buttons)
	$('#animalsView').empty();

	// Loops through the array of animals
	for (var i = 0; i < animals.length; i++){

	// Then dynamicaly generates buttons for each movie in the array

		// Note the jQUery syntax here... 
		var a = $('<button>').attr('type', 'button').addClass('btn btn-default'); // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		a.addClass('animals'); // Added a class 
		a.attr('data-name', animals[i]); // Added a data-attribute
		a.text(animals[i]); // Provided the initial button text
		$('#animalsView').prepend(a); // Added the button to the HTML
	}
}

// this function handles events when the submit button is clicked
$('#addAnimal').on('click', function(){

	// Deletes the animals prior to adding new animals (this is necessary otherwise you will have repeat buttons)
	$('#images').empty();

	// this line of code will grab the input from the textbox
	var animal = $('#animal-input').val().trim();

	// this line of code will prevent a button from showing up if there is no input when the search button is pressed
	if ($('#animal-input').val().trim() === ""){
		$('#alertModal').modal();
	} else {
		// the animal from the textbox is then added to our array
		animals.push(animal);
		// our array then runs which handles the processing of our animal array
		renderButtons();
		renderFunction(animal);
	}	
	// We have this line so that users can hit "enter" instead of clicking on the button and it won't move to the next page
	return false;
});
// end submit button click function

//this function gets the images from the giphy API
$('#animalsView').on('click keypress', '.animals', function(){

	// Deletes the animals prior to adding new animals (this is necessary otherwise you will have repeat images)
	$('#images').empty();
	// this line of code will grab the input from the textbox
	var animal = $(this).attr('data-name');

	renderFunction(animal);
});

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
			var container = $("<div>").addClass("gifParent");
			
			// creating and storing an img tag
			var animalImage = $("<img>").addClass("img-rounded");
			var rating = $("<p>").text("rating: " + response.data[i].rating);

			configImg(response.data[i], animalImage);

    		container.append(rating);
    		container.append(animalImage);
    		$("#images").append(container);
		};
	});
};

function configImg(data, image, animal){
	var imageURL = data.images.fixed_height.url;
	var imageURLStill = data.images.fixed_height_still.url;
	// setting the animalImage src attribute to imageURL
	image.attr("src", imageURLStill);
	image.attr("alt", animal);
	image.addClass("gif");
    image.attr("data-state", "still");
    image.attr("data-still", imageURLStill);
    image.attr("data-animate", imageURL);
};

// This calls the renderButtons() function
renderButtons();