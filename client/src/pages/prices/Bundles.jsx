import React from "react";
import data from "./prices.json";
import ItemCard from "./ItemCard.jsx";

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
                            <ItemCard bundle={bundle} key={bundle.id || `${bundle.name}-${Math.random()*1000}` } />
                        ))
                    )
                }
            </div>
        </div>
    );
}
