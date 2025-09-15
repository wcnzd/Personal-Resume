document.addEventListener('DOMContentLoaded', () => {
    const panels = document.querySelectorAll('.panel');
    const header = document.querySelector('header');

    const updateAnimation = () => {
        const viewportHeight = window.innerHeight;
        const scrollY = window.scrollY;

        // 处理Header的滚动缩放
        if (header) {
            const headerScrollDistance = Math.min(scrollY, viewportHeight);
            const progress = headerScrollDistance / viewportHeight;
            const scale = 1 - progress * 0.2;
            const opacity = 1 - progress * 1.5;
            header.style.transform = `scale(${Math.max(0.8, scale)})`;
            header.style.opacity = Math.max(0, opacity);
        }

        // 处理每个panel内部的动画
        panels.forEach(panel => {
            const section = panel.querySelector('section, footer');
            if (!section) return;

            const contentElements = section.querySelectorAll('h2, p, .email-link');
            const panelTop = panel.offsetTop;
            const panelHeight = panel.offsetHeight;

            // 计算滚动进度 (0 = panel顶部与视窗顶部对齐, 1 = panel底部与视窗底部对齐)
            const progress = (scrollY - panelTop + viewportHeight) / (panelHeight);

            // 我们只关心在panel可见区域内的动画
            if (progress >= 0 && progress <= 1) {
                
                // 设计一个简单的动画曲线：在进度0.2到0.8之间达到顶峰
                const animationProgress = Math.max(0, Math.min(1, (progress - 0.2) / 0.6));
                
                const opacity = animationProgress;
                // 从下方20px处移入
                const translateY = (1 - animationProgress) * 20;

                contentElements.forEach((el, index) => {
                    // 添加微小的延迟
                    const delay = index * 0.1;
                    const delayedProgress = Math.max(0, Math.min(1, (progress - 0.2 - delay) / 0.5));
                    const delayedOpacity = delayedProgress;
                    const delayedTranslateY = (1 - delayedProgress) * 20;

                    el.style.opacity = delayedOpacity;
                    el.style.transform = `translateY(${delayedTranslateY}px)`;
                });
            }
        });
    };

    // 初始调用一次以设置初始状态
    updateAnimation();
    // 添加滚动事件监听
    window.addEventListener('scroll', updateAnimation);
});