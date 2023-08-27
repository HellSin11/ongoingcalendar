import '../../styles/App.scss';
import Header from "../../components/Header/Header";
import OngoingsBar from "../../components/OngoingsBar/OngoingsBar";
import {Link} from "react-router-dom";
import cl from './Calendar.module.scss'

function Calendar() {
    return (
        <>
            <Header/>
            <div className='calendar__container'>
                <Link to='/' className={cl.Header}>
                    Ongoing Calendar
                </Link>
                <div className='background'></div>
                <OngoingsBar/>
            </div>
        </>
    );
}

export default Calendar;