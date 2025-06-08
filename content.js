let currentHighlightedElement = null;
let currentTooltip = null;
const HIGHLIGHT_CLASS = 'aws-guide-highlight';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in content script:", message);
  clearAllHighlights(); // Clear previous highlights on new message

  if (message.type === "AI_GUIDANCE" && message.steps) {
    console.log("Received AI steps:", message.steps);
    if (message.steps.length > 0) {
      const result = highlightStep(message.steps[0]);
      if (result && result.status === "error") {
        sendResponse(result); // Send error status back
      } else {
        sendResponse({ status: "success", message: `Highlighted: ${message.steps[0].description}` });
      }
    } else {
      sendResponse({ status: "error", message: "No steps provided in AI_GUIDANCE." });
    }
  } else {
    console.log("Unknown message type received or no steps provided.");
    sendResponse({ status: "error", message: "Unknown message type or missing steps." });
  }
  // Return true if you intend to send a response asynchronously,
  // but in this case, most paths in highlightStep are synchronous.
  // However, if highlightStep itself became async, this would be crucial.
  return true;
});

function highlightStep(step) {
  // Remove highlight from previously highlighted element
  // This is now called at the beginning of the message listener
  // clearAllHighlights(); // Moved

  console.log("Attempting to highlight step:", step);
  if (!step || !step.selector) {
    console.error("Invalid step object or missing selector:", step);
    return { status: "error", message: "Invalid step data (no selector)." };
  }

  const element = document.querySelector(step.selector);

  if (element) {
    console.log("Element found:", element);
    element.classList.add(HIGHLIGHT_CLASS);
    currentHighlightedElement = element;

    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    console.log(`Guidance: ${step.description}`);

    // Create and display a tooltip
    const tooltip = document.createElement('div');
    tooltip.id = 'aws-guide-tooltip';
    tooltip.className = 'aws-guide-description-tooltip'; // Apply CSS class
    tooltip.textContent = step.description;

    document.body.appendChild(tooltip);
    currentTooltip = tooltip; // Store reference to the tooltip

    // Position tooltip (example: below the element)
    const rect = element.getBoundingClientRect();
    tooltip.style.top = `${window.scrollY + rect.bottom + 10}px`; // 10px below
    tooltip.style.left = `${window.scrollX + rect.left}px`;
    tooltip.style.position = 'absolute'; // Ensure this is set for top/left to work as expected
    tooltip.style.zIndex = '10001'; // Ensure it's above other elements, including highlight

    // Apply styles directly if not relying solely on CSS for some dynamic aspects
    tooltip.style.padding = '8px 12px';
    tooltip.style.backgroundColor = 'rgba(0,0,0,0.8)';
    tooltip.style.color = 'white';
    tooltip.style.borderRadius = '5px';
    tooltip.style.fontSize = '13px';
    tooltip.style.fontFamily = 'Arial, sans-serif';
    tooltip.style.maxWidth = '300px';
    tooltip.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';


    if (step.action === "type" && step.text) {
      console.log(`Action: Type "${step.text}" into the element.`);
    } else if (step.action === "click") {
      console.log("Action: Click the element.");
    }
    return { status: "success", description: step.description };

  } else {
    console.error("Element not found for selector:", step.selector);
    // Send a message back to background/popup about the failure
    // This can be done via sendResponse if the listener expects it,
    // or a new message to the background script.
    return { status: "error", message: `Element not found: ${step.selector}` };
  }
}

function clearAllHighlights() {
  if (currentHighlightedElement) {
    currentHighlightedElement.classList.remove(HIGHLIGHT_CLASS);
    currentHighlightedElement = null;
  }
  if (currentTooltip) {
    currentTooltip.remove();
    currentTooltip = null;
  }
  // console.log("All highlights and tooltips cleared.");
}

console.log("Content script loaded and ready for guidance. (v2)");
