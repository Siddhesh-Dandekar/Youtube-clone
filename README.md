# Develop a YouTube Clone Using the MERN Stack 
Objective: Create a full-stack YouTube clone where users can view and interact with videos.
 This project will help you understand how to build a real-world application using MongoDB,
 Express, React, and Node.js (MERN stack).


# Requirements:
 Front-End (React)
 1. Home Page:
> Display a YouTube Header.
> Display a static sidebar which you can toggle from the top hamburger menu.

> Display filter buttons at the top.
> Display a grid of video thumbnails.
> Each video card should show:
 ■ Title
 ■ Thumbnail
 ■ Channel Name
 ■ Views

2. User Authentication:
> Allow users to register and log in with:
 ■ Username
 ■ Email
 ■ Password
> Use JWT for authentication.
 Before Sign In , header should have sign in button
 When the user clicks on sign in , then it should take to a new URL where a google form
 to login and register should be present.
 User should sign in and after signing in , his/her name should be present at the top and
 the home page will be displayed.

 3. Search and Filter Functionality:
 > Implement a search bar on the homepage.
 This search bar is present in the header.Filter videos based on title.
 > Filter buttons should be implemented and filters should work based on category.
 4. Video Player Page:
 > Display the selected video with:
 ■ Video player
 ■ Title and description
 ■ Channel name
 ■ Like and dislike buttons
 ■ Comment section (Ignore nested comments for now)
 Users should be able to add , edit and delete comments. When a new comment is added ,
 then it should be saved in the database along with that video.

5. Channel Page:
 > Option to create a channel only after the user is signed in.
 > Display a list of videos which belong to that particular channel.
 > Allow the user to edit or delete their videos.

 6. Responsive Design:
> Ensure the application is fully responsive across devices.

 Back-End (Node.js, Express)
 1. API Endpoints:
 > User Authentication:
 ■ Sign up, login, and token-based authentication using JWT.
 > Channel Management:
 ■ API to create new channel and fetch any information from that channel.
 > Video Management:
 ■ API to fetch, update, and delete videos.
 > Comments:
 ■ API to add and fetch comments.
 2. Database (MongoDB):
 > Store users, videos, channels and comments in MongoDB collections.
 > Store file metadata (e.g., video URL, thumbnail URL) in the database.
# Requirements 
- Frontend: React, React Router, Axios
- Backend: Node.js, Express.js, MongoDB
- Authentication: JWT (JSON Web Tokens)
- Database: MongoDB (MongoDB Atlas or local instance)

# Technologies to Use:
- Frontend: React, React Router, Axios
- Backend: Node.js, Express.js, MongoDB
- Authentication: JWT (JSON Web Tokens)
- Database: MongoDB (MongoDB Atlas or local instance)
- Version Control: Git
 
# Project Setup
1. Clone this Project - https://github.com/Siddhesh-Dandekar/Youtube-clone.git
2. Extract the clone Project And Install Packages - npm install
3. Before Running Server Make sure MongoDb service is running and connect to (mongodb://localhost:27017)
4. To run server cmd - cd backend and then npm start
5. Create a new terminal and run our react project with command - npm run dev
6. Setup is Complete.. 

# Features

- User Authentication: Register and log in using JWT-based authentication, ensuring secure access.
- Search and Filter: Efficiently find videos through a search bar and filter options based on categories.
- Video Player Page: Watch videos with an integrated player, complete with like/dislike buttons and a comment section.
- Channel Page: Create and manage personal channels, including adding, editing, and deleting videos.
- Responsive Design: Fully optimized interface for seamless use across various devices.

# Purpose

The purpose of this project is to create a functional and visually appealing YouTube clone that allows users to interact with video content, thereby providing a hands-on learning experience with the MERN stack. By developing this application, you aim to:
- Understand Full-Stack Development: Gain comprehensive knowledge of building a full-stack application, including both front-end and back-end technologies.
- Implement User Authentication: Learn how to securely handle user registration and authentication using JWT (JSON Web Tokens).
- Work with APIs: Develop skills in creating and interacting with RESTful APIs to manage data and server-client communication.
- Enhance UI/UX Design: Focus on creating a responsive and intuitive user interface that enhances the user experience.
- Practice Database Management: Manage and store data efficiently using MongoDB, covering essential database operations like CRUD (Create, Read, Update, Delete).
