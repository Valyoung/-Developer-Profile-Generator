const fs = require('fs');
const inquirer = require('inquirer');
// const axios = require('axios');
const api = require("./utils/api");
const generateMarkdown = require("./utils/generateMarkdown");
// const pdf = require('html-pdf');
const path = require("path");

// const generateHTML = require('./generateHTML');
// const convertFactory = require('electron-html-to');

// const questions = [
//     {
//         message: 'What is your github username?',
//         name: 'username',
//     },
//     {
//         message: 'What is your favorite color?',
//         name: 'color',
//     },
// ];
// let conversion = convertFactory({
//   converterPath: convertFactory.converters.PDF
// });

// let data = {};

let questions = [
    {
        type: 'input',
        message: 'What is your github username?',
        name: 'username',
    },
    {
        type: 'input',
        message: 'What is your favorite color?',
        name: 'color',
    }
        
]
function writeToFile(fileName, data) {
  return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

function init() {
  inquirer.prompt(questions).then((inquirerResponses) => {
    console.log("Searching...");

    api
      .getUser(inquirerResponses.github)
      .then(({ data }) => {
        writeToFile("README.md", generateMarkdown({ ...inquirerResponses, ...data }));
      })
  })
}

init();
// function writeToFile(fileName, data) {
// }

// function init() {
//   inquirer
//   .prompt(questions)
//   .then(function ({username, color}) {
//       const queryUrl = `https://api.github.com/users/${username}`; 

//       axios
//           .get(queryUrl)
//           .then((response) => {    

              

//               switch(color) {
//                   case 'green':
//                       data.color = 0;
//                       break;
//                   case 'blue':
//                       data.color = 1;
//                       break;  
//                   case 'pink':
//                       data.color = 2;
//                       break;
//                   case 'red':
//                       data.color = 3;
//                       break;
//               }   
//               data.username = username;
//               data.numOfRepo = response.data.public_repos;
//               data.name = response.data.name
//               data.followers = response.data.followers;
//               data.following = response.data.following;
//               data.portPic = response.data.avatar_url;
//               data.location = response.data.location;
//               data.blog = response.data.blog; 
//               data.company = response.data.company
//               data.bio = response.data.bio;

//               axios 
//                     .get(`https://api.github.com/users/${username}/repos?per_page=100`)
//                     .then((response) => {
//                         // console.log(res)
//                         data.stars = 0;
//                         for (let i = 0; i < response.data.length; i++) { 
//                             data.stars += response.data[i].stargazers_count;
//                         }
                       
//             })
//           })

       

// init();

// const color = [ 
//     { // Green
//        wrapperBackground: "#E6E1C3",
//        headerBackground: "#C1C72C",
//        headerColor: "black",
//        photoBorderColor: "#black"
//      },
//      { // Blue
//        wrapperBackground: "#5F64D3",
//        headerBackground: "#26175A",
//        headerColor: "white",
//        photoBorderColor: "#73448C"
//      },
//      {
//       // Pink
//        wrapperBackground: "#879CDF",
//        headerBackground: "#FF8374",
//        headerColor: "white",
//        photoBorderColor: "#FEE24C"
//      },
//      { // Red
//        wrapperBackground: "#DE9967",
//        headerBackground: "#870603",
//        headerColor: "white",
//        photoBorderColor: "white"
//      }
//  ];

// function generateHTML(data) { 
//     return `<!DOCTYPE html>
//     <html lang="en">
//        <head>
//           <meta charset="UTF-8" />
//           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//           <meta http-equiv="X-UA-Compatible" content="ie=edge" />
//           <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
//           <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
//           <title>Document</title>
//           <style>
//               @page {
//                 margin: 0;
//               }
//              *,
//              *::after,
//              *::before {
//              box-sizing: border-box;
//              }
//              html, body {
//              padding: 0;
//              margin: 0;
//              }
//              html, body, .wrapper {
//              height: 100%;
//              }
//              .wrapper {
//              background-color: ${colors[data.color].wrapperBackground};
//              padding-top: 100px;
//              }
//              body {
//              background-color: white;
//              -webkit-print-color-adjust: exact !important;
//              font-family: 'Cabin', sans-serif;
//              }
//              main {
//              background-color: #E9EDEE;
//              height: auto;
//              padding-top: 30px;
//              }
//              h1, h2, h3, h4, h5, h6 {
//              font-family: 'BioRhyme', serif;
//              margin: 0;
//              }
//              h1 {
//              font-size: 3em;
//              }
//              h2 {
//              font-size: 2.5em;
//              }
//              h3 {
//              font-size: 2em;
//              }
//              h4 {
//              font-size: 1.5em;
//              }
//              h5 {
//              font-size: 1.3em;
//              }
//              h6 {
//              font-size: 1.2em;
//              }
//              .photo-header {
//              position: relative;
//              margin: 0 auto;
//              margin-bottom: -50px;
//              display: flex;
//              justify-content: center;
//              flex-wrap: wrap;
//              background-color: ${colors[data.color].headerBackground};
//              color: ${colors[data.color].headerColor};
//              padding: 10px;
//              width: 95%;
//              border-radius: 6px;
//              }
//              .photo-header img {
//              width: 250px;
//              height: 250px;
//              border-radius: 50%;
//              object-fit: cover;
//              margin-top: -75px;
//              border: 6px solid ${colors[data.color].photoBorderColor};
//              box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
//              }
//              .photo-header h1, .photo-header h2 {
//              width: 100%;
//              text-align: center;
//              }
//              .photo-header h1 {
//              margin-top: 10px;
//              }
//              .links-nav {
//              width: 100%;
//              text-align: center;
//              padding: 20px 0;
//              font-size: 1.1em;
//              }
//              .nav-link {
//              display: inline-block;
//              margin: 5px 10px;
//              }
//              .workExp-date {
//              font-style: italic;
//              font-size: .7em;
//              text-align: right;
//              margin-top: 10px;
//              }
//              .container {
//              padding: 50px;
//              padding-left: 100px;
//              padding-right: 100px;
//              }
    
//              .row {
//                display: flex;
//                flex-wrap: wrap;
//                justify-content: space-between;
//                margin-top: 20px;
//                margin-bottom: 20px;
//              }
    
//              .card {
//                padding: 20px;
//                border-radius: 6px;
//                background-color: ${colors[data.color].headerBackground};
//                color: ${colors[data.color].headerColor};
//                margin: 20px;
//              }
             
//              .col {
//              flex: 1;
//              text-align: center;
//              }
    
//              a, a:hover {
//              text-decoration: none;
//              color: inherit;
//              font-weight: bold;
//              }
    
//              @media print { 
//               body { 
//                 zoom: .75; 
//               } 
//              }
//           </style>`