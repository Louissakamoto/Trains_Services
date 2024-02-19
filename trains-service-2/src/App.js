import "./App.css";
import "./Burger.css";
//Importing the CSS style sheets to be used on the entire app
import "bootstrap/dist/css/bootstrap-grid.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Importing necessary modules from the ReactDOM
import Home from "./Home";
import Navbar from "./Navbar";
import Tasks from "./Tasks";
import Task from "./Task";
import Create from "./Create";
import Admin from "./Admin";
import CreateUser from "./CreateUser";
import User from "./User";
import UserPanel from "./UserPanel";
import History from "./History";
import TaskFinished from "./TaskFinished";
import PrintPreview from "./PrintPreview";
import BossPrintPreview from "./BossPrintPreview";
import { useEffect } from "react"; //importing all the java script files to route to

function App() {
	useEffect(() => {
		document.title = "ASCO RAIL";
	}, []); //setting a name for the document object
	return (
		<Router>
			<div className="App">
				<div className="header">
					<Navbar /> 
					{/*Creation of a navigation bar div, that uses the Navbar element*/}
				</div>
				<div className="content">
					<Routes>
						<Route path="*" element={<Home />} />
						<Route path="/tasks" element={<Tasks />} />
						<Route path="/admin" element={<Admin />} />
						<Route path="admin/create-user" element={<CreateUser />} />
						<Route path="/admin/:id" element={<User />} />
						<Route path="/tasks/:id" element={<Task />} />
						<Route path="/tasks/create" element={<Create />} />
						<Route path="/user" element={<UserPanel />}/>
						<Route path="/History" element={<History />} />
						<Route path="/finished/:id" element={<TaskFinished />} />
						<Route path="/print/:id" element={<PrintPreview />} />
						<Route path="/boss-print" element={<BossPrintPreview/>} />
						{/*Creating links that routes the user to the specified elements*/}
					</Routes>
				</div>
				<div className="footer"></div>
			</div>
		</Router>
	);
}

export default App;