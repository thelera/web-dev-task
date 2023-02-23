import { ReactNode } from "react";
import { QuotesTab } from "../types/QuotesTab";

interface TabsProps {
  activeTab: QuotesTab;
  children: ReactNode;
  onClick: (tab: QuotesTab) => void;
}

const Tabs = ({ activeTab, children, onClick }: TabsProps) => {
  return (
    <>
      <ul>
        {Object.values(QuotesTab).map((tab) => (
          <li>
            <a
              className={`tabs__item ${
                tab === activeTab ? "tabs__item--active" : ""
              }`}
              onClick={(evt) => {
                evt.preventDefault();

                if(tab !== activeTab) {
                  onClick(tab)
                }
              }}
            >
              {tab}
            </a>
          </li>
        ))}
      </ul>

      {children}
    </>
  );
};

export { Tabs };
