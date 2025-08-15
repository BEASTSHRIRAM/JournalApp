# JournalApp

A secure and robust backend Java application built with Spring Boot, designed to help users maintain a digital journal. This application provides RESTful APIs for users to add, view, search, and manage their daily entries. Authentication is handled using **JSON Web Tokens (JWT)**, and all data is stored in **MongoDB Atlas** for scalability.
---
## Table of Contents

* [Features](#features)
* [Technologies Used](#technologies-used)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [MongoDB Atlas Setup](#mongodb-atlas-setup)
* [API Endpoints](#api-endpoints)
* [Project Structure](#project-structure)
* [License](#license)
* [Contact](#contact)
---
## Features
* **User Authentication (JWT)** – Secure registration and login with token-based authorization.
* **Add New Entries** – Create journal entries with automatic date/time stamps.
* **View Entries** – Retrieve all personal journal entries or specific ones.
* **Search Functionality** – Search entries by keywords or date ranges.
* **Edit/Delete Entries** – Update or remove existing entries with proper authorization.
* **Cloud Database** – Persistent storage in MongoDB Atlas.
* **RESTful API** – Structured endpoints for frontend integration.

---

## Technologies Used

* **Java 11+**
* **Spring Boot**
* **Spring Security**
* **JWT (JSON Web Tokens)**
* **Maven**
* **MongoDB Atlas**
* **Spring Data MongoDB**

---

## Getting Started

### Prerequisites

Ensure you have:

* Java JDK 11 or higher ([Oracle](https://www.oracle.com/java/technologies/javase-downloads.html) or [OpenJDK](https://openjdk.org/))
* [Maven](https://maven.apache.org/)
* [Git](https://git-scm.com/)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* API testing tool like Postman or Insomnia

---

### Installation

```bash
# Clone the repository
git clone https://github.com/BEASTSHRIRAM/JournalApp.git

# Navigate into the project
cd JournalApp

# Build the project
mvn clean install
```

---

### MongoDB Atlas Setup

1. **Create a Free Tier Cluster** in [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. **Create a Database User** with read/write permissions.
3. **Add Your IP Address** to the IP Access List (or use `0.0.0.0/0` for development).
4. **Get Connection String**:

   * Example:

     ```
     mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/journal_db?retryWrites=true&w=majority
     ```
5. **Configure application.properties**:

   ```properties
   spring.data.mongodb.uri=mongodb+srv://your_user:your_password@cluster0.abcde.mongodb.net/journal_db?retryWrites=true&w=majority

   # JWT configuration
   jwt.secret=yourLongRandomSecretKey
   jwt.expiration=86400000  # 24 hours in milliseconds
   ```

---

## API Endpoints

**Base URL:** `http://localhost:8080`

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login and get JWT   |

---

### Journal Entries *(Requires JWT in `Authorization` header)*

| Method | Endpoint              | Description                    |
| ------ | --------------------- | ------------------------------ |
| POST   | `/api/journal`        | Create a new entry             |
| GET    | `/api/journal`        | Get all user entries           |
| GET    | `/api/journal/{id}`   | Get entry by ID                |
| PUT    | `/api/journal/{id}`   | Update entry by ID             |
| DELETE | `/api/journal/{id}`   | Delete entry by ID             |
| GET    | `/api/journal/search` | Search entries by keyword/date |

---

## Project Structure

```
JournalApp/
├── src/
│   ├── main/
│   │   ├── java/com/beastshriram/journalapp/
│   │   │   ├── JournalAppApplication.java
│   │   │   ├── config/         # Security and JWT config
│   │   │   ├── controller/     # REST controllers
│   │   │   ├── model/          # MongoDB models
│   │   │   ├── repository/     # Mongo repositories
│   │   │   └── service/        # Business logic
│   │   └── resources/
│   │       └── application.properties
├── pom.xml
└── README.md
```

---

## License

This project is licensed under the **MIT License**.

---

## Contact

**Shriram Kulkarni** – [shrikulk20@gmail.com](mailto:shrikulk20@gmail.com)
GitHub: [BEASTSHRIRAM](https://github.com/BEASTSHRIRAM)
