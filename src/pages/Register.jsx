import { useState } from 'react';
import { backendUrl } from '../config';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
// import axios from 'axios';



const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleReset = () => {
    setEmail('');
    setPassword('');
    setName('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registerResponse = await fetch(`${backendUrl}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // const payload={
    //   name:name,
    //   email: email,
    //   password: password
    // }
    // await axios.post('http://localhost:8000/api/auth/register', {payload})
    //   .then((response) => {
    //     console.log('Response:', response.data);
    //     // this.setState({ responseMessage: 'Post created successfully!' });
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //     // this.setState({ responseMessage: 'Error creating the post.' });
    //   });
    const data = await registerResponse.json();

    console.log(data);
    handleReset();
    navigate("/login");

  };


  return (
    <div className={styles.outbox}>
      <div className={styles.container} id="container">
        <div className={`${styles.container} ${styles.logincontainer}`}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.head}>Register</h1>
            <span className={styles.span}>or <Link to={'/login'}>Sign In?</Link></span>
            <input className={styles.input} type="text" placeholder="Enter your name" value={name} onChange={handleNameChange} required />
            <input  className={styles.input} type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} required />
            <input  className={styles.input} type="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} required />
            <Link to={'/EmailCheck'}>Forgot your password?</Link>
            <button className={styles.button}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
