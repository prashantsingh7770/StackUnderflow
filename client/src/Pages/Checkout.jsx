import React, { useState } from "react";

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    address2: "",
    country: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
  };

  // Example cart data (you can fetch it from API or context)
  const cartSummary = {
    items: 1,
    productTotal: 22,
    shipping: 30,
  };

  const total = cartSummary.productTotal + cartSummary.shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Billing Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-white rounded-xl shadow border border-gray-200 p-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Billing address</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Address 2 (Optional)
            </label>
            <input
              type="text"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Choose...</option>
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Choose...</option>
                <option>UP</option>
                <option>Maharashtra</option>
                <option>California</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Zip
              </label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Payment Section */}
          <h2 className="text-2xl font-semibold mt-8 mb-4">Payment</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name on card
              </label>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Full name as displayed on card"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Credit card number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiration
              </label>
              <input
                type="text"
                name="expDate"
                value={formData.expDate}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Continue to checkout
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4 border-b pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <p>Products ({cartSummary.items})</p>
              <p>${cartSummary.productTotal}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>${cartSummary.shipping}</p>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-bold">
              <p>Total amount</p>
              <p>${total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
