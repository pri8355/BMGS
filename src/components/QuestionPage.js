import React, { useState, useEffect } from 'react';
import './styles/QuestionPage.css';
import { Modal, Button } from 'react-bootstrap';
import { FaEdit, FaEye } from 'react-icons/fa';
import { MdEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import Sidebar from './Sidebar';
import Header from './Headerbs';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const QuestionPage = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    setQuestions(storedQuestions);
  }, []);

  const handleDelete = () => {
    const updated = [...questions];
    updated.splice(selectedQuestionIndex, 1);
    setQuestions(updated);
    localStorage.setItem('questions', JSON.stringify(updated));
    setShowDeleteModal(false);
    setSelectedQuestionIndex(null);
  };

  const confirmDelete = (index) => {
    setSelectedQuestionIndex(index);
    setShowDeleteModal(true);
  };

  const handleEdit = (index) => {
    navigate(`/edit-question/${index}`);
  };

  const handleView = (index) => {
    navigate(`/view-question/${index}`);
  };

  return (
    <div className="app-container d-flex">
      <Sidebar />
      <div className="main-content flex-grow-1">
        <Header />
        <div className="container question-page">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className='Questionheading'>Questions Details</h3>
            <button className="add-user-btn" onClick={() => navigate('/add-question')}>
              <FaPlus /> Add Question
            </button>
          </div>

          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Sr No</th>
                <th>Question</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{q.question}</td>
                  <td>{q.category}</td>
                  <td>
                    <button className="action-icon view" onClick={() => handleView(index)}>
                      <FaEye />
                    </button>
                    <button className="action-icon edit" onClick={() => handleEdit(index)}>
                      <MdEdit />
                    </button>
                    <button className="action-icon delete" onClick={() => confirmDelete(index)}>
                      <AiOutlineDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Delete Confirmation Modal */}
          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
           
              <Modal.Title>Confirm Delete</Modal.Title>
            
            <Modal.Body>
              Are you sure you want to delete this question?
            </Modal.Body>
            <div className="modal-buttons">
                 <button className="confirm-btn"onClick={() => setShowDeleteModal(false)}>Delete</button>
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
