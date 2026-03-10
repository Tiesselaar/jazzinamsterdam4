"use client";
import styles from './invoice.module.css'

export default function PrintButton() {
  return (
    <button className={styles.printbutton} onClick={() => window.print()}>
      Print this page
    </button>
  );
}