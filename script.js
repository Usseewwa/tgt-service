// ==========================================
// БАЗА ДАННЫХ
// ==========================================
const TODAY = new Date(2026, 10, 15);
const statusMap = ['ОЖИДАНИЕ', 'ДИАГНОСТИКА', 'В РЕМОНТЕ', 'ТЕСТИРОВАНИЕ', 'СБОРКА', 'ЗАВЕРШЕНО'];

// --- Склад ---
const appliances = [
    { id: 'R101-200', name: 'Электрический кухонный комбайн 9 в 1 R101-200, 1500 Вт', img: 'https://mns-basket-cdn-03.geobasket.net/vol2549/part254927/254927148/images/big/1.webp' }
];

let parts = [
    { id: 1, applianceId: 'R101-200', article: 'R-101-32', name: 'Редуктор для кухонного комбайна', img: 'https://mns-basket-cdn-02.geobasket.net/vol10561/part1056176/1056176429/images/c516x688/1.webp', stock: 2, required: 1, expectedQty: 3, expectedDate: '2026-11-20', desc: 'Металлический планетарный редуктор.', note: 'Смазывать литиевой смазкой.', dishwasherSafe: '', dimensions: '12x8x8 см', history: [ { date: '10.11.2026', user: 'Инженер Петров', order: '#2611001-701' } ], waitlist: [ { order: '#2611005-701', user: 'Инженер Иванов', date: '13.11.2026' } ] },
    { id: 2, applianceId: 'R101-200', article: 'R-101-1', name: 'Чаша блендера, 1500 мл', img: 'https://mns-basket-cdn-02.geobasket.net/vol2207/part220762/220762646/images/c516x688/1.webp', stock: 0, required: 3, expectedQty: 0, expectedDate: '', desc: 'Пластиковая чаша 1.5 л.', note: 'Хрупкий пластик.', dishwasherSafe: 'Да', dimensions: '15x15x25 см', history: [], waitlist: [ { order: '#2611002-702', user: 'Инженер Смирнов', date: '12.11.2026' } ] },
    { id: 3, applianceId: 'R101-200', article: '', name: 'Нож для мясорубки', img: 'https://mns-basket-cdn-03.geobasket.net/vol2640/part264083/264083793/images/c516x688/1.webp', stock: 13, required: 2, expectedQty: 0, expectedDate: '', desc: 'Нержавеющая сталь.', note: 'Меняется в паре с решеткой.', dishwasherSafe: 'Да', dimensions: '', history: [ { date: '14.11.2026', user: 'Инженер Иванов', order: '#2611003-701' } ], waitlist: [] },
    { id: 4, applianceId: 'R101-200', article: 'R-101-12', name: 'Насадка пресс 4 в 1', img: 'https://mns-basket-cdn-03.geobasket.net/vol2771/part277104/277104282/images/c516x688/1.webp', stock: 11, required: 0, expectedQty: 0, expectedDate: '', desc: 'Для печенья.', note: '', dishwasherSafe: 'Да', dimensions: '', history: [], waitlist: [] },
    { id: 5, applianceId: 'R101-200', article: 'R-101-19', name: 'Основная плата управления', img: 'https://mns-basket-cdn-04.geobasket.net/vol10561/part1056176/1056176413/images/c516x688/1.webp', stock: 1, required: 0, expectedQty: 0, expectedDate: '', desc: 'Электронная плата.', note: 'Не бросать!', dishwasherSafe: '', dimensions: '', history: [], waitlist: [] },
    { id: 6, applianceId: 'R101-200', article: 'R-101-25', name: 'Зубчатый ремень', img: 'https://mns-basket-cdn-03.geobasket.net/vol2821/part282117/282117717/images/c516x688/1.webp', stock: 5, required: 0, expectedQty: 0, expectedDate: '', desc: 'Ремень привода.', note: '', dishwasherSafe: '', dimensions: '', history: [], waitlist: [] }
];

let modelSpecs = { 'R101-200': [ { key: 'Время непрерывной работы', value: '10 минут (перерыв 5)' }, { key: 'Материал шестеренок', value: 'Металл (усиленный)' }, { key: 'Материал аксессуаров', value: 'Нержавеющая сталь' }, { key: 'Обмотка двигателя', value: 'Медная' }, { key: 'Мощность', value: '1500 Вт' } ] };
let modelNotes = { 'R101-200': "Часто выходит из строя коннектор мясорубки. Проверить деталь R-101-21.\n\nВ последней партии (ноябрь 2026) забыли положить нож для мясорубки!" };

// --- Очередь / Ремонт ---
const orders = [
    { id: '2611001-701', client: 'Иванов И.И.', phone: '+375291112233', device: 'R101-200', sn: '123456789', type: 'warranty', currentStep: 0, dateIn: '15.11.2026', deadline: '29.11.2026', engineer: 'Не назначен', diagnosis: { symptom: '', defect: '', text: '', parts: [] }, stepLogs: {}, history: [ { time: '15.11.2026 09:00', user: 'Приемщик', text: 'Заказ создан.' } ] },
    { id: '2611002-701', client: 'Петров П.П.', phone: '+375292223344', device: 'R101-200', sn: '987654321', type: 'paid', currentStep: 1, dateIn: '15.11.2026', deadline: '25.11.2026', engineer: 'Инженер Смирнов', diagnosis: { symptom: '', defect: '', text: '', parts: [] }, stepLogs: {}, history: [] },
    { id: '2611003-701', client: 'Сидоров С.С.', phone: '+375293334455', device: 'R101-200', sn: '555666777', type: 'paid', currentStep: 2, dateIn: '12.11.2026', deadline: '20.11.2026', engineer: 'Инженер Петров', diagnosis: { symptom: 'T1', defect: 'Сгорел двигатель', text: 'Замена двигателя', parts: [] }, stepLogs: {}, history: [] },
    { id: '2611004-702', client: 'ООО Ромашка', phone: '+375294445566', device: 'R101-200', sn: '111222333', type: 'warranty', currentStep: 3, dateIn: '10.11.2026', deadline: '24.11.2026', engineer: 'Инженер Петров', diagnosis: { symptom: 'T2', defect: 'Износ редуктора', text: 'Замена редуктора', parts: [] }, stepLogs: {}, history: [] },
    { id: '2610998-701', client: 'Смирнов А.А.', phone: '+375295556677', device: 'R101-200', sn: '333444555', type: 'warranty', currentStep: 1, dateIn: '01.11.2026', deadline: '10.11.2026', engineer: 'Инженер Иванов', diagnosis: { symptom: '', defect: '', text: '', parts: [] }, stepLogs: {}, history: [] },
    { id: 'RX-001451', client: 'WB Return', phone: '-', device: 'R101-200', sn: '999888777', type: 'b2b', currentStep: 4, dateIn: '05.11.2026', deadline: 'Без срока', engineer: 'Инженер Петров', diagnosis: { symptom: 'A1', defect: 'Разбита чаша', text: 'Замена чаши', parts: [] }, stepLogs: {}, history: [] },
    { id: 'RX-001452', client: 'Ozon Return', phone: '-', device: 'R101-200', sn: '112233445', type: 'b2b', currentStep: 5, dateIn: '01.11.2026', deadline: 'Без срока', engineer: 'Инженер Смирнов', diagnosis: { symptom: 'A1', defect: 'Разбита чаша', text: 'Замена чаши', parts: [] }, stepLogs: {}, history: [] }
];

const engineerHistoryDB = {
    'Петров И.И.': [ { order: '2610991-701', device: 'R101-200', work: 'Замена двигателя', date: '14.11.2026' }, { order: '2610995-701', device: 'R101-200', work: 'Чистка редуктора', date: '13.11.2026' }, { order: 'RX-001441', device: 'R101-200', work: 'Замена чаши, тест', date: '12.11.2026' } ],
    'Смирнов А.В.': [ { order: '2610988-701', device: 'R101-200', work: 'Замена редуктора', date: '14.11.2026' }, { order: '2610992-701', device: 'R101-200', work: 'Диагностика, замена двигателя', date: '13.11.2026' }, { order: 'RX-001440', device: 'R101-200', work: 'Уценка, замена корпуса', date: '11.11.2026' } ],
    'Иванов С.С.': [ { order: '2610990-701', device: 'R101-200', work: 'Замена чаши блендера', date: '15.11.2026' }, { order: '2610985-702', device: 'R101-200', work: 'Профилактика, смазка', date: '12.11.2026' } ]
};

// === НОВАЯ БАЗА ДЛЯ РЕМОНТА (ВЗЯТА ИЗ SPA) ===
const modelKit = {
    'R101-200': ['Коробка', 'Инструкция', 'Чаша', 'Нож', 'Сетевой шнур']
};

const masterPartsList = [
    { id: 'motor', name: 'Двигатель RageX 500W', img: 'https://mns-basket-cdn-02.geobasket.net/vol10561/part1056176/1056176429/images/c516x688/1.webp' },
    { id: 'gearbox', name: 'Редуктор R-101-32', img: 'https://mns-basket-cdn-02.geobasket.net/vol10561/part1056176/1056176429/images/c516x688/1.webp' },
    { id: 'knife', name: 'Нож для мясорубки', img: 'https://mns-basket-cdn-03.geobasket.net/vol2640/part264083/264083793/images/c516x688/1.webp' },
    { id: 'bowl', name: 'Чаша блендера 1500 мл', img: 'https://mns-basket-cdn-02.geobasket.net/vol2207/part220762/220762646/images/c516x688/1.webp' },
    { id: 'board', name: 'Плата управления', img: 'https://mns-basket-cdn-04.geobasket.net/vol10561/part1056176/1056176413/images/c516x688/1.webp' }
];

let availablePartsDB = {
    'motor': { id: 'motor', name: 'Двигатель RageX 500W', img: 'https://mns-basket-cdn-02.geobasket.net/vol10561/part1056176/1056176429/images/c516x688/1.webp', inStock: true, symptom: 'T1 - Не включается' },
    'gearbox': { id: 'gearbox', name: 'Редуктор R-101-32', img: 'https://mns-basket-cdn-02.geobasket.net/vol10561/part1056176/1056176429/images/c516x688/1.webp', inStock: true, symptom: 'T2 - Не крутится мясорубка' },
    'knife': { id: 'knife', name: 'Нож для мясорубки', img: 'https://mns-basket-cdn-03.geobasket.net/vol2640/part264083/264083793/images/c516x688/1.webp', inStock: true, symptom: 'A2 - Затупился нож' },
    'bowl': { id: 'bowl', name: 'Чаша блендера 1500 мл', img: 'https://mns-basket-cdn-02.geobasket.net/vol2207/part220762/220762646/images/c516x688/1.webp', inStock: false, symptom: 'A1 - Разбита чаша' }
};

let activeOrder = null;
let currentAppliance = null;
let currentPartId = null;
let isEditingFaults = false;

// ==========================================
// ИНИЦИАЛИЗАЦИЯ (ПО НАЛИЧИЮ ЭЛЕМЕНТОВ)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('queue-list')) renderQueue();
    if (document.getElementById('intake-form')) { changeOrderType(); calcDate(); }
    if (document.getElementById('appliance-grid')) renderCatalog();
    if (document.getElementById('parts-grid')) initPartsPage();
    if (document.getElementById('detail-name-view')) initPartDetailsPage();
    if (document.getElementById('repair-stepper')) initOrderPage();

    if (document.getElementById('modal-stats')) {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('modal') === 'active') openStatsModal('active');
        if (urlParams.get('modal') === 'overdue') openStatsModal('overdue');
    }
});

// ==========================================
// АНАЛИТИКА (index.html)
// ==========================================
function openStatsModal(type) {
    const modal = document.getElementById('modal-stats');
    if (!modal) return;
    const list = document.getElementById('stats-list');
    list.innerHTML = '';
    let filtered = [];
    if (type === 'active') {
        filtered = orders.filter(o => o.currentStep < 5);
        document.getElementById('stats-title').innerText = 'Заказы в работе';
    } else if (type === 'overdue') {
        filtered = orders.filter(o => {
            if (o.deadline === 'Без срока') return false;
            const parts = o.deadline.split('.');
            const dl = new Date(parts[2], parts[1] - 1, parts[0]);
            return dl < TODAY && o.currentStep < 5;
        });
        document.getElementById('stats-title').innerText = 'Просроченные заказы';
    }
    filtered.forEach(o => {
        list.innerHTML += `<tr onclick="window.location.href='order.html?id=${o.id}'" class="cursor-pointer hover:bg-blue-50"><td class="p-2 text-blue-600 font-bold">${o.id}</td><td class="p-2">${o.engineer}</td><td class="p-2 text-red-600">${o.deadline}</td></tr>`;
    });
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeStatsModal() {
    const modal = document.getElementById('modal-stats');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function openEngineerModal(name, count, avg) {
    document.getElementById('eng-modal-name').innerText = name;
    document.getElementById('eng-modal-stats').innerText = `Закрыто: ${count} • Среднее время: ${avg}`;
    const tbody = document.getElementById('eng-modal-tbody');
    tbody.innerHTML = '';
    const history = engineerHistoryDB[name] || [];
    if (history.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-slate-400">Нет завершенных заказов</td></tr>`;
    } else {
        history.forEach(job => {
            tbody.innerHTML += `<tr class="hover:bg-slate-50"><td class="p-2 font-mono text-blue-600 font-medium">${job.order}</td><td class="p-2 text-slate-600">${job.device}</td><td class="p-2 font-medium text-slate-800">${job.work}</td><td class="p-2 text-right text-slate-500">${job.date}</td></tr>`;
        });
    }
    document.getElementById('modal-eng').classList.remove('hidden');
    document.getElementById('modal-eng').classList.add('flex');
}

function closeEngineerModal() {
    document.getElementById('modal-eng').classList.add('hidden');
    document.getElementById('modal-eng').classList.remove('flex');
}

// ==========================================
// ОЧЕРЕДЬ (queue.html)
// ==========================================
function renderQueue() {
    const tbody = document.getElementById('queue-list');
    if (!tbody) return;
    const q = document.getElementById('global-search').value.toLowerCase();
    const st = document.getElementById('status-filter').value;
    const tp = document.getElementById('type-filter').value;
    let filtered = orders.filter(o => 
        (o.id.toLowerCase().includes(q) || o.sn.includes(q) || o.client.toLowerCase().includes(q)) &&
        (st === '' || statusMap[o.currentStep] === st) && (tp === '' || o.type === tp)
    );
    document.getElementById('queue-counter').innerText = `Найдено: ${filtered.length}`;
    tbody.innerHTML = '';
    filtered.forEach(o => {
        let bClass = 'st-wait'; 
        if (o.currentStep === 1) bClass = 'st-diag'; 
        if (o.currentStep === 2) bClass = 'st-repair'; 
        if (o.currentStep === 3 || o.currentStep === 4) bClass = 'st-test'; 
        if (o.currentStep >= 5) bClass = 'st-ready';
        tbody.innerHTML += `
            <tr onclick="window.location.href='order.html?id=${o.id}'" class="hover:bg-blue-50 cursor-pointer">
                <td class="p-3 font-bold text-blue-600 text-sm">${o.id}<br><span class="text-xs text-slate-400 font-normal">${o.type}</span></td>
                <td class="p-3 text-sm">${o.client}<br><span class="text-xs text-slate-500">S/N: ${o.sn}</span></td>
                <td class="p-3 text-sm">${o.engineer}</td>
                <td class="p-3 text-sm text-red-600 font-medium">${o.deadline}</td>
                <td class="p-3"><span class="status-badge ${bClass}">${statusMap[o.currentStep]}</span></td>
            </tr>`;
    });
}

// ==========================================
// НАСТРОЙКИ (settings.html)
// ==========================================
function switchSettingsTab(t) {
    document.getElementById('settings-content-loc').classList.add('hidden');
    document.getElementById('settings-content-users').classList.add('hidden');
    document.getElementById('stab-btn-loc').className = "tab-btn py-2 text-slate-500 text-sm";
    document.getElementById('stab-btn-users').className = "tab-btn py-2 text-slate-500 text-sm";
    document.getElementById(`settings-content-${t}`).classList.remove('hidden');
    document.getElementById(`stab-btn-${t}`).className = "tab-btn py-2 active text-sm";
}

// ==========================================
// ПРИЕМКА (intake.html)
// ==========================================
function changeOrderType() {
    const type = document.querySelector('input[name="order_type"]:checked').value;
    const clientForm = document.getElementById('client-intake');
    const b2bForm = document.getElementById('b2b-intake');
    const orderNumInput = document.getElementById('order-number');
    const btnAI = document.getElementById('btn-ai-analyze');
    const aiResultBlock = document.getElementById('ai-result-block');
    if (type === 'b2b') {
        clientForm.classList.add('hidden');
        b2bForm.classList.remove('hidden');
        b2bForm.classList.add('animate-fade');
        orderNumInput.value = "RX-001451";
        orderNumInput.className = "w-full bg-indigo-50 border border-indigo-300 rounded-lg p-2.5 text-lg font-mono font-bold text-indigo-700 outline-none";
    } else {
        clientForm.classList.remove('hidden');
        clientForm.classList.add('animate-fade');
        b2bForm.classList.add('hidden');
        orderNumInput.value = "2611001-701"; 
        orderNumInput.className = "w-full bg-slate-100 border border-slate-300 rounded-lg p-2.5 text-lg font-mono font-bold text-blue-700 outline-none";
    }
    const isWarranty = (type === 'warranty');
    document.getElementById('field-purchase-date').classList.toggle('hidden', !isWarranty);
    document.getElementById('field-requirement').classList.toggle('hidden', !isWarranty);
    const isPaid = (type === 'paid');
    document.getElementById('pricing-block').classList.toggle('hidden', !isPaid);
    btnAI.classList.toggle('hidden', !isPaid);
    if (!isPaid) {
        aiResultBlock.classList.add('hidden');
        document.getElementById('defect-textarea').value = '';
    }
}

function calcDate() {
    const days = parseInt(document.getElementById('days-input').value) || 0;
    const deadline = new Date(TODAY.getTime());
    deadline.setDate(deadline.getDate() + days);
    document.getElementById('deadline-date').value = deadline.toLocaleDateString('ru-RU');
}

function calcTotal() {
    const work = parseFloat(document.getElementById('cost-work').value) || 0;
    const parts = parseFloat(document.getElementById('cost-parts').value) || 0;
    document.getElementById('cost-total').value = `${(work + parts).toFixed(2)} BYN`;
}

function toggleClientType() {
    const type = document.getElementById('client-type').value;
    document.getElementById('legal-fields').classList.toggle('hidden', type !== 'legal');
}

function formatPhone(input) {
    let numbers = input.value.replace(/\D/g, '');
    if (numbers.startsWith('375')) numbers = numbers.substring(3);
    let formatted = '+375';
    if (numbers.length > 0) formatted += ' (' + numbers.substring(0, 2);
    if (numbers.length >= 2) formatted += ') ' + numbers.substring(2, 5);
    if (numbers.length >= 5) formatted += '-' + numbers.substring(5, 7);
    if (numbers.length >= 7) formatted += '-' + numbers.substring(7, 9);
    input.value = formatted;
}

function submitForm(e) {
    e.preventDefault();
    const type = document.querySelector('input[name="order_type"]:checked').value;
    if (type === 'b2b') {
        const qty = parseInt(document.getElementById('b2b-qty').value) || 1;
        const listDiv = document.getElementById('label-list');
        listDiv.innerHTML = '';
        const startNum = 1451; 
        for(let i = 0; i < qty; i++) {
            const num = String(startNum + i).padStart(6, '0');
            listDiv.innerHTML += `<div class="flex justify-between items-center border-b border-slate-200 pb-1 mb-1 last:border-0"><span>RX-${num}</span> <span class="text-xs text-slate-500 bg-white border px-2 py-0.5 rounded">||| |||| || |||</span></div>`;
        }
        document.getElementById('modal-labels').classList.remove('hidden');
        document.getElementById('modal-labels').classList.add('flex');
    } else {
        const orderNum = document.getElementById('order-number').value;
        document.getElementById('success-order-num').innerText = orderNum;
        document.getElementById('modal-success-statuses').classList.remove('hidden');
        document.getElementById('modal-success-statuses').classList.add('flex');
    }
}

function closeModal() {
    document.getElementById('modal-labels').classList.add('hidden');
    document.getElementById('modal-labels').classList.remove('flex');
    alert('Все этикетки созданы. Товары оприходованы.');
    window.location.href = 'queue.html';
}

function closeSuccessModal() {
    document.getElementById('modal-success-statuses').classList.add('hidden');
    document.getElementById('modal-success-statuses').classList.remove('flex');
    window.location.href = 'queue.html';
}

function runAIAnalysis() {
    const type = document.querySelector('input[name="order_type"]:checked').value;
    if (type !== 'paid') return alert('AI-анализ только для платного ремонта!');
    const text = document.getElementById('defect-textarea').value.toLowerCase();
    if (!text) return alert('Введите претензию заказчика!');
    const btn = document.getElementById('btn-ai-analyze');
    const originalText = btn.innerHTML;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-2"></i> Анализ...`;
    btn.disabled = true;
    setTimeout(() => {
        const resultBlock = document.getElementById('ai-result-block');
        let symptomCode = 'T1', partName = 'Требуется диагностика', workCost = 0, partCost = 0;
        if (text.includes('не включается')) { symptomCode = 'T1'; partName = 'Двигатель (1 шт.)'; workCost = 40; partCost = 45; }
        else if (text.includes('чаша') || text.includes('разбит')) { symptomCode = 'A1'; partName = 'Чаша блендера (1 шт.)'; workCost = 10; partCost = 25; }
        else if (text.includes('мясорубк')) { symptomCode = 'T2'; partName = 'Редуктор (1 шт.)'; workCost = 35; partCost = 50; }
        resultBlock.classList.remove('hidden');
        document.getElementById('ai-symptom').innerHTML = `• Симптом-код: <span class="font-bold text-indigo-700">${symptomCode}</span>`;
        document.getElementById('ai-parts').innerHTML = `• Необходимые ЗЧ: <span class="font-bold text-indigo-700">${partName}</span>`;
        document.getElementById('ai-cost').innerHTML = `• Стоимость: <span class="font-bold text-indigo-700">${workCost + partCost} BYN</span>`;
        document.getElementById('cost-work').value = workCost;
        document.getElementById('cost-parts').value = partCost;
        calcTotal();
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 1000);
}

// ==========================================
// СКЛАД (catalog.html, parts.html, part-details.html)
// ==========================================
function renderCatalog(filterQuery = '') {
    const grid = document.getElementById('appliance-grid');
    if (!grid) return;
    grid.innerHTML = '';
    const filtered = appliances.filter(a => a.name.toLowerCase().includes(filterQuery.toLowerCase()) || a.id.toLowerCase().includes(filterQuery.toLowerCase()));
    filtered.forEach(app => {
        grid.innerHTML += `<a href="parts.html?id=${app.id}" class="appliance-card"><div class="img-wrapper"><img src="${app.img}"></div><div class="p-3"><div class="text-xs font-bold text-blue-600 mb-1">${app.id}</div><div class="text-sm font-semibold leading-tight">${app.name}</div></div></a>`;
    });
}

function initPartsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    currentAppliance = urlParams.get('id') || 'R101-200';
    document.getElementById('parts-title').innerText = `Запчасти ${currentAppliance}`;
    renderPartsGrid();
    switchPartsTab('grid');
}

function renderPartsGrid() {
    const grid = document.getElementById('parts-grid');
    if (!grid) return;
    grid.innerHTML = '';
    const appParts = parts.filter(p => p.applianceId === currentAppliance);
    document.getElementById('parts-subtitle').innerText = `Найдено позиций: ${appParts.length}`;
    appParts.forEach(part => {
        let stockClass = part.stock === 0 ? 'text-red-600' : 'text-slate-800';
        let reqClass = part.required > 0 ? 'text-orange-600' : 'text-slate-400';
        const articleHtml = part.article ? `<div class="text-xs font-mono bg-slate-100 px-1.5 py-0.5 rounded inline-block mb-1">${part.article}</div>` : '';
        let dateStr = '';
        if (part.expectedDate) { const d = new Date(part.expectedDate); dateStr = ` к ${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}`; }
        const expectedHtml = part.expectedQty > 0 ? `<div class="text-sm text-green-600 mt-1 font-bold flex items-center"><i class="fa-solid fa-truck-fast mr-1"></i>+${part.expectedQty}${dateStr}</div>` : '';
        grid.innerHTML += `
            <a href="part-details.html?id=${part.id}" class="part-card">
                <div class="img-wrapper"><img src="${part.img}"></div>
                <div class="p-2 flex-1 flex flex-col">
                    <div class="text-sm font-bold leading-tight mb-1">${part.name}</div>
                    ${articleHtml}
                    ${expectedHtml}
                    <div class="part-stats mt-auto pt-2">
                        <div><div class="text-[9px] text-slate-500 uppercase font-bold">Склад</div><div class="text-base font-bold ${stockClass}">${part.stock}</div></div>
                        <div class="text-right"><div class="text-[9px] text-slate-500 uppercase font-bold">Нужно</div><div class="text-base font-bold ${reqClass}">${part.required > 0 ? part.required : '-'}</div></div>
                    </div>
                </div>
            </a>`;
    });
}

function switchPartsTab(tabId) {
    document.getElementById('parts-tab-content-grid').classList.add('hidden');
    document.getElementById('parts-tab-content-info').classList.add('hidden');
    document.getElementById('ptab-btn-grid').className = "pb-2 text-lg font-medium text-slate-500 hover:text-slate-800 border-b-2 border-transparent";
    document.getElementById('ptab-btn-info').className = "pb-2 text-lg font-medium text-slate-500 hover:text-slate-800 border-b-2 border-transparent";
    document.getElementById(`parts-tab-content-${tabId}`).classList.remove('hidden');
    document.getElementById(`ptab-btn-${tabId}`).className = "pb-2 text-lg font-medium text-blue-600 border-b-2 border-blue-600";
    if (tabId === 'info') {
        renderSpecsView();
        renderNotesView();
        toggleSpecsEditMode(false);
    }
}

function renderSpecsView() {
    const container = document.getElementById('specs-view-mode');
    const specs = modelSpecs[currentAppliance] || [];
    container.innerHTML = specs.length === 0 ? `<div class="text-slate-400 italic py-4 text-center">Нет характеристик</div>` : '';
    specs.forEach(spec => {
        container.innerHTML += `<div class="grid grid-cols-[250px_1fr] py-3 items-center"><div class="text-slate-500 font-medium pr-4">${spec.key}</div><div class="text-slate-800 text-base">${spec.value}</div></div>`;
    });
}

function renderNotesView() {
    const container = document.getElementById('notes-view-mode');
    const notes = modelNotes[currentAppliance] || '';
    container.innerHTML = notes.trim() === '' ? `<span class="text-slate-400 italic">Нет заметок</span>` : notes;
}

function toggleSpecsEditMode(edit) {
    document.getElementById('specs-view-actions').classList.toggle('hidden', edit);
    document.getElementById('specs-edit-actions').classList.toggle('hidden', !edit);
    document.getElementById('specs-view-mode').classList.toggle('hidden', edit);
    document.getElementById('specs-edit-mode').classList.toggle('hidden', !edit);
    document.getElementById('notes-view-mode').classList.toggle('hidden', edit);
    document.getElementById('notes-edit-mode').classList.toggle('hidden', !edit);
    if (edit) {
        renderSpecsEdit();
        document.getElementById('notes-edit-textarea').value = modelNotes[currentAppliance] || '';
    }
}

function renderSpecsEdit() {
    const list = document.getElementById('specs-edit-list');
    const specs = modelSpecs[currentAppliance] || [];
    list.innerHTML = '';
    specs.forEach((spec, index) => {
        list.innerHTML += `<div class="flex space-x-3 items-center"><input type="text" value="${spec.key}" id="spec-key-${index}" class="w-1/3 border rounded p-2 text-sm"><input type="text" value="${spec.value}" id="spec-value-${index}" class="flex-1 border rounded p-2 text-sm"><button onclick="removeSpecRow(${index})" class="text-red-500 hover:text-red-700 p-2"><i class="fa-solid fa-trash-can"></i></button></div>`;
    });
}

function addSpecRow() {
    collectCurrentEditSpecs();
    if (!modelSpecs[currentAppliance]) modelSpecs[currentAppliance] = [];
    modelSpecs[currentAppliance].push({ key: '', value: '' });
    renderSpecsEdit();
}

function removeSpecRow(index) {
    collectCurrentEditSpecs();
    modelSpecs[currentAppliance].splice(index, 1);
    renderSpecsEdit();
}

function collectCurrentEditSpecs() {
    const rows = document.querySelectorAll('#specs-edit-list > div');
    if (rows.length === 0) return;
    const updatedSpecs = [];
    rows.forEach((row, index) => {
        const keyInput = document.getElementById(`spec-key-${index}`);
        const valInput = document.getElementById(`spec-value-${index}`);
        if (keyInput && valInput) updatedSpecs.push({ key: keyInput.value.trim(), value: valInput.value.trim() });
    });
    modelSpecs[currentAppliance] = updatedSpecs;
}

function saveSpecsAndNotes() {
    collectCurrentEditSpecs();
    modelSpecs[currentAppliance] = modelSpecs[currentAppliance].filter(spec => spec.key !== '' || spec.value !== '');
    modelNotes[currentAppliance] = document.getElementById('notes-edit-textarea').value;
    toggleSpecsEditMode(false);
    renderSpecsView();
    renderNotesView();
}

function initPartDetailsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    const part = parts.find(x => x.id === id) || parts[0];
    populatePartData(part);
}

function populatePartData(part) {
    currentPartId = part.id;
    document.getElementById('detail-img').src = part.img;
    document.getElementById('detail-article-view').innerText = part.article || 'Нет артикула';
    document.getElementById('detail-name-view').innerText = part.name;
    document.getElementById('detail-desc-view').innerText = part.desc || 'Описание отсутствует';
    document.getElementById('detail-note-view').innerText = part.note || 'Нет заметок';
    document.getElementById('detail-stock-view').innerText = part.stock;
    document.getElementById('detail-required').innerText = part.required;
    const expDiv = document.getElementById('detail-expected-view');
    if (part.expectedQty > 0) {
        const dateStr = part.expectedDate ? `<span class="text-[11px] text-slate-500 mt-0.5">${new Date(part.expectedDate).toLocaleDateString('ru-RU')}</span>` : '';
        expDiv.innerHTML = `<span class="text-base font-bold text-green-600">+${part.expectedQty} шт.</span>${dateStr}`;
    } else {
        expDiv.innerHTML = `<span class="text-base font-bold text-slate-400">Нет</span>`;
    }
    const extraView = document.getElementById('detail-extra-fields-view');
    const wrapperDish = document.getElementById('wrapper-dishwasher-view');
    const wrapperDim = document.getElementById('wrapper-dimensions-view');
    wrapperDish.classList.toggle('hidden', !part.dishwasherSafe);
    wrapperDim.classList.toggle('hidden', !part.dimensions);
    extraView.classList.toggle('hidden', !part.dishwasherSafe && !part.dimensions);
    document.getElementById('detail-dishwasher-view').innerText = part.dishwasherSafe;
    document.getElementById('detail-dimensions-view').innerText = part.dimensions;
    renderHistory(part.history);
    renderWaitlist(part.waitlist);
    switchDetailTab('history');
}

function toggleEditMode(edit) {
    document.getElementById('view-mode-actions').classList.toggle('hidden', edit);
    document.getElementById('edit-mode-actions').classList.toggle('hidden', !edit);
    document.getElementById('detail-article-view').classList.toggle('hidden', edit);
    document.getElementById('detail-article-edit').classList.toggle('hidden', !edit);
    document.getElementById('detail-name-view').classList.toggle('hidden', edit);
    document.getElementById('detail-name-edit').classList.toggle('hidden', !edit);
    document.getElementById('detail-desc-view').classList.toggle('hidden', edit);
    document.getElementById('detail-desc-edit').classList.toggle('hidden', !edit);
    document.getElementById('detail-note-view').classList.toggle('hidden', edit);
    document.getElementById('detail-note-edit').classList.toggle('hidden', !edit);
    document.getElementById('detail-stock-view').classList.toggle('hidden', edit);
    document.getElementById('detail-stock-edit').classList.toggle('hidden', !edit);
    document.getElementById('detail-expected-view-container').classList.toggle('hidden', edit);
    document.getElementById('detail-expected-edit').classList.toggle('hidden', !edit);
    document.getElementById('detail-extra-fields-edit').classList.toggle('hidden', !edit);
    document.getElementById('detail-extra-fields-view').classList.toggle('hidden', edit);
    if (edit) {
        const part = parts.find(p => p.id === currentPartId);
        document.getElementById('detail-article-edit').value = part.article || '';
        document.getElementById('detail-name-edit').value = part.name;
        document.getElementById('detail-desc-edit').value = part.desc || '';
        document.getElementById('detail-note-edit').value = part.note || '';
        document.getElementById('detail-stock-edit').value = part.stock;
        document.getElementById('edit-expected-qty').value = part.expectedQty || '';
        document.getElementById('edit-expected-date').value = part.expectedDate || '';
        document.getElementById('detail-dishwasher-edit').value = part.dishwasherSafe || '';
        document.getElementById('detail-dimensions-edit').value = part.dimensions || '';
    }
}

function savePartDetails() {
    const part = parts.find(p => p.id === currentPartId);
    if (!part) return;
    part.article = document.getElementById('detail-article-edit').value.trim();
    part.name = document.getElementById('detail-name-edit').value.trim();
    part.desc = document.getElementById('detail-desc-edit').value.trim();
    part.note = document.getElementById('detail-note-edit').value.trim();
    part.stock = parseInt(document.getElementById('detail-stock-edit').value) || 0;
    part.expectedQty = parseInt(document.getElementById('edit-expected-qty').value) || 0;
    part.expectedDate = document.getElementById('edit-expected-date').value;
    part.dishwasherSafe = document.getElementById('detail-dishwasher-edit').value;
    part.dimensions = document.getElementById('detail-dimensions-edit').value.trim();
    populatePartData(part);
    toggleEditMode(false);
}

function renderHistory(history) {
    const tbody = document.getElementById('detail-history-body');
    tbody.innerHTML = '';
    if (history && history.length > 0) {
        history.forEach(h => {
            tbody.innerHTML += `<tr><td class="py-2 px-3 font-medium"><span class="order-link" onclick="alert('Переход к заказу ${h.order}')">${h.order}</span></td><td class="py-2 px-3 text-slate-600">${h.date}</td><td class="py-2 px-3 text-slate-500">${h.user}</td></tr>`;
        });
    } else {
        tbody.innerHTML = `<tr><td colspan="3" class="text-center py-4 text-slate-400">Нет записей</td></tr>`;
    }
}

function renderWaitlist(waitlist) {
    const tbody = document.getElementById('detail-waitlist-body');
    const noWait = document.getElementById('no-waitlist');
    tbody.innerHTML = '';
    if (waitlist && waitlist.length > 0) {
        noWait.classList.add('hidden');
        waitlist.forEach(w => {
            tbody.innerHTML += `<tr><td class="py-2 px-3 font-medium"><span class="order-link" onclick="alert('Переход к заказу ${w.order}')">${w.order}</span></td><td class="py-2 px-3 text-slate-600">${w.date}</td><td class="py-2 px-3 text-slate-500">${w.user}</td></tr>`;
        });
    } else {
        noWait.classList.remove('hidden');
    }
}

function switchDetailTab(tab) {
    document.getElementById('dtab-content-history').classList.add('hidden');
    document.getElementById('dtab-content-waitlist').classList.add('hidden');
    document.getElementById('dtab-btn-history').className = "pb-2 text-lg font-medium text-slate-500 hover:text-slate-800 border-b-2 border-transparent";
    document.getElementById('dtab-btn-waitlist').className = "pb-2 text-lg font-medium text-slate-500 hover:text-slate-800 border-b-2 border-transparent";
    document.getElementById(`dtab-content-${tab}`).classList.remove('hidden');
    document.getElementById(`dtab-btn-${tab}`).className = "pb-2 text-lg font-medium text-blue-600 border-b-2 border-blue-600";
}

// ==========================================
// РЕМОНТ (order.html) - ПОЛНАЯ ЛОГИКА ИЗ SPA
// ==========================================
function initOrderPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');
    activeOrder = orders.find(o => o.id === orderId) || orders[0];
    
    document.getElementById('det-order-number').innerText = activeOrder.id;
    document.getElementById('det-device-info').innerText = `RageX ${activeOrder.device} • S/N: ${activeOrder.sn}`;
    document.getElementById('det-date').innerText = activeOrder.dateIn;
    document.getElementById('det-deadline').innerText = activeOrder.deadline;
    
    const remBadge = document.getElementById('det-remaining');
    if (activeOrder.deadline === 'Без срока') {
        remBadge.innerText = `-`;
        remBadge.className = "font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded";
    } else {
        const parts = activeOrder.deadline.split('.');
        const dl = new Date(parts[2], parts[1] - 1, parts[0]);
        const diff = Math.ceil((dl - TODAY) / (1000 * 60 * 60 * 24));
        remBadge.innerText = `${diff} дней`;
        remBadge.className = diff <= 3 ? "font-bold text-white bg-red-500 px-2 py-0.5 rounded" : "font-bold text-white bg-green-500 px-2 py-0.5 rounded";
    }

    renderStepper();
    switchMainTab('work');
    renderLogs();
    syncStaticTabs();
}

function renderStepper() {
    const container = document.getElementById('repair-stepper');
    if (!container) return;
    container.innerHTML = '';
    const steps = ['Ожидание', 'Диагностика', 'Ремонт', 'Тест', 'Сборка', 'Завершено'];
    
    const statusBadge = document.getElementById('header-status');
    statusBadge.innerText = statusMap[activeOrder.currentStep];
    let bClass = 'st-wait';
    if (activeOrder.currentStep === 1) bClass = 'st-diag';
    if (activeOrder.currentStep === 2) bClass = 'st-repair';
    if (activeOrder.currentStep === 3 || activeOrder.currentStep === 4) bClass = 'st-test';
    if (activeOrder.currentStep === 5) bClass = 'st-ready';
    statusBadge.className = `status-badge text-lg ${bClass}`;

    steps.forEach((title, index) => {
        let cls = 'pending';
        if (index < activeOrder.currentStep) cls = 'completed';
        if (index === activeOrder.currentStep) cls = 'active';
        
        const markerContent = index < activeOrder.currentStep ? '<i class="fa-solid fa-check"></i>' : '';
        const isClickable = index <= activeOrder.currentStep;
        const clickAttr = isClickable ? `onclick="showStepDetails(${index})"` : '';
        const cursorClass = isClickable ? 'cursor-pointer hover:bg-slate-50' : 'cursor-default';

        container.innerHTML += `
            <div class="step-item ${cls} ${cursorClass}" ${clickAttr}>
                <div class="step-marker">${markerContent}</div>
                <div class="step-title">${title}</div>
            </div>
        `;
    });
}

function showStepDetails(index) {
    const log = activeOrder.stepLogs[index];
    const modal = document.getElementById('modal-step-info');
    const stepsTitle = ['Ожидание', 'Диагностика', 'Ремонт', 'Тестирование', 'Сборка', 'Завершено'];
    document.getElementById('step-modal-title').innerText = stepsTitle[index];
    if (log) {
        document.getElementById('step-modal-time').innerText = log.time;
        document.getElementById('step-modal-user').innerText = log.user;
        document.getElementById('step-modal-desc').innerText = log.desc;
    } else {
        document.getElementById('step-modal-time').innerText = 'Не завершен';
        document.getElementById('step-modal-user').innerText = '-';
        document.getElementById('step-modal-desc').innerText = 'Этап еще не пройден.';
    }
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeStepModal() {
    document.getElementById('modal-step-info').classList.add('hidden');
    document.getElementById('modal-step-info').classList.remove('flex');
}

function switchMainTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(`content-${tabId}`).classList.remove('hidden');
    document.querySelectorAll('.tab-btn').forEach(btn => { btn.className = "tab-btn px-5 py-3 text-sm font-medium border-b-2 border-transparent text-slate-500 hover:text-slate-800 whitespace-nowrap"; });
    document.getElementById(`tab-btn-${tabId}`).className = "tab-btn px-5 py-3 text-sm font-bold border-b-2 border-blue-600 text-blue-600 whitespace-nowrap";
    if(tabId === 'work') renderWorkArea();
}

function renderWorkArea() {
    const container = document.getElementById('work-area');
    if (!container) return;
    const step = activeOrder.currentStep;

    if (step === 0) {
        container.innerHTML = `
            <div class="text-center py-10">
                <i class="fa-solid fa-box text-6xl text-slate-300 mb-4"></i>
                <h3 class="text-xl font-bold text-slate-800 mb-2">Устройство ожидает</h3>
                <button onclick="takeToDiagnostics()" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold shadow-md transition">Взять в диагностику</button>
            </div>
        `;
    }
    else if (step === 1) {
        if (isEditingFaults) {
            container.innerHTML = `
                <h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center"><i class="fa-solid fa-pen-to-square text-blue-600 mr-2"></i> Редактор неисправностей</h3>
                <p class="text-sm text-slate-500 mb-4">Слева — название неисправности, справа — требуемая запчасть.</p>
                <div id="fault-editor-list" class="space-y-3 mb-6"></div>
                <button onclick="addFaultRow()" class="text-sm text-blue-600 font-bold hover:underline flex items-center mb-6"><i class="fa-solid fa-plus-circle mr-1"></i> Добавить новую неисправность</button>
                <div class="pt-4 border-t flex justify-end space-x-3">
                    <button onclick="cancelEditFaults()" class="px-6 py-2 border rounded-lg font-bold text-slate-600 hover:bg-slate-50">Отмена</button>
                    <button onclick="saveFaults()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow-sm">Сохранить</button>
                </div>
            `;
            renderFaultEditorRows();
        } else {
            let checkboxesHtml = '';
            Object.values(availablePartsDB).forEach(part => {
                const isChecked = activeOrder.diagnosis.parts.some(p => p.id === part.id);
                checkboxesHtml += `
                    <label class="flex items-center p-3 border rounded-lg bg-white cursor-pointer hover:bg-slate-50 mb-2">
                        <input type="checkbox" class="w-5 h-5 text-blue-600 rounded part-checkbox" value="${part.id}" ${isChecked ? 'checked' : ''} onchange="togglePartSelection('${part.id}')">
                        <span class="ml-3 text-base text-slate-700 flex-1">${part.symptom}</span>
                        ${part.inStock ? '<span class="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded">В наличии</span>' : '<span class="text-xs text-red-600 font-bold bg-red-50 px-2 py-1 rounded">Нет на складе</span>'}
                    </label>
                `;
            });
            container.innerHTML = `
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold text-slate-800">Проведение диагностики</h3>
                    <button onclick="startEditFaults()" class="text-sm text-blue-600 font-bold hover:underline flex items-center"><i class="fa-solid fa-pen mr-1"></i> Редактировать</button>
                </div>
                <p class="text-sm text-slate-500 mb-4">Отметьте все выявленные неисправности.</p>
                <div class="space-y-5">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3" id="parts-checklist">${checkboxesHtml}</div>
                    <div>
                        <label class="block text-sm font-bold text-slate-700 mb-1">Заключение инженера</label>
                        <textarea id="defect-text" class="w-full border p-3 rounded-lg h-24" placeholder="Опишите выявленные проблемы..."></textarea>
                    </div>
                    <div id="parts-status-alert" class="hidden"></div>
                    <div class="pt-4 border-t flex justify-end space-x-3" id="diag-actions"></div>
                </div>
            `;
            updateDiagStatus();
        }
    }
    else if (step === 2) {
        let partsHtml = '';
        activeOrder.diagnosis.parts.forEach(part => {
            partsHtml += `
                <div class="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-3 flex items-center space-x-5">
                    <div class="w-32 h-32 bg-white rounded-lg border border-blue-200 flex items-center justify-center p-2 shrink-0">
                        <img src="${part.img}" class="max-w-full max-h-full object-contain">
                    </div>
                    <div>
                        <div class="text-sm text-blue-900 font-bold mb-1">Требуется замена:</div>
                        <div class="text-lg font-bold text-slate-800">${part.name}</div>
                    </div>
                </div>
            `;
        });
        container.innerHTML = `
            <h3 class="text-xl font-bold text-slate-800 mb-4">Выполнение ремонта</h3>
            <div class="mb-6">${partsHtml}</div>
            <div class="flex justify-end"><button onclick="finishRepair()" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold shadow-md">Ремонт выполнен</button></div>
        `;
    }
    else if (step === 3) {
        container.innerHTML = `
            <h3 class="text-xl font-bold text-slate-800 mb-4">Тестирование</h3>
            <div class="flex space-x-4 mt-8">
                <button onclick="testFailed()" class="flex-1 bg-red-100 text-red-800 border border-red-300 py-4 rounded-lg font-bold">Проблема осталась</button>
                <button onclick="testPassed()" class="flex-1 bg-green-600 text-white py-4 rounded-lg font-bold shadow-md">Все работает</button>
            </div>
        `;
    }
    else if (step === 4) {
        const kitItems = modelKit[activeOrder.device] || [];
        let checkboxes = '';
        kitItems.forEach((item) => {
            checkboxes += `<label class="flex items-center p-3 border rounded-lg bg-white cursor-pointer hover:bg-slate-50 mb-2"><input type="checkbox" checked class="w-5 h-5 text-green-600 rounded kit-checkbox" onchange="checkKitStatus()"><span class="ml-3 text-base text-slate-700">${item}</span></label>`;
        });
        container.innerHTML = `
            <h3 class="text-xl font-bold text-slate-800 mb-4">Сборка и комплектация</h3>
            <div id="kit-list" class="space-y-2 mb-4">${checkboxes}</div>
            <div id="missing-part-alert" class="hidden bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
                <div class="text-yellow-800 font-bold mb-2"><i class="fa-solid fa-triangle-exclamation mr-2"></i> В комплекте не хватает деталей!</div>
                <div class="flex space-x-3">
                    <button onclick="requestMissingPart()" class="bg-white border border-yellow-300 text-yellow-800 px-4 py-2 rounded text-sm font-bold hover:bg-yellow-100 transition">Запросить со склада</button>
                    <button onclick="sendAsIs()" id="btn-send-as-is" class="bg-yellow-500 text-white px-4 py-2 rounded text-sm font-bold hover:bg-yellow-600 transition">Отправить как есть</button>
                </div>
            </div>
            <div class="flex justify-end mt-6"><button id="btn-finish-repair" onclick="completeRepair()" class="bg-slate-800 text-white px-8 py-3 rounded-lg font-bold shadow-md">Завершить ремонт</button></div>
        `;
        const btnAsIs = document.getElementById('btn-send-as-is');
        if (activeOrder.type === 'b2b') {
            btnAsIs.innerText = 'Отправить на уценку';
            btnAsIs.className = "bg-purple-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-purple-700 transition";
        } else {
            btnAsIs.innerText = 'Согласовать с клиентом (как есть)';
        }
    }
    else if (step === 5) {
        container.innerHTML = `
            <div class="text-center py-10">
                <h3 class="text-2xl font-bold text-green-600 mb-2">Ремонт завершен!</h3>
                <p class="text-slate-500 mb-6">Перейдите на вкладку "Выдача" для закрытия заказа.</p>
                <button onclick="switchMainTab('issue')" class="bg-blue-600 text-white px-6 py-2 rounded-lg">К выдаче</button>
            </div>
        `;
    }
}

// --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ РЕМОНТА ---
function startEditFaults() { isEditingFaults = true; renderWorkArea(); }
function cancelEditFaults() { isEditingFaults = false; renderWorkArea(); }

function renderFaultEditorRows() {
    const list = document.getElementById('fault-editor-list');
    list.innerHTML = '';
    Object.values(availablePartsDB).forEach((fault, index) => {
        let optionsHtml = '';
        masterPartsList.forEach(part => {
            const isSelected = fault.name === part.name ? 'selected' : '';
            optionsHtml += `<option value="${part.id}" ${isSelected}>${part.name}</option>`;
        });
        list.innerHTML += `
            <div class="flex space-x-3 items-center fault-row" id="fault-row-${index}">
                <input type="text" value="${fault.symptom}" placeholder="Название" class="flex-1 border border-slate-300 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none">
                <select class="w-1/2 border border-slate-300 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none">${optionsHtml}</select>
                <button onclick="removeFaultRow(${index})" class="text-red-500 hover:text-red-700 p-2"><i class="fa-solid fa-trash-can text-lg"></i></button>
            </div>
        `;
    });
}

function addFaultRow() {
    const list = document.getElementById('fault-editor-list');
    const index = list.children.length;
    let optionsHtml = '';
    masterPartsList.forEach(part => { optionsHtml += `<option value="${part.id}">${part.name}</option>`; });
    list.innerHTML += `
        <div class="flex space-x-3 items-center fault-row" id="fault-row-${index}">
            <input type="text" placeholder="Новая неисправность" class="flex-1 border border-slate-300 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none">
            <select class="w-1/2 border border-slate-300 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none">${optionsHtml}</select>
            <button onclick="removeFaultRow(${index})" class="text-red-500 hover:text-red-700 p-2"><i class="fa-solid fa-trash-can text-lg"></i></button>
        </div>
    `;
}

function removeFaultRow(index) {
    const row = document.getElementById(`fault-row-${index}`);
    if (row) row.remove();
}

function saveFaults() {
    const rows = document.querySelectorAll('.fault-row');
    const newFaultsDB = {};
    rows.forEach((row, index) => {
        const symptomInput = row.querySelector('input');
        const partSelect = row.querySelector('select');
        const symptom = symptomInput.value.trim();
        const partId = partSelect.value;
        if (!symptom) return; 
        const selectedPart = masterPartsList.find(p => p.id === partId) || masterPartsList[0];
        const dbKey = 'custom_' + Date.now() + '_' + index;
        newFaultsDB[dbKey] = { id: dbKey, symptom: symptom, name: selectedPart.name, img: selectedPart.img, inStock: true };
    });
    availablePartsDB = newFaultsDB;
    isEditingFaults = false;
    renderWorkArea();
}

function takeToDiagnostics() { activeOrder.currentStep = 1; addLog('Взял устройство со стеллажа.'); updateUI(); }

function togglePartSelection(partId) {
    const part = availablePartsDB[partId];
    if (!activeOrder.diagnosis.parts.some(p => p.id === partId)) {
        activeOrder.diagnosis.parts.push({ ...part, qty: 1 });
    } else {
        activeOrder.diagnosis.parts = activeOrder.diagnosis.parts.filter(p => p.id !== partId);
    }
    updateDiagStatus();
}

function updateDiagStatus() {
    const alertBox = document.getElementById('parts-status-alert');
    const actionsBox = document.getElementById('diag-actions');
    const missingParts = activeOrder.diagnosis.parts.filter(p => !p.inStock);

    if (missingParts.length > 0) {
        alertBox.classList.remove('hidden');
        alertBox.innerHTML = `<div class="bg-red-50 border border-red-200 p-3 rounded text-sm text-red-800 mb-4"><i class="fa-solid fa-times-circle mr-1"></i> <b>Внимание!</b> Нет на складе: ${missingParts.map(p => p.name).join(', ')}.</div>`;
        actionsBox.innerHTML = `
            <button onclick="postpone()" class="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold text-sm">Отложить (Ожидание ЗЧ)</button>
            <button onclick="cancelDueToDeadline()" class="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm">Сорвать срок / Связаться</button>
        `;
    } else if (activeOrder.diagnosis.parts.length > 0) {
        alertBox.classList.add('hidden');
        actionsBox.innerHTML = `<button onclick="confirmDiagnosis()" class="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">Подтвердить и перейти к ремонту</button>`;
    } else {
        alertBox.classList.add('hidden');
        actionsBox.innerHTML = ''; 
    }
}

function confirmDiagnosis() {
    activeOrder.diagnosis.text = document.getElementById('defect-text').value;
    activeOrder.diagnosis.symptom = activeOrder.diagnosis.parts.map(p => p.symptom).join(', ');
    activeOrder.diagnosis.defect = activeOrder.diagnosis.parts.map(p => p.name).join(', ');
    activeOrder.stepLogs[1] = { time: new Date().toLocaleString('ru-RU'), user: 'Инженер', desc: `Дефекты: ${activeOrder.diagnosis.defect}. Заключение: ${activeOrder.diagnosis.text}` };
    activeOrder.currentStep = 2;
    addLog(`Диагностика: ${activeOrder.diagnosis.defect}. Списание ЗЧ.`);
    updateUI();
}

function postpone() {
    activeOrder.diagnosis.text = document.getElementById('defect-text') ? document.getElementById('defect-text').value : '';
    const missingPartsNames = activeOrder.diagnosis.parts.filter(p => !p.inStock).map(p => p.name).join(', ');
    activeOrder.stepLogs[1] = { time: new Date().toLocaleString('ru-RU'), user: 'Инженер', desc: `Выявлены дефекты: ${activeOrder.diagnosis.parts.map(p => p.name).join(', ')}. Отложен из-за отсутствия: ${missingPartsNames}.` };
    activeOrder.currentStep = 1; 
    addLog(`Отложен ремонт. Требуется: ${missingPartsNames}.`);
    updateUI();
    alert(`Заказ переведен в "Ожидание ЗЧ".\nНе хватает: ${missingPartsNames}`);
}

function cancelDueToDeadline() {
    const reason = prompt("Укажите причину:", "Нет запчастей на складе");
    if (reason !== null) {
        addLog(`Информирование клиента. Причина: ${reason}`);
        alert(`Клиент уведомлен. Возврат средств/обмен.`);
        activeOrder.currentStep = 5; 
        updateUI();
    }
}

function finishRepair() {
    activeOrder.stepLogs[2] = { time: new Date().toLocaleString('ru-RU'), user: 'Инженер', desc: `Установлены: ${activeOrder.diagnosis.parts.map(p => p.name).join(', ')}` };
    activeOrder.currentStep = 3;
    addLog('Ремонт выполнен. Переход к тесту.');
    updateUI();
}

function testPassed() { activeOrder.stepLogs[3] = { time: new Date().toLocaleString('ru-RU'), user: 'Инженер', desc: 'Тест пройден.' }; activeOrder.currentStep = 4; addLog('Тест пройден.'); updateUI(); }
function testFailed() { activeOrder.currentStep = 1; addLog('Тест не пройден. Возврат на диагностику.'); updateUI(); }

function checkKitStatus() {
    const checkboxes = document.querySelectorAll('.kit-checkbox');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    const alertBox = document.getElementById('missing-part-alert');
    const finishBtn = document.getElementById('btn-finish-repair');
    if (allChecked) {
        alertBox.classList.add('hidden');
        finishBtn.disabled = false;
        finishBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
        alertBox.classList.remove('hidden');
        finishBtn.disabled = true;
        finishBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
}

function requestMissingPart() {
    alert('Запрос отправлен на склад.');
    document.querySelectorAll('.kit-checkbox').forEach(cb => cb.checked = true);
    checkKitStatus();
    addLog('Запрошена недостающая комплектация.');
}

function sendAsIs() {
    if (activeOrder.type === 'b2b') {
        const reason = prompt("Укажите причину уценки:", "Неполная комплектация");
        if(reason !== null) { addLog(`Оформлена уценка B2B. Причина: ${reason}`); alert('Товар на уценку.'); completeRepair(); }
    } else {
        if(confirm('Клиент согласен забрать в неполной комплектации?')) { addLog('Согласие клиента получено.'); completeRepair(); }
    }
}

function completeRepair() {
    activeOrder.stepLogs[4] = { time: new Date().toLocaleString('ru-RU'), user: 'Инженер', desc: 'Сборка завершена.' };
    activeOrder.currentStep = 5;
    addLog('Ремонт завершен. Готов к выдаче.');
    updateUI();
    document.getElementById('issue-locked').classList.add('hidden');
    document.getElementById('issue-unlocked').classList.remove('hidden');
    setupIssueTab();
}

function setupIssueTab() {
    if (activeOrder.type === 'b2b') {
        document.getElementById('issue-client-block').classList.add('hidden');
        document.getElementById('issue-b2b-block').classList.remove('hidden');
    } else {
        document.getElementById('issue-client-block').classList.remove('hidden');
        document.getElementById('issue-b2b-block').classList.add('hidden');
    }
}

function toggleB2BDefects() {
    const isDiscount = document.querySelector('input[name="b2b_condition"][value="discount"]').checked;
    document.getElementById('b2b-defects-block').classList.toggle('hidden', !isDiscount);
}

function addLog(text) {
    activeOrder.history.unshift({ time: new Date().toLocaleString('ru-RU'), user: 'Инженер', text: text });
}

function updateUI() {
    renderStepper();
    renderWorkArea();
    renderLogs();
    syncStaticTabs();
}

function renderLogs() {
    const list = document.getElementById('logs-list');
    if (!list) return;
    list.innerHTML = '';
    activeOrder.history.forEach(log => {
        list.innerHTML += `
            <div class="flex border-b border-slate-200 pb-3 mb-3 last:border-0">
                <div class="w-36 text-xs text-slate-500 font-mono pt-1 shrink-0">${log.time}</div>
                <div class="flex-1">
                    <div class="text-sm font-bold text-slate-800 mb-0.5">${log.user}</div>
                    <div class="text-sm text-slate-600">${log.text}</div>
                </div>
            </div>
        `;
    });
}

function syncStaticTabs() {
    if (activeOrder.diagnosis) {
        document.getElementById('static-symptom').value = activeOrder.diagnosis.symptom || '';
        document.getElementById('static-defect').value = activeOrder.diagnosis.defect || '';
        document.getElementById('static-diag-text').value = activeOrder.diagnosis.text || '';
        
        const partsTbody = document.getElementById('static-parts-table');
        partsTbody.innerHTML = '';
        
        if (activeOrder.diagnosis.parts && activeOrder.diagnosis.parts.length > 0) {
            activeOrder.diagnosis.parts.forEach(part => {
                partsTbody.innerHTML += `
                    <tr class="hover:bg-slate-50 transition border-b border-slate-100">
                        <td class="p-4 flex items-center">
                            <div class="w-32 h-32 bg-white border border-slate-200 rounded-lg flex items-center justify-center mr-4 shrink-0 p-2">
                                <img src="${part.img}" class="max-w-full max-h-full object-contain">
                            </div>
                            <span class="font-bold text-slate-800 text-base">${part.name}</span>
                        </td>
                        <td class="p-4 text-center font-bold text-lg">${part.qty || 1} шт.</td>
                        <td class="p-4">
                            <span class="text-sm font-bold text-green-700 bg-green-100 px-3 py-1.5 rounded border border-green-200 inline-block">
                                <i class="fa-solid fa-check mr-1"></i> Списано
                            </span>
                        </td>
                    </tr>
                `;
            });
        } else {
            partsTbody.innerHTML = `<tr><td colspan="3" class="p-6 text-center text-slate-400 italic">Запчасти не выбраны</td></tr>`;
        }
    }
}

// ==========================================
// УПРАВЛЕНИЕ ШРИФТАМИ САЙДБАРА
// ==========================================
const SIDEBAR_FONTS = {
    inter: { label: 'Inter', family: "'Inter', sans-serif" },
    plex: { label: 'Plex', family: "'IBM Plex Sans', sans-serif" },
    mono: { label: 'Mono', family: "'JetBrains Mono', monospace" }
};

function setSidebarFont(fontKey) {
    const aside = document.querySelector('aside');
    const font = SIDEBAR_FONTS[fontKey] || SIDEBAR_FONTS.inter;
    if (aside) {
        aside.style.fontFamily = font.family;
    }
    localStorage.setItem('tgt_sidebar_font', fontKey);

    document.querySelectorAll('.font-switch-btn').forEach(btn => {
        if (btn.dataset.font === fontKey) {
            btn.className = 'font-switch-btn flex-1 py-1 text-xs font-bold rounded bg-blue-600 text-white transition';
        } else {
            btn.className = 'font-switch-btn flex-1 py-1 text-xs font-medium rounded bg-slate-800 text-slate-400 hover:text-white transition';
        }
    });
}

// ==========================================
// ЗАГРУЗКА САЙДБАРА ИЗ ЕДИНОГО ФАЙЛА
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
    let aside = document.querySelector('aside');
    if (!aside) {
        aside = document.createElement('aside');
        document.body.prepend(aside);
    }

    // Жестко фиксированная ширина w-64 (256px) для всех страниц
    aside.className = "w-64 bg-slate-900 text-white flex flex-col shadow-lg z-20 shrink-0";

    try {
        // Загружаем HTML сайдбара с меткой времени (?v=...), чтобы браузер не кешировал файл
        const response = await fetch('sidebar.html?v=' + Date.now());
        const html = await response.text();
        aside.innerHTML = html;

        // Определяем текущую страницу и подсвечиваем пункт меню
        const path = window.location.pathname.split('/').pop() || 'index.html';
        aside.querySelectorAll('nav a, .p-3 a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === path || (path === '' && href === 'index.html') || (path === 'parts.html' && href === 'catalog.html')) {
                link.classList.add('active');
            }
        });

        // Применяем сохраненный шрифт
        const savedFont = localStorage.getItem('tgt_sidebar_font') || 'inter';
        setSidebarFont(savedFont);

    } catch (e) {
        console.error('Ошибка загрузки sidebar.html:', e);
    }
});