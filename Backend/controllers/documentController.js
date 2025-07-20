const db = require('../config/database_connections');

const uploadDocument = async (req, res) => {
  try {
    const { user_id, title } = req.body;
    let original_text;

    if (req.file) {
      if (req.file.mimetype.startsWith('text/')) {
        original_text = req.file.buffer.toString('utf8');
      } else {
        return res.status(400).json({
          error: 'Only text files are supported. Please upload .txt files or use the text area.'
        });
      }
    } else if (req.body.text) {
      original_text = req.body.text;
    } else {
      return res.status(400).json({
        error: 'Please provide either a text file or paste text directly.'
      });
    }

    if (!user_id || !original_text) {
      return res.status(400).json({ error: 'User ID and document text are required' });
    }

    const documentResult = await db.query(
      'INSERT INTO documents (user_id, title, original_text) VALUES ($1, $2, $3) RETURNING *',
      [user_id, title || 'Untitled Document', original_text]
    );

    const document = documentResult.rows[0];

    res.status(201).json({
      message: 'Document uploaded successfully',
      document: document
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to upload document: ' + error.message });
  }
};

const getUserDocuments = async (req, res) => {
  try {
    const { user_id } = req.params;
    
    const result = await db.query(`
      SELECT * FROM documents 
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
