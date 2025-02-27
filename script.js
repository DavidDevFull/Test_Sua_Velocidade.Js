const body = document.querySelector('body');
const labels = document.querySelectorAll('.div_H3_Lbls div label');
const p_Text_Random = document.getElementById('p_Text_Random');
const text_Area_User = document.getElementById('text_Area_User');
const span_Timer = document.getElementById('span_Timer');
const span_Record_Current = document.getElementById('span_Record_Current');
const btn_Reset = document.getElementById('btn_Reset');

let timer = [0, 0, 0, 0];
let interval;
let timer_Running = false;
let best_Time = localStorage.getItem('best_Time') || null;

const texts = [
    'A revolução industrial trouxe as primeiras máquinas automatizadas, mudando a produção global. No século XX, a computação emergiu, permitindo avanços tecnológicos que impulsionaram a era digital e transformaram indústrias inteiras.',
    'O primeiro computador moderno, ENIAC, surgiu nos anos 40, marcando o início da computação digital. Desde então, os dispositivos evoluíram, tornando-se menores, mais rápidos e acessíveis, impulsionando a sociedade da informação.',
    'A criação do transistor em 1947 revolucionou a eletrônica, permitindo o desenvolvimento de computadores compactos. Esse avanço possibilitou o surgimento de processadores poderosos e a evolução da informática até os dias atuais.',
    'O surgimento da internet nos anos 60, inicialmente militar, evoluiu para conectar o mundo. Hoje, redes sociais, streaming e serviços em nuvem transformam a comunicação, o trabalho e o entretenimento digital.',
    'Os primeiros celulares surgiram nos anos 70, mas só se popularizaram nos anos 90. Atualmente, os smartphones integram inteligência artificial e conectividade 5G, redefinindo a interação digital e a mobilidade tecnológica.',
    'Os videogames surgiram nos anos 50 com experimentos acadêmicos, mas ganharam força nos anos 70. Hoje, gráficos avançados e realidade virtual tornam os jogos imersivos, influenciando cultura, educação e economia global.',
    'A robótica industrial começou nos anos 60, otimizando a produção fabril. Atualmente, robôs inteligentes são usados na medicina, segurança e serviços, melhorando a eficiência e criando novas possibilidades para a automação.',
    'A inteligência artificial, idealizada nos anos 50, passou por avanços exponenciais com machine learning e deep learning. Hoje, auxilia na saúde, finanças e tecnologia, transformando a forma como vivemos e trabalhamos.',
    'A computação em nuvem revolucionou o armazenamento e processamento de dados. Antes dependentes de servidores locais, empresas agora acessam serviços escaláveis e seguros, impulsionando a inovação digital e a transformação empresarial.',
    'Blockchain, criado em 2008 para suportar o Bitcoin, evoluiu para além das criptomoedas. Hoje, a tecnologia garante segurança e transparência em transações financeiras, contratos inteligentes e diversos setores da economia digital.'
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
    const user_Text = text_Area_User.value;
    const target_Text = p_Text_Random.textContent;
    

    if (user_Text === target_Text) {
        text_Area_User.style.borderColor = '#429890'; // Verde para borda
        labels[0].style.background = '#429890'; // Label verde
        labels[1].style.background = '#8d8a8a'; // Outros cinza
        labels[2].style.background = '#8d8a8a';
        clearInterval(interval);
        save_Status(); // Salva o recorde ao finalizar
    } 
    else if (target_Text.startsWith(user_Text) && user_Text.length > 0) {
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
    p_Text_Random.textContent = text_Current;
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

// Bloqueia ações de trapaça (copiar, colar, cortar)
function block_Cheating_Actions(element) {
    element.addEventListener("paste", (event) => {
        event.preventDefault();
        alert("❌ Colar texto não é permitido!");
    });
    element.addEventListener("copy", (event) => {
        event.preventDefault();
        alert("❌ Copiar texto não é permitido!");
    });
    element.addEventListener("cut", (event) => {
        event.preventDefault();
        alert("❌ Cortar texto não é permitido!");
    });
    element.addEventListener("drop", (event) => {
        event.preventDefault();
        alert("❌ Arrastar o texto não é permitido!");
    });
    element.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        alert("❌ O botão direito do mouse foi desativado!");
    });
}
// Adiciona eventos
text_Area_User.addEventListener('input', start, false);
text_Area_User.addEventListener('keyup', spell_Check, false);
btn_Reset.addEventListener('click', reset, false);

// Bloqueia trapaças nos elementos
block_Cheating_Actions(p_Text_Random);
block_Cheating_Actions(text_Area_User);
block_Cheating_Actions(body);
