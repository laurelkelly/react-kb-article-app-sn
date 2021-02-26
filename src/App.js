import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ReactPaginate from 'react-paginate';

function App() {
  const [offset, setOffset] = useState(0);
  const [articles, setArticles] = useState([])
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setPageCount(Math.ceil(allArticles.length / perPage));
    changePage();
  }, [offset]);

  const getData = async () => {
    const res = await axios.get('/api/now/table/kb_knowledge');
    const data = res.data.result;
    await setAllArticles(data);
    await setPageCount(Math.ceil(data.length / perPage));
    await changePage(data);
  }

  const changePage = (data) => {
    let onePageOfArticles = allArticles.slice(offset, offset + perPage);
    if(data) {
      onePageOfArticles = data.slice(offset, offset + perPage);
    }

    const postData = onePageOfArticles.map((i) => {
      return (
        <tr key={i.sys_id}>
          <td className='text-info pl-4'>{ i.number }</td>
          <td> </td>
          <td>{ i.topic }</td>
          <td> </td>
          <td className='font-italic'>{ i.short_description }</td>
          <td> </td>
          <td className='font-weight-light'>{ i.published }</td>
        </tr>
      )
    });
    setArticles(postData);
  }

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * perPage);
  };

  return (
    <div className='bg-secondary'>
      <div className='container'>
        <div className='jumbotron'>
          <h1>ServiceNow Knowledge Articles</h1>
        </div>
        <div className='row'>
          <div className='col-12'>
            <div className='card border-info'>
              <div className='card-header bg-info text-white font-weight-bold'>Featured KB Articles</div>
              <div className='card-body p-0'>
                <table className='table table-striped'>
                  <tbody>
                    <tr>
                      <td className='font-weight-bold pl-4'>Number</td>
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
                <div className='row'>
                  <div className='col-12'>
                    <nav aria-label='Page navigation example'>
                      <ReactPaginate
                        containerClassName="pagination justify-content-center"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        pageCount={ pageCount }
                        pageRangeDisplayed= { 5 }
                        marginPagesDisplayed= { 2 }
                        pageClassName="page-item"
                        previousClassName="page-item"
                        nextClassName="page-item"
                        pageLinkClassName="page-link"
                        previousLinkClassName="page-link"
                        nextLinkClassName="page-link"
                        activeClassName="active"
                        onPageChange={ handlePageClick }
                      />
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
