import { Fragment, useContext } from "react";
import { UserTasksContext } from "../context/UserTasksContext";
import { toast } from 'react-toastify';
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const InputContainer = () => {

    const {
        name,
        setName,
        age,
        setAge,
        isActive,
        setIsActive,
        getData,
        clear,
    } = useContext(UserTasksContext);

    const handleActiveChange = (e) => {
        if(e.target.checked) {
            setIsActive(1);
        } else {
            setIsActive(0);
        }
    };

    const handleSaveEmployee = () => {
        const url = "https://localhost:7106/api/Employee";
        const data = {
            "name": name,
            "age": age,
            "isActive": isActive
        };

        axios.post(url, data)
        .then((result) => {
            getData();
            clear();
            toast.success("Employee has been added.");
        })
        .catch((error) => {
            toast.error(error);
        });
    };

    return(
        <Fragment>
            <Container>
                <Row>
                    <Col>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Enter age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            />
                    </Col>
                    <Col>
                        <input 
                            type="checkbox"
                            checked={isActive === 1 ? true: false} 
                            value={isActive}
                            onChange={(e) => handleActiveChange(e)}
                        />
                        <label>IsActive</label>
                    </Col>
                    <Col>
                        <button 
                            className="btn btn-primary"
                            onClick={() => handleSaveEmployee()}
                        >
                            Submit
                        </button>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
};

export default InputContainer;