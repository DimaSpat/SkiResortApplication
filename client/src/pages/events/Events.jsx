import axios from "axios";

import { Event } from "./Event";
import { useQuery } from "@tanstack/react-query";

export function Events() {
  const getEvents = async () => {
    const response = await axios.get("/api/events");
    return response.data;
  }

  const { data, isLoading } = useQuery({ queryKey: ["events"], queryFn: getEvents });

  return (
    <>
      <div className="events">
        {isLoading ?
          <h2>Loading...</h2>
          :
          <>{data.length > 0 ?
            data.map((event) => <Event title={event.title} description={event.description} key={event._id} />)
            :
            <h2>There isn&apos;t any events currently</h2>
          }
          </>
        }

      </div>
    </>
  );
}
