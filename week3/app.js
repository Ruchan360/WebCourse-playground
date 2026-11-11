// 1. Dinamik Veri Dizisi (Initial Array Data)
const initialData = [
    {
        id: 1,
        title: "MIS 457 Proje Başlangıcı",
        category: "Yazılım",
        description: "HTML5 ve CSS3 standartlarına uygun web arayüz tasarımı yapılması."
    },
    {
        id: 2,
        title: "UX / UI Erişilebilirlik Testi",
        category: "Tasarım",
        description: "Lighthouse ile Accessibility skorunun en az 90 seviyesine çıkarılması."
    },
    {
        id: 3,
        title: "DOM Manipülasyon Çalışması",
        category: "Yazılım",
        description: "Modern JavaScript kullanarak dinamik içerik yönetimi ve form validation yapılması."
    }
];

// DOM Element Referansları
const projectForm = document.getElementById('projectForm');
const dataListContainer = document.getElementById('dataList');

const titleInput = document.getElementById('title');
const categoryInput = document.getElementById('category');
const descriptionInput = document.getElementById('description');

const titleError = document.getElementById('titleError');
const categoryError = document.getElementById('categoryError');
const descriptionError = document.getElementById('descriptionError');

// Sayfa Yüklendiğinde Olayları Başlat
document.addEventListener('DOMContentLoaded', () => {
    renderList(initialData);
    projectForm.addEventListener('submit', handleFormSubmit);
});

// 2. Dinamik Liste Oluşturma Fonksiyonu (Render Dynamic List from JS Array)
function renderList(items) {
    dataListContainer.innerHTML = '';

    if (items.length === 0) {
        dataListContainer.innerHTML = '<p>Henüz gösterilecek bir kayıt yok.</p>';
        return;
    }

    items.forEach(item => {
        const cardElement = document.createElement('article');
        cardElement.className = 'card';
        cardElement.innerHTML = `
            <h3>${escapeHTML(item.title)}</h3>
            <span class="badge">${escapeHTML(item.category)}</span>
            <p>${escapeHTML(item.description)}</p>
        `;
        dataListContainer.appendChild(cardElement);
    });
}

// 3. Form Doğrulama ve Gönderme İşlemi (Validation Logic & Error Messages)
function handleFormSubmit(event) {
    event.preventDefault();

    // Hata mesajlarını ve stilleri sıfırla
    resetErrors();

    let isValid = true;

    // Başlık Doğrulaması
    const titleValue = titleInput.value.trim();
    if (titleValue === '') {
        showError(titleInput, titleError, 'Lütfen proje / etkinlik başlığını giriniz.');
        isValid = false;
    } else if (titleValue.length < 3) {
        showError(titleInput, titleError, 'Başlık en az 3 karakter olmalıdır.');
        isValid = false;
    }

    // Kategori Doğrulaması
    const categoryValue = categoryInput.value;
    if (categoryValue === '') {
        showError(categoryInput, categoryError, 'Lütfen listeden bir kategori seçiniz.');
        isValid = false;
    }

    // Açıklama Doğrulaması
    const descriptionValue = descriptionInput.value.trim();
    if (descriptionValue === '') {
        showError(descriptionInput, descriptionError, 'Açıklama alanı boş bırakılamaz.');
        isValid = false;
    } else if (descriptionValue.length < 10) {
        showError(descriptionInput, descriptionError, 'Açıklama en az 10 karakter uzunluğunda olmalıdır.');
        isValid = false;
    }

    // Doğrulama başarılıysa diziye ekle ve listeyi güncelle
    if (isValid) {
        const newItem = {
            id: Date.now(),
            title: titleValue,
            category: categoryValue,
            description: descriptionValue
        };

        // Diziyi güncelle ve ekrana yeniden yazdır
        initialData.unshift(newItem);
        renderList(initialData);

        // Formu temizle
        projectForm.reset();
    }
}

// Yardımcı Fonksiyonlar
function showError(inputElement, errorSpan, message) {
    inputElement.classList.add('invalid');
    errorSpan.textContent = message;
}

function resetErrors() {
    [titleInput, categoryInput, descriptionInput].forEach(input => {
        input.classList.remove('invalid');
    });
    [titleError, categoryError, descriptionError].forEach(span => {
        span.textContent = '';
    });
}

// XSS Koruması İçin Metin Temizleme
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}