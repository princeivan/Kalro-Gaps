
import Navbar from './Components/Navbar/Navbar'
import LanguageSwitcher from './Components/LanguageSwitcher'
import Home from './Pages/Home/Home'
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import { Route, Routes } from 'react-router-dom';
import ScrollProgressBar from './Components/ScrollProgressBar/ScrollProgressBar'
import Details from './Components/Details/Details';
import { useContext, useState } from 'react';
import { GlobalContext } from './Context/Context';
import Gaps from './Components/Gaps/Gaps';
import Footer from './Components/Footer/Footer';


function App() {
  const{gaps} = useContext(GlobalContext)
  const [searchInput, setSearchInput] = useState('')
  const [selectedResults, setSelectedResults] = useState(null)


  //Handle input change and update the searchInput
  const handleInputChange = (event) =>{
    setSearchInput(event.target.value)
  }

  //Filter gaps based on searchInput
  const filtereddata = gaps.filter((title) =>
  title.title.toLowerCase().includes(searchInput.toLowerCase())
  )

  //handle selection of the search result 
  const handleSelectedResult =(result)=>{
    setSelectedResults(result)
    setSearchInput('')
  }

  const handleKeyDown = (event)=>{
    if (event.key === 'Enter' && filtereddata.length > 0){
      handleSelectedResult(filtereddata[0])
    }
  }
  return (
    <>
      <div>
     
        <LanguageSwitcher/>
       <Navbar searchInput={searchInput} handleInputChange={handleInputChange} handleKeyDown={handleKeyDown}/>
       <ScrollProgressBar/>
       
           <Routes>
             <Route path="/" element={<Home filtereddata={filtereddata}/>} />
             <Route path="/about" element={<About />} />
             <Route path="/contact" element={<Contact />} />
             <Route path="/gaps-detail/:id" element={<Details/>} />
             <Route path='/gaps'element={<Gaps filtereddata={filtereddata} handleSelectedResult={handleSelectedResult}/>}/>
           </Routes>
          <Footer/>
      </div>
     
    </>
  )
}

export default App
