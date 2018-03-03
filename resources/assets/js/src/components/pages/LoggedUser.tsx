import * as React from "react";
import WebNotification from "react-web-notifications";

const LoggedUser = () => {
    return (
        <div className="row">
            <WebNotification
                title="Hello, World!"
                body="This is a web notification"
                timeout={9000}
            />
            <div className="col-xs-12">
                <h1>Uživatelská stránka</h1>
            </div>
        </div>
    );
};

export default LoggedUser;
