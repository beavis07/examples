/* PETE: Clean up the URL when you create a Link so it only has to be done one time - see "cleanLink" functionn below */
class Link {
    constructor(title, url, user) {
        this.title = title;
        this.url = cleanLink(url); // Tidy up links at creation-time
        this.user = user;
    }
}

/* PETE: Add 'https://' to a link if no protocol is given */
function cleanLink (link) {
    if (!link.startsWith("https://") && !link.startsWith("http://")) {
        return "https://" + link;
    }

    return link;
}

/* PETE: Normalise the starting list, using the Link class - just so it's consistent */
const links = [
    new Link("Google", "www.google.com", "Aaron"),
    new Link("Ebay", "www.ebay.com", "Shelley"),
    new Link("Twitch", "www.twitch.com", "Tony"),
    new Link("Aurora ", "gff", "fadsf")
];

//create content element
const contentElement = document.getElementById("content");
contentElement.classList = "content";

//create element for confirmation message
const confirmElement = document.createElement("div");
confirmElement.textContent = "";
confirmElement.style.backgroundColor = "rgb(204, 255, 204)";
contentElement.appendChild(confirmElement);

//create confirmation message text box
const confirmMessage = document.createElement("p");
confirmElement.appendChild(confirmMessage);

//create seperate text box for link list
const linkContent = document.createElement("p");
linkContent.classList = "user content";
linkContent.id = "linkContent";
contentElement.appendChild(linkContent);

//display links on page as a function to recall when new links are added
function showLinks() {
    //remove original list of links to stop duplicate list being added
    linkContent.textContent = "";

    for (const link of links) {  
        const linkListElement = document.createElement("div");
        linkListElement.id = "linkList";
        linkListElement.classList = "link";  
      
        const boldTitleElement = document.createElement("h4");
        boldTitleElement.classList = "linkHeadline";

        const linkTitle = document.createElement("a");
        linkTitle.classList = "linkTitle";
        linkTitle.id = "linkTitle";
        linkTitle.textContent = link.title + " ";
        linkTitle.href = link.url

        const linkUrl = document.createElement("span");
        linkUrl.classList = "linkUrl";
        linkUrl.textContent = link.url;
        linkUrl.id = "linkUrl";

        const linkAuthorElement = document.createElement("span");
        linkAuthorElement.classList = "linkAuthor";
        linkAuthorElement.textContent = link.user;

        boldTitleElement.appendChild(linkTitle);
        boldTitleElement.appendChild(linkUrl);
        linkListElement.appendChild(boldTitleElement);
        linkListElement.appendChild(linkAuthorElement);
        linkContent.appendChild(linkListElement);
    }
}

showLinks();

//link submission confirmation message function to show for 2 seconds
function confirmSubmit() {
    //confirmation message and style
    confirmMessage.style.fontStyle = "italic"
    confirmMessage.style.backgroundColor = "rgb(204, 255, 204)";
    confirmMessage.style.padding = "10px";
    confirmMessage.textContent = "Link Submitted";
  
    /* PETE: Wait two seconds and then remove again. Using "setTimeout" to do a one-time, scheduled action */
    setTimeout(() => {
        confirmMessage.textContent = "";
        confirmMessage.style.padding = "0px";
        console.log("done");
    }, 2000);
}

//create form once submit button is clicked
/* PETE: Make this a normal function definition - just to be consistent */
function runForm () {
    const formElement = document.createElement("form");
    formElement.id = "form";

    const formBlock = document.createElement("p");

    const nameEntry = document.createElement("input");
    nameEntry.type = "text";
    nameEntry.id = "username";
    nameEntry.required = true;
    nameEntry.placeholder = "Your Name";

    const titleEntry = document.createElement("input");
    titleEntry.type = "text";
    titleEntry.id = "username";
    titleEntry.required = true;
    titleEntry.placeholder = "URL Title";

    const urlEntry = document.createElement("input");
    urlEntry.type = "text";
    urlEntry.id = "username";
    urlEntry.required = true;
    urlEntry.placeholder = "Link URL";

    const submitElement = document.createElement("input");
    submitElement.type = "submit";
    submitElement.value = "Submit";

    document.getElementById("linkContent").insertBefore(formElement, document.getElementById("linkList"));
    formBlock.appendChild(nameEntry);
    formBlock.appendChild(titleEntry);
    formBlock.appendChild(urlEntry);
    formBlock.appendChild(submitElement);
    formElement.appendChild(formBlock);

    /* PETE: Removed the clause to remove 'runForm' from the submit button - Didn't seem to have any purpose */
    submitElement.addEventListener("click", (e) => {
        //create a new link object
        const p = new Link(titleEntry.value, urlEntry.value, nameEntry.value);

        //add new link to array
        links.unshift(p);

        /* PETE: Run confirmation message AFTER the work is done. Better to be pessimistic!*/
        confirmSubmit();

        //run function to show links on page
        showLinks();    
    });
};

// Access the button
const buttonElement = document.getElementById("submitButton");
// Listen to the "click" event
buttonElement.addEventListener("click", runForm);
