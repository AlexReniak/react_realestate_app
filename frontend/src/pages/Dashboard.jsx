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
                <h2>Hello, {user.name}</h2>
                <h2>Email: {user.email}</h2>
            </header>

            <main>
                
            </main>
        </div>
    )
}

export default Dashboard;