import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { InfinitySpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf"; //Import necessary modules

const PrintPreview = () => {
	const { id } = useParams();
	const { data: task, error, isPending } = useFetch("http://localhost:8000/tasks/" + id);
	const printDocument = () => {
		const input = document.getElementById("divToPrint");
		//we get the element with the given id from the displayed HTML
		html2canvas(input, { scale: 1 }).then((canvas) => {
		//html2canvas captures the content of the element we have specified
			var imgData = new Image();
			//Create a new Image element
			imgData.src = canvas.toDataURL("/print.png");
			//Set the source of the Image element to the data URL of the canvas with a specific format ("/print.png")
			const pdf = new jsPDF();
			//Create a new jsPDF instance
			pdf.addImage(imgData, "png", 0, 0);
			//Add the captured image to the PDF at coordinates (0, 0) with "png" format
			pdf.save("task.pdf");
			//Save the generated PDF with the name "task.pdf"
		});
	};

	return (
		<div className="content-container">
			{task && (
				<div className="print-preview">
					<div className="print-row">
						<br />
						<button className="log-button" onClick={printDocument}>
							Print
						</button>
						<br />
					</div>
					<div id="divToPrint" className="print-preview-inner "> {/*give a unique id to track what to tranform into pdf*/}
						<div className="row print-row no-margin">
							<div className="col-lg-5">
								<h2>Numer Zamowienia</h2>
							</div>
							<div className="col-lg-5">
								<h2 className="print-data">{task.orderNumber}</h2>
							</div>
						</div>
						<div className="row print-row no-margin">
							<div className="col-lg-5">
								<h2>Klient</h2>
							</div>
							<div className="col-lg-5">
								<h2 className="print-data">{task.clientName}</h2>
							</div>
						</div>
						<div className="row print-row no-margin">
							<div className="col-lg-5">
								<h2>Tytul Zamowienia</h2>
							</div>
							<div className="col-lg-5">
								<h2 className="print-data">{task.title}</h2>
							</div>
						</div>
						<div className="gap-1"></div>
						<div className="row print-row-1 no-margin">
							<div className="col-lg-5">
								<h3>Nazwa etapu</h3>
							</div>
							<div className="col-lg-5">
								<h3>Data ukonczenia</h3>
							</div>
						</div> {/*Above divs display the basic data regarding the order, name, client, etc.*/}
						{task.wjazdZestawu && <div className="row print-row-1 no-margin"> {/*the given task is displayed only if the task has been completed,
					    meaning the Boolean variable regarding it is set true*/}
							<div className="col-lg-5">
								<p className="print-data">Wjazd Zestawu</p> {/*display name of task*/}
							</div>
							<div className="col-lg-5">
								<p className="print-data">{task.wjazdZestawulmd}</p> {/*display last modified date of the task*/}
							</div>
						</div>}
						{/*The rest isn't displayed as it is very long, while it repeats the same format as the div above, but with different boolean variables */}
                        {task.demontazMaznic && <div className="row print-row-1 no-margin">
							<div className="col-lg-5">
								<p className="print-data">Demontaz Maznic</p>
							</div>
							<div className="col-lg-5">
								<p className="print-data">{task.demontazMazniclmd}</p>
							</div>
						</div>}
                        {task.demontazLozysk && <div className="row print-row-1 no-margin">
							<div className="col-lg-5">
								<p className="print-data">Demontaz Lozysk</p>
							</div>
							<div className="col-lg-5">
								<p className="print-data">{task.demontazLozysklmd}</p>
							</div>
						</div>}
                        {task.czyszczenieZestawu && <div className="row print-row-1 no-margin">
							<div className="col-lg-5">
								<p className="print-data">Czyszczenie Zestawu</p>
							</div>
							<div className="col-lg-5">
								<p className="print-data">{task.czyszczenieZestawulmd}</p>
							</div>
						</div>}
                        {task.czyszczenieMaznic && <div className="row print-row-1 no-margin">
							<div className="col-lg-5">
								<p className="print-data">Czyszcenie Maznic</p>
							</div>
							<div className="col-lg-5">
								<p className="print-data">{task.czyszczenieMazniclmd}</p>
							</div>
						</div>}
                        {task.czyszczenieLozysk && <div className="row print-row-1 no-margin">
							<div className="col-lg-5">
								<p className="print-data">Czyszcenie Lozysk</p>
							</div>
							<div className="col-lg-5">
								<p className="print-data">{task.czyszczenieLozysklmd}</p>
							</div>
						</div>}
                        {(task.kolaBose !== "-") && <div className="row print-row-1 no-margin">
							<div className="col-lg-5">
								<p className="print-data">Sprawdzenie Stanu Kol Bosych</p>
							</div>
							<div className="col-lg-5">
								<p className="print-data">{task.kolaBoselmd}</p>
							</div>
						</div>}
                        {(task.os !== "-") && <div className="row print-row-1 no-margin">
							<div className="col-lg-5">
								<p className="print-data">Sprawdzenie Stanu Osi</p>
							</div>
							<div className="col-lg-5">
								<p className="print-data">{task.oslmd}</p>
							</div>
						</div>}
                        {(task.koloZebate !== "-") && <div className="row print-row-1 no-margin">
							<div className="col-lg-5">
								<p className="print-data">Sprawdzenie Stanu Kola Zebatego</p>
							</div>
							<div className="col-lg-5">
								<p className="print-data">{task.koloZebatelmd}</p>
							</div>
						</div>}
                        {task.opdmm1 && <div className="row print-row-1 no-margin">
							<div className="col-lg-5">
								<p className="print-data">Oczyscic i Namalowac Kola Bose</p>
							</div>
							<div className="col-lg-5">
								<p className="print-data">{task.opdmm1lmd}</p>
							</div>
						</div>}
                        {task.rzk1 && <div className="row print-row-1 no-margin">
							<div className="col-lg-5">
								<p className="print-data">Rozprasowanie Zestawu Kolowego</p>
							</div>
							<div className="col-lg-5">
								<p className="print-data">{task.rzk1lmd}</p>
							</div>
						</div>}
                        {task.wymienicKolaBose && <div className="row print-row-1 no-margin">
							<div className="col-lg-5">
								<p className="print-data">Wymiana Kol Bosych</p>
							</div>
							<div className="col-lg-5">
								<p className="print-data">{task.wymienicKolaBoselmd}</p>
							</div>
						</div>}
                        {task.zzk1 && <div className="row print-row-1 no-margin">
							<div className="col-lg-5">
								<p className="print-data">Zaprasowac Zestaw Kolowy</p>
							</div>
							<div className="col-lg-5">
								<p className="print-data">{task.zzk1lmd}</p>
							</div>
						</div>}
						{task.opdmm2 && <div className="row print-row-1 no-margin">
							<div className="col-lg-5">
								<p className="print-data">Oczyscic, przygotowac, pomalowac</p>
							</div>
							<div className="col-lg-5">
								<p className="print-data">{task.opdmm2lmd}</p>
							</div>
						</div>}
						{task.rzk2 && <div className="row print-row-1 no-margin">
							<div className="col-lg-5">
								<p className="print-data">Rozkrecic zestaw kolowy</p>
							</div>
							<div className="col-lg-5">
								<p className="print-data">{task.rzk2lmd}</p>
							</div>
						</div>}
						{task.wymienicOs && <div className="row print-row-1 no-margin">
							<div className="col-lg-5">
								<p className="print-data">Wymienic osk</p>
							</div>
							<div className="col-lg-5">
								<p className="print-data">{task.wymienicOslmd}</p>
							</div>
						</div>}
						{task.zzk2 && (
							<div className="row print-row-1 no-margin">
								<div className="col-lg-5">
									<p className="print-data">Zaprasowac Zestaw Kolowy</p>
								</div>
								<div className="col-lg-5">
									<p className="print-data">{task.zzk2lmd}</p>
								</div>
							</div>
						)}
						{task.oczyscic && (
							<div className="row print-row-1 no-margin">
								<div className="col-lg-5">
									<p className="print-data">Oczyscic</p>
								</div>
								<div className="col-lg-5">
									<p className="print-data">{task.oczysciclmd}</p>
								</div>
							</div>
						)}
						{task.rzk3 && (
							<div className="row print-row-1 no-margin">
								<div className="col-lg-5">
									<p className="print-data">Rozkrecic zestaw kolowy</p>
								</div>
								<div className="col-lg-5">
									<p className="print-data">{task.rzk3lmd}</p>
								</div>
							</div>
						)}
						{task.wymienicKoloZebate && (
							<div className="row print-row-1 no-margin">
								<div className="col-lg-5">
									<p className="print-data">Wymienic kolo zebate</p>
								</div>
								<div className="col-lg-5">
									<p className="print-data">{task.wymienicKoloZebatelmd}</p>
								</div>
							</div>
						)}
						{task.zzk3 && (
							<div className="row print-row-1 no-margin">
								<div className="col-lg-5">
									<p className="print-data">Zaprasowac zestaw kolowy</p>
								</div>
								<div className="col-lg-5">
									<p className="print-data">{task.zzk3lmd}</p>
								</div>
							</div>
						)}
						{task.toczycObrecze && (
							<div className="row print-row-1 no-margin">
								<div className="col-lg-5">
									<p className="print-data">Toczyc obrecze</p>
								</div>
								<div className="col-lg-5">
									<p className="print-data">{task.toczycObreczelmd}</p>
								</div>
							</div>
						)}
						{(task.weryfikacjaLozysk !== "-") && (
							<div className="row print-row-1 no-margin">
								<div className="col-lg-5">
									<p className="print-data">Weryfikacja Lozysk</p>
								</div>
								<div className="col-lg-5">
									<p className="print-data">{task.weryfikacjaLozysklmd}</p>
								</div>
							</div>
						)}
						{task.pdmonm4 && (
							<div className="row print-row-1 no-margin">
								<div className="col-lg-5">
									<p className="print-data">Przygotowac, odstawic na magazyn</p>
								</div>
								<div className="col-lg-5">
									<p className="print-data">{task.pdmonm4lmd}</p>
								</div>
							</div>
						)}
						{task.wymienicLozyska && (
							<div className="row print-row-1 no-margin">
								<div className="col-lg-5">
									<p className="print-data">Wymienic Lozyska</p>
								</div>
								<div className="col-lg-5">
									<p className="print-data">{task.wymienicLozyskalmd}</p>
								</div>
							</div>
						)}
						{task.pdmonm5 && (
							<div className="row print-row-1 no-margin">
								<div className="col-lg-5">
									<p className="print-data">Przygotowac, odstawic na magazyn</p>
								</div>
								<div className="col-lg-5">
									<p className="print-data">{task.pdmonm5lmd}</p>
								</div>
							</div>
						)}
						{(task.weryfikacjaMaznic !== "-") && (
							<div className="row print-row-1 no-margin">
								<div className="col-lg-5">
									<p className="print-data">Weryfikacja Maznic</p>
								</div>
								<div className="col-lg-5">
									<p className="print-data">{task.weryfikacjaMazniclmd}</p>
								</div>
							</div>
						)}
						{task.pdmonm1 && (
							<div className="row print-row-1 no-margin">
								<div className="col-lg-5">
									<p className="print-data">Przygotowac, odstawic na magazyn</p>
								</div>
								<div className="col-lg-5">
									<p className="print-data">{task.pdmonm1lmd}</p>
								</div>
							</div>
						)}
						{task.wymienicMaznice && (
							<div className="row print-row-1 no-margin">
								<div className="col-lg-5">
									<p className="print-data">Wymienic Maznice</p>
								</div>
								<div className="col-lg-5">
									<p className="print-data">{task.wymienicMaznicelmd}</p>
								</div>
							</div>
						)}
						{task.pdmonm2 && (
							<div className="row print-row-1 no-margin">
								<div className="col-lg-5">
									<p className="print-data">Przygotowac, odstawic na magazyn</p>
								</div>
								<div className="col-lg-5">
									<p className="print-data">{task.pdmonm2lmd}</p>
								</div>
							</div>
						)}
						{task.przekazacDoRegeneracji && (
							<div className="row print-row-1 no-margin">
								<div className="col-lg-5">
									<p className="print-data">Przekazac do regeneracji</p>
								</div>
								<div className="col-lg-5">
									<p className="print-data">{task.przekazacDoRegeneracjilmd}</p>
								</div>
							</div>
						)}
						{(task.weryfikacjaPoRegeneracji !== "-") && (
							<div className="row print-row-1 no-margin">
								<div className="col-lg-5">
									<p className="print-data">Weryfikacja po regeneracji</p>
								</div>
								<div className="col-lg-5">
									<p className="print-data">{task.weryfikacjaPoRegeneracjilmd}</p>
								</div>
							</div>
						)}
						{task.pdmonm3 && (
							<div className="row print-row-1 no-margin">
								<div className="col-lg-5">
									<p className="print-data">Przygotowac, odstawic na magazyn</p>
								</div>
								<div className="col-lg-5">
									<p className="print-data">{task.pdmonm3lmd}</p>
								</div>
							</div>
						)}
						{task.reklamacja && (
							<div className="row print-row-1 no-margin">
								<div className="col-lg-5">
									<p className="print-data">Reklamacja</p>
								</div>
								<div className="col-lg-5">
									<p className="print-data">{task.reklamacjalmd}</p>
								</div>
							</div>
						)}
						{task.kontrolaJakosci && (
							<div className="row print-row-1 no-margin">
								<div className="col-lg-5">
									<p className="print-data">Kontrola Jakosci</p>
								</div>
								<div className="col-lg-5">
									<p className="print-data">{task.kontrolaJakoscilmd}</p>
								</div>
							</div>
						)}
						{task.montazLozysk && (
							<div className="row print-row-1 no-margin">
								<div className="col-lg-5">
									<p className="print-data">Montaz Lozysk</p>
								</div>
								<div className="col-lg-5">
									<p className="print-data">{task.montazLozysklmd}</p>
								</div>
							</div>
						)}
						{task.montazMaznic && (
							<div className="row print-row-1 no-margin">
								<div className="col-lg-5">
									<p className="print-data">Montaz Maznic</p>
								</div>
								<div className="col-lg-5">
									<p className="print-data">{task.montazMazniclmd}</p>
								</div>
							</div>
						)}
						{task.malowanie && (
							<div className="row print-row-1 no-margin">
								<div className="col-lg-5">
									<p className="print-data">Malowanie</p>
								</div>
								<div className="col-lg-5">
									<p className="print-data">{task.malowanielmd}</p>
								</div>
							</div>
						)}
						{task.wysylkaDoKlienta && (
							<div className="row print-row-1 no-margin">
								<div className="col-lg-5">
									<p className="print-data">Wysylka do klienta</p>
								</div>
								<div className="col-lg-5">
									<p className="print-data">{task.wysylkaDoKlientalmd}</p>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default PrintPreview;