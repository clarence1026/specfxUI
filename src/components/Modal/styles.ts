import css from "styled-jsx/css";

export const modalStyles = css`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background-color: #fff;
    border-radius: 4px;
    padding: 20px;
    max-width: 500px;
    width: 100%;
    position: relative;
    outline: none;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .modal-title {
    font-size: 18px;
    font-weight: 500;
    margin: 0;
  }

  .modal-close-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-body {
    margin-bottom: 20px;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
`;

export const confirmModalStyles = css`
  .confirm-modal-content {
    max-width: 400px;
  }

  .confirm-modal-body {
    margin-bottom: 20px;
  }

  .confirm-modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  .confirm-modal-message {
    font-size: 16px;
    margin: 0 0 15px 0;
  }

  .danger-modal .confirm-modal-message {
    color: #d32f2f;
  }
`;
