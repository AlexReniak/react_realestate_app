function Card({ children, heading, customClassName }) {
    return (
        <div className={`card ${customClassName && customClassName}`}>
            {heading && <h3>{heading}</h3>}
            <div className="card__body">
                {children}
            </div>
        </div>
    )
}

export default Card;