import useFetch from "./useFetch";
import { useEffect, useState } from "react";
import TasksList from "./TasksList";
import { InfinitySpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //Importing all necessary modules

const Tasks = () => {
	const { error, isPending, data: tasks } = useFetch("http://localhost:8000/tasks");
	//fetching tasks data from the JSON file
	return (
		<div className="tasks-content">
			<ToastContainer />
			{error && <div>{error}</div>}
			 {/*dispaly error if present*/}
			{isPending && (//dispaly spinning wheel when loading
				<div className="spinner-container-2">
					<InfinitySpin width="200" color="#29aee7" className="spinner" />
				</div>
			)}
			{tasks && <TasksList tasks={tasks} />}
			{/*route to TasksList component with imported tasks data*/}
		</div>
	);
};
export default Tasks;
