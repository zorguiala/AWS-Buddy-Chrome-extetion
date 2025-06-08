const GEMINI_API_KEY = "YOUR_API_KEY_HERE"; // Placeholder for API Key

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background script:", message, "from sender:", sender);

  if (message.type === "TASK_SUBMITTED" && message.task) {
    console.log("Task from popup:", message.task);

    // Simulate a case where the task itself is invalid for the AI
    if (message.task.toLowerCase() === "fail_task") {
      console.error("Simulating AI processing error for task:", message.task);
      sendResponse({ status: "error", message: "Simulated AI error: Task is invalid." });
      return false; // No async work, send response immediately
    }

    getGuidanceFromAI(message.task)
      .then(guidance => {
        console.log("AI Guidance received:", guidance);

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs.length > 0 && tabs[0].id) {
            const activeTabId = tabs[0].id;
            chrome.tabs.sendMessage(
              activeTabId,
              { type: "AI_GUIDANCE", steps: guidance.steps },
              (contentResponse) => {
                if (chrome.runtime.lastError) {
                  console.error("Error sending message to content script:", chrome.runtime.lastError.message);
                  // Inform popup about the failure to communicate with content script
                  sendResponse({ status: "error", message: `Failed to send guidance to page: ${chrome.runtime.lastError.message}` });
                } else {
                  console.log("Response from content script:", contentResponse);
                  if (contentResponse && contentResponse.status === "success") {
                    sendResponse({ status: "AI_GUIDANCE_SENT", message: `Guidance sent: ${contentResponse.message || 'First step processed.'}` });
                  } else if (contentResponse && contentResponse.status === "error"){
                    sendResponse({ status: "error", message: `Content script error: ${contentResponse.message}` });
                  } else {
                     sendResponse({ status: "AI_GUIDANCE_SENT", message: "Guidance sent to content script."});
                  }
                }
              }
            );
          } else {
            console.error("No active tab found or tab has no ID.");
            sendResponse({ status: "error", message: "Active tab not found to send guidance." });
          }
        });
      })
      .catch(error => {
        console.error("Error getting AI guidance:", error.message);
        sendResponse({ status: "error", message: `AI Error: ${error.message}` });
      });

    return true; // Indicate response will be sent asynchronously
  }
  // Handle other message types if necessary
  // else if (message.type === "CONTENT_SCRIPT_ERROR") {
  //   // This would be if content script sends a direct error message to background
  //   console.error("Error reported from content script:", message.error);
  //   // Potentially forward to popup or handle
  // }
  return true; // Keep open for other async messages if any
});

async function getGuidanceFromAI(task) {
  console.log(`Fetching guidance for task: ${task}`);

  // Simulate an API key error for a specific task input
  if (task.toLowerCase() === "error_test_key") {
    return Promise.reject(new Error("Invalid API Key (Simulated)"));
  }
  // Simulate a general API failure for another specific task input
  if (task.toLowerCase() === "error_test_api_down") {
     return Promise.reject(new Error("API Service Unavailable (Simulated)"));
  }


  // --- Mocked API Call ---
  return new Promise((resolve, reject) => { // Added reject for error simulation
    setTimeout(() => {
      // Simulate a case where AI returns an error structure (e.g. bad input)
      if (task.toLowerCase() === "error_test_ai_rejects") {
        console.warn("Simulating AI rejecting task:", task);
        // This isn't a network error, but an error from the AI's understanding/processing
        // The actual Gemini API might return a 200 OK with an error in the payload.
        // For this mock, we'll use reject for simplicity to test the catch block.
        reject(new Error("AI could not process the request (Simulated)"));
        return;
      }

      console.log("Simulating API call for task:", task);
      const mockedResponse = {
        steps: [
          { "action": "click", "selector": "#launchInstanceButton", "description": "Click the 'Launch instances' button." },
          { "action": "type", "selector": "input[name='instanceName']", "text": "My New Instance", "description": "Enter 'My New Instance' as the instance name." },
          { "action": "click", "selector": "#amiCatalogLink", "description": "Click on the 'Browse more AMIs' link." },
          // Add a step that might fail in content.js for testing
          { "action": "click", "selector": "#nonExistentButton", "description": "Click a button that does not exist."}
        ]
      };
      resolve(mockedResponse);
    }, 500); // Simulate network delay
  });
  // --- End of Mocked Response ---
}
