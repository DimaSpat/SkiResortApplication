const bundlesData = {
    budget: {
        id: 1,
        name: 'Budget Bundle',
        description: 'Perfect for beginners on a budget.',
        price: 60,
        items: ['Ski Pass for a night', 'Basic Gear Rental']
    },
    explorer: {
        id: 2,
        name: 'Explorer Bundle',
        description: 'Ideal for those who want to explore new terrains.',
        price: 150,
        items: ['Ski Pass for a day', 'Advanced Gear Rental', 'Back country access']
    },
    pro: {
        id: 3,
        name: 'Pro Bundle',
        description: 'For the seasoned pros looking for the best.',
        price: 300,
        items: ['3 Days of skiing', 'Pro Gear Rental', '3h of private Lessons', 'Option to access one of the regions']
    },
    everything: {
        id: 3,
        name: 'Everything Bundle',
        description: 'Access Everything we offer',
        price: 600,
        items: ['Season Pass', 'Terrain park access', 'Back country access', 'Gear Rental', '3h of private lessons']
    }
};

export function Bundles() {
    return (
        <div>
            <h2>Bundles</h2>
            <div>
                {
                    bundlesData.length === 0 ? (
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
