import { useEffect, useState } from "react";
import RecipeCard from "./RecipeRow";
import RecipeRow from "./RecipeRow";

export default function RecipeContainer({ token }) {
  const [searchInput, setSearchInput] = useState("");
  const [debounceValue, setDebounceValue] = useState("");
  const [dataList, setDataList] = useState([]);

  // Makes API call when user searches once again
  useEffect(() => {
    const getRecipes = async () => {
      try {
        const results = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${token}&query=${debounceValue}&number=10`
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
  useEffect(() => {
    console.log("Search Input:", searchInput);
    console.log("Debounce value:", debounceValue);
  }, [searchInput, debounceValue]);


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
        placeholder="Search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <table className="dataTable">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Calories</th>
          </tr>
        </thead>

        <tbody>
          {dataList.map((item) => (
            <RecipeRow image={item.image} name={item.title} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
