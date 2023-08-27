import React, {useCallback, useContext, useRef, useState} from 'react';
import cl from './ModalAddOngoing.module.scss'
import InputAndLabel from "../InputAndLabel/InputAndLabel.jsx";
import {Context} from "../../index.tsx";
import FileService from "../../services/FileService.jsx";

const ModalAddOngoing = ({dayOfWeek, setDayOfWeek, setIsModal, path = false}) => {

    const {store} = useContext(Context)
    const [uploadedFile, setUploadedFile] = useState(null);
    const posterPicker = useRef(null)
    const [nameOngoing, setNameOngoing] = useState("");
    const isValid = uploadedFile !== null && nameOngoing.length > 0;

    const handlePick = () => {
        posterPicker.current.click();
    }

    const fileUpload = useCallback(async () => {
        try {
            await FileService.uploadOngoing({
                poster: uploadedFile,
                name: nameOngoing,
                day: dayOfWeek,
                ownerId: store.user.id
            });
            setNameOngoing("");
            setUploadedFile(null);
            setIsModal(false)
            await store.getAllOngoings();
        } catch (e) {
            console.log(e);
            store.setCurrentError(e)
        }
    }, [])


    return (
        <div onClick={() => setIsModal(false)} className={cl.modal}>
            <div className={cl.modal__form} onClick={(e) => e.stopPropagation()}>
                <input
                    className={cl.inputHidden}
                    type='file'
                    onChange={e => setUploadedFile(e.target.files[0])}
                    accept='image/*,.png,.jpg,.gif,.web'
                    ref={posterPicker}
                />
                <h3 className={cl.modal__header}>Додати онгоінг для відслідковування</h3>
                <div className={cl.modal__input}>
                    <InputAndLabel myStyle={{color: 'white', fontSize: '30px'}} iconClass='fa-solid fa-pen'
                                   isLable={false} label='Назва аніме' value={nameOngoing}
                                   onChange={(e) => setNameOngoing(e.target.value)} placeholder='...'/>
                    <select className={cl.select} value={dayOfWeek} name="dayOfWeek" onChange={e => setDayOfWeek(e.target.value)}>
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
                <div className={cl.button}>
                    <button disabled={!isValid} className={isValid ? cl.create : cl.disable} onClick={fileUpload}>
                        Додати
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalAddOngoing;