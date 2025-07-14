import "../App.css";

export default function RecipeRow({ image, name, calories, protein }) {
  return (
    <tr>
      <td>
        <div style={{ height: "10em", width: "10em", alignContent: "center"}}>
          <img className="recipeImage" src={image} />
        </div>
      </td>
      <td>
        <div
          style={{
            display: "flex",
            maxWidth: "15em",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <p>{name}</p>
        </div>
      </td>
      <td>{calories} kcal</td>
      <td>{protein}g</td>
    </tr>
  );
}
