# Hundhwe HR Portal

## Project Overview
The Hundhwe HR Portal is an innovative enterprise HR Portal application designed for the efficient management and insightful analysis of employee data. This Proof-of-Concept project demonstrates the application's capabilities in an enterprise setting and is a collaborative effort by team members Joash Muganda (Team Leader), Alexis Ambriz, and Suresh Ravuri.

## Key Features
- **Single Sign-On (SSO) / AD Authentication:** Secure login processes with SSL/TLS encryption.
- **AWS S3 Integration:** Integrated with AWS S3 for document repository and management.
- **Data Visualization and Insights:** Analytics and visualizations on employee data, including salary growth, department distribution, and gender diversity.
- **Jenkins Integration:** Automated CI/CD pipelines with Jenkins, integrated into SSO.
- **GitHub Repository Integration:** Maintained and version-controlled in GitHub, integrated with SSO.

## Technologies Used
- **Backend:** Flask, Flask-RESTful, SQLAlchemy.
- **Frontend:** React.js, CSS.
- **Database:** MySQL, using [datacharmer/test_db](https://github.com/datacharmer/test_db).
- **Authentication:** Auth0.
- **Other Tools:** Jenkins, SSL/TLS certificates.

## Setup and Installation

### Clone the Repository
git clone https://github.com/your-github-username/hundhwe-hr-portal.git
cd hundhwe-hr-portal

### Database Setup
- Install MySQL and set up the database using the test dataset provided by `datacharmer/test_db`.
- Follow the installation instructions in the [test_db repository](https://github.com/datacharmer/test_db).

### Backend Setup
- Set up the Flask backend, including virtual environment, dependency installation, and database configuration.
- Configure `.env` file with:
  AUTH0_DOMAIN="Your domain"
  API_AUDIENCE="Your API audience"
  DATABASE_URI="mysql+mysqlconnector://username:password@localhost:3306/employees"


### Frontend Setup
- Set up the React frontend, including installing dependencies and running the development server.
- Configure `.env` file in the frontend with:
REACT_APP_AUTH0_DOMAIN="Your domain"
REACT_APP_AUTH0_CLIENT_ID="Your client ID"
REACT_APP_AUTH0_AUDIENCE="Your audience"
REACT_APP_API_BASE_URL="Your API base URL"


## Application Highlights
- **Dashboard View:** Metrics, charts for department/gender distribution, salary growth.
- **Department Insights:** Overview, employee breakdown, performance metrics.
- **Document Management:** AWS S3 integration.

## Environment Setup
- Users will need to set up an Auth0 account and create an application to obtain the necessary credentials for the `.env` files.
- TLS is implemented using a self-signed certificate.

## Disclaimer
The data used in this project is fabricated and does not correspond to real individuals.

## License
Licensed under the [Creative Commons Attribution-Share Alike 3.0 Unported License](http://creativecommons.org/licenses/by-sa/3.0/).

