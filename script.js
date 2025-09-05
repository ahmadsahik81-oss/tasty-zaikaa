// Video modal functionality
const reviewCards = document.querySelectorAll('.review-card');
const videoModal = document.querySelector('.video-modal');
const modalVideo = document.querySelector('.modal-video');
const closeModal = document.querySelector('.close-modal');

reviewCards.forEach(card => {
  card.addEventListener('click', function() {
    const video = this.querySelector('video');
    videoModal.classList.add('active');
    modalVideo.src = video.src;
    modalVideo.muted = false;
    modalVideo.play();
    
    // Update play/pause button
    const playPauseBtn = document.getElementById('play-pause');
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  });
});

closeModal.addEventListener('click', function() {
  videoModal.classList.remove('active');
  modalVideo.pause();
});

// Play/Pause control
const playPauseBtn = document.getElementById('play-pause');
playPauseBtn.addEventListener('click', function() {
  if (modalVideo.paused) {
    modalVideo.play();
    this.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    modalVideo.pause();
    this.innerHTML = '<i class="fas fa-play"></i>';
  }
});

// Mute/Unmute control
const muteUnmuteBtn = document.getElementById('mute-unmute');
muteUnmuteBtn.addEventListener('click', function() {
  if (modalVideo.muted) {
    modalVideo.muted = false;
    this.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    modalVideo.muted = true;
    this.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
});

// Close modal when clicking outside
videoModal.addEventListener('click', function(e) {
  if (e.target === videoModal) {
    videoModal.classList.remove('active');
    modalVideo.pause();
  }
});

// Auto-play videos when they are in view
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.6
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const video = entry.target.querySelector('video');
      video.play();
    } else {
      const video = entry.target.querySelector('video');
      video.pause();
    }
  });
}, observerOptions);

// Observe each review card
reviewCards.forEach(card => {
  observer.observe(card);
});
