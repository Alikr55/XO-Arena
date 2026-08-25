// ==========================================
// XO ARENA
// FULL GAME ENGINE + PROFILE SYSTEM
// ==========================================


// ==========================================
// SCREENS
// ==========================================

const homeScreen =
    document.querySelector(".home-screen");

const gameScreen =
    document.querySelector(".game");


// ==========================================
// BUTTONS
// ==========================================

const twoPlayerBtn =
    document.querySelector("#twoPlayerBtn");

const computerBtn =
    document.querySelector("#computerBtn");

const backToMenuBtn =
    document.querySelector("#backToMenuBtn");

const restartButton =
    document.querySelector(".restart");

const resetScoreButton =
    document.querySelector(".reset-score");

const statsBtn =
    document.querySelector("#statsBtn");

const settingsBtn =
    document.querySelector("#settingsBtn");


// ==========================================
// GAME
// ==========================================

const cells =
    document.querySelectorAll(".cell");

const statusText =
    document.querySelector(".status");


// ==========================================
// PLAYER PROFILES
// ==========================================

const playerXCard =
    document.querySelector("#playerXCard");

const playerOCard =
    document.querySelector("#playerOCard");

const playerXNameElement =
    document.querySelector("#playerXName");

const playerONameElement =
    document.querySelector("#playerOName");

const playerXCrown =
    document.querySelector("#playerXCrown");

const playerOCrown =
    document.querySelector("#playerOCrown");


// ==========================================
// SCORES
// ==========================================

const scoreXElement =
    document.querySelector("#scoreX");

const scoreOElement =
    document.querySelector("#scoreO");

const scoreDrawElement =
    document.querySelector("#scoreDraw");


// ==========================================
// RESULT
// ==========================================

const resultOverlay =
    document.querySelector("#resultOverlay");

const resultIcon =
    document.querySelector("#resultIcon");

const resultTitle =
    document.querySelector("#resultTitle");

const resultSubtitle =
    document.querySelector("#resultSubtitle");

const resultScoreX =
    document.querySelector("#resultScoreX");

const resultScoreO =
    document.querySelector("#resultScoreO");

const resultScoreDraw =
    document.querySelector("#resultScoreDraw");

const playAgainBtn =
    document.querySelector("#playAgainBtn");

const resultHomeBtn =
    document.querySelector("#resultHomeBtn");


// ==========================================
// STATE
// ==========================================

let currentPlayer = "X";

let gameActive = true;

let gameMode = "twoPlayer";

let playerSymbol = "X";

let computerSymbol = "O";

let difficulty = "easy";


// ==========================================
// PLAYER NAMES
// ==========================================

let playerXName =
    localStorage.getItem("playerXName")
    || "بازیکن X";

let playerOName =
    localStorage.getItem("playerOName")
    || "بازیکن O";


// ==========================================
// SCORES
// ==========================================

let scoreX =
    Number(localStorage.getItem("scoreX")) || 0;

let scoreO =
    Number(localStorage.getItem("scoreO")) || 0;

let scoreDraw =
    Number(localStorage.getItem("scoreDraw")) || 0;


// ==========================================
// SETTINGS
// ==========================================

let soundEnabled =
    localStorage.getItem("soundEnabled") !== "false";

let vibrationEnabled =
    localStorage.getItem("vibrationEnabled") !== "false";

let effectsEnabled =
    localStorage.getItem("effectsEnabled") !== "false";


// ==========================================
// WINNING COMBINATIONS
// ==========================================

const winningCombinations = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];


// ==========================================
// INIT
// ==========================================

updateScore();

updatePlayerProfiles();


// ==========================================
// BUTTON CLICK EFFECT
// ==========================================

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest("button");

        if (!button) {
            return;
        }

        button.classList.add(
            "button-click"
        );

        setTimeout(
            () => {

                button.classList.remove(
                    "button-click"
                );

            },
            180
        );

        playButtonSound();

    }
);


// ==========================================
// TWO PLAYER
// ==========================================

twoPlayerBtn.addEventListener(
    "click",
    () => {

        gameMode =
            "twoPlayer";

        playerSymbol = "X";

        computerSymbol = "O";

        homeScreen.style.display =
            "none";

        gameScreen.style.display =
            "block";

        updatePlayerProfiles();

        restartGame();

    }
);


// ==========================================
// COMPUTER
// ==========================================

computerBtn.addEventListener(
    "click",
    () => {

        gameMode =
            "computer";

        showComputerSetup();

    }
);


// ==========================================
// COMPUTER SETUP
// ==========================================

function showComputerSetup() {

    homeScreen.innerHTML = `

        <div class="logo">

            <div class="logo-x">X</div>
            <div class="logo-o">O</div>

        </div>

        <h1>
            بازی با کامپیوتر
        </h1>

        <p class="subtitle">
            با کدوم مهره بازی می‌کنی؟ 🤖
        </p>

        <div class="menu">

            <button
                class="menu-btn primary"
                id="playAsX"
            >

                <span>❌</span>

                <div>

                    <strong>
                        بازی با X
                    </strong>

                    <small>
                        شما اول بازی می‌کنید
                    </small>

                </div>

            </button>


            <button
                class="menu-btn"
                id="playAsO"
            >

                <span>⭕</span>

                <div>

                    <strong>
                        بازی با O
                    </strong>

                    <small>
                        کامپیوتر اول بازی می‌کند
                    </small>

                </div>

            </button>


            <button
                class="menu-btn"
                id="backSetup"
            >

                <span>🏠</span>

                <div>

                    <strong>
                        برگشت
                    </strong>

                    <small>
                        منوی اصلی
                    </small>

                </div>

            </button>

        </div>
    `;


    document
        .querySelector("#playAsX")
        .addEventListener(
            "click",
            () => chooseDifficulty("X")
        );


    document
        .querySelector("#playAsO")
        .addEventListener(
            "click",
            () => chooseDifficulty("O")
        );


    document
        .querySelector("#backSetup")
        .addEventListener(
            "click",
            restoreHome
        );

}


// ==========================================
// DIFFICULTY
// ==========================================

function chooseDifficulty(symbol) {

    playerSymbol =
        symbol;

    computerSymbol =
        symbol === "X"
            ? "O"
            : "X";


    homeScreen.innerHTML = `

        <div class="logo">

            <div class="logo-x">X</div>
            <div class="logo-o">O</div>

        </div>

        <h1>
            درجه سختی
        </h1>

        <p class="subtitle">
            حریف رو انتخاب کن 😈
        </p>

        <div class="menu">

            <button
                class="menu-btn primary"
                id="easyMode"
            >

                <span>🟢</span>

                <div>

                    <strong>
                        آسان
                    </strong>

                    <small>
                        حرکت‌های شانسی
                    </small>

                </div>

            </button>


            <button
                class="menu-btn"
                id="mediumMode"
            >

                <span>🟡</span>

                <div>

                    <strong>
                        متوسط
                    </strong>

                    <small>
                        حریف باهوش‌تر
                    </small>

                </div>

            </button>


            <button
                class="menu-btn"
                id="hardMode"
            >

                <span>🔴</span>

                <div>

                    <strong>
                        سخت
                    </strong>

                    <small>
                        تقریباً شکست‌ناپذیر
                    </small>

                </div>

            </button>


            <button
                class="menu-btn"
                id="backDifficulty"
            >

                <span>↩️</span>

                <div>

                    <strong>
                        برگشت
                    </strong>

                    <small>
                        انتخاب مهره
                    </small>

                </div>

            </button>

        </div>
    `;


    document
        .querySelector("#easyMode")
        .addEventListener(
            "click",
            () => startComputerGame("easy")
        );


    document
        .querySelector("#mediumMode")
        .addEventListener(
            "click",
            () => startComputerGame("medium")
        );


    document
        .querySelector("#hardMode")
        .addEventListener(
            "click",
            () => startComputerGame("hard")
        );


    document
        .querySelector("#backDifficulty")
        .addEventListener(
            "click",
            showComputerSetup
        );

}


// ==========================================
// START COMPUTER
// ==========================================

function startComputerGame(
    selectedDifficulty
) {

    difficulty =
        selectedDifficulty;

    homeScreen.style.display =
        "none";

    gameScreen.style.display =
        "block";

    updatePlayerProfiles();

    restartGame();

}


// ==========================================
// PROFILE DISPLAY
// ==========================================

function updatePlayerProfiles() {

    if (
        !playerXNameElement ||
        !playerONameElement
    ) {
        return;
    }


    if (
        gameMode === "computer"
    ) {

        if (
            playerSymbol === "X"
        ) {

            playerXNameElement.textContent =
                playerXName;

            playerONameElement.textContent =
                "🤖 کامپیوتر";

        }

        else {

            playerXNameElement.textContent =
                "🤖 کامپیوتر";

            playerONameElement.textContent =
                playerOName;

        }

    }

    else {

        playerXNameElement.textContent =
            playerXName;

        playerONameElement.textContent =
            playerOName;

    }


    updateActivePlayer();

}


// ==========================================
// ACTIVE PLAYER
// ==========================================

function updateActivePlayer() {

    if (
        !playerXCard ||
        !playerOCard
    ) {
        return;
    }


    playerXCard.classList.remove(
        "active"
    );

    playerOCard.classList.remove(
        "active"
    );


    if (
        currentPlayer === "X"
    ) {

        playerXCard.classList.add(
            "active"
        );

    }

    else {

        playerOCard.classList.add(
            "active"
        );

    }

}


// ==========================================
// PROFILE MENU
// ==========================================

function showProfiles() {

    homeScreen.innerHTML = `

        <div class="logo">

            <div class="logo-x">X</div>
            <div class="logo-o">O</div>

        </div>


        <h1>
            پروفایل بازیکنان
        </h1>


        <p class="subtitle">
            اسم بازیکن‌ها رو وارد کن 👤
        </p>


        <div class="profile-editor">


            <label class="profile-label">
                ❌ نام بازیکن X
            </label>

            <input
                id="profileXInput"
                class="profile-input"
                maxlength="18"
                value="${escapeHtml(playerXName)}"
                placeholder="مثلاً علی"
            />


            <label class="profile-label">
                ⭕ نام بازیکن O
            </label>

            <input
                id="profileOInput"
                class="profile-input"
                maxlength="18"
                value="${escapeHtml(playerOName)}"
                placeholder="مثلاً رضا"
            />


            <div class="profile-preview">

                <div class="profile-preview-card">

                    <div class="preview-symbol">
                        ❌
                    </div>

                    <strong id="previewX">
                        ${escapeHtml(playerXName)}
                    </strong>

                </div>


                <div class="profile-preview-card">

                    <div class="preview-symbol">
                        ⭕
                    </div>

                    <strong id="previewO">
                        ${escapeHtml(playerOName)}
                    </strong>

                </div>

            </div>


            <button
                class="menu-btn primary profile-save"
                id="saveProfilesBtn"
            >

                <span>
                    💾
                </span>

                <div>

                    <strong>
                        ذخیره پروفایل
                    </strong>

                    <small>
                        ذخیره نام بازیکن‌ها
                    </small>

                </div>

            </button>


            <button
                class="menu-btn"
                id="profileBackBtn"
            >

                <span>
                    🏠
                </span>

                <div>

                    <strong>
                        برگشت
                    </strong>

                    <small>
                        منوی اصلی
                    </small>

                </div>

            </button>

        </div>


        <div class="version">
            XO ARENA • پروفایل
        </div>

    `;


    const inputX =
        document.querySelector(
            "#profileXInput"
        );

    const inputO =
        document.querySelector(
            "#profileOInput"
        );

    const previewX =
        document.querySelector(
            "#previewX"
        );

    const previewO =
        document.querySelector(
            "#previewO"
        );


    inputX.addEventListener(
        "input",
        () => {

            previewX.textContent =
                inputX.value.trim()
                || "بازیکن X";

        }
    );


    inputO.addEventListener(
        "input",
        () => {

            previewO.textContent =
                inputO.value.trim()
                || "بازیکن O";

        }
    );


    document
        .querySelector("#saveProfilesBtn")
        .addEventListener(
            "click",
            () => {

                const newX =
                    inputX.value.trim();

                const newO =
                    inputO.value.trim();


                playerXName =
                    newX || "بازیکن X";

                playerOName =
                    newO || "بازیکن O";


                localStorage.setItem(
                    "playerXName",
                    playerXName
                );

                localStorage.setItem(
                    "playerOName",
                    playerOName
                );


                showProfilesSaved();

            }
        );


    document
        .querySelector("#profileBackBtn")
        .addEventListener(
            "click",
            restoreHome
        );

}


// ==========================================
// PROFILE SAVED
// ==========================================

function showProfilesSaved() {

    const saveButton =
        document.querySelector(
            "#saveProfilesBtn"
        );


    if (!saveButton) {
        return;
    }


    saveButton.querySelector(
        "strong"
    ).textContent =
        "ذخیره شد ✓";


    saveButton.querySelector(
        "small"
    ).textContent =
        "پروفایل با موفقیت ذخیره شد";


    saveButton.classList.add(
        "button-click"
    );


    playSound(
        780,
        0.08,
        "sine",
        0.05
    );


    vibrate([
        40,
        40,
        70
    ]);


    setTimeout(
        () => {

            showProfiles();

        },
        550
    );

}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHtml(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


// ==========================================
// PROFILE BUTTON
// ==========================================

function addProfileButtonToHome() {

    if (
        document.querySelector(
            "#profileBtn"
        )
    ) {
        return;
    }

}


// ==========================================
// BACK HOME
// ==========================================

backToMenuBtn.addEventListener(
    "click",
    restoreHome
);


function restoreHome() {

    location.reload();

}


// ==========================================
// CELL CLICK
// ==========================================

cells.forEach(
    (cell) => {

        cell.addEventListener(
            "click",
            () => {

                if (
                    cell.textContent !== "" ||
                    !gameActive
                ) {

                    return;

                }


                if (
                    gameMode === "computer" &&
                    currentPlayer !== playerSymbol
                ) {

                    return;

                }


                cell.textContent =
                    currentPlayer;

                cell.classList.add(
                    "marked"
                );


                cellFeedback(
                    currentPlayer
                );


                checkWinner();


                if (!gameActive) {

                    return;

                }


                switchPlayer();

                updateStatus();

                updateActivePlayer();


                if (
                    gameMode === "computer" &&
                    currentPlayer === computerSymbol
                ) {

                    setTimeout(
                        computerMove,
                        500
                    );

                }

            }
        );

    }
);


// ==========================================
// SWITCH PLAYER
// ==========================================

function switchPlayer() {

    currentPlayer =
        currentPlayer === "X"
            ? "O"
            : "X";

}


// ==========================================
// STATUS
// ==========================================

function updateStatus() {

    let name;


    if (
        gameMode === "computer"
    ) {

        if (
            currentPlayer === playerSymbol
        ) {

            name =
                currentPlayer === "X"
                    ? playerXName
                    : playerOName;

        }

        else {

            name =
                "🤖 کامپیوتر";

        }

    }

    else {

        name =
            currentPlayer === "X"
                ? playerXName
                : playerOName;

    }


    statusText.textContent =
        `نوبت ${currentPlayer} • ${name}`;


    statusText.classList.add(
        "status-pop"
    );


    setTimeout(
        () => {

            statusText.classList.remove(
                "status-pop"
            );

        },
        350
    );


    updateActivePlayer();

}


// ==========================================
// COMPUTER MOVE
// ==========================================

function computerMove() {

    if (!gameActive) {
        return;
    }


    const emptyCells =
        getEmptyCells();


    if (!emptyCells.length) {
        return;
    }


    let selectedIndex;


    if (
        difficulty === "easy"
    ) {

        selectedIndex =
            getRandomMove();

    }

    else if (
        difficulty === "medium"
    ) {

        selectedIndex =
            getMediumMove();

    }

    else {

        selectedIndex =
            getHardMove();

    }


    cells[selectedIndex].textContent =
        computerSymbol;

    cells[selectedIndex].classList.add(
        "marked"
    );


    cellFeedback(
        computerSymbol
    );


    checkWinner();


    if (!gameActive) {
        return;
    }


    switchPlayer();

    updateStatus();

}


// ==========================================
// EMPTY CELLS
// ==========================================

function getEmptyCells() {

    const empty = [];


    cells.forEach(
        (cell, index) => {

            if (
                cell.textContent === ""
            ) {

                empty.push(index);

            }

        }
    );


    return empty;

}


// ==========================================
// RANDOM
// ==========================================

function getRandomMove() {

    const empty =
        getEmptyCells();


    return empty[
        Math.floor(
            Math.random() *
            empty.length
        )
    ];

}


// ==========================================
// MEDIUM
// ==========================================

function getMediumMove() {

    const empty =
        getEmptyCells();


    for (
        const index of empty
    ) {

        cells[index].textContent =
            computerSymbol;


        if (
            hasWinner(
                computerSymbol
            )
        ) {

            cells[index].textContent =
                "";

            return index;

        }


        cells[index].textContent =
            "";

    }


    for (
        const index of empty
    ) {

        cells[index].textContent =
            playerSymbol;


        if (
            hasWinner(
                playerSymbol
            )
        ) {

            cells[index].textContent =
                "";

            return index;

        }


        cells[index].textContent =
            "";

    }


    if (
        cells[4].textContent === ""
    ) {

        return 4;

    }


    const corners =
        [0, 2, 6, 8];


    const emptyCorners =
        corners.filter(
            index =>
                cells[index].textContent === ""
        );


    if (
        emptyCorners.length
    ) {

        return emptyCorners[
            Math.floor(
                Math.random() *
                emptyCorners.length
            )
        ];

    }


    return getRandomMove();

}


// ==========================================
// HARD
// ==========================================

function getHardMove() {

    let bestScore =
        -Infinity;

    let bestMove;


    const empty =
        getEmptyCells();


    for (
        const index of empty
    ) {

        cells[index].textContent =
            computerSymbol;


        const score =
            minimax(false);


        cells[index].textContent =
            "";


        if (
            score > bestScore
        ) {

            bestScore =
                score;

            bestMove =
                index;

        }

    }


    return bestMove;

}


// ==========================================
// MINIMAX
// ==========================================

function minimax(
    isMaximizing
) {

    if (
        hasWinner(
            computerSymbol
        )
    ) {

        return 10;

    }


    if (
        hasWinner(
            playerSymbol
        )
    ) {

        return -10;

    }


    const empty =
        getEmptyCells();


    if (!empty.length) {

        return 0;

    }


    if (isMaximizing) {

        let best =
            -Infinity;


        for (
            const index of empty
        ) {

            cells[index].textContent =
                computerSymbol;


            const score =
                minimax(false);


            cells[index].textContent =
                "";


            best =
                Math.max(
                    best,
                    score
                );

        }


        return best;

    }


    let best =
        Infinity;


    for (
        const index of empty
    ) {

        cells[index].textContent =
            playerSymbol;


        const score =
            minimax(true);


        cells[index].textContent =
            "";


        best =
            Math.min(
                best,
                score
            );

    }


    return best;

}


// ==========================================
// HAS WINNER
// ==========================================

function hasWinner(symbol) {

    return winningCombinations.some(
        combination => {

            const [a, b, c] =
                combination;


            return (

                cells[a].textContent ===
                symbol &&

                cells[b].textContent ===
                symbol &&

                cells[c].textContent ===
                symbol

            );

        }
    );

}


// ==========================================
// CHECK WINNER
// ==========================================

function checkWinner() {

    for (
        const combination
        of winningCombinations
    ) {

        const [a, b, c] =
            combination;


        if (

            cells[a].textContent !== "" &&

            cells[a].textContent ===
            cells[b].textContent &&

            cells[a].textContent ===
            cells[c].textContent

        ) {

            gameActive =
                false;


            cells[a].classList.add(
                "winner"
            );

            cells[b].classList.add(
                "winner"
            );

            cells[c].classList.add(
                "winner"
            );


            const winner =
                currentPlayer;


            const winnerName =
                getPlayerName(
                    winner
                );


            statusText.textContent =
                `🎉 ${winnerName} برنده شد!`;


            statusText.classList.add(
                "status-pop"
            );


            highlightWinner(
                winner
            );


            if (effectsEnabled) {

                gameScreen.classList.add(
                    "win-effect"
                );

            }


            if (
                winner === "X"
            ) {

                scoreX++;

            }

            else {

                scoreO++;

            }


            saveScore();

            updateScore();

            winFeedback();


            setTimeout(
                () => {

                    showResult(
                        "win",
                        winner
                    );

                },
                650
            );


            return;

        }

    }


    const draw =
        [...cells].every(
            cell =>
                cell.textContent !== ""
        );


    if (draw) {

        gameActive =
            false;


        statusText.textContent =
            "🤝 بازی مساوی شد!";


        statusText.classList.add(
            "status-pop"
        );


        if (effectsEnabled) {

            gameScreen.classList.add(
                "draw-effect"
            );

        }


        scoreDraw++;

        saveScore();

        updateScore();

        drawFeedback();


        setTimeout(
            () => {

                showResult(
                    "draw"
                );

            },
            650
        );

    }

}


// ==========================================
// GET PLAYER NAME
// ==========================================

function getPlayerName(symbol) {

    if (
        gameMode === "computer" &&
        symbol === computerSymbol
    ) {

        return "🤖 کامپیوتر";

    }


    return symbol === "X"
        ? playerXName
        : playerOName;

}


// ==========================================
// HIGHLIGHT WINNER
// ==========================================

function highlightWinner(symbol) {

    playerXCard.classList.remove(
        "winner-player"
    );

    playerOCard.classList.remove(
        "winner-player"
    );


    if (
        symbol === "X"
    ) {

        playerXCard.classList.add(
            "winner-player"
        );

    }

    else {

        playerOCard.classList.add(
            "winner-player"
        );

    }

}


// ==========================================
// RESULT
// ==========================================

function showResult(
    type,
    winner
) {

    if (
        type === "win"
    ) {

        const name =
            getPlayerName(
                winner
            );


        resultIcon.textContent =
            winner === "X"
                ? "❌"
                : "⭕";


        resultTitle.textContent =
            `🏆 ${name} برنده شد!`;


        resultSubtitle.textContent =
            "چه بازی خفنی! 🔥";

    }

    else {

        resultIcon.textContent =
            "🤝";


        resultTitle.textContent =
            "بازی مساوی شد!";


        resultSubtitle.textContent =
            "هیچ‌کس کوتاه نیومد 😎";

    }


    resultScoreX.textContent =
        scoreX;

    resultScoreO.textContent =
        scoreO;

    resultScoreDraw.textContent =
        scoreDraw;


    resultOverlay.classList.add(
        "show"
    );

}


// ==========================================
// CLOSE RESULT
// ==========================================

function closeResult() {

    resultOverlay.classList.remove(
        "show"
    );

}


// ==========================================
// PLAY AGAIN
// ==========================================

playAgainBtn.addEventListener(
    "click",
    () => {

        closeResult();

        restartGame();

    }
);


// ==========================================
// RESULT HOME
// ==========================================

resultHomeBtn.addEventListener(
    "click",
    () => {

        closeResult();

        restoreHome();

    }
);


// ==========================================
// RESTART GAME
// ==========================================

restartButton.addEventListener(
    "click",
    restartGame
);


function restartGame() {

    closeResult();


    cells.forEach(
        cell => {

            cell.textContent =
                "";

            cell.classList.remove(
                "marked",
                "winner"
            );

        }
    );


    gameScreen.classList.remove(
        "win-effect",
        "draw-effect"
    );


    playerXCard.classList.remove(
        "winner-player"
    );

    playerOCard.classList.remove(
        "winner-player"
    );


    currentPlayer =
        "X";

    gameActive =
        true;


    statusText.textContent =
        `نوبت X • ${
            gameMode === "computer" &&
            computerSymbol === "X"
                ? "🤖 کامپیوتر"
                : playerXName
        }`;


    updateActivePlayer();


    if (
        gameMode === "computer" &&
        computerSymbol === "X"
    ) {

        setTimeout(
            computerMove,
            500
        );

    }

}


// ==========================================
// RESET SCORE FROM GAME
// ==========================================

resetScoreButton.addEventListener(
    "click",
    () => {

        resetAllScores();

        restartGame();

    }
);


// ==========================================
// SAVE SCORE
// ==========================================

function saveScore() {

    localStorage.setItem(
        "scoreX",
        scoreX
    );

    localStorage.setItem(
        "scoreO",
        scoreO
    );

    localStorage.setItem(
        "scoreDraw",
        scoreDraw
    );

}


// ==========================================
// UPDATE SCORE
// ==========================================

function updateScore() {

    scoreXElement.textContent =
        scoreX;

    scoreOElement.textContent =
        scoreO;

    scoreDrawElement.textContent =
        scoreDraw;

}


// ==========================================
// RESET ALL STATISTICS
// ==========================================

function resetAllScores() {

    const confirmReset =
        confirm(
            "⚠️ مطمئنی می‌خوای کل آمار بازی‌ها پاک بشه؟\n\nبرد X، برد O و مساوی‌ها همگی صفر می‌شن."
        );


    if (!confirmReset) {
        return;
    }


    scoreX = 0;

    scoreO = 0;

    scoreDraw = 0;


    saveScore();

    updateScore();

    playButtonSound();

}


// ==========================================
// STATS
// ==========================================

statsBtn.addEventListener(
    "click",
    showStats
);


function showStats() {

    const totalGames =
        scoreX +
        scoreO +
        scoreDraw;


    let winRate =
        0;


    if (
        totalGames > 0
    ) {

        winRate =
            Math.round(
                (
                    (scoreX + scoreO)
                    /
                    totalGames
                ) * 100
            );

    }


    homeScreen.innerHTML = `

        <div class="logo">

            <div class="logo-x">X</div>
            <div class="logo-o">O</div>

        </div>


        <h1>
            آمار بازی
        </h1>


        <p class="subtitle">
            رکوردهای تو در XO Arena 🏆
        </p>


        <div class="menu">

            <div class="menu-btn">

                <span>❌</span>

                <div>

                    <strong>
                        بردهای X
                    </strong>

                    <small>
                        ${scoreX} برد
                    </small>

                </div>

            </div>


            <div class="menu-btn">

                <span>⭕</span>

                <div>

                    <strong>
                        بردهای O
                    </strong>

                    <small>
                        ${scoreO} برد
                    </small>

                </div>

            </div>


            <div class="menu-btn">

                <span>🤝</span>

                <div>

                    <strong>
                        بازی‌های مساوی
                    </strong>

                    <small>
                        ${scoreDraw} مساوی
                    </small>

                </div>

            </div>


            <div class="menu-btn">

                <span>🎮</span>

                <div>

                    <strong>
                        مجموع بازی‌ها
                    </strong>

                    <small>
                        ${totalGames} بازی
                    </small>

                </div>

            </div>


            <div class="menu-btn">

                <span>📊</span>

                <div>

                    <strong>
                        درصد برد
                    </strong>

                    <small>
                        ${winRate}٪
                    </small>

                </div>

            </div>


            <button
                class="menu-btn danger"
                id="resetStatsBtn"
            >

                <span>
                    🗑️
                </span>

                <div>

                    <strong>
                        ریست کل آمار
                    </strong>

                    <small>
                        پاک کردن تمام رکوردها
                    </small>

                </div>

            </button>


            <button
                class="menu-btn"
                id="profileStatsBtn"
            >

                <span>
                    👤
                </span>

                <div>

                    <strong>
                        پروفایل بازیکنان
                    </strong>

                    <small>
                        ${escapeHtml(playerXName)}
                        و
                        ${escapeHtml(playerOName)}
                    </small>

                </div>

            </button>


            <button
                class="menu-btn primary"
                id="statsBackBtn"
            >

                <span>
                    🏠
                </span>

                <div>

                    <strong>
                        برگشت به منو
                    </strong>

                    <small>
                        ادامه بازی
                    </small>

                </div>

            </button>

        </div>


        <div class="version">
            XO ARENA • آمار بازیکن
        </div>

    `;


    document
        .querySelector("#resetStatsBtn")
        .addEventListener(
            "click",
            () => {

                resetAllScores();

                showStats();

            }
        );


    document
        .querySelector("#profileStatsBtn")
        .addEventListener(
            "click",
            showProfiles
        );


    document
        .querySelector("#statsBackBtn")
        .addEventListener(
            "click",
            restoreHome
        );

}


// ==========================================
// SETTINGS
// ==========================================

settingsBtn.addEventListener(
    "click",
    showSettings
);


function showSettings() {

    homeScreen.innerHTML = `

        <div class="logo">

            <div class="logo-x">X</div>
            <div class="logo-o">O</div>

        </div>


        <h1>
            تنظیمات
        </h1>


        <p class="subtitle">
            بازی رو مطابق سلیقه خودت تنظیم کن ⚙️
        </p>


        <div class="menu">

            <button
                class="menu-btn"
                id="profileSetting"
            >

                <span>
                    👤
                </span>

                <div>

                    <strong>
                        پروفایل بازیکنان
                    </strong>

                    <small>
                        ${escapeHtml(playerXName)}
                        •
                        ${escapeHtml(playerOName)}
                    </small>

                </div>

            </button>


            <button
                class="menu-btn"
                id="soundSetting"
            >

                <span>
                    ${soundEnabled ? "🔊" : "🔇"}
                </span>

                <div>

                    <strong>
                        صدای بازی
                    </strong>

                    <small>
                        ${soundEnabled
                            ? "فعال"
                            : "غیرفعال"}
                    </small>

                </div>

            </button>


            <button
                class="menu-btn"
                id="vibrationSetting"
            >

                <span>
                    📳
                </span>

                <div>

                    <strong>
                        ویبره
                    </strong>

                    <small>
                        ${vibrationEnabled
                            ? "فعال"
                            : "غیرفعال"}
                    </small>

                </div>

            </button>


            <button
                class="menu-btn"
                id="effectsSetting"
            >

                <span>
                    ✨
                </span>

                <div>

                    <strong>
                        افکت‌ها
                    </strong>

                    <small>
                        ${effectsEnabled
                            ? "فعال"
                            : "غیرفعال"}
                    </small>

                </div>

            </button>


            <button
                class="menu-btn"
                id="resetSettings"
            >

                <span>
                    🔄
                </span>

                <div>

                    <strong>
                        بازنشانی تنظیمات
                    </strong>

                    <small>
                        برگشت به حالت پیش‌فرض
                    </small>

                </div>

            </button>


            <button
                class="menu-btn primary"
                id="settingsBackBtn"
            >

                <span>
                    🏠
                </span>

                <div>

                    <strong>
                        برگشت به منو
                    </strong>

                    <small>
                        ادامه بازی
                    </small>

                </div>

            </button>

        </div>


        <div class="version">
            XO ARENA • تنظیمات
        </div>

    `;


    document
        .querySelector("#profileSetting")
        .addEventListener(
            "click",
            showProfiles
        );


    document
        .querySelector("#soundSetting")
        .addEventListener(
            "click",
            () => {

                soundEnabled =
                    !soundEnabled;

                localStorage.setItem(
                    "soundEnabled",
                    soundEnabled
                );

                showSettings();

            }
        );


    document
        .querySelector("#vibrationSetting")
        .addEventListener(
            "click",
            () => {

                vibrationEnabled =
                    !vibrationEnabled;

                localStorage.setItem(
                    "vibrationEnabled",
                    vibrationEnabled
                );


                if (
                    vibrationEnabled &&
                    navigator.vibrate
                ) {

                    navigator.vibrate(
                        100
                    );

                }


                showSettings();

            }
        );


    document
        .querySelector("#effectsSetting")
        .addEventListener(
            "click",
            () => {

                effectsEnabled =
                    !effectsEnabled;

                localStorage.setItem(
                    "effectsEnabled",
                    effectsEnabled
                );

                showSettings();

            }
        );


    document
        .querySelector("#resetSettings")
        .addEventListener(
            "click",
            () => {

                soundEnabled =
                    true;

                vibrationEnabled =
                    true;

                effectsEnabled =
                    true;


                localStorage.setItem(
                    "soundEnabled",
                    "true"
                );

                localStorage.setItem(
                    "vibrationEnabled",
                    "true"
                );

                localStorage.setItem(
                    "effectsEnabled",
                    "true"
                );


                showSettings();

            }
        );


    document
        .querySelector("#settingsBackBtn")
        .addEventListener(
            "click",
            restoreHome
        );

}


// ==========================================
// SOUND ENGINE
// ==========================================

let audioContext = null;


function getAudioContext() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }

    return audioContext;

}


function playSound(
    frequency = 500,
    duration = 0.08,
    type = "sine",
    volume = 0.06
) {

    if (!soundEnabled) {
        return;
    }


    try {

        const ctx =
            getAudioContext();


        if (
            ctx.state === "suspended"
        ) {

            ctx.resume();

        }


        const oscillator =
            ctx.createOscillator();


        const gain =
            ctx.createGain();


        oscillator.type =
            type;


        oscillator.frequency.setValueAtTime(
            frequency,
            ctx.currentTime
        );


        gain.gain.setValueAtTime(
            0,
            ctx.currentTime
        );


        gain.gain.linearRampToValueAtTime(
            volume,
            ctx.currentTime + 0.01
        );


        gain.gain.exponentialRampToValueAtTime(
            0.001,
            ctx.currentTime + duration
        );


        oscillator.connect(gain);

        gain.connect(
            ctx.destination
        );


        oscillator.start();

        oscillator.stop(
            ctx.currentTime +
            duration
        );

    }

    catch (error) {

        console.log(
            "Audio error:",
            error
        );

    }

}


// ==========================================
// CELL SOUND
// ==========================================

function playCellSound(symbol) {

    if (
        symbol === "X"
    ) {

        playSound(
            520,
            0.08,
            "sine",
            0.06
        );

    }

    else {

        playSound(
            700,
            0.08,
            "sine",
            0.06
        );

    }

}


// ==========================================
// BUTTON SOUND
// ==========================================

function playButtonSound() {

    playSound(
        420,
        0.05,
        "sine",
        0.04
    );

}


// ==========================================
// WIN SOUND
// ==========================================

function playWinSound() {

    if (!soundEnabled) {
        return;
    }


    playSound(
        523,
        0.12,
        "sine",
        0.07
    );


    setTimeout(
        () => {

            playSound(
                659,
                0.12,
                "sine",
                0.07
            );

        },
        100
    );


    setTimeout(
        () => {

            playSound(
                784,
                0.2,
                "sine",
                0.08
            );

        },
        200
    );

}


// ==========================================
// DRAW SOUND
// ==========================================

function playDrawSound() {

    if (!soundEnabled) {
        return;
    }


    playSound(
        440,
        0.12,
        "triangle",
        0.05
    );


    setTimeout(
        () => {

            playSound(
                330,
                0.2,
                "triangle",
                0.05
            );

        },
        120
    );

}


// ==========================================
// VIBRATION
// ==========================================

function vibrate(
    pattern = 50
) {

    if (
        !vibrationEnabled ||
        !navigator.vibrate
    ) {

        return;

    }


    try {

        navigator.vibrate(
            pattern
        );

    }

    catch (error) {

        console.log(
            "Vibration error:",
            error
        );

    }

}


// ==========================================
// CELL FEEDBACK
// ==========================================

function cellFeedback(symbol) {

    playCellSound(symbol);

    vibrate(35);

}


// ==========================================
// WIN FEEDBACK
// ==========================================

function winFeedback() {

    playWinSound();

    vibrate([
        80,
        50,
        120,
        50,
        180
    ]);

}


// ==========================================
// DRAW FEEDBACK
// ==========================================

function drawFeedback() {

    playDrawSound();

    vibrate([
        70,
        50,
        70
    ]);

          }
