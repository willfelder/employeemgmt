import { createContext, useState } from "react";
import axios from "axios";

export const UserTasksContext = createContext();

const UserTasksContextProvider = props => {

    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [isActive, setIsActive] = useState(0);

    const [editID, setEditID] = useState("");
    const [editName, setEditName] = useState("");
    const [editAge, setEditAge] = useState(0);
    const [editIsActive, setEditIsActive] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getData = () => {
        axios.get('https://localhost:7106/api/Employee')
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    };

    const clear = () => {
        setName("");
        setAge("");
        setIsActive(0);
        setEditName("");
        setEditAge("");
        setEditIsActive("");
    };

    return(
        <UserTasksContext.Provider
            value={{
                show,
                data,
                name,
                setName,
                age,
                setAge,
                isActive,
                setIsActive,
                editID,
                setEditID,
                editName,
                setEditName,
                editAge,
                setEditAge,
                editIsActive,
                setEditIsActive,
                handleClose,
                handleShow,
                getData,
                clear,
            }}
        >
            {props.children}
        </UserTasksContext.Provider>
    )
};

export default UserTasksContextProvider;