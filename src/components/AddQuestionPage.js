import React, { useState } from 'react';
import './styles/QuestionPage.css';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import Header from './Headerbs';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AddQuestionPage = () => {
  const navigate = useNavigate();
  
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  const [formData, setFormData] = useState({
    category: '',
    question: '',
    options: ['', '', '', ''],
    correctAnswerIndex: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (value, index) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData({ ...formData, options: updatedOptions });
  };

  const handleCorrectAnswerSelect = (e) => {
    setFormData({ ...formData, correctAnswerIndex: parseInt(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalData = {
      category: formData.category,
      question: formData.question,
      options: formData.options,
      correctAnswer: formData.options[formData.correctAnswerIndex],
    };

    // Save to localStorage
    const existingQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    const updatedQuestions = [...existingQuestions, finalData];
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));

    // Navigate to questions page
    navigate('/questions');
  };

  return (
    <div className="app-container d-flex">
       <Sidebar isCollapsed={isCollapsed} />

      <div className="main-content flex-grow-1">
          <Header toggleSidebar={toggleSidebar} />
        <div className="container addquestion">
          <div className="d-flex align-items-center mb-3 addtop">
            <Button className="addbtn" onClick={() => navigate('/questions')}>
              <FaArrowLeft />
            </Button>
            <h3 className="addheading">Add Question</h3>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Methodologies">Methodologies</option>
                <option value="Leadership">Leadership</option>
                <option value="Coaching">Coaching</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="question"
                value={formData.question}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Label className="mb-2">Options</Form.Label>
            <Row>
              {[0, 1].map((index) => (
                <Col md={6} key={index} className="mb-2">
                  <Form.Control
                    type="text"
                    value={formData.options[index]}
                    onChange={(e) => handleOptionChange(e.target.value, index)}
                    placeholder={`Option ${index + 1}`}
                    required
                  />
                </Col>
              ))}
            </Row>
            <Row>
              {[2, 3].map((index) => (
                <Col md={6} key={index} className="mb-2">
                  <Form.Control
                    type="text"
                    value={formData.options[index]}
                    onChange={(e) => handleOptionChange(e.target.value, index)}
                    placeholder={`Option ${index + 1}`}
                    required
                  />
                </Col>
              ))}
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Correct Answer</Form.Label>
              <Form.Select
                name="correctAnswerIndex"
                value={
                  formData.correctAnswerIndex !== null
                    ? formData.correctAnswerIndex
                    : ''
                }
                onChange={handleCorrectAnswerSelect}
                required
              >
                <option value="">Select correct answer</option>
                {formData.options.map((option, index) => (
                  <option key={index} value={index}>
                    {option || `Option ${index + 1}`}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className='addsubmit'>
              Submit 
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionPage;
