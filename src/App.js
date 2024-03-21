import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SubmitSnippetForm from './components/SubmitSnippetForm';
import SnippetsList from './components/SnippetsList';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubmitSnippetForm />} />
        <Route path="/snippets" element={<SnippetsList />} />
      </Routes>
    </Router>
  );
};

export default App;
