import React from "react"
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function Events() {
  const [form, setForm] = React.useState({
    title: "",
    description: "",
  });
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [uploadMessage, setUploadMessage] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [fullResLoaded, setFullResLoaded] = React.useState([]);
  const [thumbnailLoaded, setThumbnailLoaded] = React.useState([]);
  const imageRefs = React.useRef([]);
  const loadedImages = React.useRef(new Set());

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const getEvents = async () => {
    const response = await axios.get("/api/events");
    return response.data;
  }

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`/api/events/delete/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  }

  const { data, isLoading, refetch } = useQuery({ queryKey: ["events"], queryFn: getEvents });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const loadFullRes = (id, index) => {
    if (loadedImages.current.has(id)) return;

    loadedImages.current.add(id);

    axios.get(`/api/events/images/full/${id}`, {
      responseType: "arraybuffer",
    })
  }

  React.useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("/api/events/images");

        setImages(res.data);
        setFullResLoaded(new Array(res.data.length).fill(false));
        setThumbnailLoaded(new Array(res.data.length).fill(false));
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, []);

  React.useEffect(() => {
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
          };

          observer.unobserve(entry.target);
        };
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
    };
  }, [images, thumbnailLoaded]);

  const handleCreate = async () => {
    if (form.title != "" || form.description != "" || selectedFiles != [] || selectedFiles.length) {
      const formData = new FormData();

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("images", selectedFiles[i]);
      }

      try {
        await axios.post(
          "api/events/create",
          { form }
        );
        await axios.post(
          "/api/events/images/create",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" }
          }
        );
        setUploadMessage("Images uploaded successfully!");
        refetch();
        setForm({
          title: "",
          description: "",
        });
        setSelectedFiles([]);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("You need to write something in title and description");
    }
  }

  return (
    <div>
      <h2>Events</h2>
      <h3>Creat an event</h3>
      <form action="" onSubmit={(event) => event.preventDefault()}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" value={form.description} onChange={handleChange}></textarea>
        </div>
        <div>
          <input type="file" accept="image/" onChange={handleFileChange} multiple />
          <p>{uploadMessage}</p>
        </div>
        <input type="submit" value="Create" onClick={handleCreate} />
      </form>
      <h3>Existing events</h3>
      {isLoading ?
        <p>Loading ...</p>
        :
        <>
          {data.length > 0 ?
            data.map((event) => (
              <div key={event._id}>
                <h4>{event.title}</h4>
                <p>{event.description}</p>
                <button onClick={() => deleteEvent(event._id)}>delete</button>
              </div>))
            :
            <p>There isn&apos;t any existing events currently</p>
          }
          {images.length ?
            images.map((image, index) => {
              <div key={image._id} className="blur-load"><img
                src={`/api/images/thumbnail/${image._id}`}
                alt="Thumbnail"
                ref={el => (imageRefs.current[index] = el)}
                data-id={image._id}
                data-index={index}
                style={{ display: fullResLoaded[index] ? 'none' : 'block' }}
                className="low-res"
              /></div>
              {
                fullResLoaded[index] && (
                  <img src={fullResLoaded[index]} alt="Full resolution" className="high-res" />
                )
              }
            })
            :
            <p>There isn&apos;t any existing events currently</p>
          }
        </>
      }
    </div>
  )
}
