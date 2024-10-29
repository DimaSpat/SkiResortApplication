const passesData = {
    daypass: {
        name: '1 Day',
        description: 'Perfect for a whole day of skiing',
        price: 80,
        items: ['1 Entier day ski pass']
    },
    nightpass: {
        name: 'Ski night',
        description: 'Have fun in a night skiing experience in our lighten trails',
        price: 45,
        items: ['After 5pm to closing', 'One night', '20% Discount on apres-ski']
    },
    seasonpass: {
        name: 'Season pass',
        description: 'A pass for an entier season from 9am to 9pm',
        price: 400,
        items: ['All season pass', '20% Discount on everything', '3 Days of free ski pass for a friend']
    },
    backcountrypass: {
        name: 'Back country access',
        description: 'A pass to be able to access the back country to explore and have fun and also get access to some very hard terrain',
        price: 25,
        items: ['Access the back country region', 'Open while there is sun light', 'Works with daily and season pass']
    },
    terrainpass: {
        name: 'Terrain park access',
        description: 'Access the terrain park contain modules ranging from beginners to experts and with sizes of modules from XS to XXL',
        price: 25,
        items: ['All season pass', '20% Discount on everything', '3 Days of free ski pass for a friend', 'Works with daily and season pass']
    }
};

export function Passes() {
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
