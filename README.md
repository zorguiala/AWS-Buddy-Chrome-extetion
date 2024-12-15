# AWS Supporter Chrome Extension  
**Your AI-powered assistant for seamless AWS navigation and task automation.**

## Table of Contents  
1. [Introduction](#introduction)  
2. [Features](#features)  
3. [Installation](#installation)  
4. [Usage](#usage)  
5. [Development Setup](#development-setup)  
6. [Contributing](#contributing)  
7. [License](#license)

---

## Introduction  
The AWS Supporter Chrome Extension is designed to simplify navigation and task execution on AWS Management Console. With AI assistance, it provides step-by-step guidance for commonly used tasks, such as creating EC2 instances or setting up S3 buckets. Whether you're a beginner or a seasoned AWS user, this tool enhances productivity by offering intuitive, interactive help.

---

## Features  
- **Task Automation:** Highlight buttons and guide users through AWS workflows.  
- **AI-Powered Support:** Natural language commands to navigate and perform AWS tasks.  
- **Dynamic Context Awareness:** Automatically detect the current AWS page.  
- **Step-by-Step Guidance:** Interactive highlights and instructions for complex workflows.  

---

## Installation  
To install the extension:  
1. Clone the repository:  
```bash

   git clone https://github.com/yourusername/aws-supporter-extension.git
```
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Enable **Developer Mode** (top right corner).  
4. Click **Load unpacked** and select the project folder.  
5. The extension should now appear in your browser toolbar.

---

## Usage  
1. Click on the extension icon in the toolbar.  
2. Enter a command (e.g., "How do I create an EC2 instance?").  
3. Follow the highlighted steps or instructions provided.  

---

## Development Setup  
To set up the project for development:  
1. Ensure you have **Node.js** installed.  
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Start the development server:
  ```bash
  npm run dev
  ```
4. Make changes to the extension code (e.g., content_scripts or popup).
4. Reload the extension in Chrome to see updates.
