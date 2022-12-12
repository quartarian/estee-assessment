Demo
=====

[You can view the deployed application here.](https://estee.prenault.com/)

Introduction
============

Hi there! I built a simple front-end that fetches and displays all of the permitted food trucks in San Francisco on a Google Map. I added a permit status filter and implemented a simple search function to quickly find relevant trucks. I also included a collapsible list of food trucks that match the specified criteria. When you click on a truck (either on the map or in the collapsible list), the app loads a modal with detailed information about the permit, and a link to get directions to the food truck from your current location. As a fun touch, I added some artwork generated using DALL-E to the modal.

Improvements I'd Make (Given more time)
=======================================

Mobile Experience
-----------------

The build something useful in the allotted time, I focused primarily on the desktop use case. I stylized the UI for Mobile, but the performance there could definitely be optimized.

Robust Typing
-------------

I'm currently in the process of learning TypeScript, and would have liked to add interfaces and typing to all the functions.

Run App Locally
===============

Firstly, you will need to generate an API key and replace the APIKEY constant in pages/index.tsx file. The API included in the repo is valid, but only for production. [Here is a guide.](https://developers.google.com/maps/documentation/javascript/get-api-key#:~:text=Go%20to%20the%20Google%20Maps%20Platform%20%3E%20Credentials%20page.&text=On%20the%20Credentials%20page%2C%20click,Click%20Close.)

Then run:
```bash
yarn install
yarn dev
```

About Me
========

For the past 11 years, I've been running my own agency, turning sketches on the back of napkins into software that people rely on daily. This has required me to continually learn new technologies, communicate effectively across different knowledge domains, and take complete ownership over projects in order to ensure their successful launch.

This is a [Next.js](https://nextjs.org/) developed for the [Food Truck Engineering Assessment](https://github.com/peck/engineering-assessment).
