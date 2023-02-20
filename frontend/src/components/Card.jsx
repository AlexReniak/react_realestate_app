function Card({ children, heading, customClassName, onClick }) {
    return (
        <div className={`card ${customClassName && customClassName}`} onClick={onClick}>
            {heading && <h3>{heading}</h3>}
            <div className="card__body">
                {children}
            </div>
        </div>
    )
}

export default Card;