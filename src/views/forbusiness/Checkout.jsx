import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "@/router-dom";
import {
  LockKeyhole,
  ShieldCheck,
  Trash2,
  ArrowLeft,
  CreditCard,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";

const CART_STORAGE_KEY = "xh_ecampus_cart";
const ORDER_STORAGE_KEY = "xh_ecampus_pending_order";

const getPrice = (course) => {
  const value = Number(
    course?.priceValue ??
    String(course?.price || "0").replace(/[^\d.]/g, "")
  );

  return Number.isFinite(value) ? value : 0;
};

const getOldPrice = (course) => {
  const value = Number(
    course?.oldPriceValue ??
    String(course?.oldPrice || course?.price || "0").replace(/[^\d.]/g, "")
  );

  return Number.isFinite(value) ? value : getPrice(course);
};

const formatPrice = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [cartReady, setCartReady] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [orderPrepared, setOrderPrepared] = useState(false);

  // Load cart from localStorage.
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(Array.isArray(parsedCart) ? parsedCart : []);
      }
    } catch (error) {
      console.error("Unable to load checkout cart:", error);
      setCart([]);
    } finally {
      setCartReady(true);
    }
  }, []);

  // Save changes to cart.
  useEffect(() => {
    if (!cartReady) return;

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Unable to save checkout cart:", error);
    }
  }, [cart, cartReady]);

  const total = useMemo(
    () => cart.reduce((sum, course) => sum + getPrice(course), 0),
    [cart]
  );

  const originalTotal = useMemo(
    () => cart.reduce((sum, course) => sum + getOldPrice(course), 0),
    [cart]
  );

  const discount = Math.max(0, originalTotal - total);

  const removeCourse = (id) => {
    setCart((previous) => previous.filter((course) => course.id !== id));
    setMessage("");
    setOrderPrepared(false);
  };

  const handleEmailSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setMessage("");
    setStep(2);
  };

  const handleBillingSubmit = (event) => {
    event.preventDefault();

    if (
      !name.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !state.trim() ||
      !pincode.trim()
    ) {
      setMessage("Please complete all billing details.");
      return;
    }

    if (!/^\d{10}$/.test(phone.trim())) {
      setMessage("Enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(pincode.trim())) {
      setMessage("Enter a valid 6-digit PIN code.");
      return;
    }

    setMessage("");
    setStep(3);
  };

  // This prepares an order only. A real payment must be verified
  // by the backend/payment gateway before marking it as paid.
  const placeOrder = async (event) => {
    event.preventDefault();

    if (!cart.length) {
      setMessage("Your cart is empty.");
      return;
    }

    setLoading(true);
    setMessage("");

    const order = {
      orderId: `XH-${Date.now()}`,
      email: email.trim(),
      customer: {
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim(),
      },
      courses: cart,
      subtotal: originalTotal,
      discount,
      total,
      paymentMethod,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
      setOrderPrepared(true);
      setMessage(
        "Order details saved. Complete payment through the connected payment gateway to confirm your purchase."
      );
    } catch (error) {
      console.error("Unable to prepare order:", error);
      setMessage("Unable to prepare your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    setMessage("");
    setOrderPrepared(false);
    setStep((previous) => Math.max(1, previous - 1));
  };

  const goToCourses = () => navigate("/e-campus");

  if (!cartReady) {
    return (
      <div className="xh-checkout-loading">
        <div className="xh-checkout-spinner" />
        <p>Loading your checkout...</p>

        <style>{`
          .xh-checkout-loading {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 15px;
            color: #65708a;
            font-family: Arial, sans-serif;
          }
          .xh-checkout-spinner {
            width: 38px;
            height: 38px;
            border: 4px solid #e8e5fa;
            border-top-color: #7134dc;
            border-radius: 50%;
            animation: xhCheckoutSpin .8s linear infinite;
          }
          @keyframes xhCheckoutSpin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="xh-checkout-empty">
        <div className="xh-checkout-empty-card">
          <div className="xh-checkout-empty-icon">
            <ShoppingBag size={38} />
          </div>

          <h2>Your cart is empty</h2>
          <p>
            You haven't added any courses yet. Explore E-Campus and
            choose the courses you want to learn.
          </p>

          <button onClick={goToCourses}>
            Explore courses
          </button>
        </div>

        <style>{`
          .xh-checkout-empty {
            min-height: 100vh;
            display: grid;
            place-items: center;
            padding: 20px;
            background: #f7f7fb;
            font-family: Arial, sans-serif;
          }
          .xh-checkout-empty-card {
            max-width: 430px;
            width: 100%;
            padding: 45px 30px;
            text-align: center;
            background: white;
            border: 1px solid #e6e7ef;
            border-radius: 15px;
            box-shadow: 0 8px 30px rgba(0,0,0,.06);
          }
          .xh-checkout-empty-icon {
            width: 76px;
            height: 76px;
            margin: 0 auto 18px;
            display: grid;
            place-items: center;
            border-radius: 50%;
            background: #f0edff;
            color: #7134dc;
          }
          .xh-checkout-empty-card h2 {
            margin: 0 0 10px;
            color: #202335;
          }
          .xh-checkout-empty-card p {
            color: #737b90;
            line-height: 1.7;
            margin: 0 0 22px;
          }
          .xh-checkout-empty-card button {
            padding: 13px 24px;
            border: 0;
            border-radius: 7px;
            background: #7134dc;
            color: white;
            font-weight: 700;
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="xh-checkout">
      {/* HEADER */}
      <header className="xh-checkout-header">
        <button
          type="button"
          className="xh-checkout-logo"
          onClick={goToCourses}
        >
          <Link to="/" className="xh-tb-logo">
                    <img src="/assets/images/logo/Xhirez-Logo.png" alt="Xhirez" />
                  </Link>
        </button>

        <div className="xh-checkout-secure">
          <LockKeyhole size={15} />
          Secure Checkout
        </div>

        <button
          type="button"
          className="xh-checkout-cancel"
          onClick={goToCourses}
        >
          Cancel
        </button>
        </header>
        

      <main className="xh-checkout-layout">
        {/* LEFT CHECKOUT AREA */}
        <section className="xh-checkout-main">
          <button
            type="button"
            className="xh-checkout-back"
            onClick={step === 1 ? goToCourses : goBack}
          >
            <ArrowLeft size={16} />
            {step === 1 ? "Back to courses" : "Back"}
          </button>

          <h1>Checkout</h1>

          {/* STEP INDICATOR */}
          <div className="xh-checkout-progress">
            {[
              { number: 1, label: "Account" },
              { number: 2, label: "Billing" },
              { number: 3, label: "Payment" },
            ].map((item) => (
              <div
                key={item.number}
                className={`xh-checkout-progress-item ${
                  step >= item.number ? "completed" : ""
                }`}
              >
                <span>
                  {step > item.number ? (
                    <CheckCircle2 size={17} />
                  ) : (
                    item.number
                  )}
                </span>
                <small>{item.label}</small>
              </div>
            ))}
          </div>

          {/* EMAIL STEP */}
          <section
            className={`xh-checkout-section ${
              step >= 1 ? "active" : "locked"
            }`}
          >
            <h3>
              <span className="xh-checkout-step-number">1</span>
              Log in or create an account
            </h3>

            {step === 1 ? (
              <form onSubmit={handleEmailSubmit}>
                <p className="xh-checkout-hint">
                  Enter your email address to continue with your purchase.
                </p>

                <label className="xh-checkout-label">
                  Email address
                </label>

                <input
                  className="xh-checkout-input"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                />

                <p className="xh-checkout-note">
                  Your order details and course information will be
                  associated with this email address.
                </p>

                <button
                  className="xh-checkout-primary"
                  type="submit"
                >
                  Continue
                </button>
              </form>
            ) : (
              <div className="xh-checkout-completed">
                <CheckCircle2 size={19} />
                <span>{email}</span>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setMessage("");
                  }}
                >
                  Edit
                </button>
              </div>
            )}
          </section>

          {/* BILLING STEP */}
          <section
            className={`xh-checkout-section ${
              step >= 2 ? "active" : "locked"
            }`}
          >
            <h3>
              <span className="xh-checkout-step-number">2</span>
              Billing address
              {step < 2 && <LockKeyhole size={15} />}
            </h3>

            {step >= 2 && (
              <form onSubmit={handleBillingSubmit}>
                <p className="xh-checkout-hint">
                  Enter your billing information.
                </p>

                <div className="xh-checkout-form-grid">
                  <div className="xh-checkout-field full">
                    <label className="xh-checkout-label">
                      Full name
                    </label>
                    <input
                      className="xh-checkout-input"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="xh-checkout-field full">
                    <label className="xh-checkout-label">
                      Mobile number
                    </label>
                    <input
                      className="xh-checkout-input"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(event) =>
                        setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                      autoComplete="tel"
                      maxLength={10}
                      required
                    />
                  </div>

                  <div className="xh-checkout-field full">
                    <label className="xh-checkout-label">
                      Address
                    </label>
                    <input
                      className="xh-checkout-input"
                      type="text"
                      placeholder="House number, street and area"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      autoComplete="street-address"
                      required
                    />
                  </div>

                  <div className="xh-checkout-field">
                    <label className="xh-checkout-label">
                      City
                    </label>
                    <input
                      className="xh-checkout-input"
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      autoComplete="address-level2"
                      required
                    />
                  </div>

                  <div className="xh-checkout-field">
                    <label className="xh-checkout-label">
                      State
                    </label>
                    <input
                      className="xh-checkout-input"
                      type="text"
                      placeholder="State"
                      value={state}
                      onChange={(event) => setState(event.target.value)}
                      autoComplete="address-level1"
                      required
                    />
                  </div>

                  <div className="xh-checkout-field full">
                    <label className="xh-checkout-label">
                      PIN code
                    </label>
                    <input
                      className="xh-checkout-input"
                      type="text"
                      placeholder="6-digit PIN code"
                      value={pincode}
                      onChange={(event) =>
                        setPincode(event.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      autoComplete="postal-code"
                      maxLength={6}
                      required
                    />
                  </div>
                </div>

                <button
                  className="xh-checkout-primary"
                  type="submit"
                >
                  Continue to payment
                </button>
              </form>
            )}
          </section>

          {/* PAYMENT STEP */}
          <section
            className={`xh-checkout-section ${
              step >= 3 ? "active" : "locked"
            }`}
          >
            <h3>
              <span className="xh-checkout-step-number">3</span>
              Payment method
              {step < 3 && <LockKeyhole size={15} />}
            </h3>

            {step >= 3 && (
              <form onSubmit={placeOrder}>
                <p className="xh-checkout-hint">
                  Choose your preferred payment method.
                </p>

                <label
                  className={`xh-checkout-payment-option ${
                    paymentMethod === "upi" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                  />
                  <span className="xh-checkout-payment-icon">₹</span>
                  <span className="xh-checkout-payment-text">
                    <strong>UPI</strong>
                    <small>Google Pay, PhonePe, Paytm and other UPI apps</small>
                  </span>
                </label>

                <label
                  className={`xh-checkout-payment-option ${
                    paymentMethod === "card" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                  />
                  <span className="xh-checkout-payment-icon">
                    <CreditCard size={20} />
                  </span>
                  <span className="xh-checkout-payment-text">
                    <strong>Credit / Debit Card</strong>
                    <small>Visa, Mastercard and RuPay</small>
                  </span>
                </label>

                <label
                  className={`xh-checkout-payment-option ${
                    paymentMethod === "netbanking" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="netbanking"
                    checked={paymentMethod === "netbanking"}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                  />
                  <span className="xh-checkout-payment-icon">
                    <BuildingIcon />
                  </span>
                  <span className="xh-checkout-payment-text">
                    <strong>Net Banking</strong>
                    <small>Pay using your bank account</small>
                  </span>
                </label>

                <button
                  className="xh-checkout-primary"
                  type="submit"
                  disabled={loading || orderPrepared}
                >
                  {loading
                    ? "Preparing order..."
                    : orderPrepared
                      ? "Order prepared"
                      : `Continue · ${formatPrice(total)}`}
                </button>

                {orderPrepared && (
                  <p className="xh-checkout-prepared">
                    <CheckCircle2 size={16} />
                    Order details have been saved. Payment is still pending.
                  </p>
                )}
              </form>
            )}
          </section>

          {/* FEEDBACK MESSAGE */}
          {message && (
            <div
              className={`xh-checkout-message ${
                orderPrepared ? "success" : ""
              }`}
              role="status"
            >
              {orderPrepared ? (
                <CheckCircle2 size={18} />
              ) : (
                <AlertCircle size={18} />
              )}
              <span>{message}</span>
              <button
                type="button"
                onClick={() => setMessage("")}
                aria-label="Dismiss message"
              >
                <X size={15} />
              </button>
            </div>
          )}

          {/* SELECTED COURSES */}
          <div className="xh-checkout-order-details">
            <div className="xh-checkout-order-heading">
              <div>
                <h3>Your selected courses</h3>
                <p>{cart.length} course(s) in your cart</p>
              </div>

              <button
                type="button"
                onClick={goToCourses}
                className="xh-checkout-add-more"
              >
                Add more
              </button>
            </div>

            {cart.map((course) => (
              <div
                className="xh-checkout-course"
                key={course.id}
              >
                <img
                  src={course.image || "/images/course-placeholder.png"}
                  alt={course.title || "Course"}
                  onError={(event) => {
                    event.currentTarget.style.visibility = "hidden";
                  }}
                />

                <div className="xh-checkout-course-info">
                  <strong>{course.title || "Course"}</strong>
                  <span>{course.instructor || "Xhirez Learning"}</span>

                  <button
                    type="button"
                    onClick={() => removeCourse(course.id)}
                  >
                    <Trash2 size={13} />
                    Remove
                  </button>
                </div>

                <div className="xh-checkout-course-price">
                  <strong>{formatPrice(getPrice(course))}</strong>
                  {getOldPrice(course) > getPrice(course) && (
                    <del>{formatPrice(getOldPrice(course))}</del>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT ORDER SUMMARY */}
        <aside className="xh-checkout-summary">
          <div className="xh-checkout-summary-inner">
            <h2>Order summary</h2>

            <div className="xh-checkout-summary-count">
              <ShoppingBag size={17} />
              {cart.length} course(s) selected
            </div>

            <div className="xh-checkout-summary-row">
              <span>Original price</span>
              <span>{formatPrice(originalTotal)}</span>
            </div>

            <div className="xh-checkout-summary-row discount">
              <span>Discount</span>
              <span>- {formatPrice(discount)}</span>
            </div>

            <div className="xh-checkout-summary-total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>

            <p className="xh-checkout-tax-note">
              Final amount shown in Indian Rupees.
            </p>

            <div className="xh-checkout-summary-divider" />

            <div className="xh-checkout-benefit">
              <div className="xh-checkout-benefit-icon">
                <ShieldCheck size={22} />
              </div>
              <div>
                <strong>Learn with confidence</strong>
                <p>
                  Your selected courses will be available after
                  successful payment and order verification.
                </p>
              </div>
            </div>

            <div className="xh-checkout-benefit">
              <div className="xh-checkout-benefit-icon">
                <LockKeyhole size={21} />
              </div>
              <div>
                <strong>Secure checkout</strong>
                <p>
                  Your checkout information is handled securely.
                </p>
              </div>
            </div>

            <div className="xh-checkout-summary-footer">
              <ShieldCheck size={16} />
              Secure checkout
            </div>
          </div>
        </aside>
      </main>

      {/* FOOTER */}
      <footer className="xh-checkout-footer">
        <span>© {new Date().getFullYear()} Xhirez. All rights reserved.</span>
        <span>
          <LockKeyhole size={13} /> Secure checkout
        </span>
      </footer>

      <style>{`
        .xh-checkout,
        .xh-checkout * {
          box-sizing: border-box;
        }

        .xh-checkout {
          min-height: 100vh;
          background: #fff;
          color: #202335;
          font-family: Arial, Helvetica, sans-serif;
        }

        /* HEADER */
        .xh-checkout-header {
          height: 78px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          border-bottom: 1px solid #e6e6ed;
          box-shadow: 0 2px 8px rgba(0,0,0,.04);
          background: #fff;
        }

        .xh-checkout-logo {
          display: flex;
          align-items: center;
          gap: 9px;
          border: 0;
          background: transparent;
          font-size: 25px;
          font-weight: 800;
          color: #171729;
          cursor: pointer;
        }

        .xh-checkout-logo-mark {
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          border-radius: 9px;
          background: #7134dc;
          color: white;
        }

        .xh-checkout-secure {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #697086;
          font-size: 13px;
        }

        .xh-checkout-cancel {
          border: 0;
          background: transparent;
          color: #7134dc;
          font-weight: 700;
          cursor: pointer;
        }

        /* MAIN LAYOUT */
        .xh-checkout-layout {
          display: grid;
          grid-template-columns: 58% 42%;
          min-height: calc(100vh - 130px);
        }

        .xh-checkout-main {
          width: 100%;
          max-width: 720px;
          padding: 35px 42px 70px;
          margin: 0 auto;
        }

        .xh-checkout-back {
          display: flex;
          align-items: center;
          gap: 8px;
          border: 0;
          background: transparent;
          color: #7134dc;
          margin-bottom: 22px;
          padding: 0;
          font-size: 14px;
          cursor: pointer;
        }

        .xh-checkout-main h1 {
          font-size: 34px;
          font-weight: 750;
          margin: 0 0 25px;
          color: #202335;
        }

        /* PROGRESS */
        .xh-checkout-progress {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          position: relative;
        }

        .xh-checkout-progress::before {
          content: "";
          position: absolute;
          top: 15px;
          left: 12%;
          right: 12%;
          height: 2px;
          background: #e5e5ed;
        }

        .xh-checkout-progress-item {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          min-width: 65px;
          background: white;
          color: #9298a9;
        }

        .xh-checkout-progress-item > span {
          display: grid;
          place-items: center;
          width: 31px;
          height: 31px;
          border: 1px solid #d7d9e3;
          border-radius: 50%;
          background: white;
          font-size: 13px;
          font-weight: 700;
        }

        .xh-checkout-progress-item.completed > span {
          border-color: #7134dc;
          background: #7134dc;
          color: #fff;
        }

        .xh-checkout-progress-item.completed small {
          color: #7134dc;
          font-weight: 700;
        }

        .xh-checkout-progress-item small {
          font-size: 11px;
        }

        /* SECTIONS */
        .xh-checkout-section {
          padding: 23px 0;
          border-top: 1px solid #d9dbe5;
        }

        .xh-checkout-section h3 {
          display: flex;
          align-items: center;
          gap: 11px;
          font-size: 17px;
          font-weight: 700;
          margin: 0 0 18px;
        }

        .xh-checkout-section.locked h3 {
          color: #a0a4b1;
        }

        .xh-checkout-section.locked h3 > svg {
          margin-left: auto;
          color: #a0a4b1;
        }

        .xh-checkout-step-number {
          display: grid;
          place-items: center;
          width: 27px;
          height: 27px;
          border-radius: 50%;
          background: #f0edff;
          color: #7134dc;
          font-size: 13px;
          flex-shrink: 0;
        }

        .xh-checkout-hint {
          color: #50576c;
          font-size: 14px;
          line-height: 1.6;
          margin: 0 0 16px;
        }

        .xh-checkout-label {
          display: block;
          margin-bottom: 7px;
          color: #34394b;
          font-size: 13px;
          font-weight: 700;
        }

        .xh-checkout-input {
          display: block;
          width: 100%;
          min-height: 49px;
          border: 1px solid #cfd2df;
          border-radius: 5px;
          padding: 12px 14px;
          background: white;
          color: #202335;
          font-size: 14px;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }

        .xh-checkout-input:focus {
          border-color: #7134dc;
          box-shadow: 0 0 0 3px rgba(113,52,220,.09);
        }

        .xh-checkout-input::placeholder {
          color: #a0a5b3;
        }

        .xh-checkout-note {
          color: #7c8498;
          font-size: 12px;
          line-height: 1.6;
          margin: 10px 0 16px;
        }

        .xh-checkout-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 49px;
          border: 0;
          border-radius: 6px;
          background: #7134dc;
          color: white;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 17px;
          transition: background .2s;
        }

        .xh-checkout-primary:hover:not(:disabled) {
          background: #5b27be;
        }

        .xh-checkout-primary:disabled {
          opacity: .6;
          cursor: not-allowed;
        }

        .xh-checkout-completed {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #16834b;
          font-size: 14px;
          overflow-wrap: anywhere;
        }

        .xh-checkout-completed span {
          flex: 1;
        }

        .xh-checkout-completed button {
          border: 0;
          background: transparent;
          color: #7134dc;
          font-weight: 700;
          cursor: pointer;
        }

        /* BILLING FORM */
        .xh-checkout-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .xh-checkout-field {
          min-width: 0;
        }

        .xh-checkout-field.full {
          grid-column: 1 / -1;
        }

        /* PAYMENT */
        .xh-checkout-payment-option {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 14px;
          border: 1px solid #e1e2ea;
          border-radius: 8px;
          margin-bottom: 11px;
          cursor: pointer;
          transition: border-color .2s, background .2s;
        }

        .xh-checkout-payment-option.selected {
          border-color: #7134dc;
          background: #faf8ff;
        }

        .xh-checkout-payment-option input {
          accent-color: #7134dc;
          width: 17px;
          height: 17px;
          flex-shrink: 0;
        }

        .xh-checkout-payment-icon {
          display: grid;
          place-items: center;
          width: 39px;
          height: 39px;
          border-radius: 8px;
          background: #f0edff;
          color: #7134dc;
          font-size: 20px;
          font-weight: 800;
          flex-shrink: 0;
        }

        .xh-checkout-payment-text {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .xh-checkout-payment-text strong {
          font-size: 14px;
          color: #252a3b;
        }

        .xh-checkout-payment-text small {
          color: #7c8498;
          font-size: 11px;
        }

        .xh-checkout-prepared {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: 13px;
          color: #16834b;
          font-size: 12px;
          line-height: 1.5;
        }

        /* MESSAGE */
        .xh-checkout-message {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 13px;
          margin: 15px 0;
          border: 1px solid #f2d8b5;
          border-radius: 7px;
          background: #fff8ed;
          color: #89530d;
          font-size: 13px;
          line-height: 1.55;
        }

        .xh-checkout-message > svg {
          flex-shrink: 0;
          margin-top: 1px;
        }

        .xh-checkout-message span {
          flex: 1;
        }

        .xh-checkout-message button {
          border: 0;
          background: transparent;
          color: inherit;
          cursor: pointer;
        }

        .xh-checkout-message.success {
          border-color: #ccebd8;
          background: #f0fbf4;
          color: #176b3b;
        }

        /* ORDER DETAILS */
        .xh-checkout-order-details {
          border-top: 1px solid #d9dbe5;
          padding-top: 25px;
          margin-top: 25px;
        }

        .xh-checkout-order-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 20px;
        }

        .xh-checkout-order-heading h3 {
          font-size: 17px;
          margin: 0 0 5px;
        }

        .xh-checkout-order-heading p {
          color: #7c8498;
          font-size: 12px;
          margin: 0;
        }

        .xh-checkout-add-more {
          padding: 8px 11px;
          border: 1px solid #7134dc;
          border-radius: 6px;
          background: white;
          color: #7134dc;
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
          cursor: pointer;
        }

        .xh-checkout-course {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 19px;
          padding-bottom: 17px;
          border-bottom: 1px solid #f0f0f4;
        }

        .xh-checkout-course:last-child {
          border-bottom: 0;
        }

        .xh-checkout-course img {
          display: block;
          width: 75px;
          height: 60px;
          object-fit: cover;
          border-radius: 5px;
          background: #f0edff;
          flex-shrink: 0;
        }

        .xh-checkout-course-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 0;
        }

        .xh-checkout-course-info strong {
          font-size: 13px;
          line-height: 1.4;
          color: #252a3b;
        }

        .xh-checkout-course-info span {
          color: #778096;
          font-size: 11px;
        }

        .xh-checkout-course-info button {
          display: flex;
          align-items: center;
          gap: 5px;
          width: max-content;
          padding: 0;
          border: 0;
          background: transparent;
          color: #7134dc;
          font-size: 11px;
          cursor: pointer;
        }

        .xh-checkout-course-price {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
          white-space: nowrap;
        }

        .xh-checkout-course-price strong {
          color: #252a3b;
          font-size: 13px;
        }

        .xh-checkout-course-price del {
          color: #9298a9;
          font-size: 11px;
        }

        /* SUMMARY */
        .xh-checkout-summary {
          background: #f6f7fa;
          padding: 65px 9%;
        }

        .xh-checkout-summary-inner {
          position: sticky;
          top: 30px;
          max-width: 430px;
          margin: 0 auto;
        }

        .xh-checkout-summary h2 {
          font-size: 25px;
          margin: 0 0 20px;
          color: #252a3b;
        }

        .xh-checkout-summary-count {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 12px;
          margin-bottom: 17px;
          border: 1px solid #e2e3eb;
          border-radius: 7px;
          background: white;
          color: #5b6275;
          font-size: 13px;
        }

        .xh-checkout-summary-count svg {
          color: #7134dc;
        }

        .xh-checkout-summary-row,
        .xh-checkout-summary-total {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 13px 0;
          color: #596176;
          font-size: 14px;
        }

        .xh-checkout-summary-row.discount span:last-child {
          color: #16834b;
          font-weight: 700;
        }

        .xh-checkout-summary-total {
          border-top: 1px solid #d5d8e1;
          margin-top: 5px;
          padding-top: 19px;
          color: #252a3b;
          font-size: 16px;
          font-weight: 800;
        }

        .xh-checkout-summary-total strong {
          font-size: 21px;
          color: #252a3b;
        }

        .xh-checkout-tax-note {
          color: #858b9c;
          font-size: 11px;
          line-height: 1.5;
          margin-top: 3px;
        }

        .xh-checkout-summary-divider {
          height: 1px;
          background: #dedfe7;
          margin: 28px 0;
        }

        .xh-checkout-benefit {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          margin-bottom: 24px;
        }

        .xh-checkout-benefit-icon {
          display: grid;
          place-items: center;
          width: 40px;
          height: 40px;
          border-radius: 9px;
          background: #fff;
          color: #7134dc;
          flex-shrink: 0;
        }

        .xh-checkout-benefit strong {
          display: block;
          margin: 1px 0 6px;
          color: #252a3b;
          font-size: 14px;
        }

        .xh-checkout-benefit p {
          color: #626a7e;
          font-size: 12px;
          line-height: 1.6;
          margin: 0;
        }

        .xh-checkout-summary-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-top: 1px solid #dedfe7;
          padding-top: 20px;
          color: #7a8192;
          font-size: 12px;
        }

        /* FOOTER */
        .xh-checkout-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 18px 5%;
          border-top: 1px solid #e6e6ed;
          color: #7c8498;
          font-size: 12px;
        }

        .xh-checkout-footer span:last-child {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .xh-checkout-layout {
            grid-template-columns: 1fr;
          }

          .xh-checkout-main {
            max-width: 700px;
          }

          .xh-checkout-summary {
            padding: 38px 25px;
          }

          .xh-checkout-summary-inner {
            position: static;
            max-width: 700px;
          }
        }

        @media (max-width: 520px) {
          .xh-checkout-header {
            height: 65px;
            padding: 0 15px;
          }

          .xh-checkout-logo {
            font-size: 20px;
          }

          .xh-checkout-logo-mark {
            width: 31px;
            height: 31px;
          }

          .xh-checkout-secure {
            font-size: 11px;
            gap: 5px;
          }

          .xh-checkout-cancel {
            font-size: 12px;
          }

          .xh-checkout-main {
            padding: 25px 17px 45px;
          }

          .xh-checkout-main h1 {
            font-size: 28px;
          }

          .xh-checkout-section {
            padding: 19px 0;
          }

          .xh-checkout-section h3 {
            font-size: 15px;
          }

          .xh-checkout-form-grid {
            grid-template-columns: 1fr;
          }

          .xh-checkout-field.full {
            grid-column: auto;
          }

          .xh-checkout-course {
            gap: 9px;
          }

          .xh-checkout-course img {
            width: 61px;
            height: 54px;
          }

          .xh-checkout-course-price strong {
            font-size: 12px;
          }

          .xh-checkout-summary {
            padding: 30px 18px;
          }

          .xh-checkout-summary h2 {
            font-size: 22px;
          }

          .xh-checkout-footer {
            flex-direction: column;
            text-align: center;
          }
        }

        @media (max-width: 360px) {
          .xh-checkout-secure {
            display: none;
          }

          .xh-checkout-course-price {
            white-space: normal;
          }
        }
      `}</style>
    </div>
  );
};

// Small inline icon for the Net Banking option.
const BuildingIcon = () => (
  <CreditCard size={19} />
);

export default Checkout;
