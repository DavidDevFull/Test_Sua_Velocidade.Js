const body = document.querySelector('body');
const labels = document.querySelectorAll('.div_H3_Lbls div label');
const p_Text_Ramdom = document.getElementById('p_Text_Ramdom');
const text_Area_User = document.getElementById('text_Area_User');
const span_Timer = document.getElementById('span_Timer');
const span_Record_Current = document.getElementById('span_Record_Current');
const btn_Reset = document.getElementById('btn_Reset');
const btn_Theme_Dark_Of_Course = document.getElementById('btn_Theme_Dark_Of_Course');
const img_Button_Theme_Dark_Of_Course = document.querySelector('#btn_Theme_Dark_Of_Course img');

let timer = [0, 0, 0, 0];
let interval;
let timer_Running = false;
let best_Time = localStorage.getItem('best_Time') || null;

const texts = [
    'A inteligência artificial evoluiu rapidamente, impactando setores como saúde, finanças e automação. Com algoritmos avançados, máquinas agora aprendem e tomam decisões, moldando o futuro da tecnologia e do trabalho humano.',
    'Criada inicialmente para fins militares nos anos 60, a internet revolucionou a comunicação global. Com a popularização na década de 90, transformou a forma como acessamos informação, trabalhamos e interagimos digitalmente.',
    'A computação evoluiu do ábaco para processadores ultrarrápidos. Hoje, os computadores quânticos prometem resolver problemas impossíveis para máquinas tradicionais, abrindo novas possibilidades para ciência e inovação.',
    'Desde o primeiro celular até os smartphones ultramodernos, os dispositivos móveis redefiniram a conectividade. Aplicativos, inteligência artificial e redes 5G tornam a comunicação mais rápida e eficiente, moldando nosso cotidiano.',
    'De linguagens primitivas como Assembly até frameworks avançados, a programação impulsionou a tecnologia. Hoje, inteligência artificial, cloud computing e desenvolvimento ágil aceleram a inovação e criam soluções digitais revolucionárias.'
];

// Função para formatar tempo corretamente
function leading_Zero(time) {
    return time <= 9 ? '0' + time : time;
}

// Função que inicia o tempo
function run_Timer() {
    let current_Timer = `${leading_Zero(timer[0])}:${leading_Zero(timer[1])}:${leading_Zero(timer[2])}`;
    span_Timer.innerHTML = current_Timer;

    timer[3]++;
    timer[0] = Math.floor((timer[3] / 100) / 60);
    timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Função para verificar o texto digitado
function spell_Check() {
    const userText = text_Area_User.value;
    const targetText = p_Text_Ramdom.textContent;

    if (userText === targetText) {
        text_Area_User.style.borderColor = '#429890'; // Verde para borda
        labels[0].style.background = '#429890'; // Label verde
        labels[1].style.background = '#8d8a8a'; // Outros cinza
        labels[2].style.background = '#8d8a8a';
        clearInterval(interval);
        save_Status(); // Salva o recorde ao finalizar
    } 
    else if (targetText.startsWith(userText) && userText.length > 0) {
        text_Area_User.style.borderColor = '#6babff'; // Azul para borda
        labels[0].style.background = '#8d8a8a'; // Outros cinza
        labels[1].style.background = '#6babff'; // Label azul
        labels[2].style.background = '#8d8a8a';
    } 
    else {
        text_Area_User.style.borderColor = '#FF6B6B'; // Vermelho para borda
        labels[0].style.background = '#8d8a8a'; // Outros cinza
        labels[1].style.background = '#8d8a8a';
        labels[2].style.background = '#FF6B6B'; // Label vermelho
    }
}

// Função para iniciar o temporizador
function start() {
    if (!timer_Running) {
        timer_Running = true;
        interval = setInterval(run_Timer, 10);
    }
}

// Função para resetar o jogo
function reset() {
    clearInterval(interval);
    timer = [0, 0, 0, 0];
    timer_Running = false;

    text_Area_User.value = '';
    span_Timer.innerHTML = '00:00:00';
    text_Area_User.style.borderColor = '#9b9b9b';

    labels.forEach(label => label.style.background = '#8d8a8a'); // Reseta as cores das labels

    let text_Current = texts[Math.floor(Math.random() * texts.length)];
    p_Text_Ramdom.textContent = text_Current;
}

// Função para salvar o melhor tempo
function save_Status() {
    let current_Time = span_Timer.textContent.replace(/:/g, '');
    
    if (!best_Time || Number(current_Time) < Number(best_Time.replace(/:/g, ''))) {
        localStorage.setItem('best_Time', span_Timer.textContent);
        best_Time = span_Timer.textContent;
        span_Record_Current.textContent = `${best_Time} 🎉 Novo recorde!`;
    }
}

// Atualiza o recorde salvo ao carregar a página
span_Record_Current.textContent = best_Time ? best_Time : 'Faça um record.';

// Função para trocar o tema
function replacement_Dark_Of_Course() {
    let current_Theme = body.classList.contains('dark_Theme') ? 'of_Course_Theme' : 'dark_Theme';

    body.classList.remove('of_Course_Theme', 'dark_Theme');
    body.classList.add(current_Theme);

    img_Button_Theme_Dark_Of_Course.src = current_Theme === 'dark_Theme' ? 'image/forma-de-meia-lua.png' : 'image/brilho-do-sol.png';

    localStorage.setItem('theme', current_Theme);
}

// Aplica o tema salvo ao carregar a página
function applySavedTheme() {
    let saved_Theme = localStorage.getItem('theme') || 'of_Course_Theme';
    body.classList.add(saved_Theme);
}

// Bloqueia ações de trapaça (copiar, colar, cortar)
function block_Cheating_Actions(element) {
    element.addEventListener("cut", (event) => {
        event.preventDefault();
        alert("❌ Cortar texto não é permitido!");
    });

    element.addEventListener("drop", (event) => {
        event.preventDefault();
        alert("❌ Arrastar o texto não é permitido!");
    });
}

// Adiciona eventos
text_Area_User.addEventListener('input', start, false);
text_Area_User.addEventListener('keyup', spell_Check, false);
btn_Reset.addEventListener('click', reset, false);
btn_Theme_Dark_Of_Course.addEventListener('click', replacement_Dark_Of_Course);

// Bloqueia trapaças nos elementos
block_Cheating_Actions(p_Text_Ramdom);
block_Cheating_Actions(text_Area_User);
block_Cheating_Actions(body);

applySavedTheme();