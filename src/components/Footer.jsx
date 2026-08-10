import styles from './Footer.module.css';
function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        {new Date().getFullYear()} &copy; WorldWise inc. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
