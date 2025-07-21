import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const token = import.meta.env.VITE_API_KEY;

export default function Details() {
  const [details, setDetails] = useState();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const getDetails = async () => {
      try {
        const results = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${token}`
        );

        if (!results.ok) {
          throw new Error("HTTP Errror. Status:", results.status);
        }

        const data = await results.json();
        console.log(data);
        setDetails(data);
      } catch (err) {
        console.log("Error:", err);
      }
    };

    getDetails();
  }, [id]);

  return (
    <div>
      {details && (
        <div style={{display: "flex", flexDirection: "column", alignItems:"center"}}>
          <h1 style={{ marginBottom: "0em" }}>{details.title}</h1>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "2em" }}
          >
            {details.cuisines.map((item) => (
              <h4>{item}</h4>
            ))}
          </div>
          <img className="recipeImage" src={details.image} />
          <h2>Steps</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%"
            }}
          >
            {details.analyzedInstructions[0].steps.map((item) => (
              <p>
                <b>{item.number}.</b> {item.step}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
