import React, { useState, useEffect } from 'react';
import axios from 'axios'

const App = () => {
  const [articles, setArticles] = useState([])  // empty array

  useEffect(()=>{
     axios.get('/api/now/table/kb_knowledge?sysparm_limit=30')
          .then(res => {
            //console.log(`Response: `, res.data);
            setArticles(res.data.result)
          })
          .catch((err) => {
            console.log(`Error:`, err);
        })
  },[])

  const Articles = () => {
    return (
      <div className='card border-info'>
        <div className='card-header bg-info text-white font-weight-bold'>Featured KB Articles</div>
        <div className='card-body'>
          <table className='table table-striped'>
            <tbody>
              <tr>
                <td className='font-weight-bold'>Number</td>
                <td> </td>
                <td className='font-weight-bold'>Topic</td>
                <td> </td>
                <td className='font-weight-bold'>Description</td>
                <td> </td>
                <td className='font-weight-bold'>Date Published</td>
              </tr>
              { articles.map((i) => {
                return (
                  <tr key={i.sys_id}>
                    <td className='text-primary'>{ i.number }</td>
                    <td> </td>
                    <td>{ i.topic }</td>
                    <td> </td>
                    <td className='font-italic'>{ i.short_description }</td>
                    <td> </td>
                    <td className='font-weight-light'>{ i.published }</td>
                  </tr>)}
                )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-secondary'>
      <div className='container'>
        <div className='jumbotron'>
          <h1>ServiceNow Knowledge Articles</h1>
        </div>
        <div className='row'>
          <div className='col-12'>
            <Articles/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
