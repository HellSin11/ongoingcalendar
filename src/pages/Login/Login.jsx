import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import {observer} from "mobx-react-lite";

const Login = ({logout = false}) => {
    return (
        <div style={{color: 'black'}}>
            <LoginForm/>
        </div>
    );
};

export default observer(Login);