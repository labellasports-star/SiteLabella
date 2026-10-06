import { contact, defaultQuoteMessage } from '../config/contact';
import { findProduct, formatPrice, products, type Product } from '../data/catalog';
import { shieldOptions } from '../data/shields';

const toast = document.querySelector<HTMLElement>('#site-toast');
let toastTimer: number | undefined;

function showToast(message: string) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 4200);
}

function formatQuote(product?: Product, builderMessage?: string, customMessage?: string) {
  if (builderMessage) return builderMessage;
  if (customMessage) return customMessage;
  return product ? `Olá! Tenho interesse no modelo ${product.name.toUpperCase()} da Labella Sports e gostaria de solicitar um orçamento.` : defaultQuoteMessage;
}

function startQuote(product?: Product, builderMessage?: string, customMessage?: string) {
  const message = formatQuote(product, builderMessage, customMessage);
  const url = `${contact.whatsappUrl}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function setupMobileMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('is-open', !expanded);
    document.body.classList.toggle('menu-open', !expanded);
  });

  menu.querySelectorAll('a, button').forEach((item) => item.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  }));
}

function setupFilters() {
  const filters = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
  const cards = document.querySelectorAll<HTMLElement>('[data-product-card]');
  const count = document.querySelector<HTMLElement>('[data-catalog-count]');

  filters.forEach((button) => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;
    filters.forEach((candidate) => candidate.setAttribute('aria-pressed', String(candidate === button)));
    cards.forEach((card) => {
      const matches = filter === 'todos' || card.dataset.categories?.split(' ').includes(filter ?? '');
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });
    if (count) count.textContent = String(visibleCount);
  }));
}

function setupProductDialog() {
  const dialog = document.querySelector<HTMLDialogElement>('[data-product-dialog]');
  const content = document.querySelector<HTMLElement>('[data-product-dialog-content]');
  if (!dialog || !content) return;

  document.querySelectorAll<HTMLButtonElement>('[data-product-detail]').forEach((button) => button.addEventListener('click', () => {
    const product = findProduct(button.dataset.productDetail ?? '');
    if (!product) return;
    const list = product.specifications?.map((item) => `<li>${item}</li>`).join('') ?? '';
    const conditions = product.conditions?.map((item) => `<li>${item}</li>`).join('') ?? '';
    content.innerHTML = `
      <div class="dialog__visual ${product.image ? 'dialog__visual--photo' : ''}">
        ${product.image ? `<img class="dialog__product-image" src="${product.image}" alt="Uniforme ${product.name}" />` : ''}
        <div class="dialog__visual-copy"><span>MODELO</span><i></i><p>${product.image ? 'Foto oficial do produto' : 'Foto oficial em atualização'}</p></div>
      </div>
      <div class="dialog__content">
        <span class="eyebrow"><i></i> ${product.categoryLabel}</span>
        <h2 id="product-dialog-title">${product.name}</h2>
        <p class="dialog__price">${product.priceDisplay}</p>
        ${product.sizes ? `<p class="dialog__sizes"><strong>Tamanhos:</strong> ${product.sizes}</p>` : ''}
        ${list ? `<div class="dialog__details"><h3>Especificações</h3><ul>${list}</ul></div>` : ''}
        ${product.shield ? `<div class="dialog__details"><h3>Opções de escudo</h3><p>${product.shield}</p></div>` : ''}
        ${conditions ? `<div class="dialog__details"><h3>Condições comerciais</h3><ul>${conditions}</ul></div>` : ''}
        ${product.note ? `<p class="dialog__note">${product.note}</p>` : ''}
        <button class="button button--red" type="button" data-quote data-product-id="${product.id}">Solicitar orçamento <span aria-hidden="true">↗</span></button>
      </div>`;
    dialog.showModal();
  }));

  dialog.querySelector('[data-modal-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

function setupBuilder() {
  const configurator = document.querySelector<HTMLElement>('[data-configurator]');
  if (!configurator) return;
  const shirt = configurator.querySelector<HTMLSelectElement>('[data-builder-select="shirt"]');
  const shorts = configurator.querySelector<HTMLSelectElement>('[data-builder-select="shorts"]');
  const socks = configurator.querySelector<HTMLSelectElement>('[data-builder-select="socks"]');
  const sockToggles = configurator.querySelectorAll<HTMLButtonElement>('[data-socks-toggle]');
  const sockSelectWrap = configurator.querySelector<HTMLElement>('[data-sock-select-wrap]');
  const quantity = configurator.querySelector<HTMLInputElement>('[data-builder-quantity]');
  const decrease = configurator.querySelector<HTMLButtonElement>('[data-quantity-decrease]');
  const increase = configurator.querySelector<HTMLButtonElement>('[data-quantity-increase]');
  const unitTotal = configurator.querySelector<HTMLElement>('[data-builder-unit-total]');
  const quantitySummary = configurator.querySelector<HTMLElement>('[data-builder-quantity-summary]');
  const total = configurator.querySelector<HTMLElement>('[data-builder-total]');
  const summary = configurator.querySelector<HTMLElement>('[data-builder-summary]');
  const quote = configurator.querySelector<HTMLButtonElement>('[data-builder-quote]');
  const shirtShieldButtons = configurator.querySelectorAll<HTMLButtonElement>('[data-shield-choice="shirt"]');
  const shortsShieldButtons = configurator.querySelectorAll<HTMLButtonElement>('[data-shield-choice="shorts"]');
  const vintageNotice = configurator.querySelector<HTMLElement>('[data-vintage-notice]');
  const vintageToggles = configurator.querySelectorAll<HTMLButtonElement>('[data-vintage-toggle]');
  if (!shirt || !shorts || !socks || !quantity || !decrease || !increase || !unitTotal || !quantitySummary || !total || !summary || !quote || !sockSelectWrap || sockToggles.length !== 2) return;

  let includesSocks = false;
  let shirtShield = 'sublimado';
  let shortsShield = 'sublimado';
  let vintageCanChange = false;
  let wasVintage = false;

  const validQuantity = () => {
    const parsed = Number(quantity.value);
    return Number.isInteger(parsed) && parsed >= 10 ? parsed : 10;
  };
  const normalizeQuantity = () => { quantity.value = String(validQuantity()); };
  const selectedShield = (id: string) => {
    const option = id === 'shirt' ? shirtShield : shortsShield;
    return shieldOptions.find((item) => item.id === option);
  };
  const shieldPrice = (id: string, product: Product) => {
    const option = selectedShield(id);
    if (!option) return 0;
    if (id === 'shirt' && product.id === 'vintage' && option.id === 'tpu-3d') return 0;
    return option.price;
  };
  const setShieldButtons = (buttons: NodeListOf<HTMLButtonElement>, selected: string, disabled = false) => {
    buttons.forEach((button) => {
      const active = button.dataset.shieldId === selected;
      button.disabled = disabled && !active;
      button.classList.toggle('is-active', active);
      button.classList.toggle('is-disabled', button.disabled);
      button.setAttribute('aria-pressed', String(active));
    });
  };
  const syncVintageState = () => {
    const isVintage = shirt.value === 'vintage';
    if (isVintage && !vintageCanChange) shirtShield = 'tpu-3d';
    if (!isVintage && wasVintage) {
      shirtShield = 'sublimado';
      vintageCanChange = false;
    }
    wasVintage = isVintage;
    if (vintageNotice) vintageNotice.hidden = !isVintage;
    setShieldButtons(shirtShieldButtons, shirtShield, isVintage && !vintageCanChange);
    vintageToggles.forEach((button) => {
      const active = (button.dataset.vintageToggle === 'change') === vintageCanChange;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  };
  const setText = (selector: string, value: string) => {
    configurator.querySelectorAll<HTMLElement>(selector).forEach((element) => { element.textContent = value; });
  };
  const update = () => {
    normalizeQuantity();
    syncVintageState();
    const shirtProduct = findProduct(shirt.value);
    const shortsProduct = findProduct(shorts.value);
    const socksProduct = includesSocks ? findProduct(socks.value) : undefined;
    if (!shirtProduct || !shortsProduct) return;
    const units = validQuantity();
    const shirtAddon = shieldPrice('shirt', shirtProduct);
    const shortsAddon = shieldPrice('shorts', shortsProduct);
    const shirtUnit = shirtProduct.price + shirtAddon;
    const shortsUnit = shortsProduct.price + shortsAddon;
    const socksUnit = socksProduct?.price ?? 0;
    const perUniform = shirtUnit + shortsUnit + socksUnit;
    const shirtSubtotal = shirtUnit * units;
    const shortsSubtotal = shortsUnit * units;
    const socksSubtotal = socksUnit * units;
    const orderTotal = perUniform * units;
    const shirtShieldOption = selectedShield('shirt');
    const shortsShieldOption = selectedShield('shorts');

    unitTotal.textContent = formatPrice(perUniform);
    quantitySummary.textContent = `${units} UNIDADES`;
    total.textContent = formatPrice(orderTotal);
    summary.textContent = `${shirtProduct.name} + ${shortsProduct.name}${socksProduct ? ` + ${socksProduct.name}` : ''}`;
    setText('[data-summary-shirt]', shirtProduct.name);
    setText('[data-summary-shorts]', shortsProduct.name);
    setText('[data-summary-quantity]', String(units));
    setText('[data-summary-shirt-shield]', shirtShieldOption?.name ?? 'Sublimado');
    setText('[data-summary-shorts-shield]', shortsShieldOption?.name ?? 'Sublimado');
    setText('[data-summary-shirt-unit]', formatPrice(shirtProduct.price));
    setText('[data-summary-shorts-unit]', formatPrice(shortsProduct.price));
    setText('[data-summary-shirt-shield-add]', `${formatPrice(shirtAddon)}/un.`);
    setText('[data-summary-shorts-shield-add]', `${formatPrice(shortsAddon)}/un.`);
    setText('[data-summary-shirt-subtotal]', formatPrice(shirtSubtotal));
    setText('[data-summary-shorts-subtotal]', formatPrice(shortsSubtotal));
    setText('[data-summary-socks-quantity]', includesSocks ? String(units) : '0');
    setText('[data-summary-socks-subtotal]', formatPrice(socksSubtotal));
    setShieldButtons(shortsShieldButtons, shortsShield);
    quote.disabled = units < 10;
    quote.setAttribute('aria-disabled', String(quote.disabled));
  };

  [shirt, shorts, socks].forEach((select) => select.addEventListener('change', update));
  shirtShieldButtons.forEach((button) => button.addEventListener('click', () => {
    if (button.disabled) return;
    shirtShield = button.dataset.shieldId ?? 'sublimado';
    update();
  }));
  shortsShieldButtons.forEach((button) => button.addEventListener('click', () => {
    shortsShield = button.dataset.shieldId ?? 'sublimado';
    update();
  }));
  vintageToggles.forEach((toggle) => toggle.addEventListener('click', () => {
    vintageCanChange = toggle.dataset.vintageToggle === 'change';
    if (!vintageCanChange) shirtShield = 'tpu-3d';
    update();
  }));
  sockToggles.forEach((toggle) => toggle.addEventListener('click', () => {
    includesSocks = toggle.dataset.socksToggle === 'yes';
    socks.disabled = !includesSocks;
    sockSelectWrap.hidden = !includesSocks;
    sockToggles.forEach((candidate) => {
      const active = candidate === toggle;
      candidate.classList.toggle('is-active', active);
      candidate.setAttribute('aria-pressed', String(active));
    });
    update();
  }));
  quantity.addEventListener('input', update);
  quantity.addEventListener('blur', update);
  decrease.addEventListener('click', () => { quantity.value = String(Math.max(10, validQuantity() - 1)); update(); });
  increase.addEventListener('click', () => { quantity.value = String(validQuantity() + 1); update(); });
  quote.addEventListener('click', () => {
    const shirtProduct = findProduct(shirt.value);
    const shortsProduct = findProduct(shorts.value);
    const socksProduct = includesSocks ? findProduct(socks.value) : undefined;
    const shirtShieldOption = selectedShield('shirt');
    const shortsShieldOption = selectedShield('shorts');
    const units = validQuantity();
    if (!shirtProduct || !shortsProduct || units < 10) {
      showToast('Escolha camisa, calção e pelo menos 10 uniformes.');
      return;
    }
    const shirtAddon = shieldPrice('shirt', shirtProduct);
    const shortsAddon = shieldPrice('shorts', shortsProduct);
    const shirtUnit = shirtProduct.price + shirtAddon;
    const shortsUnit = shortsProduct.price + shortsAddon;
    const socksUnit = socksProduct?.price ?? 0;
    const orderTotal = (shirtUnit + shortsUnit + socksUnit) * units;
    const details = `Olá! Gostaria de solicitar um orçamento com base na minha seleção no site da Labella Sports.\n\n*MEU PEDIDO*\n\n*CAMISA: ${shirtProduct.name.toUpperCase()}*\nQuantidade: ${units}\nEscudo: ${shirtShieldOption?.name.toUpperCase() ?? 'SUBLIMADO'}\nAdicional: ${formatPrice(shirtAddon)}/un.\nSubtotal: ${formatPrice(shirtUnit * units)}\n\n*CALÇÃO: ${shortsProduct.name.toUpperCase()}*\nQuantidade: ${units}\nEscudo: ${shortsShieldOption?.name.toUpperCase() ?? 'SUBLIMADO'}\nAdicional: ${formatPrice(shortsAddon)}/un.\nSubtotal: ${formatPrice(shortsUnit * units)}\n\n*MEIÃO*\n${socksProduct ? `${socksProduct.name}: ${units} unidades\nSubtotal: ${formatPrice(socksUnit * units)}` : 'Não incluído'}\n\n*VALOR TOTAL DO PEDIDO: ${formatPrice(orderTotal)}*\n\nGostaria de confirmar este pedido e receber as orientações para continuar.`;
    startQuote(undefined, details);
  });
  update();
}

function setupMeasurementSelector() {
  const select = document.querySelector<HTMLSelectElement>('[data-measurement-select]');
  const model = document.querySelector<HTMLElement>('[data-measurement-model]');
  if (!select || !model) return;
  select.addEventListener('change', () => {
    model.textContent = select.value;
  });
}

document.addEventListener('click', (event) => {
  const target = event.target as Element;
  const quote = target.closest<HTMLElement>('[data-quote]');
  if (!quote || quote.hasAttribute('data-builder-quote')) return;
  const product = quote.dataset.productId ? findProduct(quote.dataset.productId) : undefined;
  startQuote(product, undefined, quote.dataset.quoteMessage);
});

setupMobileMenu();
setupFilters();
setupProductDialog();
setupBuilder();
setupMeasurementSelector();

// Keeps the official catalog data in the client bundle tied to the rendered list.
void products.length;
