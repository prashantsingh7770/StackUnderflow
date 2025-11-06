import { RiDeleteBinLine } from "react-icons/ri";

const CartCard = ({ item, onIncrease, onDecrease, deleteItem }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition space-y-3 md:space-y-0">
      {/* Product Info */}
      <div className="w-full md:w-auto flex gap-2">
        <img src={item.imageUrl} alt={item.name} className="w-10 h-10 md:w-12 md:h-12 rounded object-cover mt-2" />
        <div className="ml-2">
            <h2 className="text-lg font-semibold">{item.name}</h2>
        <p className="text-base font-medium text-gray-700">₹{item.price}</p>
        </div>
      
      </div>

      {/* Quantity + Delete Section (Mobile First) */}
      <div className="flex w-full md:w-auto items-center justify-between md:justify-center gap-4">
        {/* Quantity Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onDecrease}
            className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition active:scale-95"
          >
            -
          </button>
          <span className="text-lg font-medium">{item.quantity}</span>
          <button
            onClick={onIncrease}
            className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition active:scale-95"
          >
            +
          </button>
        </div>

        {/* Delete Button (moves beside quantity on mobile) */}
        <button
          onClick={deleteItem}
          className="text-red-500 hover:text-red-700 transition md:ml-4"
        >
          <RiDeleteBinLine size={22} />
        </button>
      </div>

      {/* Subtotal (hidden on small screens) */}
      <p className="hidden md:block text-lg font-semibold text-gray-800">
        ₹{(item.price * item.quantity).toLocaleString()}
      </p>
    </div>
  );
};

export default CartCard;
