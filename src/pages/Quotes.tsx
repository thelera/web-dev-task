import { useEffect, useState } from "react";
import { Tabs } from "../components/Tabs";
import { QuotesTab } from "../types/QuotesTab";
import { TickerType } from "../types/TickerType";
import { Table } from "./Table";
import Modal from "react-modal";

const Quotes = () => {
  const [activeTab, setActiveTab] = useState<QuotesTab>(QuotesTab.QUOTESA);
  const [data, setData] = useState<Record<string, TickerType> | null>(null);
  const [tickerToShow, setTickerToShow] = useState<string>("");

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
    if (!tickerToShow) {
      const timer = setInterval(() => {
        getData();
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
    setTickerToShow('');
  }

  function handleRowClick(name: string) {
    setTickerToShow(name);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  return (
    <>
      <Tabs activeTab={activeTab} onClick={handleTabClick}>
        {activeTab === QuotesTab.QUOTESA && (
          <Table data={data} onRowClick={handleRowClick} />
        )}
        {activeTab === QuotesTab.QUOTESB && (
          <Table data={data} onRowClick={handleRowClick} />
        )}
      </Tabs>

      <Modal
        isOpen={!!tickerToShow}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="modal"
        contentLabel="Example Modal"
      >
        <h2>{tickerToShow}</h2>

        <table>
          {data &&
            tickerToShow &&
            Object.keys(data[tickerToShow]).map((key) => (
              <tr>
                <td>{key}</td>{" "}
                <td>{data[tickerToShow][key as keyof TickerType]}</td>
              </tr>
            ))}
        </table>

        <button className="modal__close" onClick={closeModal}>Закрыть</button>
      </Modal>
    </>
  );
};

export { Quotes };
