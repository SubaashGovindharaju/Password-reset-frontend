import { useState } from "react";
import { backendUrl } from "../config";
import { useNavigate } from "react-router-dom";
import styles from './EmailCheck.module.css';


const EmailCheck = () => {

    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const navigate = useNavigate();

    const handleReset = () => {
        setEmail('');

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginResponse = await fetch(`${backendUrl}/auth/password`, {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await loginResponse.json();
        if (loginResponse.status === 404) {
            alert('user not found');
        } else {
            alert("check your mail");
            console.log(data.responceObj.email);
            handleReset();
            navigate("/login");
        }
    };


    return (
        <div className={styles.outbox}>
            <div className={styles.container} id="container">
                <div className={`${styles.container} ${styles.logincontainer}`}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <h1 className={styles.head}>Password Reset</h1>
                        <input className={styles.input} type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} required />
                        <button className={styles.button}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default EmailCheck;