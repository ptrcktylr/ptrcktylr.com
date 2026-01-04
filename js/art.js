// Art page lightbox functionality
class Lightbox {
    constructor() {
        this.lightbox = null;
        this.init();
    }

    init() {
        // Create lightbox element
        this.createLightbox();

        // Add click handlers to all art images
        const artImages = document.querySelectorAll('.art-image');
        artImages.forEach(img => {
            img.addEventListener('click', () => this.open(img.src, img.alt));
        });
    }

    createLightbox() {
        this.lightbox = document.createElement('div');
        this.lightbox.className = 'lightbox';
        this.lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                <img src="" alt="" class="lightbox-image">
            </div>
        `;
        document.body.appendChild(this.lightbox);

        // Close on background click
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.close();
            }
        });

        // Close button
        const closeBtn = this.lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => this.close());

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.lightbox.classList.contains('active')) {
                this.close();
            }
        });
    }

    open(src, alt) {
        const img = this.lightbox.querySelector('.lightbox-image');
        img.src = src;
        img.alt = alt;
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize lightbox when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Lightbox();
});
