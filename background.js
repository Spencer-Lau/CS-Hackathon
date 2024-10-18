chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status === 'complete' && tab.url) {
//     console.log(`Tab updated: ${tab.url}`);
//   }
// });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getData') {
    // Fetch or process data here
    sendResponse({ data: 'Sample data' });
  }
});
