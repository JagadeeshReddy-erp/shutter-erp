# 🚀 Rolling Shutter ERP System

Enterprise Resource Planning (ERP) Platform for Rolling Shutter Manufacturing, Installation, and Business Operations.

A full-stack Microservices-based ERP application built using Java, Spring Boot, Spring Security, JWT Authentication, React.js, and Oracle SQL. The system automates customer management, inventory tracking, quotation generation, order processing, employee management, and business workflows.

---

# 📌 Project Overview

The Rolling Shutter ERP System is designed to streamline end-to-end business operations for rolling shutter manufacturing and installation companies.

The application manages the complete business lifecycle:

Customer
→ Quotation
→ Order
→ Production
→ Installation
→ Billing
→ Payment

The system follows a Microservices Architecture with centralized authentication, API Gateway routing, service discovery, and role-based access control.

---

# 🏗️ System Architecture

```text

                           React.js Frontend

                                  │
                                  ▼

                        ┌────────────────────┐
                        │ Discovery Server   │
                        │      Eureka        │
                        └─────────┬──────────┘
                                  │
                                  ▼

                        ┌────────────────────┐
                        │    API Gateway     │
                        │ Spring Cloud GW    │
                        └─────────┬──────────┘
                                  │

     ┌──────────────┬──────────────┬──────────────┬──────────────┐ 
     ▼              ▼              ▼              ▼              ▼             

    Auth         Customer      Inventory     Quotation       Order             
    Service      Service       Service       Service         Service          

                                  │
                                  ▼

                         Oracle SQL Database

                                 
```

---

# 🛠️ Technology Stack

## Backend

* Java 21
* Spring Boot 3.x
* Spring Security
* Spring Data JPA
* Spring Cloud Gateway
* Spring Cloud Netflix Eureka
* JWT Authentication
* Maven

## Frontend

* React.js
* React Router
* Axios
* Context API
* HTML5
* CSS3

## Database

* Oracle SQL

## Tools

* Git
* GitHub
* Postman
* Eclipse IDE
* SonarQube

---

# 🔐 Security Features

* JWT Authentication
* Role-Based Access Control (RBAC)
* Spring Security
* Protected API Endpoints
* OAuth2 Resource Server
* Password Encryption using BCrypt

Supported Roles:

* ADMIN
* EMPLOYEE

---

# 📦 Microservices

## 1. Discovery Server

Responsibilities:

* Service Registration
* Service Discovery
* Health Monitoring

Technology:

* Eureka Server

---

## 2. API Gateway

Responsibilities:

* Centralized Routing
* Request Forwarding
* Authentication Flow

Technology:

* Spring Cloud Gateway

---

## 3. Authentication Service

Responsibilities:

* User Registration
* User Login
* JWT Token Generation
* User Management

Features:

* Spring Security
* JWT Authentication
* Role Management

---

## 4. Customer Management Service

Responsibilities:

* Customer Registration
* Customer Search
* Customer Updates
* Customer History

Features:

* Pagination
* Filtering
* Search by Name
* Search by Mobile Number
* Search by Date Range
* Auditing

---

## 5. Employee Management

Responsibilities:

* Employee Registration
* Employee Updates
* Role Assignment

Features:

* Admin Access Control
* User Management

---

## 6. Inventory Management Service

Responsibilities:

* Item Master Management
* Stock Management
* Stock Tracking

Features:

* Create Item
* Update Item
* Stock In
* Stock Out
* Inventory Reporting

---

## 7. Quotation Management Service

Responsibilities:

* Quotation Creation
* GST Calculation
* Profit Calculation
* Version Management

Features:

* Dynamic Item Selection
* Customer Pricing
* Quotation Versioning
* PDF Generation

Business Flow:

Customer
→ Create Quotation
→ Add Shutters
→ Add Items
→ Calculate GST
→ Generate PDF

---

## 8. Order Management Service

Responsibilities:

* Order Creation
* Quotation Conversion
* Order Tracking

Features:

* Convert Quotation to Order
* Order Lifecycle Management
* Order PDF Generation

Business Flow:

Quotation
→ Order
→ Processing
→ Completion

---

# 🖥️ Frontend Features

## Authentication

* Login
* Logout
* JWT Session Management

## ERP Workspace Engine

Dynamic Workspace-Based UI

Modules:

* Customer Management
* Inventory Management
* Quotation Management
* Order Management

Features:

* Dynamic Search Screens
* Pagination
* Filtering
* Role-Based Navigation
* Reusable Components

---

# 📄 PDF Generation

Implemented:

* Quotation PDF
* Order Bill PDF

Benefits:

* Printable Documents
* Customer Sharing
* Business Record Keeping

---

# 📊 Major Features

✅ JWT Authentication

✅ Role-Based Access Control

✅ API Gateway

✅ Eureka Service Discovery

✅ Customer Management

✅ Employee Management

✅ Inventory Management

✅ Stock Tracking

✅ Quotation Management

✅ GST Calculation

✅ Quotation Versioning

✅ Order Management

✅ PDF Generation

✅ React.js Frontend

✅ Oracle SQL Database

✅ Auditing

✅ Pagination

✅ Search & Filtering

---

# 📸 Screenshots


## Login Screen

<img width="941" height="443" alt="image" src="https://github.com/user-attachments/assets/7adeda83-9e37-40a1-842d-099a0cad1cb8" />


## Dynamic Search Screen

<img width="959" height="446" alt="image" src="https://github.com/user-attachments/assets/9a8702aa-7fdf-4f4d-8b80-9a68ab94c24a" />


## Customer Management

<img width="958" height="446" alt="image" src="https://github.com/user-attachments/assets/b828a90d-1d31-45c1-94ed-e46059ebb26d" />


## Inventory Management

<img width="1915" height="892" alt="image" src="https://github.com/user-attachments/assets/7992dd23-9db2-45a1-8586-ee1f0384d284" />

<img width="959" height="449" alt="image" src="https://github.com/user-attachments/assets/26fd3671-8d23-4fa3-8e2e-7e2e9a0311c3" />


## Quotation Management

<img width="959" height="449" alt="image" src="https://github.com/user-attachments/assets/af5b1957-34d9-4749-b679-7ce3a5754dce" />

## Order Management

<img width="959" height="445" alt="image" src="https://github.com/user-attachments/assets/036f5942-676c-403e-9f6b-ff31d50de963" />

## PDF generation

basic quotation

<img width="396" height="409" alt="image" src="https://github.com/user-attachments/assets/3b91cb79-06ac-4c61-a7ce-c36caa9878bb" />

detailed quotation

<img width="398" height="409" alt="image" src="https://github.com/user-attachments/assets/0e0b11ff-0bc9-4633-9fa2-2eed37bf44c7" />

---

# 🚀 How To Run

## Backend

Clone Repository

```bash
git clone https://github.com/JagadeeshReddy-erp/shutter-erp.git
```

Start Services:

1. Discovery Server
2. API Gateway
3. Auth Service
4. Customer Service
5. Inventory Service
6. Quotation Service
7. Order Service

---

## Frontend

Navigate to frontend directory

```bash
npm install
npm run dev
```

---

# 📈 Future Enhancements

* Production Management
* Installation Scheduling
* Billing & GST Module
* Payment Management
* Vendor Management
* Profit Analytics Dashboard
* Notification System
* Reports & Analytics

---

# 👨‍💻 Developer

BIYYANI JAGADEESH KUMAR REDDY

Java Full Stack Developer

Skills:

Java | Spring Boot | Microservices | React.js | Oracle SQL | JWT | Spring Security | System Design


---

⭐ If you found this project useful, feel free to star the repository.
