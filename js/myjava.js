//This was my initial JS file it's not actually being used but I kept it in just in case.
//----------------------------------------------------------------------------------
//RSS Functions
function loadRSS() {
    //Use CORS API website as proxy
    let proxy = 'https://cors-anywhere.herokuapp.com/';
    //Declare the URL where we fetch RSS file
    let url = "http://feeds.bbci.co.uk/news/rss.xml";
    //NASA RSS: https://www.nasa.gov/content/nasa-rss-feeds
    // NASA education news: https://www.nasa.gov/rss/dyn/educationnews.rss
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
    //Load all "items" inside the RSS document, each item is a news
    let items = rss.responseXML.getElementsByTagName("item");
    let rssContent = "";//varible "rssContent" is used to store rss content in HTML format
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
        //Format the extracted information above in HTML format and append it to the "rssContent" variable
        //each item (news) is wrapped inside a <div>
        rssContent += `
        <div style="background-color: lightgray; margin: 2px;"> 
            <h3>${title}</h3>
            <p style="font-style: italic;">${pubdate}</p>
            <p>${description}</p>
            <p><a href="${link}">Read more</a></p>
        </div>`;
    }
    //Display the "rssContent" on the webpage
    document.getElementById("rssFeed").innerHTML = rssContent;
} 

//Functions to do with Javascript Demonstrations
//Make array of products
//Transitional hybrid of products and movies 
let ProductArray = [
    {id: 0, productname: "Apple iPhone 13 mini", description: "128GB storage, Colour: Midnight, Single SIM", price:"$1,180", image_url:"products/product_0"},
    {id: 1, productname: "Apple iPhone SE", description: "3rd gen, 256GB storage, Colour: Red, Single SIM", price:"$1,150", image_url: "products/product_1"},
    {id: 2, title: "The Dark Knight", year: 2008, image_url: "movies/movie2.jpg"},
    {id: 3, title: "12 Angry Men", year: 1957, image_url: "movies/movie3.jpg"},
    {id: 4, title: " Schindler's List", year: 1993, image_url: "movies/movie4.jpg"},
];



