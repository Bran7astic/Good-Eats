import { useEffect, useState } from "react";
import RecipeCard from "./RecipeRow";
import RecipeRow from "./RecipeRow";

export default function RecipeContainer({ token, dataSetters }) {
  const [searchInput, setSearchInput] = useState("");
  const [debounceValue, setDebounceValue] = useState("");
  const [dataList, setDataList] = useState([]);
  const [filterVal, setFilterVal] = useState(1500);

  // Makes API call when user searches once again

  const filterByCal = (data) => {
    return data.filter(
      (item) => item.nutrition.nutrients[0].amount < filterVal
    );
  };

  useEffect(() => {
    if (debounceValue.trim() === "") {
      setDataList([])
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

  useEffect(() => {
    if (dataList.length === 0) {
      dataSetters.setTotal(0);
      dataSetters.setCalories(0);
      dataSetters.setProtein(0);
    }

    const getAverage = (data, idx) => {
      const sum = data.reduce((total, nextItem) => {
        return total + nextItem.nutrition.nutrients[idx].amount;
      }, 0);

      return data.length > 0 ? (sum / data.length).toFixed(0) : 0;
    };

    const caloriesIdx = 0;
    const proteinIdx = 10;

    const filteredList = filterByCal(dataList)

    dataSetters.setTotal(filteredList.length);
    dataSetters.setCalories(getAverage(filteredList, caloriesIdx));
    dataSetters.setProtein(getAverage(filteredList, proteinIdx));
  }, [dataList, dataSetters, filterByCal]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(searchInput);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchInput]);

  // useEffect(() => {
  //   setDataList(dataList.filter(
  //     item => item.nutrition.nutrients[0].amount < filterVal
  //   ))
  // }, [filterVal, dataList])

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          className="searchBar"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <input
          type="range"
          min={1}
          max={1500}
          value={filterVal}
          onChange={(e) => setFilterVal(e.target.value)}
          step={1}
          id="calorieRange"
        />
        <label for="calorieRange">Max Calories: {filterVal}</label>
        <br></br>
      </div>

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
            {filterByCal(dataList).map((item) => (
              <RecipeRow
                image={item.image}
                name={item.title}
                calories={item.nutrition.nutrients[0].amount}
                protein={item.nutrition.nutrients[10].amount}
                id={item.id}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
