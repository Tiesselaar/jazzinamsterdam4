import styles from './today.module.css'

export default async function RootLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return <>
    <html lang="en">
      <body className={styles.background}>
        {children}
      </body>
    </html>
  </>
}  