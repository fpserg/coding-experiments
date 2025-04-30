const { Telegraf } = require('telegraf');
const bot = new Telegraf('YOUR_BOT_TOKEN');

// Define your questions and answers
const questions = [
    {
        question: 'What is 2 + 2?',
        answer: '4'
    },
    {
        question: 'What is 5 × 3?',
        answer: '15'
    },
    {
        question: 'What is 100 ÷ 4?',
        answer: '25'
    }
];

// Track user progress
const userProgress = new Map();

bot.start((ctx) => {
    const userId = ctx.from.id;
    userProgress.set(userId, 0);
    ctx.reply(`Let's start! First question: ${questions[0].question}`);
});

bot.on('text', (ctx) => {
    const userId = ctx.from.id;
    const currentQuestionIndex = userProgress.get(userId);
    
    // If user hasn't started or finished all questions
    if (currentQuestionIndex === undefined || currentQuestionIndex >= questions.length) {
        return ctx.reply('Type /start to begin the quiz');
    }

    const currentQuestion = questions[currentQuestionIndex];
    
    // Check answer
    if (ctx.message.text === currentQuestion.answer) {
        const nextQuestionIndex = currentQuestionIndex + 1;
        
        if (nextQuestionIndex < questions.length) {
            userProgress.set(userId, nextQuestionIndex);
            return ctx.reply(`✅ Correct! Next question: ${questions[nextQuestionIndex].question}`);
        } else {
            userProgress.delete(userId);
            return ctx.reply('🎉 Congratulations! You answered all questions correctly!');
        }
    } else {
        return ctx.reply('❌ Incorrect answer. Try again: ' + currentQuestion.question);
    }
});

bot.launch();
console.log('Bot is running...');

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));