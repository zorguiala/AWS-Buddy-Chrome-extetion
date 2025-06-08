document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const submitTaskButton = document.getElementById('submitTask');
  const statusMessageDiv = document.getElementById('statusMessage');

  function displayMessage(message, type) {
    if (!statusMessageDiv) return;
    statusMessageDiv.textContent = message;
    statusMessageDiv.className = type === 'error' ? 'error-message' : 'success-message';
    // Remove the message after some time
    setTimeout(() => {
        if (statusMessageDiv.textContent === message) { // Clear only if the message hasn't changed
            statusMessageDiv.textContent = '';
            statusMessageDiv.className = '';
        }
    }, 5000); // Clears after 5 seconds
  }

  if (submitTaskButton) {
    submitTaskButton.addEventListener('click', () => {
      const task = taskInput.value;
      if (task) {
        // Clear previous status
        statusMessageDiv.textContent = '';
        statusMessageDiv.className = '';
        displayMessage("Processing your task...", 'success'); // Temporary message

        console.log("Sending task to background:", task);
        chrome.runtime.sendMessage({ type: "TASK_SUBMITTED", task: task }, (response) => {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError.message);
            displayMessage(`Error: ${chrome.runtime.lastError.message}`, 'error');
          } else {
            console.log("Response from background:", response);
            if (response && response.status === "error") {
              displayMessage(`Error from background: ${response.message}`, 'error');
            } else if (response && response.status === "success") {
              displayMessage(response.message || "Task processed successfully!", 'success');
            } else if (response && response.status === "AI_GUIDANCE_SENT") {
              displayMessage(response.message || "Guidance sent to page!", 'success');
            }
             else {
              // displayMessage("Received response, but status is unclear.", 'error');
              // Let's assume for now that if no error, it's a generic success or pending.
              // The background script should ideally always send a clear status.
              // If guidance is sent, the content script will provide further user feedback.
              // So, we might not need a specific message here unless background confirms receipt *before* AI processing.
               if (! (response && (response.status === "error" || response.status === "success" || response.status === "AI_GUIDANCE_SENT"))){
                 // if the response doesn't have a status we care about, clear the "Processing" message
                 statusMessageDiv.textContent = '';
                 statusMessageDiv.className = '';
               }
            }
          }
        });
      } else {
        displayMessage("Task input cannot be empty.", 'error');
      }
    });
  } else {
    console.error("Submit button not found.");
    // displayMessage("Popup initialization error. Submit button missing.", 'error'); // This would require statusMessageDiv to be available
  }
});
