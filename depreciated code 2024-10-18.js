// this is index.html:

// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Daily Quotes</title>
//     <link rel="stylesheet" href="index.css">
// </head>
// <body>
//     <audio id="myAudio">
//         <source src="calm-soul-meditation-247330.mp3" type="audio/mpeg">
//         Your browser does not support the audio element.
//     </audio>
//     <div id="loadingSpinner" style="display:none;"></div>
//     <div id="quote"></div>
//     <div class="cycleDiv" id="cycleDiv"></div>
//     <script src="main.js"></script>
// </body>
// </html>

// this is index.css:

// body {
//   position: relative;
//   width: 100%;
//   max-width: 500px;
//   min-height: 300px;
//   max-height: 500px;
//   background-image: url('background.jpg');
//   background-size: cover;
// }

// #loadingSpinner {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   color: white;
//   font-size: 24px;
//   text-shadow: 1px 1px 2px black;
// }

// #quote {
//   width: 500px;
//   height: 200px;
//   display: flex;
//   flex-direction: column;
// }

// .author {
//   width: 500px;
//   color: white;
//   font-size: 20px;
//   text-shadow: 1px 1px 2px black, -1px -1px 2px black, 1px -1px 2px black,
//     -1px 1px 2px black;
//   align-self: center;
// }

// .quote {
//   width: 100%;
//   height: auto;
//   color: white;
//   font-size: 25px;
//   text-shadow: 1px 1px 2.5px black, -1px -1px 2.5px black, 1px -1px 2.5px black,
//     -1px 1px 2.5px black;
// }

// .cycleDiv {
//   position: absolute;
//   bottom: 10px;
//   left: 50%;
//   transform: translateX(-50%);
//   width: 50px;
//   height: 50px;
//   margin: auto;
//   background-color: rgba(255, 255, 255, 0.5);
//   border: 2px solid white;
//   border-radius: 50%;
//   color: white;
//   font-size: 15px;
//   letter-spacing: 0.11em;
//   text-shadow: 1px 1px 2px black, -1px -1px 2px black, 1px -1px 2px black,
//     -1px 1px 2px black;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   box-shadow: 1px 1px 2px black, -1px -1px 2px black, 1px -1px 2px black,
//     -1px 1px 2px black;
//   transition: all 4s ease-in-out;
// }


// this is main.js:

// //make a fetch reques to this API to generate random quote:
// document.addEventListener('DOMContentLoaded', () => {
//   //create a div for the quote
//   const divBoard = document.getElementById('quote');
//   const quoteDiv = document.createElement('span');
//   quoteDiv.setAttribute('class', 'quote');
//   const authorDiv = document.createElement('span');
//   authorDiv.setAttribute('class', 'author');
//   //   fetch quote from api
//   //     fetch('http://quotable.io/random')
//   //       .then((response) => {
//   //         if (!response.ok) {
//   //           throw new Error('Network response was not ok');
//   //         }
//   //         return response.json();
//   //       })
//   //       .then((data) => {
//   //         //console.log(data.content)
//   //         let quote = `"${data.content}"`;
//   //         let author = `-${data.author}`;
//   //         //console.log(quote, author)

//   //         //set div inner text
//   //         quoteDiv.innerText = quote;
//   //         authorDiv.innerText = author;

//   //         //append divs to document
//   //         divBoard.appendChild(quoteDiv);
//   //         divBoard.appendChild(authorDiv);
//   //       })
//   //       .catch((error) => {
//   //         console.error('There was a problem with the fetch operation:', error);
//   //       });

//   divBoard.appendChild(quoteDiv);
//   divBoard.appendChild(authorDiv);

//   const loadingSpinner = document.getElementById('loadingSpinner');

//   const fetchQuote = async () => {
//     loadingSpinner.style.display = 'block'; // Show spinner

//     try {
//       const response = await fetch('http://quotable.io/random');
//       if (!response.ok) throw new Error('Network response was not ok');

//       const data = await response.json();
//       let quote = `"${data.content}"`;
//       let author = `-${data.author}`;

//       quoteDiv.innerText = quote;
//       authorDiv.innerText = author;

//       // Show the quote with a transition
//       showQuote();
//     } catch (error) {
//       console.error('Error fetching quote:', error);
//     } finally {
//       loadingSpinner.style.display = 'none'; // Hide spinner
//     }
//     // // Automatically hide the quote after 30 seconds
//     // setTimeout(() => {
//     //   hideQuote();
//     // }, 30000);
//   };

//   const showQuote = () => {
//     quoteDiv.classList.add('show');
//     authorDiv.classList.add('show');
//   };

//   const hideQuote = () => {
//     quoteDiv.classList.remove('show');
//     authorDiv.classList.remove('show');

//     // Fetch a new quote immediately after hiding the current one
//     fetchQuote();
//   };

//   // Initial quote fetch
//   fetchQuote();

//   //   let quoteTimeout = setTimeout(() => {
//   //     divBoard.innerHTML = ''; // Clear quotes
//   //   }, 30000);

//   //   quoteDiv.addEventListener('click', () => {
//   //     clearTimeout(quoteTimeout);
//   //     divBoard.innerHTML = ''; // Clear quotes on click
//   //   });

//   // Event listener to fetch a new quote when the current quote is clicked
//   quoteDiv.addEventListener('click', () => {
//     if (quoteDiv.innerText) {
//       // Only fetch a new quote if there's one displayed
//       hideQuote(); // This will trigger the new quote fetch
//     }
//   });

//   const cycleDiv = document.getElementById('cycleDiv');
//   //   let growing = true;

//   //   setInterval(() => {
//   //     if (growing) {
//   //       cycleDiv.style.width = '100px';
//   //       cycleDiv.style.height = '100px';
//   //       cycleDiv.innerText = 'Inhale';
//   //     } else {
//   //       cycleDiv.style.width = '50px';
//   //       cycleDiv.style.height = '50px';
//   //       cycleDiv.innerText = 'Exhale';
//   //     }
//   //     growing = !growing;
//   //   }, 4000);

//   const animateCycle = () => {
//     cycleDiv.style.transition = 'width 4s, height 4s'; // Apply transition

//     // Grow phase
//     cycleDiv.style.width = '100px';
//     cycleDiv.style.height = '100px';
//     cycleDiv.innerText = 'Inhale'; // Set text for inhale

//     // Hold for 8 seconds, but functionally 4 seconds between phases
//     setTimeout(() => {
//       // Shrink phase
//       cycleDiv.style.width = '50px';
//       cycleDiv.style.height = '50px';
//       cycleDiv.innerText = 'Exhale'; // Set text for exhale

//       // Hold for 8 seconds, but functionally 4 seconds between phases before restarting the cycle
//       setTimeout(() => {
//         animateCycle(); // Start the next cycle
//       }, 8000); // Hold after shrinking
//     }, 8000); // Hold after growing
//   };

//   animateCycle(); // Start the animation cycle

//   //audio settings:
//   const audio = document.getElementById('myAudio');
//   audio.volume = 0.2; // Sets the volume to 30%
//   audio.autoplay = true; // Enables autoplay
//   audio.load(); // Reloads the audio to apply the autoplay setting
// });



// this is manifest.json:

// {
//   "manifest_version": 3,
//   "name": "Focus",
//   "version": "1.0",
//   "description": "This extention is intended to inspire you throughout the day.",
//   "action": {
//     "default_popup": "index.html",
//     "default_icon": "sun.png"
//   },
//   "content_scripts": [
//     {
//       "matches": ["<all_urls>"],
//       "js": ["jquery.min.js", "./main.js"],
//       "css": ["index.css"],
//       "run_at": "document_end"
//     }
//   ],
//   "permissions": ["storage", "activeTab", "scripting", "tabs", "webNavigation"]
// }


// this is background.js:

// chrome.runtime.onInstalled.addListener(() => {
//   console.log("Extension installed");
// });

// // chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
// //   if (changeInfo.status === 'complete' && tab.url) {
// //     console.log(`Tab updated: ${tab.url}`);
// //   }
// // });

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "getData") {
//     // Fetch or process data here
//     sendResponse({ data: "Sample data" });
//   }
// });