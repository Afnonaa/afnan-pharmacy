// script.js

// بيانات المنتجات (Product Cards)
const products = [
    {
        id: 1,
        nameAr: "بانادول أكسترا",
        nameEn: "Panadol Extra",
        price: "45",
        image: "💊",
        category: "medications"
    },
    {
        id: 2,
        nameAr: "كريم هيدروكورتيزون",
        nameEn: "Hydrocortisone Cream",
        price: "65",
        image: "🧴",
        category: "skincare"
    },
    {
        id: 3,
        nameAr: "حليب أبتاميل",
        nameEn: "Aptamil Milk",
        price: "120",
        image: "🍼",
        category: "babycare"
    },
    {
        id: 4,
        nameAr: "فيتامين D3 1000 وحدة",
        nameEn: "Vitamin D3 1000 IU",
        price: "85",
        image: "💊",
        category: "vitamins"
    },
    {
        id: 5,
        nameAr: "جهاز قياس السكر",
        nameEn: "Blood Glucose Monitor",
        price: "250",
        image: "📟",
        category: "devices"
    },
    {
        id: 6,
        nameAr: "شامبو هيد أند شولدرز",
        nameEn: "Head & Shoulders Shampoo",
        price: "75",
        image: "🧴",
        category: "skincare"
    }
];

// دالة إنشاء كروت المنتجات
function renderProducts(filteredProducts = products) {
    const container = document.getElementById('products-grid');
    container.innerHTML = '';

    filteredProducts.forEach(product => {
        const isArabic = document.documentElement.lang === 'ar';
        
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                ${product.image}
            </div>
            <div class="product-info">
                <div class="product-name">
                    ${isArabic ? product.nameAr : product.nameEn}
                </div>
                <div class="product-price">
                    ${product.price} جنيه
                </div>
                <button onclick="addToCart(${product.id})">
                    ${isArabic ? 'أضف إلى السلة' : 'Add to Cart'}
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// وظيفة البحث الذكي
function smartSearch() {
    const input = document.getElementById('search-input').value.toLowerCase().trim();
    
    if (input === '') {
        renderProducts();
        return;
    }

    const filtered = products.filter(product => {
        const nameAr = product.nameAr.toLowerCase();
        const nameEn = product.nameEn.toLowerCase();
        return nameAr.includes(input) || nameEn.includes(input);
    });

    renderProducts(filtered);
}

// إضافة إلى السلة (مثال بسيط)
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const isArabic = document.documentElement.lang === 'ar';
    
    alert(isArabic 
        ? `تم إضافة ${product.nameAr} إلى السلة ✅` 
        : `Added ${product.nameEn} to cart ✅`
    );
}

// تبديل اللغة (عربي / إنجليزي)
let currentLang = 'ar';

function switchLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    
    const html = document.documentElement;
    html.lang = currentLang;
    html.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    const langBtn = document.getElementById('lang-btn');
    langBtn.textContent = currentLang === 'ar' ? 'EN' : 'AR';

    updateTexts();
    renderProducts(); // إعادة رسم الكروت باللغة الجديدة
}

// تحديث النصوص حسب اللغة
function updateTexts() {
    const isArabic = currentLang === 'ar';

    // العناوين الرئيسية
    document.getElementById('categories-title').textContent = isArabic 
        ? 'الأقسام الرئيسية (Categories)' 
        : 'Main Categories (Categories)';

    document.getElementById('search-title').textContent = isArabic 
        ? 'محرك بحث ذكي (Smart Search Bar)' 
        : 'Smart Search Bar';

    document.getElementById('support-title').textContent = isArabic 
        ? 'التواصل السريع (Quick Support)' 
        : 'Quick Support';

    document.getElementById('products-title').textContent = isArabic 
        ? 'منتجات مميزة' 
        : 'Featured Products';

    // نصوص أخرى
    document.getElementById('search-note').textContent = isArabic 
        ? 'يجب أن يكون في أعلى الصفحة وواضح جداً' 
        : 'Must be at the top of the page and very clear';

    document.getElementById('colors-text').textContent = isArabic 
        ? 'ألوان مريحة وهادئة (أبيض مع أخضر، أو أزرق فاتح)' 
        : 'Calm and relaxing colors (White with Green, or Light Blue)';

    // تحديث نصوص الكاتيجوري
    const categorySpans = document.querySelectorAll('.category-card span');
    const categoryTexts = isArabic 
        ? [
            'الأدوية (Medications)',
            'العناية بالبشرة (Skin Care)',
            'العناية بالأم والطفل (Baby Care)',
            'الفيتامينات والمكملات الغذائية',
            'الأجهزة الطبية (جهاز ضغط، سكر، إلخ)'
          ]
        : [
            'Medications',
            'Skin Care',
            'Baby & Mother Care',
            'Vitamins & Supplements',
            'Medical Devices (Pressure, Sugar, etc.)'
          ];

    categorySpans.forEach((span, index) => {
        span.textContent = categoryTexts[index];
    });

    // تحديث placeholder البحث
    const searchInput = document.getElementById('search-input');
    searchInput.placeholder = isArabic 
        ? 'ابحث عن دواء... (مثال: Panadol أو بانادول)' 
        : 'Search for medication... (e.g. Panadol)';
}

// تشغيل الكود عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateTexts();
});
