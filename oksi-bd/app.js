const { Telegraf } = require('telegraf');
const bot = new Telegraf('8036197285:AAGhkhqHugZnmHjX3hyCFg-AFkggbNLv43g');

// Define your questions and answers
const questions = [
    {
        question: `
Свет мой, Зеркальце, скажи,
Да всю правду доложи:
Сколько в жизни есть твоей
Молодых богатырей?
        `,
        answer: '3'
    },
    {
        question: 
`
Свет мой, Зеркальце, скажи,
Да всю правду доложи:
Сколько у тебя принцесс,
Чьих-то будущих невест?
`,
        answer: '1'
    },
    {
        question: `
Ничто, пустота, от бублика дырка.
Делить на него - большая ошибка.
`,
        answer: '0'
    },
    {
        question: `
Лучшая оценка и день рождения Окси
`,
        answer: '5'
    }
];

// Track user progress
const userProgress = new Map();

bot.start((ctx) => {
    const userId = ctx.from.id;
    userProgress.set(userId, 0);
    ctx.reply(`${questions[0].question}`);
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
            return ctx.reply(`✅ 
${questions[nextQuestionIndex].question}`);
        } else {
            userProgress.delete(userId);
            return ctx.reply('🎉 Молодец! Ты правильно ответила на все вопросы, забирай заслуженный приз!');
        }
    } else {
        return ctx.reply(`❌ Почти! Попробуй ещё: ${currentQuestion.question}`);
    }
});

bot.launch();
console.log('Bot is running...');

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
