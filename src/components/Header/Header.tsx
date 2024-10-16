import { observer } from "mobx-react-lite";
import BooksTabs from "../BookTabs/BookTabs";
import { headerModel } from "./Header.model";

const Header: React.FC = () => {
  return (
    <header className="flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10">
      <div className="hidden h-6 text-2xl font-semibold sm:block">
        Your books: &nbsp;
        <span className="text-[#EC4899]">{headerModel.userBooks}</span>
      </div>
      <BooksTabs />
    </header>
  );
};

export const ObservedHeader = observer(Header);

export default ObservedHeader;
