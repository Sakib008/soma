import './App.css'
import Login from './components/auth/Login';
import Header from './components/Header'

function App() {
  const auth = false;
  return (
    <>
    {!auth ? <div className=''>
      <Login/>
    </div> : 
   <div className=''>
    <Header/>
   </div>
   } 
    </>
  )
}

export default App
