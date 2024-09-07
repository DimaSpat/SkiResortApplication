import axios from "axios";

import { Event } from "./Event";
import { useQuery } from "@tanstack/react-query";

export function Events() {
  const getEvents = async () => {
    const response = await axios.get("/api/events");
    return response.data;
  }

  const { data, isLoading, isSuccess } = useQuery({ queryKey: ["events"], queryFn: getEvents });

  // if (isLoading) return <h2>Loading ...</h2>
  // else {
  //   if (data.length > 0) {
  //     return data.map((event) => <Event title={event.title} description={event.description} key={event._id} />);
  //   } else {
  //     return <h2>There isn&apos;t any events happening currently</h2>
  //   }
  // }

  return (
    <>
      <div className="events">
        {isLoading ??
          <h2>Loading events, wait a moment</h2>}{
          isSuccess ??
          <>{
            data.length > 0 ?
              data.map((event) => <Event title={event.title} description={event.description} key={event._id} />)
              :
              <h2>There isn&apos;t any events happening currently</h2>
          }</>
        }
      </div>
    </>
  );
}
