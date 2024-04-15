import React, { useState, useEffect } from 'react';
import axios from 'axios';

const XPagination = () => {
 
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
          
          setData(res.data);
        } catch (error) {
          alert('failed to get data');
        }
      };fetchData();
    }, []);
  
    const handlePageChange = (pageNumber)=> {setCurrentPage(pageNumber);
    };
const indexOfLastItem=currentPage* itemsPerPage;
const indexOfFirstItem=indexOfLastItem - itemsPerPage;
const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);


  
return (
      <div >
        <table>
          <thead>
              <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                 
              </tr>
          </thead>
          <tbody>
              {currentItems.map(item => (
                  <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.role}</td>
                  </tr>
              ))}
          </tbody>
      </table>
       <div>
          <button onClick={()=> handlePageChange(currentPage- 1)} disabled={currentPage=== 1}>
    Previous
          </button>
          <span>
         {currentPage}
      </span>
          <button onClick={()=> handlePageChange(currentPage+ 1)} disabled={currentPage=== Math.ceil(data.length / itemsPerPage)}>
         Next
          </button>
        </div>
      </div>
    );
  };

export default XPagination;