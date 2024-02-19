import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { InfinitySpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserPanel = () => {
    const [id, setId] = useState("");
	const nav = useNavigate();
	const { data: user, error, isPending } = useFetch("http://localhost:8000/users/" + sessionStorage.getItem("username"));

	useEffect(() => {
		if (user != null) {
			setUserRole(user.role);
			setUserPassword(user.upassword);
            setId(user.id);
		}
	}, [user]);

	const [userRole, setUserRole] = useState("");
	const [userPassword, setUserPassword] = useState("");

	const handleCancel = () => {
		nav("/");
	};

	const [lower, setLower] = useState(false);
	const [upper, setUpper] = useState(false);
	const [number, setNumber] = useState(false);
	const [special, setSpecial] = useState(false);
	const [length, setLength] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if(!validateRegister()){
			return;
		}

		user.id = id;
		user.upassword = userPassword;
		user.role = userRole;
		user.lastModifiedDate = new Date().toLocaleDateString();

		fetch("http://localhost:8000/users/" + user.id, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user),
		}).then(() => {
			nav("/");
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
			{user && ( //dispaly the following only if the data has been fetched
				<div className="create">
					<h2 className="page-title">Update User</h2>
					<form onSubmit={handleSubmit}>
						<div className="task-title">
							<label>User Name - ID:</label>
							<h3>{user.id}</h3> {/*display the username*/}
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
						<div className="password-req">Password requires at least: 1 lower case letter, capital letter, special sign, a number and at least 6 characters.</div>
						{/*display the conditions that must be met for a valid password*/}
						<div className="create-buttons-row">
							<button type="button" onClick={() => handleCancel()} className="cancel-task-button">
								Cancel {/*to cancel the edition of the user*/}
							</button>
							<button type="submit" className="create-task-button">
								Update {/*to submit the udpate*/}
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default UserPanel;