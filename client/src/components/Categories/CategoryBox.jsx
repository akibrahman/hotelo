import qs from "query-string";
import { useNavigate, useSearchParams } from "react-router-dom";

const CategoryBox = ({ label, icon: Icon, selected }) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const handleClick = () => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
      const finalQuery = { ...currentQuery, category: label };
      const url = qs.stringifyUrl({
        url: "/",
        query: finalQuery,
      });
      navigate(url);
    }
  };
  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 ${
        selected ? "border-[#F43F5E]" : ""
      } hover:text-neutral-800 transition cursor-pointer`}
    >
      <Icon size={26} />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
};

export default CategoryBox;
