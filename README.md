# Task Management Application Front-End

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=React&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=JavaScript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?&logo=css3&logoColor=white)

## Overview

This repository contains the front-end code for a Task Management Application built using ReactJS. The application allows users to create, view, edit, and delete tasks. The UI is designed to be responsive, ensuring usability across both desktop and mobile devices.

## Features

- Display a list of tasks on the landing page, along with the no. of days left for the job to be done.
- Add new tasks with a title, description, and due date.
- View detailed information for each task.
- Edit existing tasks.
- Delete tasks.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) (version 6.x or later)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/samriddha-basu-cloud/Task-Management-Application-React-Python.git
    cd Task-Management-Application-React-Python
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm start
    ```

The application will be available at `http://localhost:3000`.

## Project Structure
```
src/
├── components/
│   ├── TaskList.js
│   ├── TaskItem.js
│   ├── TaskDetails.js
│   └── TaskForm.js
├── pages/
│   ├── LandingPage.js
│   └── TaskPage.js
├── App.js
└── index.js
```


### Explanation of Components

- **TaskList.js:** Renders a list of tasks.
- **TaskItem.js:** Displays individual task information and provides a link to view more details.
- **TaskDetails.js:** Shows detailed information about a task and allows deletion of the task.
- **TaskForm.js:** Form for creating and editing tasks.
- **LandingPage.js:** Main page displaying the task list and form for adding new tasks.
- **TaskPage.js:** Page for viewing and editing a specific task.

## Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request.

