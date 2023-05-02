import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  //TODO confirm password doesnt matter now fix
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
  let navigate=useNavigate();

  const handleSubmit= async(e)=>{
    e.preventDefault();
    const response=await fetch(`http://localhost:5000/api/auth/createuser`,{
        method: "POST",
        headers:{
          'Content-Type':"application/json"
        },
        body: JSON.stringify({name:credentials.name.toString(),email:credentials.email.toString(),password:credentials.password.toString()})
      });
      const json=await response.json();
      console.log(json);
      if(json.success===true){
        localStorage.setItem('token',json.authToken);
        navigate("/");
        props.showAlert("Account created successfully","success");
      }else{
        props.showAlert("Try again","danger");
      }
  }

  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:[e.target.value]});
  }


  return (
    <div className='container'>
        <h2 className='mt-2'>Create a new Account in MyNotePad</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange} required/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onChange} minLength={5} required/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Signup
