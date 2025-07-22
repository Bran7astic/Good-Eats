import { BarChart, PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";

export default function Chart({ data }) {
  const [recipes, setRecipes] = useState([]);
  const [calorieData, setCalorieData] = useState([]);
  const [categoryData, setCategoryData] = useState({})

  const sample = {
    vegan: 0,
    vegetarian: 0,
    veryHealthy: 0,
    glutenFree: 0,
    cheap: 0
  }

  useEffect(() => {
    const titles = data?.reduce(
      (accumulator, currentValue) => [...accumulator, currentValue.title],
      []
    );

    const calories = data?.reduce(
      (accumulator, currentValue) => [
        ...accumulator,
        currentValue.nutrition.nutrients[0].amount,
      ],
      []
    );

    const categories = data?.reduce(
      (accumulator, currentValue) => {
        accumulator.vegan += currentValue.vegan;
        accumulator.vegetarian += currentValue.vegetarian
        accumulator.veryHealthy += currentValue.veryHealthy
        accumulator.glutenFree += currentValue.glutenFree
        accumulator.cheap += currentValue.cheap
        
        return accumulator
      },
      sample
    )

    setRecipes(titles);
    setCalorieData(calories);
    setCategoryData(categories)
  }, [data]);

    useEffect(() => {
      console.log("Categories:", categoryData);
    }, [categoryData]);

  return (
    <div>
      {data?.length > 0 && (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BarChart
            layout="horizontal"
            yAxis={[{ data: recipes, categoryGapRatio: 0.4 }]}
            series={[{ data: calorieData, label: "Calories" }]}
            color="#FFFFFF"
            colors={["#9d9dff"]}
            height={400}
          />

          <PieChart
          colors={["#9d9dff", "#b9b9ffff", "#ccccffff", "#d8d8f9ff", "#7070b9"]}
            series={[
              {
                // data: [
                //   { id: 0, value: 10, label: "series A" },
                //   { id: 1, value: 15, label: "series B" },
                //   { id: 2, value: 20, label: "series C" },
                // ],
                data: Object.entries(categoryData).map((item, idx) => (
                  { id: idx, value: item[1], label: item[0] }
                ))
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
