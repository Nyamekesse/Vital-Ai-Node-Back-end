# VitalAI Healthcare Platform - Backend

![VitalAI Logo](https://github.com/Vital-Ai-GH/frontend-web/blob/main/src/assets/Vital-Ai-Cover-Logo.png)

Welcome to the backend repository of VitalAI, a revolutionary healthcare platform that aims to connect patients with licensed medical professionals through advanced Artificial Intelligence.

## Table of Contents

- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Introduction

VitalAI's backend is the powerful engine that drives our healthcare platform. It handles user authentication, AI integration, and efficient data management to deliver fast and reliable medical care services to patients.

## Tech Stack

Our backend is built using the following modern technologies and libraries:

- [Node.js](https://nodejs.org/): A runtime environment for executing JavaScript code outside of a browser.
- [TypeScript](https://www.typescriptlang.org/): Adds static typing to JavaScript for enhanced developer productivity.
- [Prisma](https://www.prisma.io/): A modern database toolkit for efficient and type-safe database access.
- [PostgreSQL](https://www.postgresql.org/): A powerful open-source relational database system for data storage.
- [MongoDB](https://www.mongodb.com/): A popular NoSQL database for flexible and scalable data storage.

## Prerequisites

To run the backend locally, ensure you have the following software installed on your system:

- Node.js (version >= 14.0.0)
- npm (Node Package Manager)

## Installation

Follow these steps to set up the backend locally:

1. Clone the repository: `git clone https://github.com/Vital-Ai-GH/backend-node-server.git`
2. Install dependencies: `cd vitalai-backend` and `npm install`

## Database Setup

Before running the backend, you need to configure the database connections.

1. Create a PostgreSQL database and update the connection details in `prisma/schema.prisma`.
2. Create a MongoDB database and update the connection details in `config/mongo.ts`.

## Usage

Start the backend server by running the following command:

```bash
npm run serve
```

The server will run on `http://localhost:5000`.

## API Documentation (coming soon)

Our backend provides a comprehensive API for interaction with the frontend. You can find the detailed API documentation at `http://localhost:5000/docs` when the server is running.

## Contributing

We welcome contributions to improve VitalAI! Feel free to open issues, submit pull requests, or provide feedback to help us enhance our platform.

## License

VitalAI is released under the [MIT License](https://opensource.org/licenses/MIT).

---

For more information about the front-end of VitalAI, please visit the [frontend repository](https://github.com/Vital-Ai-GH/frontend-web/tree/main). If you have any questions or need support, contact us at [nyamekessesamuel@duck.com](mailto:nyamekessesamuel@duck.com). Thank you for being a part of the VitalAI community!
