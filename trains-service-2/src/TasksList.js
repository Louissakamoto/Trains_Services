import ProgressBar from "@ramonak/react-progress-bar";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
	faFilter,
	faSearch,
	faPlus,
	faMinus,
	faPlusCircle,
	faCalendarXmark,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const TasksList = ({ tasks }) => {

	const [availableTasks, setAvailableTasks] = useState([]);
	const [isAdmin, setIsAdmin] = useState("User");
	//declartion of dynamic variables to track if the user's role
	const location = useLocation();
	//using useLocation hook to be able to access the location object

	useEffect(() => {
		setIsAdmin(sessionStorage.getItem("role"));
		//setting the role as the one stored in the session storage
		setAvailableTasks(sessionStorage.getItem("tasks"));
		//update the dynamic variables outside of the function
	}, []);

	const handleDelayNotification = (task) => {
		if (handleTaskProgress(task) == 100) {
			return ""; //if the task is complete, nothing is returned
		}
		var dateNow = moment(new Date()); //check for the date at which the notification is handled
		var dateThen = moment(task.lastModifiedDate); //check for the date at which the task has been last modified

		var difference = parseInt(moment.duration(dateNow.diff(dateThen)).asDays()); //calculate the difference between the two dates
		console.log("Days difference: " + difference); 

		if (difference >= 7) { //dependendent from the calculated difference, different icons are returned
			return <FontAwesomeIcon icon={faCalendarXmark} className="icon-notification icon-delay7" />;
		}
		if (difference >= 3) {
			return <FontAwesomeIcon icon={faCalendarXmark} className="icon-notification icon-delay3" />;
		} else {
			return "";
		}
	};
	const handleTaskProgress = (task) => {
		//the function takes in the task object (the order) as an argument
		var jobsCounter = 0; //count the total amount of jobs
		var completedJobsCounter = 0; //count the amount of completed jobs
		var progression = 0; //initialization of variable that tells us the progress

		if (task.wjazdZestawu) { //check for the Boolean variable regarding the "wjazd zestawu" step (true if completed, false if )
			jobsCounter++; 
			completedJobsCounter++; //increase completed jobs by one
		} else {
			jobsCounter++; //the total amount of jobs is increased by one anways
		}
		//the same conditional logic continues up till different path options appear, the total job counter is increased by one, no matter its completion, while the amount of 
		if (task.demontazMaznic) { 
			jobsCounter++;
			completedJobsCounter++;
		} else {
			jobsCounter++;
		} //etc. until the branch
		if (task.demontazLozysk) {
			jobsCounter++;
			completedJobsCounter++;
		} else {
			jobsCounter++;
		}
		if (task.czyszczenieZestawu) {
			jobsCounter++;
			completedJobsCounter++;
		} else {
			jobsCounter++;
		}
		if (task.czyszczenieMaznic) {
			jobsCounter++;
			completedJobsCounter++;
		} else {
			jobsCounter++;
		}
		if (task.czyszczenieLozysk) { 
			jobsCounter++;
			completedJobsCounter++;
		} else {
			jobsCounter++;
		} 

		if (task.kolaBose === "Dobre") { //if the state of the part is good
			jobsCounter++; //one is added as to both counters as to check the state of a part is a completion of a job
			completedJobsCounter++;
			if (task.opdmm1) { //no matter if the next task in the branch is completed or not, the jobs counter is added
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
		} else if (task.kolaBose === "Zle") { //if the state of the part is bad
			jobsCounter++; //again, one is initially added to both variables
			completedJobsCounter++;
			if (task.rzk1) { //we add up to the counters just as we added up before.
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
			if (task.wymienicKolaBose) { //next task
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
			if (task.zzk1) { //next task
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
		} else { //if the state of the part is not checked (no branch is chosen yet), 4 is added as the maximum possible amount of jobs in the branch.
			jobsCounter = jobsCounter + 4;
		}

		if (task.os === "Dobre") {
			jobsCounter++;
			completedJobsCounter++;
			if (task.opdmm2) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
		} else if (task.os === "Zle") {
			jobsCounter++;
			completedJobsCounter++;
			if (task.rzk2) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
			if (task.wymienicOs) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
			if (task.zzk2) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
		} else {
			jobsCounter = jobsCounter + 4;
		}

		if (task.koloZebate === "Dobre") {
			jobsCounter++;
			completedJobsCounter++;
			if (task.oczyscic) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
		} else if (task.koloZebate === "Zle") {
			jobsCounter++;
			completedJobsCounter++;
			if (task.rzk3) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
			if (task.wymienicKoloZebate) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
			if (task.zzk3) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
		} else {
			jobsCounter = jobsCounter + 4;
		}

		if (task.toczycObrecze) {
			jobsCounter++;
			completedJobsCounter++;
		} else {
			jobsCounter++;
		}

		if (task.weryfikacjaMaznic === "Dobre") {
			jobsCounter++;
			completedJobsCounter++;
			if (task.pdmonm1) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
		} else if (task.weryfikacjaMaznic === "Zle") {
			jobsCounter++;
			completedJobsCounter++;
			if (task.wymienicMaznice) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
			if (task.pdmonm2) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
		} else if (task.weryfikacjaMaznic === "Do regeneracji") {
			jobsCounter++;
			completedJobsCounter++;
			if (task.przekazacDoRegeneracji) {
				jobsCounter++;
				completedJobsCounter++;

				if (task.weryfikacjaPoRegeneracji === "Dobre") {
					jobsCounter++;
					completedJobsCounter++;
					if (task.pdmonm3) {
						jobsCounter++;
						completedJobsCounter++;
					} else {
						jobsCounter++;
					}
				} else if (task.weryfikacjaPoRegeneracji === "Zle") {
					jobsCounter++;
					completedJobsCounter++;
					if (task.reklamacja) {
						jobsCounter++;
						completedJobsCounter++;
					} else {
						jobsCounter++;
					}
				} else {
				}
			} else {
				jobsCounter = jobsCounter + 3;
			}
		} else {
			jobsCounter = jobsCounter + 4;
		}

		if (task.weryfikacjaLozysk === "Dobre") {
			jobsCounter++;
			completedJobsCounter++;
			if (task.pdmonm4) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
		} else if (task.weryfikacjaLozysk === "Zle") {
			jobsCounter++;
			completedJobsCounter++;
			if (task.wymienicLozyska) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
			if (task.pdmonm5) {
				jobsCounter++;
				completedJobsCounter++;
			} else {
				jobsCounter++;
			}
		} else {
			jobsCounter = jobsCounter + 3;
		}

		if (task.kontrolaJakosci) {
			jobsCounter++;
			completedJobsCounter++;
		} else {
			jobsCounter++;
		}

		if (task.montazLozysk) {
			jobsCounter++;
			completedJobsCounter++;
		} else {
			jobsCounter++;
		}

		if (task.montazMaznic) {
			jobsCounter++;
			completedJobsCounter++;
		} else {
			jobsCounter++;
		}

		if (task.malowanie) {
			jobsCounter++;
			completedJobsCounter++;
		} else {
			jobsCounter++;
		}

		if (task.wysylkaDoKlienta) {
			jobsCounter++;
			completedJobsCounter++;
		} else {
			jobsCounter++;
		}

		progression = parseInt((completedJobsCounter / jobsCounter) * 100);
		//parse int converts the result of the calculation of the percentage into an integer
		return progression;
	};
	const handleTaskProgressColor = (task) => {
		var progress = handleTaskProgress(task);
		//executes handleTaskProgress to calculate the percentage completion
		var color = 
			progress < 25 //dependent on the percentage returned by handleTaskProgress different colors are chosen
				? "#f25900"
				: progress < 50
				? "#f28d00"
				: progress < 75
				? "#e6f200"
				: progress < 99
				? "#99f200"
				: "#0cf200";
		return color; //the color is returned for use in the HTML regarding the progress bar
	};
	return (
		<div className="tasks-list">
			{isAdmin && (
				<Link className="log-button-2" to={`/boss-print`}>
						Progress print
				</Link>
			)}
			{isAdmin && <br />}
			{isAdmin && <br />}
			<h2 className="page-title-tasks">Orders List</h2>
			<div className="task-preview-head">
			{/*a title row above all the outputted orders so that we may know what the data represent */}
				<div className="task-preview-inner row">
					<div className="task-preview-section col-lg-1">
						<h3>ID</h3>
					</div>
					<div className="task-preview-section col-lg-2">
						<h3>Order Number</h3>
					</div>
					<div className="task-preview-section col-lg-2">
						<h3>Client Name</h3>
					</div>
					<div className="task-preview-section col-lg-2">
						<h3>Title</h3>
					</div>
					<div className="task-preview-section col-lg-1">
						<h3>Last modified</h3>
					</div>
					<div className="task-preview-section col-lg-2">
						<h3>Progress</h3>
					</div>
					<div className="task-preview-section col-lg-1">
						<h3>Notifications</h3>
					</div>
				</div>
			</div>
			{tasks.map((task) => ( //looping through the tasks objects fetched in the tasks component (extract 21)
				((task.wysylkaDoKlienta === false) && (availableTasks.includes(task.id))) && //display the data regarding an order only if it has no yet been completed
				(<div className="task-preview" key={task.id}>
					<Link className="task-preview-inner row" to={`/tasks/${task.id}`}>
						<div className="task-preview-section col-lg-1">
							<h2>{task.id}</h2>
						</div>
						<div className="task-preview-section col-lg-2">{task.orderNumber}</div>
						<div className="task-preview-section col-lg-2">{task.clientName}</div>
						<div className="task-preview-section col-lg-2">{task.title}</div>
						<div className="task-preview-section col-lg-1">{task.lastModifiedDate}</div>
						<div className="task-preview-section col-lg-2">
						{/*the above divs create a row with data regarding the order */}
							<ProgressBar
								className="progress-bar"
								completed={handleTaskProgress(task)} //the handling of the amount to which the bar is filled
								bgColor={handleTaskProgressColor(task)} //to handle the color of the bar we call the handleTaskProgressColor function
								barContainerClassName="bar-container"
								//display a progress bar using the handleTaskProgress function
							/>
						</div>
						<div className="task-preview-section col-lg-1">{handleDelayNotification(task)}</div>
						{/*checking for delays using handleDelayNotification function*/}
					</Link>
				</div>)
			))}
			{isAdmin=="Admin" && (<div className="row no-margin">
				<div className="col-lg-12">
			{/*the className from react library allows the easy layering of multiple divs in a single row*/}
					<div className="task-preview">
						<Link className="task-preview-inner row" to="/tasks/create">
						{/*The link routes us to the Create component*/}
							<div className="task-preview-section col-lg-12 create-new-task">
								<FontAwesomeIcon icon={faPlusCircle} className="icon-create" />
								<h2>Create New Order</h2> 
							</div>
						</Link>
					</div>
				</div>
			</div>)}
		</div>
	);
};

export default TasksList;