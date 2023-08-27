import React, {useCallback, useContext, useState} from 'react';
import cl from './OngoingBlock.module.scss'
import {Context} from "../../index.tsx";
import ModalUpdateOngoing from "../ModalUpdateOngoing/ModalUpdateOngoing";

const OngoingBlock = ({value, dayOfWeek, path, setOngoingDirty, myPath, ongoingDirty}) => {
    const {store} = useContext(Context)
    const [isModal, setIsModal] = useState(false);
    const deleteOngoing = useCallback(async (name) => {
        await store.deleteOneOngoing(name);
        setOngoingDirty(ongoingDirty + 1);
    }, [])

    return (
        <>
        {isModal && <ModalUpdateOngoing ongoingDirty={ongoingDirty} setOngoingDirty={setOngoingDirty} dayOfWeek={dayOfWeek} setIsModal={setIsModal} nameOngoing={value} path={path}/>}
            <div className={cl.container}>
                <div className={cl.header}>{value}</div>
                <div className={cl.image} style={{backgroundImage: `url("${myPath}")`}}>
                    <div className={cl.modal__tools}>
                        <i className="fa-solid fa-pen" onClick={() => setIsModal(true)}></i>
                        <i className="fa-solid fa-trash" onClick={() => deleteOngoing(path)}></i>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OngoingBlock;