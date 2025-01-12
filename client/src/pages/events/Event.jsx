export function Event({ data }) {
  return (
    <div key={data._id}>
      <div>
        <h2>{data.title}</h2>
        <p>{data.description}</p>
      </div>
      <img
        src={`data:image/webp;base64,${data.webpImage}`}
        alt="ThumbnailImage"
      />
    </div>
  );
} 
