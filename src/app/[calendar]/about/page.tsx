import styles from './styles.module.css'

export default function About() {
    return <>
        <div className={styles.main}>
            <h3>
                About
            </h3>
            <p>
                Jazz in Amsterdam was created by <a href='https://www.tieslaarakker.nl'>Ties Laarakker</a>.
                An API is available at <a href='https://jazzin.amsterdam/api'>https://jazzin.amsterdam/api</a>.
                Part of the source code can be viewed at <a href='https://github.com/Tiesselaar/jina'>https://github.com/Tiesselaar/jina</a>.
                I have received some financial support from <a href='https://www.newamsterdamjazz.org'>New Amsterdam Jazz</a> for
                maintaining the website.
            </p>
            <p>
                You can support the project by making a donation:
            </p>
            <ul>
                <li>
                    <a href="https://payment-links.mollie.com/payment/xDcHdzpFgbNoUbuWPECkL">
                        Ideal/credit card
                    </a>
                </li>
                <li>
                    <a href="https://www.paypal.com/donate/?hosted_button_id=8P6E4X7EU3MCC">
                        Paypal/credit card
                    </a> (also recurring donations)
                </li>
            </ul>
            {/* <h4>Company details:</h4>
            <ul>
                <li>Jazz in Amsterdam</li>
                <li>Matrozenhof 105</li>
                <li>1018 ZP Amsterdam</li>
                <li>KVK 59277475</li>
                <li>btw NL002197975B90</li>
                <li>+31655547262</li>
                <li>tieslaarakker@gmail.com</li>
            </ul> */}
            <p><i style={{ fontSize: '0.9em' }}>
                Disclaimer: content on this website is automatically collected, unedited, unreviewed and certainly contains mistakes. References to official listings are provided as much as possible, so check those.
            </i></p>
        </div>
    </>
}
