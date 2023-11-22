import { useSearchParams } from "react-router-dom";
import Container from "../Shared/Container";
import CategoryBox from "./CategoryBox";
import { categories } from "./categoriesData";

const Categories = () => {
  const [params] = useSearchParams();
  const categoryQuery = params.get("category");
  return (
    <Container>
      <div className="flex items-center justify-between overflow-x-auto">
        {categories.map((category, i) => (
          <CategoryBox
            key={i}
            label={category.label}
            icon={category.icon}
            selected={categoryQuery == category.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
