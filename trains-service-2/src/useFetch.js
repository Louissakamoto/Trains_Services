import { useState, useEffect } from "react";
//importing useState and useEffect hooks from the react library.

const useFetch = (url) => {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);
	

	useEffect(() => {
		// Creating an AbortController to handle aborting fetch requests
		const abortCont = new AbortController();

		// Initiating the fetch operation after a timeout
		setTimeout(() => {
			// Fetching data from the provided URL with signal to abort the fetch if needed
			fetch(url, { signal: abortCont.signal })
				.then((res) => {
					if (!res.ok) {
						// error coming back from server
						throw Error("could not fetch the data for that resource");
					}
					return res.json();
						//if no error, parse the resposne
				})
				.then((data) => {
					setIsPending(false);
					setData(data);
					setError(null);
					//if data is fetched properly set the state variables to appropriate states.
				})
				.catch((err) => {
					//handling errors that might occur during the fetching process
					if (err.name === "AbortError") {
						console.log("fetch aborted");
					} else {
						// auto catches network / connection error
						setIsPending(false);
						setError(err.message);
					}
				});
		}, 500);

		// abort the fetch
		return () => abortCont.abort();
	}, [url]);

	return { data, isPending, error };
	//the function returns the fetched data, the data on the pending state of the data and any error occurences
};

export default useFetch;
