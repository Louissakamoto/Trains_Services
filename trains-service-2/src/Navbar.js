import { Link, useLocation, useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import React, { useState, useEffect } from "react";
import { faBell, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";//import necessary modules

const Navbar = () => {

	const [isLoggedIn, setIsLoggedIn] = useState(false);//tracks if the user is logged in
	const [loggedRole, setLoggedRole] = useState("");//tracks the role of the user (admin or user)
	const [availableTasks, setAvailableTasks] = useState([]);//tracks which orders are available to the user
	const [loginBoxClasses, setLoginBoxClasses] = useState("login-container hide");
	const [userName, setUserName] = useState("");//inputted username
	const [password, setPassword] = useState("");//inputted password

	const nav = useNavigate();
	const location = useLocation();

	const showLogin = () => { // a function that calls the setLoginBoxClasses changing the variable's state
		setLoginBoxClasses("login-container");
	};

	const hideLogin = () => {
		setLoginBoxClasses("login-container hide");
	};

	useEffect(() => {
		//anytime we change the location in the website, the function is called.
		let loggedIn = sessionStorage.getItem("loggedin");
		let role = sessionStorage.getItem("role");
		let tasks = sessionStorage.getItem("tasks");
		//we import the role and tasks available from the session storage.

		if (loggedIn) setIsLoggedIn(true);
		else setIsLoggedIn(false);

		if (role === "Admin") setLoggedRole("Admin");
		else if (role === "User") setLoggedRole("User");
		else setLoggedRole("");

		if (tasks) setAvailableTasks(tasks);
		//update the dynamic variables outside of the function

		console.log("tasks to show: " + availableTasks);

		if (location.pathname !== "/" && !isLoggedIn) {
			nav("/"); //if the person on the website isn't using the website and tries to access a webpage by writing a link in the browser, this condition will route him back to the home page.
		}

		if (location.pathname.includes("/tasks/")) {
			//this if coniditon blocks the users access to tasks he hasn't been assigned to
			let path = location.pathname;
			let taskToShow = path.replace("/tasks/", "");

			if (loggedRole !== "User" && loggedRole !== "Admin") {
				toast.error("You are not allowed to view this order.");
				nav("/tasks"); //if the user is not logged in at all, he can't do anything
			}
			
			if (!availableTasks.includes(taskToShow) && loggedRole === "User") {
				//if the task that the user wants to see isn't in avilable tasks for him, he is navigated back to the order list, thus blocking access to the order.
				toast.error("You are not allowed to view this order.");
				nav("/tasks");
			}
		}
	}, [location]);

	const handleLogOut = () => {
		toast.warning("You are logged out.");
		setIsLoggedIn(false);
		setLoggedRole("");
		setUserName("");
		setPassword("");
		sessionStorage.clear();
		nav("/");
	};

	const handleLogin = () => {
		fetch("http://localhost:8000/users/" + userName, { 
			//make a GET request from the JSON file, with the username provided by us earlier
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			//handle the response from the server
			.then((res) => {
				//checks if the resposne is successful
				if (res.ok) {
					console.log("Ok");
					return res.json();
					// if successful, response body is parsed and returned to use in next lines
				} else {
					// log error if unsuccessful
					console.log("Not Ok");
				}
			})

			
			//processing the data that has been returned before
			.then((data) => {
				// check if the user data inputted by the user matches the data that has been fetched
				if (data.id === userName && data.upassword === password) {

					toast.success("Logged in successfully!");//dispaly success
					//set all the rest of data regarding the user as ones the that have been fetched
					setIsLoggedIn(true);
					setLoggedRole(data.role);
					const arr = data.tasks.split(" ");
					setAvailableTasks(arr);

					//input the fetched data into the session so they can be used outside of the navbar
					sessionStorage.setItem("username", data.id);
					sessionStorage.setItem("loggedin", true);
					sessionStorage.setItem("role", data.role);
					sessionStorage.setItem("tasks", arr);

					//reset the variables that track the user data inputted by us for verification
					setUserName("");
					setPassword("");
					hideLogin();

				//if the data does not match, output the information
				} else {
					toast.error("Wrong Username or Password.");
				}
			})
			//tracking for errors
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			<ToastContainer />
			<div className={loginBoxClasses}> {/* the div that appears, dependent from the CSS class,
			where log in data can be inputted */}
				<div className="close-button" onClick={() => hideLogin()}> {/* sets the previous CSS class to hide */}
					<FontAwesomeIcon icon={faXmark} className="icon-close" />
				</div> 
				<div className="login-row">
					<label> User Name:</label>
					<input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
					{/* input the username and change the state of the userName variable into the inputted one*/}
				</div>
				<div className="login-row">
					<label> Password:</label>
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
					{/* input the password and change the state of the password variable into the inputted one*/}
				</div>
				<button onClick={() => handleLogin()} className="log-button">
					Log In
					{/*button that calls the function that verifies the inputted login credentials*/}
				</button>
			</div>
			<nav className="navbar" id="full-menu">
				<a href="/">
					<img className="navbar-logo" src="/logo.jpg" alt="logo" />
				</a>
				<div className="links">
					<div className="link-container">
						<Link className="link" to="">
							Home
						</Link>
					</div>
					{isLoggedIn && loggedRole === "Admin" && (//appears only when logged in and the user is an admin
						<div className="link-container">
							<Link className="link" to="History">
								History
								{/*link to the history panel*/}
							</Link>
						</div>
					)}
					{isLoggedIn && (//appears only when logged in
						<div className="link-container">
							<Link className="link" to="tasks">
								Orders
								{/*link to the order panel*/}
							</Link>
						</div>
					)}
					{isLoggedIn && loggedRole === "Admin" && (
						//the div appears in the navigation bar only when the user is logged in and is an admin
						<div className="link-container">
							<Link className="link" to="admin">
								Admin
								{/*link to the admin panel*/}
							</Link>
						</div>
					)}
					{isLoggedIn && loggedRole === "User" && (
						//the div appears in the navigation bar only when the user is logged in and is an user
						<div className="link-container">
							<Link className="link" to="user">
								User
								{/*link to the user panel*/}
							</Link>
						</div>
					)}
					{isLoggedIn && (
						<div className="link-container">
							<Link className="link" onClick={() => handleLogOut()}>
								Log Out
							</Link>
						</div>
					)}
					{!isLoggedIn && (// the login button is in the navbar only when the user isn't logged in
						<div className="link-container">
							<Link onClick={() => showLogin()} className="link"> 
								Log In
							</Link>
						</div>
					)}
				</div>
			</nav>
			{/*mobile view of the navgiation bar*/}
			<nav className="navbar-mobile" id="burger-menu">
				<Menu right style="overflow: hidden;">
					<Link className="link" to="">
						Home
					</Link>
					<Link className="link" to="tasks">
						Orders
					</Link>
					{isLoggedIn && loggedRole === "Admin" && (
						<Link className="link" to="admin"> 
							Admin
						</Link>
					)}
					{isLoggedIn && loggedRole === "User" && (
						<Link className="link" to="user">
							User
						</Link>
					)}
					{isLoggedIn && (
						<Link className="link" onClick={() => handleLogOut()}>
							Log Out
						</Link>
					)}
					{!isLoggedIn && (
						<Link onClick={() => showLogin()} className="link">
							Log In
						</Link>
					)}
				</Menu>
				<div className="links">
					<a href="/">
						<img className="navbar-logo-mobile" src="/logo.png" alt="logo" />
					</a>
				</div>
			</nav>
		</div>
	);
};
export default Navbar;