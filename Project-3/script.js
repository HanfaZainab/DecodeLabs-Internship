/* =========================================
   ROADGUARD
   Pothole Detection & Accident Alert System

   JavaScript / DOM Manipulation
========================================= */


/* =========================================
   APPLICATION STATE
========================================= */
const state = {

  // Number of detected potholes
  potholes: 24,

  // Number of active alerts
  alerts: 2,

  // Number of user interactions
  interactions: 0,

  // Emergency status
  emergency: false

};


/* =========================================
   SHORT DOM SELECTOR
========================================= */

const $ = (selector) => {

  return document.querySelector(selector);

};


/* =========================================
   UPDATE DASHBOARD
========================================= */

function updateDashboard() {

  // Update pothole counter
  $("#potholeCount").textContent =
    state.potholes;


  // Update alert counter
  $("#alertCount").textContent =
    state.alerts;


  // Update alert title
  $("#alertTitle").textContent =
    `${state.alerts} active alert${
      state.alerts === 1 ? "" : "s"
    }`;


  // Update interaction score
  $("#interactionScore").textContent =
    String(state.interactions).padStart(2, "0");

}


/* =========================================
   COUNT USER INTERACTIONS
========================================= */

function interact(points = 1) {

  state.interactions += points;

  updateDashboard();

}


/* =========================================
   SYSTEM MESSAGE
========================================= */

function message(text) {

  $("#systemMessage").textContent =
    text;

}


/* =========================================
   DARK MODE
========================================= */

$("#themeToggle").addEventListener(
  "click",
  () => {

    // Toggle dark mode class
    document.body.classList.toggle(
      "dark-mode"
    );


    const dark =
      document.body.classList.contains(
        "dark-mode"
      );


    // Change icon
    $("#themeToggle").textContent =
      dark ? "☀" : "☾";


    // Show system message
    message(
      dark
        ? "Dark monitoring mode enabled."
        : "Light monitoring mode enabled."
    );


    interact();

  }
);


/* =========================================
   POTHOLE REPORT FORM
========================================= */

$("#potholeForm").addEventListener(
  "submit",
  (event) => {

    // Stop page refresh
    event.preventDefault();


    // Get form values
    const location =
      $("#location").value.trim();

    const severity =
      $("#severity").value;

    const lane =
      $("#lane").value;

    const description =
      $("#description").value.trim();


    /* ===============================
       VALIDATION
    =============================== */

    if (
      !location ||
      !severity ||
      !lane
    ) {

      $("#formMessage").textContent =
        "Please complete location, severity, and lane.";

      return;

    }


    /* ===============================
       UPDATE STATE
    =============================== */

    state.potholes += 1;


    /* ===============================
       CREATE NEW ALERT
    =============================== */

    const report =
      document.createElement("article");


    report.className =
      `alert-item ${
        severity.toLowerCase() === "critical"
          ? "critical"
          : "high"
      }`;


    report.innerHTML = `

      <span class="alert-symbol">
        !
      </span>

      <div>

        <strong>
          ${severity} pothole reported
        </strong>

        <p>
          ${escapeHtml(location)}
          ·
          ${escapeHtml(lane)}
        </p>

        <small>
          ${
            description
              ? escapeHtml(description)
              : "No additional description"
          }
          · Just now
        </small>

      </div>

      <button
        class="resolve-btn"
        type="button">

        Resolve

      </button>

    `;


    /* ===============================
       ADD ALERT TO PAGE
    =============================== */

    $("#alertList")
      .prepend(report);


    /* ===============================
       UPDATE ALERT COUNT
    =============================== */

    state.alerts += 1;


    /* ===============================
       SUCCESS MESSAGE
    =============================== */

    $("#formMessage").textContent =
      "✓ Road hazard reported and added to the live alert queue.";


    message(
      `New ${severity.toLowerCase()} pothole detected at ${location}.`
    );


    /* ===============================
       RESET FORM
    =============================== */

    event.target.reset();


    /* ===============================
       UPDATE SCORE
    =============================== */

    interact(3);


    /* ===============================
       ADD RESOLVE FUNCTION
    =============================== */

    attachResolveButton(report);

  }
);


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHtml(value) {

  const div =
    document.createElement("div");

  div.textContent = value;

  return div.innerHTML;

}


/* =========================================
   ACCIDENT SIMULATION
========================================= */

$("#simulateAccident").addEventListener(
  "click",
  () => {

    /* ===============================
       CHANGE EMERGENCY STATE
    =============================== */

    state.emergency = true;

    state.alerts += 1;


    /* ===============================
       VEHICLE ANIMATION
    =============================== */

    $("#vehicle")
      .classList
      .add("danger");


    /* ===============================
       CAMERA STATUS
    =============================== */

    $("#cameraStatus")
      .textContent =
      "IMPACT DETECTED";


    $("#cameraStatus")
      .style
      .color =
      "#ff8178";


    /* ===============================
       EMERGENCY RESPONSE
    =============================== */

    $("#responseTitle")
      .textContent =
      "Emergency response activated";


    $("#responseText")
      .textContent =
      "High-impact event detected. In a real deployment, this state could trigger GPS transmission and emergency services.";


    $("#responseStatus")
      .classList
      .add("active");


    $("#responseStatus strong")
      .textContent =
      "EMERGENCY";


    /* ===============================
       CREATE ACCIDENT ALERT
    =============================== */

    const alert =
      document.createElement("article");


    alert.className =
      "alert-item critical";


    alert.innerHTML = `

      <span class="alert-symbol">
        🚨
      </span>

      <div>

        <strong>
          Simulated accident detected
        </strong>

        <p>
          Vehicle #RG-204 · GPS location captured
        </p>

        <small>
          Just now
        </small>

      </div>

      <button
        class="resolve-btn"
        type="button">

        Resolve

      </button>

    `;


    /* ===============================
       ADD TO ALERT QUEUE
    =============================== */

    $("#alertList")
      .prepend(alert);


    /* ===============================
       UPDATE MESSAGE
    =============================== */

    message(
      "⚠ Impact event detected — emergency workflow activated."
    );


    /* ===============================
       UPDATE SCORE
    =============================== */

    interact(5);


    /* ===============================
       ENABLE RESOLVE BUTTON
    =============================== */

    attachResolveButton(alert);

  }
);


/* =========================================
   RESET EMERGENCY
========================================= */

$("#resetEmergency").addEventListener(
  "click",
  () => {

    state.emergency = false;


    /* ===============================
       RESET VEHICLE
    =============================== */

    $("#vehicle")
      .classList
      .remove("danger");


    /* ===============================
       RESET CAMERA
    =============================== */

    $("#cameraStatus")
      .textContent =
      "LIVE FEED";


    $("#cameraStatus")
      .style
      .color = "";


    /* ===============================
       RESET RESPONSE
    =============================== */

    $("#responseTitle")
      .textContent =
      "Emergency response standby";


    $("#responseText")
      .textContent =
      "The response module is monitoring impact events. Use the simulator to demonstrate an emergency workflow.";


    $("#responseStatus")
      .classList
      .remove("active");


    $("#responseStatus strong")
      .textContent =
      "STANDBY";


    message(
      "Emergency response reset. Monitoring resumed."
    );


    interact(2);

  }
);


/* =========================================
   RESOLVE ALERT
========================================= */

function attachResolveButton(
  alertElement
) {

  const button =
    alertElement.querySelector(
      ".resolve-btn"
    );


  button.addEventListener(
    "click",
    () => {

      /* ===============================
         PREVENT DOUBLE CLICK
      =============================== */

      if (
        alertElement.classList.contains(
          "resolved"
        )
      ) {

        return;

      }


      /* ===============================
         ADD RESOLVED CLASS
      =============================== */

      alertElement
        .classList
        .add("resolved");


      /* ===============================
         CHANGE BUTTON TEXT
      =============================== */

      button.textContent =
        "Resolved";


      /* ===============================
         DECREASE ALERT COUNT
      =============================== */

      state.alerts =
        Math.max(
          0,
          state.alerts - 1
        );
      /* ===============================
         UPDATE DASHBOARD
      ============================= */

      updateDashboard();
      message(
        "Alert resolved and removed from the active count."
      );
      interact();
    }
  );
}

/* =========================================
   INITIAL RESOLVE BUTTONS
========================================= */

document
  .querySelectorAll(".resolve-btn")
  .forEach((button) => {

    attachResolveButton(
      button.closest(
        ".alert-item"
      )
    );

  });


/* =========================================
   CLEAR RESOLVED ALERTS
========================================= */

$("#clearAlerts").addEventListener(
  "click",
  () => {

    const resolved =
      document.querySelectorAll(
        ".alert-item.resolved"
      );
    if (
      resolved.length === 0
    ) {
      message(
        "No resolved alerts to clear."
      );
      return;
    }

    /* ===============================
       REMOVE ELEMENTS FROM DOM
    =============================== */
    resolved.forEach(
      (item) => {

        item.remove();

      }
    );
    message(
      `${resolved.length} resolved alert(s) removed from the queue.`
    );
    interact(2);
  }
);

/* =========================================
   INITIALIZE DASHBOARD
========================================= */

updateDashboard();