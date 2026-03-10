"use server"
import createMollieClient from '@mollie/api-client';

import { BTW_TARIEF } from '../../BASEPRICE'
import styles from './invoice.module.css'
import PrintButton from './printbutton';

const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_PRIVATE_KEY as string });

export default async function Page(props: { params: Promise<{ calendar: string, paymentid: string }> }) {
    const { calendar, paymentid } = await props.params
    const payment = await mollieClient.payments.get(paymentid)

    const price = Number.parseFloat(payment.amount.value)
    const date = new Date(payment.createdAt)

    return <>
        <h4 style={{ marginTop: '30px' }}>
            Invoice
        </h4>
        <p>
            Payment status: {payment.status}
        </p>
        {
            payment.status == 'paid' &&
            <>
                <section className={styles.invoice}>
                    <p className={styles.address}>
                        <b>Jazz in Amsterdam</b><br />
                        Matrozenhof 105<br />
                        1018 ZP Amsterdam<br />
                        BTW NL002197975B90<br />
                        KVK 59277475<br />
                    </p>
                    <p>
                        {date.toDateString()}
                    </p>

                    <table className={styles.products}>
                        <thead>
                            <tr>
                                <td>
                                    Description
                                </td>
                                <td>
                                    Price
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {payment.description}
                                </td>
                                <td>
                                    €{(price / (1 + BTW_TARIEF / 100)).toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    BTW (21%)
                                </td>
                                <td>
                                    €{(price / (1 + BTW_TARIEF / 100) * BTW_TARIEF / 100).toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Total ({payment.status})
                                </td>
                                <td>
                                    <b>€{price}</b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <PrintButton />
            </>
        }
        <h4 style={{ marginTop: '30px' }}>
            Contact
        </h4>
        <ul>
            <li><a href="https://www.tieslaarakker.nl/info" style={{ textDecoration: 'underline' }}> tieslaarakker.nl/info</a><br /></li>
            <li>+31655547262<br /></li>
            <li>tieslaarakker@gmail.com</li>
        </ul>
        <br />
    </>
}