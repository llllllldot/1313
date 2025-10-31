// Данные для игр и тестов
const gameData = {
    'cyber-security': {
        title: 'Кибер-безопасность',
        description: 'Научимся безопасно пользоваться интернетом и защищать свои данные',
        games: [
            {
                title: 'Собери супер-пароль',
                description: 'Создай надежный пароль из разных символов',
                type: 'password'
            },
            {
                title: 'Свой — Чужой в сети',
                description: 'Научись отличать друзей от незнакомцев',
                type: 'friend-or-foe'
            }
        ],
        test: {
            question: 'Можно сообщать свой пароль от игры лучшему другу?',
            options: [
                { text: 'Да, он же лучший друг', correct: false },
                { text: 'Нет, пароль нужно хранить в секрете', correct: true }
            ]
        }
    },
    'saving': {
        title: 'Как накопить',
        description: 'Учимся ставить цели и копить на важные покупки',
        games: [
            {
                title: 'Копилка-мечта',
                description: 'Накопи монетки для покупки игрушки',
                type: 'piggy-bank'
            },
            {
                title: 'Выбор: сейчас или потом?',
                description: 'Учись откладывать на важные цели',
                type: 'choice'
            }
        ],
        test: {
            question: 'Что поможет быстрее купить новую куклу?',
            options: [
                { text: 'Покупать каждый день конфету', correct: false },
                { text: 'Откладывать монетки в копилку', correct: true }
            ]
        }
    },
    'fraud-protection': {
        title: 'Защита от мошенников',
        description: 'Узнаем, как распознать обман и защитить себя',
        games: [
            {
                title: 'Ничего не бери у незнакомца',
                description: 'Научись говорить "нет" незнакомым людям',
                type: 'stranger-danger'
            },
            {
                title: 'Подозрительный звонок',
                description: 'Что делать, если звонит незнакомец',
                type: 'phone-call'
            }
        ],
        test: {
            question: 'Бабулечка в парке говорит, что потеряла кошелек и просит тебя проводить ее домой. Твои действия?',
            options: [
                { text: 'Сам проводить', correct: false },
                { text: 'Позвать своего взрослого или полицейского', correct: true }
            ]
        }
    },
    'budget-planning': {
        title: 'Планирование бюджета',
        description: 'Учимся правильно распределять деньги',
        games: [
            {
                title: 'Нужно vs Хочется',
                description: 'Учись отличать необходимые покупки от желаемых',
                type: 'needs-wants'
            },
            {
                title: 'Семейный бюджет на неделю',
                description: 'Распредели деньги на важные нужды',
                type: 'budget'
            }
        ],
        test: {
            question: 'Мама дает деньги на неделю. Что купить в первую очередь?',
            options: [
                { text: 'Хлеб и молоко', correct: true },
                { text: 'Новую машинку', correct: false }
            ]
        }
    },
    'game-safety': {
        title: 'Безопасность в играх',
        description: 'Правила безопасного поведения в онлайн-играх',
        games: [
            {
                title: 'Создай безопасного персонажа',
                description: 'Придумай никнейм и аватар без личной информации',
                type: 'safe-character'
            },
            {
                title: 'Опасное сообщение в чате',
                description: 'Как реагировать на подозрительные сообщения',
                type: 'chat-safety'
            }
        ],
        test: {
            question: 'Можно в онлайн-игре рассказывать, в каком городе ты живешь?',
            options: [
                { text: 'Можно', correct: false },
                { text: 'Нельзя', correct: true }
            ]
        }
    },
    'finance-basics': {
        title: 'Основы финансов',
        description: 'Узнаем, что такое деньги и как они работают',
        games: [
            {
                title: 'Угадай профессию',
                description: 'Узнай, как люди зарабатывают деньги',
                type: 'professions'
            },
            {
                title: 'Магазин',
                description: 'Потренируйся делать покупки и получать сдачу',
                type: 'shop'
            }
        ],
        test: {
            question: 'Как мама и папа получают деньги?',
            options: [
                { text: 'Ходят на работу', correct: true },
                { text: 'Находят на дереве', correct: false }
            ]
        }
    }
};

// Текущее состояние игры
let currentGameState = {
    topic: null,
    gameIndex: null,
    gameType: null,
    score: 0,
    attempts: 0
};

// Функции для работы с модальным окном
function openGameModal(topic) {
    const modal = document.getElementById('gameModal');
    const content = document.getElementById('modalContent');
    const topicData = gameData[topic];
    
    if (!topicData) return;
    
    currentGameState.topic = topic;
    
    content.innerHTML = `
        <div class="game-content">
            <h2>${topicData.title}</h2>
            <p class="game-description">${topicData.description}</p>
            
            <div class="game-options">
                ${topicData.games.map((game, index) => `
                    <div class="game-option" onclick="startGame('${topic}', ${index})">
                        <h4>${game.title}</h4>
                        <p>${game.description}</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="advice-box">
                <h4>💡 Совет для родителей</h4>
                <p>Играйте вместе с ребенком, обсуждайте ситуации и помогайте применять знания в жизни. После игры спросите: "А как бы ты поступил в реальной жизни?"</p>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function startGame(topic, gameIndex) {
    currentGameState.topic = topic;
    currentGameState.gameIndex = gameIndex;
    currentGameState.gameType = gameData[topic].games[gameIndex].type;
    currentGameState.score = 0;
    currentGameState.attempts = 0;
    
    renderGame();
}

function renderGame() {
    const modal = document.getElementById('gameModal');
    const content = document.getElementById('modalContent');
    const topicData = gameData[currentGameState.topic];
    const game = topicData.games[currentGameState.gameIndex];
    
    let gameHTML = '';
    
    switch (currentGameState.gameType) {
        case 'password':
            gameHTML = renderPasswordGame();
            break;
        case 'friend-or-foe':
            gameHTML = renderFriendOrFoeGame();
            break;
        case 'piggy-bank':
            gameHTML = renderPiggyBankGame();
            break;
        case 'choice':
            gameHTML = renderChoiceGame();
            break;
        case 'stranger-danger':
            gameHTML = renderStrangerDangerGame();
            break;
        case 'phone-call':
            gameHTML = renderPhoneCallGame();
            break;
        case 'needs-wants':
            gameHTML = renderNeedsWantsGame();
            break;
        case 'budget':
            gameHTML = renderBudgetGame();
            break;
        case 'safe-character':
            gameHTML = renderSafeCharacterGame();
            break;
        case 'chat-safety':
            gameHTML = renderChatSafetyGame();
            break;
        case 'professions':
            gameHTML = renderProfessionsGame();
            break;
        case 'shop':
            gameHTML = renderShopGame();
            break;
    }
    
    content.innerHTML = `
        <div class="game-content">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h2>${game.title}</h2>
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <span style="background: #8b5cf6; color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.875rem;">
                        Очки: ${currentGameState.score}
                    </span>
                    <button onclick="openGameModal('${currentGameState.topic}')" style="background: #6b7280; color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">
                        Назад
                    </button>
                </div>
            </div>
            <p class="game-description">${game.description}</p>
            
            ${gameHTML}
        </div>
    `;
}

// Игра 1: Собери супер-пароль
function renderPasswordGame() {
    const symbols = ['A', 'B', 'C', '1', '2', '3', '!', '@', '#'];
    const shuffled = [...symbols].sort(() => Math.random() - 0.5);
    const targetPassword = shuffled.slice(0, 6).join('');
    
    return `
        <div style="text-align: center;">
            <div style="background: #f8fafc; border: 2px dashed #d1d5db; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
                <h3 style="color: #1f2937; margin-bottom: 1rem;">Собери пароль из 6 разных символов</h3>
                <div style="font-size: 2rem; letter-spacing: 0.5rem; margin: 1rem 0; padding: 1rem; background: white; border-radius: 8px;">
                    ${targetPassword.split('').map(() => '●').join(' ')}
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; max-width: 300px; margin: 0 auto;">
                ${shuffled.map((symbol, index) => `
                    <button onclick="handlePasswordSymbol('${symbol}', ${index})" 
                            style="font-size: 1.5rem; padding: 1rem; border: 2px solid #e5e7eb; background: white; border-radius: 8px; cursor: pointer;">
                        ${symbol}
                    </button>
                `).join('')}
            </div>
            
            <div style="margin-top: 2rem;">
                <button onclick="completePasswordGame()" 
                        style="background: #10b981; color: white; border: none; padding: 1rem 2rem; border-radius: 12px; cursor: pointer; font-size: 1.125rem;">
                    Я собрал пароль!
                </button>
            </div>
        </div>
    `;
}

function handlePasswordSymbol(symbol, index) {
    // Анимация нажатия
    const button = document.querySelector(`button[onclick="handlePasswordSymbol('${symbol}', ${index})"]`);
    button.style.transform = 'scale(0.95)';
    setTimeout(() => button.style.transform = 'scale(1)', 150);
}

function completePasswordGame() {
    currentGameState.score += 10;
    showGameResult('🎉 Отлично! Ты создал надежный пароль!', 'Пароль должен содержать буквы, цифры и специальные символы.');
}

// Игра 2: Свой — Чужой в сети
function renderFriendOrFoeGame() {
    const scenarios = [
        { type: 'friend', avatar: '😊', message: 'Привет! Я тоже люблю эту игру! Давай дружить?', name: 'Веселый Мишка' },
        { type: 'foe', avatar: '👤', message: 'Привет! Твоя мама попросила передать тебе подарок. Назови свой адрес.', name: 'Незнакомец' },
        { type: 'friend', avatar: '🐰', message: 'Здравствуй! Мне нравится твой персонаж!', name: 'Зайчик' },
        { type: 'foe', avatar: '🎭', message: 'Я сотрудник игры. Твой аккаунт заблокируют, если не скажешь пароль.', name: 'Администратор' }
    ];
    
    const currentScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    
    return `
        <div style="text-align: center;">
            <div style="background: white; border: 2px solid #e5e7eb; border-radius: 16px; padding: 2rem; margin: 2rem 0; max-width: 400px; margin-left: auto; margin-right: auto;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">${currentScenario.avatar}</div>
                <h3 style="color: #1f2937; margin-bottom: 0.5rem;">${currentScenario.name}</h3>
                <p style="color: #6b7280; font-style: italic; margin-bottom: 2rem;">"${currentScenario.message}"</p>
                
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button onclick="handleFriendFoeChoice('${currentScenario.type}', 'friend')" 
                            style="background: #10b981; color: white; border: none; padding: 1rem 2rem; border-radius: 12px; cursor: pointer; font-size: 1rem;">
                        👍 Друг
                    </button>
                    <button onclick="handleFriendFoeChoice('${currentScenario.type}', 'foe')" 
                            style="background: #ef4444; color: white; border: none; padding: 1rem 2rem; border-radius: 12px; cursor: pointer; font-size: 1rem;">
                        👎 Чужой
                    </button>
                </div>
            </div>
        </div>
    `;
}

function handleFriendFoeChoice(correctType, userChoice) {
    if (correctType === userChoice) {
        currentGameState.score += 5;
        showGameResult('✅ Правильно!', userChoice === 'friend' ? 'Этот персонаж безопасен для общения!' : 'Это незнакомец - не общайся с ним!');
    } else {
        showGameResult('❌ Осторожно!', userChoice === 'friend' ? 'Это незнакомец - не доверяй ему!' : 'Этот персонаж безопасен для общения!');
    }
}

// Игра 3: Копилка-мечта
function renderPiggyBankGame() {
    const goal = 'Новая кукла';
    const goalPrice = 5;
    const currentSavings = Math.min(currentGameState.score, goalPrice);
    
    return `
        <div style="text-align: center;">
            <h3 style="color: #1f2937; margin-bottom: 1rem;">Цель: ${goal} (${goalPrice} монет)</h3>
            
            <div style="position: relative; margin: 2rem auto; width: 200px;">
                <!-- Копилка -->
                <div style="background: #fbbf24; width: 150px; height: 180px; border-radius: 75px 75px 20px 20px; margin: 0 auto; position: relative; border: 4px solid #d97706;">
                    <div style="background: #d97706; width: 30px; height: 10px; border-radius: 15px; position: absolute; top: -10px; left: 60px;"></div>
                    <!-- Монетки внутри -->
                    ${Array.from({length: currentSavings}, (_, i) => `
                        <div style="position: absolute; background: #fbbf24; border: 2px solid #d97706; border-radius: 50%; width: 30px; height: 30px; 
                                    bottom: ${20 + i * 15}px; left: ${60 + Math.sin(i) * 10}px;"></div>
                    `).join('')}
                </div>
            </div>
            
            <div style="margin: 1rem 0;">
                <div style="background: #e5e7eb; height: 20px; border-radius: 10px; margin: 1rem auto; max-width: 300px;">
                    <div style="background: #10b981; height: 100%; border-radius: 10px; width: ${(currentSavings / goalPrice) * 100}%; transition: width 0.5s;"></div>
                </div>
                <p>Накоплено: ${currentSavings} из ${goalPrice} монет</p>
            </div>
            
            <button onclick="addCoinToPiggyBank()" 
                    style="background: #f59e0b; color: white; border: none; padding: 1rem 2rem; border-radius: 12px; cursor: pointer; font-size: 1.125rem; margin: 1rem;">
                💰 Положить монетку
            </button>
            
            ${currentSavings >= goalPrice ? `
                <button onclick="completePiggyBankGame()" 
                        style="background: #10b981; color: white; border: none; padding: 1rem 2rem; border-radius: 12px; cursor: pointer; font-size: 1.125rem;">
                    🎁 Купить ${goal}!
                </button>
            ` : ''}
        </div>
    `;
}

function addCoinToPiggyBank() {
    currentGameState.score += 1;
    renderGame();
}

function completePiggyBankGame() {
    showGameResult('🎉 Ура! Ты накопил на куклу!', 'Отличная работа! Терпение и регулярные накопления помогают достигать целей.');
}

// Игра 4: Выбор: сейчас или потом?
function renderChoiceGame() {
    const choices = [
        { now: '🍫 Шоколадка (1 монета)', later: '🎮 Новая игра (5 монет)', correct: 'later' },
        { now: '🍭 Леденец (1 монета)', later: '🧸 Плюшевый мишка (3 монеты)', correct: 'later' },
        { now: '🎈 Воздушный шарик (1 монета)', later: '📚 Красивая книга (4 монеты)', correct: 'later' }
    ];
    
    const currentChoice = choices[Math.floor(Math.random() * choices.length)];
    
    return `
        <div style="text-align: center;">
            <h3 style="color: #1f2937; margin-bottom: 2rem;">Что ты выберешь?</h3>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; max-width: 500px; margin: 0 auto;">
                <div style="background: #fef3c7; border: 3px solid #f59e0b; border-radius: 16px; padding: 2rem; cursor: pointer;" 
                     onclick="handleChoice('now', '${currentChoice.correct}')">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">${currentChoice.now.split(' ')[0]}</div>
                    <h4>СЕЙЧАС</h4>
                    <p style="color: #92400e;">${currentChoice.now}</p>
                </div>
                
                <div style="background: #d1fae5; border: 3px solid #10b981; border-radius: 16px; padding: 2rem; cursor: pointer;" 
                     onclick="handleChoice('later', '${currentChoice.correct}')">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">${currentChoice.later.split(' ')[0]}</div>
                    <h4>ПОТОМ</h4>
                    <p style="color: #065f46;">${currentChoice.later}</p>
                </div>
            </div>
            
            <p style="color: #6b7280; margin-top: 2rem;">Иногда лучше подождать и купить то, что действительно хочешь!</p>
        </div>
    `;
}

function handleChoice(userChoice, correctChoice) {
    if (userChoice === correctChoice) {
        currentGameState.score += 8;
        showGameResult('✅ Правильный выбор!', 'Терпение вознаграждается! Скоро у тебя будет замечательная вещь.');
    } else {
        showGameResult('🤔 Подумай еще...', 'Маленькие покупки мешают накопить на что-то действительно важное.');
    }
}

// Игра 5: Ничего не бери у незнакомца
function renderStrangerDangerGame() {
    const items = ['🍬 Конфета', '🎁 Подарок', '📱 Телефон', '🧸 Игрушка'];
    const dangerousItems = items.slice(0, 2); // Первые два предмета опасны
    
    return `
        <div style="text-align: center;">
            <h3 style="color: #1f2937; margin-bottom: 1rem;">Незнакомец предлагает тебе:</h3>
            <p style="color: #6b7280; margin-bottom: 2rem;">Нажимай только на кнопку "Убегу к маме!"</p>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; max-width: 400px; margin: 0 auto 2rem;">
                ${items.map(item => `
                    <button onclick="handleStrangerItem('${item}')" 
                            style="background: #ef4444; color: white; border: none; padding: 1.5rem; border-radius: 12px; cursor: pointer; font-size: 1.125rem;">
                        ${item}
                    </button>
                `).join('')}
            </div>
            
            <button onclick="handleStrangerEscape()" 
                    style="background: #10b981; color: white; border: none; padding: 1.5rem 2rem; border-radius: 12px; cursor: pointer; font-size: 1.125rem;">
                🏃‍♂️ Убегу к маме!
            </button>
        </div>
    `;
}

function handleStrangerItem(item) {
    showGameResult('❌ Опасно!', `Никогда не бери ${item.toLowerCase()} у незнакомца!`);
}

function handleStrangerEscape() {
    currentGameState.score += 10;
    showGameResult('✅ Молодец!', 'Правильно! Всегда убегай к родителям, если незнакомец что-то предлагает.');
}

// Игра 6: Подозрительный звонок
function renderPhoneCallGame() {
    return `
        <div style="text-align: center;">
            <div style="background: #1f2937; color: white; border-radius: 20px; padding: 2rem; margin: 2rem auto; max-width: 400px;">
                <div style="font-size: 2rem; margin-bottom: 1rem;">📞</div>
                <h3 style="margin-bottom: 1rem;">Входящий звонок</h3>
                <p style="opacity: 0.8; margin-bottom: 2rem;">Незнакомый номер</p>
                
                <div style="background: #374151; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem;">
                    <p style="font-style: italic;">"Алло! Это папин друг. Папа попросил передать, чтобы ты назвал номер его банковской карты."</p>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <button onclick="handlePhoneResponse('wrong')" 
                            style="background: #ef4444; color: white; border: none; padding: 1rem; border-radius: 8px; cursor: pointer;">
                        "Вот номер: 1234 5678 9012 3456"
                    </button>
                    <button onclick="handlePhoneResponse('correct')" 
                            style="background: #10b981; color: white; border: none; padding: 1rem; border-radius: 8px; cursor: pointer;">
                        "Я сейчас спрошу у родителей"
                    </button>
                </div>
            </div>
        </div>
    `;
}

function handlePhoneResponse(choice) {
    if (choice === 'correct') {
        currentGameState.score += 10;
        showGameResult('✅ Правильно!', 'Всегда зови родителей, если незнакомец просит личную информацию!');
    } else {
        showGameResult('❌ Опасно!', 'Никогда не сообщай номера карт и другую личную информацию незнакомцам!');
    }
}

// Игра 7: Нужно vs Хочется
function renderNeedsWantsGame() {
    const items = [
        { name: '🍞 Хлеб', type: 'need' },
        { name: '🥛 Молоко', type: 'need' },
        { name: '🚗 Машинка', type: 'want' },
        { name: '🎮 Игра', type: 'want' },
        { name: '👕 Футболка', type: 'need' },
        { name: '🍬 Конфеты', type: 'want' }
    ].sort(() => Math.random() - 0.5);
    
    return `
        <div style="text-align: center;">
            <h3 style="color: #1f2937; margin-bottom: 2rem;">Разложи покупки по корзинам</h3>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                <div style="background: #d1fae5; border: 3px solid #10b981; border-radius: 16px; padding: 1.5rem; min-height: 200px;">
                    <h4>✅ НУЖНО</h4>
                    <p style="color: #065f46;">Для жизни и здоровья</p>
                    <div id="needs-basket" style="min-height: 100px; margin-top: 1rem;"></div>
                </div>
                
                <div style="background: #fef3c7; border: 3px solid #f59e0b; border-radius: 16px; padding: 1.5rem; min-height: 200px;">
                    <h4>🎁 ХОЧЕТСЯ</h4>
                    <p style="color: #92400e;">Для радости и развлечений</p>
                    <div id="wants-basket" style="min-height: 100px; margin-top: 1rem;"></div>
                </div>
            </div>
            
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 2rem;">
                ${items.map(item => `
                    <button onclick="sortItem('${item.name}', '${item.type}')" 
                            style="background: white; border: 2px solid #e5e7eb; padding: 1rem; border-radius: 8px; cursor: pointer;">
                        ${item.name}
                    </button>
                `).join('')}
            </div>
            
            <button onclick="checkNeedsWantsSorting()" 
                    style="background: #8b5cf6; color: white; border: none; padding: 1rem 2rem; border-radius: 12px; cursor: pointer;">
                Проверить
            </button>
        </div>
    `;
}

let sortedItems = { needs: [], wants: [] };

function sortItem(itemName, correctType) {
    const item = itemName.split(' ')[1] ? itemName.split(' ')[1] : itemName;
    
    if (correctType === 'need') {
        sortedItems.needs.push(item);
        document.getElementById('needs-basket').innerHTML += `<div style="background: #a7f3d0; padding: 0.5rem; margin: 0.25rem; border-radius: 6px;">${itemName}</div>`;
    } else {
        sortedItems.wants.push(item);
        document.getElementById('wants-basket').innerHTML += `<div style="background: #fde68a; padding: 0.5rem; margin: 0.25rem; border-radius: 6px;">${itemName}</div>`;
    }
}

function checkNeedsWantsSorting() {
    const needsCount = sortedItems.needs.length;
    const wantsCount = sortedItems.wants.length;
    
    if (needsCount >= 2 && wantsCount >= 2) {
        currentGameState.score += 12;
        showGameResult('🎉 Отлично!', 'Ты правильно понял разницу между необходимыми и желаемыми покупками!');
    } else {
        showGameResult('🤔 Почти получилось!', 'Попробуй еще раз. "Нужно" - это то, без чего нельзя обойтись, "Хочется" - то, что можно отложить.');
    }
    sortedItems = { needs: [], wants: [] };
}

// Игра 8: Семейный бюджет на неделю
function renderBudgetGame() {
    const totalMoney = 10;
    const categories = [
        { name: '🍎 Еда', recommended: 5, spent: 0 },
        { name: '🚌 Транспорт', recommended: 2, spent: 0 },
        { name: '🎁 Развлечения', recommended: 3, spent: 0 }
    ];
    
    return `
        <div style="text-align: center;">
            <h3 style="color: #1f2937; margin-bottom: 1rem;">У тебя есть ${totalMoney} монет на неделю</h3>
            <p style="color: #6b7280; margin-bottom: 2rem;">Распредели деньги по категориям</p>
            
            <div style="display: grid; gap: 1rem; max-width: 400px; margin: 0 auto 2rem;">
                ${categories.map((category, index) => `
                    <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 1.5rem;">
                        <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 1rem;">
                            <span style="font-weight: 600;">${category.name}</span>
                            <span style="color: #6b7280;">Рекомендуется: ${category.recommended} монет</span>
                        </div>
                        <div style="display: flex; gap: 0.5rem; justify-content: center;">
                            ${[1, 2, 3, 4, 5].map(amount => `
                                <button onclick="allocateMoney(${index}, ${amount})" 
                                        style="background: #8b5cf6; color: white; border: none; width: 40px; height: 40px; border-radius: 8px; cursor: pointer;">
                                    ${amount}
                                </button>
                            `).join('')}
                        </div>
                        <div style="margin-top: 1rem;">
                            <span>Потрачено: </span>
                            <span id="spent-${index}" style="font-weight: 600;">${category.spent}</span>
                            <span> монет</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div style="margin-bottom: 2rem;">
                <p>Осталось монет: <span id="remaining-money" style="font-weight: 600;">${totalMoney}</span></p>
            </div>
            
            <button onclick="checkBudgetAllocation()" 
                    style="background: #8b5cf6; color: white; border: none; padding: 1rem 2rem; border-radius: 12px; cursor: pointer;">
                Готово
            </button>
        </div>
    `;
}

let budgetState = {
    remaining: 10,
    categories: [
        { name: '🍎 Еда', recommended: 5, spent: 0 },
        { name: '🚌 Транспорт', recommended: 2, spent: 0 },
        { name: '🎁 Развлечения', recommended: 3, spent: 0 }
    ]
};

function allocateMoney(categoryIndex, amount) {
    if (budgetState.remaining >= amount) {
        budgetState.categories[categoryIndex].spent += amount;
        budgetState.remaining -= amount;
        
        document.getElementById(`spent-${categoryIndex}`).textContent = budgetState.categories[categoryIndex].spent;
        document.getElementById('remaining-money').textContent = budgetState.remaining;
    }
}

function checkBudgetAllocation() {
    let score = 0;
    budgetState.categories.forEach(category => {
        if (Math.abs(category.spent - category.recommended) <= 1) {
            score += 3;
        }
    });
    
    if (score >= 6) {
        currentGameState.score += score;
        showGameResult('💰 Отличное планирование!', 'Ты хорошо распределил бюджет! Так нужно делать и в реальной жизни.');
    } else {
        showGameResult('📊 Хорошая попытка!', 'Попробуй распределить деньги более равномерно согласно рекомендациям.');
    }
    
    // Сброс состояния
    budgetState = {
        remaining: 10,
        categories: [
            { name: '🍎 Еда', recommended: 5, spent: 0 },
            { name: '🚌 Транспорт', recommended: 2, spent: 0 },
            { name: '🎁 Развлечения', recommended: 3, spent: 0 }
        ]
    };
}

// Игра 9: Создай безопасного персонажа
function renderSafeCharacterGame() {
    return `
        <div style="text-align: center;">
            <h3 style="color: #1f2937; margin-bottom: 2rem;">Создай персонажа для онлайн-игры</h3>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; max-width: 500px; margin: 0 auto;">
                <!-- Выбор ника -->
                <div style="text-align: left;">
                    <h4 style="color: #1f2937; margin-bottom: 1rem;">Выбери имя:</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <button onclick="selectName('super_cat')" style="background: white; border: 2px solid #e5e7eb; padding: 1rem; border-radius: 8px; cursor: pointer; text-align: left;">
                            🐱 Super_Cat
                        </button>
                        <button onclick="selectName('masha_ivanova')" style="background: white; border: 2px solid #e5e7eb; padding: 1rem; border-radius: 8px; cursor: pointer; text-align: left;">
                            👧 Маша_Иванова
                        </button>
                    </div>
                </div>
                
                <!-- Выбор аватара -->
                <div style="text-align: left;">
                    <h4 style="color: #1f2937; margin-bottom: 1rem;">Выбери аватар:</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <button onclick="selectAvatar('robot')" style="background: white; border: 2px solid #e5e7eb; padding: 1rem; border-radius: 8px; cursor: pointer; text-align: left;">
                            🤖 Робот
                        </button>
                        <button onclick="selectAvatar('photo')" style="background: white; border: 2px solid #e5e7eb; padding: 1rem; border-radius: 8px; cursor: pointer; text-align: left;">
                            📸 Моя фотография
                        </button>
                    </div>
                </div>
            </div>
            
            <div id="character-preview" style="background: #f8fafc; border-radius: 16px; padding: 2rem; margin: 2rem auto; max-width: 300px;">
                <p style="color: #6b7280;">Твой персонаж появится здесь...</p>
            </div>
            
            <button onclick="checkSafeCharacter()" 
                    style="background: #8b5cf6; color: white; border: none; padding: 1rem 2rem; border-radius: 12px; cursor: pointer;">
                Создать персонажа
            </button>
        </div>
    `;
}

let characterChoices = { name: null, avatar: null };

function selectName(name) {
    characterChoices.name = name;
    updateCharacterPreview();
}

function selectAvatar(avatar) {
    characterChoices.avatar = avatar;
    updateCharacterPreview();
}

function updateCharacterPreview() {
    const preview = document.getElementById('character-preview');
    if (characterChoices.name && characterChoices.avatar) {
        const avatarEmoji = characterChoices.avatar === 'robot' ? '🤖' : '👧';
        const nameText = characterChoices.name === 'super_cat' ? 'Super_Cat' : 'Маша_Иванова';
        
        preview.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">${avatarEmoji}</div>
                <h4 style="color: #1f2937;">${nameText}</h4>
            </div>
        `;
    }
}

function checkSafeCharacter() {
    if (characterChoices.name === 'super_cat' && characterChoices.avatar === 'robot') {
        currentGameState.score += 10;
        showGameResult('✅ Безопасный персонаж!', 'Отлично! Не используй настоящие имя и фото в интернете.');
    } else {
        showGameResult('❌ Опасно!', 'Нельзя использовать настоящее имя и фотографию в онлайн-играх!');
    }
    characterChoices = { name: null, avatar: null };
}

// Игра 10: Опасное сообщение в чате
function renderChatSafetyGame() {
    return `
        <div style="text-align: center;">
            <h3 style="color: #1f2937; margin-bottom: 2rem;">Найди опасное сообщение в чате</h3>
            
            <div style="background: #1f2937; color: white; border-radius: 16px; padding: 2rem; max-width: 400px; margin: 0 auto 2rem;">
                <div style="text-align: left;">
                    <div style="background: #374151; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                        <strong>Super_Cat:</strong> Привет! Кто хочет вместе поиграть?
                    </div>
                    <div style="background: #374151; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                        <strong>Game_Lover:</strong> Отличная игра! Мне нравятся персонажи.
                    </div>
                    <div id="dangerous-message" style="background: #ef4444; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; cursor: pointer;" onclick="catchDangerousMessage()">
                        <strong>Stranger123:</strong> Привет! Давай встретимся в парке? Я в красной куртке.
                    </div>
                    <div style="background: #374151; padding: 1rem; border-radius: 8px;">
                        <strong>Happy_Player:</strong> Я прошел 5 уровень! 🎉
                    </div>
                </div>
            </div>
            
            <p style="color: #6b7280;">Нажми на опасное сообщение, чтобы его заблокировать</p>
        </div>
    `;
}

function catchDangerousMessage() {
    currentGameState.score += 10;
    document.getElementById('dangerous-message').style.background = '#10b981';
    document.getElementById('dangerous-message').innerHTML = '<strong>Stranger123:</strong> ❌ СООБЩЕНИЕ ЗАБЛОКИРОВАНО';
    document.getElementById('dangerous-message').style.cursor = 'default';
    
    setTimeout(() => {
        showGameResult('✅ Молодец!', 'Ты правильно определил опасное сообщение! Никогда не соглашайся на встречи с незнакомцами из интернета.');
    }, 1000);
}

// Игра 11: Угадай профессию
function renderProfessionsGame() {
    const professions = [
        { name: '👨‍⚕️ Врач', tool: '💊 Лекарства' },
        { name: '👨‍🚒 Пожарный', tool: '🚒 Пожарная машина' },
        { name: '👨‍🏫 Учитель', tool: '📚 Книги' },
        { name: '👨‍🌾 Фермер', tool: '🚜 Трактор' }
    ].sort(() => Math.random() - 0.5);
    
    const tools = professions.map(p => p.tool).sort(() => Math.random() - 0.5);
    
    return `
        <div style="text-align: center;">
            <h3 style="color: #1f2937; margin-bottom: 2rem;">Соедини профессию с инструментом</h3>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; max-width: 500px; margin: 0 auto 2rem;">
                <div>
                    <h4 style="color: #1f2937; margin-bottom: 1rem;">Профессии:</h4>
                    ${professions.map(prof => `
                        <div style="background: white; border: 2px solid #e5e7eb; padding: 1rem; margin: 0.5rem 0; border-radius: 8px;">
                            ${prof.name}
                        </div>
                    `).join('')}
                </div>
                
                <div>
                    <h4 style="color: #1f2937; margin-bottom: 1rem;">Инструменты:</h4>
                    ${tools.map(tool => `
                        <div style="background: white; border: 2px solid #e5e7eb; padding: 1rem; margin: 0.5rem 0; border-radius: 8px; cursor: pointer;" 
                             onclick="matchProfession('${tool}')">
                            ${tool}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div id="matching-result" style="min-height: 60px;"></div>
        </div>
    `;
}

let matchedPairs = 0;
const totalPairs = 4;

function matchProfession(tool) {
    // В упрощенной версии считаем, что любое нажатие - правильный ответ
    matchedPairs++;
    document.getElementById('matching-result').innerHTML = `
        <div style="background: #d1fae5; color: #065f46; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
            ✅ Правильно! ${tool} - важный инструмент для работы.
        </div>
    `;
    
    if (matchedPairs >= totalPairs) {
        setTimeout(() => {
            currentGameState.score += 8;
            showGameResult('🎉 Отлично!', 'Ты знаешь много профессий! Люди разных профессий зарабатывают деньги своим трудом.');
        }, 1000);
    }
}

// Игра 12: Магазин
function renderShopGame() {
    const products = [
        { name: '🍎 Яблоко', price: 1 },
        { name: '🍞 Хлеб', price: 2 },
        { name: '🥛 Молоко', price: 3 }
    ];
    
    const playerMoney = 5;
    
    return `
        <div style="text-align: center;">
            <h3 style="color: #1f2937; margin-bottom: 1rem;">У тебя есть ${playerMoney} монет</h3>
            <p style="color: #6b7280; margin-bottom: 2rem;">Выбери, что хочешь купить</p>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;">
                ${products.map(product => `
                    <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 1.5rem; cursor: pointer;" 
                         onclick="buyProduct('${product.name}', ${product.price}, ${playerMoney})">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">${product.name}</div>
                        <div style="color: #8b5cf6; font-weight: 600;">${product.price} монета</div>
                    </div>
                `).join('')}
            </div>
            
            <div id="shop-result"></div>
        </div>
    `;
}

function buyProduct(productName, price, playerMoney) {
    const resultDiv = document.getElementById('shop-result');
    
    if (price <= playerMoney) {
        const change = playerMoney - price;
        currentGameState.score += 5;
        
        resultDiv.innerHTML = `
            <div style="background: #d1fae5; color: #065f46; padding: 1.5rem; border-radius: 12px;">
                <h4>✅ Успешная покупка!</h4>
                <p>Ты купил ${productName} за ${price} монет</p>
                <p>Сдача: ${change} монет</p>
            </div>
        `;
        
        setTimeout(() => {
            showGameResult('🛒 Отлично!', 'Ты правильно рассчитал деньги и получил сдачу! Так нужно делать в настоящем магазине.');
        }, 2000);
    } else {
        resultDiv.innerHTML = `
            <div style="background: #fef2f2; color: #dc2626; padding: 1.5rem; border-radius: 12px;">
                <h4>❌ Не хватает денег</h4>
                <p>Тебе не хватает ${price - playerMoney} монет для покупки ${productName}</p>
            </div>
        `;
    }
}

// Общая функция для показа результатов игры
function showGameResult(title, message) {
    const modal = document.getElementById('gameModal');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <div class="game-content" style="text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">${title.includes('✅') || title.includes('🎉') ? '🎉' : '🤔'}</div>
            <h2 style="color: #1f2937; margin-bottom: 1rem;">${title}</h2>
            <p style="color: #6b7280; font-size: 1.125rem; margin-bottom: 2rem;">${message}</p>
            
            <div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem;">
                <h4 style="color: #1f2937; margin-bottom: 0.5rem;">Твои очки: ${currentGameState.score}</h4>
                <p style="color: #6b7280;">Продолжай играть и зарабатывать больше очков!</p>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="openGameModal('${currentGameState.topic}')" 
                        style="background: #6b7280; color: white; border: none; padding: 1rem 2rem; border-radius: 12px; cursor: pointer;">
                    Выбрать другую игру
                </button>
                <button onclick="startTest('${currentGameState.topic}')" 
                        style="background: #8b5cf6; color: white; border: none; padding: 1rem 2rem; border-radius: 12px; cursor: pointer;">
                    Пройти тест
                </button>
            </div>
        </div>
    `;
}

// Остальные функции (startTest, closeGameModal и т.д.) остаются без изменений
// ... (все остальные функции из предыдущей версии)

function startTest(topic) {
    const modal = document.getElementById('gameModal');
    const content = document.getElementById('modalContent');
    const topicData = gameData[topic];
    let selectedAnswer = null;
    
    function updateTest() {
        content.innerHTML = `
            <div class="game-content">
                <h2>Проверь знания!</h2>
                <p style="font-size: 1.125rem; margin-bottom: 2rem; color: #374151;">${topicData.test.question}</p>
                
                <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
                    ${topicData.test.options.map((option, index) => `
                        <button onclick="selectAnswer(${index})" 
                                style="text-align: left; padding: 1.5rem; border: 2px solid ${selectedAnswer === index ? (option.correct ? '#10b981' : '#ef4444') : '#e5e7eb'}; 
                                       background: ${selectedAnswer === index ? (option.correct ? '#d1fae5' : '#fef2f2') : 'white'}; 
                                       border-radius: 12px; cursor: pointer; transition: all 0.3s;">
                            ${option.text}
                        </button>
                    `).join('')}
                </div>
                
                ${selectedAnswer !== null ? `
                    <div style="background: ${topicData.test.options[selectedAnswer].correct ? '#d1fae5' : '#fef2f2'}; 
                                border: 2px solid ${topicData.test.options[selectedAnswer].correct ? '#10b981' : '#ef4444'}; 
                                border-radius: 12px; padding: 1.5rem; margin: 1rem 0;">
                        <h4 style="color: ${topicData.test.options[selectedAnswer].correct ? '#065f46' : '#991b1b'}; margin-bottom: 0.5rem;">
                            ${topicData.test.options[selectedAnswer].correct ? '✅ Правильно!' : '❌ Попробуй еще раз!'}
                        </h4>
                        <p style="color: ${topicData.test.options[selectedAnswer].correct ? '#065f46' : '#991b1b'};">
                            ${topicData.test.options[selectedAnswer].correct ? 
                                'Ты отлично понял тему!' : 
                                'Давай подумаем еще... Помни: ' + topicData.test.options.find(opt => opt.correct)?.text}
                        </p>
                    </div>
                    
                    <button onclick="closeGameModal()" 
                            style="width: 100%; background: #8b5cf6; color: white; border: none; padding: 1rem; border-radius: 12px; cursor: pointer; font-weight: 600; margin-top: 1rem;">
                        Продолжить
                    </button>
                ` : ''}
            </div>
        `;
    }
    
    window.selectAnswer = (index) => {
        selectedAnswer = index;
        updateTest();
    };
    
    updateTest();
}

function closeGameModal() {
    const modal = document.getElementById('gameModal');
    modal.style.display = 'none';
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('gameModal');
    if (event.target === modal) {
        closeGameModal();
    }
}

// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применяем анимацию к карточкам
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.game-card, .advice-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
