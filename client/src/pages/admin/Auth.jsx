import React from "react";
import axios from "axios";
import styles from "./Admin.module.scss";

import SkiResortDay from "../../assets/SkiResortDay.webp";
import SkiResortNight from "../../assets/SkiResortNight.jpg";

export function Auth({ setLogin, theme }) {
  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  const handleLogIn = async () => {
    if (form.username != "" && form.description != "") {
      try {
        await axios.post("/api/login", form).then((res) => setLogin(res.data));
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className={styles.auth} style={{
      backgroundImage: `url(${theme ? SkiResortDay : SkiResortNight})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className={styles.container}>
        <h2>To enter, you need to sign in first</h2>
        <form action="" onSubmit={(event) => event.preventDefault()}>
          <div><label htmlFor="username">Username</label><input type="text" name="username" onChange={handleChange} /></div>
          <div><label htmlFor="password">Password</label><input type="password" name="password" onChange={handleChange} /></div>
          <input type="submit" value="Enter" onClick={handleLogIn} />
        </form>
      </div>
    </div>
  );
}
