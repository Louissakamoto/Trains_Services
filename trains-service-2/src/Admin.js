import useFetch from "./useFetch";
import { useEffect, useState } from "react";
import TasksList from "./TasksList";
import { InfinitySpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UsersList from "./UsersList"; //Import necessary modules

const Admin = () => {
	//useFetch hook, fetches user data 
	const { error, isPending, data: users } = useFetch("http://localhost:8000/users");

	return (
		<div className="tasks-content">
			<ToastContainer /> 
			{error && <div>{error}</div>}
			{/*displays an error if the data isn't fetched*/}
			{isPending && (
				<div className="spinner-container-2">
					<InfinitySpin width="200" color="#29aee7" className="spinner" />
				</div>
			)} {/*displays a spinning wheel when data is loading*/}
			{users && <UsersList users={users} />}
			{/*use the imported UserList component to list the users*/}
		</div>
	);
};

export default Admin;