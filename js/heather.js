//info needed to reach api
const apiKey = 'AIzaSyA0q8--SqOCiWRy-1ixKbwYDzgGEprsMUo'; // shouldn't need this -- incorporate later if needed
const url = 'https://www.googleapis.com/books/v1/volumes'; 
const queryParams = '?q=';

// select page elements
const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const content = document.querySelector('#content');

// make the call
const getResults = () => {
	const wordQuery = inputField.value;
	const endpoint = `${url}${queryParams}${wordQuery}`;

	fetch(endpoint).then(response => {
		if (response.ok) {
			return response.json();
		}
		throw new Error('Request failed!');
	}, networkError => {
		console.log(networkError.message)
	}).then(jsonResponse => {
		renderResponse(jsonResponse);
	} );
}

// render results
const displayResults = (event) => {
	getResults();
}
submit.addEventListener('click', displayResults);

// helper functions for creating UI
function createNode(element) {
	return document.createElement(element);
}

function append(parent, el) {
	return parent.appendChild(el);
}

// Format response to look presentable on webpage
const renderResponse = (res) => {
  // Handle if res is falsey
  if(!res){
	console.log(res.status);
  }
  // In case res comes back as a blank array
  if(!res.items.length){
	content.innerHTML = "<p>Please try another search.</p><p>Our super computers couldn't find anything matching what you entered.</p>";
	return;
  }


  // Loop thru response and creates an div for each 
  for (var i = 0; i < res.items.length; i++) {
		var item = res.items[i];  

		// put the values into variables
	  	
		var title = item.volumeInfo.title || ''; 
		var authors = item.volumeInfo.authors || '';
		var publisher = item.volumeInfo.publisher || '';
		var imgUrl = item.volumeInfo.imageLinks.thumbnail || 'img/placeholder_book.png';
		var infoUrl = item.volumeInfo.infoLink || '';

		// create elements
		let div = createNode('div'); 
		div.className = 'col-lg-4 book';
		div.innerHTML = 
			'<a class="portfolio-item" id="result" href="' + infoUrl + '" target="_blank">' +
			  '<span class="caption">' +
				'<span class="caption-content">' +
				  '<h2 id="title">' + title + '</h2>' +
				  '<p class="mb-0" id="author">' + authors + '</p>' +
				  '<p class="mb-0" id="publisher">' + publisher + '</p>' +
				'</span>' +
			  '</span>' +
			  '<img class="img-fluid" id="cover" src="' + imgUrl + '" alt="">' +
			'</a>';
		append(document.getElementById('content'), div);  
	}
	// display search feedback
	var feedback = document.getElementById("searchFeedback");
	feedback.innerHTML = 'Books matching: ' + inputField.value;
	// scroll to results
	searchFeedback.scrollIntoView();
}

// make search work onclick
var input = document.getElementById("input");
input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
	document.getElementById("submit").click();
  }
});