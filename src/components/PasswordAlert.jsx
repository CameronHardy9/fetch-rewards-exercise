function PasswordAlert(props) {
    if (props.field === "password") {
        return(
            <div className="alertFlag">
                <span>Please enter a valid password:</span>
                <ul>
                    <li>At least 8 characters</li>
                    <li>At least 1 uppercase letter</li>
                    <li>At least 1 lowercase letter</li>
                    <li>At least 1 number</li>
                    <li>At least 1 special character: (#?!@$%^&*-)</li>
                </ul>
            </div>
        )
    } else if (props.field === "confirmPassword") {
        return(
            <div className="alertFlag">
                <span>Please enter a matching password</span>
            </div>
        )
    }
    
};

export default PasswordAlert;