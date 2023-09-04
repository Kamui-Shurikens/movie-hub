import React from 'react'
import { signInWithGoogle } from '../firebase'
export default function Login() {
    return (
        <>            
        <center>
            <div className="card" style={{ width: "25rem", height: "20rem", marginTop: "7rem", backgroundColor: "yellow" }}>
                <div className="card-body">
                    <h5 className="card-title">Movie-Hub</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Welcome !</h6>
                    <p className="card-text">Please Login to continue</p>
                </div>
                <center>
                <img style={{ width: "13rem" }} src='https://media.baamboozle.com/uploads/images/558565/1646052802_44173_gif-url.gif'></img>
                </center>
            </div>
            <button type="button" class="login-with-google-btn" onClick={signInWithGoogle} style={{ marginTop: "5vh" }} >
                Login in with Google
            </button>
        </center>
        </>
    )
}
