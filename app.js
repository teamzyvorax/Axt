const $ = (id) => document.getElementById(id);
const toast = (message) => {
  const el = $('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
};

$('closeNotice').addEventListener('click', () => $('notice').remove());
$('refreshBtn').addEventListener('click', (e) => {
  e.currentTarget.textContent = '⟳  Checking...';
  setTimeout(() => {
    e.currentTarget.textContent = '⟳  Refresh status';
    toast('Domain status is up to date.');
  }, 850);
});

const domainDialog = $('domainDialog');
$('addDomainBtn').addEventListener('click', () => {
  $('subdomainInput').value = '';
  $('previewName').textContent = 'my-project';
  domainDialog.showModal();
});
$('subdomainInput').addEventListener('input', (e) => {
  const value = e.target.value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  $('previewName').textContent = value || 'my-project';
});
$('confirmDomain').addEventListener('click', (e) => {
  const value = $('subdomainInput').value.trim();
  if (!value) {
    e.preventDefault();
    toast('Enter a subdomain name first.');
    return;
  }
  toast(`Request queued for ${value}.isroot.in`);
});

const manageDialog = $('manageDialog');
$('manageBtn').addEventListener('click', () => manageDialog.showModal());
$('manageClose').addEventListener('click', () => manageDialog.close());
$('copyDomain').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText('zyvorax.isroot.in'); toast('Domain copied.'); }
  catch { toast('Copy is unavailable in this browser.'); }
});
$('renewBtn').addEventListener('click', () => toast('Renewal request started.'));
$('notifications').addEventListener('click', () => toast('No new notifications.'));
$('menuBtn').addEventListener('click', () => toast('Dashboard menu is ready.'));
