function Contact() {
    return (
        <div>
            <span className="contact__form--close" onClick={closeModal}><BsX /></span>
            <h2 className="contact__form--heading">Contact Realtor</h2>
            <div className="contact__form--container">
                <form className="contact__form" action={`mailto:${email}?Subject=${property.address}&body=${formMessage}`} method="post" encType='text/plain'>
                    <div>
                        <label htmlFor='formMessage'>Message:</label>
                        <textarea name="formMessage" id="formMessage" value={formMessage} onChange={onChange}></textarea>
                    </div>
                    <button>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Contact;