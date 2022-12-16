# Description of Restaurant Reviewer

## Product Vision
 For students, and adults alike, Restaurant Reivewer allows users to rate more aspects of a restaurant. Some of these are staff, ambiance, and service. 



## Team Members


Derek Han - https://github.com/alograti
Michael Thuo - https://github.com/mgt306
Anh Tran - https://github.com/Anhtrr

## History and how to contribute

Restaurant Reviewer was created as a student project in a class named "Remote Development" taught by Evan Korth in the Computer Science department at New York University. This is an interesting project, as the individual who thought of the product was no longer interested in contributing to it. Restaurant Reviewer allowed us to practice full stack development as a team. This project was also a way to practice and learn Agile methodologies and SCRUM; we did regular standups, demos, and sprint planning sessions. 


## How to build and test the project

Open the front end, and use npm install if necessary to download all dependencies. Then run npm start. 

## Additional info and documents

Confluence Wiki: https://ttyd-recipe-book.atlassian.net/wiki/spaces/restaurantreviewer/pages/9207809/User+Guide

Deployed Website: https://restaurant-reviewers.herokuapp.com/

## Cool Features You Should Check Out

1) Smooth Transitions:
Mapbox flyto animations using React hooks and callback functions, allows users to enjoy a smoother experience when using our home page map or the Explore and Add Restaurants page map. In the maps, users will start their viewport at their live requested location, marked by the white marker. In the New York area on the map, user's can explore our pre-determined set of restaurants marked by the teal colored markers. When any of the restaurants are clicked on, restaurant information will be shown in a popup attached to it's marker and a flyto transition will smoothly take the user's viewport to the restaurant marker on the map. On the add and explore map, when users choose a restaurant to add, flyto transition will take the user's viewport there. When closed, flyto transition will take users back to a restaurant they have opened and if none are opened, it will remain. On top of this, in either of the maps, users can drag to move freely anywhere.

2) Restaurant Viewing Options:
Users have 2 options of viewing unique restaurant information. Option 1 is directly on our home or explore and add maps. When a restaurant marker (teal-colored) is clicked, the restaurant's information will show, in the form of a Popup. Here, users can see the restaurants name, address and reviews. Option 2 is on the restaurant's individual profile page where it shows some more information (not shown on the popup) regarding the restaurant: phone, booking links, and image, if available. 

3) Unified Review of 5 categories:
Users have the option to review a restaurant through either of the maps. Just click on a restaurant and click on the review option on the popup. A review form will be shown and users can review the restaurant in 5 different categories (ambiance, food, service, price, and overall) on the scale of 0-5. Users must provide a name for their review and the name they want to be displayed as creator of the post. A timestamp will be taken from when the user makes their review and will be displayed along with their review (on the map and the restaurant's individual page). These review categories will be displayed in the form of stars so that every user's reviews are unified on the same categories as well as scales.

4) Add Restaurant Mode:
Under the explore and add restaurants tab, users will notice a button at the bottom left that enables them to add a new restaurant to our database. Just enable that option by clicking on it and then, double click a location on the map to place a new restaurant. A form will popup where users can fill out information of this new restaurant (Hover over that button to get instrution). Only the restaurant name and address is required but the more the better. After submitting, user's will be taken back to the home map, where they can view the new restaurant added or write a review for it. If unsuccesful, an alert will notify the user before navigating back to the home map.

5) Add Restaurant Mode Disabled:
When in add mode, users can click the Disable Add Restaurant Mode to stop adding. When a user does so, they will not be able to double click to add a new restaurant. 

6) Return to user Location:
To return to user location at any point in time, user's can click the second button on the top right of the map. 

7) Map Controls:
Users are able to freely move around our maps and can change the rotate or tilt with the right mouse button.

8) Keyboard controls:
Users can also control the map with keyboard controls. To move around use up, down, left, right keys. To change tilt or rotate, hold shift and use up down, left, right keys.



