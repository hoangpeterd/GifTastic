// initial array of animals
var animals = ['cat', 'dog', 'mouse', 'rat'];

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
// end function for displaying animal data

// this function handles events when the button is clicked
$('#addAnimal').on('click', function(){

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
	}	

	// here we assemble our giphy API URL
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC";

	// perfoming an AJAX GET request for the queryURL
	$.ajax({
		url: queryURL,
		method: "GET"
	})

	// after the data from the AJAX request comes back
	.done(function(response){

		//saving the image_original_url property
		var imageURL = response.data.image_original_url;

		// creating and storing an img tag
		var animalImage = $("<img>");

		// setting the animalImage src attribute to imageURL
		animalImage.attr("src", imageURL);
		animalImage.attr("alt", "");

		// prepending the animalImage to the images div
		$("#animalImages").prepend();animalImage
	});

	// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
	return false;
});
// end button click function

// This calls the renderButtons() function
renderButtons();