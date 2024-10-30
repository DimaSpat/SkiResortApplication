import styles from "./Contacts.module.scss";

export function Contacts() {
  return (
    <div className={styles.contact}>
      <div>
        <h2>Contact-Us</h2>
        <ul>
          <li>Phone number: 514 514 5140</li>
          <li>E-mail: skiResort@resort.com</li>
          <li>Address: 655 Ch. Louis-Dufour, Saint-Sauveur, QC J0R 1R3</li>
        </ul>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27357.52946130368!2d-74.17438871966105!3d45.87826487745766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccf3abcbac2fa1f%3A0xf093db7302866fa0!2sSommet%20Saint%20Sauveur!5e0!3m2!1sen!2sca!4v1730323622095!5m2!1sen!2sca" allowfullscreen="true" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  )
}
