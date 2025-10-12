document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const forms = document.querySelectorAll('[data-lead-capture]');
  if (!forms.length) return;

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const email = formData.get('email');
      const source = form.dataset.source || 'landing-beta';
      const feedback = document.querySelector(`[data-feedback-for="${source}"]`);

      if (feedback) {
        feedback.textContent = '';
        feedback.removeAttribute('data-status');
      }

      if (!email) {
        if (feedback) {
          feedback.textContent = 'Please enter a valid email address.';
          feedback.setAttribute('data-status', 'error');
        }
        return;
      }

      form.classList.add('is-loading');

      fetch('https://example.com/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          form.reset();
          if (feedback) {
            feedback.textContent = 'Thanks! You’re on the beta waitlist.';
            feedback.setAttribute('data-status', 'success');
          }
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: 'lead_capture', email, source });
        })
        .catch(() => {
          if (feedback) {
            feedback.textContent = 'Something went wrong. Please try again soon.';
            feedback.setAttribute('data-status', 'error');
          }
        })
        .finally(() => {
          form.classList.remove('is-loading');
        });
    });
  });
});
