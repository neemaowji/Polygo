import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  Typography, 
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  CircularProgress,
  RadioGroup,
  Radio,
  Alert,
  LinearProgress,
  CardContent,
  Slider
} from '@mui/material';

const dataStructures = [
  { id: 'list', label: 'Lists' },
  { id: 'stack', label: 'Stacks' },
  { id: 'queue', label: 'Queues' },
  { id: 'linked list', label: 'Linked Lists' },
  { id: 'tree', label: 'Trees' },
  { id: 'heap', label: 'Heaps' },
  { id: 'hash table', label: 'Hash Tables' }
];

const Practice = () => {
  // Selection and loading states
  const [selectedDS, setSelectedDS] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalAvailableQuestions, setTotalAvailableQuestions] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  
  // Question management states
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Practice session states
  const [isPracticeStarted, setIsPracticeStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  // Update total available questions when data structures are selected
  useEffect(() => {
    const updateAvailableQuestions = async () => {
      if (selectedDS.length === 0) {
        setTotalAvailableQuestions(0);
        return;
      }

      try {
        const counts = await Promise.all(
          selectedDS.map(async (ds) => {
            const data = await import(`../assets/${ds}.json`);
            return data.content.filter(item => item.type === 'question').length;
          })
        );
        const totalQuestions = counts.reduce((a, b) => a + b, 0);
        setTotalAvailableQuestions(totalQuestions);
        setNumberOfQuestions(prev => Math.min(prev, totalQuestions));
      } catch (error) {
        console.error('Error counting questions:', error);
      }
    };

    updateAvailableQuestions();
  }, [selectedDS]);

  const handleDSChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedDS([...selectedDS, value]);
    } else {
      setSelectedDS(selectedDS.filter(ds => ds !== value));
    }
  };

  const handleStartPractice = async () => {
    if (selectedDS.length === 0) return;
    
    setIsLoading(true);
    try {
      const allQuestions = await Promise.all(
        selectedDS.map(async (ds) => {
          const data = await import(`../assets/${ds}.json`);
          return data.content
            .filter(item => item.type === 'question')
            .map(question => ({ ...question, dataStructure: ds }));
        })
      );
      
      const flatQuestions = allQuestions.flat();
      const shuffledQuestions = flatQuestions
        .sort(() => Math.random() - 0.5)
        .slice(0, numberOfQuestions);
      
      setQuestions(shuffledQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setIsPracticeStarted(true);
      
      if (shuffledQuestions.length > 0) {
        const firstQuestion = shuffledQuestions[0];
        const answers = [firstQuestion.correctAnswer, ...firstQuestion.incorrectAnswers];
        setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
      }
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSubmit = () => {
    const correct = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer('');
      setShowResult(false);
      
      const nextQuestion = questions[nextIndex];
      const answers = [nextQuestion.correctAnswer, ...nextQuestion.incorrectAnswers];
      setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
    } else {
      setIsPracticeStarted(false);
    }
  };

  const calculateProgress = () => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  };

  // Selection Screen
  if (!isPracticeStarted) {
    return (
      <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Practice Questions
        </Typography>
        
        <Card sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Select Data Structures to Practice:
          </Typography>
          <FormGroup>
            {dataStructures.map(ds => (
              <FormControlLabel
                key={ds.id}
                control={
                  <Checkbox 
                    value={ds.id}
                    checked={selectedDS.includes(ds.id)}
                    onChange={handleDSChange}
                  />
                }
                label={ds.label}
              />
            ))}
          </FormGroup>

          {totalAvailableQuestions > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography gutterBottom>
                Number of Questions: {numberOfQuestions}
              </Typography>
              <Slider
                value={numberOfQuestions}
                onChange={(_, newValue) => setNumberOfQuestions(newValue)}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={totalAvailableQuestions}
                disabled={totalAvailableQuestions === 0}
                sx={{ maxWidth: 400 }}
              />
              <Typography variant="body2" color="text.secondary">
                Total available questions: {totalAvailableQuestions}
              </Typography>
            </Box>
          )}

          <Button
            variant="contained"
            onClick={handleStartPractice}
            disabled={selectedDS.length === 0 || isLoading}
            sx={{ mt: 2 }}
          >
            Start Practice
          </Button>
        </Card>

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    );
  }

  // Practice Session Screen
  const currentQuestion = questions[currentQuestionIndex];

  return (
    
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <LinearProgress 
          variant="determinate" 
          value={calculateProgress()} 
          sx={{ height: 10, borderRadius: 5, mb: 1 }} 
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Question {currentQuestionIndex + 1} of {questions.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Score: {score}/{currentQuestionIndex + (showResult ? 1 : 0)}
          </Typography>
        </Box>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {currentQuestion.dataStructure.toUpperCase()}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {currentQuestion.prompt}
          </Typography>
          
          <RadioGroup
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          >
            {shuffledAnswers.map((answer) => (
              <FormControlLabel
                key={answer}
                value={answer}
                control={<Radio />}
                label={answer}
                disabled={showResult}
              />
            ))}
          </RadioGroup>

          {!showResult ? (
            <Button
              variant="contained"
              onClick={handleAnswerSubmit}
              disabled={!selectedAnswer}
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          ) : (
            <>
              <Alert severity={isCorrect ? "success" : "error"} sx={{ mt: 2 }}>
                {isCorrect ? "Correct!" : "Incorrect. " + currentQuestion.explanation}
              </Alert>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 2 }}
              >
                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Practice"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Practice;
