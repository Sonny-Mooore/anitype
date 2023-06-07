import React, {useEffect, useState} from 'react';
import "./alert.css"
import {AlertProps} from "@/utils/interfaces";


function Alert({state, setState, alertMessage}: AlertProps) {


    const [classNameAlertBox, setClassNameAlertBox] = useState("")

    useEffect(() => {
        if (state) {
            setClassNameAlertBox("active")
            setTimeout(() => {
                setClassNameAlertBox("alertClose")
                setTimeout(() => {
                    setState(false)
                    setClassNameAlertBox("")
                }, 1500)
            }, 4000)
        }
    }, [setState, state])

    return (
        <>
            <div className={"alertBox " + classNameAlertBox}>
                <div className="alert">{alertMessage}</div>
            </div>
        </>
    )
}


export default Alert;
