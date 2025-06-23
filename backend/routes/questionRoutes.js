const express = require('express');
 

const {
  togglePinQuestion,
  updateQuestionNote,
  addQuestionsToSession
} = require('../controllers/questionController');

const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();
// Route to add questions to a session
router.post('/add', protect, addQuestionsToSession);

// Route to pin/unpin a question
router.post('/:id/pin', protect, togglePinQuestion);

// Route to update a question's note
router.post('/:id/note', protect, updateQuestionNote);

module.exports = router;