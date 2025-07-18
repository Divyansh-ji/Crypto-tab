import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import News from "../../components/News/News";

const Home = () => {
  const { allcoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);

  useEffect(() => {
    setDisplayCoin(allcoin);
  }, [allcoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br />
          Crypto Marketplace
        </h1>
        <p>
          Welcome to Divyansh's Crypto Market — Where your digital fortune
          begins!
        </p>
        <form>
          <input type="text" placeholder="Search crypto..." />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="crypto-tabel">
        {/* Table Header */}
        <div className="table-layout table-header">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>

        {/* Table Rows */}
        {displayCoin.slice(0, 10).map((item, index) => (
          <div className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>

            <div className="coin-info">
              <img src={item.image} alt={item.name} />
              <p>
                {item.name} - {item.symbol.toUpperCase()}
              </p>
            </div>

            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>

            <p
              className={item.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}%
            </p>

            <p className="market-cap">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </div>
        ))}
        <News />
      </div>
    </div>
  );
};

export default Home;
