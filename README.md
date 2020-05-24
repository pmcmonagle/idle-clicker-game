# A Simple Idle Clicker Game!
How to play: Tap the BUY button to purchase a business, and tap the business itself to run it! Reap the rewards!
Gotten tired of clicking? Purchase a manager from the managers tab and have it run your business for you!

## Installation
### Requirements
 - NodeJS (12.16.3 or higher)
### Running the Dev Server
 1. Clone this repository the location of your choice
 2. Navigate to the newly cloned repository using your terminal of choice
 3. Run `npm i`
 4. Run `npm run dev`
 5. Access the running dev server at the IP Address and Port displayed in the terminal
### Running a Build
 1. Clone this repository the location of your choice
 2. Navigate to the newly cloned repository using your terminal of choice
 3. Run `npm i`
 4. Run `npm run build`
 5. Upload the contents of the 'dist' directory to the web server of your choice

## Documentation
### Methodology
#### Problem Statement
Create a simple idle game with the following features:
- Buy and upgrade businesses
- Make money from a business. (i.e. you click on a business and in a certain amount of time you get money – see web implementation above.)
- Hire managers so that money is made automatically
- When you close the game, next time you open it, you should see the money that your businesses made for you. (Businesses continue to make progress while you’re away.)
#### Solution
Gameplay for this game centers around a collection of businesses, and a single cash resource. Clicking a business causes it to enter a "running" state, and store a timestamp for when it entered that state. Each frame we check the current timestamp against the stored timestamp of a running business to determine its progress; once it has run for the specified amount of time, we collect a cash payout from the business and exit the running state. For a business that is managed, we reset the timestamp rather than exiting the running state - managed businesses run forever.

Saving the state of the game is done via localStorage. Every user action, or cash payout will prompt a save to localStorage. Opening the game again some time later will load data from localStorage, and use the stored timestamps on each business to determine how much cash was made while the user was away (or how much progress was made if not enough time has passed for a payout). A potential server component for this game would require registration, and could save the user's progress to a document store database (eg. MongoDB) at regular intervals.
### Technology Stack
| Technology | Description          |           |
|------------|----------------------|-----------|
| Phaser-CE  | HTML5 Game Framework | I chose Phaser because it's the framework I'm currently most familiar with. I knew I could get a game together very quickly using Phaser. |
| TypeScript | Programming Language | I am a big fan of explicit static typing; it reduces errors, promotes good practices, and has good IDE integration. |
| Browserify | Module Manager       | Even though many modern browsers now support native JavaScript modules, I think it's still good practice to use a module manager to increase browser compatability. |
| Tsify      | Browserify Plugin    | Tsify adds TypeScript support to Browserify. |
| Budo       | Dev Server           | Budo is an easy to use dev server with auto-reloading and good Browserify integration. It will print compilation errors directly to the screen when they occur. |
### File Structure
This project uses a loosely MVC inspired architecture. Object data is represented in models,
and visual elements are represented by views in the 'ui' folder. Phaser states serve as the
controllers, connected the views with data models via events.
```
project
|   README.md
|   LICENSE
|    package.json  | Defines project dependencies
|    tsconfig.json | Defines typescript compilation rules
|
( Built code and assets go in the dist folder )
+---dist
    |   index.html
    |   main.js     | Compiled JS Code
    |   main.js.map | Maps back to the source TypeScript code
    |
    +---assets
        +---images | All images and spritesheets go here.
        +---sounds | All sounds and audiosprites go here.
    
( All TypeScript source code goes in the src folder )
+---src
    |   main.ts | Program entry point. This file instatiates the Phaser game instance.
    |
    +---models
        | business.ts        | This is a model for a single business.
        | businesses.ts      | This is a static registry of all businesses in the game, and is where you should look if you want to add or modify a business.
        | businessManager.ts | This is a model for a manager who runs a business for you in the game.
        | cash.ts            | This model represents the amount of cash owned by the user.
    +---services
        | dataSaving.ts | This service saves and loads data from localStorage.
    +---states
        | boot.ts     | The bootstate sets up project dimensions and Phaser configuration.
        | gameplay.ts | The bulk of the action happens in the gameplay state.
        | preload.ts  | The preload state preloads all assets (images and sounds)
        | title.ts    | The title state displays a simple welcome message, and shows you how much cash you've earned on returning.
    +---ui
        | (ui components are hopefully self-explanatory... they are the visual representation of the thing they are named after)
``` 
