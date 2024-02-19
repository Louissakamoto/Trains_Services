import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useFetch from "./useFetch";
import ReactSwitch from "react-switch";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InfinitySpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Importing all necessary modules

const Tasks = () => {

	const { id } = useParams();
	const nav = useNavigate();
	//creation of a function that allows us to navigate to other pages
	const { data: task, error, isPending } = useFetch("http://localhost:8000/tasks/" + id);
	//fetch data of the given order 
	const [orderNumber, setOrderNumber] = useState("");
	const [clientName, setClientName] = useState("");
	const [title, setTitle] = useState("");
	//setting dynamic variables for the order information which can still be editted 

	const [wjazdZestawu, setWjazdZestawu] = useState(false); //when declaring the variable, all is initially false
	const [wjazdZestawuClasses, setWjazdZestawuClasses] = useState("update-job"); 
	//the first is class is set to update-job as must be accessible if the order is completely new.

	//all the other booleans are first set to false, and the classes set to hidden, 
	//as at first nothing else than the first order sould be visible. Later in the
	//code, the data of the order is fetched from the JSON file, and all the dynamic 
	//variables below are updated to the last state of the checklist.
	const [demontazMaznic, setDemontazMaznic] = useState(false);
	const [demontazMaznicClasses, setDemontazMaznicClasses] = useState("update-job job-hidden"); 

	const [demontazLozysk, setDemontazLozysk] = useState(false);
	const [demontazLozyskClasses, setDemontazLozyskClasses] = useState("update-job job-hidden");

	const [czyszczenieZestawu, setCzyszczenieZestawu] = useState(false);
	const [czyszczenieZestawuClasses, setCzyszczenieZestawuClasses] = useState("update-job job-hidden");

	const [kolaBose, setKolaBose] = useState("-");
	const [kolaBoseClasses, setKolaBoseClasses] = useState("update-job job-hidden");
	const [opdmm1, setOpdmm1] = useState(false);
	const [opdmm1Classes, setOpdmm1Classes] = useState("update-job job-hidden");
	const [rzk1, setRzk1] = useState(false);
	const [rzk1Classes, setRzk1Classes] = useState("update-job job-hidden");
	const [wymienicKolaBose, setWymienicKolaBose] = useState(false);
	const [wymienicKolaBoseClasses, setWymienicKolaBoseClasses] = useState("update-job job-hidden");
	const [zzk1, setZzk1] = useState(false);
	const [zzk1Classes, setZzk1Classes] = useState("update-job job-hidden");

	const [os, setOs] = useState("-");
	const [osClasses, setOsClasses] = useState("update-job job-hidden");
	const [opdmm2, setOpdmm2] = useState(false);
	const [opdmm2Classes, setOpdmm2Classes] = useState("update-job job-hidden");
	const [rzk2, setRzk2] = useState(false);
	const [rzk2Classes, setRzk2Classes] = useState("update-job job-hidden");
	const [wymienicOs, setWymienicOs] = useState(false);
	const [wymienicOsClasses, setWymienicOsClasses] = useState("update-job job-hidden");
	const [zzk2, setZzk2] = useState(false);
	const [zzk2Classes, setZzk2Classes] = useState("update-job job-hidden");

	const [koloZebate, setKoloZebate] = useState("-");
	const [koloZebateClasses, setKoloZebateClasses] = useState("update-job job-hidden");
	const [oczyscic, setOczyscic] = useState(false);
	const [oczyscicClasses, setOczyscicClasses] = useState("update-job job-hidden");
	const [rzk3, setRzk3] = useState(false);
	const [rzk3Classes, setRzk3Classes] = useState("update-job job-hidden");
	const [wymienicKoloZebate, setWymienicKoloZebate] = useState(false);
	const [wymienicKoloZebateClasses, setWymienicKoloZebateClasses] =
		useState("update-job job-hidden");
	const [zzk3, setZzk3] = useState(false);
	const [zzk3Classes, setZzk3Classes] = useState("update-job job-hidden");

	const [toczycObrecze, setToczycObrecze] = useState(false);
	const [toczycObreczeClasses, setToczycObreczeClasses] = useState("update-job job-hidden");

	const [czyszczenieMaznic, setCzyszczenieMaznic] = useState(false);
	const [czyszczenieMaznicClasses, setCzyszczenieMaznicClasses] = useState("update-job job-hidden");
	const [weryfikacjaMaznic, setWeryfikacjaMaznic] = useState("-");
	const [weryfikacjaMaznicClasses, setWeryfikacjaMaznicClasses] = useState("update-job job-hidden");
	const [pdmonm1, setPdmonm1] = useState(false);
	const [pdmonm1Classes, setPdmonm1Classes] = useState("update-job job-hidden");
	const [wymienicMaznice, setWymienicMaznice] = useState(false);
	const [wymienicMazniceClasses, setWymienicMazniceClasses] = useState("update-job job-hidden");
	const [pdmonm2, setPdmonm2] = useState(false);
	const [pdmonm2Classes, setPdmonm2Classes] = useState("update-job job-hidden");
	const [przekazacDoRegeneracji, setPrzekazacDoRegeneracji] = useState(false);
	const [przekazacDoRegeneracjiClasses, setPrzekazacDoRegeneracjiClasses] =
		useState("update-job job-hidden");
	const [weryfikacjaPoRegeneracji, setWeryfikacjaPoRegeneracji] = useState("-");
	const [weryfikacjaPoRegeneracjiClasses, setWeryfikacjaPoRegeneracjiClasses] =
		useState("update-job job-hidden");
	const [pdmonm3, setPdmonm3] = useState(false);
	const [pdmonm3Classes, setPdmonm3Classes] = useState("update-job job-hidden");
	const [reklamacja, setReklamacja] = useState(false);
	const [reklamacjaClasses, setReklamacjaClasses] = useState("update-job job-hidden");

	const [czyszczenieLozysk, setCzyszczenieLozysk] = useState(false);
	const [czyszczenieLozyskClasses, setCzyszczenieLozyskClasses] = useState("update-job job-hidden");
	const [weryfikacjaLozysk, setWeryfikacjaLozysk] = useState("-");
	const [weryfikacjaLozyskClasses, setWeryfikacjaLozyskClasses] = useState("update-job job-hidden");
	const [pdmonm4, setPdmonm4] = useState(false);
	const [pdmonm4Classes, setPdmonm4Classes] = useState("update-job job-hidden");
	const [wymienicLozyska, setWymienicLozyska] = useState(false);
	const [wymienicLozyskaClasses, setWymienicLozyskaClasses] = useState("update-job job-hidden");
	const [pdmonm5, setPdmonm5] = useState(false);
	const [pdmonm5Classes, setPdmonm5Classes] = useState("update-job job-hidden");

	const [kontrolaJakosci, setKontrolaJakosci] = useState(false);
	const [kontrolaJakosciClasses, setKontrolaJakosciClasses] = useState("update-job job-hidden");
	const [montazLozysk, setMontazLozysk] = useState(false);
	const [montazLozyskClasses, setMontazLozyskClasses] = useState("update-job job-hidden");
	const [montazMaznic, setMontazMaznic] = useState(false);
	const [montazMaznicClasses, setMontazMaznicClasses] = useState("update-job job-hidden");
	const [malowanie, setMalowanie] = useState(false);
	const [malowanieClasses, setMalowanieClasses] = useState("update-job job-hidden");
	const [wysylkaDoKlienta, setWysylkaDoKlienta] = useState(false);
	const [wysylkaDoKlientaClasses, setWysylkaDoKlientaClasses] = useState("update-job job-hidden");

	const [branchesClasses, setBranchesClasses] = useState("branch-container branch-hidden");
	const [branches1Classes, setBranches1Classes] = useState("branch-container-inner branch-hidden");

	useEffect(() => {
		if (task) {
			//once the data is imported, the useEffect hook triggers and all the aboAAve state variables declared above are updated to the last state of the checklist.
			setOrderNumber(task.orderNumber);
			setTitle(task.title);
			setClientName(task.clientName);
			setWjazdZestawu(task.wjazdZestawu);
			setDemontazMaznic(task.demontazMaznic);
			setDemontazLozysk(task.demontazLozysk);
			setCzyszczenieZestawu(task.czyszczenieZestawu);
			setCzyszczenieMaznic(task.czyszczenieMaznic);
			setCzyszczenieLozysk(task.czyszczenieLozysk);
			setKolaBose(task.kolaBose);
			setOs(task.os);
			setKoloZebate(task.koloZebate);
			setOpdmm1(task.opdmm1);
			setRzk1(task.rzk1);
			setWymienicKolaBose(task.wymienicKolaBose);
			setZzk1(task.zzk1);
			setOpdmm2(task.opdmm2);
			setRzk2(task.rzk2);
			setWymienicOs(task.wymienicOs);
			setZzk2(task.zzk2);
			setOczyscic(task.oczyscic);
			setRzk3(task.rzk3);
			setWymienicKoloZebate(task.wymienicKoloZebate);
			setZzk3(task.zzk3);
			setToczycObrecze(task.toczycObrecze);
			setWeryfikacjaLozysk(task.weryfikacjaLozysk);
			setPdmonm4(task.pdmonm4);
			setWymienicLozyska(task.wymienicLozyska);
			setPdmonm5(task.pdmonm5);
			setWeryfikacjaMaznic(task.weryfikacjaMaznic);
			setPdmonm1(task.pdmonm1);
			setWymienicMaznice(task.wymienicMaznice);
			setPdmonm2(task.pdmonm2);
			setPrzekazacDoRegeneracji(task.przekazacDoRegeneracji);
			setWeryfikacjaPoRegeneracji(task.weryfikacjaPoRegeneracji);
			setPdmonm3(task.pdmonm3);
			setReklamacja(task.reklamacja);
			setKontrolaJakosci(task.kontrolaJakosci);
			setMontazLozysk(task.montazLozysk);
			setMontazMaznic(task.montazMaznic);
			setMalowanie(task.malowanie);
			setWysylkaDoKlienta(task.wysylkaDoKlienta);
		}
	}, [task]);

	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	const handleCancel = () => {
		nav("/tasks"); //a function that navigates us back to the taskslist
	};

	const handleDelete = () => { //function to delete the order
		fetch("http://localhost:8000/tasks/" + task.id, {
			method: "DELETE", //DELETE funciton deletes the object in the JSON file
		}).then(() => {
			nav("/tasks"); //navigate us back to the tasks list
		});
	};

	//handleProcess checks the state of all the boolean dynamic variables that have been created and updated to the state from the JSON file to correctly assign CSS classes. All of the if statements aren't explained as they all do the same function. Change given classes, dependent on given states of the checklists.
	const handleProcess = () => {
		if (wjazdZestawu) { //if the task is completed
			setDemontazMaznicClasses("update-job"); //set the next tasks CSS class to update-job and make it visible and accessible to the user
		} else { //if the task isn't completed
			setDemontazMaznicClasses("update-job job-hidden"); //set the next tasks CSS class to update-job job-hidden to make it inaccessible
		}

		if (demontazMaznic) {//if the task is complete
			setWjazdZestawuClasses("update-job job-locked"); //set the previous tasks CSS class to update-job job-locked, to keep it visible, but inaccessible
			setDemontazLozyskClasses("update-job"); //set the next tasks CSS class to update-job and make it visible and accessible to the user
		} else { //if the task isn't checked
			setWjazdZestawuClasses("update-job"); //set the previous tasks CSS class to update-job, therefore it is still accessible
			setDemontazLozyskClasses("update-job job-hidden"); //set the next tasks CSS class to update-job job-hidden to keep it hidden
			return;
		}

		if (demontazLozysk) {
			setDemontazMaznicClasses("update-job job-locked"); //once "demontazLozysk is chosen, 3 jobs can be done simultaneoulsy, therefore many more classes than just 2 are updated."
			setCzyszczenieZestawuClasses("update-job");
			setCzyszczenieMaznicClasses("update-job");
			setCzyszczenieLozyskClasses("update-job");
			setBranchesClasses("branch-container");
		} else {
			setDemontazMaznicClasses("update-job");
			setBranchesClasses("branch-container branch-hidden");
			setCzyszczenieZestawuClasses("update-job job-hidden");
			setCzyszczenieMaznicClasses("update-job job-hidden");
			setCzyszczenieLozyskClasses("update-job job-hidden");
			return;
		}

		if (czyszczenieZestawu || czyszczenieMaznic || czyszczenieLozysk) {//as there are many jobs in a single level, if any one of them is checked, the job before them is locked.
			setDemontazLozyskClasses("update-job job-locked");
			setKolaBoseClasses("update-job");
			setOsClasses("update-job");
			setKoloZebateClasses("update-job");
		} else {
			setDemontazLozyskClasses("update-job");
			setKolaBoseClasses("update-job job-hidden");
			setOsClasses("update-job job-hidden");
			setKoloZebateClasses("update-job job-hidden");
		}

		if (czyszczenieZestawu) {
			setBranches1Classes("branch-container-inner"); //the branch-container classes are also similar to the update-job classes to control larger containers with many jobs to be hidden or not
		} else {
			setBranches1Classes("branch-container-inner branch-hidden");
		}

		if (kolaBose !== "-" || os !== "-" || koloZebate !== "-") {
			setCzyszczenieZestawuClasses("update-job job-locked");
		} else {
			setCzyszczenieZestawuClasses("update-job ");
		}

		if (kolaBose === "Dobre") { //if the state of the part is good
			setRzk1Classes("update-job job-hidden"); //set task with shorcut Rzk1 hidden
			setOpdmm1Classes("update-job"); //while setting the task with shortcut Opdmm1 available
			//dependent from the state of the part, different tasks must be completed
			if (opdmm1) {
				setKolaBoseClasses("update-job job-locked");
			} else {
				setKolaBoseClasses("update-job");
			}
		}
		if (kolaBose === "Zle") { //if the state of the part is bad
			setOpdmm1Classes("update-job job-hidden"); //set the task Opdmm1 hidden
			setRzk1Classes("update-job"); //while setting the other task as visible to the user

			if (rzk1) {
				setKolaBoseClasses("update-job job-locked");
				setWymienicKolaBoseClasses("update-job");

				if (wymienicKolaBose) {
					setRzk1Classes("update-job job-locked");
					setZzk1Classes("update-job");

					if (zzk1) {
						setWymienicKolaBoseClasses("update-job job-locked");
					} else {
						setWymienicKolaBoseClasses("update-job");
					}
				} else {
					setZzk1Classes("update-job job-hidden");
					setRzk1Classes("update-job");
				}
			} else {
				setKolaBoseClasses("update-job");
				setWymienicKolaBoseClasses("update-job job-hidden");
			}
		}
		if (kolaBose === "-") {
			setOpdmm1Classes("update-job job-hidden");
			setRzk1Classes("update-job job-hidden");
		}

		if (os === "Dobre") {
			setRzk2Classes("update-job job-hidden");
			setOpdmm2Classes("update-job");

			if (opdmm2) {
				setOsClasses("update-job job-locked");
			} else {
				setOsClasses("update-job");
			}
		}
		if (os === "Zle") {
			setOpdmm2Classes("update-job job-hidden");
			setRzk2Classes("update-job");

			if (rzk2) {
				setOsClasses("update-job job-locked");
				setWymienicOsClasses("update-job");

				if (wymienicOs) {
					setRzk2Classes("update-job job-locked");
					setZzk2Classes("update-job");

					if (zzk2) {
						setWymienicOsClasses("update-job job-locked");
					} else {
						setWymienicOsClasses("update-job");
					}
				} else {
					setZzk2Classes("update-job job-hidden");
					setRzk2Classes("update-job");
				}
			} else {
				setOsClasses("update-job");
				setWymienicOsClasses("update-job job-hidden");
			}
		}
		if (os === "-") {
			setOpdmm2Classes("update-job job-hidden");
			setRzk2Classes("update-job job-hidden");
		}

		if (koloZebate === "Dobre") {
			setRzk3Classes("update-job job-hidden");
			setOczyscicClasses("update-job");

			if (oczyscic) {
				setKoloZebateClasses("update-job job-locked");
			} else {
				setKoloZebateClasses("update-job");
			}
		}
		if (koloZebate === "Zle") {
			setOczyscicClasses("update-job job-hidden");
			setRzk3Classes("update-job");

			if (rzk3) {
				setKoloZebateClasses("update-job job-locked");
				setWymienicKoloZebateClasses("update-job");

				if (wymienicKoloZebate) {
					setRzk3Classes("update-job job-locked");
					setZzk3Classes("update-job");

					if (zzk3) {
						setWymienicKoloZebateClasses("update-job job-locked");
					} else {
						setWymienicKoloZebateClasses("update-job");
					}
				} else {
					setZzk3Classes("update-job job-hidden");
					setRzk3Classes("update-job");
				}
			} else {
				setKoloZebateClasses("update-job");
				setWymienicKoloZebateClasses("update-job job-hidden");
			}
		}
		if (koloZebate === "-") {
			setOczyscicClasses("update-job job-hidden");
			setRzk3Classes("update-job job-hidden");
		}

		if ((opdmm1 || zzk1) && (opdmm2 || zzk2) && (oczyscic || zzk3)) {
			setToczycObreczeClasses("update-job");
		} else {
			setToczycObreczeClasses("update-job job-hidden");
		}

		if (toczycObrecze) {
			if (opdmm1) {
				setOpdmm1Classes("update-job job-locked");
			}
			if (zzk1) {
				setZzk1Classes("update-job job-locked");
			}

			if (opdmm2) {
				setOpdmm2Classes("update-job job-locked");
			}
			if (zzk2) {
				setZzk2Classes("update-job job-locked");
			}

			if (oczyscic) {
				setOczyscicClasses("update-job job-locked");
			}
			if (zzk3) {
				setZzk3Classes("update-job job-locked");
			}
		} else {
			if (opdmm1) {
				setOpdmm1Classes("update-job");
			}
			if (zzk1) {
				setZzk1Classes("update-job");
			}

			if (opdmm2) {
				setOpdmm2Classes("update-job");
			}
			if (zzk2) {
				setZzk2Classes("update-job");
			}

			if (oczyscic) {
				setOczyscicClasses("update-job");
			}
			if (zzk3) {
				setZzk3Classes("update-job");
			}
		}
		
		if (czyszczenieMaznic) {
			setWeryfikacjaMaznicClasses("update-job");

			if (weryfikacjaMaznic !== "-") {
				setCzyszczenieMaznicClasses("update-job job-locked");
			} else {
				setCzyszczenieMaznicClasses("update-job ");
			}

			if (weryfikacjaMaznic === "Dobre") {
				setWymienicMazniceClasses("update-job job-hidden");
				setPrzekazacDoRegeneracjiClasses("update-job job-hidden");
				setPdmonm1Classes("update-job");

				if (pdmonm1) {
					setWeryfikacjaMaznicClasses("update-job job-locked");
				} else {
					setWeryfikacjaMaznicClasses("update-job");
				}
			}
			if (weryfikacjaMaznic === "Do regeneracji") {
				setWymienicMazniceClasses("update-job job-hidden");
				setPdmonm1Classes("update-job job-hidden");
				setPrzekazacDoRegeneracjiClasses("update-job");

				if (przekazacDoRegeneracji) {
					setWeryfikacjaMaznicClasses("update-job job-locked");
					setWeryfikacjaPoRegeneracjiClasses("update-job");

					if (weryfikacjaPoRegeneracji !== "-") {
						setPrzekazacDoRegeneracjiClasses("update-job job-locked");
					}
					if (weryfikacjaPoRegeneracji === "-") {
						setPdmonm2Classes("update-job job-hidden");
						setReklamacjaClasses("update-job job-hidden");
					}
					if (weryfikacjaPoRegeneracji === "Dobre") {
						setReklamacjaClasses("update-job job-hidden");
						setPdmonm2Classes("update-job");
						if (pdmonm2) {
							setWeryfikacjaPoRegeneracjiClasses("update-job job-locked");
						} else {
							setWeryfikacjaPoRegeneracjiClasses("update-job");
						}
					}
					if (weryfikacjaPoRegeneracji === "Zle") {
						setPdmonm2Classes("update-job job-hidden");
						setReklamacjaClasses("update-job");
						if (reklamacja) {
							setWeryfikacjaPoRegeneracjiClasses("update-job job-locked");
						} else {
							setWeryfikacjaPoRegeneracjiClasses("update-job");
						}
					}
				} else {
					setWeryfikacjaPoRegeneracjiClasses("update-job job-hidden");
					setWeryfikacjaMaznicClasses("update-job");
				}
			}
			if (weryfikacjaMaznic === "Zle") {
				setPdmonm1Classes("update-job job-hidden");
				setPrzekazacDoRegeneracjiClasses("update-job job-hidden");
				setWymienicMazniceClasses("update-job");

				if (wymienicMaznice) {
					setWeryfikacjaMaznicClasses("update-job job-locked");
					setPdmonm3Classes("update-job");

					if (pdmonm3) {
						setWymienicMazniceClasses("update-job job-locked");
					} else {
						setWymienicMazniceClasses("update-job");
					}
				} else {
					setWeryfikacjaMaznicClasses("update-job");
					setPdmonm3Classes("update-job job-hidden");
				}
			}
			if (weryfikacjaMaznic === "-") {
				setPdmonm1Classes("update-job job-hidden");
				setWymienicMazniceClasses("update-job job-hidden");
				setPrzekazacDoRegeneracjiClasses("update-job job-hidden");
			}
		} else {
			setWeryfikacjaMaznicClasses("update-job job-hidden");
		}

		if (czyszczenieLozysk) {
			setWeryfikacjaLozyskClasses("update-job");

			if (weryfikacjaLozysk !== "-") {
				setCzyszczenieLozyskClasses("update-job job-locked");
			} else {
				setCzyszczenieLozyskClasses("update-job ");
			}

			if (weryfikacjaLozysk === "Dobre") {
				setWymienicLozyskaClasses("update-job job-hidden");
				setPdmonm4Classes("update-job");

				if (pdmonm4) {
					setWeryfikacjaLozyskClasses("update-job job-locked");
				} else {
					setWeryfikacjaLozyskClasses("update-job");
				}
			}
			if (weryfikacjaLozysk === "Zle") {
				setPdmonm4Classes("update-job job-hidden");
				setWymienicLozyskaClasses("update-job");

				if (wymienicLozyska) {
					setWeryfikacjaLozyskClasses("update-job job-locked");
					setPdmonm5Classes("update-job");

					if (pdmonm5) {
						setWymienicLozyskaClasses("update-job job-locked");
					} else {
						setWymienicLozyskaClasses("update-job");
					}
				} else {
					setWeryfikacjaLozyskClasses("update-job");
					setPdmonm5Classes("update-job job-hidden");
				}
			}
			if (weryfikacjaLozysk === "-") {
				setPdmonm4Classes("update-job job-hidden");
				setWymienicLozyskaClasses("update-job job-hidden");
			}
		} else {
			setWeryfikacjaLozyskClasses("update-job job-hidden");
		}

		if (toczycObrecze & (pdmonm1 || pdmonm2 || reklamacja || pdmonm3) && (pdmonm4 || pdmonm5)) {
			setKontrolaJakosciClasses("update-job");
		} else {
			setKontrolaJakosciClasses("update-job job-hidden");
		}

		if (kontrolaJakosci) {
			if (toczycObrecze) {
				setToczycObreczeClasses("update-job job-locked");
			}
			if (pdmonm1) {
				setPdmonm1Classes("update-job job-locked");
			}
			if (pdmonm2) {
				setPdmonm2Classes("update-job job-locked");
			}
			if (reklamacja) {
				setReklamacjaClasses("update-job job-locked");
			}
			if (pdmonm3) {
				setPdmonm3Classes("update-job job-locked");
			}
			if (pdmonm4) {
				setPdmonm4Classes("update-job job-locked");
			}
			if (pdmonm5) {
				setPdmonm5Classes("update-job job-locked");
			}
			setMontazLozyskClasses("update-job");
		} else {
			if (toczycObrecze) {
				setToczycObreczeClasses("update-job");
			}
			if (pdmonm1) {
				setPdmonm1Classes("update-job");
			}
			if (pdmonm2) {
				setPdmonm2Classes("update-job");
			}
			if (reklamacja) {
				setReklamacjaClasses("update-job");
			}
			if (pdmonm3) {
				setPdmonm3Classes("update-job");
			}
			if (pdmonm4) {
				setPdmonm4Classes("update-job");
			}
			if (pdmonm5) {
				setPdmonm5Classes("update-job");
			}
			setMontazLozyskClasses("update-job job-hidden");
			return;
		}
		if (montazLozysk) {
			setKontrolaJakosciClasses("update-job job-locked");
			setMontazMaznicClasses("update-job");
		} else {
			setKontrolaJakosciClasses("update-job");
			setMontazMaznicClasses("update-job job-hidden");
			return;
		}
		if (montazMaznic) {
			setMontazLozyskClasses("update-job job-locked");
			setMalowanieClasses("update-job");
		} else {
			setMontazLozyskClasses("update-job");
			setMalowanieClasses("update-job job-hidden");
			return;
		}
		if (malowanie) {
			setMontazMaznicClasses("update-job job-locked");
			setWysylkaDoKlientaClasses("update-job");
		} else {
			setMontazMaznicClasses("update-job");
			setWysylkaDoKlientaClasses("update-job job-hidden");
			return;
		}
		if (wysylkaDoKlienta) {
			setMalowanieClasses("update-job job-locked");
		} else {
			setMalowanieClasses("update-job");
		}
	};

	useEffect(() => {
		handleProcess();
		//a useEffect hook that calls the handleProcess function anytime any box is checked.
	}, [
		task,
		wjazdZestawu,
		demontazMaznic,
		demontazLozysk,
		czyszczenieZestawu,
		czyszczenieMaznic,
		czyszczenieLozysk,
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
		title,
		clientName,
		orderNumber,
	]);

	const handleClick = async (e) => {
		//function that handles the task of updating the data in the JSON file to that on the checklist
		e.preventDefault();
					// Check if task stage has changed while editing
					// If changed => update task lmd to currect datas
					var lmd = new Date().toLocaleDateString();
					if (task.wjazdZestawu !== wjazdZestawu) task.wjazdZestwulmd = lmd;
					if (task.demontazMaznic !== demontazMaznic) task.demontazMazniclmd = lmd;
					if (task.demontazLozysk !== demontazLozysk) task.demontazLozysklmd = lmd;
					if (task.czyszczenieZestawu !== czyszczenieZestawu) task.czyszczenieZestawulmd = lmd;
					if (task.czyszczenieMaznic !== czyszczenieMaznic) task.czyszczenieMazniclmd = lmd;
					if (task.czyszczenieLozysk !== czyszczenieLozysk) task.czyszczenieLozysklmd = lmd;
					if (task.kolaBose !== kolaBose) task.kolaBoselmd = lmd;
					if (task.os !== os) task.oslmd = lmd;
					if (task.koloZebate !== koloZebate) task.koloZebatelmd = lmd;
					if (task.opdmm1 !== opdmm1) task.opdmm1lmd = lmd;
					if (task.rzk1 !== rzk1) task.rzk1lmd = lmd;
					if (task.wymienicKolaBose !== wymienicKolaBose) task.wymienicKolaBoselmd = lmd;
					if (task.zzk1 !== zzk1) task.zzk1lmd = lmd;
					if (task.opdmm2 !== opdmm2) task.opdmm2lmd = lmd;
					if (task.rzk2 !== rzk2) task.rzk2lmd = lmd;
					if (task.wymienicOs !== wymienicOs) task.wymienicOslmd = lmd;
					if (task.zzk2 !== zzk2) task.zzk2lmd = lmd;
					if (task.oczyscic !== oczyscic) task.oczysciclmd = lmd;
					if (task.rzk3 !== rzk3) task.rzk3lmd = lmd;
					if (task.wymienicKoloZebate !== wymienicKoloZebate) task.wymienicKoloZebatelmd = lmd;
					if (task.zzk3 !== zzk3) task.zzk3lmd = lmd;
					if (task.toczycObrecze !== toczycObrecze) task.toczycObreczelmd = lmd;
					if (task.weryfikacjaLozysk !== weryfikacjaLozysk) task.weryfikacjaLozysklmd = lmd;
					if (task.pdmonm4 !== pdmonm4) task.pdmonm4lmd = lmd;
					if (task.wymienicLozyska !== wymienicLozyska) task.wymienicLozyskalmd = lmd;
					if (task.pdmonm5 !== pdmonm5) task.pdmonm5lmd = lmd;
					if (task.weryfikacjaMaznic !== weryfikacjaMaznic) task.weryfikacjaMazniclmd = lmd;
					if (task.pdmonm1 !== pdmonm1) task.pdmonm1lmd = lmd;
					if (task.wymienicMaznice !== wymienicMaznice) task.wymienicMaznicelmd = lmd;
					if (task.pdmonm2 !== pdmonm2) task.pdmonm2lmd = lmd;
					if (task.przekazacDoRegeneracji !== przekazacDoRegeneracji)
						task.przekazacDoRegeneracjilmd = lmd;
					if (task.weryfikacjaPoRegeneracji !== weryfikacjaPoRegeneracji)
						task.weryfikacjaPoRegeneracjilmd = lmd;
					if (task.pdmonm3 !== pdmonm3) task.pdmonm3lmd = lmd;
					if (task.reklamacja !== reklamacja) task.reklamacjalmd = lmd;
					if (task.kontrolaJakosci !== kontrolaJakosci) task.kontrolaJakoscilmd = lmd;
					if (task.montazLozysk !== montazLozysk) task.montazLozysklmd = lmd;
					if (task.montazMaznic !== montazMaznic) task.montazMazniclmd = lmd;
					if (task.malowanie !== malowanie) task.malowanielmd = lmd;
					if (task.wysylkaDoKlienta !== wysylkaDoKlienta) task.wysylkaDoKlientalmd = lmd;

			//setting all the data in the JSON file, to the updated data from the checklist.
			task.title = title;
			task.orderNumber = orderNumber;
			task.clientName = clientName;
			task.wjazdZestawu = wjazdZestawu;
			task.demontazMaznic = demontazMaznic;
			task.demontazLozysk = demontazLozysk;
			task.czyszczenieZestawu = czyszczenieZestawu;
			task.czyszczenieMaznic = czyszczenieMaznic;
			task.czyszczenieLozysk = czyszczenieLozysk;
			task.kolaBose = kolaBose;
			task.os = os;
			task.koloZebate = koloZebate;
			task.opdmm1 = opdmm1;
			task.rzk1 = rzk1;
			task.wymienicKolaBose = wymienicKolaBose;
			task.zzk1 = zzk1;
			task.opdmm2 = opdmm2;
			task.rzk2 = rzk2;
			task.wymienicOs = wymienicOs;
			task.zzk2 = zzk2;
			task.oczyscic = oczyscic;
			task.rzk3 = rzk3;
			task.wymienicKoloZebate = wymienicKoloZebate;
			task.zzk3 = zzk3;
			task.toczycObrecze = toczycObrecze;
			task.weryfikacjaLozysk = weryfikacjaLozysk;
			task.pdmonm4 = pdmonm4;
			task.wymienicLozyska = wymienicLozyska;
			task.pdmonm5 = pdmonm5;
			task.weryfikacjaMaznic = weryfikacjaMaznic;
			task.pdmonm1 = pdmonm1;
			task.wymienicMaznice = wymienicMaznice;
			task.pdmonm2 = pdmonm2;
			task.przekazacDoRegeneracji = przekazacDoRegeneracji;
			task.weryfikacjaPoRegeneracji = weryfikacjaPoRegeneracji;
			task.pdmonm3 = pdmonm3;
			task.reklamacja = reklamacja;
			task.kontrolaJakosci = kontrolaJakosci;
			task.montazLozysk = montazLozysk;
			task.montazMaznic = montazMaznic;
			task.malowanie = malowanie;
			task.wysylkaDoKlienta = wysylkaDoKlienta;

			task.lastModifiedDate = new Date().toLocaleDateString();

			fetch("http://localhost:8000/tasks/" + task.id, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(task),//inputting the data into the JSON file
			}).then(() => {
				nav("/tasks"); //and then navigating us back to the tasks list.
			});
		
	};

	return (
		<div className="content-container">
			<ToastContainer />
			{isPending && (
				<div className="spinner-container">
					<InfinitySpin width="200" color="#29aee7" className="spinner" />
				</div>
			)}
			{error && <div>{error}</div>}
			{task && (
				<div className="create">
				<Link className="log-button-2" to={`/print/${id}`}>
					Print Preview
					{/*create a printout of the checklist*/}
				</Link>
					<h2 className="page-title">Manage Task</h2>
					<form onSubmit={handleClick}>
					{/*below is the data on the order that can be still editted*/}
						<div className="task-title">
							<label>ID:</label>
							<h3>{task.id}</h3>
						</div>
						<div className="task-title">
							<label>Order Number:</label>
							<input
								type="text"
								required
								value={orderNumber}
								onChange={(e) => setOrderNumber(e.target.value)}
							/>
						</div>
						<div className="task-title">
							<label>Client Name:</label>
							<input
								type="text"
								required
								value={clientName}
								onChange={(e) => setClientName(e.target.value)}
							/>
						</div>
						<div className="task-title">
							<label>Title:</label>
							<input
								type="text"
								required
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						{/*Below are examples of a checkbox*/}
						<div className={wjazdZestawuClasses}> {/* the CSS class of the div is dynamic as said before, to control accessibility to it */}
							<div className="job-inner">
								<label>Wjazd Zestawu</label>
								<div className="switch-container">
									<ReactSwitch
										onChange={() => setWjazdZestawu(!wjazdZestawu)} 
										//when the switch is interacted with, the state Boolean variable is set opposite to what it was before
										//if the state was false, when the box is checked, the variable is set to true.
										checked={wjazdZestawu}
										//the box is checked when the variable is true
									/>
								</div>
							</div>
						</div>
						<div className={demontazMaznicClasses}>
							<div className="job-inner">
								<label>Demontaż Maznic</label>
								<div className="switch-container">
									<ReactSwitch
										onChange={() => setDemontazMaznic(!demontazMaznic)}
										checked={demontazMaznic}
									/>
								</div>
							</div>
						</div>
						<div className={demontazLozyskClasses}>
							<div className="job-inner">
								<label>Demontaz Lozysk</label>
								<div className="switch-container">
									<ReactSwitch
										onChange={() => setDemontazLozysk(!demontazLozysk)}
										checked={demontazLozysk}
									/>
								</div>
							</div>
						</div>
						<div className="col">
							<div className={branchesClasses}>
								<div className={czyszczenieZestawuClasses}>
									<div className="job-inner">
										<label>Czyszczenie Zestawu</label>
										<div className="switch-container">
											<ReactSwitch
												onChange={() => setCzyszczenieZestawu(!czyszczenieZestawu)}
												checked={czyszczenieZestawu}
											/>
										</div>
									</div>
								</div>
								<div className={branches1Classes}>
									<div className="col branch-col">
										<h3>Weryfikacja Zestawu Kolowego</h3>
										<div className="row branch-row">
											<div className="col branch-container-1">
												<div className={kolaBoseClasses}>
													<div className="job-inner">
														<label>Kola Bose</label>
														<div className="select-container">
															<select
																value={kolaBose}
																onChange={(e) => setKolaBose(e.target.value)}
															>
																<option value="-">-</option>
																<option value="Dobre">Dobre</option>
																<option value="Zle">Zle</option>
															</select>
														</div>
													</div>
												</div>
												<div className={opdmm1Classes}>
													<div className="job-inner">
														<label>Oczyscic, przygotowac, malowac</label>
														<div className="switch-container">
															<ReactSwitch onChange={() => setOpdmm1(!opdmm1)} checked={opdmm1} />
														</div>
													</div>
												</div>
												<div className={rzk1Classes}>
													<div className="job-inner">
														<label>Rozprasowac zestaw kolowy</label>
														<div className="switch-container">
															<ReactSwitch onChange={() => setRzk1(!rzk1)} checked={rzk1} />
														</div>
													</div>
												</div>
												<div className={wymienicKolaBoseClasses}>
													<div className="job-inner">
														<label>Wyminic kolo bose</label>
														<div className="switch-container">
															<ReactSwitch
																onChange={() => setWymienicKolaBose(!wymienicKolaBose)}
																checked={wymienicKolaBose}
															/>
														</div>
													</div>
												</div>
												<div className={zzk1Classes}>
													<div className="job-inner">
														<label>Zaprasowac zestaw kolowy</label>
														<div className="switch-container">
															<ReactSwitch onChange={() => setZzk1(!zzk1)} checked={zzk1} />
														</div>
													</div>
												</div>
											</div>
											<div className="col branch-container-1">
												<div className={osClasses}>
													<div className="job-inner">
														<label>Oś</label>
														<div className="select-container">
															<select value={os} onChange={(e) => setOs(e.target.value)}>
																<option value="-">-</option>
																<option value="Dobre">Dobre</option>
																<option value="Zle">Zle</option>
															</select>
														</div>
													</div>
												</div>
												<div className={opdmm2Classes}>
													<div className="job-inner">
														<label>Oczyscic, przygotowac, malowac</label>
														<div className="switch-container">
															<ReactSwitch onChange={() => setOpdmm2(!opdmm2)} checked={opdmm2} />
														</div>
													</div>
												</div>
												<div className={rzk2Classes}>
													<div className="job-inner">
														<label>Rozprasowac zestaw kolowy</label>
														<div className="switch-container">
															<ReactSwitch onChange={() => setRzk2(!rzk2)} checked={rzk2} />
														</div>
													</div>
												</div>
												<div className={wymienicOsClasses}>
													<div className="job-inner">
														<label>Wyminic os</label>
														<div className="switch-container">
															<ReactSwitch
																onChange={() => setWymienicOs(!wymienicOs)}
																checked={wymienicOs}
															/>
														</div>
													</div>
												</div>
												<div className={zzk2Classes}>
													<div className="job-inner">
														<label>Zaprasowac zestaw kolowy</label>
														<div className="switch-container">
															<ReactSwitch onChange={() => setZzk2(!zzk2)} checked={zzk2} />
														</div>
													</div>
												</div>
											</div>
											<div className="col branch-container-1">
												<div className={koloZebateClasses}>
													<div className="job-inner">
														<label>Kolo Zebate</label>
														<div className="select-container">
															<select
																value={koloZebate}
																onChange={(e) => setKoloZebate(e.target.value)}
															>
																<option value="-">-</option>
																<option value="Dobre">Dobre</option>
																<option value="Zle">Zle</option>
															</select>
														</div>
													</div>
												</div>
												<div className={oczyscicClasses}>
													<div className="job-inner">
														<label>Oczyscic</label>
														<div className="switch-container">
															<ReactSwitch
																onChange={() => setOczyscic(!oczyscic)}
																checked={oczyscic}
															/>
														</div>
													</div>
												</div>
												<div className={rzk3Classes}>
													<div className="job-inner">
														<label>Rozprasowac zestaw kolowy</label>
														<div className="switch-container">
															<ReactSwitch onChange={() => setRzk3(!rzk3)} checked={rzk3} />
														</div>
													</div>
												</div>
												<div className={wymienicKoloZebateClasses}>
													<div className="job-inner">
														<label>Wyminic kolo zebate</label>
														<div className="switch-container">
															<ReactSwitch
																onChange={() => setWymienicKoloZebate(!wymienicKoloZebate)}
																checked={wymienicKoloZebate}
															/>
														</div>
													</div>
												</div>
												<div className={zzk3Classes}>
													<div className="job-inner">
														<label>Zaprasowac zestaw kolowy</label>
														<div className="switch-container">
															<ReactSwitch onChange={() => setZzk3(!zzk3)} checked={zzk3} />
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className={toczycObreczeClasses + " little-margin-left-right"}>
											<div className="job-inner">
												<label>Toczyc obrecze</label>
												<div className="switch-container">
													<ReactSwitch
														onChange={() => setToczycObrecze(!toczycObrecze)}
														checked={toczycObrecze}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className={branchesClasses}>
								<div className={czyszczenieMaznicClasses}>
									<div className="job-inner">
										<label>Czyszczenie Maznic</label>
										<div className="switch-container">
											<ReactSwitch
												onChange={() => setCzyszczenieMaznic(!czyszczenieMaznic)}
												checked={czyszczenieMaznic}
											/>
										</div>
									</div>
								</div>
								<div className={weryfikacjaMaznicClasses}>
									<div className="job-inner">
										<label>Weryfikacja Maznic</label>
										<div className="select-container">
											<select
												value={weryfikacjaMaznic}
												onChange={(e) => setWeryfikacjaMaznic(e.target.value)}
											>
												<option value="-">-</option>
												<option value="Dobre">Dobre</option>
												<option value="Do regeneracji">Do regeneracji</option>
												<option value="Zle">Zle</option>
											</select>
										</div>
									</div>
								</div>
								<div className={pdmonm1Classes}>
									<div className="job-inner">
										<label>Przygotowac, odstawic na magazyn</label>
										<div className="switch-container">
											<ReactSwitch onChange={() => setPdmonm1(!pdmonm1)} checked={pdmonm1} />
										</div>
									</div>
								</div>

								<div className={przekazacDoRegeneracjiClasses}>
									<div className="job-inner">
										<label>Przekazac do regeneracji</label>
										<div className="switch-container">
											<ReactSwitch
												onChange={() => setPrzekazacDoRegeneracji(!przekazacDoRegeneracji)}
												checked={przekazacDoRegeneracji}
											/>
										</div>
									</div>
								</div>
								<div className={weryfikacjaPoRegeneracjiClasses}>
									<div className="job-inner">
										<label>Weryfikacja po regeneracji</label>
										<div className="select-container">
											<select
												value={weryfikacjaPoRegeneracji}
												onChange={(e) => setWeryfikacjaPoRegeneracji(e.target.value)}
											>
												<option value="-">-</option>
												<option value="Dobre">Dobre</option>
												<option value="Zle">Zle</option>
											</select>
										</div>
									</div>
								</div>
								<div className={pdmonm2Classes}>
									<div className="job-inner">
										<label>Przygotowac, odstawic na magazyn</label>
										<div className="switch-container">
											<ReactSwitch onChange={() => setPdmonm2(!pdmonm2)} checked={pdmonm2} />
										</div>
									</div>
								</div>
								<div className={reklamacjaClasses}>
									<div className="job-inner">
										<label>Reklamacja</label>
										<div className="switch-container">
											<ReactSwitch
												onChange={() => setReklamacja(!reklamacja)}
												checked={reklamacja}
											/>
										</div>
									</div>
								</div>

								<div className={wymienicMazniceClasses}>
									<div className="job-inner">
										<label>Wymienic Maznice</label>
										<div className="switch-container">
											<ReactSwitch
												onChange={() => setWymienicMaznice(!wymienicMaznice)}
												checked={wymienicMaznice}
											/>
										</div>
									</div>
								</div>
								<div className={pdmonm3Classes}>
									<div className="job-inner">
										<label>Przygotowac, odstawic na magazyn</label>
										<div className="switch-container">
											<ReactSwitch onChange={() => setPdmonm3(!pdmonm3)} checked={pdmonm3} />
										</div>
									</div>
								</div>
							</div>
							<div className={branchesClasses}>
								<div className={czyszczenieLozyskClasses}>
									<div className="job-inner">
										<label>Czyszczenie Lozysk</label>
										<div className="switch-container">
											<ReactSwitch
												onChange={() => setCzyszczenieLozysk(!czyszczenieLozysk)}
												checked={czyszczenieLozysk}
											/>
										</div>
									</div>
								</div>
								<div className={weryfikacjaLozyskClasses}>
									<div className="job-inner">
										<label>Weryfikacja Lozysk</label>
										<div className="select-container">
											<select
												value={weryfikacjaLozysk}
												onChange={(e) => setWeryfikacjaLozysk(e.target.value)}
											>
												<option value="-">-</option>
												<option value="Dobre">Dobre</option>
												<option value="Zle">Zle</option>
											</select>
										</div>
									</div>
								</div>
								<div className={pdmonm4Classes}>
									<div className="job-inner">
										<label>Przygotowac, odstawic na magazyn</label>
										<div className="switch-container">
											<ReactSwitch onChange={() => setPdmonm4(!pdmonm4)} checked={pdmonm4} />
										</div>
									</div>
								</div>
								<div className={wymienicLozyskaClasses}>
									<div className="job-inner">
										<label>Wymienic lozyska</label>
										<div className="switch-container">
											<ReactSwitch
												onChange={() => setWymienicLozyska(!wymienicLozyska)}
												checked={wymienicLozyska}
											/>
										</div>
									</div>
								</div>
								<div className={pdmonm5Classes}>
									<div className="job-inner">
										<label>Przygotowac, odstawic na magazyn</label>
										<div className="switch-container">
											<ReactSwitch onChange={() => setPdmonm5(!pdmonm5)} checked={pdmonm5} />
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className={kontrolaJakosciClasses + " little-margin-top"}>
							<div className="job-inner">
								<label>Kontrola Jakosci</label>
								<div className="switch-container">
									<ReactSwitch
										onChange={() => setKontrolaJakosci(!kontrolaJakosci)}
										checked={kontrolaJakosci}
									/>
								</div>
							</div>
						</div>
						<div className={montazLozyskClasses}>
							<div className="job-inner">
								<label>Montaz Lozysk</label>
								<div className="switch-container">
									<ReactSwitch
										onChange={() => setMontazLozysk(!montazLozysk)}
										checked={montazLozysk}
									/>
								</div>
							</div>
						</div>
						<div className={montazMaznicClasses}>
							<div className="job-inner">
								<label>Montaz Maznic</label>
								<div className="switch-container">
									<ReactSwitch
										onChange={() => setMontazMaznic(!montazMaznic)}
										checked={montazMaznic}
									/>
								</div>
							</div>
						</div>
						<div className={malowanieClasses}>
							<div className="job-inner">
								<label>Malowanie</label>
								<div className="switch-container">
									<ReactSwitch onChange={() => setMalowanie(!malowanie)} checked={malowanie} />
								</div>
							</div>
						</div>
						<div className={wysylkaDoKlientaClasses}>
							<div className="job-inner">
								<label>Wysylka do Klienta</label>
								<div className="switch-container">
									<ReactSwitch
										onChange={() => setWysylkaDoKlienta(!wysylkaDoKlienta)}
										checked={wysylkaDoKlienta}
									/>
								</div>
							</div>
						</div>

						<div className="create-buttons-row">
							<button type="button" onClick={() => handleCancel()} className="cancel-task-button">
								Cancel
								{/*a button to cancel and eliminate all changes*/}
							</button>
							<button type="button" onClick={() => handleDelete()} className="delete-task-button">
								Delete
								{/*delete the order*/}
							</button>
							{(!wysylkaDoKlienta) &&  (<button type="sumbit" className="create-task-button">
								Update
								{/*update the order*/}
							</button>)} 
							{(wysylkaDoKlienta) &&  (<button type="sumbit" className="create-task-button">
								Finish
								{/*If the last task is checked, the order can be finish is outputted instead of update.*/}
							</button>)} 
						</div>
					</form>
				</div>
			)}
		</div>
	);
};
export default Tasks;