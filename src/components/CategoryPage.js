import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Headerbs';
import './styles/CategoryPage.css';
import './styles/AddCategoryPage.css';
import { MdEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaArrowLeft } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';

const CategoryPage = () => {
  const navigate = useNavigate();

  const getCurrentTime = () => new Date().toLocaleString();

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

  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState('');

  const categoriesPerPage = 5;

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * categoriesPerPage;
  const indexOfFirst = indexOfLast - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  // Add
  const handleAddCategory = () => {
    if (!newCategory.trim()) return alert('Category name is required!');
    if (categories.some(cat => cat.name.toLowerCase() === newCategory.trim().toLowerCase())) {
      return alert('Category already exists!');
    }
    setCategories([...categories, { name: newCategory.trim(), createdAt: getCurrentTime() }]);
    setNewCategory('');
    setShowModal(false);
  };

  // Edit
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditName(categories[index].name);
    setShowEditModal(true);
  };

  const handleUpdateCategory = () => {
    const updated = [...categories];
    updated[editIndex].name = editName.trim();
    setCategories(updated);
    setShowEditModal(false);
  };

  // Delete
  const handleDelete = (index) => {
    setEditIndex(index);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updated = categories.filter((_, i) => i !== editIndex);
    setCategories(updated);
    setShowDeleteModal(false);
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
                const actualIndex = indexOfFirst + idx;
                return (
                  <tr key={actualIndex}>
                    <td>{actualIndex + 1}</td>
                    <td>{cat.name}</td>
                    <td>{cat.createdAt}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(actualIndex)}>
                        <MdEdit />
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(actualIndex)}>
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
              &laquo; Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
              Next &raquo;
            </button>
          </div>
        </div>

        {/* Add Category Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <h3>
                <FaArrowLeft className="back-icon" onClick={() => setShowModal(false)} />
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
                <button className="submit-btn" onClick={handleAddCategory}>Add Category</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <h3>Edit Category</h3>
              <input
                type="text"
                placeholder="Edit category name..."
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="modal-input"
              />
              <div className="modal-buttons">
                <button className="submit-btn" onClick={handleUpdateCategory}>Update</button>
                <button className="cancel-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete this category?</p>
              <div className="modal-buttons">
                <button className="submit-btn" onClick={confirmDelete}>Delete</button>
                <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
