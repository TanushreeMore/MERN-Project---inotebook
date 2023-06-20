import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const s1 = {
        "name" : "Tanu",
        "class" : "10A"
    }
    const [state, setState] = useState(s1);
    const update = () => {
        setTimeout(() => {
            setState({
                "name" : "Tanushree",
                "class" : "Engineering"
            })
        }, 1000);
    }
    return (
        <NoteContext.Provider value={{state:state, update:update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;