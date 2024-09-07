export function Event({ title, description, key }) {
  return (
    <div key={key}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
} 
