import React, { useState, useEffect } from 'react'
import { API } from './config'
import axios from 'axios'
import './App.css'
import { listFiles, upload } from './api'
import { isAuthenticated } from "./auth"

const Home = () => {
  const [search, setSearch] = useState('')
  const [files, setFiles] = useState('')
  const [fileData, setFileData] = useState({
    username: '',
    pdf: '',
    formData: ''
  })

  const { user, token } = isAuthenticated()
  const { username, pdf, formData } = fileData

  const loadFiles = () => {
      listFiles(user._id, token).then(data => {
          if (data) {
            if(data.error) {
              alert(data.error)
            } else {
              setFiles(data)
              console.log(data)
          }
          }
      })
  }

   useEffect(() => {
        loadFiles()
        setFileData({...fileData, formData: new FormData()})
    }, [])


  const download = value => event=>{
    console.log(value)
    // fake server request, getting the file url as response
    setTimeout(() => {
      const response = {
        file: `${API}/download/${value}`,
      };
      // server sent the url to the file!
      // now, let's download:
      window.open(response.file)
      // you could also do:
      // window.location.href = response.file;
    }, 100);
  }

  const handleChangeUpload = event => {
    setFileData({...fileData, 
      username: user.username,
      pdf: event.target.files[0]})

    formData.append('username', user.username)
    formData.append('pdf', event.target.files[0])
  }

  const handleSubmit = event => {
    event.preventDefault()
    upload(user._id, token, formData).then(data => {
      if(data.error) {
        alert(data.error)
      } else {
        setFileData({
          ...fileData,
          username: '',
          pdf: ''
        })
        loadFiles()
      }
    })
  }


  const filteredFile = files!==''? files.filter( file => {
    return file.pdf.substr(16).toLowerCase().includes(search.toLowerCase())
  }): null

  if(files){
    console.log(filteredFile, search)
  }

  return (
    <div>
        <main>
          <div className="wrap">
             <div className="search">
                <input onChange={e => setSearch(e.target.value)} type="text" style={{color:'white'}} placeholder="Search" />
             </div>
          </div>

          <div className="button_container">
              <input onChange={handleChangeUpload} type="file" />
              <input onClick={handleSubmit} className="btn-submit" type="submit" value="Upload"/>

          </div>


          <section className="card-section">
          {
            filteredFile !== null ?(
             <div>
              {filteredFile.map((file) => {
                if(user.username == 'admin') {
                  return (
                    <div className="card-container" key={file._id}>
                      <div className="placard">          
                        <div className="file">
                          {file.pdf.substr(16)}
                        </div>
                        <button onClick={download(file._id)} className="btn-dwnld" >Download</button>
                      </div>
                    </div>
                  )
                } if(user.role == 0 && user.username == file.username) {
                  return (
                    <div className="card-container" key={file._id}>
                      <div className="placard">          
                        <div className="file">
                          {file.pdf.substr(16)}
                        </div>
                        <button onClick={download(file._id)} className="btn-dwnld" >Download</button>
                      </div>
                    </div>
                  )
                } else return null
              }
                 
              )}
            </div>
            ): null
          }   
          </section>
          
        </main>
    </div>
  )
}

export default Home
