import {useContext, useEffect, useMemo, useState} from 'react';
import cl from './OngoingsBar.module.scss'
import {useInView} from "react-intersection-observer";
import {colorsBackground, colorsFont, days} from "../../staticData/data.js";
import OngoingBlock from "../OngoingBlock/OngoingBlock";
import {Context} from "../../index.tsx";
import ModalAddOngoing from "../ModalAddOngoing/ModalAddOngoing";



const OngoingsBar = () => {
    const currentDay = useMemo(() => {
        return new Date().getDay()
    }, [])

    const calcDaysList = () => {
        let tempDay = currentDay;
        let tempDayList = [];
        for (let i = 0; i < 7; i++) {
            if (tempDay > 6){
                tempDay = 0;
            }
            tempDayList.push(tempDay);
            tempDay++;
        }
        return tempDayList;
    }

    let daysList = useMemo(() => {
        return calcDaysList();
    }, [])



    const {store} = useContext(Context);
    const [isActive, setIsActive] = useState(false);
    const [ref, inView] = useInView({
        threshold: 0
    });
    const {ongoings} = store;
    const [isModal, setIsModal] = useState(false);
    const [dayOfWeek, setDayOfWeek] = useState(0);
    const [ongoingDirty, setOngoingDirty] = useState(1);

    useEffect( () => {
        if (inView) {
            setIsActive(true);
        }
    }, [inView]);

    useEffect( () => {
        store.getAllOngoings()
            .then(() => {
            setOngoingDirty(ongoingDirty + 1 )
        });
    }, []);


    const openModalAndSetSelect = (index) => {
        setIsModal(!isModal);
        setDayOfWeek(index)
    }

    return (
        <div className={cl.container}>
            {isModal && <ModalAddOngoing dayOfWeek={dayOfWeek} setDayOfWeek={setDayOfWeek} setIsModal={setIsModal}/>}
            <div className={cl.mainContainer} ref={ref} style={isActive ? {opacity: '1'}
                : {opacity: '0'}}>
                <h1 className={cl.hello}>Вітаю, {store.user.fullName} !<br/>Гарного перегляду !</h1>
                {daysList.map((day, index) => (
                    <div key={index} className={cl.days}>
                        <h3 style={{backgroundColor: colorsBackground[day], color: colorsFont[day]}}>
                            <i onClick={() => openModalAndSetSelect(day)} style={{margin: '0 10px 0 10px'}} className="fa-solid fa-plus"></i>
                            {day === currentDay
                                ? 'Сьогодні, ' + days[day]
                                : days[day]}
                        </h3>
                        {ongoings &&
                            <div className={cl.ongoing__block__container}>
                                {ongoings[day] && ongoingDirty
                                    ? ongoings[day].map((ongoing, index2) => (
                                        <OngoingBlock dayOfWeek={day} ongoingDirty={ongoingDirty} setOngoingDirty={setOngoingDirty} myPath={`http://localhost:5000/${ongoing[1]}`} key={`${index}-${index2}`}
                                                      path={ongoing[1]} value={ongoing[0]}/>
                                    ))
                                    :<></>
                                }
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OngoingsBar;