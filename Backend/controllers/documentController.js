const db = require('../config/database_connections');

const uploadDocument = async (req, res) => {
  try {
    const { user_id, title } = req.body;
    let original_text;
    let file_data = null;
    let file_name = null;
    let file_type = null;

    if (req.file) {
      file_name = req.file.originalname;
      file_type = req.file.mimetype;

      if (req.file.mimetype.startsWith('text/')) {
        original_text = req.file.buffer.toString('utf8');
      } else {
        file_data = req.file.buffer;
        original_text = `[${file_type} file: ${file_name}]`;
      }
    } else if (req.body.text) {
      original_text = req.body.text;
    } else {
      return res.status(400).json({
        error: 'Please provide either a file or paste text directly.'
      });
    }

    if (!user_id || !original_text) {
      return res.status(400).json({ error: 'User ID and document content are required' });
    }

    const documentResult = await db.query(
      'INSERT INTO documents (user_id, title, original_text, file_name, file_type, file_data) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [user_id, title || 'Untitled Document', original_text, file_name, file_type, file_data]
    );

    const document = documentResult.rows[0];

    res.status(201).json({
      message: 'Document uploaded successfully',
      document: {
        id: document.id,
        title: document.title,
        file_name: document.file_name,
        file_type: document.file_type,
        created_at: document.created_at
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to upload document: ' + error.message });
  }
};

const getUserDocuments = async (req, res) => {
  try {
    const { user_id } = req.params;
    
    const result = await db.query(`
      SELECT id, title, original_text, file_name, file_type, created_at
      FROM documents 
      WHERE user_id = $1 
      ORDER BY created_at DESC
    `, [user_id]);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
};

module.exports = {
  uploadDocument,
  getUserDocuments
};
