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

//     // Hold for 8 seconds, with a countdown during the last 4 seconds
//     setTimeout(() => {
//       let countdown = 4; // 4 seconds countdown
//       const countdownInterval = setInterval(() => {
//         cycleDiv.innerText = `Hold ${countdown}`; // Update the text with countdown
//         countdown--;

//         if (countdown < 0) {
//           clearInterval(countdownInterval); // Clear the interval when countdown reaches zero

//           // Shrink phase
//           cycleDiv.style.width = '60px';
//           cycleDiv.style.height = '60px';
//           cycleDiv.innerText = 'Exhale'; // Set text for exhale

//           // Hold for 8 seconds and start the next countdown immediately after
//           setTimeout(() => {
//             // Countdown immediately after shrinking
//             countdown = 4; // 4 seconds countdown for the exhale phase
//             const exhaleCountdownInterval = setInterval(() => {
//               cycleDiv.innerText = `Hold ${countdown}`; // Update the text with countdown
//               countdown--;

//               if (countdown < 0) {
//                 clearInterval(exhaleCountdownInterval); // Clear the interval when countdown reaches zero
//                 animateCycle(); // Start the next cycle
//               }
//             }, 1000); // Update countdown every second
//           }, 4000); // Hold after shrinking for 8 seconds
//         }
//       }, 1000); // Update countdown every second
//     }, 4000); // Hold for 4 seconds with 'Inhale' before starting countdown
//   };

//   animateCycle(); // Start the animation cycle

//   //audio settings:
//   const audio = document.getElementById('myAudio');
//   audio.volume = 0.2; // Sets the volume to 30%
//   audio.autoplay = true; // Enables autoplay
//   audio.load(); // Reloads the audio to apply the autoplay setting
// });

document.addEventListener('DOMContentLoaded', () => {
  const divBoard = document.getElementById('quote');
  const quoteDiv = createElement('span', 'quote');
  const authorDiv = createElement('span', 'author');
  const loadingSpinner = document.getElementById('loadingSpinner');
  const cycleDiv = document.getElementById('cycleDiv');
  const audio = document.getElementById('myAudio');

  audio.volume = 0.2; // Set volume
  audio.autoplay = true; // Enable autoplay
  audio.load(); // Reload audio

  // Initialize
  divBoard.appendChild(quoteDiv);
  divBoard.appendChild(authorDiv);
  fetchQuote();
  animateCycle();

  // Function to create an element with a specific class
  function createElement(tag, className) {
    const element = document.createElement(tag);
    element.setAttribute('class', className);
    return element;
  }

  // Fetch a random quote
  async function fetchQuote() {
    loadingSpinner.style.display = 'block'; // Show spinner
    try {
      const response = await fetch('http://quotable.io/random');
      if (!response.ok) throw new Error('Network response was not ok');

      const { content, author } = await response.json();
      displayQuote(content, author);
    } catch (error) {
      console.error('Error fetching quote:', error);
    } finally {
      loadingSpinner.style.display = 'none'; // Hide spinner
    }
  }

  // Display the quote
  function displayQuote(content, author) {
    quoteDiv.innerText = `"${content}"`;
    authorDiv.innerText = `-${author}`;
    showQuote();
  }

  // Show the quote with a transition
  function showQuote() {
    quoteDiv.classList.add('show');
    authorDiv.classList.add('show');
  }

  // Hide the quote and fetch a new one
  function hideQuote() {
    quoteDiv.classList.remove('show');
    authorDiv.classList.remove('show');
    fetchQuote();
  }

  // Click event to hide and fetch a new quote
  quoteDiv.addEventListener('click', () => {
    if (quoteDiv.innerText) hideQuote();
  });

  // Animation cycle for inhale/exhale
  function animateCycle() {
    cycleDiv.style.transition = 'width 4s, height 4s';
    cycleInhale();
  }

  function cycleInhale() {
    setCycleDimensions(100, 100, 'Inhale', 4000, cycleHold);
  }

  function cycleHold() {
    countdown(4, cycleExhale);
  }

  function cycleExhale() {
    setCycleDimensions(60, 60, 'Exhale', 4000, cycleHoldExhale);
  }

  function cycleHoldExhale() {
    countdown(4, cycleInhale);
  }

  function setCycleDimensions(width, height, text, duration, callback) {
    cycleDiv.style.width = `${width}px`;
    cycleDiv.style.height = `${height}px`;
    cycleDiv.innerText = text;
    setTimeout(callback, duration);
  }

  function countdown(seconds, callback) {
    let countdownValue = seconds;
    const interval = setInterval(() => {
      cycleDiv.innerText = `Hold ${countdownValue}`;
      countdownValue--;

      if (countdownValue < 0) {
        clearInterval(interval);
        callback();
      }
    }, 1000);
  }
});
