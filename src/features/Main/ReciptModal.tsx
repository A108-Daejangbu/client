import ReciptContent from "./ReciptContent";
import ReciptImg from "./ReciptImg";

const ReciptModal = () => {
  return (
    <div className="w-[250px] h-[550px] border border-1px">
      <ReciptImg></ReciptImg>
      <ReciptContent></ReciptContent>
    </div>
  );
};

export default ReciptModal;
