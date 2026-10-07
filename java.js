/* =========================================
   NEXUS 1.0
========================================= */


/* =========================
   LOGIN
========================= */

const loginScreen =
    document.getElementById("loginScreen");

const nexus =
    document.getElementById("nexus");

const usernameInput =
    document.getElementById("username");


function login() {

    let username =
        usernameInput.value.trim();


    if (!username) {

        username = "NETRUNNER";

    }


    localStorage.setItem(
        "nexusUser",
        username
    );


    startNexus(username);
}


usernameInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            login();

        }

    }
);


function startNexus(username) {

    document.getElementById(
        "topUsername"
    ).textContent =
        username.toUpperCase();


    loginScreen.style.opacity =
        "0";


    setTimeout(() => {

        loginScreen.style.display =
            "none";

        nexus.style.display =
            "block";


        showNotification(
            "NEXUS",
            `Welcome, ${username}. Connection established.`
        );

    }, 700);

}


const savedUser =
    localStorage.getItem(
        "nexusUser"
    );


if (savedUser) {

    startNexus(savedUser);

}


/* =========================
   LOGOUT
========================= */

function logout() {

    localStorage.removeItem(
        "nexusUser"
    );


    nexus.style.display =
        "none";


    loginScreen.style.display =
        "grid";


    setTimeout(() => {

        loginScreen.style.opacity =
            "1";

    }, 20);

}


/* =========================
   PAGE SYSTEM
========================= */

function showPage(
    pageId,
    button = null
) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove(
                "active"
            );

        });


    const page =
        document.getElementById(
            pageId
        );


    if (page) {

        page.classList.add(
            "active"
        );

    }


    document
        .querySelectorAll(".nav-btn")
        .forEach(btn => {

            btn.classList.remove(
                "active"
            );

        });


    if (button) {

        button.classList.add(
            "active"
        );

    }

}


function openApp(pageId) {

    showPage(pageId);


    document
        .querySelectorAll(".nav-btn")
        .forEach(btn => {

            if (
                btn.textContent
                    .toLowerCase()
                    .includes(pageId)
            ) {

                btn.classList.add(
                    "active"
                );

            }

        });

}


/* =========================
   GLOBAL SEARCH
========================= */

function globalSearch() {

    const input =
        document.getElementById(
            "globalSearch"
        );


    const query =
        input.value.trim();


    if (!query) {

        return;

    }


    showPage("search");


    document.getElementById(
        "searchInput"
    ).value =
        query;


    performSearch();

}


function searchEnter(event) {

    if (
        event.key === "Enter"
    ) {

        globalSearch();

    }

}


function searchPageEnter(event) {

    if (
        event.key === "Enter"
    ) {

        performSearch();

    }

}


function performSearch() {

    const input =
        document.getElementById(
            "searchInput"
        );


    const query =
        input.value.trim();


    const results =
        document.getElementById(
            "searchResults"
        );


    if (!query) {

        results.innerHTML = `
            <div class="empty-state">
                <span>◈</span>
                <p>Enter a search query.</p>
            </div>
        `;

        return;

    }


    results.innerHTML = `

        <div class="result">

            <small>
                NEXUS // VERIFIED
            </small>

            <h3>
                ${query} — NEXUS Search Result
            </h3>

            <p>
                This is a simulated NEXUS network result.
                More connected services will appear here.
            </p>

        </div>


        <div class="result">

            <small>
                NETWORK
            </small>

            <h3>
                Explore ${query}
            </h3>

            <p>
                Search across Social, News, Cloud,
                Market and other NEXUS services.
            </p>

        </div>


        <div class="result">

            <small>
                DISCOVERY
            </small>

            <h3>
                Related digital content
            </h3>

            <p>
                NEXUS found several connected nodes
                matching your query.
            </p>

        </div>
    `;

}


/* =========================
   SOCIAL POSTS
========================= */

function createPost() {

    const input =
        document.getElementById(
            "postText"
        );


    const text =
        input.value.trim();


    if (!text) {

        return;

    }


    const username =
        localStorage.getItem(
            "nexusUser"
        ) || "NETRUNNER";


    const posts =
        document.getElementById(
            "posts"
        );


    const post =
        document.createElement(
            "article"
        );


    post.className =
        "post";


    post.innerHTML = `

        <div class="post-user">

            <div class="avatar cyan">
                ${username[0].toUpperCase()}
            </div>

            <div>

                <strong>
                    ${username}
                </strong>

                <small>
                    @${username.toLowerCase()}
                    · now
                </small>

            </div>

        </div>


        <p>
            ${escapeHTML(text)}
        </p>


        <div class="post-actions">
            ♡ 0
            &nbsp;&nbsp;
            ◇ 0
            &nbsp;&nbsp;
            ↗ 0
        </div>

    `;


    posts.prepend(
        post
    );


    input.value =
        "";


    showNotification(
        "SOCIAL",
        "Your post was published."
    );

}


/* =========================
   MARKET
========================= */

function buyProduct(button) {

    button.textContent =
        "PURCHASED ✓";


    button.style.color =
        "var(--green)";


    button.style.borderColor =
        "var(--green)";


    showNotification(
        "MARKET",
        "Digital product added to your account."
    );

}


/* =========================
   SETTINGS
========================= */

function toggleSetting(button) {

    button.classList.toggle(
        "active"
    );


    button.textContent =
        button.classList.contains(
            "active"
        )
            ? "ON"
            : "OFF";

}


function toggleScanlines(button) {

    const scanlines =
        document.querySelector(
            ".scanlines"
        );


    const enabled =
        button.classList.toggle(
            "active"
        );


    button.textContent =
        enabled
            ? "ON"
            : "OFF";


    scanlines.style.display =
        enabled
            ? "block"
            : "none";

}


/* =========================
   NOTIFICATION
========================= */

let notificationTimer;


function showNotification(
    title,
    message
) {

    const notification =
        document.getElementById(
            "notification"
        );


    notification.querySelector(
        "strong"
    ).textContent =
        title;


    notification.querySelector(
        "p"
    ).textContent =
        message;


    notification.classList.add(
        "show"
    );


    clearTimeout(
        notificationTimer
    );


    notificationTimer =
        setTimeout(() => {

            notification.classList.remove(
                "show"
            );

        }, 3500);

}


/* =========================
   ONLINE USERS
========================= */

const onlineUsers =
    document.getElementById(
        "onlineUsers"
    );


setInterval(() => {

    if (!onlineUsers) return;


    const current =
        Number(
            onlineUsers.textContent
                .replace(/,/g, "")
        );


    const change =
        Math.floor(
            Math.random() * 25
        );


    onlineUsers.textContent =
        (
            current + change
        ).toLocaleString();

}, 3000);


/* =========================
   SECURITY
========================= */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


/* =========================
   RANDOM NETWORK EVENTS
========================= */

setTimeout(() => {

    if (
        localStorage.getItem(
            "nexusUser"
        )
    ) {

        showNotification(
            "NETWORK",
            "NEXUS has detected a new active node."
        );

    }

}, 6000);
