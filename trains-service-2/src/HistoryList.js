import { Link } from "react-router-dom";

const TasksList = ({ tasks }) => {

	return (
		<div className="tasks-list">
			<h2 className="page-title-tasks">Finished Orders</h2>
			<div className="task-preview-head">
			{/*display a row to show what the data below it represents*/}
				<div className="task-preview-inner row">
					<div className="task-preview-section col-lg-2">
						<h3>ID</h3>
					</div>
					<div className="task-preview-section col-lg-3">
						<h3>Order Number</h3>
					</div>
					<div className="task-preview-section col-lg-3">
						<h3>Client Name</h3>
					</div>
					<div className="task-preview-section col-lg-3">
						<h3>Title</h3>
					</div>
				</div>
			</div>
			{tasks.map((task) => ( //mapping, looping, through all of the imported order objects
				(task.wysylkaDoKlienta) && //if the last task in the order is complete the div in the conditional is displayed
				(<div className="task-preview" key={task.id}>
					<Link className="task-preview-inner row" to={`/finished/${task.id}`}>
						<div className="task-preview-section col-lg-2">
							<h2>{task.id}</h2>
						</div>
						<div className="task-preview-section col-lg-3">{task.orderNumber}</div>
						<div className="task-preview-section col-lg-3">{task.clientName}</div>
						<div className="task-preview-section col-lg-3">{task.title}</div>
						{/*displaying data regarding the finished order*/}
					</Link>
				</div>)
			))}
			<div className="task-preview">
				<Link className="task-preview-inner row" to="/tasks">
					<div className="task-preview-section col-lg-12 create-new-task">
						<h2>Back to orders</h2>
					</div>
					{/*link back to the order list*/}
				</Link>
			</div>
		</div>
	);

	
};

export default TasksList;