// IMPROVEMENTS FOR BETTER DOM MANIPULATION, EFFICIENCY, AND MAINTAINABILITY

//make a fetch reques to this API to generate random quote:
document.addEventListener('DOMContentLoaded', () => {
  const divBoard = document.getElementById('quote');
  const loadingSpinner = document.getElementById('loadingSpinner');
  const quoteDiv = createElement('span', 'quote');
  const authorDiv = createElement('span', 'author');
  const cycleDiv = document.getElementById('cycleDiv');
  const audio = document.getElementById('myAudio');
  const toggleButton = document.getElementById('toggleAutoFetch');
  const autoQuoteTooltip = document.getElementById('autoQuoteTooltip');
  const muteButton = document.getElementById('toggleMute');
  const volumeSlider = document.getElementById('volumeSlider');
  const muteTooltip = document.getElementById('muteTooltip');

  audio.volume = 0.2; // Set volume
  audio.autoplay = true; // Enable autoplay
  audio.loop = true; // Enable looping
  audio.load(); // Reload audio
  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value; // Set audio volume to slider value
  });

  // Initialize
  divBoard.appendChild(quoteDiv);
  divBoard.appendChild(authorDiv);
  fetchQuote();
  animateCycle();

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
      quoteDiv.innerText = 'Slight delay. Please click to load a new quote.'; // Show fallback message
      authorDiv.innerText = ''; // Clear author if there’s an error
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

  // Toggle quotes on button click
  let quotesEnabled = true; // Track quote state
  const quoteToggleButton = document.getElementById('toggleQuotes');
  const quoteTooltip = document.getElementById('quoteTooltip');

  quoteToggleButton.addEventListener('click', toggleQuotes);
  quoteToggleButton.addEventListener('mouseenter', showQuoteTooltip);
  quoteToggleButton.addEventListener('mouseleave', hideQuoteTooltip);

  function toggleQuotes() {
    quotesEnabled = !quotesEnabled; // Toggle quotes state
    quoteTooltip.innerText = quotesEnabled ? 'Quotes: On' : 'Quotes: Off'; // Update tooltip text

    if (quotesEnabled) {
      fetchQuote(); // Fetch a new quote if enabled
    } else {
      quoteDiv.innerText = ''; // Clear the quote display if disabled
      authorDiv.innerText = ''; // Clear the author display if disabled
    }
  }

  function showQuoteTooltip() {
    quoteTooltip.style.display = 'block'; // Show the tooltip
    quoteTooltip.innerText = quotesEnabled ? 'Quotes: On' : 'Quotes: Off'; // Set tooltip text based on state
  }

  function hideQuoteTooltip() {
    quoteTooltip.style.display = 'none'; // Hide tooltip
  }

  // Make sure to fetch quotes automatically if quotesEnabled is true
  if (quotesEnabled) {
    fetchQuote(); // Initial fetch
    toggleButton.addEventListener('click', toggleAutoFetch);
  }

  // Toggle auto-fetch on button click
  let autoFetchEnabled = false;
  let autoFetchInterval;

  toggleButton.addEventListener('click', toggleAutoFetch);
  toggleButton.addEventListener('mouseenter', showAutoQuoteTooltip);
  toggleButton.addEventListener('mouseleave', hideAutoQuoteTooltip);

  function toggleAutoFetch() {
    autoFetchEnabled = !autoFetchEnabled; // Toggle the flag
    autoQuoteTooltip.innerText = autoFetchEnabled
      ? '30" Quotes: On'
      : '30" Quotes: Off'; // Update tooltip text

    if (autoFetchEnabled) {
      // Start auto-fetching quotes every 30 seconds
      autoFetchInterval = setInterval(fetchQuote, 30000);
    } else {
      // Stop auto-fetching
      clearInterval(autoFetchInterval);
    }
  }

  function showAutoQuoteTooltip() {
    autoQuoteTooltip.style.display = 'block'; // Show the tooltip
    autoQuoteTooltip.innerText = autoFetchEnabled
      ? '30" Quotes: On'
      : '30" Quotes: Off'; // Set tooltip text based on state
  }

  function hideAutoQuoteTooltip() {
    autoQuoteTooltip.style.display = 'none'; // Hide tooltip
  }

  // Mute functionality
  let isMuted = false; // Track mute state

  muteButton.addEventListener('click', toggleMute);
  muteButton.addEventListener('mouseenter', showMuteTooltip);
  muteButton.addEventListener('mouseleave', hideMuteTooltip);

  function toggleMute() {
    isMuted = !isMuted; // Toggle mute state
    audio.muted = isMuted; // Mute or unmute audio
    muteTooltip.innerText = isMuted ? 'Mute: On' : 'Mute: Off'; // Update tooltip text
  }

  function showMuteTooltip() {
    muteTooltip.style.display = 'block'; // Show tooltip
    muteTooltip.innerText = isMuted ? 'Mute: On' : 'Mute: Off'; // Set tooltip text based on mute state
  }

  function hideMuteTooltip() {
    muteTooltip.style.display = 'none'; // Hide tooltip
  }

  // Function to create an element with a specific class
  function createElement(tag, className) {
    const element = document.createElement(tag);
    element.setAttribute('class', className);
    return element;
  }

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
