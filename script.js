const STORAGE_KEY = 'agenda_compacta_db';
let contacts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const el = id => document.getElementById(id);
const form = el('contact-form'), contactIdInput = el('contact-id'), nomeInput = el('nome'), 
      telefoneInput = el('telefone'), emailInput = el('email'), categoriaSelect = el('categoria'), 
      contactsContainer = el('contacts-container'), searchInput = el('search-input'), 
      formTitle = el('form-title'), btnSave = el('btn-save'), btnCancel = el('btn-cancel'), toast = el('toast');

// Inicialização
document.addEventListener('DOMContentLoaded', () => render(contacts));

// Máscara Automática de Telefone: (xx) xxxxx-xxxx ou (xx) xxxx-xxxx
telefoneInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').substring(0, 11);
    if (v.length > 6) {
        v = v.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (v.length > 2) {
        v = v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else if (v.length > 0) {
        v = v.replace(/^(\d*)/, '($1');
    }
    e.target.value = v;
});

// Toast Feedback
function showToast(msg, isError = false) {
    toast.textContent = msg;
    toast.className = `toast ${isError ? 'error' : ''}`;
    setTimeout(() => toast.classList.remove('hidden'), 50);
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

// Salvar / Atualizar (Create & Update)
form.addEventListener('submit', e => {
    e.preventDefault();
    const id = contactIdInput.value;
    const data = { id: id || Date.now().toString(), nome: nomeInput.value.trim(), telefone: telefoneInput.value.trim(), email: emailInput.value.trim(), categoria: categoriaSelect.value };

    if (!data.nome || !data.telefone) return showToast('Preencha os campos obrigatórios!', true);

    if (id) {
        contacts = contacts.map(c => c.id === id ? data : c);
        showToast('Contato atualizado!');
    } else {
        contacts.push(data);
        showToast('Contato salvo!');
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    render(contacts);
    resetForm();
});

// Renderizar Lista (Read)
function render(list) {
    contactsContainer.innerHTML = '';
    if (!list.length) {
        contactsContainer.innerHTML = `<div class="empty-state"><i class="fa-solid fa-address-book"></i><p>Nenhum contato encontrado.</p></div>`;
        return;
    }

    list.forEach(c => {
        const card = document.createElement('div');
        card.className = 'contact-card';
        card.innerHTML = `
            <div class="contact-header">
                <span class="contact-name"></span>
                <span class="badge">${c.categoria}</span>
            </div>
            ${c.telefone ? `<div class="contact-info"><i class="fa-solid fa-phone"></i> <span></span></div>` : ''}
            ${c.email ? `<div class="contact-info"><i class="fa-solid fa-envelope"></i> <span></span></div>` : ''}
            <div class="contact-actions">
                <button class="action-btn btn-edit"><i class="fa-solid fa-pen"></i> Editar</button>
                <button class="action-btn btn-delete"><i class="fa-solid fa-trash"></i> Excluir</button>
            </div>
        `;
        
        // Proteção contra XSS usando textContent
        card.querySelector('.contact-name').textContent = c.nome;
        if (c.telefone) card.querySelectorAll('.contact-info span')[0].textContent = c.telefone;
        if (c.email) card.querySelectorAll('.contact-info span')[c.telefone ? 1 : 0].textContent = c.email;

        card.querySelector('.btn-edit').onclick = () => prepareEdit(c.id);
        card.querySelector('.btn-delete').onclick = () => deleteContact(c.id);

        contactsContainer.appendChild(card);
    });
}

// Preparar Edição
function prepareEdit(id) {
    const c = contacts.find(item => item.id === id);
    if (!c) return;
    contactIdInput.value = c.id;
    nomeInput.value = c.nome;
    telefoneInput.value = c.telefone;
    emailInput.value = c.email;
    categoriaSelect.value = c.categoria;
    formTitle.innerHTML = `<i class="fa-solid fa-user-pen"></i> Editar`;
    btnSave.textContent = 'Atualizar';
    btnCancel.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Excluir (Delete)
function deleteContact(id) {
    if (!confirm('Deseja excluir este contato?')) return;
    contacts = contacts.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    render(contacts);
    showToast('Contato excluído!');
}

// Cancelar Edição
btnCancel.addEventListener('click', () => { resetForm(); showToast('Edição cancelada.'); });

function resetForm() {
    form.reset();
    contactIdInput.value = '';
    formTitle.innerHTML = `<i class="fa-solid fa-user-plus"></i> Novo Contato`;
    btnSave.textContent = 'Salvar';
    btnCancel.classList.add('hidden');
}

// Busca em Tempo Real
searchInput.addEventListener('input', e => {
    const term = e.target.value.toLowerCase();
    render(contacts.filter(c => c.nome.toLowerCase().includes(term) || c.telefone.includes(term)));
});