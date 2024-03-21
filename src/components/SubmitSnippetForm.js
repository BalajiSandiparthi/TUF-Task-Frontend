import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, TextareaAutosize } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function SubmitSnippetForm(){
  const [formData, setFormData] = useState({
    username: '',
    language: 'C++',
    input: '',
    code: ''
  });

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitURL=process.env.REACT_APP_SUBMIT_URL;
  console.log(submitURL);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(submitURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormData({
          username: '',
          language: 'C++',
          input: '',
          code: ''
        });
        navigate('/snippets');
      } else {
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="Page1"> 
      <div>
        <Header/>
        <div className="submit-form-container">
          <h1 className="submit-heading">Submit Your Code</h1>
          <form onSubmit={handleSubmit}>  
            <TextField
              label="Username"
              variant="outlined"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="submit-username"
              required
            />
            <br/>
            <br/>
            <FormControl variant="outlined" className="form-control">
              <InputLabel id="language-label">Preferred Code Language</InputLabel>
              <Select
                labelId="language-label"
                value={formData.language}
                onChange={handleInputChange}
                label="Preferred Code Language"
                name="language"
              >
                <MenuItem value="C++">C++</MenuItem>
                <MenuItem value="Java">Java</MenuItem>
                <MenuItem value="JavaScript">JavaScript</MenuItem>
                <MenuItem value="Python">Python</MenuItem>
              </Select>
            </FormControl>
            <TextareaAutosize
              aria-label="input"
              placeholder="Standard Input (stdin)"
              name="input"
              value={formData.input}
              onChange={handleInputChange}
              className="textarea"
            />
            <TextareaAutosize
              aria-label="code"
              placeholder="Source Code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              className="textarea"
              required
            />
            <div className="submit-button-container">
            <Button variant="contained" type="submit" color="primary" className="submit-button">Submit</Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitSnippetForm;
