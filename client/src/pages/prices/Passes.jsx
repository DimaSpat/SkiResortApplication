import data from "./prices.json";
import React from "react";
import ItemCard from "./ItemCard.jsx";

export function Passes() {
    const [passesData, setPassesData] = React.useState(data.Passes);

    return (
        <div>
            <h2>Passes</h2>
            <div>
                {passesData.length === 0 ? (
                    <p>There aren&apos;t any existing passes currently.</p>
                ) : (
                    Object.values(passesData).map((bundle) => (
                      <ItemCard bundle={bundle} key={bundle.id || `${bundle.name}-${Math.random()*1000}` } />
                    ))
                )}
            </div>
        </div>
    );
}
