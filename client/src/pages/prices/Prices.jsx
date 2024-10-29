import React from "react";
import { useNavigate } from "react-router-dom";

export function Prices() {
    const navigate = useNavigate();
    const [pageLocation, setPageLocation] = React.useState("");

    const onClickSubPrices = (location) => {
        setPageLocation(location);
        navigate(`/prices/${location}`);
    }

    return (
        <div style={{ display: pageLocation ? 'none' : 'block' }}>
            <h2>Prices</h2>
            <div>
                <div>
                    <h3><a href="/prices/bundles">Bundles</a></h3>
                    <p>There are plenty of bundles for budget, new and explorers.</p>
                    <button onClick={() => onClickSubPrices("bundles")}>Learn more</button>
                </div>
                <div>
                    <h3><a href="/prices/passes">Passes</a></h3>
                    <p>We include passes that range from just a half day ride to an all day everyday ski season pass.</p>
                    <button onClick={() => onClickSubPrices("passes")}>Learn more</button>
                </div>
                <div>
                    <h3><a href="/prices/rentEquipment">Rent Equipment</a></h3>
                    <p>Our rental equipment is made for all ranges of skiing levels. From 0 to Hero.</p>
                    <button onClick={() => onClickSubPrices("rentEquipment")}>Learn more</button>
                </div>
            </div>
        </div>
    );
}