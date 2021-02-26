import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import './App.css';

function App() {
  const [offset, setOffset] = useState(0);
  const [articles, setArticles] = useState([])  // empty array
  const [perPage] = useState(7);
  const [pageCount, setPageCount] = useState(0);

  const getData = async() => {
    const res = await axios.get('/api/now/table/kb_knowledge')
    const data = res.data.result;
    //console.log(data);
      const slice = data.slice(offset, offset + perPage)
      const postData = slice.map((i) => {
        return (
          <tr key={i.sys_id}>
            <td className='text-info'>{ i.number }</td>
            <td> </td>
            <td>{ i.topic }</td>
            <td> </td>
            <td className='font-italic'>{ i.short_description }</td>
            <td> </td>
            <td className='font-weight-light'>{ i.published }</td>
          </tr>)}
        )
        setArticles(postData)
        setPageCount(Math.ceil(data.length / 7))
  }
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    console.log(selectedPage);
    setOffset(selectedPage * 7)
  };

  useEffect(() => {
    getData()
  }, [offset])

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
              { articles }
            </tbody>
          </table>
          <div className='row no-gutters'>
            <div className='col-12'>
              <nav aria-label='Page navigation example'>
                {/* <ReactPaginate
                  containerClassName="pagination justify-content-center"
                  breakClassName="page-item"
                  pageCount={pageCount}
                  //breakLabel={'...'}
                  breakLinkClassName="page-link"
                  pageClassName="page-item"
                  previousClassName="page-item"
                  nextClassName="page-item"
                  pageLinkClassName="page-link"
                  previousLinkClassName="page-link"
                  nextLinkClassName="page-link"
                  activeClassName="active"
                  onPageChange={handlePageClick}
                /> */}
                {/* <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                /> */}
                <ReactPaginate
                  containerClassName="pagination justify-content-center"
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  pageCount={pageCount}
                  pageClassName="page-item"
                  previousClassName="page-item"
                  nextClassName="page-item"
                  pageLinkClassName="page-link"
                  previousLinkClassName="page-link"
                  nextLinkClassName="page-link"
                  activeClassName="active"
                  onPageChange={handlePageClick}
                />
              </nav>
            </div>
          </div>
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
  );
}

export default App;
