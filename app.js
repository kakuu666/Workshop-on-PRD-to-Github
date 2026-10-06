const viewTitles = {
  home: "Home",
  diet: "Diet",
  copilot: "Fuel Ai",
  recovery: "Recovery",
  progress: "Progress",
};

const views = [...document.querySelectorAll(".view")];
const navItems = [...document.querySelectorAll(".nav-item")];
const toast = document.querySelector("#toast");
let toastTimer;
let recoveryTimer;
let secondsRemaining = 14 * 60;
let completedRecovery = 2;
const storageKey = "fuel-youth-fit-demo";
const savedState = JSON.parse(localStorage.getItem(storageKey) || "{}");
let waterMillilitres = Number.isFinite(savedState.waterMillilitres) ? savedState.waterMillilitres : 1800;

function saveState() {
  const state = {
    habits: [...document.querySelectorAll(".habit-item input")].map((check) => check.checked),
    planSaved: document.querySelector("#save-plan").classList.contains("is-saved"),
    favoriteSaved: document.querySelector("#favorite").classList.contains("is-saved"),
    waterMillilitres,
  };
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function navigateTo(viewName) {
  if (!viewTitles[viewName]) return;
  views.forEach((view) => {
    const active = view.id === `view-${viewName}`;
    view.classList.toggle("is-active", active);
    view.hidden = !active;
  });
  navItems.forEach((item) => {
    const active = item.dataset.view === viewName;
    item.classList.toggle("is-active", active);
    if (active) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });
  document.querySelector("#topbar-title").textContent = viewTitles[viewName];
  window.location.hash = viewName;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setHabitCount() {
  const checks = [...document.querySelectorAll(".habit-item input")];
  const complete = checks.filter((check) => check.checked).length;
  document.querySelector("#habits-count").textContent = `${complete} of ${checks.length} complete`;
  document.querySelector("#progress-habits").innerHTML = `${complete} <small>/ ${checks.length}</small>`;
  checks.forEach((check) => {
    const item = check.closest(".habit-item");
    const status = item.querySelector("small");
    item.classList.toggle("is-done", check.checked);
    status.textContent = check.checked ? "Done" : "Pending";
  });
  saveState();
}

function updateWaterDisplay() {
  const litres = (waterMillilitres / 1000).toFixed(2).replace(/0$/, "").replace(/\.$/, "");
  document.querySelector("#hydration-amount").textContent = litres;
  document.querySelector("#water-progress").style.width = `${Math.min(waterMillilitres / 3000 * 100, 100)}%`;
}

function startRecoveryTimer() {
  if (recoveryTimer) {
    clearInterval(recoveryTimer);
    recoveryTimer = null;
    document.querySelector("#recovery-start").textContent = "▷ Resume recovery session";
    showToast("Recovery session paused.");
    return;
  }
  document.querySelector("#timer-panel").hidden = false;
  document.querySelector("#recovery-start").textContent = "Ⅱ Pause recovery session";
  recoveryTimer = setInterval(() => {
    secondsRemaining -= 1;
    const minutes = Math.floor(secondsRemaining / 60).toString().padStart(2, "0");
    const seconds = (secondsRemaining % 60).toString().padStart(2, "0");
    document.querySelector("#timer-display").textContent = `${minutes}:${seconds}`;
    if (secondsRemaining <= 0) {
      clearInterval(recoveryTimer);
      recoveryTimer = null;
      secondsRemaining = 14 * 60;
      completedRecovery += 1;
      document.querySelector("#progress-recovery").innerHTML = `${completedRecovery} <small>this week</small>`;
      document.querySelector("#recovery-start").textContent = "▷ Start recovery session · 14 min";
      document.querySelector("#timer-panel").hidden = true;
      showToast("Recovery session complete. Nice work!");
    }
  }, 1000);
  showToast("Recovery session started. Move gently and stop if anything hurts.");
}

function addMessage(text, isUser) {
  const message = document.createElement("div");
  message.className = `message ${isUser ? "user-message" : "assistant-message"}`;
  if (!isUser) {
    const avatar = document.createElement("span");
    avatar.className = "message-avatar";
    avatar.textContent = "✦";
    message.append(avatar);
  }
  const content = document.createElement("div");
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  const timestamp = document.createElement("small");
  timestamp.textContent = isUser ? "You · just now" : "FUEL AI · demo reply";
  content.append(paragraph, timestamp);
  message.append(content);
  document.querySelector("#chat-messages").append(message);
  message.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function demoReply(message) {
  const text = message.toLowerCase();
  if (/pain|injur|hurt|sore|sharp/.test(text)) {
    return "I can't assess or diagnose pain. If it's sharp, sudden, worsening, or localized around a joint, stop the activity and contact a qualified healthcare professional. For severe or urgent symptoms, seek local emergency care.";
  }
  if (/recover|stretch|cool.?down/.test(text)) {
    return "For a general cooldown, try a few minutes of easy walking followed by comfortable chest and shoulder mobility. Keep movements gentle and stop if they cause pain. Open Recovery for the example 14-minute routine.";
  }
  if (/diet|meal|eat|food|protein|snack/.test(text)) {
    return "A budget-friendly general idea is to pair a protein source—such as dal, eggs, paneer, tofu, or roasted chana—with rice or roti and vegetables. Your nutrition needs are individual, so treat this as inspiration rather than a prescribed plan.";
  }
  if (/progress|habit|workout|train/.test(text)) {
    return "Consistency matters more than a perfect day. You can check this week's example activity and habit history in Progress, or adjust today's checklist on Home.";
  }
  return "I can help you explore general meal ideas, workout recovery, and habit tracking. Try asking about a budget-friendly snack, a post-workout cooldown, or your progress. This is a scripted portfolio demo, not a live AI or medical service.";
}

document.addEventListener("click", (event) => {
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) {
    event.preventDefault();
    navigateTo(viewButton.dataset.view);
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (actionButton) {
    const action = actionButton.dataset.action;
    if (action === "water") {
      waterMillilitres = Math.min(waterMillilitres + 250, 5000);
      updateWaterDisplay();
      saveState();
      showToast("Water log updated: +250 ml.");
    }
    if (action === "save-plan") {
      const saved = actionButton.classList.toggle("is-saved");
      document.querySelector("#save-plan-label").textContent = saved ? "Plan saved" : "Save plan";
      actionButton.firstChild.textContent = saved ? "♥ " : "♡ ";
      saveState();
      showToast(saved ? "Today's plan saved on this device." : "Plan removed from saved items.");
    }
    if (action === "favorite") {
      const saved = actionButton.classList.toggle("is-saved");
      document.querySelector("#favorite-label").textContent = saved ? "Saved to favorites" : "Save routine to favorites";
      actionButton.firstChild.textContent = saved ? "♥ " : "♡ ";
      saveState();
      showToast(saved ? "Recovery routine added to favorites." : "Recovery routine removed from favorites.");
    }
    if (action === "voice") showToast("Voice input is not enabled in this demo.");
    if (action === "about") document.querySelector("#about-dialog").showModal();
    if (action === "close-about") document.querySelector("#about-dialog").close();
    if (action === "history") showToast("You're viewing the latest example activity.");
    return;
  }

  const filter = event.target.closest("[data-filter]");
  if (filter) {
    document.querySelectorAll("[data-filter]").forEach((button) => button.classList.toggle("is-selected", button === filter));
    document.querySelectorAll(".meal-card").forEach((card) => {
      const visible = filter.dataset.filter === "all" || card.dataset.tags.split(" ").includes(filter.dataset.filter);
      card.classList.toggle("is-filtered-out", !visible);
    });
  }

  const swap = event.target.closest(".swap-button");
  if (swap) showToast("Meal swaps are a visual prototype interaction.");

  const soreness = event.target.closest(".soreness-chip");
  if (soreness) {
    soreness.classList.toggle("is-selected");
    soreness.textContent = `${soreness.classList.contains("is-selected") ? "✓" : "○"} ${soreness.textContent.replace(/^[✓○]\s*/, "")}`;
    document.querySelector("#soreness-count").textContent = `${document.querySelectorAll(".soreness-chip.is-selected").length} selected`;
  }

  const suggestion = event.target.closest(".suggestion-chip");
  if (suggestion) {
    const text = suggestion.textContent.trim();
    addMessage(text, true);
    setTimeout(() => addMessage(demoReply(text), false), 350);
  }
});

document.querySelectorAll(".habit-item input").forEach((check) => check.addEventListener("change", setHabitCount));
document.querySelector("#recovery-start").addEventListener("click", startRecoveryTimer);
document.querySelector("#chat-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#chat-input");
  const message = input.value.trim();
  if (!message) return;
  addMessage(message, true);
  input.value = "";
  window.setTimeout(() => addMessage(demoReply(message), false), 350);
});

function restoreHashRoute() {
  const route = window.location.hash.slice(1);
  navigateTo(viewTitles[route] ? route : "home");
}

document.querySelectorAll(".habit-item input").forEach((check, index) => {
  if (Array.isArray(savedState.habits) && typeof savedState.habits[index] === "boolean") check.checked = savedState.habits[index];
});
if (savedState.planSaved) {
  document.querySelector("#save-plan").classList.add("is-saved");
  document.querySelector("#save-plan-label").textContent = "Plan saved";
  document.querySelector("#save-plan").firstChild.textContent = "♥ ";
}
if (savedState.favoriteSaved) {
  document.querySelector("#favorite").classList.add("is-saved");
  document.querySelector("#favorite-label").textContent = "Saved to favorites";
  document.querySelector("#favorite").firstChild.textContent = "♥ ";
}
updateWaterDisplay();
setHabitCount();
restoreHashRoute();
window.addEventListener("hashchange", restoreHashRoute);
