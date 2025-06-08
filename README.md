# AWS Guide Chrome Extension

The AWS Guide Chrome Extension helps users navigate and understand the AWS console by providing step-by-step guidance based on user queries. It leverages AI to interpret tasks and highlight relevant elements on the page.

## Installation

1.  **Download or Clone the Repository:**
    *   If you have git installed, clone the repository using:
        ```
        git clone <repository_url>
        ```
        (Replace `<repository_url>` with the actual URL where this code is hosted).
    *   Alternatively, download the source code as a ZIP file and extract it to a local folder.

2.  **Open Chrome Extensions Page:**
    *   Open Google Chrome.
    *   Navigate to `chrome://extensions`. You can type this directly into your address bar and press Enter.

3.  **Enable Developer Mode:**
    *   In the top right corner of the Extensions page, find the "Developer mode" toggle and switch it on.

4.  **Load the Extension:**
    *   Once Developer mode is enabled, you will see new buttons appear. Click on the "**Load unpacked**" button.
    *   A file dialog will open. Navigate to the directory where you cloned or extracted the extension's source code.
    *   Select the root folder of the extension (the one containing `manifest.json`).
    *   Click "Select Folder" (or "Open").

5.  **Verify Installation:**
    *   The "AWS Guide" extension should now appear in your list of installed extensions.
    *   You should also see its icon in the Chrome toolbar (usually to the right of the address bar). You might need to click the puzzle piece icon (Extensions) to pin it.

## Features (Planned & Implemented)

*   **Task Input:** Users can type a task they want to accomplish in the AWS console via the extension popup.
*   **AI-Powered Guidance:** (Currently Mocked) User tasks are sent to an AI (like Gemini) to get a sequence of steps.
*   **On-Page Highlighting:** The extension highlights relevant UI elements on the AWS console page for each step.
*   **Step-by-Step Instructions:** Clear descriptions are provided for each action.
*   **Error Feedback:** User-friendly messages for errors (e.g., API issues, elements not found).

## Development

This extension is built using standard web technologies: HTML, CSS, and JavaScript.

**Key Files:**

*   `manifest.json`: Defines the extension's properties, permissions, and scripts.
*   `popup.html` / `popup.css` / `popup.js`: Manages the extension's popup UI and interaction.
*   `background.js`: The service worker, handles communication with the AI API and coordinates with content scripts.
*   `content.js` / `content.css`: Injected into AWS console pages to highlight elements and display guidance.

**API Key Setup:**

To use the actual Gemini AI, you'll need an API key.
1.  Open `background.js`.
2.  Replace `"YOUR_API_KEY_HERE"` with your actual Gemini API key.
    ```javascript
    const GEMINI_API_KEY = "YOUR_ACTUAL_GEMINI_API_KEY";
    ```
3.  **Important:** Do not commit your real API key to a public repository. If you plan to share or store the code, consider environment variables or other secure methods for key management if building the extension from source regularly. For local development and loading as an unpacked extension, direct replacement is straightforward.

## Usage

1.  Click the AWS Guide extension icon in your Chrome toolbar.
2.  The popup will appear. Type the task you want to perform (e.g., "launch a new EC2 instance", "create an S3 bucket").
3.  Click "Submit".
4.  The extension will process your request and, if successful, start highlighting elements on the active AWS console page, showing you the first step.
    (Note: Currently, only the first step is shown. Multi-step navigation is planned).

## Contributing

Contributions are welcome! If you have suggestions or find bugs, please open an issue or submit a pull request.

(Further details on contribution guidelines can be added here).

## License

(To be determined - e.g., MIT License)
