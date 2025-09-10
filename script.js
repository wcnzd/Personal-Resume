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

    const elementsToAnimate = document.querySelectorAll('header, section, footer');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});