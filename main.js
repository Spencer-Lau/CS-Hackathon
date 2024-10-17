//3. make an http request to quotes API
    //4.1 quote goes away after 30 seconds 
    // if quote is clicked it goes away    

//make a fetch reques to this API to generate random quote:
    //
document.addEventListener('DOMContentLoaded', () => {
    //create a div for the quote
    const divBoard = document.getElementById('quote')

    const quoteDiv = document.createElement('span');
    quoteDiv.setAttribute('class', 'quote');
    const authorDiv = document.createElement('span', '.author');
    authorDiv.setAttribute('class', 'author');
    //fetch quote from api
    fetch('http://quotable.io/random')
    .then ((response) => {
        return response.json()
    })
    .then((data) => {
        //console.log(data.content)
        let quote = `"${data.content}"`;
        let author = data.author;
       //console.log(quote, author)
       
       //set div inner text
       quoteDiv.innerText = quote;
       authorDiv.innerText = author; 

       //append divs to document
       divBoard.appendChild(quoteDiv)
       divBoard.appendChild(authorDiv)
       
    })



})
    
    