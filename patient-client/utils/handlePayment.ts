import RazorpayCheckout from "react-native-razorpay";

export const handlePayment = () => {
  console.log("hello");
  const options = {
    description: "Credits towards consultation",
    image: "https://i.imgur.com/3g7nmJC.jpg",
    currency: "INR",
    key: "rzp_test_2VYHup8J177yIx",
    amount: "5000",
    name: "Acme Corp",
    order_id: "",
    prefill: {
      email: "gaurav.kumar@example.com",
      contact: "9191919191",
      name: "Gaurav Kumar",
    },
    theme: { color: "#53a20e" },
  };

  RazorpayCheckout.open(options)
    .then((data) => {
      alert(`Success: ${data.razorpay_payment_id}`);
    })
    .catch((error) => {
      console.log(error)
      alert(`Error: ${error.code} | ${error.description}`);
    });
};