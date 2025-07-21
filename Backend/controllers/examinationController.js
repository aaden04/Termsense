const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const examineDocument = async (req, res) => {
  try {
    const { documentText, documentId } = req.body;

    if (!documentText) {
      return res.status(400).json({ error: 'Document text is required' });
    }


    const prompt = `
You are a legal document examiner. Please examine this legal document and provide:

1. **Document Summary** (2-3 sentences)
2. **Document Type** (contract, terms of service, privacy policy, etc.)
3. **Key Points** (5-7 main clauses or terms)
4. **Potential Concerns** (any problematic or unusual clauses)
5. **Plain English Summary** (what this document means in simple terms)

Document to examine:
${documentText}

Please format your response clearly with the sections above.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const examination = response.text();

    
    res.json({
      success: true,
      examination: examination,
      documentId: documentId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Examination error:', error);
    res.status(500).json({ 
      error: 'Failed to examine document',
      details: error.message 
    });
  }
};

module.exports = {
  examineDocument
};
