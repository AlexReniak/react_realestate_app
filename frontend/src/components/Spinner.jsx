import ClipLoader from 'react-spinners/ClipLoader';

function Spinner({ isLoading }) {

    const override = {
        display: 'block',
        margin: '30rem auto'
    }

    return (
        <div className="container spinner-container">
            <ClipLoader
                color='#0d1b2a'
                loading={isLoading}
                cssOverride={override}
                size={200}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}


export default Spinner
