document.addEventListener('DOMContentLoaded', () => {
  const divBoard = document.getElementById('quote');
  const loadingSpinner = document.getElementById('loadingSpinner');
  const cycleDiv = document.getElementById('cycleDiv');
  const audio = document.getElementById('myAudio');
  const toggleButton = document.getElementById('toggleAutoFetch');
  const muteButton = document.getElementById('toggleMute');
  const volumeSlider = document.getElementById('volumeSlider');

  const quoteDiv = createElement('span', 'quote');
  const authorDiv = createElement('span', 'author');
  const quoteTooltip = createTooltip('quoteTooltip');
  const autoQuoteTooltip = createTooltip('autoQuoteTooltip');
  const muteTooltip = createTooltip('muteTooltip');

  // Set up audio
  setupAudio(audio, volumeSlider);

  // Initialize
  divBoard.append(quoteDiv, authorDiv);
  fetchQuote();
  animateCycle();

  // Fetch a random quote
  async function fetchQuote() {
    toggleLoadingSpinner(true);
    try {
      const response = await fetch('http://quotable.io/random');
      if (!response.ok) throw new Error('Network response was not ok');
      const { content, author } = await response.json();
      displayQuote(content, author);
    } catch (error) {
      handleFetchError(error);
    } finally {
      toggleLoadingSpinner(false);
    }
  }

  // Utility Functions
  function toggleLoadingSpinner(show) {
    loadingSpinner.style.display = show ? 'block' : 'none';
  }

  function handleFetchError(error) {
    console.error('Error fetching quote:', error);
    quoteDiv.innerText = 'Slight delay. Please click to load a new quote.';
    authorDiv.innerText = '';
  }

  function displayQuote(content, author) {
    quoteDiv.innerText = `"${content}"`;
    authorDiv.innerText = `-${author}`;
    showElements(quoteDiv, authorDiv);
  }

  function showElements(...elements) {
    elements.forEach(el => el.classList.add('show'));
  }

  // Tooltip Function
  function createTooltip(id) {
    const tooltip = document.getElementById(id);
    return {
      show: (text) => {
        tooltip.style.display = 'block';
        tooltip.innerText = text;
      },
      hide: () => {
        tooltip.style.display = 'none';
      }
    };
  }

  // Mute functionality
  let isMuted = false; // Track mute state

  muteButton.addEventListener('click', toggleMute);
  muteButton.addEventListener('mouseenter', () => muteTooltip.show(isMuted ? 'Mute: On' : 'Mute: Off'));
  muteButton.addEventListener('mouseleave', muteTooltip.hide);

  function toggleMute() {
    isMuted = !isMuted; // Toggle mute state
    audio.muted = isMuted; // Mute or unmute audio
    muteTooltip.show(isMuted ? 'Mute: On' : 'Mute: Off'); // Update tooltip text
  }

  // Setup Audio
  function setupAudio(audio, volumeSlider) {
    audio.volume = 0.2; // Set volume
    audio.autoplay = true; // Enable autoplay
    audio.loop = true; // Enable looping
    audio.load(); // Reload audio

    volumeSlider.addEventListener('input', () => {
      audio.volume = volumeSlider.value; // Set audio volume to slider value
    });
  }

  // Toggle auto-fetch on button click
  let autoFetchEnabled = false;
  let autoFetchInterval;

  toggleButton.addEventListener('click', toggleAutoFetch);
  toggleButton.addEventListener('mouseenter', () => autoQuoteTooltip.show(autoFetchEnabled ? '30" Quotes: On' : '30" Quotes: Off'));
  toggleButton.addEventListener('mouseleave', autoQuoteTooltip.hide);

  function toggleAutoFetch() {
    autoFetchEnabled = !autoFetchEnabled; // Toggle the flag
    autoQuoteTooltip.show(autoFetchEnabled ? '30" Quotes: On' : '30" Quotes: Off'); // Update tooltip text

    if (autoFetchEnabled) {
      autoFetchInterval = setInterval(fetchQuote, 30000); // Start auto-fetching quotes every 30 seconds
    } else {
      clearInterval(autoFetchInterval); // Stop auto-fetching
    }
  }

  // Toggle quotes on button click
  let quotesEnabled = true; // Track quote state
  const quoteToggleButton = document.getElementById('toggleQuotes');

  quoteToggleButton.addEventListener('click', toggleQuotes);
  quoteToggleButton.addEventListener('mouseenter', () => quoteTooltip.show(quotesEnabled ? 'Quotes: On' : 'Quotes: Off'));
  quoteToggleButton.addEventListener('mouseleave', quoteTooltip.hide);

  function toggleQuotes() {
    quotesEnabled = !quotesEnabled; // Toggle quotes state
    quoteTooltip.show(quotesEnabled ? 'Quotes: On' : 'Quotes: Off'); // Update tooltip text

    if (quotesEnabled) {
      fetchQuote(); // Fetch a new quote if enabled
    } else {
      quoteDiv.innerText = ''; // Clear the quote display if disabled
      authorDiv.innerText = ''; // Clear the author display if disabled
    }
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