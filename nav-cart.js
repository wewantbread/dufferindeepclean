(function(){
  const CART_IMAGE_DATA_URI = (window.CART_IMAGE_DATA_URI && typeof window.CART_IMAGE_DATA_URI === 'string' && window.CART_IMAGE_DATA_URI.trim()) ? window.CART_IMAGE_DATA_URI : 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+ICA8ZGVmcz4KICAgIDxyYWRpYWxHcmFkaWVudCBpZD0iYmciIGN4PSI1MCUiIGN5PSI0NSUiIHI9IjY1JSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM3NDQ2ZmYiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjU1JSIgc3RvcC1jb2xvcj0iIzVhMmFjNCIgc3RvcC1vcGFjaXR5PSIwLjkyIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzJkMTA1OCIgc3RvcC1vcGFjaXR5PSIwLjk4Ii8+CiAgICA8L3JhZGlhbEdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJnbG93IiB4MT0iMCIgeDI9IjAiIHkxPSIwIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmN2I1ZmYiIHN0b3Atb3BhY2l0eT0iMC45Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2UxNmVmZiIgc3RvcC1vcGFjaXR5PSIwLjU1Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJidWNrZXQiIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzUyMmI4NSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IjZmMzViNiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iaGFuZGxlIiB4MT0iMCIgeDI9IjAiIHkxPSIwIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNlZmU1ZmYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjY2JkM2ZmIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJicm9vbSIgeDE9IjAiIHgyPSIxIiB5MT0iMCIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZjdkMjdjIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2ZiYjE0YSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0idmFjIiB4MT0iMCIgeDI9IjAiIHkxPSIwIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM0MjI1NjgiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMmYxMzRiIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGZpbHRlciBpZD0ic2hhZG93IiB4PSItMjAlIiB5PSItMjAlIiB3aWR0aD0iMTQwJSIgaGVpZ2h0PSIxNDAiPgogICAgICA8ZmVEcm9wU2hhZG93IGR4PSIwIiBkeT0iMTIiIHN0ZERldmlhdGlvbj0iMTgiIGZsb29kLWNvbG9yPSIjMTIwNjI2IiBmbG9vZC1vcGFjaXR5PSIwLjYiLz4KICAgIDwvZmlsdGVyPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0idXJsKCNiZykiLz4KICA8ZWxsaXBzZSBjeD0iMzAwIiBjeT0iNDcwIiByeD0iMjIwIiByeT0iNzAiIGZpbGw9IiMxODA3MzAiIG9wYWNpdHk9IjAuNzUiLz4KICA8ZyBmaWx0ZXI9InVybCgjc2hhZG93KSI+CiAgICA8cGF0aCBkPSJNMTc0IDE3MGgyNTJhMTQgMTQgMCAwIDEgMTQgMTR2MzRhMTQgMTQgMCAwIDEtMTQgMTRIMTc0YTE0IDE0IDAgMCAxLTE0LTE0di0zNGExNCAxNCAwIDAgMSAxNC0xNHoiIGZpbGw9InVybCgjZ2xvdykiIG9wYWNpdHk9IjAuODUiLz4KICAgIDx0ZXh0IHg9IjMwMCIgeT0iMjA1IiBmb250LWZhbWlseT0iJ0JlYmFzIE5ldWUnLCAnQXJpYWwgQmxhY2snLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQ4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMmQwZjQ3IiBsZXR0ZXItc3BhY2luZz0iNiI+ZHVmZmVyaW5kZWVwY2xlYW48L3RleHQ+CiAgPC9nPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1MCAyNDApIj4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0MCAtMjApIj4KICAgICAgPHBhdGggZD0iTTExMCAwYzI4IDAgNTIgMjEgNTUgNDlsMTYgMTYyYzEgOS02IDE3LTE1IDE3SDU0Yy05IDAtMTYtOC0xNS0xN2wxNi0xNjJDNTggMjEgODIgMCAxMTAgMHoiIGZpbGw9InVybCgjYnVja2V0KSIvPgogICAgICA8cGF0aCBkPSJNNDYgNzZoMTI4bDcgNzBIMzl6IiBmaWxsPSIjN2M0OWQwIiBvcGFjaXR5PSIwLjQiLz4KICAgICAgPHBhdGggZD0iTTg4IC0zMmg0NGwyMCA3MEg2OHoiIGZpbGw9InVybCgjaGFuZGxlKSIvPgogICAgICA8cmVjdCB4PSI5MiIgeT0iLTUwIiB3aWR0aD0iMzYiIGhlaWdodD0iMjAiIHJ4PSIxMCIgZmlsbD0iI2ZlZjZmZiIgc3Ryb2tlPSIjY2JjOWZmIiBzdHJva2Utd2lkdGg9IjQiLz4KICAgIDwvZz4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQwIDIwKSI+CiAgICAgIDxwYXRoIGQ9Ik00NiAtNDBoMjRsMjQgMzIwaC0yNHoiIGZpbGw9IiNmOGU5ZmYiIHN0cm9rZT0iI2Q0YzBmZiIgc3Ryb2tlLXdpZHRoPSI2Ii8+CiAgICAgIDxwYXRoIGQ9Ik0tMTAgMjYwaDE2MGwxMiA1NGMyIDgtNCAxNi0xMiAxNkgtMzRjLTggMC0xNC04LTEyLTE2eiIgZmlsbD0idXJsKCNicm9vbSkiIHN0cm9rZT0iI2Y1OWQzMiIgc3Ryb2tlLXdpZHRoPSI2Ii8+CiAgICAgIDxwYXRoIGQ9Ik0tMjQgMjYwaDIwMCIgc3Ryb2tlPSIjZmFjYTY2IiBzdHJva2Utd2lkdGg9IjEyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIG9wYWNpdHk9IjAuNjUiLz4KICAgIDwvZz4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI2MCAxMCkiPgogICAgICA8cGF0aCBkPSJNMTIwIC0yMGMxNCAwIDI2IDEwIDI4IDI0bDI2IDI1MGMyIDE2LTEwIDMwLTI2IDMwSDY2Yy0xNiAwLTI4LTE0LTI2LTMwbDI2LTI1MGMyLTE0IDE0LTI0IDI4LTI0eiIgZmlsbD0idXJsKCN2YWMpIi8+CiAgICAgIDxwYXRoIGQ9Ik0xMDQgLTU0aDMybDEwIDM4aC01MnoiIGZpbGw9IiM1ZDJmOGYiLz4KICAgICAgPHJlY3QgeD0iOTIiIHk9Ii05NiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjQ4IiByeD0iMjIiIGZpbGw9IiNmMGU3ZmYiIHN0cm9rZT0iI2QzYzlmZiIgc3Ryb2tlLXdpZHRoPSI2Ii8+CiAgICAgIDxyZWN0IHg9IjEyIiB5PSIyMzYiIHdpZHRoPSIyMDAiIGhlaWdodD0iNDIiIHJ4PSIxOCIgZmlsbD0iIzYyMzQ5YSIvPgogICAgPC9nPgogICAgPGcgb3BhY2l0eT0iMC43MiI+CiAgICAgIDxjaXJjbGUgY3g9IjIwNiIgY3k9IjI2IiByPSI4IiBmaWxsPSIjZmVmNmZmIi8+CiAgICAgIDxjaXJjbGUgY3g9IjIzNiIgY3k9Ii0xNiIgcj0iNiIgZmlsbD0iI2ZlZjZmZiIvPgogICAgICA8Y2lyY2xlIGN4PSIxNzYiIGN5PSItMTIiIHI9IjUiIGZpbGw9IiNmZWY2ZmYiLz4KICAgICAgPGNpcmNsZSBjeD0iMjQ2IiBjeT0iNTYiIHI9IjUiIGZpbGw9IiNmZWY2ZmYiLz4KICAgICAgPGNpcmNsZSBjeD0iMTE2IiBjeT0iMTYiIHI9IjYiIGZpbGw9IiNmZWY2ZmYiLz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPg==';


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
