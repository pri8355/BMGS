import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Headerbs';
import './styles/CategoryPage.css';
import './styles/AddCategoryPage.css';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaArrowLeft } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';

const CategoryPage = () => {
  const navigate = useNavigate();

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleString();
  };

  const initialCategories = [
    { name: 'Methodologies', createdAt: getCurrentTime() },
    { name: 'Leadership', createdAt: getCurrentTime() },
    { name: 'Coaching', createdAt: getCurrentTime() },
  ];

  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const categoriesPerPage = 5;

  const categoryOptions = ['Methodologies', 'Leadership', 'Coaching'];

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * categoriesPerPage;
  const indexOfFirst = indexOfLast - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      const isDuplicate = categories.some(
        (cat) => cat.name.toLowerCase() === newCategory.trim().toLowerCase()
      );
      if (isDuplicate) {
        alert('Category already exists!');
        return;
      }

      const newItem = {
        name: newCategory.trim(),
        createdAt: getCurrentTime(),
      };
      setCategories([...categories, newItem]);
      setNewCategory('');
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="category-container">
          <div className="top-bar">
            <h2>Category Details</h2>
            <button className="add-user-btn" onClick={() => setShowModal(true)}>
              <FaPlus /> Add Category
            </button>
          </div>

          <table className="category-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Category Name</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.map((cat, idx) => {
                const actualIndex = categories.indexOf(cat);
                return (
                  <tr key={actualIndex}>
                    <td>{actualIndex + 1}</td>
                    <td>{cat.name}</td>
                    <td>{cat.createdAt}</td>
                    <td>
                      <button className="edit-btn" onClick={handleEdit}>
                        <FaEdit />
                      </button>
                      <button className="delete-btn" onClick={handleDelete}>
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="pagination">
            <button disabled>&laquo; Prev</button>
            <span>Page 1 of 1</span>
            <button disabled>Next &raquo;</button>
          </div>
        </div>

        {/* Add Category Modal */}
        {showModal && (
    <div className="modal-overlay">
  <div className="modal-box">
    <h3>
      <FaArrowLeft
        className="back-icon"
        onClick={() => setShowModal(false)}
        style={{ cursor: 'pointer', marginRight: '10px' }}
      />
      Add New Category
    </h3>

    <input
      type="text"
      placeholder="Enter category name"
      value={newCategory}
      onChange={(e) => setNewCategory(e.target.value)}
      className="category-input"
    />

    <div className="modal-buttons">
      <button
        className="submit-btn"
        onClick={() => {
          handleAddCategory();
          setShowModal(false);
        }}
      >
        Add Category
      </button>
    </div>
  </div>
</div>

        )}

        {/* Edit Modal - Dummy */}
        {showEditModal && (
        <div className="modal-overlay">
  <div className="modal-box">
    <h3>Edit Category</h3>
    <input type="text" placeholder="Edit category name..." className="modal-input" />
    <div className="modal-buttons">
      <button
        className="submit-btn"
        onClick={() => setShowEditModal(false)}
      >
        Update
      </button>
      <button
        className="cancel-btn"
        onClick={() => setShowEditModal(false)}
      >
        Cancel
      </button>
    </div>
  </div>
</div>
        )}

        {/* Delete Modal - Dummy */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete this category?</p>
              <div className="modal-buttons">
                <button
                  className="submit-btn"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Delete
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
