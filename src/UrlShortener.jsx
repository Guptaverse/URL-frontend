// import React, { useState,useEffect } from 'react';
// import { Input, Button, Typography,Table} from 'antd';
// import axios from 'axios';
// import './index.css';
// const { Text } = Typography;


// const UrlShortener = () => {
//   const [url, setUrl] = useState('');
//   const [shortenedUrl, setShortenedUrl] = useState('');

//   const [allURLs, setAllURLs] = useState([]);
//   const [loading, setLoading] = useState(true); 


//   // Define the columns for the table
//   const columns = [
//     {
//       title: 'S.No',
//       dataIndex: 'sno',
//       key: 'sno',
//       width:'20%',
//     },
//     {
//       title: 'Short ID',
//       dataIndex: 'shortId',
//       key: 'shortId',width:'20%',
//     },
//     {
//       title: 'Redirect',
//       dataIndex: 'redirectURL',
//       key: 'redirectURL',width:'20%',
//       render: (text, record) => (
//         <a href={text} target="_blank" rel="noopener noreferrer">
//           {text}
//         </a>
//       ),
//     },
//     {
//       title: 'Clicks',
//       dataIndex: 'visitHistory',
//       key: 'clicks',width:'20%',
//       render: (visitHistory) => visitHistory.length,
//     },
//   ];

// //  Fetch all URLs from your backend when the component mounts
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_Backend_URL}`);
//         console.log(response)
//         setAllURLs(response.data.urls);
//       } catch (error) {
//         console.error('Error fetching URLs:', error);
//       } finally {
//         setLoading(false); // Set loading to false when data fetching is complete
//       }
//     }

//     fetchData();
//   }, []);




//   const handleUrlChange = (e) => {
//     setUrl(e.target.value);
//   };

//   const handleShorten = async() => {
//    axios.post(`${process.env.REACT_APP_Backend_URL}url`,{url})
//     .then((res)=>{
//       console.log(res.data)
//       setShortenedUrl(process.env.REACT_APP_Backend_URL+res.data.id)

//     })
//     // setShortenedUrl(`https://short.url/${Math.random().toString(36).substr(2, 7)}`);
//   };

//   return (
//     <div>
//       <div className="container">
//       <h1>URL Shortener</h1>
//       <div className="head">

//       <Input style={{ width: '300px' }} placeholder="Enter URL" name = "url" value={url} onChange={handleUrlChange} />
//       <Button type="primary" onClick={handleShorten}>Shorten</Button>
//       </div>
//       {shortenedUrl && (
//         <div>
//           <Text strong>Shortened URL:</Text>
//           <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a>
//         </div>
//       )}
//       {loading ? (
//         // Display a loading indicator while data is being fetched
//         <div>Loading...</div>
//       ) : (
//         // Display the content when data fetching is complete
//         <>
//           <div>
//           <Table dataSource={allURLs.map((item, index) => ({ ...item, sno: index + 1 }))} columns={columns} />
//           </div>
//           {/* ... other content */}
//         </>
//       )}
//       </div>



//     </div>
//   );
// };

// export default UrlShortener;








import React, { useState, useEffect } from 'react';
import { Input, Button, Typography, Table, Popconfirm, message } from 'antd';
import axios from 'axios';
import './index.css';
const { Text } = Typography;

const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [allURLs, setAllURLs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define the columns for the table
  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      key: 'sno',
      width: '20%',
    },
    {
      title: 'Short ID',
      dataIndex: 'shortId',
      key: 'shortId',
      width: '20%',
    },
    {
      title: 'Redirect',
      dataIndex: 'redirectURL',
      key: 'redirectURL',
      width: '20%',
      render: (text, record) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: 'Clicks',
      dataIndex: 'visitHistory',
      key: 'clicks',
      width: '20%',
      render: (visitHistory) => visitHistory.length,
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',
      render: (text, record) => (
        <Popconfirm
          title="Are you sure you want to delete this item?"
          onConfirm={() => handleDelete(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger" size="small">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_Backend_URL}`);
      console.log(response);
      setAllURLs(response.data.urls);
    } catch (error) {
      console.error('Error fetching URLs:', error);
    } finally {
      setLoading(false); // Set loading to false when data fetching is complete
    }
  };

  // Fetch all URLs from your backend when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleShorten = async () => {
    axios
      .post(`${process.env.REACT_APP_Backend_URL}url`, { url })
      .then((res) => {
        console.log(res.data);
        setShortenedUrl(process.env.REACT_APP_Backend_URL + res.data.id);
      })
      .catch((error) => {
        console.error('Error shortening URL:', error);
      });
  };

  const handleDelete = async (record) => {
    try {
      // Send a DELETE request to your backend to delete the data
      console.log(record._id)
      await axios.delete(`${process.env.REACT_APP_Backend_URL}url/${record._id}`);
      message.success('Data deleted successfully');
      // After deletion, refresh the data
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
      message.error('Error deleting data');
    }
  };

  return (
      <div className="container">
        <h1>URL Shortener</h1>
        <div className="head">
          <Input style={{ width: '300px' }} placeholder="Enter URL" name="url" value={url} onChange={handleUrlChange} />
          <Button type="primary" onClick={handleShorten}>
            Shorten
          </Button>
        </div>
        {shortenedUrl && (
          <div>
            <Text strong>Shortened URL:</Text>
            <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
              {shortenedUrl}
            </a>
          </div>
        )}
        {loading ? (
          // Display a loading indicator while data is being fetched
          <div>Loading...</div>
        ) : (
          // Display the content when data fetching is complete
          <>

            <div className='tabledata'>
              <h2>History</h2>
              <Table dataSource={allURLs.map((item, index) => ({ ...item, sno: index + 1 }))} columns={columns} pagination={{pageSize:5}}/>
            </div>

          </>
        )}
        <div className='footer'>
            Built by Guptaverse | <a href="https://github.com/Guptaverse/URL-Shortner-Backend" target="_blank">Source Code</a>
          </div>
      </div>

  );
};

export default UrlShortener;
