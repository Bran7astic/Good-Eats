import "../App.css";

export default function RecipeRow({ image, name, calories, protein }) {
  return (
    <tr>
      <td>
        <div style={{height: "10em", width: "10em"}}>
          <img className="recipeImage" src={image} />
        </div>
      </td>
      <td>
        <p>{name}</p>
      </td>
      <td>{calories} kcal</td>
      <td>{protein}g</td>
    </tr>
  );
}
