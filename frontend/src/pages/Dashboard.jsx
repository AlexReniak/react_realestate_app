import { useSelector } from 'react-redux';
import Spinner from '../components/Spinner';

function Dashboard() {

    const { user, isLoading } = useSelector(state => state.auth)

    if(isLoading) {
        return (
            <Spinner isLoading={isLoading} />
        )
    }

    return (
        <div className="dashboard">
            <header>

            </header>

            <main>
                
            </main>
        </div>
    )
}

export default Dashboard;