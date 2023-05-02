import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials,setCredentials]=useState({email:"",password:""});
    let navigate=useNavigate();

    //function to show username on Navbar
    const userInfo=async()=>{
      const response2=await fetch(`http://localhost:5000/api/auth/getuser`,{
        method: "POST",
        headers:{
          "auth-token":localStorage.getItem("token")
        }
      });
      const json2=await response2.json();
      console.log(json2);
      localStorage.setItem('name',json2.name);
      localStorage.setItem('email',json2.email)
      localStorage.setItem('date',json2.date)
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response=await fetch(`http://localhost:5000/api/auth/login`,{
            method: "POST",
            headers:{
              'Content-Type':"application/json"
            },
            body: JSON.stringify({email:credentials.email.toString(),password:credentials.password.toString()})
          });
          const json=await response.json();
          console.log(json);
          if(json.success===true){
            //save the login token and redirrect to homepage
            localStorage.setItem('token',json.authToken);
            await userInfo();
            
            navigate("/");
            props.showAlert("Logged in successfully","success");
          }else{
            props.showAlert("Incorrect Details","danger");
          }
    }

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:[e.target.value]});
    }
  return (
    <div className='container'>
        <h2 className='mt-2'>Login to use MyNotePad</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>
  )
}

export default Login
