import { useEffect, useState } from "react";
import { Tabs } from "../components/Tabs";
import { QuotesTab } from "../types/QuotesTab";
import { Table } from "./Table";
import { observer } from "mobx-react-lite";
import { tickerStore } from "../store/TickerStore";
import { TickerModal } from "../components/TickerModal";

const Quotes = observer(() => {
  const [activeTab, setActiveTab] = useState<QuotesTab>(QuotesTab.QUOTESA);
  const [tickerToShow, setTickerToShow] = useState<string>("");

  useEffect(() => {
    tickerStore.loadTickers();
  }, []);

  useEffect(() => {
    if (!tickerToShow) {
      const timer = setInterval(() => {
        tickerStore.loadTickers();
      }, 5000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [tickerToShow]);

  function handleTabClick(tab: QuotesTab) {
    setActiveTab(tab);
  }

  function closeModal() {
    setTickerToShow("");
  }

  function handleRowClick(name: string) {
    setTickerToShow(name);
  }

  return (
    <>
      <Tabs activeTab={activeTab} onClick={handleTabClick}>
        {activeTab === QuotesTab.QUOTESA && (
          <Table data={tickerStore.quotesA} onRowClick={handleRowClick} />
        )}
        {activeTab === QuotesTab.QUOTESB && (
          <Table data={tickerStore.quotesB} onRowClick={handleRowClick} />
        )}
      </Tabs>

      <TickerModal tickerName={tickerToShow} onClose={closeModal} />
    </>
  );
});

export { Quotes };
