import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [length,setLength]=useState(8)
  const [charAllowed,setcharAllowed]=useState(false)
  const[numberAlllowed,setnumberAllowed]=useState(false)
  const [password,setPassword]=useState("")
  const passwordRef=useRef(null)
  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz";
    if(charAllowed) str+="!@#$%^&*()_+{}";
    if(numberAlllowed) str+="1234567890";
    for(let i=0;i<length;i++){
      let char=str[Math.floor(Math.random()*str.length)]
      pass+=char;
    }
    setPassword(pass);
  },[length,charAllowed,numberAlllowed])
  useEffect(()=>{passwordGenerator()},[passwordGenerator])
  return (
    <>
    <div className='w-full mx-w-md shadow-md rounded-lg px-4 my-8 bg-gray-300 text-center text-black flex flex-wrap wrap-direction-center items-center'>
      <h1>Password Generator</h1>
      <div className='flex shadow-2xl rounded-xl overflow-hidden mb-4' style={{justifyContent:"center", textAlign:"-khtml-center"}}>
        <input 
        type="text"
        value={password}
        placeholder='    Password'
        readOnly
        ref={passwordRef}
        className='rounded-2xl'/>
        <button
        onClick={copyPasswordToClipboard}
        className='text-blue-300 cursor-pointer '
        >copy</button>
      </div>
      <div className='flex gap-x-2'>
        <div className='flex items-center gap-x-2'>
          <input type='range' min={8} max={100} value={length} className='items-center' 
          onChange={(e)=>{setLength(Number(e.target.value))}}
          />
          <label>Length : {length}</label>
        </div>
        <div className='flex items-center gap-x-2'>
          <input type='checkbox'
          checked={numberAlllowed}
          id='numberAllowed'
          onChange={()=>{setnumberAllowed((prev)=>!prev)}}
          />
          <label>Number</label>
        </div>
        <div className='flex items-center gap-x-2'>
          <input type='checkbox'
          checked={charAllowed}
          id='charAllowed'
          onChange={()=>{setcharAllowed((prev)=>!prev)}}
          />
          <label>Special Character</label>
        </div>
      </div>
    </div>

    </>
  )
}

export default App
