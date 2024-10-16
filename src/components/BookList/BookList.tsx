import { observer } from "mobx-react-lite";
import { bookListCtrl } from "./BookList.ctrl";
import { bookListModel } from "./BookList.model";
import { Book } from "./BookList.type";

const Books: React.FC = () => {
  return (
    <div>
      <ul>
        {bookListModel.books.map((book: Book) => (
          <li className="py-6" key={book.id}>
            <div className="text-2xl font-bold leading-8">{book.author}</div>
            <div className="mr-3 text-sm font-medium uppercase text-[#EC4899] hover:text-[#BE185E]">
              {book.name}
            </div>
          </li>
        ))}
      </ul>

      <button
        className="bg-[#EC4899] rounded-md py-2 px-4 font-medium text-white hover:bg-[#BE185E] cursor-pointer"
        onClick={() => bookListCtrl.addRandomBook()}
      >
        Add book
      </button>
    </div>
  );
};

export const ObservedBooks = observer(Books);

export default ObservedBooks;
