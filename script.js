fetch('posts.json')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('post-list');
        const category = container.dataset.category;

        data[category].forEach(post => {
            const link = document.createElement('a');
            link.href = post.url;
            link.textContent = post.title;
            container.appendChild(link);
            container.appendChild(document.createElement('br'));
        });
    });

