// Aquí puedes agregar código para interacciones futuras:
// Ejemplo: cambiar clase del menú activo según la URL
document.querySelectorAll('.menu a').forEach(link => {
  if (link.href === location.href) {
    link.classList.add('active');
  }
});

// Funcionalidad del modal de imagen
document.addEventListener('DOMContentLoaded', function() {
  // Crear el modal si no existe
  if (!document.getElementById('imageModal')) {
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'image-modal';
    modal.innerHTML = `
      <span class="close-modal">&times;</span>
      <div class="modal-nav modal-prev">&#8249;</div>
      <img class="modal-content" id="modalImage">
      <div class="modal-nav modal-next">&#8250;</div>
    `;
    document.body.appendChild(modal);
  }

  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const closeBtn = document.querySelector('.close-modal');
  const prevBtn = document.querySelector('.modal-prev');
  const nextBtn = document.querySelector('.modal-next');
  
  let currentImageIndex = 0;
  const totalImages = 8; // Total de imágenes en la galería

  // Función para mostrar imagen en grande
  window.setImageLarge = function(itemClass) {
    const item = document.querySelector(`.${itemClass}`);
    const img = item.querySelector('img');
    
    // Obtener el índice de la imagen actual
    const itemNumber = itemClass.replace('item-', '');
    currentImageIndex = parseInt(itemNumber) - 1;
    
    if (img && img.src) {
      modalImg.src = img.src;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  // Función para navegar a la imagen anterior
  function showPrevImage() {
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : totalImages - 1;
    const newItem = document.querySelector(`.item-${currentImageIndex + 1}`);
    const newImg = newItem.querySelector('img');
    modalImg.src = newImg.src;
  }

  // Función para navegar a la imagen siguiente
  function showNextImage() {
    currentImageIndex = currentImageIndex < totalImages - 1 ? currentImageIndex + 1 : 0;
    const newItem = document.querySelector(`.item-${currentImageIndex + 1}`);
    const newImg = newItem.querySelector('img');
    modalImg.src = newImg.src;
  }

  // Event listeners para navegación
  prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    showPrevImage();
  });

  nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    showNextImage();
  });

  // Cerrar modal al hacer clic en la X
  closeBtn.addEventListener('click', function() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  // Cerrar modal al hacer clic fuera de la imagen
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Navegación con teclado
  document.addEventListener('keydown', function(e) {
    if (modal.classList.contains('active')) {
      switch(e.key) {
        case 'Escape':
          modal.classList.remove('active');
          document.body.style.overflow = 'auto';
          break;
        case 'ArrowLeft':
          showPrevImage();
          break;
        case 'ArrowRight':
          showNextImage();
          break;
      }
    }
  });
});

// Funcionalidad del botón scroll to top
document.addEventListener('DOMContentLoaded', function() {
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  // Mostrar/ocultar el botón según el scroll
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });
  
  // Función para hacer scroll suave hacia arriba
  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Funcionalidad de navegación suave
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Calcular la posición teniendo en cuenta el header fijo
        const headerHeight = document.querySelector('.main-header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20; // 20px de margen extra
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Función para actualizar el enlace activo basado en el scroll
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.querySelector('.main-header').offsetHeight;
    const scrollPosition = window.pageYOffset + headerHeight + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remover clase active de todos los enlaces
        navLinks.forEach(link => link.classList.remove('active'));
        // Agregar clase active al enlace correspondiente
        if (correspondingLink) {
          correspondingLink.classList.add('active');
        }
      }
    });
  }

  // Agregar listener para scroll que actualice el enlace activo
  window.addEventListener('scroll', updateActiveNavLink);
  
  // Ejecutar una vez al cargar para establecer el estado inicial
  updateActiveNavLink();
});
