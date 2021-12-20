import { Link } from "react-router-dom";
import { useState } from "react";
import ConfirmBtn from "../Buttons/ConfirmBtn/ConfirmBtn.js";
import s from "./balansForm.module.css";
import BlackModal from "../ModalWindows/BlackModal/BlackModal.js";

export default function BalansForm() {
  const [balans, setBalans] = useState("");
  const [stateMachine, setStateMachine] = useState("pending");
  const uan = "UAH";
  let disabled = false;
  let notHoverBtnConfirm = "";
  let notHoverInputOfBalans = "";

  /*
   * Отвечает за обновление состояния
   */
  const handleChange = (e) => {
    function isNumeric(value) {
      return /[a-zA-Z]+/g.test(value);
    }
    if (isNumeric(e.target.value)) {
      return;
    }
    setBalans(e.target.value);
  };

  /*
   * Вызывается при отправке формы
   */

  function handleSubmit(evt) {
    evt.preventDefault();
    const inputValue = parseFloat(balans).toFixed(2);
    if (isNaN(inputValue)) {
      return;
    }
    console.log(`Отправляем баланс: ${inputValue}`);
    setBalans(inputValue);
    setStateMachine("disabled");
  }
  if (stateMachine === "disabled") disabled = true;
  // console.log(notHoverBtnConfirm);notHoverBtnConfirm = s.offBtn notHoverInputOfBalans
  if (stateMachine === "disabled") notHoverBtnConfirm = s.offBtn;
  if (stateMachine === "disabled") notHoverInputOfBalans = s.offInput;

  return (
    <div className={s.field}>
      <form className={s.form} onSubmit={handleSubmit}>
        <span className={s.labelText}> Баланс:</span>
        <label>
          <input
            type="text"
            disabled={disabled}
            className={s.inputField + " " + notHoverInputOfBalans}
            minLength={1}
            placeholder="00.00"
            value={balans}
            onChange={handleChange}
          />
        </label>
        <p className={s.uan}>{uan}</p>
        <ConfirmBtn
          className={s.btn + " " + notHoverBtnConfirm}
          btnOff={disabled}
        />
      </form>
      <Link
        className={s.link}
        to={{
          pathname: "/reportview",
          state: { from: "/homeview" },
        }}
      >
        <div className={s.linkfield}>
          <span className={s.linkText}>Перейти к отчетам</span>
          <svg
            className={s.charts}
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z" />
          </svg>
        </div>
      </Link>
      <div
        className={
          stateMachine === "pending" ? s.modalPosition : s.modalPositionNone
        }
      >
        <BlackModal />
      </div>
    </div>
  );
}
