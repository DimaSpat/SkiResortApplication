import React from "react";

import { Events } from "./Events";
import { Auth } from "./Auth";
import styles from "./Admin.module.scss";
import { Accounts } from "./Accounts";
import SkiResortDay from "../../assets/SkiResortDay.webp";
import SkiResortNight from "../../assets/SkiResortNight.jpg";

export function Admin({ theme }) {
  const [login, setLogin] = React.useState(false);

  if (!login) {
    return (<Auth setLogin={setLogin} theme={theme} />);
  }

  return (
    <div className={styles.admin} style={{
      backgroundImage: `url(${theme ? SkiResortDay : SkiResortNight}))`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div>
        <h2>This is the admin page</h2>
        <div><Events /></div>
        <div><Accounts /></div>
      </div>
    </div>
  )
}
