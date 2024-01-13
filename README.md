# Pharmacy Prescription Management System

A web application for pharmacies to manage prescriptions, create prescriptions, and search for medicines.

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Context](#context)
- [Services](#services)
- [Scheduled Task](#scheduled-task)
- [Screenshots And Video](#screenshots-and-video)

## Project Structure

The project is organized as follows:

```/src
├── components
├── context
├── pages
├── service
└── App.jsx

```

## Getting Started

To get the project up and running on your local machine, follow these steps:

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alperengokbak/Prescription-Frontend.git
   ```

2. Install dependencies:

   ```bash
   cd pharmacy-prescription-system
   npm install
   ```

## Usage

To start the development server, run the following command:

```bash
npm run dev
```

Visit [http://localhost:5176](http://localhost:5176) in your browser to access the application.

## Components

- **App:** Main entry point for the application.
- **Home:** Component for the home page.
- **LoginPage:** Component for user login.
- **RegisterPage:** Component for user registration.
- **MedicineTable:** Component for displaying and managing medicines.

## Context

The project uses context for managing authentication state.

- **AuthContext:** Context for managing authentication state.

## Services

- **LoginAuthentication:** Service for authenticating users.

## Scheduled Task

A scheduled task runs every day at 01:00 AM to send email notifications to each pharmacy. This task is responsible for notifying pharmacies about the new prescriptions.

## Screenshots And Video

[Introductory Video](https://youtu.be/B8H67VWwmHY)
