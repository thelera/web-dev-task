import { tickerStore } from "../store/TickerStore";
import { TickerType } from "../types/TickerType";
import Modal from "react-modal";

interface TickerModalProps {
  tickerName: string;
  onClose: () => void;
}

const TickerModal = ({ tickerName, onClose }: TickerModalProps) => {
  return (
    <Modal
      isOpen={!!tickerName}
      onRequestClose={onClose}
      className="modal"
      contentLabel="Ticker Modal"
    >
      <h2>{tickerName}</h2>

      <table>
        {tickerStore.ticker &&
          tickerName &&
          Object.keys(tickerStore.ticker[tickerName]).map((key) => (
            <tr>
              <td>{key}</td>
              <td>
                {tickerStore.ticker?.[tickerName][key as keyof TickerType]}
              </td>
            </tr>
          ))}
      </table>

      <button className="modal__close" onClick={onClose}>
        Закрыть
      </button>
    </Modal>
  );
};

export { TickerModal };
