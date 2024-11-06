import data from "./prices.json";
import React from "react";

export function Passes() {
    const [passesData, setPassesData] = React.useState(data.Passes);

    return (
        <div>
            <h2>Passes</h2>
            <div>
                {passesData.length === 0 ? (
                    <p>There aren&apos;t any existing passes currently.</p>
                ) : (
                    Object.values(passesData).map((pass, index) => (
                        <div key={index} style={{ marginBottom: '20px' }}>
                            <h3>{pass.name}</h3>
                            <p>{pass.description}</p>
                            <p>Price: {pass.price}</p>
                            <p>Includes:</p>
                            <ul>
                                {pass.items.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                            <button onClick={() => alert(`Added ${pass.name} to the cart!`)}>Add to Cart</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
