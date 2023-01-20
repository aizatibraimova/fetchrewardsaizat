import { useEffect, useState } from "react"

const Form = () => {

    //State for registration
    const [newUser, setNewUser] = useState({
        'name': '',
        'email': '',
        'password': '',
        'occupation': '',
        'state': ''    
    })

    //States for dropdown select options
    const [occupations, setOccupations] = useState([]);
    const [states, setStates] = useState([]);

    //State for checking the errors
    const [status, setStatus] = useState(null)

    //Handling the change
    const handleChange = (value, name)=> {
        setNewUser({...newUser, [name]: value})
    }

    //Handling the form submission
    const handleSubmit = e => {
        e.preventDefault();
        
        const {name, email, password, occupation, state} = newUser;
        


        if (name && email && password && occupation && state) {
            
            fetch(`https://frontend-take-home.fetchrewards.com/form`, {
                method: "POST",
                body: JSON.stringify(
                    newUser
                ),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setStatus('success')
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            setStatus('error')
        }
    }

    useEffect(() => {
    
        fetch('https://frontend-take-home.fetchrewards.com/form')
        .then(res => res.json())
        .then(data => {
            setOccupations(data.occupations);
        
        })
        .catch(err => {
            console.log(err);
        
        });

        fetch('https://frontend-take-home.fetchrewards.com/form')
        .then(res => res.json())
        .then(data => {
            setStates(data.states);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])



    return(
        <div className="container">
            <div className="header"><h1>User Registration</h1></div>

            <form onSubmit={handleSubmit}>
                
                {/*Showing success/error messages*/}
                <div className="messages">
                    <div className="success">
                        {status === 'success' ? <p>User successfully registered!</p> : null}
                    </div>

                    <div className="error">
                        {status === 'error' ? <p>Please fill out all fields</p> : null}
                    </div>
                </div>

                {/* Labels and inputs for form data */}
                <label>Full Name:
                <div className="input">
                    <input
                    type="text"
                    name="name"
                    value={newUser.name}
                    autoComplete="on"
                    onChange={(e) => handleChange(e.target.value, e.target.name)}/>
                </div>
                </label>
                
                <label>Email:
                <div className="input">
                    <input
                    type='email'
                    name='email'
                    autoComplete="on"
                    value={newUser.email}
                    onChange={(e) => handleChange(e.target.value, e.target.name)}/>
                </div>
                </label>

                
                <label>Password:
                <div className="input">
                    <input
                    type='password'
                    name='password'
                    autoComplete="on"
                    value={newUser.password}
                    onChange={(e) => handleChange(e.target.value, e.target.name)}/>
                </div>
                </label>
                

                
                
                    <label>Occupation:
                    <div className="input">
                    <select
                    name="occupation"
                    onChange={(e) => handleChange(e.target.value, e.target.name)}>
                        <option disabled>Please select</option>
                        {occupations && occupations.map((occupation, index)=> (
                            <option key={index} value={occupation}>{occupation}
                            </option>
                        ))}
                    </select>
                    </div>
                </label>
                

                
                    <label>State:
                    <div className="input">
                    <select
                    name="state"
                    onChange={(e) => handleChange(e.target.value, e.target.name)}>
                        <option disabled>Please select</option>
                        {states && states.map((state, index) => (
                            <option key={index} value={state.abbreviation}> 
                            {state.name}
                            </option>
                        ))}
                    </select>
                </div>
                </label>
                

                <button 
                    className="btn"
                    type="submit"
                    onSubmit={handleSubmit}>Submit</button>
                
            </form>


        </div>
    )
}

export default Form;

// Reference: https://reactjs.org/docs/forms.html































