

function Form(props) {
    return(
        <>
            <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>
                <label htmlFor='name'>Full Name</label>
                <input type="text" name="name" id="name" />
                <label htmlFor='email'>Email</label>
                <input type="email" name="email" id="email" />
                <label htmlFor='password'>Create Password</label>
                <input type="password" name="password" id="password" />
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" />
                <label htmlFor='occupation'>Occupation</label>
                <select name="occupation" id="occupation">
                    {
                        props.occupations.map((item) => {
                            return(
                                <option value={item.toLowerCase().replace(' ', '-')}>{item}</option>
                            )
                        })
                    }
                </select>
                <label htmlFor='state'>State</label>
                <select name="state" id="state">
                    {
                        props.states.map((item) => {
                            return(
                                <option value={item.name.toLowerCase()}>{item.name}</option>
                            )
                        })
                    }
                </select>
                <input type="submit" value="Submit" />
            </form>
        </>
    )
};

export default Form;