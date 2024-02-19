import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { InfinitySpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const User = () => {
	const { id } = useParams();
	const nav = useNavigate();
	const { data: user, error, isPending } = useFetch("http://localhost:8000/users/" + id);

	useEffect(() => {
		if (user != null) {
			setUserRole(user.role);
			setUserPassword(user.upassword);
			setUserTasks(user.tasks);
		}
	}, [user]);

	const [userRole, setUserRole] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [userTasks, setUserTasks] = useState("");
	const [lastModifiedDate, setLastModifiedDate] = useState(new Date().toLocaleDateString());

	const handleCancel = () => {
		nav("/admin");
	};

	const [lower, setLower] = useState(false);
	const [upper, setUpper] = useState(false);
	const [number, setNumber] = useState(false);
	const [special, setSpecial] = useState(false);
	const [length, setLength] = useState(false);

	const handleDelete = () => {
		fetch("http://localhost:8000/users/" + user.id, {
			method: "DELETE",
		}).then(() => {
			nav("/admin");
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		
		user.id = id;
		user.upassword = userPassword;
		user.role = userRole;

		if(!validateRegister()){
			return;
		}

		var tasks = "";
		if (userRole == "Admin") {
			tasks = "";
		} else if (userRole == "User") {
			tasks = userTasks;
		} else {
			tasks = "";
		}
		user.tasks = tasks;

		user.lastModifiedDate = new Date().toLocaleDateString();

		fetch("http://localhost:8000/users/" + user.id, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user),
		}).then(() => {
			nav("/admin");
		});
		
	};

	const validateRegister = () => {
		var valid = true;

		if (lower && upper && special && length && number) {
		} else {
			valid = false;
			toast.warning("Password does not meet requirements.");
		}
		return valid;
	};

	const handleIndicators = () => {
		var lower = new RegExp("^(?=.*[a-z])");
		var upper = new RegExp("^(?=.*[A-Z])");
		var number = new RegExp("^(?=.*[0-9])");
		var special = new RegExp("^(?=.*[!@#$%^&*])");
		var length = new RegExp("^(?=.{6,})");

		if (lower.test(userPassword)) {
			setLower(true);
		} else {
			setLower(false);
		}
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
		handleIndicators();
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
			{user && (
				<div className="create">
					<h2 className="page-title">Create New User</h2>
					<form onSubmit={handleSubmit}>
						<div className="task-title">
							<label>User Name - ID:</label>
							<h3>{user.id}</h3>
						</div>
						<div className="task-title">
							<label>Password:</label>
							<input
								type="text"
								required
								value={userPassword}
								onChange={(e) => setUserPassword(e.target.value)}
							/>
						</div>
						<div className="password-req">Password requires at least: 1 lower case letter, capital letter, special sign, a number and at least 6 characters.</div>
						<div className="task-title">
							<label>Role:</label>
							<select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
								<option value="-">-</option>
								<option value="User">User</option>
								<option value="Admin">Admin</option>
							</select>
						</div>
						{userRole === "User" && (
							<div className="task-title">
								<label>Available Tasks - Tasks IDs separated by space:</label>
								<input
									type="text"
									value={userTasks}
									onChange={(e) => setUserTasks(e.target.value)}
								/>
							</div>
						)}

						<div className="create-buttons-row">
							<button type="button" onClick={() => handleCancel()} className="cancel-task-button">
								Cancel
							</button>
							<button type="button" onClick={() => handleDelete()} className="delete-task-button">
								Delete
							</button>
							<button type="sumbit" className="create-task-button">
								Update
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default User;