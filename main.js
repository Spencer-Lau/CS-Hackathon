//make a fetch reques to this API to generate random quote:
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
    console.log('Fetching quote...'); // Log fetching start
    try {
      const response = await fetch('http://quotable.io/random');
      if (!response.ok) throw new Error('Network response was not ok');
  
      const { content, author } = await response.json();
      console.log('Quote fetched:', content, 'by', author); // Log successful fetch
      displayQuote(content, author);
    } catch (error) {
      console.error('Error fetching quote:', error); // Log error
      quoteDiv.innerText = "Slight delay, please click to load a new quote."; // Show fallback message
      authorDiv.innerText = ""; // Clear author if there’s an error
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
