import React from "react"
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function Events() {
  const [form, setForm] = React.useState({
    title: "",
    description: "",
  });

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

  const handleCreate = async () => {
    if (form.title != "" && form.description != "") {
      try {
        await axios.post(
          "api/events/create",
          { form }
        );
        refetch();
        setForm({
          title: "",
          description: "",
        })
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
        </>
      }
    </div>
  )
}
