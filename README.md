# NipToLoo

Link to project demo: https://youtu.be/PrBAnEYXq0c

## Project Description

NipToLoo is an ios mobile application developed as part of a team project on the Northcoders software development bootcamp. The app is designed to help users locate public toilets in their current location or a specified area in the UK or anywhere in the world. We specifically designed this app for people with conditions like irritable bowel syndrome(IBS) and Crohn’s disease or even for parents and minders requiring a safe space to change diapers and to help plan their toilet breaks ahead of trips to an unfamiliar place.

The app locates the user’s GPS location and displays a map of the surrounding area, with markers indicating the location of nearby toilets. A circle around the user marker indicates an estimated five minute walking distance from the user. Users can search for toilets based on their current location or by entering a specific address or place name. On pressing a marker a card will display detailed information about each toilet such as the name and address of the toilet as well as a ‘Get directions’ button which will redirect the user to google maps making it easier and faster for users to locate the toilet. On logging in or registering, users can leave reviews and ratings to help the wider user community make informed decisions about accessibility and cleanliness of toilets. 

Tech Stack:
- React Native to create the mobile app using Expo library
- Axios for GET, POST, PATCH and DELETE requests
- Typescript
- Node.js and Express to build our REST API 
- Google Cloud API for the map view and toilet information

## Back end repository

Click this link for the back end gitHub repository:
https://github.com/OliverHolt/NipToLoo-BackEnd


## Setup

Before you can run this API locally, you'll first need to:

### Clone this repository to your local machine
- You can make a local copy of the repo by running git clone <https://github.com/AngelikaM-T/NipToLoo.git>
- You should now be able to access this repo locally

- You will need to create an environments.ts file in the root folder with the following declaration: export const GOOGLE_API_KEY = "YOUR_API_KEY"

- You may also be required to add tunnels to your package.json file depending on your phone make and model. To do this:
    - go to the package.json file
    - add "expo start --tunnel" to the start script

### Install dependencies
- Install all dependencies listed in the `package.json` using the `npm install` command.

## Node requirements

This project was created with the following version of `Node.js`:
- Node.js v18.1.0

It is recommended that you have a minimum of this version installed to run this project locally.