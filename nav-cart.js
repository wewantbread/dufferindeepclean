(function(){
  const CART_IMAGE_DATA_URI = (window.CART_IMAGE_DATA_URI && typeof window.CART_IMAGE_DATA_URI === 'string' && window.CART_IMAGE_DATA_URI.trim()) ?
  window.CART_IMAGE_DATA_URI.trim() : 'data:image/png;base64,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';


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
