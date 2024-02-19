import { useEffect, useState } from "react"; 
import { useNavigate, Link } from "react-router-dom";
import useFetch from "./useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { InfinitySpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //importing all the neccessary methods from the library

const Create = () => {

	const { error, isPending, data: tasks } = useFetch("http://localhost:8000/tasks"); 
	//calling the useFetch function to gain information on errors and pending state.
	const [maxId, setMaxId] = useState(0);
	//creating a variable maxId, to help generate the id

	//algorithm to generate the id
	useEffect(() => {
		// Checking if 'tasks' is not null or undefined
		if (tasks != null) {
			// Iterating through each 'task' in the 'tasks' array
			tasks.map((task) => {
				// Checking if the current task's ID is greater than 'maxId'
				if (maxId < parseInt(task.id)) {
					 // If so, logging the parsed integer value of the task's ID
					console.log(parseInt(task.id));
					 // Updating 'maxId' by setting it to one more than the current task's ID
					setId(parseInt(task.id) + 1);
				}
			});
		}
	}, [tasks]); // Dependency array indicating that the effect depends on the 'tasks' array
	
	const [id, setId] = useState(0);
	const [orderNumber, setOrderNumber] = useState("");
	const [clientName, setClientName] = useState("");
	const [title, setTitle] = useState("");
	const [lastModifiedDate, setLastModifiedDate] = useState(new Date().toLocaleDateString());
	const [createdDate, setCreatedDate] = useState(new Date().toLocaleDateString());
	//creation of dynamic variables on the created order, including last modified date and creation date 

	const nav = useNavigate();
	//creation of a funciton that allows us to navigate to other pages

	//creation of handleSubmit, a function called when the creation of the order is submitted
	const handleSubmit = (e) => {
		e.preventDefault();
		//prevent default event object behaviour

		//declaration of boolean variables that allow us to create the checklist
		let wjazdZestawu = false;
		let demontazMaznic = false;
		let demontazLozysk = false;
		let czyszczenieZestawu = false;
		let czyszczenieMaznic = false;
		let czyszczenieLozysk = false;
		//some parts of the checklist have multiple options, then they are declared as string
		let kolaBose = "-";
		let os = "-";
		let koloZebate = "-";
		let opdmm1 = false;
		let rzk1 = false;
		let wymienicKolaBose = false;
		let zzk1 = false;
		let opdmm2 = false;
		let rzk2 = false;
		let wymienicOs = false;
		let zzk2 = false;
		let oczyscic = false;
		let rzk3 = false;
		let wymienicKoloZebate = false;
		let zzk3 = false;
		let toczycObrecze = false;
		let weryfikacjaMaznic = "-";
		let pdmonm1 = false;
		let wymienicMaznice = false;
		let pdmonm2 = false;
		let przekazacDoRegeneracji = false;
		let weryfikacjaPoRegeneracji = "-";
		let pdmonm3 = false;
		let reklamacja = false;
		let weryfikacjaLozysk = "-";
		let pdmonm4 = false;
		let wymienicLozyska = false;
		let pdmonm5 = false;
		let kontrolaJakosci = false;
		let montazLozysk = false;
		let montazMaznic = false;
		let malowanie = false;
		let wysylkaDoKlienta = false;

//declaration of the last modified date variables and equating it to the day of creation of the order
		let wjazdZestawulmd = createdDate;
		let demontazMazniclmd = createdDate;
		let demontazLozysklmd = createdDate;
		let czyszczenieZestawulmd = createdDate;
		let czyszczenieMazniclmd = createdDate;
		let czyszczenieLozysklmd = createdDate;
		let kolaBoselmd = createdDate;
		let oslmd = createdDate;
		let koloZebatelmd = createdDate;
		let opdmm1lmd = createdDate;
		let rzk1lmd = createdDate;
		let wymienicKolaBoselmd = createdDate;
		let zzk1lmd = createdDate;
		let opdmm2lmd = createdDate;
		let rzk2lmd = createdDate;
		let wymienicOslmd = createdDate;
		let zzk2lmd = createdDate;
		let oczysciclmd = createdDate;
		let rzk3lmd = createdDate;
		let wymienicKoloZebatelmd = createdDate;
		let zzk3lmd = createdDate;
		let toczycObreczelmd = createdDate;
		let weryfikacjaLozysklmd = createdDate;
		let pdmonm4lmd = createdDate;
		let wymienicLozyskalmd = createdDate;
		let pdmonm5lmd = createdDate;
		let weryfikacjaMazniclmd = createdDate;
		let pdmonm1lmd = createdDate;
		let wymienicMaznicelmd = createdDate;
		let pdmonm2lmd = createdDate;
		let przekazacDoRegeneracjilmd = createdDate;
		let weryfikacjaPoRegeneracjilmd = createdDate;
		let pdmonm3lmd = createdDate;
		let reklamacjalmd = createdDate;
		let kontrolaJakoscilmd = createdDate;
		let montazLozysklmd = createdDate;
		let montazMazniclmd = createdDate;
		let malowanielmd = createdDate;
		let wysylkaDoKlientalmd = createdDate;

//creation of an object containing the variables that can be posted into the JSON file
		const newTask = {
			id,
			orderNumber,
			clientName,
			title,
			wjazdZestawu,
			demontazMaznic,
			demontazLozysk,
			czyszczenieZestawu,
			czyszczenieMaznic,
			czyszczenieLozysk,
			lastModifiedDate,
			kolaBose,
			os,
			koloZebate,
			opdmm1,
			rzk1,
			wymienicKolaBose,
			zzk1,
			opdmm2,
			rzk2,
			wymienicOs,
			zzk2,
			oczyscic,
			rzk3,
			wymienicKoloZebate,
			zzk3,
			toczycObrecze,
			weryfikacjaLozysk,
			pdmonm4,
			wymienicLozyska,
			pdmonm5,
			weryfikacjaMaznic,
			pdmonm1,
			wymienicMaznice,
			pdmonm2,
			przekazacDoRegeneracji,
			weryfikacjaPoRegeneracji,
			pdmonm3,
			reklamacja,
			kontrolaJakosci,
			montazLozysk,
			montazMaznic,
			malowanie,
			wysylkaDoKlienta,
			createdDate,

			wjazdZestawulmd,
			demontazMazniclmd,
			demontazLozysklmd,
			czyszczenieZestawulmd,
			czyszczenieMazniclmd,
			czyszczenieLozysklmd,
			kolaBoselmd,
			oslmd,
			koloZebatelmd,
			opdmm1lmd,
			rzk1lmd,
			wymienicKolaBoselmd,
		
			zzk1lmd,
			opdmm2lmd,
			rzk2lmd,
			wymienicOslmd,
			zzk2lmd,
			oczysciclmd,
			rzk3lmd,
			wymienicKoloZebatelmd,
			zzk3lmd,
			toczycObreczelmd,
			weryfikacjaLozysklmd,
			pdmonm4lmd,
			wymienicLozyskalmd,
			pdmonm5lmd,
			weryfikacjaMazniclmd,
			pdmonm1lmd,
			wymienicMaznicelmd,
			pdmonm2lmd,
			przekazacDoRegeneracjilmd,
			weryfikacjaPoRegeneracjilmd,
			pdmonm3lmd,
			reklamacjalmd,
			kontrolaJakoscilmd,
			montazLozysklmd,
			montazMazniclmd,
			malowanielmd,
			wysylkaDoKlientalmd,
		};

		fetch("http://localhost:8000/tasks/", { //calling the tasks table of the JSON file
			method: "POST", //declaration of using the POST method to input data into the JSON file in
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newTask), //input the object into the file as a string
		}).then(() => {
			nav("/tasks"); // then navigate back to the tasks (list of tasks)
		});
	};
	

	const handleCancel = () => {
		nav("/tasks"); //a function that routes us back to the list of tasks
	};

	return (
		<div className="content-container">
			<ToastContainer />
			{isPending && (
				<div className="spinner-container">
					<InfinitySpin width="200" color="#29aee7" className="spinner" />
					{/*dispaly a spinning wheel when data is being fetched*/}
				</div>
			)}
			{error && <div>{error}</div>}
			{tasks && (
				<div className="create">
					<h2 className="page-title">Create New Task</h2>
					<form onSubmit={handleSubmit}> 
					{/*a delcaration that the form executes handleSubmit when submitted*/}
						<div className="task-title">
							<label>Order ID:</label>
							<h3>{id}</h3> 
							{/*a simple display of the ID*/}
						</div>
						<div className="task-title">
							<label>Order Number:</label>
							<input
								type="text"
								required //the variable is required to be inputted
								value={orderNumber}
								onChange={(e) => setOrderNumber(e.target.value)}
								//sets the state variable into the inputted value
							/>
						</div>
						<div className="task-title">
							<label>Client Name:</label>
							<input
								type="text"
								required //the variable is required to be inputted
								value={clientName}
								onChange={(e) => setClientName(e.target.value)}
								//sets the state variable into the inputted value
							/>
						</div>
						<div className="task-title">
							<label>Title:</label>
							<input
								type="text"
								required //the variable is required to be inputted
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								//sets the state variable into the inputted value
							/>
						</div>
						<div className="create-buttons-row">
							<button type="button" onClick={() => handleCancel()} className="cancel-task-button">
								Cancel
								{/*Cancel the creation of the order, call handleCancle, which navigates us back to the list of tasks*/}
							</button>
							<button type="sumbit" className="create-task-button">
								Create Task
								{/*submit, call handleSubmit*/}
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default Create;