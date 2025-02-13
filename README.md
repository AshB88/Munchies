# Munchies

## Description

Munchies is a useful application for storing your grocery list and information about your purchases. This secure website is mobile friendly and utilizes local storage to store product information. The purpose of this project was to create a collaborative full-stack application that combines a robust back end with an intuitive front end. The project employs APIs, Node.js, Express.js, React, PostgreSQL, Sequelize, and JWT.

## Table of Contents

- [Link to Application](#link-to-application)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Link to Application

link will go here???

## Installation

This application is accessible in any web browser using the link above. No installation is required. However, if you want to install the application on your local device to edit or view the repo, perform the following steps:

1. In the terminal, navigate to where you would like the repo to be stored on your device.

2. Clone the repo to your device using the following:

   ```sh
   git clone https://github.com/AshB88/Munchies.git
   ```

3. Switch into the Munchies directory.

   ```sh
   cd Munchies
   ```

4. In the command line, install dependencies using the following:

   ```sh
   npm install
   ```

5. Next, you will need to set up your database. Using the schema.sql file in the server > db folder, create the munchies_db in a PostgreSQL application, such as DBeaver.

6. You will need to connect the repo to the database. In the server folder, change the ".env.EXAMPLE" file to ".env", and fill out your username and password. If you are using DBeaver for your database, this would be your DBeaver username and password.

7. Now, you need to seed the database. Navigate to the Munchies directory on your local device, and run the following:

   ```sh
   npm run seed
   ```

8. To build and start the program, run the following command:

   ```sh
   npm run start
   ```

## Usage

The application can be used in the web browser or on your local device from port 3001. Follow the steps above to get the server running.

1.  The website link will take you to a login page, as shown below.

    ![Munchies login page](./assets/???)

2.  Click "Login". We have created three test accounts to log in with. You may use any of the following to access the website.

        Username: JollyGuru
        Password: password

        Username: SunnyScribe
        Password: password

        Username: RadiantComet
        Password: password

3.  Add items to your grocery list. Using the form, enter an item, then hit "Add". The item should populate in the list.

    ![grocery list form](./assets/???)

4. To move an item to the Purchased List, click the ?? icon. Navigate to the Purchased List page using the navigation bar at the top, and the item should appear on that page.

    ![Purchased List page](./assets/???)

5. To discard an item on your grocery list, click the trash can icon.

    ![trash can icon](./assets/???)

6. Hit "Log out" when you are ready to log out.

## Credits

This project was a collaboration between students of the Rutgers University Coding Bootcamp, section RUT-VIRT-FSF-PT-10-2024-U-LOLC-MWTH, Group 1. Collaborators include Ashleigh Brown, Caleb Feliciano, Alex Newcomer, Tyreone Sarpong and Amelia Alvarado. Links to each of our GitHub profiles are below. Much of the back end code was sourced from a previous assignment (RUT-VIRT-FSF-PT-10-2024-U-LOLC > 14-Full-Stack-React > 25-Ins_JWT-Authentication-Review, located [here](https://git.bootcampcontent.com/Rutgers-University/RUT-VIRT-FSF-PT-10-2024-U-LOLC)). We also used this assignment to develop the login on the client side as well as some of the components, interfaces, and pages. All design aspects were developed by our team.

Ashleigh Brown: AshB88 (https://github.com/AshB88)
Caleb Feliciano: Calebfeliciano (https://github.com/Calebfeliciano)
Alex Newcomer: AlexMNewcomer (https://github.com/AlexMNewcomer)
Tyreone Sarpong: Tyreone58 (https://github.com/Tyreone58)
Amelia Alvarado: amelia1105 (https://github.com/amelia1105)

## License

MIT License

Copyright (c) 2025 Rutgers University Coding Bootcamp Group 1

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.