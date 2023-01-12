import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Card from "../components/Card";
import Spinner from '../components/Spinner';
import Modal from 'react-modal';
import { FaHome, FaBuilding } from 'react-icons/fa'
import { BsX } from 'react-icons/bs'


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      height: '50rem',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#e6e6e6'
    },
  };

Modal.setAppElement('#root');

function Home() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);

    const closeModal = () => setModalIsOpen(false);

    // if(loading) {
    //     return (
    //         <Spinner isLoading={loading} />
    //     )
    // }

    return (
        <>
            <Header />

            <div className="container">

                {/* Add 3 most recently added properties here */}

                <button className="btn home__btn" onClick={openModal}>Browse Properties</button>

                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
                    <span className="home__card--close" onClick={closeModal}><BsX /></span>
                    <h2 className='home__card--title'>What type of properties are you looking for?</h2>
                    <div className="home__card--container">
                        <Card customClassName={"home__card"} heading={<FaHome className='home__card--heading' />}>
                            <Link to="/properties/sale" className="btn home__card--btn">Properties for sale</Link>
                        </Card>
                        <Card customClassName={"home__card"} heading={<FaBuilding className='home__card--heading' />}>
                            <Link to="/properties/rent" className="btn home__card--btn">Properties for rent</Link>
                        </Card>
                        <Card customClassName={"home__card"} heading={<FaBuilding className='home__card--heading' />}>
                            <Link to="/properties" className="btn home__card--btn">All Properties</Link>
                        </Card>
                    </div>
                </Modal>

            </div>
            
        </>
    )
}

export default Home;