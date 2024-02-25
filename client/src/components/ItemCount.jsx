import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export const ItemCount = ({ count, handleCount }) => {
  return (
    <div>
      <button className="border rounded-lg w-[40px] transition duration-200 hover:scale-110" onClick={() => handleCount("minus")}>
      <FontAwesomeIcon icon={faMinus} className="w-3"/>
      </button>
      <span className="m-3">{count}</span>
      <button className="border w-[40px] rounded-lg transition duration-200 hover:scale-110" onClick={() => handleCount("plus")}>
      <FontAwesomeIcon icon={faPlus} className="w-3"/>
      </button>
    </div>
  );
};
