const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const previous= document.getElementById("previous");



let apiquotes = [];
let cindex = 0;

//Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden =true;
}

//hide loading
 function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
 }

// Show New Quote
function newQuote() {
    loading();
    // Pick a random quote from apiquotes array
if(cindex<(apiquotes.length)){
cindex=cindex+1;
}
    const quote = apiquotes[cindex];
   // check if authorfield is blank and replace it with "unknown"
   if(!quote.author) {
    authorText.textContent = 'unknown';
   } else {
    authorText.textContent = quote.author;

   }

   //Check quote length to determine the styling

   if(quote.text.length>100) {
     quoteText.classList.add('long-quote');
   }else {
     quoteText.classList.remove('long-quote');
   }
   quoteText.textContent = quote.text;
   complete();

}

function pQuote() {
    loading();
   
    if(cindex>0){
        cindex=cindex-1;
        }
            const quote = apiquotes[cindex];
    // Pick a random quote from apiquotes array
   // check if authorfield is blank and replace it with "unknown"
   if(!quote.author) {
    authorText.textContent = 'unknown';
   } else {
    authorText.textContent = quote.author;

   }

   //Check quote length to determine the styling

   if(quote.text.length>100) {
     quoteText.classList.add('long-quote');
   }else {
     quoteText.classList.remove('long-quote');
   }
   quoteText.textContent = quote.text;
   complete();

}


// Get quotes from Api
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl);
        apiquotes = await response.json();
       newQuote();
    } catch (error) {
        // catch error here
    }
}
//tweetquote
function tweetquote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}


// Event Listener
   newQuoteBtn.addEventListener('click', newQuote);
   previous.addEventListener('click', pQuote);
   twitterBtn.addEventListener('click', tweetquote);
// on load
getQuotes() 