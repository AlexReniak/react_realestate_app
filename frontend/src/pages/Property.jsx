import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

function Property() {
    const { property, isLoading, isError, isSuccess } = useSelector((state) => state.tickets);

    const { propertyId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get)
    }, [])

    return (
        <div>
            <header>

            </header>
            <main>

            </main>
        </div>
    )
}

export default Property;