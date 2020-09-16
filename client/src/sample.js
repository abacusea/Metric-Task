import React, { useState, useEffect } from 'react'
import { API } from './config'
import axios from 'axios'

const Sample = () => {
  const [fileData, setFileData] = useState({
    username: '5f5f396bc7bfea231c18c99d',
    pdf: '',
    formData: ''
  })
  const [listFile, setListFile] = useState()

  // const loadFiles = () => {
  //       listOrders(user._id, token).then(data => {
  //           if (data.error) {
  //               console.log(data.error);
  //           } else {
  //               setOrders(data);
  //           }
  //       });
  //   }

  const { username, pdf, formData } = fileData
  
  useEffect(() => {
      setFileData({...fileData, formData: new FormData()})
    }, [])

  const handleChangeUpload = event => {
    setFileData({...fileData, pdf: event.target.files[0]})
  }

  const handleSubmit = event => {
    event.preventDefault()
    formData.append('username', username)
    formData.append('pdf', pdf)
    axios.post(`${API}/file/create/`, formData) 
      .then(res => { // then print response status
        console.log(res.data)
     })
  }

  const download = () => {
    // fake server request, getting the file url as response
    setTimeout(() => {
      const response = {
        file: `${API}/download/`,
      };
      // server sent the url to the file!
      // now, let's download:
      window.open(response.file)
      // you could also do:
      // window.location.href = response.file;
    }, 100);
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <label>User name:</label>
          <input value ={username} type="text"/><br /><br />
          <label>File Upload</label>
          <input onChange={handleChangeUpload} type="file" /><br /><br />
          <input type="submit" value="Submit" /><br /><br />
        </form>
        
        <button onClick={download} type="button">Download</button>
    </div>
  )
}

export default Sample
