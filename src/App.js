import React, {useEffect, useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import Photo from './Photo'
import './App.css';


 const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState('') 
  

  const fetchPhotos = async ()=>{
    setLoading(true)
    let url 
    const urlPage = `&page=${page}`
    const urlQuery = `&query=${query}`

    if(query){
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
    }
    else{
      url = `${mainUrl}${clientID}${urlPage}`
    }
    
    try {
      const response = await fetch(url)
      const data = await response.json()
      setPhotos((oldData)=> {
        if(query && page === 1) {
          return [...data.results]
        }
        else if(query){
          return [...oldData, ...data.results]
        }
        return [...oldData, ...data]
      })
      setLoading(false)
      console.log(data)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchPhotos()
    // eslint-disable-next-line
  }, [page])

  useEffect(()=>{
    const event = window.addEventListener('scroll', ()=>{
      if(!loading && (window.innerHeight + window.scrollY) >= document.body.scrollHeight -2){
        setPage((oldPage) => {
          return oldPage + 1
        })
      }
    })
    return ()=> window.removeEventListener('scroll', event)
    // eslint-disable-next-line
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setPage(1)
    fetchPhotos()
  }

  return (
    <main>
      <section className="form-section">
        <form>
          <input type="text" placeholder="Search" value={query} onChange={(e)=> setQuery(e.target.value)}/>
          <button type="submit" onClick={handleSubmit} className="btn">
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photo-section">
        <div className="photo-container">
          {photos.map(photo =>{
            return <Photo key={photo.id} {...photo} />
          })}
        </div>
        {loading ? <h2 className="loading">Loading....</h2> : null}
      </section>
    </main>
  );
}

export default App;
