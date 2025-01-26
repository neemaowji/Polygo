import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

async function getAIResponse(question, incorrectAnswers, correctAnswer, userInput) {
    const url = 'https://api.cloudflare.com/client/v4/accounts/5c15e95e1458370cab154c9ff815101e/ai/run/@cf/meta/llama-3-8b-instruct';
    const headers = {
      'Authorization': 'Bearer teoegS6H1xt8ynnJ_FSxWJnoiIr3cw5JPXFvhupV',
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify({
      messages: [
        { role: 'system', content: 'You are an AI assistant helping with data structures problems. Provide explanations and guidance based on the given question, answers, and user input.' },
        { role: 'user', content: `Question: ${question}\nIncorrect Answers: ${incorrectAnswers}\nCorrect Answers ${correctAnswer}\nUser Input: ${userInput}` }
      ]
    });
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.result.response;
    } catch (error) {
      console.error('Error:', error);
      return 'An error occurred while fetching the AI response.';
    }
  }
  



const AIChatBox = ({ currentContent }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);

    // TODO: Replace this with actual AI API call
    // You can use currentContent here to provide context to the AI
    const aiResponse = getAIResponse(currentContent.prompt, currentContent.incorrectAnswers, input)
    //`This is a placeholder AI response for: ${input}. Context: ${JSON.stringify(currentContent)}`;

    // Add AI response to chat
    setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);

    setInput('');
  };

  return (
    <Paper elevation={3} sx={{ width: 300, height: 500, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        AI Assistant
      </Typography>
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {messages.map((message, index) => (
          <Box key={index} sx={{ mb: 2, textAlign: message.sender === 'user' ? 'right' : 'left' }}>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 1, 
                display: 'inline-block',
                backgroundColor: message.sender === 'user' ? 'primary.light' : 
                               message.sender === 'ai' ? 'secondary.light' : 'grey.300',
              }}
            >
              <Typography variant="body1">{message.text}</Typography>
            </Paper>
          </Box>
        ))}
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <TextField
          fullWidth
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          sx={{ mb: 1 }}
        />
        <Button type="submit" variant="contained" fullWidth>
          Send
        </Button>
      </Box>
    </Paper>
  );
};

export default AIChatBox;
