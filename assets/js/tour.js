/* ============================================================
   US AUTO REPAIR JOBS — guided product demo
   Built on react-joyride (gilbarbara/react-joyride), vendored
   locally in assets/vendor/ so the site stays dependency-free
   at runtime — no CDN, no build step.

   A multi-page tour: each "leg" walks one page, then hands off
   to the next page and resumes automatically. Progress lives in
   localStorage so a full-page navigation doesn't lose the thread.

   Entry point: window.wlStartTour()  (the "Demo Tour" nav button)
   ============================================================ */

import React from '../vendor/react.mjs';
import { createRoot } from '../vendor/react-dom.mjs';
import Joyride, { STATUS, EVENTS, ACTIONS } from '../vendor/react-joyride.mjs';

const h = React.createElement;
const KEY = 'wl_tour_v1';

/* ---------- the script ---------- */
/* `role` provisions the demo identity a page's route guard expects
   before we navigate there. */
const TOUR = [
  {
    page: 'index.html',
    role: null,
    steps: [
      {
        target: '.logo',
        title: 'Welcome to US Auto Repair Jobs',
        content: 'A hiring platform built only for the auto trade — repair and collision technicians on one side, the shops hiring them on the other. This tour walks the whole product in about two minutes.',
        placement: 'bottom',
        disableBeacon: true,
      },
      {
        target: '#wl-demo-card',
        title: 'Demo sign-ins',
        content: 'Every role is unlocked here. One click signs you in as a technician, an employer, or the platform admin — no real account needed. The tour uses these automatically.',
        placement: 'top',
      },
      {
        target: '.hero-actions',
        title: 'Two portals, one platform',
        content: 'Technicians build a profile vault. Shops post jobs and search talent. Everything below is the same platform seen from those two sides.',
        placement: 'bottom',
      },
      {
        target: '.hiw-grid',
        title: 'How it works',
        content: 'Four steps per side. Technicians build a vault, join a city pool, apply in one click, and get hired. Shops profile, post, search, and reach out directly.',
        placement: 'top',
      },
      {
        target: '.preview-tabs',
        title: 'Live product preview',
        content: 'These tabs show the real technician vault and job browser rendered from the same data the app uses.',
        placement: 'bottom',
      },
      {
        target: '.features-grid',
        title: 'Built for the trade',
        content: 'Verified ASE / I-CAR credentials, geo-targeted city pools, availability signals, and salary transparency — the things generic job boards do not model.',
        placement: 'top',
      },
      {
        target: 'nav .nav-links',
        title: 'Next: the job board',
        content: 'Let us look at the technician side first. Continue to see the live job listings.',
        placement: 'bottom',
      },
    ],
  },

  {
    page: 'jobs.html',
    role: 'tech',
    steps: [
      {
        target: '#job-search',
        title: 'Search the board',
        content: 'Free-text search across job titles, shops, and cities. Results filter as you type.',
        placement: 'bottom',
        disableBeacon: true,
      },
      {
        target: '#filter-metro',
        title: 'City pools',
        content: 'Listings are scoped to a metro talent pool, so technicians see local work and shops reach local hires — no relocation guesswork.',
        placement: 'bottom',
      },
      {
        target: '#filter-pay',
        title: 'Real pay ranges',
        content: 'Every posting carries a published pay range, and this slider filters on it. Shops cannot hide compensation on this platform.',
        placement: 'bottom',
      },
      {
        target: '#job-results',
        title: 'The listings',
        content: 'Each card shows distance, pay band, schedule, and the certification the shop actually requires — the four things a technician decides on.',
        placement: 'top',
      },
      {
        target: '#job-results .apply-btn',
        title: 'One-click apply',
        content: 'Applying sends the saved vault — certifications, work history, references and all. No forms, no re-typing, no cover letter.',
        placement: 'left',
      },
    ],
  },

  {
    page: 'vault.html',
    role: 'tech',
    steps: [
      {
        target: '#vault-stats',
        title: 'The technician vault',
        content: 'This is the technician side, signed in as a demo tech. The completeness meter drives visibility — a fuller vault ranks higher with employers.',
        placement: 'bottom',
        disableBeacon: true,
      },
      {
        target: '#vault-nav',
        title: 'Everything in one profile',
        content: 'Skills, contact and availability, certifications, work history, education, references, documents, applications, and saved jobs. Entered once, reused on every application.',
        placement: 'right',
      },
      {
        target: '#vault-main',
        title: 'Fully editable',
        content: 'Every section is live — edit and save, and the changes persist. Availability status (active, passive, not looking) is what employers filter on.',
        placement: 'top',
      },
    ],
  },

  {
    page: 'employer.html',
    role: 'employer',
    steps: [
      {
        target: '#emp-stats',
        title: 'The employer dashboard',
        content: 'Now the shop side, signed in as a demo employer. Open postings, applicants, and pool reach at a glance.',
        placement: 'bottom',
        disableBeacon: true,
      },
      {
        target: '#emp-nav',
        title: 'Post, search, and hire',
        content: 'Build the shop profile, post positions, search the technician database by cert and specialty, and work through applicants — all from one rail.',
        placement: 'right',
      },
      {
        target: '#emp-main',
        title: 'Candidate search',
        content: 'Filter the full technician pool by skill, certification, experience, and live availability. This is the part shops pay for.',
        placement: 'top',
      },
    ],
  },

  {
    page: 'billing.html',
    role: 'employer',
    steps: [
      {
        target: '#plan-panel',
        title: 'Subscriptions',
        content: 'Technicians pay $9.95/mo. Shops run Starter, Pro, or Enterprise. Plan changes, cancellation, and reactivation are all handled here.',
        placement: 'bottom',
        disableBeacon: true,
      },
      {
        target: '#invoice-panel',
        title: 'Recurring invoicing',
        content: 'The billing engine accrues one invoice per month from signup and auto-settles on the saved card. Invoices are printable and PDF-ready.',
        placement: 'top',
      },
    ],
  },

  {
    page: 'admin.html',
    role: 'admin',
    steps: [
      {
        target: '#admin-stats',
        title: 'Platform admin',
        content: 'Finally the operator view, signed in as the platform admin: monthly recurring revenue, member counts, and city-pool activity.',
        placement: 'bottom',
        disableBeacon: true,
      },
      {
        target: '#admin-nav',
        title: 'Full member management',
        content: 'Every employer and technician on the platform, with drill-down into their profile, subscription, payment method, and posted jobs.',
        placement: 'right',
      },
      {
        target: '#admin-main',
        title: 'That is the tour',
        content: 'Technician vault, job board, employer dashboard, billing, and admin — the full platform. Start it again any time from the Demo Tour button.',
        placement: 'top',
      },
    ],
  },
];

/* ---------- persisted progress ---------- */
function readState() {
  try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; }
}
function writeState(s) {
  try { s ? localStorage.setItem(KEY, JSON.stringify(s)) : localStorage.removeItem(KEY); } catch (e) {}
}

function currentPage() {
  const f = window.location.pathname.split('/').pop();
  return f && f.length ? f : 'index.html';
}

/* ---------- helpers ---------- */
function toast(msg, isError) {
  if (typeof showToast === 'function') showToast(msg, isError);
}

/* Sign in the demo identity a leg's route guard requires. */
function assumeRole(role) {
  if (!role) return;
  if (typeof wlDevEnsure === 'function') wlDevEnsure(role);
}

/* Pages render their panels from JS after load, so a target may not
   exist yet. Poll briefly for the first step's target before starting. */
function waitFor(selector, timeout = 4000) {
  return new Promise(resolve => {
    const started = Date.now();
    (function poll() {
      if (document.querySelector(selector)) return resolve(true);
      if (Date.now() - started > timeout) return resolve(false);
      setTimeout(poll, 120);
    })();
  });
}

/* Never point Joyride at something that isn't on the page — a missing
   target strands the tour on a blank step. */
function presentSteps(steps) {
  return steps.filter(s => document.querySelector(s.target));
}

/* ---------- the Joyride host ---------- */
const joyrideStyles = {
  options: {
    primaryColor: '#d97706',
    textColor: '#1b2230',
    backgroundColor: '#ffffff',
    arrowColor: '#ffffff',
    overlayColor: 'rgba(22, 34, 63, 0.55)',
    zIndex: 10000,
    width: 380,
  },
  tooltip: {
    borderRadius: 12,
    fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
    padding: '20px 20px 16px',
    boxShadow: '0 12px 40px rgba(16,24,40,0.16)',
  },
  tooltipTitle: {
    fontSize: '1.02rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    color: '#16233f',
    marginBottom: 6,
  },
  tooltipContent: {
    fontSize: '0.9rem',
    lineHeight: 1.55,
    color: '#59616f',
    textAlign: 'left',
    padding: 0,
  },
  buttonNext: {
    backgroundColor: '#16233f',
    borderRadius: 8,
    fontSize: '0.86rem',
    fontWeight: 600,
    padding: '9px 16px',
  },
  buttonBack: {
    color: '#59616f',
    fontSize: '0.86rem',
    fontWeight: 600,
    marginRight: 8,
  },
  buttonSkip: {
    color: '#8a92a1',
    fontSize: '0.84rem',
    fontWeight: 500,
  },
  spotlight: { borderRadius: 10 },
};

function TourHost() {
  const [run, setRun] = React.useState(false);
  const [steps, setSteps] = React.useState([]);
  const [leg, setLeg] = React.useState(0);

  // Start (or resume) the leg for whatever page we're on.
  const beginLeg = React.useCallback(async (legIndex) => {
    const item = TOUR[legIndex];
    if (!item) return;
    await waitFor(item.steps[0].target);
    const usable = presentSteps(item.steps);
    if (!usable.length) {           // nothing to show here — skip ahead
      handoff(legIndex + 1);
      return;
    }
    setLeg(legIndex);
    setSteps(usable);
    setRun(true);
  }, []);

  // Finish a leg: provision the next role, then navigate.
  function handoff(nextIndex) {
    setRun(false);
    const next = TOUR[nextIndex];
    if (!next) {
      writeState(null);
      toast('Demo tour complete.');
      return;
    }
    writeState({ leg: nextIndex });
    assumeRole(next.role);
    window.location.href = next.page;
  }

  function endTour(message) {
    setRun(false);
    writeState(null);
    if (message) toast(message);
  }

  function callback(data) {
    const { status, action, type } = data;

    if (action === ACTIONS.CLOSE || status === STATUS.SKIPPED) {
      endTour('Tour ended. Restart it any time from Demo Tour.');
      return;
    }
    if (status === STATUS.FINISHED) {
      handoff(leg + 1);
      return;
    }
    // A target that vanished mid-leg shouldn't wedge the tour.
    if (type === EVENTS.TARGET_NOT_FOUND) {
      handoff(leg + 1);
    }
  }

  // Resume automatically after a page handoff.
  React.useEffect(() => {
    const saved = readState();
    if (!saved) return;
    const item = TOUR[saved.leg];
    if (item && item.page === currentPage()) beginLeg(saved.leg);
  }, [beginLeg]);

  // Manual start from the nav button.
  React.useEffect(() => {
    window.wlStartTour = function () {
      const here = currentPage();
      const idx = TOUR.findIndex(t => t.page === here);
      if (idx === -1) {                 // page isn't in the script — start at the top
        writeState({ leg: 0 });
        window.location.href = TOUR[0].page;
        return;
      }
      writeState({ leg: idx });
      beginLeg(idx);
    };
    return () => { delete window.wlStartTour; };
  }, [beginLeg]);

  return h(Joyride, {
    steps,
    run,
    continuous: true,
    showProgress: true,
    showSkipButton: true,
    disableOverlayClose: true,
    scrollOffset: 96,          // clears the 64px fixed nav
    scrollDuration: 260,
    spotlightPadding: 6,
    styles: joyrideStyles,
    locale: {
      back: 'Back',
      close: 'Close',
      last: leg === TOUR.length - 1 ? 'Finish' : 'Next page →',
      next: 'Next',
      skip: 'Skip tour',
    },
    callback,
  });
}

/* ---------- mount ---------- */
function mount() {
  if (document.getElementById('wl-tour-root')) return;
  const el = document.createElement('div');
  el.id = 'wl-tour-root';
  document.body.appendChild(el);
  createRoot(el).render(h(TourHost));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
