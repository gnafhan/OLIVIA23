# Nafhan AI| FrontEnd

Welcome to the **Nafhan-AI** GitHub repository! This project combines the power of Python-based backend processing with an intuitive web frontend to make it easy to deploy and interact with machine learning models.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

**Nafhan-AI** is an open-source project that bridges the gap between machine learning models and end-users by providing a web interface to interact with them. This repository allows you to deploy and manage your own machine learning models easily. Whether you're a developer looking to implement models or an end-user interested in utilizing AI-powered solutions, **Nafhan-AI** has you covered.

## Features
- **Web-Based Interface:** Easily accessible via a web browser, making it user-friendly and accessible to a wide audience.
- **Python Backend:** Utilizes the robust Python backend for efficient model processing.
- **Machine Learning:** Seamlessly integrates machine learning models, allowing you to apply AI to various tasks.
- **Customization:** Extend and customize the system to your specific needs, adding your own models and features.


## Technologies

- [Next.js](https://nextjs.org/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/gnafhan/nafhan-ai.git
   ```

3. Navigate to the project directory:
   ```bash
   cd frontend
   ```

4. Install dependencies:
   ```bash
   npm install
   ```


## Configuration

Create three environment files (`.env.local`, `.env.development`, and `.env.production`) in the root directory of your project. Add the following configuration variables to each file:

### `.env.local`, `.env.development`, and `.env.production`
   ```bash
    API_KEY=your_api_key_local
    API_URL=your_api_url_local
    SITE_URL=your_site_url_local
   ```


Make sure to replace `your_api_key_local`, `your_api_url_local`, `your_site_url_local`, `your_api_key_development`, `your_api_url_development`, `your_site_url_development`, `your_api_key_production`, `your_api_url_production`, and `your_site_url_production` with your actual API key, API URL, and site URL values.

## Usage

Describe how to run the application or how to use the project once it's set up. Provide any necessary commands or scripts.

Example:

To start the development server, run:

   ```bash
    npm run dev
   ```


Visit `http://localhost:3000` in your browser to see the application.

## Contributing

If you want to contribute to this project and make it better, your help is welcome. You can contribute by creating issues, solving bugs, or adding new features. For more details, see the [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).


