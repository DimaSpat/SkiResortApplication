import SkiResortDay from "../../assets/SkiResortDay.webp";
import SkiResortNight from "../../assets/SkiResortNight.jpg";
import styles from "./Home.module.scss";

export function Home({ theme }) {
  return (
    <>
      <div className={styles.underheader} style={{
        backgroundImage: `url(${theme ? SkiResortDay : SkiResortNight})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        <div className="under-header-overlay">
          <h2>Ski Resort <br /> for alpine skiing</h2>
        </div>
      </div>
    </>
  );
}
