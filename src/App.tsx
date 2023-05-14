import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { defaultConf } from "./config/DefaultConf";
import { FiSearch } from "react-icons/fi";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'


function App() {
  const [dataList, setDataList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  const queryClient = new QueryClient()


  useEffect(() => {
    getMovies()        
  }, [keyword]);


  const handleChange = async (e) => {
    setQuery(e.target.value)
    setKeyword(e.target.value)
    setDataList([])
    try {
      const response = await fetch(`${defaultConf.path}search/movie?api_key=${defaultConf.api_key}&query=${e.target.value}`, {mode:'cors'});
      const data = await response.json();
      if( data.results.length > 0 )
      {
        const listData = data.results
        console.log('listData a', listData)
        setDataList(listData)
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  const getMovies = async () => {
    try {
      const response = await fetch(`${defaultConf.path}discover/movie?api_key=${defaultConf.api_key}`, {mode:'cors'});
      const data = await response.json();
      if( data.results.length > 0 )
      {
        setDataList([])
        const listData = data.results
        setDataList(listData)
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="App">
      <Row>
        <Col lg={12}>
          <header className="App-header">
            <h1>Hello Hekta Hendra Priana.</h1>
            <p>Here are the list of Movies you submit</p>
          </header>
        </Col>
      </Row>
      <Card>
        <Card.Header>
          <Row>
            <Col md="12">
              <h3>Recent Movies</h3>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Form>
                <Row className="mb-3">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2 input-search"
                    aria-label="Search"
                    defaultValue={query}
                    onChange={handleChange}
                  />
                  <Button type="button" className="btn-search"><FiSearch /></Button>
                </Row>
              </Form>
            </Col>
          </Row>
          
        </Card.Header>
        <Card.Body>
          <Row>
            <Col lg={12}>
              <Table className="tbl">
                <thead className='thead'>
                  <tr>
                    <th className="col-2">Movie Title</th>
                    <th className="col-2">Release Date</th>
                    <th className="col-1">Overview</th>
                    <th className="col-4">Popularity</th>
                    <th className="col-5">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    dataList.map((item, i) => (
                      <tr key={i}>
                        <td className='col-2'>{item['title']}</td>
                        <td className='col-2'>{moment(item['release_date']).format('MMM DD, YYYY')}</td>
                        <td className='col-1'>{item['overview']}</td>
                        <td className='col-4'>{item['popularity']}</td>
                        <td className='col-5'>{item['vote_average']}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
    
  );
}

export default App;
