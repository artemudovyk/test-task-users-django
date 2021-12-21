import { userDetailUrl } from "../api";

const Button = ({ onClick, text, color = "primary", dataKeyValue }) => {
	return (
		<button onClick={onClick} type="button" className={`btn btn-${color}`} data-key={dataKeyValue}>
			{text}
		</button>
	);
};

export default Button;
