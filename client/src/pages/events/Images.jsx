import { useEffect, useState, useRef } from "react";
import axios from "axios";

export function Images() {
  const [images, setImages] = useState([]);
  const [fullResLoaded, setFullResLoaded] = useState([]);
  const [thumbnailLoaded, setThumbnailLoaded] = useState([]);
  const imageRefs = useRef([]);
  const loadedImages = useRef(new Set());

  const loadFullRes = (id, index) => {
    if (loadedImages.current.has(id)) return;

    loadedImages.current.add(id);
    axios.get(
      `/api/events/images/full/${id}`,
      { responseType: "arraybuffer" }
    ).then(response => {
      const blob = new Blob([response.data], { type: "image/webp" });
      const url = URL.createObjectURL(blob);

      const img = new Image();
      img.src = url
      img.onload = () => {
        setFullResLoaded(prev => {
          const newLoaded = [...prev];
          newLoaded[index] = url;
          return newLoaded;
        });
      };
    }).catch(error => {
      console.error("Error loading full-resolution image: ", error);
    });
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/events/images");

        setImages(response.data);
        setFullResLoaded(new Array(response.data.length).fill(false));
        setThumbnailLoaded(new Array(response.data.length).fill(false));
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    }

    fetchImages();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = entry.target.getAttribute("data-index");
          const id = entry.target.getAttribute("data-id");

          setThumbnailLoaded(prev => {
            const newLoaded = [...prev];
            newLoaded[index] = true;
            return newLoaded;
          });

          if (thumbnailLoaded.every(Boolean)) {
            loadFullRes(id, index);
          }

          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: "100px",
      threshold: 0.1,
    });

    imageRefs.current.forEach((imgRef) => {
      if (imgRef) observer.observe(imgRef);
    });

    return () => {
      observer.disconnect();
    }
  }, [images, thumbnailLoaded]);

  return (
    <div>
      <h2>Uploaded images</h2>
      <div className="grid-test">
        {images.map((image, index) => (
          <div key={image._id} className="blur-load">
            <img
              src={`/api/events/images/thumbnail/${image._id}`}
              alt="Thumbnail"
              ref={el => (imageRefs.current[index] = el)}
              data-id={image._id}
              data-index={index}
              style={{ display: fullResLoaded[index] ? 'none' : 'block' }}
              className="low-res"
            />
            {fullResLoaded[index] &&
              <img src={fullResLoaded[index]} alt="Full resolution" loading="lazy" className="high-res" />
            }
          </div>
        ))}
      </div>
    </div>
  )
}
