import axios from "axios";
import React from "react";

import { Event } from "./Event";
import { useQuery } from "@tanstack/react-query";
import styles from "./Events.module.scss";

import { Images } from "./Images";
import SkiResortNight from "../../assets/SkiResortNight.jpg";

export function Events() {
  const [eventId, setEventId] = React.useState(undefined);

  const getEvents = async () => {
    const response = await axios.get("/api/events");
    return response.data;
  }

  const { data, isLoading } = useQuery({ queryKey: ["events"], queryFn: getEvents });

  return (
    <>
      <div className={styles.container}>
        <h2>The current events</h2>
        {isLoading ?
          <h2>Loading...</h2>
          :
          <>{data.length > 0 ?
            data.map((event) => <Event data={event} />)
            :
            <h2>There isn&apos;t any events currently</h2>
          }
          </>
        }

      </div>
    </>
  );
}
