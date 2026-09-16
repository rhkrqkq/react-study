import { useParams } from "react-router-dom";

const Diary = () => {
	const { id } = useParams();
	console.log(id);

	return <div>Diary 페이지입니다.</div>;
};

export default Diary;
