import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Apps.scss";

const TREASURES = [
  { emoji: "💎", name: "Diamond", points: 50, rarity: 5 },
  { emoji: "🥇", name: "Gold", points: 30, rarity: 10 },
  { emoji: "💰", name: "Money Bag", points: 25, rarity: 12 },
  { emoji: "🪙", name: "Coin", points: 10, rarity: 25 },
  { emoji: "🔮", name: "Crystal", points: 20, rarity: 15 },
  { emoji: "⭐", name: "Star", points: 15, rarity: 20 },
  { emoji: "🪨", name: "Rock", points: 2, rarity: 40 },
  { emoji: "🐛", name: "Bug", points: 5, rarity: 30 },
  { emoji: "🦴", name: "Bone", points: 8, rarity: 25 },
];

const Apps = () => {
  const { t } = useTranslation();
  const [digs, setDigs] = useState(0);
  const [score, setScore] = useState(0);
  const [foundItems, setFoundItems] = useState([]);
  const [isDigging, setIsDigging] = useState(false);
  const [lastFound, setLastFound] = useState(null);
  const [particles, setParticles] = useState([]);

  const getRandomTreasure = () => {
    const totalRarity = TREASURES.reduce((sum, t) => sum + t.rarity, 0);
    let random = Math.random() * totalRarity;

    for (const treasure of TREASURES) {
      random -= treasure.rarity;
      if (random <= 0) return treasure;
    }
    return TREASURES[TREASURES.length - 1];
  };

  const createParticles = (x, y) => {
    const newParticles = [];
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: x + (Math.random() - 0.5) * 60,
        y: y + (Math.random() - 0.5) * 60,
        emoji: ["🟤", "🟫", "⬛"][Math.floor(Math.random() * 3)],
      });
    }
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 500);
  };

  const handleDig = (e) => {
    if (isDigging) return;

    setIsDigging(true);
    createParticles(e.clientX, e.clientY);

    setTimeout(() => {
      const treasure = getRandomTreasure();
      setDigs((d) => d + 1);
      setScore((s) => s + treasure.points);
      setFoundItems((items) => [...items.slice(-19), treasure]);
      setLastFound(treasure);
      setIsDigging(false);

      setTimeout(() => setLastFound(null), 1500);
    }, 300);
  };

  return (
    <div className="apps-page wip-page">
      <div className="wip-container">
        {/* Header */}
        <div className="wip-header">
          <div className="wip-icon">
            <span className="construction-emoji">🚧</span>
            <span className="tools-emoji">⛏️</span>
            <span className="construction-emoji">🚧</span>
          </div>
          <h1 className="wip-title">{t("apps.workInProgress")}</h1>
          <p className="wip-subtitle">
            {t("apps.wipSubtitle")}
            <br />
            <span className="highlight">{t("apps.wipHighlight")}</span>
          </p>
        </div>

        {/* Stats */}
        <div className="wip-stats">
          <div className="stat-box">
            <span className="stat-icon">⛏️</span>
            <span className="stat-value">{digs}</span>
            <span className="stat-label">{t("apps.digs")}</span>
          </div>
          <div className="stat-box">
            <span className="stat-icon">🏆</span>
            <span className="stat-value">{score}</span>
            <span className="stat-label">{t("apps.score")}</span>
          </div>
          <div className="stat-box">
            <span className="stat-icon">💎</span>
            <span className="stat-value">{foundItems.filter(i => i.points >= 30).length}</span>
            <span className="stat-label">{t("apps.rareFinds")}</span>
          </div>
        </div>

        {/* Digging Area */}
        <div
          className={`dig-area ${isDigging ? 'digging' : ''}`}
          onClick={handleDig}
        >
          <div className="dig-surface">
            <div className="grass-layer"></div>
            <div className="dirt-layer">
              <div className="dig-prompt">
                <span className="pickaxe">⛏️</span>
                <p>{t("apps.clickToDig")}</p>
              </div>

              {/* Particles */}
              {particles.map((p) => (
                <span
                  key={p.id}
                  className="dirt-particle"
                  style={{ left: p.x, top: p.y }}
                >
                  {p.emoji}
                </span>
              ))}

              {/* Found treasure popup */}
              {lastFound && (
                <div className="found-treasure">
                  <span className="treasure-emoji">{lastFound.emoji}</span>
                  <span className="treasure-name">+{lastFound.points} pts</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Found Items */}
        {foundItems.length > 0 && (
          <div className="found-items">
            <h3>{t("apps.recentDiscoveries")}</h3>
            <div className="items-grid">
              {foundItems.slice().reverse().map((item, i) => (
                <div key={i} className="found-item" title={`${item.name} - ${item.points} pts`}>
                  {item.emoji}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Coming Soon */}
        <div className="coming-soon">
          <p>{t("apps.comingSoon")}</p>
        </div>
      </div>
    </div>
  );
};

export default Apps;
