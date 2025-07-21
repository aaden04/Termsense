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
  const [viewingDocument, setViewingDocument] = useState(null);
  const [examining, setExamining] = useState(false);
  const [examinationResult, setExaminationResult] = useState(null);
  const [activeExamination, setActiveExamination] = useState(null);

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

  const viewDocument = (doc) => {
    setViewingDocument(doc);
    setActiveTab('view');
  };

  const handleExamineDocument = async (doc) => {
    setExamining(true);
    setActiveExamination(doc.id);
    
    try {
      const response = await axios.post('http://localhost:3000/user/examination/examine', {
        documentText: doc.original_text,
        documentId: doc.id
      });
      
      setExaminationResult(response.data);
      setActiveTab('examination');
    } catch (error) {
      alert('Examination failed: ' + (error.response?.data?.error || 'Unknown error'));
    } finally {
      setExamining(false);
      setActiveExamination(null);
    }
  };

  const closeDocumentView = () => {
    setViewingDocument(null);
    setActiveTab('documents');
  };

  const closeExaminationView = () => {
    setExaminationResult(null);
    setActiveTab('documents');
  };

  const renderDocumentContent = (doc) => {
    if (!doc.file_type || doc.file_type.startsWith('text/') || !doc.original_text.startsWith('[')) {
      return (
        <div className="document-text">
          {doc.original_text}
        </div>
      );
    }
    
    if (doc.file_type && doc.file_type.startsWith('image/')) {
      return (
        <div className="file-preview">
          <div className="file-info">
            <h4>📷 Image File</h4>
            <p><strong>Filename:</strong> {doc.file_name}</p>
            <p><strong>Type:</strong> {doc.file_type}</p>
            <p className="note">
              💡 This is an image file. For legal document examination, please upload text files (.txt) 
              or paste text directly in the upload form.
            </p>
          </div>
        </div>
      );
    }
    
    if (doc.file_type && doc.file_type === 'application/pdf') {
      return (
        <div className="file-preview">
          <div className="file-info">
            <h4>📄 PDF File</h4>
            <p><strong>Filename:</strong> {doc.file_name}</p>
            <p><strong>Type:</strong> {doc.file_type}</p>
            <p className="note">
              💡 This is a PDF file. Text extraction from PDFs is not yet implemented. 
              For now, please copy and paste the text content directly.
            </p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="file-preview">
        <div className="file-info">
          <h4>📁 File Upload</h4>
          <p><strong>Filename:</strong> {doc.file_name}</p>
          <p><strong>Type:</strong> {doc.file_type}</p>
          <p className="note">
            💡 This file type cannot be displayed as text. For legal document examination, 
            please upload text files or paste content directly.
          </p>
        </div>
      </div>
    );
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
          {viewingDocument && (
            <button
              className={activeTab === 'view' ? 'active' : ''}
              onClick={() => setActiveTab('view')}
            >
              Viewing: {viewingDocument.title}
            </button>
          )}
          {examinationResult && (
            <button
              className={activeTab === 'examination' ? 'active' : ''}
              onClick={() => setActiveTab('examination')}
            >
              Examination Results
            </button>
          )}
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
                    {doc.file_name && (
                      <p><strong>File:</strong> {doc.file_name} ({doc.file_type})</p>
                    )}
                    <div className="document-actions">
                      <button onClick={() => viewDocument(doc)}>View Full Text</button>
                      <button 
                        onClick={() => handleExamineDocument(doc)}
                        disabled={examining && activeExamination === doc.id}
                      >
                        {examining && activeExamination === doc.id ? 'Examining...' : 'Examine'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'view' && viewingDocument && (
          <div className="document-view-section">
            <div className="document-view-header">
              <h2>{viewingDocument.title}</h2>
              <button onClick={closeDocumentView} className="close-btn">← Back to Documents</button>
            </div>
            <div className="document-metadata">
              <p><strong>Uploaded:</strong> {new Date(viewingDocument.created_at).toLocaleDateString()}</p>
              {viewingDocument.file_name && (
                <p><strong>Original File:</strong> {viewingDocument.file_name} ({viewingDocument.file_type})</p>
              )}
            </div>
            <div className="document-content">
              <h3>Content:</h3>
              <div className="document-display">
                {renderDocumentContent(viewingDocument)}
              </div>
            </div>
            <div className="document-actions">
              <button 
                onClick={() => handleExamineDocument(viewingDocument)}
                disabled={examining}
              >
                {examining ? 'Examining...' : 'Examine Document'}
              </button>
              <button onClick={closeDocumentView}>Close</button>
            </div>
          </div>
        )}

        {activeTab === 'examination' && examinationResult && (
          <div className="examination-section">
            <div className="examination-header">
              <h2>📋 Document Examination Results</h2>
              <button onClick={closeExaminationView} className="close-btn">← Back to Documents</button>
            </div>
            <div className="examination-metadata">
              <p><strong>Examined:</strong> {new Date(examinationResult.timestamp).toLocaleString()}</p>
              <p><strong>Document ID:</strong> {examinationResult.documentId}</p>
            </div>
            <div className="examination-content">
              <div className="examination-result">
                <pre>{examinationResult.examination}</pre>
              </div>
            </div>
            <div className="examination-actions">
              <button onClick={closeExaminationView}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
