/* Add 'https://' to a link if no protocol is given */
const cleanLink = link => !link.startsWith("https://") && !link.startsWith("http://")
    ?  "https://" + link 
    : link

/* Create a link object */
const createLink = (title, url, user) => ({ title, url: cleanLink(url), user });

/* Starting link list */
const links = [
    createLink("Google", "www.google.com", "Aaron"),
    createLink("Ebay", "www.ebay.com", "Shelley"),
    createLink("Twitch", "www.twitch.com", "Tony"),
    createLink("Aurora", "gff", "fadsf")
];

/* Add a new Link to the list */
const addLink = link => links.unshift(link);

/* Submit Button */
const buttonElement = document.getElementById("submitButton");

/* Content element */
const contentElement = document.getElementById("content");
contentElement.classList = "content";

/* Create element for confirmation message */
const confirmMessage = document.createElement("p");
confirmMessage.textContent = "Link Submitted";
confirmMessage.style.fontStyle = "italic"
confirmMessage.style.backgroundColor = "rgb(204, 255, 204)";
confirmMessage.style.visibility = "hidden";
contentElement.appendChild(confirmMessage);

/* Create seperate text box for link list */
const linkContent = document.createElement("p");
linkContent.classList = "user content";
contentElement.appendChild(linkContent);

/* Create a Requried Text Input */
const creatRequiredTextInput = placeholder => {
    const elem = document.createElement("input");
    elem.type = "text";
    elem.required = true;
    elem.placeholder = placeholder;
    return elem;
}

/* Create a link Element for a given Link object */
const renderLink = link => {
    const linkListElement = document.createElement("div");
    linkListElement.classList = "link";  
  
    const boldTitleElement = document.createElement("h4");
    boldTitleElement.classList = "linkHeadline";

    const linkTitle = document.createElement("a");
    linkTitle.classList = "linkTitle";
    linkTitle.textContent = link.title;
    linkTitle.href = link.url

    const linkUrl = document.createElement("span");
    linkUrl.classList = "linkUrl";
    linkUrl.textContent = link.url;

    const linkAuthorElement = document.createElement("span");
    linkAuthorElement.classList = "linkAuthor";
    linkAuthorElement.textContent = link.user;

    boldTitleElement.appendChild(linkTitle);
    boldTitleElement.appendChild(linkUrl);
    linkListElement.appendChild(boldTitleElement);
    linkListElement.appendChild(linkAuthorElement);
    linkContent.appendChild(linkListElement);
}

/* Clean the slate and render all the links */
const renderLinks = () => {
    linkContent.textContent = "";
    links.forEach(renderLink);
}

/* Show the confirmation message for a couple of seconds*/
const showSubmitMessage = () => {
    confirmMessage.style.visibility = "visible";
    setTimeout(() => { confirmMessage.style.visibility = "none" }, 2000);
}

/* Create form once submit button is clicked */
const createLinkForm = () => {
    const formElement = document.createElement("form");
    const formBlock = document.createElement("p");

    const nameEntry = creatRequiredTextInput("Your Name");
    const titleEntry = creatRequiredTextInput("URL Title");
    const urlEntry = creatRequiredTextInput("Link URL");

    const submitElement = document.createElement("input");
    submitElement.type = "submit";
    submitElement.value = "Submit";

    formBlock.appendChild(nameEntry);
    formBlock.appendChild(titleEntry);
    formBlock.appendChild(urlEntry);
    formBlock.appendChild(submitElement);
    
    formElement.appendChild(formBlock);

    submitElement.addEventListener("click", e => {
        addLink(createLink(titleEntry.value, urlEntry.value, nameEntry.value));
        showSubmitMessage();
        renderLinks();
    });
    
    linkContent.prepend(formElement);
};

renderLinks();
buttonElement.addEventListener("click", createLinkForm);

