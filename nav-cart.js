(function(){
  const CART_IMAGE_DATA_URI = window.CART_IMAGE_DATA_URI || 'data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQCAIAAAD9V4nPAAAE0UlEQVR42u3VMQ0AAAgEsdeCXXyiAxNsNKmCWy7VAwBvRQIAjBAA' +
    'jBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAA' +
    'jBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAA' +
    'I1QBACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACME' +
    'ACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACMEACME' +
    'ACMEwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgB' +
    'wAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgBwAgB' +
    'wAgBwAgBwAgBMEIVADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBC' +
    'ADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBCADBC' +
    'ADBCADBCADBCADBCADBCAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQ' +
    'AIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQ' +
    'AIwQAIwQAIwQAIwQAIwQAIwQAIwQAIwQACOUAAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAj' +
    'BAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAj' +
    'BAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBAAjBMAIVQDACAHACAHACAHACAHACAHACAHACAHACAHACAHACAHACAHACAHACAHA' +
    'CAHACAHACAHACAHACAHACAHACAHACAHACAHACAHACAHACAHACAHACAHACAHACAHACAHACAHACAHACAHACAHACAHACAHACAHACAHA' +
    'CAHACAHACAHACAHACAHACAHACAHACAHACAHACAHACAHACAHACAEwQgAwQgAwQgAwQgAwQgAwQgAwQgAwQgAwQgAwQgAwQgAwQgAw' +
    'QgAwQgAwQgAwQgAwQgAwQgAwQgAwQgAwQgAwQgAwQgAwQgAwQgAwQgAwQgAwQgAwQgAwQgAwQgAwQgAwQgAwQgAwQgAwQgC4sEMVKv0E08xMAAAAAElFTkSuQmCC';

  if(!window.CART_IMAGE_DATA_URI){
    window.CART_IMAGE_DATA_URI = CART_IMAGE_DATA_URI;
  }

  function resolveCartImagePath(){
    const candidates = [];
    if(window.CART_IMAGE_PATH && typeof window.CART_IMAGE_PATH === 'string'){
      candidates.push(window.CART_IMAGE_PATH);
    }
    if(document.body && document.body.dataset && typeof document.body.dataset.cartImage === 'string'){
      candidates.push(document.body.dataset.cartImage);
    }
    for(const candidate of candidates){
      if(candidate && typeof candidate === 'string' && candidate.trim()){
        return candidate.trim();
      }
    }
    return CART_IMAGE_DATA_URI;
  }

  const CART_IMAGE_PATH = resolveCartImagePath();

  if(!window.CART_IMAGE_PATH){
    window.CART_IMAGE_PATH = CART_IMAGE_PATH;
  }

  function applyCartImage(img){
    if(!img){ return; }
    const fallback = CART_IMAGE_DATA_URI;
    const targetSrc = CART_IMAGE_PATH || fallback;
    const shouldListenForErrors = fallback && targetSrc !== fallback;

    function handleError(){
      img.removeEventListener('error', handleError);
      img.src = fallback;
    }

    if(shouldListenForErrors){
      img.addEventListener('error', handleError);
    }

    img.src = targetSrc;
  }

  function clamp(value, min, max){
    return Math.max(min, Math.min(max, value));
  }

  function init(){
    const navCartButton = document.querySelector('[data-cart-toggle]');
    const navPopover = document.getElementById('navCartPopover');
    if(!navCartButton || !navPopover){
      return;
    }

    const navCartCount = navCartButton.querySelector('[data-cart-count]');
    const navCartLabel = navCartButton.querySelector('.nav-cart-label');
    const navImage = navPopover.querySelector('[data-cart-popover-image]');
    const serviceEl = navPopover.querySelector('[data-popover-service]');
    const freqEl = navPopover.querySelector('[data-popover-frequency]');
    const emptyEl = navPopover.querySelector('[data-popover-empty]');
    const detailList = navPopover.querySelector('[data-popover-details]');
    const totalsEl = navPopover.querySelector('[data-popover-totals]');
    const totalValue = navPopover.querySelector('[data-popover-total]');
    const depositValue = navPopover.querySelector('[data-popover-deposit]');
    const balanceValue = navPopover.querySelector('[data-popover-balance]');
    const paymentsEl = navPopover.querySelector('[data-popover-payments]');
    const statusEl = navPopover.querySelector('[data-popover-status]');
    const closeBtn = navPopover.querySelector('[data-cart-close]');
    const googleBtn = navPopover.querySelector('[data-google-pay-button]');
    const navPayPalStatus = navPopover.querySelector('#nav-paypal-status');

    if(navImage && !navImage.getAttribute('src')){
      applyCartImage(navImage);
    }

    let isOpen = false;
    let currentState = null;

    function setAriaExpanded(value){
      navCartButton.setAttribute('aria-expanded', value ? 'true' : 'false');
    }

    function openPopover(){
      if(isOpen) return;
      isOpen = true;
      navPopover.hidden = false;
      navPopover.classList.add('nav-cart-popover-open');
      navCartButton.classList.add('nav-cart-open');
      setAriaExpanded(true);
      document.dispatchEvent(new CustomEvent('nav-cart:opened', { detail: currentState }));
    }

    function closePopover(){
      if(!isOpen) return;
      isOpen = false;
      navPopover.classList.remove('nav-cart-popover-open');
      navCartButton.classList.remove('nav-cart-open');
      setAriaExpanded(false);
      window.setTimeout(() => {
        if(!isOpen){
          navPopover.hidden = true;
        }
      }, 180);
    }

    navCartButton.addEventListener('click', (event) => {
      event.preventDefault();
      if(isOpen){
        closePopover();
      } else {
        openPopover();
      }
    });

    if(closeBtn){
      closeBtn.addEventListener('click', closePopover);
    }

    document.addEventListener('click', (event) => {
      if(!isOpen) return;
      if(navPopover.contains(event.target) || navCartButton.contains(event.target)){
        return;
      }
      closePopover();
    });

    document.addEventListener('keydown', (event) => {
      if(event.key === 'Escape'){
        closePopover();
      }
    });

    function formatCurrency(amount){
      if(!(amount > 0)) return '—';
      return `$${Math.round(amount)}`;
    }

    function renderDetailList(state){
      if(!detailList) return;
      if(!state || !state.cartAdded){
        detailList.hidden = true;
        detailList.innerHTML = '';
        return;
      }

      const rows = [];
      if(state.basePrice){ rows.push(`<dt>Base</dt><dd>${formatCurrency(state.basePrice)}</dd>`); }
      if(state.detailPrice){ rows.push(`<dt>Details</dt><dd>+${formatCurrency(state.detailPrice)}</dd>`); }
      if(state.extrasTotal){ rows.push(`<dt>Add-ons</dt><dd>+${formatCurrency(state.extrasTotal)}</dd>`); }
      if(state.discount){ rows.push(`<dt>Savings</dt><dd>-${formatCurrency(state.discount)}</dd>`); }
      if(state.extrasLabel){ rows.push(`<dt>Included</dt><dd>${state.extrasLabel}</dd>`); }

      detailList.hidden = rows.length === 0;
      detailList.innerHTML = rows.length ? rows.join('') : '<dt>Package</dt><dd>Custom selections</dd>';
    }

    window.updateNavCartPopover = function(state){
      currentState = state || null;
      const hasItem = !!(state && state.cartAdded);

      if(navCartCount){
        navCartCount.hidden = !hasItem;
        navCartCount.textContent = hasItem ? String(clamp(state && state.quantity ? state.quantity : 1, 1, 99)) : '';
      }

      navCartButton.classList.toggle('nav-cart-has-items', hasItem);

      if(navCartLabel){
        navCartLabel.classList.toggle('muted', !hasItem);
      }

      if(serviceEl){
        serviceEl.textContent = hasItem
          ? (state.serviceLabel || 'Custom Package')
          : 'Your cart is empty';
      }

      if(freqEl){
        freqEl.textContent = hasItem
          ? (state.frequencyLabel || 'Choose a frequency to finalise your package.')
          : 'Build a package to see pricing here.';
      }

      if(statusEl){
        const message = state && state.status ? state.status : '';
        statusEl.textContent = message;
        statusEl.hidden = !message;
      }

      if(navPayPalStatus && !(state && state.cartAdded)){
        navPayPalStatus.textContent = '';
        navPayPalStatus.classList.remove('error');
        navPayPalStatus.hidden = true;
      }

      if(emptyEl){
        emptyEl.hidden = hasItem;
      }

      renderDetailList(state);

      if(totalsEl){
        totalsEl.hidden = !hasItem;
        if(hasItem){
          if(totalValue){ totalValue.textContent = formatCurrency(state.total); }
          if(depositValue){ depositValue.textContent = formatCurrency(state.deposit); }
          if(balanceValue){ balanceValue.textContent = formatCurrency(state.balance); }
        }
      }

      if(paymentsEl){
        const showPayments = hasItem && state.deposit && state.deposit > 0;
        paymentsEl.hidden = !showPayments;
        if(googleBtn){
          googleBtn.disabled = !showPayments;
        }
      }

      if(state && state.justAdded){
        navCartButton.classList.add('nav-cart-pulse');
        window.setTimeout(() => navCartButton.classList.remove('nav-cart-pulse'), 900);
        if(isOpen){
          document.dispatchEvent(new CustomEvent('nav-cart:opened', { detail: currentState }));
        }
      }
    };

    window.updateNavCartPopover();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
