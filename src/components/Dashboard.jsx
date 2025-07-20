import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const [documents, setDocuments] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadText, setUploadText] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user/documents/user/${user.id}`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('user_id', user.id);
      formData.append('title', title);

      if (uploadFile) {
        formData.append('document', uploadFile);
      } else if (uploadText) {
        formData.append('text', uploadText);
      } else {
        alert('Please select a file or enter text');
        setLoading(false);
        return;
      }

      const response = await axios.post('http://localhost:3000/user/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Document uploaded successfully!');
      setTitle('');
      setUploadFile(null);
      setUploadText('');
      fetchDocuments();
      setActiveTab('documents');
    } catch (error) {
      alert('Upload failed: ' + (error.response?.data?.error || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user.name}!</h1>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </header>

      <div className="dashboard-content">
        <nav className="dashboard-nav">
          <button
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={activeTab === 'upload' ? 'active' : ''}
            onClick={() => setActiveTab('upload')}
          >
            Upload Document
          </button>
          <button
            className={activeTab === 'documents' ? 'active' : ''}
            onClick={() => setActiveTab('documents')}
          >
            My Documents ({documents.length})
          </button>
        </nav>

        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2>Your Profile</h2>
            <div className="user-info">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Member since:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
              <p><strong>Documents uploaded:</strong> {documents.length}</p>
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="upload-section">
            <h2>Upload Legal Document</h2>
            <form onSubmit={handleFileUpload} className="upload-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Document Title (optional)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Upload File:</label>
                <input
                  type="file"
                  accept=".txt"
                  onChange={(e) => setUploadFile(e.target.files[0])}
                />
              </div>
              <div className="form-group">
                <label>Or paste text directly:</label>
                <textarea
                  placeholder="Paste your legal document text here..."
                  value={uploadText}
                  onChange={(e) => setUploadText(e.target.value)}
                  rows="10"
                />
              </div>
              <button type="submit" disabled={loading}>
                {loading ? 'Uploading...' : 'Upload Document'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="documents-section">
            <h2>Your Documents</h2>
            {documents.length === 0 ? (
              <p>No documents uploaded yet. <button onClick={() => setActiveTab('upload')}>Upload your first document</button></p>
            ) : (
              <div className="documents-list">
                {documents.map((doc) => (
                  <div key={doc.id} className="document-card">
                    <h3>{doc.title}</h3>
                    <p>Uploaded: {new Date(doc.created_at).toLocaleDateString()}</p>
                    <p>Preview: {doc.original_text.substring(0, 200)}...</p>
                    <div className="document-actions">
                      <button>View Full Text</button>
                      <button>Analyze</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;