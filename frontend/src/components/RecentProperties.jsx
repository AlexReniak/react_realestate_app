import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecentProperties } from '../features/properties/propertySlice';
import RecentPropertyCard from './RecentPropertyCard';
import Spinner from '../components/Spinner';

const RecentProperties = () => {
  const { properties, isError, isLoading } = useSelector(
    (state) => state.properties
  );

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const getProperties = async () => {
      await dispatch(getRecentProperties());
      setLoading(false);
    };

    getProperties().catch((error) => console.error(error));
  }, []);

  console.log(properties);

  if (loading || isLoading) {
    return <Spinner isLoading={loading || isLoading} />;
  }

  return (
    <>
      <div className='recent-properties container'>
        {properties.map((property) => (
          <RecentPropertyCard property={property} />
        ))}
      </div>
    </>
  );
};

export default RecentProperties;
