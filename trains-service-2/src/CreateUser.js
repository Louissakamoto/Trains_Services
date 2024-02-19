import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useFetch from "./useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { InfinitySpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //Import necessary modules

const CreateUser = () => {

	const { error, isPending, data: users } = useFetch("http://localhost:8000/users");
	//use useFetch to access data on loading the data.

	const [id, setId] = useState("");
	const [userRole, setUserRole] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [userTasks, setUserTasks] = useState("");
	const [lastModifiedDate, setLastModifiedDate] = useState(new Date().toLocaleDateString());
	//all data regarding a user is created as a dynamic variables thanks to the useState hook

	const nav = useNavigate();

	const handleSubmit = (e) => {//the function handles the event object related to the form submission

		e.preventDefault();//prevents defeault behaviour of the event, that is for exapmle reloading

		if(!validateRegister()){//calling the validation function
			return;//if the password is not valid, return is called so that the user isn't submitted
		}

		var role = userRole; //creating variables that can be uploaded onto the JSON file
		var upassword = userPassword;

		var tasks = "";
		if (userRole == "Admin") {
			tasks = "ALL";
		} else if (userRole == "User") {
			tasks = userTasks;
		} else {
			tasks = ""; //setting the tasks available dependent on the role of the created account
		}

		const newUser = { //creation of an object that can be uploaded into the JSON file
			id,
			role,
			upassword,
			tasks,
			lastModifiedDate,
		};

		fetch("http://localhost:8000/users/", { //"calling" the JSON file
			method: "POST", //calling the POST method which allows to write new data into the file
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newUser), //writing down the newUser object as a string into the JSON file
		}).then(() => {
			nav("/admin"); //once the upload is complete, we are rerouted back into the main admin panel view
		});
	};

	const handleCancel = () => {
		nav("/admin"); //cancelling the creation, routes us back to the admin panel
	};

	const [lower, setLower] = useState(false); //initialization of boolean variables that track 
	const [upper, setUpper] = useState(false); //if the given conditions have been met or not
	const [number, setNumber] = useState(false);
	const [special, setSpecial] = useState(false);
	const [length, setLength] = useState(false);
	
	//validation of the inputted password
	const validateRegister = () => {
		var valid = true;

		if (lower && upper && special && length && number) {
		} else {
			valid = false;
			toast.warning("Password does not meet requirements.");
		}
		return valid; //the function returns true if the password meets requirements, else false
	}

	const handleIndicators = () => {
		var lower = new RegExp("^(?=.*[a-z])");//creating regular expressions: a sequence of characters
		var upper = new RegExp("^(?=.*[A-Z])");//through which we may check the validity of the password
		var number = new RegExp("^(?=.*[0-9])");
		var special = new RegExp("^(?=.*[!@#$%^&*])");
		var length = new RegExp("^(?=.{6,})");

		if (lower.test(userPassword)) {//check if the password contains lower case characters
			setLower(true);//if yes set the variables that tracks that condition as true
		} else {
			setLower(false);//if no set the variable as false
		}
		//repeating the same logic for upper case, numbers, special characters and length.
		if (upper.test(userPassword)) {
			setUpper(true);
		} else {
			setUpper(false);
		}
		if (number.test(userPassword)) {
			setNumber(true);
		} else {
			setNumber(false);
		}
		if (special.test(userPassword)) {
			setSpecial(true);
		} else {
			setSpecial(false);
		}
		if (length.test(userPassword)) {
			setLength(true);
		} else {
			setLength(false);
		}
	};

	useEffect(() => {
		handleIndicators(); //is called in a useEffect hook, which activates when the userPassword is inputted
	}, [userPassword])

	return (
		<div className="content-container">
			<ToastContainer />
			{isPending && (
				<div className="spinner-container">
					<InfinitySpin width="200" color="#29aee7" className="spinner" />
				</div>
			)}
			{error && <div>{error}</div>}
			{users && ( //the HTML is returned when the users objects are present
				<div className="create">
					<h2 className="page-title">Create New User</h2>
					<form onSubmit={handleSubmit}> {/*a form that calls the function handleSubmit, when submitted*/}
						<div className="task-title">
							<label>User Name - ID:</label>
							<input type="text" required value={id} onChange={(e) => setId(e.target.value)} />
							{/*set value of user id*/}
						</div>
						<div className="task-title">
							<label>Password:</label>
							<input
								type="text"
								required //the form can't be submitted without this field being filled out
								value={userPassword}
								onChange={(e) => setUserPassword(e.target.value)}
								//set value of password
							/>
						</div>
						<div className="password-req">Password requires at least: 1 lower case letter,
						 capital letter, special sign, a number and at least 6 characters.</div>
						{/*displays the validation requirements of the password*/}
						<div className="task-title">
							<label>Role:</label>
							<select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
								<option value="-">-</option>
								<option value="User">User</option>
								<option value="Admin">Admin</option>
								{/*select the role of the user*/}
							</select>
						</div>
						{userRole === "User" && ( //if we have chosen the user to be only a user, we must assign
						// the orders he may access
							<div className="task-title">
								<label>Available Tasks - Tasks IDs separated by space:</label>
								<input
									type="text"
									required //the form can't be submitted without this field being filled out
									value={userTasks}
									onChange={(e) => setUserTasks(e.target.value)}
									//set value of the variable
								/>
							</div>
						)}
						<div className="create-buttons-row">
							<button type="button" onClick={() => handleCancel()} className="cancel-task-button">
								Cancel {/*button to cancel the creation of the order, which routes us back to Admin*/}
							</button>
							<button type="submit" className="create-task-button">
								Create User {/*a submit button, which when pressed calls the handleSubmit function*/}
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default CreateUser;