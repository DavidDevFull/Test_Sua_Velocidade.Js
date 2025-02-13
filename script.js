const body = document.querySelector('body')
const p_Text_Ramdom = document.getElementById('p_Text_Ramdom');
const text_Area_User = document.getElementById('text_Area_User');
const span_Timer = document.getElementById('span_Timer');
const span_Record_Current = document.getElementById('span_Record_Current');
const btn_Reset = document.getElementById('btn_Reset');
const btn_Theme_Dark_Of_Course = document.getElementById('btn_Theme_Dark_Of_Course');
const img_Button_Theme_Dark_Of_Course = document.querySelector('#btn_Theme_Dark_Of_Course img')

let timer = [0, 0, 0, 0];
let interval;
let timer_Running = false;

const texts = [
    'A inteligência artificial evoluiu rapidamente, impactando setores como saúde, finanças e automação. Com algoritmos avançados, máquinas agora aprendem e tomam decisões, moldando o futuro da tecnologia e do trabalho humano.',
    'Criada inicialmente para fins militares nos anos 60, a internet revolucionou a comunicação global. Com a popularização na década de 90, transformou a forma como acessamos informação, trabalhamos e interagimos digitalmente.',
    'A computação evoluiu do ábaco para processadores ultrarrápidos. Hoje, os computadores quânticos prometem resolver problemas impossíveis para máquinas tradicionais, abrindo novas possibilidades para ciência e inovação.',
    'Desde o primeiro celular até os smartphones ultramodernos, os dispositivos móveis redefiniram a conectividade. Aplicativos, inteligência artificial e redes 5G tornam a comunicação mais rápida e eficiente, moldando nosso cotidiano.',
    'De linguagens primitivas como Assembly até frameworks avançados, a programação impulsionou a tecnologia. Hoje, inteligência artificial, cloud computing e desenvolvimento ágil aceleram a inovação e criam soluções digitais revolucionárias.'
];
// Função de apoio para que o primeiro numero de cada array seja 0 caso seja menor que 9.
function leading_Zero(time) {
    return time <= 9 ? '0' + time : time;
}
// Função que inicia o tempo.
function run_Timer() {
    let current_Timer = `${leading_Zero(timer[0])}:${leading_Zero(timer[1])}:${leading_Zero(timer[2])}`;
    span_Timer.innerHTML = current_Timer;

    timer[3]++; 
    timer[0] = Math.floor((timer[3] / 100) / 60);
    timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

//Verifica se os valores digitados na caixa de texto é igual, diferente ou se foi completado corretamente.
function spell_Check() {
    let text_Entered = text_Area_User.value;
    let origin_Text = p_Text_Ramdom.textContent;
    let origin_Text_Match = origin_Text.substring(0, text_Entered.length);

    if (text_Entered === origin_Text) {
        clearInterval(interval);
        text_Area_User.style.borderColor = '#429890';
        save_Status();
    } else if (text_Entered === origin_Text_Match) {
        text_Area_User.style.borderColor = '#65ccf3';
    } else {
        text_Area_User.style.borderColor = '#E95d0f';
    }
}
// Função que inicia o timer quando algo for digitado na caixa de texto.
function start() {
    if (text_Area_User.value.length === 0 && !timer_Running) {
        timer_Running = true;
        interval = setInterval(run_Timer, 10);
    }
}
// Função que reseta todos os valores.
function reset() {
    clearInterval(interval);
    interval = 0;
    timer = [0, 0, 0, 0];
    timer_Running = false;

    text_Area_User.value = '';
    span_Timer.innerHTML = '00:00:00';
    text_Area_User.style.borderColor = '#9b9b9b';

    let text_Current = texts[Math.floor(Math.random() * texts.length)];
    p_Text_Ramdom.textContent = text_Current;
}
// Salva o melhor tempo e mostra o record atual do usuário.
function save_Status() {
    let best_Time = localStorage.getItem('best_Time');

    let current_Time = span_Timer.textContent;

    if (!best_Time || Number(current_Time.replace(/:/g, '')) < Number(best_Time.replace(/:/g, ''))) {
        localStorage.setItem('best_Time', current_Time);
        span_Record_Current.textContent = `${current_Time} 🎉 Novo recorde!`;
        console.log(span_Record_Current)
    }
}
// Fução para trocar o tema de fundo
function replacement_Dark_Of_Course(){
    let current_Theme = body.classList.contains('dark_Theme') ? 'of_Course_Theme' :'dark_Theme'; // Valida qual tema está ativo e adiciona no let.

    //Adiciona a classe correta.
    body.classList.remove('of_Course_Theme', 'dark_Theme') // Tema que irá ser removido, validação será feita na linha 85.
    body.classList.add(current_Theme) // Tema atual que será adicionado.

    // Troca a imagem do botão
    if (current_Theme === 'dark_Theme') {
        img_Button_Theme_Dark_Of_Course.src = 'image/forma-de-meia-lua.png'; // Ícone de lua 🌙 (tema escuro)
    } else {
        img_Button_Theme_Dark_Of_Course.src = 'image/brilho-do-sol.png'; // Ícone de sol ☀️ (tema claro)
    }

    // Salva no localStorage
    localStorage.setItem('theme', current_Theme); 
    console.log(`Tema alterado para: ${current_Theme}`);
}
// Aplica o tema salvo ao carregar a página
function applySavedTheme() {
    let save_Theme = localStorage.getItem('theme') || 'of_Course_Theme';
    body.classList.add(save_Theme);
}
// Função para bloquear copia e cola.
function block_Cheating_Actions(element, event){
    element.addEventListener("paste", (event) => {
        event.preventDefault();
        alert("❌ Você não pode colar texto aqui!");
    });

    element.addEventListener("copy", (event) => {
        event.preventDefault();
        alert("❌ Copiar texto também não é permitido!");
    });

    element.addEventListener("cut", (event) => {
        event.preventDefault();
        alert("❌ Cortar texto não é permitido!");
    });

    element.addEventListener("contextmenu", (event) => {
        alert("❌ Não é permitido abrir o menu do navegador.");
        event.preventDefault();
    });

    element.addEventListener("drop", (event) => {
        event.preventDefault();
        alert("❌ Arrastar o texto não é permitido!");
    });
}
// Eventos
text_Area_User.addEventListener('keypress', start, false);
text_Area_User.addEventListener('keyup', spell_Check, false);
btn_Reset.addEventListener('click', reset, false);
btn_Theme_Dark_Of_Course.addEventListener('click', replacement_Dark_Of_Course);
block_Cheating_Actions(p_Text_Ramdom)
block_Cheating_Actions(text_Area_User)
block_Cheating_Actions(body)

applySavedTheme();
