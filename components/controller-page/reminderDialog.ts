export default function createReminderDialog() {
  if (!import.meta.env.SSR) {
    const dialog = document.createElement("dialog");
    dialog.setAttribute(
      "style",
      "padding: 20px; border: none; max-width: 400px; font-family: Arial, sans-serif;"
    );

    const textElement = document.createElement("p");
    textElement.setAttribute("style", "font-size: 18px; margin-bottom: 20px;");
    dialog.appendChild(textElement);

    const progressBar = document.createElement("div");
    progressBar.setAttribute(
      "style",
      "width: 100%; height: 20px; position: relative; background-color: #e0e0e0;"
    );
    dialog.appendChild(progressBar);

    const progressFill = document.createElement("div");
    progressFill.setAttribute(
      "style",
      "height: 100%; width: 100%; position: absolute; transition: width linear;"
    );
    progressBar.appendChild(progressFill);

    document.body.appendChild(dialog);

    return {
      show: (
        seconds: number,
        message: string,
        progressBarColor: string = "#76a21e"
      ): void => {
        textElement.textContent = message;
        progressFill.style.backgroundColor = progressBarColor;
        dialog.showModal();

        progressFill.style.transition = `width ${seconds}s linear`;
        progressFill.style.width = "0%";

        setTimeout(() => {
          dialog.close();
          progressFill.style.width = "100%";
        }, seconds * 1000);
      },
    };
  }
}
