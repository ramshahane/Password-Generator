import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const [copySuccess, setCopySuccess] = useState(false);

  const copyPasswordToClipboard = useCallback(() => {
    try {
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0, 101);
      window.navigator.clipboard.writeText(password);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy password:", err);
      alert("Failed to copy password. Please try again.");
    }
  }, [password]);

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  
  const validateLength = (value) => {
    const numericValue = parseInt(value, 10);
    if (numericValue >= 6 && numericValue <= 100) {
      setLength(numericValue);
    } else {
      alert("Password length must be between 6 and 100.");
      setLength(8); // Reset to default
    }
  };
  
  return (
    
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3 '>Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
       <button
       onClick={copyPasswordToClipboard}
       className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
       >
      {copySuccess ? "Copied!" : "Copy"}
      </button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
      <input
     type="range"
      min={6}
      max={100}
      value={length}
      className="cursor-pointer"
      onChange={(e) => validateLength(e.target.value)}
      />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
    <div className="my-4">
  <p className="text-sm text-white">Live Password Preview:</p>
  <div className="bg-gray-700 text-white p-2 rounded-md">
    {password}
  </div>
</div>

</div>
    
  )
}

export default App
