//info needed to reach api
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


// clears previous results and displays new ones
const displayResults = (event) => {
	event.preventDefault();
	while(content.firstChild){
		content.removeChild(content.firstChild);
	}
	getResults();
}
submit.addEventListener('click', displayResults);