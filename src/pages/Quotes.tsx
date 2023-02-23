import { useEffect, useState } from "react";
import { Tabs } from "../components/Tabs";
import { QuotesTab } from "../types/QuotesTab";
import { TickerType } from "../types/TickerType";
import { Table } from "./Table";

const Quotes = () => {
  const [activeTab, setActiveTab] = useState<QuotesTab>(QuotesTab.QUOTESA);
  const [data, setData] = useState<Record<string, TickerType> | null>(null);

  async function getData() {
    try {
      const response = await fetch(
        "http://localhost:5173/api/public?command=returnTicker"
      );

      const data = await response.json();

      setData(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      getData();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  });

  function handleClick(tab: QuotesTab) {
    setActiveTab(tab);
  }

  return (
    <Tabs activeTab={activeTab} onClick={handleClick}>
      {activeTab === QuotesTab.QUOTESA && <Table data={data} />}
      {activeTab === QuotesTab.QUOTESB && <Table data={data} />}
    </Tabs>
  );
};

export { Quotes };
