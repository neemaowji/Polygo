import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  LinearProgress,
  CircularProgress
} from '@mui/material';
import { useParams } from 'react-router';

const Quiz = () => {
  const { topic } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load quiz data
  useEffect(() => {
    const loadQuizData = async () => {
      setIsLoading(true);
      try {
        const data = await import(`../assets/${topic}.json`);
        setQuizData(data);
        setError(null);
      } catch (error) {
        console.error('Failed to load quiz data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadQuizData();
  }, [topic]);

  // Handle answer shuffling
  useEffect(() => {
    if (quizData && quizData.content[currentIndex].type === 'question') {
      const content = quizData.content[currentIndex];
      const all = [content.correctAnswer, ...content.incorrectAnswers];
      setShuffledAnswers(all.sort(() => Math.random() - 0.5));
    }
  }, [currentIndex, quizData]);

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ color: 'error.main' }}>Error loading quiz: {error}</Box>;
  if (!quizData) return null;

  const currentContent = quizData.content[currentIndex];

  const handleAnswerSubmit = () => {
    const correct = selectedAnswer === currentContent.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < quizData.content.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer('');
      setShowResult(false);
    }
  };

  const calculateProgress = () => {
    return ((currentIndex + 1) / quizData.content.length) * 100;
  };

  const goBack = () =>{
    if(currentIndex > 0){
      setCurrentIndex(currentIndex - 1)
    }
  }

  const renderLearnCard = () => (
    <Card sx={{ minWidth: 275, maxWidth: 600, m: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {currentContent.title}
        </Typography>
        <Typography variant="body1">
          {currentContent.content}
        </Typography>
        <Button 
          variant="contained" 
          onClick={handleNext}
          sx={{ mt: 2 }}
        >
          Next
        </Button>
      </CardContent>
    </Card>
  );

  const renderQuestionCard = () => (
    <Card sx={{ minWidth: 275, maxWidth: 600, m: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Question
        </Typography>
        <Typography variant="body1" gutterBottom>
          {currentContent.prompt}
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
            sx={{ mt: 2 }}
            disabled={!selectedAnswer}
          >
            Submit
          </Button>
        ) : (
          <>
            <Alert severity={isCorrect ? "success" : "error"} sx={{ mt: 2 }}>
              {isCorrect ? "Correct! " + currentContent.explanation: "Incorrect. " + currentContent.explanation}
            </Alert>
            <Button 
              variant="contained" 
              onClick={handleNext}
              sx={{ mt: 2 }}
            >
              Next
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight:600,
        p: 3
      }}
    >
      {currentContent.type === 'learn' ? renderLearnCard() : renderQuestionCard()}
      <Box sx={{ width: '100%', minWidth: 300, maxWidth: 600, mb: 3 }}>
        <Button 
          variant="contained" 
          onClick={goBack}
          sx={{ mt: 2 }}
        >
          Previous
        </Button>
      </Box>
      <Box sx={{ width: '100%', maxWidth: 600, mb: 3 }}>
        <LinearProgress 
          variant="determinate" 
          value={calculateProgress()} 
          sx={{ 
            height: 10, 
            borderRadius: 5,
            mb: 1
          }} 
        />
        <Typography variant="body2" color="text.secondary" align="right">
          {`${Math.round(calculateProgress())}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default Quiz;
