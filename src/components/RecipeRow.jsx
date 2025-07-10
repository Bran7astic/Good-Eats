import "../App.css";

export default function RecipeRow({ image, name }) {
  return (
      <tr>
        <td>
          <img
            className="recipeImage"
            src={image}
          />
        </td>
        <td>
          <p>{name}</p>
        </td>
        <td>
            Hi
        </td>
      </tr>
  );
}
