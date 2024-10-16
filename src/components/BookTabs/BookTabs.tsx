import { observer } from "mobx-react-lite";

import { bookTabsCtrl } from "./BookTabs.ctrl";
import { useEffect } from "react";
import { bookTabsModel, Tabs } from "./BookTabs.model";

const BookTabs: React.FC = () => {
  useEffect(() => {
    bookTabsCtrl.setTab(Tabs.All);
  }, []);

  return (
    <>
      <div className="flex gap-4">
        <button
          className="bg-[#EC4899] w-full rounded-md py-2 px-4 font-medium text-white hover:bg-[#BE185E] cursor-pointer disabled:bg-[#BE185E]"
          onClick={() => bookTabsCtrl.setTab(Tabs.All)}
          disabled={bookTabsModel.tab === Tabs.All}
        >
          All books
        </button>
        <button
          className="bg-[#EC4899] w-full rounded-md py-2 px-4 font-medium text-white hover:bg-[#BE185E] cursor-pointer disabled:bg-[#BE185E] whitespace-nowrap"
          onClick={() => bookTabsCtrl.setTab(Tabs.Private)}
          disabled={bookTabsModel.tab === Tabs.Private}
        >
          Private books
        </button>
      </div>
    </>
  );
};

export const ObservedBooksTabs = observer(BookTabs);

export default ObservedBooksTabs;
