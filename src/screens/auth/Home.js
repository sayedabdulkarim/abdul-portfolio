import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation, Trans } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import "./Home.scss";

const Home = () => {
  const { t } = useTranslation();
  const [showGame, setShowGame] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);

  // Game state refs
  const paddleRef = useRef({ x: 0, width: 80, height: 12 });
  const ballRef = useRef({ x: 0, y: 0, dx: 4, dy: -4, radius: 8 });
  const bricksRef = useRef([]);

  const initGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Initialize paddle
    paddleRef.current = {
      x: width / 2 - 40,
      width: 80,
      height: 12,
    };

    // Initialize ball
    ballRef.current = {
      x: width / 2,
      y: height - 50,
      dx: 4,
      dy: -4,
      radius: 8,
    };

    // Initialize bricks
    const brickRows = 4;
    const brickCols = 8;
    const brickWidth = (width - 60) / brickCols;
    const brickHeight = 20;
    const bricks = [];
    const colors = ["#f44336", "#ff9800", "#4caf50", "#2196f3"];

    for (let row = 0; row < brickRows; row++) {
      for (let col = 0; col < brickCols; col++) {
        bricks.push({
          x: 25 + col * brickWidth,
          y: 40 + row * (brickHeight + 5),
          width: brickWidth - 5,
          height: brickHeight,
          color: colors[row],
          alive: true,
        });
      }
    }
    bricksRef.current = bricks;

    setGameScore(0);
    setGameOver(false);
    setGameStarted(true);
  }, []);

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const paddle = paddleRef.current;
    const ball = ballRef.current;
    const bricks = bricksRef.current;

    // Clear canvas
    ctx.fillStyle = "#161b22";
    ctx.fillRect(0, 0, width, height);

    // Draw bricks
    bricks.forEach((brick) => {
      if (brick.alive) {
        ctx.fillStyle = brick.color;
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        ctx.strokeStyle = "#0d1117";
        ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
      }
    });

    // Draw paddle
    ctx.fillStyle = "#58a6ff";
    ctx.beginPath();
    ctx.roundRect(paddle.x, height - 30, paddle.width, paddle.height, 6);
    ctx.fill();

    // Draw ball
    ctx.fillStyle = "#f0f6fc";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();

    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with walls
    if (ball.x + ball.radius > width || ball.x - ball.radius < 0) {
      ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0) {
      ball.dy = -ball.dy;
    }

    // Ball collision with paddle
    if (
      ball.y + ball.radius > height - 30 &&
      ball.x > paddle.x &&
      ball.x < paddle.x + paddle.width
    ) {
      ball.dy = -Math.abs(ball.dy);
      // Add angle based on where ball hits paddle
      const hitPos = (ball.x - paddle.x) / paddle.width;
      ball.dx = 8 * (hitPos - 0.5);
    }

    // Ball falls below paddle
    if (ball.y + ball.radius > height) {
      setGameOver(true);
      setGameStarted(false);
      cancelAnimationFrame(gameLoopRef.current);
      return;
    }

    // Ball collision with bricks
    bricks.forEach((brick) => {
      if (brick.alive) {
        if (
          ball.x > brick.x &&
          ball.x < brick.x + brick.width &&
          ball.y - ball.radius < brick.y + brick.height &&
          ball.y + ball.radius > brick.y
        ) {
          brick.alive = false;
          ball.dy = -ball.dy;
          setGameScore((prev) => prev + 10);
        }
      }
    });

    // Check win condition
    if (bricks.every((brick) => !brick.alive)) {
      setGameOver(true);
      setGameStarted(false);
      cancelAnimationFrame(gameLoopRef.current);
      return;
    }

    // Draw score
    ctx.fillStyle = "#8b949e";
    ctx.font = "16px monospace";
    ctx.fillText(`${t("home.score")}: ${gameScore}`, 10, 25);

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameScore, t]);

  useEffect(() => {
    if (gameStarted && showGame) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameStarted, showGame, gameLoop]);

  // Mouse/touch controls
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !showGame) return;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      paddleRef.current.x = Math.max(
        0,
        Math.min(x - paddleRef.current.width / 2, canvas.width - paddleRef.current.width)
      );
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      paddleRef.current.x = Math.max(
        0,
        Math.min(x - paddleRef.current.width / 2, canvas.width - paddleRef.current.width)
      );
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [showGame]);

  const handleStartGame = () => {
    setShowGame(true);
    setTimeout(() => initGame(), 100);
  };

  const handleRestartGame = () => {
    initGame();
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="hero-section">
          <div className="profile-container">
            <img src="/assets/profile_02.png" alt="Sayed Abdul Karim" className="profile-img" />
          </div>

          <h1 className="hero-name">{t("home.name")}</h1>

          <p className="hero-intro">
            <Trans i18nKey="home.intro" components={{ highlight: <span className="highlight" /> }} />
          </p>

          {!showGame ? (
            <button className="game-btn" onClick={handleStartGame}>
              <FontAwesomeIcon icon={faGamepad} />
              <span>{t("home.playBreakout")}</span>
            </button>
          ) : (
            <div className="game-container">
              <canvas
                ref={canvasRef}
                width={400}
                height={350}
                className="game-canvas"
              />
              {gameOver && (
                <div className="game-overlay">
                  <p className="game-over-text">
                    {bricksRef.current.every((b) => !b.alive) ? t("home.youWin") : t("home.gameOver")}
                  </p>
                  <p className="final-score">{t("home.score")}: {gameScore}</p>
                  <button className="restart-btn" onClick={handleRestartGame}>
                    {t("home.playAgain")}
                  </button>
                </div>
              )}
              <button className="close-game-btn" onClick={() => setShowGame(false)}>
                {t("home.closeGame")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
