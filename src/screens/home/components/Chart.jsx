import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";

export default function Chart({ data }) {
  const [recipes, setRecipes] = useState([]);
  const [calorieData, setCalorieData] = useState([]);

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

    setRecipes(titles);
    setCalorieData(calories);
  }, [data]);

  useEffect(() => {
    console.log("Calories:", calorieData);
  }, [calorieData]);

  return (
    <div>
      {data.length>0 && (
        <BarChart
          layout="horizontal"
          yAxis={[{ data: recipes, categoryGapRatio: 0.4 }]}
          series={[{ data: calorieData, label: "Calories" }]}
          color="#FFFFFF"
          colors={["#9d9dff"]}
          height={400}
        />
      )}
    </div>
  );
}
