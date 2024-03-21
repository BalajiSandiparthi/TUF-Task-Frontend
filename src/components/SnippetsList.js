//You have to replace the snippets_url with the address where your backend lies.
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import '../index.css';

function SnippetsList(){
  const [snippets, setSnippets] = useState([]);
  
  useEffect(()=>{
    const snippetsURL=process.env.REACT_APP_SNIPPETS_URL;
    const fetchData = async () => {
      try {
        const response = await fetch(snippetsURL);
        if (response.ok){
          const data = await response.json();
          setSnippets(data);
        }else{
          console.error('Error fetching data:', response.statusText);
        }
      }catch (error){
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return(  
    <div className="snippets-list-container">
      <h1 className="heading">All Submissions</h1>
      <TableContainer component={Paper} className="snippet-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Input</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Submitted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {snippets.map((snippet, index) => (
              <TableRow key={index}>
                <TableCell>{snippet.username}</TableCell>
                <TableCell>{snippet.language}</TableCell>
                <TableCell>{snippet.input}</TableCell>
                <TableCell>{snippet.code}</TableCell>
                <TableCell>{snippet.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SnippetsList;
