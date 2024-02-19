import React from "react";
import ReactDOM from "react-dom/client";
//Importing necessary modules from React and ReactDOM (Document Object)
import App from "./App"; 
//Importing the main component of the application

const root = ReactDOM.createRoot(document.getElementById("root"));
// Creating a root element using ReactDOM.createRoot method and attaching it to the DOM element with id "root"
// Rendering the main component of the application wrapped inside React.StrictMode
root.render(
	<React.StrictMode>
		<App /> 
	</React.StrictMode>
);
