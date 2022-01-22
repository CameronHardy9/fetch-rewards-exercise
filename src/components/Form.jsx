import uniqid from 'uniqid';

function Form(props) {
    return(
        <>
            <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', flexGrow: 1}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <label htmlFor='name'>Full Name</label>
                    <input type="text" name="name" id="name" />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <label htmlFor='email'>Email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <label htmlFor='password'>Create Password</label>
                    <input type="password" name="password" id="password" />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <label htmlFor='occupation'>Occupation</label>
                    <select name="occupation" id="occupation">
                        {
                            props.occupations.map((item) => {
                                return(
                                    <option key={uniqid()} value={item.toLowerCase().replace(' ', '-')}>{item}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <label htmlFor='state'>State</label>
                    <select name="state" id="state">
                        {
                            props.states.map((item) => {
                                return(
                                    <option key={uniqid()} value={item.name.toLowerCase()}>{item.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <button>Submit</button>
            </form>
        </>
    )
};

export default Form;