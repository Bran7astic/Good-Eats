import { useEffect, useState } from "react";
import RecipeCard from "./RecipeRow";
import RecipeRow from "./RecipeRow";

export default function RecipeContainer({ token }) {
  const [searchInput, setSearchInput] = useState("");
  const [debounceValue, setDebounceValue] = useState("");
  const [dataList, setDataList] = useState([]);

  // Makes API call when user searches once again
  useEffect(() => {
    if (debounceValue.trim() === "") {
      return;
    }

    const getRecipes = async () => {
      try {
        const results = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${token}&query=${debounceValue}&number=20&addRecipeNutrition=true`
        );
        if (!results.ok) {
          throw new Error("HTTP Error. Status:", results.status);
        }

        const data = await results.json();
        console.log(data.results);
        setDataList(data.results);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    getRecipes();
  }, [token, debounceValue]);

  // Tracks how searchInput and debounceValue change
  // useEffect(() => {
  //   console.log("Search Input:", searchInput);
  //   console.log("Debounce value:", debounceValue);
  // }, [searchInput, debounceValue]);

  // Debounce timer that delays when API call is made
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(searchInput);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchInput]);

  return (
    <div>
      <input
        className="searchBar"
        placeholder="Search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      {debounceValue.trim() === "" ? (
        <h3>Search for a recipe!</h3>
      ) : (
        <table className="dataTable">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Calories</th>
              <th>Protein</th>
            </tr>
          </thead>

          <tbody>
            {dataList.map((item) => (
              <RecipeRow
                image={item.image}
                name={item.title}
                calories={item.nutrition.nutrients[0].amount}
                protein={item.nutrition.nutrients[10].amount}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
