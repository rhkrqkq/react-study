import { useState } from "react";
import FileUpload from "./components/FileUpload";

const App = () => {
	const [created, setCreated] = useState([]);

	return (
		<div>
			<FileUpload />
		</div>
	);
};

export default App;
