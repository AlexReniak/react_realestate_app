import { useState } from 'react';
import { useSearchParams, useLocation } from "react-router-dom";

function Contact() {
    const [message, setMessage] = useState('');
    const [searchParams, setSearchParams] = useSearchParams()
    const { email } = useLocation().state;
    
    const onChange = (e) => setMessage(e.target.value);


    return (
        <div className="container">
            <h2 className="contact__form--heading">Contact Realtor</h2>
            <div className="contact__form--container">
                <form className="contact__form" action={`mailto:${email}?Subject=${searchParams.get('property')}&body=${message}`} method="post" encType='text/plain'>
                    <div>
                        <label htmlFor='subject'>Subject:</label>
                        <input name="subject" id="subject" className="contact__form--subject" type="text" value={searchParams.get('property')} disabled/>
                    </div>
                    <div>
                        <label htmlFor='message'>Message:</label>
                        <textarea name="message" id="message" className="contact__form--message" value={message} onChange={onChange}></textarea>
                    </div>
                    <button className="btn">Send</button>
                </form>
            </div>
        </div>
    )
}

export default Contact;