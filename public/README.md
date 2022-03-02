# PWA app
basically, a progressive web app **PWA** is how you serve you website for the users while they are offline.

## Service worker
service worker is that concept that make our apps progressive.

### caching
while your browser is going to make a ton of request to grap that resources for you website **html, css, js**, service workers will make it short for our browsers, so that they all need to communicate with our service workers `caches`. **and of course while we are offline**.

## to demo this
**NOTICE** make sure you have registered your service worker.
inspect the page where your local server is running, and then move to: 
  - application tab
  - service worker
  - network `check for the size tab` to see that the browser is getting all the resources from SW.
  - check the `offline` box in the appliaction>service worker
  - and whla, everything is going right.
  - we served our website even while we are offline.

## another thing to do with the project folder
is that you need to run `npm install` to install all the dependencies required for this project to run
since i used `gulp` to compile some **SASS** into **CSS**

# Thank you very much
and i hope this will help you 

Khaled Hayek, a full stack web developer
