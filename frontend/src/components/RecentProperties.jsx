import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRecentProperties } from '../features/properties/propertySlice';
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

    getProperties().catch((error) => console.log(error));
  }, []);

  console.log(properties);

  if (loading || isLoading) {
    return <Spinner isLoading={loading || isLoading} />;
  }

  return (
    <>
      {properties.map((property) => (
        <Link></Link>
      ))}
    </>
  );
};

export default RecentProperties;
