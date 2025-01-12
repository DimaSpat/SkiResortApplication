import React from "react";
import data from "./prices.json";
import ItemCard from "./ItemCard.jsx";

export function RentEquipment() {
    const [equipementData, setEquipementData] = React.useState(data.rentEquipement);

    return (
        <div>
            <h2>Rent Equipment</h2>
            <div>
                {equipementData.length === 0 ? (
                    <p>There aren&apos;t any existing passes currently.</p>
                ) : (
                    Object.values(equipementData).map((bundle, index) => (
                        <ItemCard bundle={bundle} key={bundle.id || `${bundle.name}-${Math.random()*1000}` } />
                    ))
                )}
            </div>
        </div>
    );
}
