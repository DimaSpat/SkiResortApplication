const equipementData = {
    begginer: {
        name: 'Begginer',
        description: 'Begginer gear for a day',
        price: 50,
        items: ['1 Entier day gear']
    },
    advanced: {
        name: 'Advanced',
        description: 'Advanced gear for a day',
        price: 75,
        items: ['1 Entier day gear']
    },
    expert: {
        name: 'Expert',
        description: 'Expert gear for a day',
        price: 100,
        items: ['1 Entier day gear']
    }
};


export function RentEquipment() {
    return (
        <div>
            <h2>Rent Equipment</h2>
            <div>
                {equipementData.length === 0 ? (
                    <p>There aren&apos;t any existing passes currently.</p>
                ) : (
                    Object.values(equipementData).map((pass, index) => (
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
