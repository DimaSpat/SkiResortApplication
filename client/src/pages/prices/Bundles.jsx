import React from "react";
import data from "./prices.json";

export function Bundles() {
    const [bundlesData, setBundlesData] = React.useState(data.bundles);

    return (
        <div>
            <h2>Bundles</h2>
            <div>
                {
                    data.length === 0 ? (
                        <p>There aren&apos;t any existing bundles currently.</p>
                    ) : (
                        Object.values(bundlesData).map(bundle => (
                            <div key={bundle.id} style={{ marginBottom: '20px' }}>
                                <h3>{bundle.name}</h3>
                                <p>{bundle.description}</p>
                                <p>Price: {bundle.price}</p>
                                <p>Includes:</p>
                                <ul>
                                    {bundle.items.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                                <button onClick={() => alert(`Added ${bundle.name} to the cart!`)}>Add to Cart</button>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    );
}
