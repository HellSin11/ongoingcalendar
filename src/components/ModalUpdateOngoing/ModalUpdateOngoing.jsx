import React, {useContext, useRef, useState} from 'react';
import cl from './ModalUpdateOngoing.module.scss'
import InputAndLabel from "../InputAndLabel/InputAndLabel.jsx";
import {Context} from "../../index.tsx";
import FileService from "../../services/FileService.jsx";

const ModalUpdateOngoing = ({ongoingDirty, setOngoingDirty, dayOfWeek, setIsModal, path = false, nameOngoing}) => {

    const {store} = useContext(Context)
    const [uploadedFile, setUploadedFile] = useState(null);
    const posterPicker = useRef(null)
    const [newNameOngoing, setNewNameOngoing] = useState(nameOngoing);
    const [dayOfWeekNew, setDayOfWeekNew] = useState(dayOfWeek)

    const handlePick = () => {
        posterPicker.current.click();
    }

    const getAllOngoings = async () => {
        await store.getAllOngoings();
    }

    const fileUpdate = async () => {
        try {
            await FileService.updateOngoing({
                poster: uploadedFile,
                name: newNameOngoing,
                path,
                day: dayOfWeekNew,
                ownerId: store.user.id
            });
            setNewNameOngoing("");
            setUploadedFile(null);
            setIsModal(false)
            await getAllOngoings();
            setOngoingDirty(ongoingDirty + 1)
        } catch (e) {
            console.log(e);
            store.setCurrentError(e)
        }
    }



    return (
        <div onClick={() => setIsModal(false)} className={cl.modal}>
            <div className={cl.modal__form} onClick={(e) => e.stopPropagation()}>
                <input
                    className={cl.inputHidden}
                    type='file'
                    onChange={e => setUploadedFile(e.target.files[0])}
                    accept='image/*,.png,.jpg,.gif,.web,.webp'
                    ref={posterPicker}
                />
                <h3 className={cl.modal__header}>Додати онгоінг для відслідковування</h3>
                <div className={cl.modal__input}>
                    <InputAndLabel myStyle={{color: 'white', fontSize: '1.5em'}} iconClass='fa-solid fa-hippo'
                                   isLable={false} label='Назва аніме' value={newNameOngoing}
                                   onChange={(e) => setNewNameOngoing(e.target.value)} placeholder='...'/>
                    <select value={dayOfWeekNew} name="dayOfWeek" onChange={e => setDayOfWeekNew(e.target.value)}>
                        <option value="1">Понеділок</option>
                        <option value="2">Вівторок</option>
                        <option value="3">Середа</option>
                        <option value="4">Четвер</option>
                        <option value="5">П'ятниця</option>
                        <option value="6">Субота</option>
                        <option value="0">Неділя</option>
                    </select>
                </div>
                <div className={cl.addImg}>
                    <div className={cl.tuck}>{'тик -->'}</div>
                    <div onClick={handlePick}>
                        <i className="fa-solid fa-image" style={{color: '#ffffff'}}></i>
                    </div>
                    {uploadedFile && <div className={cl.file__name}>{uploadedFile.name}</div>}
                </div>
                <div className={cl.container}>
                    <button  className={cl.create} onClick={fileUpdate}>
                        Змінити
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalUpdateOngoing;