document.addEventListener('DOMContentLoaded', () => {
    // 文本逐词动画
    const animatedTextElements = document.querySelectorAll('h1, h2, p');
    animatedTextElements.forEach(el => {
        const text = el.textContent.trim();
        const words = text.split(/\s+/); // 按空格分割单词
        el.innerHTML = ''; // 清空原始内容
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.innerHTML = `${word}&nbsp;`; // 添加空格
            span.style.setProperty('--char-index', index);
            el.appendChild(span);
        });
    });

    // 容器进入视窗的观察者
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // 元素进入10%时触发
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // IntersectionObserver现在只观察section和footer
    const elementsToAnimate = document.querySelectorAll('section, footer');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // 新增：滚动缩放header的逻辑
    const header = document.querySelector('header');
    // 初始时让header可见
    if(header) {
        header.classList.add('visible');
    }

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;

        // 在第一个视窗高度内完成动画
        if (scrollY < viewportHeight) {
            const progress = scrollY / viewportHeight;
            const scale = 1 - progress * 0.2; // 从1缩小到0.8
            const opacity = 1 - progress * 1.5; // 加快透明度变化

            header.style.transform = `scale(${Math.max(0.8, scale)})`;
            header.style.opacity = Math.max(0, opacity);
        } else {
             // 超出范围后固定在最终状态
            header.style.transform = 'scale(0.8)';
            header.style.opacity = '0';
        }
    });
});