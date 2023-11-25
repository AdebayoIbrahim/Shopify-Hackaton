const toggleExpandBtn = document.querySelector("#toggle_expand");
const generalOptions = document.querySelector(".option_fields_general");

toggleExpandBtn.addEventListener("click", () => {
  toggleExpandBtn.classList.toggle("rotate_toggle");
  generalOptions.classList.toggle("toggle_display");
});

//attributes to swir=tch-to-svg-path
const attributes = {
  fill: "#1C181D",
  cx: "11.9996",
  cy: "12",
  r: "10",
  stroke: "#1C181D",
  "stroke-width": "2.08333",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
};
const originalAttributes = { ...attributes };

const roll_attr = {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M16.8162 8.64149C17.0603 8.88557 17.0603 9.2813 16.8162 9.52538L11.3995 14.942C11.1555 15.1861 10.7597 15.1861 10.5157 14.942L7.80733 12.2337C7.56325 11.9896 7.56325 11.5939 7.80733 11.3498C8.0514 11.1057 8.44713 11.1057 8.69121 11.3498L10.9576 13.6162L15.9323 8.64149C16.1764 8.39742 16.5721 8.39742 16.8162 8.64149Z",
  fill: "white",
  stroke: "",
  "stroke-width": "",
  "stroke-linecap": "",
  "stroke-linejoin": "",
};
const originalRollAttr = { ...roll_attr };

// stroke="#1C181D" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round"
const prevPathAttr = {
  "fill-rule": "",
  "clip-rule": "",
  d: "M22.0004 12C22.0004 13.9778 21.4139 15.9112 20.3151 17.5557C19.2162 19.2002 17.6545 20.4819 15.8272 21.2388C13.9999 21.9957 11.9893 22.1937 10.0495 21.8079C8.10965 21.422 6.32782 20.4696 4.9293 19.0711C3.53077 17.6725 2.57837 15.8907 2.19251 13.9509C1.80666 12.0111 2.00469 10.0004 2.76157 8.17317C3.51845 6.3459 4.80017 4.78412 6.44466 3.6853C8.08916 2.58649 10.0226 2 12.0004 2",
  fill: "",
  stroke: "#1C181D",
  "stroke-width": "2.08333",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
};
function resetAttributes(roll_path, circle) {
  // const circle = document.getElementById("circle");

  const attributesToRemove = [
    "cx",
    "cy",
    "r",
    "fill",
    "stroke",
    "stroke-width",
    "stroke-linecap",
    "stroke-linejoin",
  ];

  // Loop through the attributes and remove them
  attributesToRemove.forEach((attribute) => {
    circle.removeAttribute(attribute);
  });

  // Reset attributes for the roll_path
  for (const [attribute, value] of Object.entries(prevPathAttr)) {
    roll_path.setAttribute(attribute, value);
  }
}

const rolling_svg = document.querySelector(".rolling_svg");

let i = 0;
const progress_status = document.querySelector(".progress_bar");
progress_status.style.width = i + "%";
const countStatus = document.getElementById("count");
countStatus.innerText = 0;
statusProgress = Number(countStatus.textContent);

// Separate animation end handler
function animationEndHandler(rolling_svg, circle, roll_path, isClicked) {
  for (const [att, val] of Object.entries(attributes)) {
    circle.setAttribute(
      att,
      circle.getAttribute(att) === val ? originalAttributes[att] : val
    );
  }

  for (const [attribute, value] of Object.entries(roll_attr)) {
    roll_path.setAttribute(
      attribute,
      roll_path.getAttribute(attribute) === value
        ? originalRollAttr[attribute]
        : value
    );
  }

  rolling_svg.classList.add("scale");
  if (isClicked) {
    i += 20;
    statusProgress += 1;
    countStatus.innerText = statusProgress;
    progress_status.style.width = i + "%";
    console.log("incremented Val: ", i);
  }
}
//select all svg inputs
const svg_input = document.querySelectorAll(".svg_input");
svg_input.forEach((svg_input) => {
  svg_input.addEventListener("click", (e) => {
    let isClicked = false;
    const rolling_svg = e.currentTarget.querySelector(".rolling_svg");
    const initial_hov = e.currentTarget.querySelector(".initial_hov");
    const roll_path = rolling_svg.querySelector("#roll_change");

    const circle = rolling_svg.querySelector("#circle");
    rolling_svg.classList.contains("scale") &&
      rolling_svg.classList.remove("scale");
    rolling_svg.classList.toggle("roll");
    initial_hov.classList.toggle("fade_in");

    // Remove the event listener before adding it again
    rolling_svg.removeEventListener("animationend", animationEndHandler);
    // Add the animationend event listener
    rolling_svg.addEventListener(
      "animationend",
      () => {
        animationEndHandler(rolling_svg, circle, roll_path, isClicked);
      },
      { once: true }
    );
    if (rolling_svg.classList.contains("roll")) {
      resetAttributes(roll_path, circle);
      isClicked = true;
    } else {
      isClicked = false;
      i -= 20;
      statusProgress -= 1;
      progress_status.style.width = i + "%";
      countStatus.innerText = statusProgress;

      console.log("Decrement :", i);
    }
  });
});

// drop-downs-of-options-functionality
const option1_wrapper = document.querySelectorAll(".option1_wrapper");
option1_wrapper.forEach((wrapper) => {
  wrapper.addEventListener("click", (e) => {
    option1_wrapper.forEach((wrap) => {
      wrap.classList.remove("add_bg");
      wrap.querySelector(".helper_box").classList.remove("opt_one");
    });
    e.currentTarget.classList.add("add_bg");
    e.currentTarget.querySelector(".helper_box").classList.add("opt_one");
  });
});

//notification-bar
const notifyBell = document.querySelector(".notifications_bell");
const notifyBar = document.querySelector(".notify");
notifyBell.addEventListener("click", () => {
  notifyBar.classList.toggle("notifyShow");
});

// login-dropdown
const login_dropdwn = document.querySelector(".login_dropdwn");
const login_info = document.querySelector(".login_info");
login_info.addEventListener("click", () => {
  // console.log(login_dropdwn);
  login_dropdwn.classList.toggle("login_drpdnn_show");
});

// all-stores
const all_stores = document.querySelector(".all_stores");
all_stores.onclick = function () {
  // console.log("clicked!!");
  window.open("https://admin.shopify.com");
};

const plan = document.querySelector("#plan");
plan.onclick = function () {
  window.open("https://shopify.com/pricing");
};

const del = document.getElementById("del");
const trial_tip = document.querySelector(".trial_tip");
del.onclick = function () {
  trial_tip.style.display = "none";
};
