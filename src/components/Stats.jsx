export function StatCard ( {statType, data, value, unit} ) {
    return(
        <div className = "statCard">
            <h3>{statType} {data}:</h3>
            <h4>{value? value : 0} {unit}</h4>
        </div>
    );
}

export default function Stats( {total, calories, protein} ) {
    return (
        <div className="statsContainer">
            <StatCard statType="Total" data="Recipes" value={total}/>
            <StatCard statType="Average" data="Calories" value={calories} unit="kcal"/>
            <StatCard statType="Average" data="Protein" value={protein} unit="g"/>
        </div>
    )
}

