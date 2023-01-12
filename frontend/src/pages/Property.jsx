import { useParams } from 'react-router-dom';

function Property() {

    const params = useParams();

    return (
        <h2>Property Page, id: {params.id}</h2>
    )
}

export default Property;