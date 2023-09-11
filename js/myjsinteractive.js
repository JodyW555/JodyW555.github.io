/** @format */

//RSS Functions
function loadRSS() {
	//Use CORS API website as proxy
	//NOTE: Request temporary access here: https://cors-anywhere.herokuapp.com/corsdemo
	let proxy = "https://cors-anywhere.herokuapp.com/";
	//Declare the URL where we fetch RSS file
	let url = "https://lifehacker.com/rss";
	//NASA RSS: https://www.nasa.gov/content/nasa-rss-feeds (not working)
	// NASA education news: https://www.nasa.gov/rss/dyn/educationnews.rss (not working)
	//CNN RSS: https://edition.cnn.com/services/rss/
	// CNN RSS top stories: http://rss.cnn.com/rss/edition.rss
	//BBC RSS: http://feeds.bbci.co.uk/news/rss.xml
	//Create an XMLHttpRequest Object to request XML file (data) through HTTP protocol
	let xhttp = new XMLHttpRequest();
	xhttp.open("GET", proxy + url, true);
	xhttp.send();
	//Process RSS file when it has been loaded successfully
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			//Load XML file as "XML" format and parse/process it by calling function parseRSS()
			let rss = this.responseText;
			parseRSS(this);
		}
	};
}

function parseRSS(rss) {
	//Load all "items" inside the RSS document, each item is news
	let items = rss.responseXML.getElementsByTagName("item");
	let rssContent = ""; //varible "rssContent" is used to store rss content in HTML format
	//Loop through all items and extract child node content: "title", "link", "description" and "pubdate"
	for (let i = 0; i < items.length; i++) {
		let nodes = items[i].children;
		//Extract "title", "link", "description" and "pubdate" of each "node"
		let title, pubdate, description, link;
		for (let j = 0; j < nodes.length; j++) {
			if (nodes[j].tagName == "title") {
				title = nodes[j].childNodes[0].nodeValue;
			} else if (nodes[j].tagName == "link") {
				link = nodes[j].childNodes[0].nodeValue;
			} else if (nodes[j].tagName == "description") {
				description = nodes[j].childNodes[0].nodeValue;
			} else if (nodes[j].tagName == "pubDate") {
				pubdate = nodes[j].childNodes[0].nodeValue;
			}
		}
		//Format the information in HTML format and append it to the "rssContent" variable
		//each item (news) is put onto a card that is nicely formatted (Thanks Ian although I did add some extra "style")
		rssContent += `
          <div class="col">
            <div class="card h-100">
              <div style="background-color: lightgray; margin 2px;" class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${pubdate}</p>
                <p class="card-text">${description}</p>
                <p class="card-text"><a href="${link}">Read more</a></p>
              </div>
            </div>
          </div>`;
	}

	//Display the "rssContent" on the webpage
	document.getElementById("rssFeed").innerHTML = rssContent;
}

//------------------------------------------------------------------------------
//Functions to do with Javascript Demonstration page
//Make array of products
let ProductArray = [
	{
		id: 0,
		title: "Apple iPhone 13 mini",
		description: "128GB storage, Colour: Midnight",
		price: "$1,180",
		image_url: "products/product_0.jpg",
	},
	{
		id: 1,
		title: "Apple iPhone SE",
		description: "3rd gen, 256GB storage, Colour: Red",
		price: "$1,150",
		image_url: "products/product_1.jpg",
	},
	{
		id: 2,
		title: "Apple iPhone 12",
		description: "64GB storage, Colour: Purple",
		price: "$1,000",
		image_url: "products/product_2.jpg",
	},
	{
		id: 3,
		title: "Samsung Galaxy Watch5",
		description: "40mm diameter, Colour: Pink Gold, Bluetooth",
		price: "$450",
		image_url: "products/product_3.jpg",
	},
	{
		id: 4,
		title: "Spigen iPhone 13 mini case",
		description: "Ultra Hybrid, Colour: Crystal Clear",
		price: "$40",
		image_url: "products/product_4.jpg",
	},
	{
		id: 5,
		title: "Momax USB wall charger",
		description: "2 USB ports, 1 high speed, made for Apple iPhone",
		price: "$25",
		image_url: "products/product_5.png",
	},
];

// This function will store the data from the HTML form
//Sourced from https://dev.to/awaisalwaisy/how-to-store-html-form-value-in-an-array
function storeInput() {
	// Initialize an empty array
	const inputArray = [];

	// Get the input elements
	const input1 = document.getElementById("input1");
	const input2 = document.getElementById("input2");
	const input3 = document.getElementById("input3");

	// Get the values of the input elements
	const value1 = input1.value;
	const value2 = input2.value;
	const value3 = input3.value;

	// Add the values to the array
	inputArray.push(value1, value2, value3);

	// Print the array to the console
	console.log(inputArray);
}

//-------------------------------------------------------------
//Demo 1: Slideshows
//Manual Slideshow
let slideIndex = 0; //Initial slide = 0
function nextSlide() {
	//Change the slide_index
	if (slideIndex < ProductArray.length - 1) {
		slideIndex++;
	} else {
		slideIndex = 0;
	}
	//Change the image source for the img
	document.getElementById("manual-slide-title").innerHTML = ProductArray[slideIndex].title;
	document.getElementById("manual-slide-image").src = ProductArray[slideIndex].image_url;
}

function previousSlide() {
	//Change the slide_index
	if (slideIndex > 0) {
		slideIndex--;
	} else {
		slideIndex = ProductArray.length - 1;
	}
	//Change the image source for the img
	document.getElementById("manual-slide-title").innerHTML = ProductArray[slideIndex].title;
	document.getElementById("manual-slide-image").src = ProductArray[slideIndex].image_url;
}

//Automatic Slideshow
let autoSlideIndex = 0; //Initial slide = 0
function autoSlideShow() {
	//Change the slide_index
	if (autoSlideIndex < ProductArray.length - 1) {
		autoSlideIndex++;
	} else {
		autoSlideIndex = 0;
	}
	//Change the image source for the image
	document.getElementById("auto-slide-title").innerHTML = ProductArray[autoSlideIndex].title;
	document.getElementById("auto-slide-image").src = ProductArray[autoSlideIndex].image_url;
	//Wait 2 seconds
	setTimeout(autoSlideShow, 4000); //Auto change slide every 4 seconds
}

autoSlideShow(); // Call to run auto slideshow

//---------------------------------------------------------------
//Demo 2
//Online shop - grid of 6 products
//Make html content for all items in the array
let htmlContent = "";
for (let i = 0; i < ProductArray.length; i++) {
	let itemContent = `<div class="item-style">							     
								        <h3 class="item-title-style">${ProductArray[i].title}</h3>
                        <img src=${ProductArray[i].image_url} class="item-image-style">
								        <p class="item-price-style">${ProductArray[i].price}</p>
                        <p class="item-description-style">${ProductArray[i].description}</p>   						
                     </div>
                     `;
	htmlContent += itemContent; //build up the html render
}

//Display all products on webpage UI
document.getElementById("product-list").innerHTML = htmlContent;

/*
let htmlContent = "";
for (let i = 0; i < ProductArray.length; i++) {
	let itemContent = `<div class="item-style">							     
								        <h3 class="item-title-style">${ProductArray[i].title}</h3>
                        <img src=${ProductArray[i].image_url} class="item-image-style">
								        <p class="item-price-style">${ProductArray[i].price}</p>
                        <p class="item-description-style">${ProductArray[i].description}</p>   						
                     </div>
                     `;
	htmlContent += itemContent; //build up the html render
}

//Display all products on webpage UI
document.getElementById("product-list").innerHTML = htmlContent;
*/

//---------------------------------------------------------------
//Demo 2 etchings in case shopping cart doesn't work out
//DROPDOWN MENU TO SELECT product
//Populate the select "options" with all the Products in the array when the page is loaded
function loadMyProducts() {
	let productSelect = document.getElementById("my-productList");
	for (var i = 0; i < ProductArray.length; i++) {
		//Create a new child HTML node/element as "<option>" (as a child node)
		let node = document.createElement("option");
		//Assign option "text content" and "value" to this new node
		node.value = ProductArray[i].id.toString();
		node.textContent = ProductArray[i].title.toString();
		//Append the above HTML node (option) to the parent node "productList"
		productSelect.appendChild(node);
	}
	//Set the first product as selected option in drop-down list
	productSelect.selectedIndex = "0";
}
//call to execute this function when loading the webpage
loadMyProducts();

//When user select an option in the dropdown menu (select), display that option
function displayMyProduct() {
	//Get the selected product "option value"
	let selectedproductIndex = document.getElementById("my-productList").value;
	document.getElementById("my-productTitle").innerHTML = ProductArray[selectedproductIndex].title;
	document.getElementById("my-productImageURL").src = ProductArray[selectedproductIndex].image_url;
	document.getElementById("my-productPrice").innerHTML = ProductArray[selectedproductIndex].price;
	document.getElementById("my-productDescript").innerHTML = ProductArray[selectedproductIndex].description;
}

//--------------------------------------------------------------
//Demo 3
//WEB PAGE CUSTOMISATION
//Took a bit of working at it, but finally got it working.
//Then it didn't, found a snippet I'd put in to try and fix my accordions had broken my whole js file.
//Removed snippet and all is well in my (cyber) world.
//Change text size to selected size
function customiseText() {
	let selectedTextSize = document.getElementById("text-size").value;
	document.getElementById("angrymentext").style.fontSize = selectedTextSize;
}

//Change background color
//NOTE: Cannot seem to get it to change colour of card
//Tried card.body.style.backgroundColor = selectedBGColor;
//And card.body.style.backgroundColor = selectedBGColor;
function changeColour() {
	let selectedBGColour = document.getElementById("colourOption").value;
	document.getElementById("page_content").style.backgroundColor = selectedBGColour;
}

//---------------------------------------------------------------
//Demo 4: Initially going tp be add comment to a product
//Couldn't get it to work so changed tack
//Can't get like/dislike to work either
//------------------------------------------------------------------------------------------------------
//VOTE: LIKE / DISLIKE
//Assume the current Votes are: 20 likes and 5 dislikes
let currentVotes = { like: 20, dislike: 5 };

//Load the current votes to HTML page
document.getElementById("likeNumber").innerHTML = currentVotes.like;
document.getElementById("dislikeNumber").innerHTML = currentVotes.dislike;

//Variables to track the clicking status
//RULE: Allow to vote only one: UP or DOWN
let voteStatus = { like: false, dislike: false };

//Click Like button
function like() {
	//Check current status of "like" button (has been clicked or not)
	if (voteStatus.like == false) {
		//Increase a "Like": Increase the like number by 1
		document.getElementById("likeNumber").innerHTML = currentVotes.like + 1;
		//Change the background color of Like button to GREEN
		document.getElementById("likeButton").style.backgroundColor = "green";
		//Change the current status of "like" button: has been clicked
		voteStatus.like = true; //

		//Check "dislike" status - if dislike has been voted, down it by one & change status to False & change background color to white
		if (voteStatus.dislike == true) {
			document.getElementById("dislikeNumber").innerHTML = currentVotes.dislike;
			voteStatus.dislike = false; //
			document.getElementById("dislikeButton").style.backgroundColor = "white";
		}
	} else {
		//Keep the current number of like
		document.getElementById("likeNumber").innerHTML = currentVotes.like;
		//Change the background color of Like button to WHITE
		document.getElementById("likeButton").style.backgroundColor = "white";
		//Change the current status of "like" button
		voteStatus.like = false; //has been clicked
	}
}

//There were maybe errors in this code from DD's Codepen, "parrent_node" which might matter?
//Some bits VS code didn't like - I modified it but it won't work.
//Doesn't show comments and doesn't add any comments.
//Data: Assume we have a list of existing comments stored in an array "allComments"
let allComments = [
	{ name: "Jody", comment: "My next phone?  Love the colour!" },
	{ name: "Simon", comment: "Hmm I don't like the single SIM. Does it come in gunmetal?" },
	{ name: "Doug", comment: "Does the job. No frills." },
];

//----------
//Load all existing comments and display them on HTML
function loadComments() {
	//Loop through all comments in the array "allComments"
	for (var i = 0; i < allComments.length; i++) {
		let name = allComments[i].name;
		let comment = allComments[i].comment;
		//
		//Create a new HTML node/element <P> to display this comment
		let node = document.createElement("P");
		let textnode = document.createTextNode(name + ": " + comment);
		node.appendChild(textnode); //Append the content (created TextNode) to the HTML Node (child)
		let parent_node = document.getElementById("comment-list"); //Get the id of parent node "comment-list"
		parent_node.appendChild(node); //Append the above child HTML node to the parent node
	}
}
//Call to run this loadComments function when the webpage is loaded.
loadComments();

//Add comments
function addComment() {
	//Get entered value/data by user
	let enteredCommentName = document.getElementById("comment_name").value;
	let enteredCommentText = document.getElementById("comment_text").value;

	//Add this new comment to the array
	allComments.push({ name: enteredCommentName, comment: enteredCommentText });
	alert("Thanks. Are you really sure you want to say that?");

	//Display this new comment on HTML page
	//Create a new child HTML node/element as "<p>" (paragraph) (as a child node)
	let node = document.createElement("P");
	//Create a new TextNode
	let textnode = document.createTextNode(enteredCommentName + ": " + enteredCommentText);
	//Append the content (created TextNode) to the HTML Node (child)
	node.appendChild(textnode);
	//Get the id of parent node "comment-list"
	let parent_node = document.getElementById("comment-list");
	//Append the above child HTML node to the parent node
	parent_node.appendChild(node);

	//Clear comment box
	document.getElementById("comment_name").value = "";
	document.getElementById("comment_text").value = "";
}

//This from CodePen directly pasted in and it won't work for me
//Data: Assume we have a list of existing comments stored in an array "allComments"
/*
let allComments = [
	{ name: "Ian", comment: "Recommended, good one" },
	{ name: "Aman", comment: "I don't like the color" },
	{ name: "John", comment: "Love it" },
];

//----------
//Load all existing comments and display them on HTML
function loadComments() {
	//Loop through all comments in the array "allComments"
	for (var i = 0; i < allComments.length; i++) {
		let name = allComments[i].name;
		let comment = allComments[i].comment;
		//
		//Create a new HTML node/element <P> to display this comment
		let node = document.createElement("P");
		let textnode = document.createTextNode(name + ": " + comment);
		node.appendChild(textnode); //Append the content (created TextNode) to the HTML Node (child)
		let parrent_node = document.getElementById("comment-list"); //Get the id of parent node "comment-list"
		parrent_node.appendChild(node); //Append the above child HTML node to the parent node
	}
}

loadComments();

//----------
//Add a new comment
function addComment() {
	//Get entered value/data by user
	let enteredCommentName = document.getElementById("comment_name").value;
	let enteredCommentText = document.getElementById("comment_text").value;

	//Add this new comment to the array
	allComments.push({ name: enteredCommentName, comment: enteredCommentText });
	alert("Thank you for your comment!");

	//Display this new comment on HTML page
	//Create a new child HTML node/element as "<p>" (paragraph) (as a child node)
	let node = document.createElement("P");
	//Create a new TextNode
	let textnode = document.createTextNode(enteredCommentName + ": " + enteredCommentText);
	//Append the content (created TextNode) to the HTML Node (child)
	node.appendChild(textnode);
	//Get the id of parent node "comment-list"
	let parrent_node = document.getElementById("comment-list");
	//Append the above child HTML node to the parent node
	parrent_node.appendChild(node);

	//Clear comment box
	document.getElementById("comment_name").value = "";
	document.getElementById("comment_text").value = "";
}
*/

//------------------------------------------------------------------------------------------------------
//This code slightly different comes from Demo 3 word document - still can't get it working
//ADD NEW COMMENT
//Data: Assume we have a list of existing comments stored in an array "allComments"
/*
let allComments = [
	{ name: "Ian", comment: "Recommended, good one" },
	{ name: "Aman", comment: "I don't like this product" },
	{ name: "John", comment: "Love it" },
];

//----------
//Load all existing comments and display them on HTML
function loadComments() {
	//Loop through all comments in the array "allComments"
	for (var i = 0; i < allComments.length; i++) {
		let name = allComments[i].name;
		let comment = allComments[i].comment;
		//
		//Create a new HTML node/element <P> to display this comment
		let node = document.createElement("P");
		let textnode = document.createTextNode(name + ": " + comment);
		node.appendChild(textnode); //Append the content (created TextNode) to the HTML Node (child)
		let parrent_node = document.getElementById("comment-list"); //Get the id of parent node "comment-list"
		parrent_node.appendChild(node); //Append the above child HTML node to the parent node
	}
}
//Call to run this loadComments function when the webpage is loaded.
loadComments();

//----------
//Add a new comment
function addComment() {
	//Get entered value/data by user
	let enteredCommentName = document.getElementById("comment_name").value;
	let enteredCommentText = document.getElementById("comment_text").value;

	//Add this new comment to the array
	allComments.push({ name: enteredCommentName, comment: enteredCommentText });
	alert("Thank you for your comment!");

	//Display this new comment on HTML page
	//Create a new child HTML node/element as "<p>" (paragraph) (as a child node)
	let node = document.createElement("P");
	//Create a new TextNode
	let textnode = document.createTextNode(enteredCommentName + ": " + enteredCommentText);
	//Append the content (created TextNode) to the HTML Node (child)
	node.appendChild(textnode);
	//Get the id of parent node "comment-list"
	let parrent_node = document.getElementById("comment-list");
	//Append the above child HTML node to the parent node
	parrent_node.appendChild(node);

	//Clear comment box
	document.getElementById("comment_name").value = "";
	document.getElementById("comment_text").value = "";
}
*/
