function menuToggle() {
    const hideClass = document.querySelector('.menu'); 
    hideClass.classList.toggle('hide')
}

function handleResize() {
    const menu = document.querySelector('.menu')
    if (window.innerWidth > 1000)  {
    menu.classList.remove('hide');
  } else {
    menu.classList.add('hide');
  }
}




const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImg = modal.querySelector('img');
const closeBtn = modal.querySelector('.close-viewer');

gallery.addEventListener('click', (event) => {
  const clickedImg = event.target.closest('img');
  if (clickedImg) {
    const smallSrc = clickedImg.getAttribute('src');
    const altText = clickedImg.getAttribute('alt');
    const baseName = smallSrc.split('-')[0];
    const fullSrc = `${baseName}-full.jpeg`;

    modalImg.setAttribute('src', fullSrc);
    modalImg.setAttribute('alt', altText);
    modal.showModal();
  }
});

closeBtn.addEventListener('click', () => {
  modal.close();
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.close();
  }
});


handleResize();

window.addEventListener('resize', handleResize);

document.querySelector('#menu-button').addEventListener('click', menuToggle);
