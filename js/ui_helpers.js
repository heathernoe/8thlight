// helper functions for creating UI
function createNode(element) {
	return document.createElement(element);
}

function append(parent, el) {
	return parent.appendChild(el);
}

// Format response to look presentable on webpage
const renderResponse = (res) => {
  var alert = document.getElementById("alert");	
  var feedback = document.getElementById("searchFeedback");
	
  if(!res){
    console.log(res.status);
  } 
  if(res.totalItems == 0){
	  alert.innerHTML = "Please try again. Our super computers couldn't find any matching books.";
	  alert.className = "alert alert-danger visible";
	  feedback.className = "hidden"
  } else {
	  	// Loop thru response and creates an div for each 
	  	for (var i = 0; i < res.items.length; i++) {
			var item = res.items[i];  

			var title = item.volumeInfo.title || ''; 
			var authors = item.volumeInfo.authors || '';
			var publisher = item.volumeInfo.publisher || '';
			var imgUrl = item.volumeInfo.imageLinks.thumbnail || 'img/placeholder_book.png';
			var infoUrl = item.volumeInfo.infoLink || '';

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
		alert.className = "hidden";
	    feedback.className = "mb-5 visible"
		showFeedback();
  }
    
}

// display search feedback
function showFeedback() {
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