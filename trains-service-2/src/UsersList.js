import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlusCircle
} from "@fortawesome/free-solid-svg-icons"; //import necessary modules

const UsersList = ({ users }) => { //the component uses user data we have fetched in the Admin component

	const handleTasks = (user) => { //input is the user from the map function before
		var str = ""; //variable to return
		if (user.role === "Admin") {
			str = "ALL"; // if the given users role is admin, he has access to all orders
			// set return variable as ALL
		} else if (user.role === "User") {
			if(user.tasks){
				str = user.tasks; // if users has assigned tasks, set return variable to the ones 
				//stored in the object
			}else{
				str = "NONE";
				// otherwise set the return variable as NONE, no orders available
			}
		} else {
			str = "NONE"; // fail condition
		}
		return str; //return the variable to the HTML from before
	};

	return (
		<div className="tasks-list">{/*the class is tasks-list as creation of another class was pointless*/}
			<h2 className="page-title-tasks">Users List</h2>
			<div className="task-preview-head">
				<div className="task-preview-inner row">{/*headers for the table containing data on users*/}
					<div className="task-preview-section col-lg-2">
						<h3>ID</h3>
					</div>
					<div className="task-preview-section col-lg-3">
						<h3>Role</h3>
					</div>
					<div className="task-preview-section col-lg-3">
						<h3>Available Tasks</h3>
					</div>
				</div>
			</div>
			{users.map((user) => (//the .map function goes through every user object that has been fetched and
			//exectues on it whatever is in the function
				<div className="task-preview" key={user.id}>
					<Link className="task-preview-inner row" to={`/admin/${user.id}`}>
					{/*a box that when interacted it with, will route us to the panel of a single user*/}
						<div className="task-preview-section col-lg-2">
							<h2>{user.id}</h2>
						</div>
						<div className="task-preview-section col-lg-3">{user.role}</div>
						<div className="task-preview-section col-lg-3">{handleTasks(user)}</div>
						{/*handleTasks is a function that checks which orders are available to the user*/}
					</Link>
				</div>
			))}
			<div className="task-preview">
				<Link className="task-preview-inner row" to="/admin/create-user">
				{/*a box that routes us to the component where we can create a user*/}
					<div className="task-preview-section col-lg-12 create-new-task">
						<FontAwesomeIcon icon={faPlusCircle} className="icon-create" />
						<h2>Create New User</h2>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default UsersList;