THIS PROJECT WAS DONE UNDER THE GUIDANCE OF ENGINEERING DIGEST YT. IN ORDER TO GET HOLD OF CONCEPTS
JournalApp
A secure and robust backend Java application built with Spring Boot, designed to help users maintain a digital journal. This application provides RESTful APIs for users to easily add, view, search, and manage their daily entries, with authentication handled by JSON Web Tokens (JWT) and data persisted in MongoDB Atlas.

Table of Contents
Features

Technologies Used

Getting Started

Prerequisites

Installation

MongoDB Atlas Setup

API Endpoints

Project Structure

License

Contact

Features
User Authentication (JWT): Secure user registration and login using JSON Web Tokens for API authorization.

Add New Entries: Authenticated users can create new journal entries with automatic date/time stamping.

View Entries: Retrieve all personal journal entries or specific entries.

Search Functionality: Filter and find specific entries based on keywords or date ranges.

Edit/Delete Entries: Modify or remove existing entries, with proper authorization checks.

Scalable Data Storage: Journal entries are stored persistently in MongoDB Atlas, a cloud-based NoSQL database.

RESTful API: Provides a clean and structured API for front-end applications to interact with.

Technologies Used
Java: The core programming language.

Spring Boot: Framework for building robust, stand-alone, production-grade Spring applications with minimal configuration.

Spring Security: For authentication and authorization, integrated with JWT.

JWT (JSON Web Tokens): For secure API authentication.

Maven: For dependency management and project build automation.

MongoDB Atlas: Cloud-based NoSQL database for flexible and scalable data storage.

Spring Data MongoDB: Spring's module for interacting with MongoDB.

Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

Prerequisites
Before you begin, ensure you have the following installed on your system:

Java Development Kit (JDK) 11 or higher: Download from Oracle or OpenJDK.

Maven: Download and install Maven.

Git: For cloning the repository.

MongoDB Atlas Account: A free tier account is sufficient for development.

API Client (e.g., Postman, Insomnia, or cURL): To test the RESTful API endpoints.

Installation
Clone the repository:
Open your terminal or command prompt and run:

git clone https://github.com/YOUR_GITHUB_USERNAME/JournalApp.git

Navigate into the project directory:

cd JournalApp

Build the project:
Use Maven to build the project and download all necessary dependencies:

mvn clean install

MongoDB Atlas Setup
Create a MongoDB Atlas Cluster:

Log in to your MongoDB Atlas account.

Create a new Free Tier (M0 Sandbox) cluster.

During cluster setup, make sure to:

Create a Database User: Remember the username and password, as you'll need them for your application's configuration. Grant read and write to any database privileges.

Add Your Current IP Address to the IP Access List: This allows your application to connect to the database. For development, you can allow access from anywhere (0.0.0.0/0), but restrict it for production environments.

Get your Connection String:

Once your cluster is deployed, click on Connect -> Connect your application.

Select Java as your driver and copy the provided connection string. It will look something like:
mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/myDatabase?retryWrites=true&w=majority

Configure Application Properties:

Open the src/main/resources/application.properties file in your project.

Update the MongoDB connection URI with your Atlas connection string. Replace <username>, <password>, and myDatabase with your actual database user credentials and the name of the database you want to use for your journal entries.

Example (application.properties):

spring.data.mongodb.uri=mongodb+srv://your_atlas_user:your_atlas_password@cluster0.abcde.mongodb.net/journal_db?retryWrites=true&w=majority

# You might also have JWT specific properties
jwt.secret=yourVerySecretKeyThatIsLongAndRandom # CHANGE THIS IN PRODUCTION
jwt.expiration=86400000 # 24 hours in milliseconds

Note: For jwt.secret, use a very long, random string in a production environment.

API Endpoints
After running the application, the following API endpoints will be available (assuming it runs on http://localhost:8080):

Authentication
POST /api/auth/register: Register a new user.

Body: { "username": "testuser", "password": "password123" }

POST /api/auth/login: Authenticate a user and receive a JWT.

Body: { "username": "testuser", "password": "password123" }

Response: { "token": "your.jwt.here" } (Use this token in the Authorization: Bearer <token> header for protected endpoints)

Journal Entries (Protected - Requires JWT in Header)
POST /api/journal: Create a new journal entry.

Header: Authorization: Bearer <your_jwt_token>

Body: { "content": "My thoughts for today." }

GET /api/journal: Get all journal entries for the authenticated user.

Header: Authorization: Bearer <your_jwt_token>

GET /api/journal/{id}: Get a specific journal entry by ID.

Header: Authorization: Bearer <your_jwt_token>

PUT /api/journal/{id}: Update a specific journal entry by ID.

Header: Authorization: Bearer <your_jwt_token>

Body: { "content": "Updated thoughts for today." }

DELETE /api/journal/{id}: Delete a specific journal entry by ID.

Header: Authorization: Bearer <your_jwt_token>

GET /api/journal/search: Search journal entries by keyword or date.

Header: Authorization: Bearer <your_jwt_token>

Query Params: ?keyword=thoughts or ?startDate=2023-01-01&endDate=2023-01-31

Project Structure
A typical Spring Boot project structure for this application:

JournalApp/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/yourcompany/journalapp/
│   │   │       ├── JournalAppApplication.java # Main Spring Boot application class
│   │   │       ├── config/                     # Spring Security and JWT configuration
│   │   │       │   ├── SecurityConfig.java
│   │   │       │   └── JwtTokenProvider.java
│   │   │       ├── controller/                 # REST API endpoints
│   │   │       │   ├── AuthController.java
│   │   │       │   └── JournalController.java
│   │   │       ├── model/                      # MongoDB document models
│   │   │       │   ├── User.java
│   │   │       │   └── JournalEntry.java
│   │   │       ├── repository/                 # Spring Data MongoDB repositories
│   │   │       │   ├── UserRepository.java
│   │   │       │   └── JournalEntryRepository.java
│   │   │       └── service/                    # Business logic
│   │   │           ├── AuthService.java
│   │   │           └── JournalService.java
│   │   └── resources/
│   │       ├── application.properties # Application configuration (database, JWT secret etc.)
│   │       └── static/                # (Optional) For serving static web content
├── pom.xml                  # Maven Project Object Model file
└── README.md                # This file

License
This project is open-sourced under the MIT License. See the LICENSE file in the root of the repository for more details.

Contact
If you have any questions or feedback, feel free to reach out!

Your Name - shrikulk20@gmail.com

Project Link: https://github.com/BEASTSHRIRAM/JournalApp
